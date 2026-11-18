import { ArrowUpRight, Check, ClipboardList, Download } from 'lucide-react'
import { hasAssignee, isCongregationStudy } from './meetingData'
import { hasPreparedOutline } from './meetingRun'

const downloadLabels = {
  checking: 'Comprobando la descarga…',
  downloading: 'Descargando la semana…',
  ready: 'Semana lista sin conexión',
  partial: 'La descarga está incompleta',
  pending: 'Semana pendiente de descargar',
}

function pendingItems(parts, entries, omitted) {
  return parts.flatMap(part => {
    if (omitted[part.id]) return []
    const entry = entries[part.id]
    const study = isCongregationStudy(part)
    const needs = []
    if (hasAssignee(part) && !entry?.person?.trim()) needs.push({
      field: 'person', view: 'prepare', label: study ? 'Asignar encargado' : 'Asignar persona',
    })
    if (study && !entry?.helper?.trim()) needs.push({ field: 'helper', view: 'prepare', label: 'Asignar lector' })
    if (part.speech && !hasPreparedOutline(part, entry?.outline)) {
      needs.push({ view: 'outline', label: 'Preparar bosquejo' })
    }
    return needs.map(item => ({ ...item, part }))
  })
}

export default function MeetingReview({ parts, entries, omitted, offline, onItem, onDownload }) {
  const pending = pendingItems(parts, entries, omitted)
  const status = pending.length === 1 ? '1 pendiente de preparación' : pending.length + ' pendientes de preparación'
  return <section className="mp-week-review" id="meeting-preflight" aria-label="Revisión previa">
    <div className="mp-week-review-head">
      <ClipboardList size={20} aria-hidden="true" />
      <div>
        <h3>Revisión previa</h3>
        <p>{pending.length ? status : 'Asignaciones y bosquejo listos'}</p>
      </div>
    </div>
    {pending.length > 0 && <ul className="mp-week-review-list">
      {pending.map(({ part, field, view, label }) => <li key={part.id + '|' + label}>
        <button type="button" onClick={() => onItem(part, view, field)}>
          <span><strong>{label}</strong><small>{part.title}</small></span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </li>)}
    </ul>}
    <div className="mp-week-review-download" data-ready={offline === 'ready'}>
      {offline === 'ready' ? <Check size={17} aria-hidden="true" /> : <Download size={17} aria-hidden="true" />}
      <span>{downloadLabels[offline]}</span>
      {['partial', 'pending'].includes(offline) && <button type="button" onClick={onDownload}>Ir a descarga</button>}
    </div>
  </section>
}
