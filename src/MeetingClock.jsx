import { useRef } from 'react'
import { ArrowRight, Bell, Check, Clock, LocateFixed, MessageSquareText, Pause, Play, RotateCcw, StickyNote, Undo2, X } from 'lucide-react'
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

export default function MeetingClock({ timing, activePart, chair, clockRef, onExitRehearsal }) {
  const { session, now, toggleGeneral, resetGeneral, dismissWarning, rehearsal, canUndo } = timing
  const transitionButton = useRef(null)
  const general = session.general
  const measured = elapsedTime(general, now)
  const elapsed = general.elapsed < meetingDuration ? Math.min(measured, meetingDuration) : measured
  const started = general.started !== null
  const complete = elapsed >= meetingDuration
  const warning = elapsed >= warningTime && !complete && !session.warningSeen
  const remaining = Math.ceil(Math.max(0, meetingDuration - elapsed) / 1000) * 1000
  const progress = Math.min(100, (elapsed / meetingDuration) * 100)
  const partRunning = activePart && session.parts[activePart.id]?.started != null
  const clockLabel = rehearsal ? 'Cronómetro de ensayo' : 'Cronómetro general'

  function closeTransition() {
    chair.onToggleTransition()
    transitionButton.current?.focus()
  }

  return (
    <aside ref={clockRef} className="mp-console" aria-label={clockLabel} data-complete={complete} style={{ '--clock-progress': progress + '%' }}>
      <div className="mp-console-title">
        <span className="mp-clock-symbol" aria-hidden="true"><Clock size={16} /></span>
        <strong>{formatMeetingTime(elapsed)}</strong>
        <div className="mp-clock-copy">
          <span>{clockLabel}</span>
          {complete
            ? <small className="mp-clock-target" role="status">Tiempo previsto cumplido</small>
            : <small className="mp-clock-target">{started || elapsed ? formatMeetingTime(remaining) + ' restantes' : 'Duración prevista · 1 h 45 min'}</small>}
        </div>
      </div>
      <div className="mp-actions">
        <button className="mp-primary" type="button" onClick={toggleGeneral}>
          {started ? <Pause size={15} /> : <Play size={15} />}{started ? 'Pausar' : elapsed ? 'Continuar' : 'Iniciar'}
        </button>
        <button type="button" className="mp-icon" aria-label={'Reiniciar ' + clockLabel.toLowerCase()} title={'Reiniciar ' + clockLabel.toLowerCase()} onClick={resetGeneral}><RotateCcw size={16} /></button>
      </div>
      {onExitRehearsal && <div className="mp-rehearsal-bar">
        <strong>Modo ensayo</strong>
        <button type="button" onClick={onExitRehearsal}>Salir del ensayo</button>
      </div>}
      {activePart && <div className="mp-current" data-running={partRunning}>
        <div className="mp-current-text" role="status" title={activePart.title}>
          <span>{partRunning ? 'En curso' : 'En pausa'}</span>
          <strong>{activePart.title}</strong>
          {chair?.location && <small>{chair.location.section} · {chair.location.position} de {chair.location.total}</small>}
        </div>
        <button className="mp-return-part" type="button" onClick={chair.onLocate}
          aria-label="Volver a la parte en curso" title="Volver a la parte en curso"><LocateFixed size={15} aria-hidden="true" /> Volver</button>
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
        <div className="mp-chair-actions">
          {session.finishedAt == null ? <button className="mp-chair-advance" type="button" onClick={chair.onAdvance}>
            {chair.next ? <ArrowRight size={16} /> : <Check size={16} />}
            {chair.next ? (session.programStartedAt != null || session.active || session.anchor ? 'Pasar a la siguiente' : 'Empezar programa') : 'Finalizar programa'}
          </button> : <button className="mp-chair-advance" type="button" onClick={chair.onReset}>
            <RotateCcw size={16} /> Reiniciar recorrido
          </button>}
          {(canUndo || chair.onCoach || chair.cues.length > 0) && <div className="mp-chair-shortcuts">
            {canUndo && <button type="button" onClick={chair.onUndo}><Undo2 size={14} aria-hidden="true" /> Deshacer avance</button>}
            {chair.onCoach && <button type="button" onClick={chair.onCoach}><MessageSquareText size={14} aria-hidden="true" /> Consejo</button>}
            {chair.cues.length > 0 && <button ref={transitionButton} type="button" aria-expanded={chair.transitionOpen} aria-controls="mp-live-transition" onClick={chair.onToggleTransition}>
              <StickyNote size={14} aria-hidden="true" /> Transición
            </button>}
          </div>}
        </div>
        {chair.transitionOpen && chair.cues.length > 0 && <div id="mp-live-transition" className="mp-transition-flyout" role="region" aria-label="Notas de transición"
          onKeyDown={event => { if (event.key === 'Escape') closeTransition() }}>
          <header>
            <strong>Notas de transición</strong>
            <button type="button" className="mp-icon" aria-label="Cerrar notas de transición" onClick={closeTransition}><X size={17} /></button>
          </header>
          {chair.cues.map(cue => <div className="mp-transition-cue" key={cue.label}>
            <span>{cue.label} · {cue.title}</span>
            <p>{cue.text}</p>
          </div>)}
        </div>}
      </section>}
      {warning && <div className="mp-time-warning" role="status">
        <Bell size={16} />
        <span>Quedan 10 minutos o menos para concluir.</span>
        <button type="button" onClick={dismissWarning}>Entendido</button>
      </div>}
    </aside>
  )
}
