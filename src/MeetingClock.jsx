import { ArrowRight, Bell, Check, Clock, Pause, Play, RotateCcw } from 'lucide-react'
import { elapsedTime, formatMeetingTime, meetingDuration, warningTime } from './meetingTiming'

const clockFormat = new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true })

function FinishTime({ projection }) {
  const { end, deadline, actual } = projection
  const difference = Math.round((end - deadline) / 60000)
  const deviation = difference === 0 ? 'A tiempo' : Math.abs(difference) + (difference > 0 ? ' min de retraso' : ' min de adelanto')
  return <div className="mp-finish-time" data-late={difference > 0}>
    <span>{actual ? 'Hora de cierre' : 'Fin estimado'}</span>
    <time dateTime={new Date(end).toISOString()}>{clockFormat.format(end)}</time>
    <small>{deviation}</small>
  </div>
}

export default function MeetingClock({ timing, activePart, chair }) {
  const { session, now, toggleGeneral, resetGeneral, dismissWarning } = timing
  const general = session.general
  const measured = elapsedTime(general, now)
  const elapsed = general.elapsed < meetingDuration ? Math.min(measured, meetingDuration) : measured
  const started = general.started !== null
  const complete = elapsed >= meetingDuration
  const warning = elapsed >= warningTime && !complete && !session.warningSeen
  const remaining = Math.ceil(Math.max(0, meetingDuration - elapsed) / 1000) * 1000
  const progress = Math.min(100, (elapsed / meetingDuration) * 100)

  return (
    <aside className="mp-console" aria-label="Cronómetro general" data-complete={complete} style={{ '--clock-progress': progress + '%' }}>
      <div className="mp-console-title">
        <span className="mp-clock-symbol" aria-hidden="true"><Clock size={16} /></span>
        <strong>{formatMeetingTime(elapsed)}</strong>
        <div className="mp-clock-copy">
          <span>Cronómetro general</span>
          {complete
            ? <small className="mp-clock-target" role="status">Tiempo previsto cumplido</small>
            : <small className="mp-clock-target">{started || elapsed ? formatMeetingTime(remaining) + ' restantes' : 'Duración prevista · 1 h 45 min'}</small>}
        </div>
      </div>
      <div className="mp-actions">
        <button className="mp-primary" type="button" onClick={toggleGeneral}>
          {started ? <Pause size={15} /> : <Play size={15} />}{started ? 'Pausar' : elapsed ? 'Continuar' : 'Iniciar'}
        </button>
        <button type="button" className="mp-icon" aria-label="Reiniciar cronómetro general" title="Reiniciar cronómetro general" onClick={resetGeneral}><RotateCcw size={16} /></button>
      </div>
      {activePart && <div className="mp-current" role="status" data-running={session.parts[activePart.id]?.started != null} title={activePart.title}>
        <span>{session.parts[activePart.id]?.started != null ? 'En curso' : 'En pausa'}</span>
        <strong>{activePart.title}</strong>
      </div>}
      {chair && <section className="mp-chair" aria-label="Conducción de la reunión">
        <div className="mp-chair-next">
          <span>{session.finishedAt != null ? 'Programa finalizado' : chair.next ? 'A continuación' : activePart ? 'Última parte' : 'Programa listo para cerrar'}</span>
          {chair.next && <>
            <strong title={chair.next.title}>{chair.next.title}</strong>
            {chair.assignee && <small>{chair.assignee}</small>}
          </>}
        </div>
        <FinishTime projection={chair.projection} />
        {session.finishedAt == null ? <button className="mp-chair-advance" type="button" onClick={chair.onAdvance}>
          {chair.next ? <ArrowRight size={16} /> : <Check size={16} />}
          {chair.next ? (session.programStartedAt != null || session.active || session.anchor ? 'Pasar a la siguiente' : 'Empezar programa') : 'Finalizar programa'}
        </button> : <button className="mp-chair-advance" type="button" onClick={chair.onReset}>
          <RotateCcw size={16} /> Reiniciar recorrido
        </button>}
      </section>}
      {warning && <div className="mp-time-warning" role="status">
        <Bell size={16} />
        <span>Quedan 10 minutos o menos para concluir.</span>
        <button type="button" onClick={dismissWarning}>Entendido</button>
      </div>}
    </aside>
  )
}
