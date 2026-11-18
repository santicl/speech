import { useLayoutEffect, useRef, useState } from 'react'
import { Link2, X } from 'lucide-react'
import { sections } from './meetingData'

const programSections = sections.filter(([id]) => !['apertura', 'cierre'].includes(id))
const names = { ...Object.fromEntries(programSections), tesoros: 'Tesoros' }

function reference(topic) {
  return '(' + names[topic.section] + ' · ' + topic.title + ')'
}

export function previousIntroduction(items) {
  return items.filter(item => item.kind === 'program').map(item => {
    const label = names[item.section] && item.title ? reference(item) : ''
    return [item.text, label].filter(Boolean).join(' ') || item.title
  }).join('\n\n')
}

function references(text) {
  const found = []
  const startPattern = /\((?:Tesoros|Seamos Mejores Maestros|Nuestra Vida Cristiana) · /gu
  for (const match of text.matchAll(startPattern)) {
    if (match.index < (found.at(-1)?.end ?? 0)) continue
    let depth = 1
    let end = match.index + match[0].length
    while (depth && end < text.length) {
      if (text[end] === '(') depth += 1
      if (text[end] === ')') depth -= 1
      end += 1
    }
    if (!depth) found.push({ start: match.index, end, label: text.slice(match.index + 1, end - 1) })
  }
  return found
}

export default function PresiderScript({ text, topics, onSave, onCancel }) {
  const [draft, setDraft] = useState(text)
  const [picker, setPicker] = useState(false)
  const [section, setSection] = useState('')
  const [topicId, setTopicId] = useState('')
  const field = useRef(null)
  const sectionField = useRef(null)
  const selection = useRef({ start: text.length, end: text.length })
  const caret = useRef(text.length)
  const choices = topics.filter(topic => topic.section === section)
  const topic = choices.find(item => item.id === topicId)

  useLayoutEffect(() => {
    if (!picker) return
    sectionField.current?.focus()
  }, [picker])

  useLayoutEffect(() => {
    if (caret.current == null) return
    const input = field.current
    input.focus()
    input.setSelectionRange(caret.current, caret.current)
    caret.current = null
  })

  function rememberSelection(event) {
    const { selectionStart, selectionEnd } = event.currentTarget
    selection.current = { start: selectionStart, end: selectionEnd }
  }

  function insert() {
    if (!topic) return
    const { start, end } = selection.current
    const before = draft.slice(0, start)
    const after = draft.slice(end)
    const prefix = before && !/[\s(]$/u.test(before) ? ' ' : ''
    const suffix = after && !/^[\s.,;:!?…)]/u.test(after) ? ' ' : ''
    const marker = prefix + reference(topic) + suffix
    caret.current = before.length + marker.length
    selection.current = { start: caret.current, end: caret.current }
    setDraft(before + marker + after)
    setPicker(false)
  }

  function remove({ start, end }) {
    const before = draft.slice(0, start)
    const after = draft.slice(end)
    const left = /[ \t]$/u.test(before) && (!after || /^[ \t.,;:!?…]/u.test(after)) ? before.slice(0, -1) : before
    const right = !before && after.startsWith(' ') ? after.slice(1) : after
    caret.current = left.length
    selection.current = { start: left.length, end: left.length }
    setDraft(left + right)
  }

  return <form className="mp-presider-editor mp-presider-script-editor" onSubmit={event => {
    event.preventDefault()
    onSave(draft)
  }}>
    <label>Mis palabras
      <textarea ref={field} rows={6} value={draft} onSelect={rememberSelection} onBlur={rememberSelection}
        onChange={event => { rememberSelection(event); setDraft(event.target.value) }} />
    </label>
    {topics.length > 0 && <div className="mp-actions">
      <button type="button" aria-expanded={picker} onClick={() => setPicker(value => !value)}>
        <Link2 size={16} aria-hidden="true" /> Insertar referencia
      </button>
    </div>}
    {picker && <div className="mp-script-picker">
      <div className="mp-grid">
        <label>Sección de la reunión
          <select ref={sectionField} value={section} onChange={event => { setSection(event.target.value); setTopicId('') }}>
            <option value="">Selecciona una sección</option>
            {programSections.filter(([id]) => topics.some(item => item.section === id)).map(([id, label]) =>
              <option key={id} value={id}>{label}</option>)}
          </select>
        </label>
        <label>Asignación<select value={topicId} disabled={!section} onChange={event => setTopicId(event.target.value)}>
          <option value="">Selecciona una asignación</option>
          {choices.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select></label>
      </div>
      <button type="button" disabled={!topic} onClick={insert}>Insertar en el texto</button>
    </div>}
    {references(draft).length > 0 && <div className="mp-script-references" aria-label="Referencias insertadas">
      {references(draft).map(item => <button key={item.start} type="button" onClick={() => remove(item)}
        aria-label={'Quitar referencia ' + item.label}><span>{item.label}</span><X size={14} aria-hidden="true" /></button>)}
    </div>}
    <div className="mp-actions">
      <button type="submit" className="mp-primary">Guardar palabras</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </div>
  </form>
}
