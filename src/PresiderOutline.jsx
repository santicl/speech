import { useEffect, useRef, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import PresiderScript, { previousIntroduction } from './PresiderScript'

const kinds = {
  program: 'Punto del programa',
  announcement: 'Anuncio',
  reminder: 'Recordatorio',
  other: 'Otro',
}

function PointForm({ point, onSave, onCancel }) {
  const firstField = useRef(null)
  useEffect(() => { firstField.current?.focus() }, [])

  return <form className="mp-presider-editor" aria-label={point ? 'Editar punto' : 'Nuevo punto'} onSubmit={event => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const title = values.get('title').trim()
    if (title) onSave({ kind: values.get('kind'), title, text: values.get('text').trim() })
    else firstField.current?.focus()
  }}>
    <div className="mp-grid">
      <label>Tipo de punto<select name="kind" defaultValue={point?.kind || 'announcement'}>
        {Object.entries(kinds).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select></label>
      <label>Título del punto<input name="title" ref={firstField} required maxLength={150} defaultValue={point?.title || ''} /></label>
    </div>
    <label>Mis palabras<textarea name="text" rows={4} defaultValue={point?.text || ''} /></label>
    <div className="mp-actions">
      <button type="submit" className="mp-primary">Guardar punto</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </div>
  </form>
}

export default function PresiderOutline({ closing, items, script, topics, onChange }) {
  const [editing, setEditing] = useState(null)
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
    onChange({ presiderScript: '', presiderOutline: [] })
    finish(editWords.current)
  }

  return <section className="mp-presider-outline" aria-label={title}>
    <div className="mp-presider-heading">
      <h4>{title}</h4>
      <div className="mp-actions">
        <button type="button" ref={editWords} aria-expanded={editing === 'script'}
          onClick={() => setEditing(editing === 'script' ? null : 'script')}>
          <Pencil size={16} aria-hidden="true" /> {text.trim() ? 'Editar palabras' : 'Escribir palabras'}
        </button>
        {(text.trim() || points.length > 0) && <button type="button" className="mp-danger" onClick={clear}>
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
        <button type="button" ref={addButton} aria-expanded={editing === 'new'} onClick={() => setEditing(editing === 'new' ? null : 'new')}>
          <Plus size={16} aria-hidden="true" /> Añadir punto
        </button>
      </div>
      {editing === 'new' && <PointForm onCancel={() => finish(addButton.current)} onSave={point => {
        const id = 'point|' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)
        onChange({ presiderOutline: [...points, { ...point, id }] })
        finish(addButton.current)
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
                <button type="button" className="mp-icon mp-presider-edit" aria-label={'Editar ' + item.title}
                  aria-expanded={editing === item.id} onClick={event => {
                    editButton.current = event.currentTarget
                    setEditing(editing === item.id ? null : item.id)
                  }}><Pencil size={15} aria-hidden="true" /></button>
                <button type="button" className="mp-icon mp-danger" aria-label={'Eliminar ' + item.title}
                  onClick={() => {
                    if (!window.confirm('¿Eliminar este punto de la conclusión?')) return
                    onChange({ presiderOutline: points.filter(point => point.id !== item.id) })
                    finish(addButton.current)
                  }}><Trash2 size={15} aria-hidden="true" /></button>
              </div>
            </div>
            {editing === item.id
              ? <PointForm point={item} onCancel={() => finish(editButton.current)} onSave={patch => {
                onChange({ presiderOutline: points.map(point => point.id === item.id ? { ...point, ...patch } : point) })
                finish(editButton.current)
              }} />
              : item.text && <p className="mp-presider-text">{item.text}</p>}
          </div>
        </li>)}
      </ol>}
    </>}
  </section>
}
