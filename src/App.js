import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronUp, ClipboardList, Clock, Ellipsis, FlaskConical, Moon, Music2, Pause, Play, Plus, RotateCcw, Sun } from 'lucide-react'
import GuideContent, { GuideReference } from './GuideContent'
import MeetingClock from './MeetingClock'
import MeetingReview from './MeetingReview'
import MeetingSchedule from './MeetingSchedule'
import MeetingOutline from './MeetingOutline'
import PresiderOutline from './PresiderOutline'
import ProgramChanges from './ProgramChanges'
import OfflineWeek from './OfflineWeek'
import { hasPreparedOutline, nextProgramPart, programOrder, projectedFinish } from './meetingRun'
import { dateKey, formatTime, hasAssignee, isCongregationStudy, loadMeeting, moveClosingOutlinePoints, orderParts, prepareParts, presiderPoints, readLocal, sections, shiftDate, teachingReference, weekKey } from './meetingData'
import { elapsedTime, emptyTimer, readSchedule, scheduleKey, useMeetingTiming } from './meetingTiming'
import './MeetingProgram.css'
import './MeetingTheme.css'
import './MeetingTools.css'

const emptyWeek = { entries: {}, extras: [] }
const themeKey = 'meeting:theme'
const dateFormat = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })


function ExtraForm({ parts, initial, onSave, onCancel }) {
  const [section, setSection] = useState(initial?.section || 'vida')
  const [after, setAfter] = useState(initial?.after || '')
  const options = parts.filter(part => part.section === section)
  return (
    <form className="mp-extra" onSubmit={event => {
      event.preventDefault()
      const form = new FormData(event.currentTarget)
      const title = form.get('title').trim()
      if (!title) return
      onSave({ title, section, after, minutes: Number(form.get('minutes')) })
    }}>
      <h3>{initial ? 'Editar parte añadida' : 'Añadir una parte'}</h3>
      <div className="mp-grid">
        <label>Título<input name="title" defaultValue={initial?.title || ''} required maxLength={150} /></label>
        <label>Duración en minutos<input name="minutes" type="number" min="0" max="180" defaultValue={initial?.minutes ?? 5} required /></label>
        <label>Sección<select value={section} onChange={event => { setSection(event.target.value); setAfter('') }}>
          {sections.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select></label>
        <label>Posición<select value={after} onChange={event => setAfter(event.target.value)}>
          <option value="">Al principio de la sección</option>
          {options.map(part => <option key={part.id} value={part.id}>Después de {part.title}</option>)}
        </select></label>
      </div>
      <div className="mp-actions"><button type="submit" className="mp-primary">Guardar parte</button><button type="button" onClick={onCancel}>Cancelar</button></div>
    </form>
  )
}

function partControl(id, control) {
  return 'mp-part-' + encodeURIComponent(id) + '-' + control
}

function focusAt(element, clock) {
  if (!element) return
  element.style.scrollMarginTop = ((clock?.offsetHeight || 0) + 16) + 'px'
  element.focus({ preventScroll: true })
  element.scrollIntoView?.({ block: 'start' })
}

function PartDetails({ part, entry, topics, onChange, onRemove, onEdit, onCollapse, initialView }) {
  const closing = part.kind === 'closing'
  const presider = closing || part.kind === 'opening'
  const song = part.kind === 'song'
  const prayer = part.kind === 'prayer'
  const study = isCongregationStudy(part)
  const [view, setView] = useState(initialView || (presider ? 'outline' : part.custom || prayer ? 'prepare' : 'guide'))
  const assignable = hasAssignee(part)
  const coaching = part.section === 'maestros' && assignable
  const lesson = coaching && teachingReference(part)

  function field(name, label, multiline = false) {
    const props = { id: partControl(part.id, name), value: entry[name] || '', onChange: event => onChange({ [name]: event.target.value }) }
    return <label>{label}{multiline ? <textarea {...props} /> : <input {...props} />}</label>
  }

  return (
    <div className="mp-details">
      <div className="mp-views" role="group" aria-label="Vista de la parte">
        {!prayer && <button type="button" aria-pressed={view === 'guide'} onClick={() => setView('guide')}>Guía</button>}
        {!presider && !song && <button type="button" aria-pressed={view === 'prepare'} onClick={() => setView('prepare')}>Preparación</button>}
        {(presider || part.speech) && <button type="button" aria-pressed={view === 'outline'} onClick={() => setView('outline')}>Bosquejo</button>}
        <button type="button" aria-pressed={view === 'transition'} onClick={() => setView('transition')}>Transición</button>
      </div>
      {view === 'guide' && <>
        {!presider && entry.notes?.trim() && <section className="mp-private-note">
          <h4>Mis notas</h4>
          <p>{entry.notes}</p>
        </section>}
        <GuideContent part={part} answers={entry.answers}
          onAnswerChange={(id, text) => onChange({ answers: { ...entry.answers, [id]: text } })} />
      </>}
      {view === 'outline' && <div id={partControl(part.id, 'outline')} tabIndex={-1}>
        {presider
          ? <PresiderOutline closing={closing} items={presiderPoints(entry, closing)} script={entry.presiderScript} topics={topics}
            onChange={patch => onChange({ ...patch, notes: '' })} />
          : <MeetingOutline part={part} values={entry.outline} onChange={outline => onChange({ outline })} />}
      </div>}
      {view === 'transition' && <div className="mp-preparation">
        <h4>Notas de transición</h4>
        <div className="mp-grid">
          {field('introCue', 'Al presentar esta parte', true)}
          {field('closingCue', 'Al cerrar esta parte', true)}
        </div>
      </div>}
      {view === 'prepare' && <div className="mp-preparation">
        {assignable && <div className="mp-grid">
          {field('person', study ? 'Encargado del estudio' : 'Persona asignada')}
          {!prayer && field('helper', study ? 'Lector' : 'Ayudante o segundo participante')}
        </div>}
        {field('notes', 'Notas para dirigir la parte', true)}
        {coaching && <section className="mp-coaching" aria-label="Consejo para el participante">
          <h4>Consejo para el participante</h4>
          {lesson && <div className="mp-coaching-lesson">
            <span>Punto de enseñanza</span>
            <GuideReference reference={lesson} initiallyOpen compact />
          </div>}
          <div className="mp-grid">
            {field('assessment', 'Qué hizo bien', true)}
            {field('counsel', 'Qué puede mejorar', true)}
          </div>
        </section>}
        <div className="mp-actions">
          {assignable && (entry.person || entry.helper) && <button type="button" onClick={() => onChange({ person: '', helper: '' })}>Quitar asignados</button>}
          {onEdit && <button type="button" onClick={onEdit}>Editar parte añadida</button>}
          {onRemove && <button type="button" className="mp-danger" onClick={onRemove}>Eliminar parte añadida</button>}
        </div>
      </div>}
      <div className="mp-detail-footer">
        <button type="button" onClick={onCollapse}><ChevronUp size={17} /> Ocultar información</button>
      </div>
    </div>
  )
}

function MeetingWeek({ week, schedule }) {
  const guideKey = 'meeting:guide:' + week
  const localKey = 'meeting:week:' + week
  const [guide, setGuide] = useState(() => readLocal(guideKey, null))
  const [data, setData] = useState(() => readLocal(localKey, emptyWeek))
  const [attempt, setAttempt] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [storageError, setStorageError] = useState(false)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(null)
  const [changes, setChanges] = useState(null)
  const modeKey = 'meeting:mode:' + week
  const [rehearsal, setRehearsal] = useState(() => {
    try { return sessionStorage.getItem(modeKey) === 'practice' } catch { return false }
  })
  const [reviewOpen, setReviewOpen] = useState(false)
  const [offline, setOffline] = useState('checking')
  const [navigation, setNavigation] = useState(null)
  const [transitionOpen, setTransitionOpen] = useState(false)
  const navigationId = useRef(0)
  const clockRef = useRef(null)
  const downloadButton = useRef(null)
  const openPartButton = useRef(null)
  const meetingTiming = useMeetingTiming(week, schedule)
  const practiceTiming = useMeetingTiming(week, schedule, true)
  const timing = rehearsal ? practiceTiming : meetingTiming
  const { session, now, resetPart, togglePart, releasePart, advanceProgram, resetProgram, undoAdvance, start } = timing
  const { active, parts: times } = session
  const [targets, setTargets] = useState({})

  useEffect(() => {
    const request = new AbortController()
    loadMeeting({ date: week }, request.signal).then(result => {
      if (request.signal.aborted) return
      if (result.week !== week || !Array.isArray(result.parts)) throw new Error('La guía recibida corresponde a otra semana.')
      setGuide(result)
      try { localStorage.setItem(guideKey, JSON.stringify(result)) } catch {}
    }).catch(error => {
      if (!request.signal.aborted) setError(error instanceof SyntaxError ? 'La API de la guía no está disponible. En local, abre la dirección que muestra npm start.' : error.message)
    }).finally(() => {
      if (!request.signal.aborted) setLoading(false)
    })
    return () => request.abort()
  }, [attempt, guideKey, week])


  useEffect(() => {
    function sync(event) {
      if (event.key === localKey || event.key === null) setData(readLocal(localKey, emptyWeek))
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [localKey])

  useLayoutEffect(() => {
    if (!navigation) return
    const { id, control } = navigation
    const target = document.getElementById(partControl(id, control || 'row'))
    focusAt(target, clockRef.current)
  }, [navigation])

  function goToPart(part, view, control) {
    if (!part) return
    setChanges(null)
    setEditing(null)
    setOpen(part.id)
    setNavigation({ id: part.id, view, control, serial: ++navigationId.current })
  }

  function changeMode(value) {
    if (!value) practiceTiming.pausePractice()
    setRehearsal(value)
    setChanges(null)
    setTransitionOpen(false)
    try {
      if (value) sessionStorage.setItem(modeKey, 'practice')
      else sessionStorage.removeItem(modeKey)
    } catch {}
  }

  function collapsePart() {
    openPartButton.current?.focus()
    setOpen(null)
    setNavigation(null)
    setEditing(null)
  }

  const save = useCallback(next => {
    try {
      localStorage.setItem(localKey, JSON.stringify(next))
      setData(next)
      setStorageError(false)
      return true
    } catch {
      setStorageError(true)
      return false
    }
  }, [localKey])

  useEffect(() => {
    if (!guide) return
    const next = moveClosingOutlinePoints(data, prepareParts(guide.parts))
    if (next !== data) save(next)
  }, [data, guide, save])

  function update(part, patch) {
    const entry = { ...data.entries[part.id], ...patch, title: part.title }
    return save({ ...data, entries: { ...data.entries, [part.id]: entry } })
  }


  function remove(id, custom = false) {
    const entries = { ...data.entries }
    delete entries[id]
    function cleanOrder(order) {
      const omitted = { ...order.omitted }
      delete omitted[id]
      const moves = (order.moves || []).filter(move => move.id !== id && move.after !== id)
      return { omitted, moves }
    }
    save({
      ...data, ...cleanOrder(data), entries,
      practiceOrder: data.practiceOrder ? cleanOrder(data.practiceOrder) : undefined,
      extras: custom ? data.extras.filter(part => part.id !== id) : data.extras,
    })
    if (custom) {
      meetingTiming.resetPart(id)
      practiceTiming.resetPart(id)
    }
    if (custom && editing === id) setEditing(null)
  }

  function recover(id, target) {
    const entries = { ...data.entries }
    const { person = '', helper = '', notes = '', assessment = '', counsel = '' } = entries[id]
    entries[target.id] = { ...entries[target.id], person, helper, notes, assessment, counsel, title: target.title }
    if (entries[id].outline) {
      entries[id] = { title: entries[id].title, outline: entries[id].outline }
    } else {
      delete entries[id]
    }
    save({ ...data, entries })
  }

  const published = useMemo(() => prepareParts(guide?.parts || []), [guide])
  const topics = published.filter(part => part.kind === 'assignment' && ['tesoros', 'maestros', 'vida'].includes(part.section))
  const activeOrder = rehearsal && data.practiceOrder ? data.practiceOrder : data
  const moves = activeOrder.moves
  const parts = useMemo(() => programOrder(orderParts(published, data.extras), moves), [published, data.extras, moves])
  const omitted = activeOrder.omitted || {}
  const moved = new Set(moves?.map(move => move.id))
  const runningPart = parts.find(part => part.id === active && !omitted[part.id])
  const next = session.finishedAt == null ? nextProgramPart(parts, session, omitted) : undefined
  const cursor = parts.findIndex(part => part.id === (active || session.anchor))

  function saveOrder(patch) {
    if (rehearsal) save({ ...data, practiceOrder: { moves: moves || [], omitted, ...patch } })
    else save({ ...data, ...patch })
  }

  function move(part, index, after) {
    releasePart(part.id, parts[index - 1]?.id ?? null)
    saveOrder({ moves: after === undefined
      ? (moves || []).filter(move => move.id !== part.id)
      : [...(moves || []), { id: part.id, after }] })
    setTransitionOpen(false)
    closeChanges(part)
  }

  function closeChanges(part) {
    document.getElementById('mp-change-' + encodeURIComponent(part.id))?.focus()
    setChanges(null)
  }

  function omit(part) {
    releasePart(part.id, parts[parts.indexOf(part) - 1]?.id ?? null)
    saveOrder({ omitted: { ...omitted, [part.id]: !omitted[part.id] } })
    setTransitionOpen(false)
    closeChanges(part)
  }

  function assignee(part) {
    if (!part || !hasAssignee(part)) return ''
    const entry = data.entries[part.id]
    if (isCongregationStudy(part)) return 'Encargado · ' + (entry?.person || 'sin asignar') + ' · Lector · ' + (entry?.helper || 'sin asignar')
    return [entry?.person || 'Sin asignar', entry?.helper].filter(Boolean).join(' · ')
  }

  const enabledParts = parts.filter(part => !omitted[part.id])
  const previous = parts.find(part => part.id === session.undo?.progress?.active)
  const cues = [
    previous && { title: previous.title, label: 'Al cerrar', text: data.entries[previous.id]?.closingCue?.trim() },
    (runningPart || next) && {
      title: (runningPart || next).title, label: 'Al presentar',
      text: data.entries[(runningPart || next).id]?.introCue?.trim(),
    },
  ].filter(cue => cue?.text)
  const chair = parts.length ? {
    next, assignee: assignee(next),
    projection: projectedFinish(parts, session, omitted, rehearsal ? session.programStartedAt ?? session.generalStartedAt ?? Date.now() : start, now),
    location: runningPart && {
      section: sections.find(([id]) => id === runningPart.programSection)?.[1],
      position: enabledParts.indexOf(runningPart) + 1, total: enabledParts.length,
    },
    onLocate: runningPart ? () => {
      setTransitionOpen(false)
      if (open === runningPart.id) focusAt(openPartButton.current, clockRef.current)
      else goToPart(runningPart)
    } : undefined,
    onCoach: runningPart?.section === 'maestros' && hasAssignee(runningPart)
      ? () => { setTransitionOpen(false); goToPart(runningPart, 'prepare', 'assessment') } : undefined,
    onAdvance: () => {
      advanceProgram(next?.id)
      setTransitionOpen(Boolean(data.entries[runningPart?.id]?.closingCue?.trim() || data.entries[next?.id]?.introCue?.trim()))
    },
    onUndo: () => { setTransitionOpen(false); undoAdvance() },
    onReset: () => {
      const label = rehearsal ? '¿Reiniciar el recorrido y los cronómetros del ensayo?' : '¿Reiniciar el recorrido y todos los cronómetros de esta reunión?'
      if (window.confirm(label)) {
        resetProgram()
        setTransitionOpen(false)
      }
    },
    cues, transitionOpen, onToggleTransition: () => setTransitionOpen(value => !value),
  } : null
  const missing = guide ? Object.entries(data.entries).filter(([id, entry]) => (
    !parts.some(part => part.id === id) && Object.keys(entry).some(key => key !== 'title' && entry[key])
  )) : []

  return <>
    <MeetingClock timing={timing} activePart={runningPart} chair={chair} clockRef={clockRef}
      onExitRehearsal={rehearsal ? () => changeMode(false) : undefined} />

    <div className="mp-program-toolbar">
      <div>
        <h2>{guide?.label || 'Programa de la semana'}</h2>
        {guide?.reading && <p><BookOpen size={15} /> {guide.reading}</p>}
      </div>
      <div className="mp-actions">
        {guide && <>
          <button type="button" aria-controls="meeting-preflight" aria-expanded={reviewOpen} onClick={() => setReviewOpen(value => !value)}>
            <ClipboardList size={17} aria-hidden="true" /> Revisión previa
          </button>
          {!rehearsal && <button type="button" onClick={() => changeMode(true)}>
            <FlaskConical size={17} aria-hidden="true" /> Modo ensayo
          </button>}
        </>}
        <OfflineWeek guide={guide} onStatus={setOffline} buttonRef={downloadButton} />
        <button type="button" onClick={() => { setEditing(null); setAdding(value => !value) }}><Plus size={17} /> Añadir parte</button>
      </div>
    </div>
    {loading && !guide && <p className="mp-notice" role="status">Cargando la guía de la semana…</p>}
    {error && <div className="mp-notice" role="alert">
      <span>{error} {guide && 'Se está mostrando la última guía guardada para esta semana.'}</span>
      <button type="button" onClick={() => { setError(''); setLoading(true); setAttempt(value => value + 1) }}>Reintentar</button>
    </div>}
    {storageError && <p className="mp-notice" role="alert">El navegador no pudo guardar los cambios de esta semana.</p>}
    {timing.storageError && <p className="mp-notice" role="alert">El navegador no pudo guardar los cronómetros.</p>}
    {reviewOpen && <MeetingReview parts={parts} entries={data.entries} omitted={omitted} offline={offline}
      onItem={(part, view, field) => goToPart(part, view, field || view)} onDownload={() => focusAt(downloadButton.current, clockRef.current)} />}

    {missing.length > 0 && <div className="mp-notice mp-review">
      <strong>Datos pendientes de revisar</strong>
      <p>Estas partes guardadas ya no coinciden con la guía de la semana.</p>
      {missing.map(([id, entry]) => (
        <div className="mp-review-row" key={id}>
          <span>{entry.title}{entry.person && ' · ' + entry.person}{entry.outline && ' · Bosquejo guardado'}</span>
          {(entry.person || entry.helper || entry.notes || entry.assessment || entry.counsel) && <>
            <select aria-label={'Reasignar ' + entry.title} value={targets[id] || ''} onChange={event => setTargets({ ...targets, [id]: event.target.value })}>
              <option value="">Elige una parte</option>
              {parts.filter(part => hasAssignee(part) && !data.entries[part.id]?.person && !data.entries[part.id]?.helper && !data.entries[part.id]?.notes && !data.entries[part.id]?.assessment && !data.entries[part.id]?.counsel)
                .map(part => <option value={part.id} key={part.id}>{part.title}</option>)}
            </select>
            <button type="button" disabled={!parts.some(part => part.id === targets[id] && hasAssignee(part))} onClick={() => {
              const target = parts.find(part => part.id === targets[id])
              const existing = data.entries[target.id]
              if (existing?.person || existing?.helper || existing?.notes || existing?.assessment || existing?.counsel) return
              recover(id, target)
              setTargets({ ...targets, [id]: '' })
            }}>Reasignar</button>
          </>}
          <button type="button" onClick={() => { if (window.confirm('¿Eliminar los datos guardados de esta parte?')) remove(id) }}>Eliminar datos</button>
        </div>
      ))}
    </div>}

    {adding && <ExtraForm parts={published} onCancel={() => setAdding(false)} onSave={extra => {
      const id = 'local|' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2)
      save({ ...data, extras: [...data.extras, { ...extra, id, custom: true }] })
      setAdding(false)
      setOpen(id)
    }} />}

    {sections.map(([section, label]) => {
      const rows = parts.filter(part => part.programSection === section)
      if (!rows.length) return null
      return (
        <section className={'mp-section mp-' + section} key={section} aria-label={label}>
          <h3>{label}</h3>
          {rows.map(part => {
            const entry = data.entries[part.id] || {}
            const timer = times[part.id] || emptyTimer
            const timed = elapsedTime(timer, now)
            const expanded = open === part.id
            const changing = changes === part.id
            const skipped = !!omitted[part.id]
            const relocated = moved.has(part.id)
            const canReorder = cursor < parts.indexOf(part) || active === part.id
            const flag = skipped ? 'Omitida' : session.presented?.[part.id] ? 'Presentada' : relocated ? 'Reubicada' : ''
            const playing = timer.started !== null
            const assignable = hasAssignee(part)
            const song = part.kind === 'song'
            const study = isCongregationStudy(part)
            const duration = part.minutes ? part.minutes + (part.minutes === 1 ? ' minuto' : ' minutos') : 'Tiempo libre'
            return (
              <article className={'mp-part' + (active === part.id ? ' mp-active' : '') + (song ? ' mp-song' : '')} data-omitted={skipped} key={part.id}>
                <div className="mp-row">
                  <button className="mp-part-label" type="button" id={partControl(part.id, 'row')} ref={expanded ? openPartButton : null}
                    aria-current={active === part.id ? 'step' : undefined} aria-expanded={expanded}
                    onClick={() => { setNavigation(null); setOpen(expanded ? null : part.id) }}>
                    <span className="mp-part-mark" aria-hidden="true">{part.number || (song ? <Music2 size={16} /> : <Clock size={16} />)}</span>
                    <span className="mp-part-information">
                      <strong>{part.title}</strong>
                      {study ? <small className="mp-study-roles">
                        <span>Encargado · {entry.person || 'Sin asignar'}</span>
                        <span>Lector · {entry.helper || 'Sin asignar'}</span>
                      </small> : assignable && <small>{entry.person || 'Sin asignar'}{entry.helper && ' · ' + entry.helper}{part.custom && ' · Parte añadida'}</small>}
                      {flag && <span className="mp-part-flag">{flag}</span>}
                    </span>
                    <ChevronDown size={16} className={expanded ? 'mp-expanded' : ''} />
                  </button>
                  <div className="mp-part-time">
                    {!song && !skipped && <>
                    <div className={part.minutes && timed > part.minutes * 60000 ? 'mp-over' : ''}>
                      <strong>{formatTime(timed)}</strong>
                      {part.kind !== 'prayer' && <small>{duration}</small>}
                    </div>
                    <button className={'mp-icon' + (playing ? ' mp-primary' : '')} type="button" onClick={() => {
                      togglePart(part.id)
                      setTransitionOpen(!playing && Boolean(entry.introCue?.trim()))
                    }} aria-label={(playing ? 'Pausar ' : 'Iniciar ') + part.title} title={playing ? 'Pausar parte' : 'Iniciar parte'}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
                    {(timed > 0 || playing) && <button className="mp-icon mp-reset-part" type="button" aria-label={'Reiniciar ' + part.title} title="Reiniciar parte" onClick={() => resetPart(part.id)}><RotateCcw size={16} /></button>}
                    </>}
                    <button type="button" className="mp-icon mp-row-changes" id={'mp-change-' + encodeURIComponent(part.id)}
                      aria-label={'Cambios para ' + part.title} aria-expanded={changing} onClick={() => setChanges(changing ? null : part.id)}>
                      <Ellipsis size={19} />
                    </button>
                  </div>
                </div>
                {changing && <ProgramChanges part={part} entry={entry}
                  group={{
                    candidates: canReorder ? parts.filter((candidate, index) => index > cursor
                      && candidate.id !== part.id && !omitted[candidate.id] && !session.presented?.[candidate.id]) : [],
                    canMoveToStart: cursor === -1 && parts[0]?.id !== part.id,
                    omitted: skipped, moved: relocated && canReorder,
                  }}
                  onSave={patch => { update(part, patch); closeChanges(part) }}
                  onOmit={() => omit(part)}
                  onMove={after => move(part, parts.indexOf(part), after)}
                  onRestore={() => move(part, parts.indexOf(part), undefined)}
                  onOutline={hasPreparedOutline(part, entry.outline) ? () => goToPart(part, 'outline', 'outline') : undefined} />}
                {expanded && editing === part.id && <ExtraForm parts={published} initial={part} onCancel={() => setEditing(null)} onSave={patch => {
                  const extras = data.extras.map(extra => extra.id === part.id ? { ...extra, ...patch } : extra)
                  save({ ...data, extras })
                  setEditing(null)
                }} />}
                {expanded && <PartDetails key={part.id + '|' + (navigation?.id === part.id ? navigation.serial : '')}
                  part={part} entry={entry} topics={topics} initialView={navigation?.id === part.id ? navigation.view : undefined}
                  onCollapse={collapsePart} onChange={patch => update(part, patch)}
                  onEdit={part.custom ? () => { setAdding(false); setEditing(part.id) } : null}
                  onRemove={part.custom ? () => { if (window.confirm('¿Eliminar esta parte y sus notas?')) remove(part.id, true) } : null} />}
              </article>
            )
          })}
        </section>
      )
    })}
    <footer className="mp-footer">
      <span>Datos de preparación guardados en este navegador.</span>
      {Object.values(data.entries).some(entry => entry.person || entry.helper) && <button type="button" onClick={() => {
        if (!window.confirm('¿Quitar todos los asignados de esta semana?')) return
        const entries = Object.fromEntries(Object.entries(data.entries).map(([id, entry]) => [id, { ...entry, person: '', helper: '' }]))
        save({ ...data, entries })
      }}>Limpiar asignados de la semana</button>}
    </footer>
  </>
}

export default function MeetingProgram() {
  const [date, setDate] = useState(dateKey)
  const [theme, setTheme] = useState(() => readLocal(themeKey, 'light') === 'dark' ? 'dark' : 'light')
  const [schedule, setSchedule] = useState(readSchedule)
  const [scheduleError, setScheduleError] = useState(false)

  useEffect(() => {
    function sync(event) {
      if (event.key === scheduleKey || event.key === null) setSchedule(readSchedule())
      if (event.key === themeKey || event.key === null) setTheme(readLocal(themeKey, 'light') === 'dark' ? 'dark' : 'light')
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem(themeKey, JSON.stringify(next)) } catch {}
  }

  function changeSchedule(next) {
    if (next.day === schedule.day && next.time === schedule.time) return
    const updated = { day: next.day, time: next.time, revision: Math.max(schedule.revision, readSchedule().revision) + 1 }
    setSchedule(updated)
    try {
      localStorage.setItem(scheduleKey, JSON.stringify(updated))
      setScheduleError(false)
    } catch {
      setScheduleError(true)
    }
  }
  const week = weekKey(date)
  return (
    <main className="mp" data-theme={theme}>
      <header className="mp-header">
        <div className="mp-header-inner">
          <div>
            <div className="mp-brand-line">
              <div className="mp-kicker"><span><BookOpen size={17} /></span> Vida y Ministerio</div>
              <button type="button" className="mp-theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              </button>
            </div>
            <h1>Programa de la reunión</h1>
            <p>{dateFormat.format(shiftDate(date, 0))}</p>
          </div>
          <div className="mp-header-tools">
            <div className="mp-week-controls">
              <button type="button" className="mp-icon" aria-label="Semana anterior" onClick={() => setDate(dateKey(shiftDate(date, -7)))}><ArrowLeft size={17} /></button>
              <input type="date" aria-label="Fecha de la reunión" value={date} onChange={event => { if (event.target.value) setDate(event.target.value) }} />
              <button type="button" className="mp-icon" aria-label="Semana siguiente" onClick={() => setDate(dateKey(shiftDate(date, 7)))}><ArrowRight size={17} /></button>
              <button type="button" onClick={() => setDate(dateKey())}>Hoy</button>
            </div>
            <MeetingSchedule week={week} schedule={schedule} onSchedule={changeSchedule} error={scheduleError} />
          </div>
        </div>
      </header>
      <div className="mp-content">
        <MeetingWeek key={week} week={week} schedule={schedule} />
      </div>
    </main>
  )
}
