import { Bell, Clock, Pause, Play, RotateCcw } from 'lucide-react'
import { elapsedTime, formatMeetingTime, meetingDuration, warningTime } from './meetingTiming'

export default function MeetingClock({ timing, activePart }) {
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
      {activePart && <div className="mp-current" title={activePart.title}>
        <span>{session.parts[activePart.id]?.started != null ? 'En curso' : 'En pausa'}</span>
        <strong>{activePart.title}</strong>
      </div>}
      {warning && <div className="mp-time-warning" role="status">
        <Bell size={16} />
        <span>Quedan 10 minutos o menos para concluir.</span>
        <button type="button" onClick={dismissWarning}>Entendido</button>
      </div>}
    </aside>
  )
}
