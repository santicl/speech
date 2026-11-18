import { Fragment, useRef, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { GuideReference, OutlineVerse } from './GuideContent'
import { meetingImage } from './meetingData'
import PresiderScript, { scriptReferences } from './PresiderScript'

function speechContent(part, points) {
  const seen = new Set()
  const labels = new Map()
  for (const { verses } of points) {
    for (const verse of verses) {
      if (!labels.has(verse.label)) labels.set(verse.label, new Set())
      labels.get(verse.label).add(verse.url)
    }
  }
  const verses = points.flatMap((point, index) => point.verses.flatMap(verse => {
    if (seen.has(verse.url)) return []
    seen.add(verse.url)
    const suffix = labels.get(verse.label).size > 1 ? ' · Punto ' + (index + 1) : ''
    return [{ id: 'verse|' + verse.url, title: 'Versículo · ' + verse.label + suffix, verse, group: 'Versículos · Punto ' + (index + 1) }]
  }))
  const details = [...new Set(part.details || [])].filter(text => !points.some(point => point.text === text))
  const links = [...new Map((part.links || []).filter(link => !link.bible).map(link => [link.url, link])).values()]
  return [
    ...verses,
    ...points,
    ...details.map((text, index) => {
      const question = /[¿?]|pregúntese|meditar/iu.test(text)
      const wording = text.replace(/^para meditar:\s*/iu, '')
      return { id: 'detail|' + index, title: (question ? 'Pregunta para meditar · ' : 'Nota de la guía · ') + wording,
        group: question ? 'Preguntas para meditar' : 'Material de apoyo' }
    }),
    ...links.map(link => ({ id: 'support|' + link.url, link, title: 'Referencia de apoyo · ' + link.label, group: 'Material de apoyo' })),
    ...(part.images || []).map((image, index) => ({
      id: 'image|' + index, image, title: 'Imagen del discurso · ' + (image.alt || 'Imagen ' + (index + 1)), group: 'Material de apoyo',
    })),
  ]
}

export default function MeetingOutline({ part, values = {}, onChange }) {
  const [editing, setEditing] = useState(false)
  const editButton = useRef(null)
  const points = part.points.map((point, index) => ({
    ...point, id: point.id, title: 'Punto ' + (index + 1) + ' · ' + point.text, group: 'Puntos del discurso',
  }))
  const items = speechContent(part, points)
  const byTitle = new Map(items.map(item => [item.title, item]))
  const text = values.script ?? [
    values.intro,
    ...points.map(point => {
      const entry = values.points?.[point.id]
      const chosen = point.verses.map(verse => items.find(item => item.verse?.url === verse.url))
      const markers = entry?.selected ? [point, ...chosen.filter(Boolean)].map(item => '(' + item.title + ')') : []
      return [...markers, entry?.notes].filter(Boolean).join('\n')
    }),
    ...Object.entries(values.points || {}).filter(([id]) => !points.some(point => point.id === id)).map(([, entry]) => entry.notes),
    values.close,
  ].filter(Boolean).join('\n\n')

  function finish() {
    setEditing(false)
    editButton.current?.focus()
  }

  function save(script) {
    onChange({ script })
    finish()
  }

  function preview(label) {
    const item = byTitle.get(label)
    if (item?.verse) return <OutlineVerse reference={item.verse} />
    if (item?.link) return <GuideReference reference={item.link} compact />
    if (item?.image) return <div className="mp-guide-gallery"><figure>
      <img src={meetingImage(item.image.url)} alt={item.image.alt} loading="lazy" />
    </figure></div>
    return null
  }

  let end = 0
  const reading = scriptReferences(text, true).map(marker => {
    const words = text.slice(end, marker.start)
    end = marker.end
    return <Fragment key={marker.start}>
      {words && <p className="mp-outline-note">{words}</p>}
      <div className="mp-point">
        <h5>{marker.label}</h5>
        {preview(marker.label)}
      </div>
    </Fragment>
  })

  return <section className="mp-outline" aria-label="Bosquejo de respaldo">
    <div className="mp-inline">
      <h4>Bosquejo de respaldo</h4>
      <div className="mp-actions">
        <button ref={editButton} type="button" aria-expanded={editing} onClick={() => setEditing(value => !value)}>
          <Pencil size={16} aria-hidden="true" /> {text.trim() ? 'Editar bosquejo' : 'Escribir bosquejo'}
        </button>
        {text.trim() && <button type="button" className="mp-danger" onClick={() => {
          if (window.confirm('¿Borrar todo el bosquejo del discurso?')) save('')
        }}><Trash2 size={16} aria-hidden="true" /> Borrar bosquejo</button>}
      </div>
    </div>
    {editing ? <PresiderScript text={text} topics={items} onSave={save} onCancel={finish} speech
      renderReference={(label, key) => {
        const content = preview(label)
        return content ? <div className="mp-point" key={key}>{content}</div> : null
      }} /> : <>
      {reading}
      <p className="mp-outline-note">{text.slice(end)}</p>
    </>}
  </section>
}
