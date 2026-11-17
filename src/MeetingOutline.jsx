import { useState } from 'react'
import { GuideReference, OutlineVerse } from './GuideContent'

export default function MeetingOutline({ part, values = {}, onChange }) {
  const [reading, setReading] = useState(false)
  const selected = part.points.filter(point => values.points?.[point.id]?.selected)
  const visible = reading ? selected : part.points

  function changePoint(id, patch) {
    onChange({ ...values, points: { ...values.points, [id]: { ...values.points?.[id], ...patch } } })
  }

  return (
    <section className="mp-outline">
      <div className="mp-inline">
        <h4>Bosquejo de respaldo</h4>
        <button type="button" onClick={() => setReading(value => !value)}>{reading ? 'Editar bosquejo' : 'Vista de lectura'}</button>
      </div>
      {reading ? <p className="mp-outline-note">{values.intro}</p> : (
        <label>Introducción<textarea value={values.intro || ''} onChange={event => onChange({ ...values, intro: event.target.value })} /></label>
      )}
      {visible.map(point => {
        const entry = values.points?.[point.id] || {}
        return (
          <div className="mp-point" key={point.id}>
            {reading ? <h5>{point.text}</h5> : (
              <label className="mp-check">
                <input type="checkbox" checked={Boolean(entry.selected)} onChange={event => changePoint(point.id, { selected: event.target.checked })} />
                <span>{point.text}</span>
              </label>
            )}
            {entry.selected && <>
              {point.verses.map((reference, index) => <OutlineVerse key={reference.url + index} reference={reference} />)}
              {!reading && point.support.length > 0 && (
                <div className="mp-reference-list">{point.support.map(reference => (
                  <GuideReference key={reference.url} reference={reference} compact />
                ))}</div>
              )}
              {reading ? <p className="mp-outline-note">{entry.notes}</p> : (
                <label>Mi explicación<textarea value={entry.notes || ''} onChange={event => changePoint(point.id, { notes: event.target.value })} /></label>
              )}
            </>}
          </div>
        )
      })}
      {visible.length === 0 && <p>{reading ? 'Todavía no has seleccionado puntos.' : 'La guía no muestra puntos con citas enlazadas para este discurso.'}</p>}
      {reading ? <p className="mp-outline-note">{values.close}</p> : (
        <label>Conclusión<textarea value={values.close || ''} onChange={event => onChange({ ...values, close: event.target.value })} /></label>
      )}
    </section>
  )
}
