import { useEffect, useRef, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import PointPdf from './PointPdf'
import { attachmentError, deletePdf, savePdf, validatePdf } from './meetingAttachments'
import PresiderScript, { previousIntroduction } from './PresiderScript'

const kinds = {
  program: 'Punto del programa',
  announcement: 'Anuncio',
  reminder: 'Recordatorio',
  other: 'Otro',
}

function PointForm({ point, onSave, onCancel, onBusy }) {
  const firstField = useRef(null)
  const [file, setFile] = useState(null)
  const [pdf, setPdf] = useState(point?.pdf || null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const fileField = useRef(null)
  useEffect(() => { firstField.current?.focus() }, [])

  return <form className="mp-presider-editor" aria-label={point ? 'Editar punto' : 'Nuevo punto'} onSubmit={async event => {
    event.preventDefault()
    if (busy) return
    const values = new FormData(event.currentTarget)
    const title = values.get('title').trim()
    if (!title) { firstField.current?.focus(); return }
    setBusy(true)
    onBusy(true)
    setError('')
    let attached
    try {
      attached = file ? await savePdf(file) : pdf
      const saved = onSave({ kind: values.get('kind'), title, text: values.get('text').trim(), pdf: attached })
      if (saved === false) throw new Error('No se pudo guardar el punto. Vuelve a intentar.')
      if (point?.pdf?.id && point.pdf.id !== attached?.id) await deletePdf(point.pdf.id).catch(() => {})
    } catch (error) {
      if (file && attached?.id) await deletePdf(attached.id).catch(() => {})
      setError(attachmentError(error))
    } finally {
      setBusy(false)
      onBusy(false)
    }
  }}>
    <fieldset className="mp-pdf-fields" disabled={busy}>
    <div className="mp-grid">
      <label>Tipo de punto<select name="kind" defaultValue={point?.kind || 'announcement'}>
        {Object.entries(kinds).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select></label>
      <label>Título del punto<input name="title" ref={firstField} required maxLength={150} defaultValue={point?.title || ''} /></label>
    </div>
    <label>Mis palabras<textarea name="text" rows={4} defaultValue={point?.text || ''} /></label>
    <label>Archivo PDF
      <input ref={fileField} type="file" accept=".pdf,application/pdf" onChange={async event => {
        const input = event.currentTarget
        const selected = input.files?.[0]
        if (!selected) return
        setError('')
        setBusy(true)
        onBusy(true)
        try {
          await validatePdf(selected)
          setFile(selected)
        } catch (error) {
          input.value = ''
          setError(attachmentError(error))
        } finally {
          setBusy(false)
          onBusy(false)
        }
      }} />
    </label>
    {(file || pdf) && <div className="mp-pdf-selection">
      <span>{file?.name || pdf.name}</span>
      <button type="button" onClick={() => {
        setFile(null)
        setPdf(null)
        fileField.current.value = ''
      }}>Quitar PDF</button>
    </div>}
    <p className="mp-pdf-help">Se guarda al guardar el punto. Puedes verlo aquí después, incluso sin conexión.</p>
    {error && <p role="alert">{error}</p>}
    <div className="mp-actions">
      <button type="submit" className="mp-primary">{busy ? 'Guardando…' : 'Guardar punto'}</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </div>
    </fieldset>
  </form>
}

export default function PresiderOutline({ closing, items, script, topics, onChange }) {
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)
  const editWords = useRef(null)
  const addButton = useRef(null)
  const editButton = useRef(null)
  const part = closing ? 'conclusión' : 'introducción'
  const title = 'Bosquejo de ' + part
  const text = script ?? (closing ? '' : previousIntroduction(items))
  const points = closing ? items : []

  function finish(button) {
    setEditing(null)
    button?.focus()
  }

  function clear() {
    if (!window.confirm('¿Borrar todo el contenido de la ' + part + '?')) return
    if (onChange({ presiderScript: '', presiderOutline: [] }) === false) return
    points.forEach(point => { deletePdf(point.pdf?.id).catch(() => {}) })
    finish(editWords.current)
  }

  return <section className="mp-presider-outline" aria-label={title}>
    <div className="mp-presider-heading">
      <h4>{title}</h4>
      <div className="mp-actions">
        <button type="button" disabled={busy} ref={editWords} aria-expanded={editing === 'script'}
          onClick={() => setEditing(editing === 'script' ? null : 'script')}>
          <Pencil size={16} aria-hidden="true" /> {text.trim() ? 'Editar palabras' : 'Escribir palabras'}
        </button>
        {(text.trim() || points.length > 0) && <button type="button" className="mp-danger" disabled={busy} onClick={clear}>
          <Trash2 size={16} aria-hidden="true" /> Borrar {part}
        </button>}
      </div>
    </div>
    {editing === 'script' ? <PresiderScript text={text} topics={topics} onCancel={() => finish(editWords.current)} onSave={value => {
      onChange({ presiderScript: value, presiderOutline: points })
      finish(editWords.current)
    }} /> : text.trim() && <p className="mp-presider-reading">{text}</p>}
    {closing && <>
      <div className="mp-actions">
        <button type="button" ref={addButton} disabled={busy} aria-expanded={editing === 'new'} onClick={() => setEditing(editing === 'new' ? null : 'new')}>
          <Plus size={16} aria-hidden="true" /> Añadir punto
        </button>
      </div>
      {editing === 'new' && <PointForm onBusy={setBusy} onCancel={() => finish(addButton.current)} onSave={point => {
        const id = 'point|' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)
        if (onChange({ presiderOutline: [...points, { ...point, id }] }) === false) return false
        finish(addButton.current)
        return true
      }} />}
      {points.length > 0 && <ol className="mp-presider-points">
        {points.map((item, index) => <li key={item.id} className="mp-presider-point">
          <span className="mp-presider-number" aria-hidden="true">{index + 1}</span>
          <div className="mp-presider-point-content">
            <div className="mp-presider-point-top">
              <div>
                <span className="mp-presider-type" data-kind={item.kind}>{kinds[item.kind] || kinds.other}</span>
                <h5>{item.title}</h5>
              </div>
              <div className="mp-actions">
                <button type="button" className="mp-icon mp-presider-edit" disabled={busy} aria-label={'Editar ' + item.title}
                  aria-expanded={editing === item.id} onClick={event => {
                    editButton.current = event.currentTarget
                    setEditing(editing === item.id ? null : item.id)
                  }}><Pencil size={15} aria-hidden="true" /></button>
                <button type="button" className="mp-icon mp-danger" disabled={busy} aria-label={'Eliminar ' + item.title}
                  onClick={() => {
                    if (!window.confirm('¿Eliminar este punto de la conclusión?')) return
                    if (onChange({ presiderOutline: points.filter(point => point.id !== item.id) }) === false) return
                    deletePdf(item.pdf?.id).catch(() => {})
                    finish(addButton.current)
                  }}><Trash2 size={15} aria-hidden="true" /></button>
              </div>
            </div>
            {editing === item.id
              ? <PointForm point={item} onBusy={setBusy} onCancel={() => finish(editButton.current)} onSave={patch => {
                if (onChange({ presiderOutline: points.map(point => point.id === item.id ? { ...point, ...patch } : point) }) === false) return false
                finish(editButton.current)
                return true
              }} />
              : <>
                {item.text && <p className="mp-presider-text">{item.text}</p>}
                {item.pdf && <PointPdf key={item.pdf.id} pdf={item.pdf} />}
              </>}
          </div>
        </li>)}
      </ol>}
    </>}
  </section>
}
