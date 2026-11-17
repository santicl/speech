import { useEffect, useRef, useState } from 'react'
import { Pencil, Plus } from 'lucide-react'
import { sections } from './meetingData'

const kinds = {
  program: 'Punto del programa',
  announcement: 'Anuncio',
  reminder: 'Recordatorio',
  other: 'Otro',
}

const programSections = sections.filter(([id]) => id !== 'apertura' && id !== 'cierre')
const sectionNames = Object.fromEntries(programSections)

function PointForm({ point, closing, topics, onSave, onCancel, onDelete }) {
  const firstField = useRef(null)
  const [section, setSection] = useState(point?.section || '')
  const visibleTopics = topics.filter(topic => topic.section === section)
  useEffect(() => { firstField.current?.focus() }, [])

  function submit(event) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const text = values.get('text').trim()
    if (!closing) {
      const topic = visibleTopics.find(item => item.id === values.get('topic'))
      if (topic) onSave({ kind: 'program', partId: topic.id, section: topic.section, title: topic.title, text })
      return
    }

    const title = values.get('title').trim()
    if (title) onSave({ kind: values.get('kind'), title, text })
    else firstField.current?.focus()
  }

  return (
    <form className="mp-presider-editor" aria-label={point ? 'Editar punto' : 'Nuevo punto'} onSubmit={submit}>
      {closing ? <div className="mp-grid">
        <label>Tipo de punto<select name="kind" defaultValue={point?.kind || 'program'}>
          {Object.entries(kinds).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select></label>
        <label>Título del punto<input name="title" ref={firstField} required maxLength={150} defaultValue={point?.title || ''} /></label>
      </div> : <div className="mp-grid">
        <label>Sección de la reunión<select ref={firstField} required value={section} onChange={event => setSection(event.target.value)}>
          <option value="" disabled>Selecciona una sección</option>
          {programSections.filter(([id]) => topics.some(topic => topic.section === id)).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select></label>
        <label>Punto del programa<select key={section} name="topic" required disabled={!section}
          defaultValue={visibleTopics.some(topic => topic.id === point?.partId) ? point.partId : ''}>
          <option value="" disabled>Selecciona un punto</option>
          {visibleTopics.map(topic => <option key={topic.id} value={topic.id}>
            {topic.number ? topic.number + '. ' : ''}{topic.title}
          </option>)}
        </select></label>
      </div>}
      <label>Mis palabras<textarea name="text" rows={4} defaultValue={point?.text || ''} /></label>
      <div className="mp-actions">
        <button type="submit" className="mp-primary">Guardar punto</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
        {onDelete && <button type="button" className="mp-danger" onClick={onDelete}>Eliminar punto</button>}
      </div>
    </form>
  )
}

export default function PresiderOutline({ closing, items, topics, onChange }) {
  const [editing, setEditing] = useState(null)
  const addButton = useRef(null)
  const editButton = useRef(null)

  function finish(button) {
    setEditing(null)
    button?.focus()
  }

  return (
    <section className="mp-presider-outline" aria-label={closing ? 'Bosquejo de conclusión' : 'Bosquejo de introducción'}>
      <div className="mp-presider-heading">
        <h4>{closing ? 'Bosquejo de conclusión' : 'Bosquejo de introducción'}</h4>
        <button type="button" ref={addButton} disabled={!closing && !topics.length} aria-expanded={editing === 'new'} onClick={() => setEditing(editing === 'new' ? null : 'new')}>
          <Plus size={16} /> Añadir punto
        </button>
      </div>
      {editing === 'new' && <PointForm closing={closing} topics={topics} onCancel={() => finish(addButton.current)} onSave={point => {
        const id = 'point|' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)
        onChange([...items, { ...point, id }])
        finish(addButton.current)
      }} />}
      {!items.length && editing !== 'new' && <p className="mp-presider-empty">
        {closing ? 'Aún no hay puntos en el bosquejo.' : topics.length
          ? 'Elige un punto de la reunión y escribe cómo lo presentarás.'
          : 'La guía de esta semana aún no ofrece puntos para presentar.'}
      </p>}
      {items.length > 0 && <ol className="mp-presider-points">
        {items.map((item, index) => (
          <li key={item.id} className="mp-presider-point">
            <span className="mp-presider-number" aria-hidden="true">{index + 1}</span>
            <div className="mp-presider-point-content">
              <div className="mp-presider-point-top">
                <div>
                  <span className="mp-presider-type" data-kind={item.kind}>{closing ? kinds[item.kind] || kinds.other : sectionNames[item.section] || kinds.program}</span>
                  <h5>{item.title}</h5>
                </div>
                <button type="button" className="mp-icon mp-presider-edit" aria-label={'Editar ' + item.title}
                  aria-expanded={editing === item.id} onClick={event => {
                    editButton.current = event.currentTarget
                    setEditing(editing === item.id ? null : item.id)
                  }}><Pencil size={15} /></button>
              </div>
              {editing === item.id
                ? <PointForm point={item} closing={closing} topics={topics} onCancel={() => finish(editButton.current)} onSave={patch => {
                  onChange(items.map(point => point.id === item.id ? { ...point, ...patch } : point))
                  finish(editButton.current)
                }} onDelete={() => {
                  if (!window.confirm('¿Eliminar este punto del bosquejo?')) return
                  onChange(items.filter(point => point.id !== item.id))
                  finish(addButton.current)
                }} />
                : item.text && <p className="mp-presider-text">{item.text}</p>}
            </div>
          </li>
        ))}
      </ol>}
    </section>
  )
}
