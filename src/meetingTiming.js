import { useCallback, useEffect, useRef, useState } from 'react'
import { dateKey, readLocal, shiftDate, weekKey } from './meetingData'

export const scheduleKey = 'meeting:schedule'
export const defaultSchedule = { day: 3, time: '19:00', revision: 0 }
export const meetingDuration = 105 * 60 * 1000
export const warningTime = meetingDuration - 10 * 60 * 1000
const undoWindow = 20000

export const emptyTimer = { elapsed: 0, started: null }
const emptySession = { general: emptyTimer, parts: {}, active: null, manual: false, warningSeen: false }

export function readSchedule() {
  const { day, time, revision = 0 } = readLocal(scheduleKey, defaultSchedule)
  return Number.isInteger(day) && day >= 0 && day <= 6 && /^([01]\d|2[0-3]):[0-5]\d$/.test(time)
    ? { day, time, revision: Number.isSafeInteger(revision) && revision >= 0 ? revision : 0 }
    : defaultSchedule
}

export function scheduledStart(week, schedule) {
  const day = shiftDate(week, (schedule.day + 6) % 7)
  const [hours, minutes] = schedule.time.split(':').map(Number)
  return day.setHours(hours, minutes, 0, 0)
}

function timerForSchedule(start, now) {
  const dayEnd = new Date(start).setHours(24, 0, 0, 0)
  if (now < start || now >= dayEnd) return null
  return now - start < meetingDuration
    ? { elapsed: 0, started: start }
    : { elapsed: meetingDuration, started: null }
}

export function elapsedTime(timer, now) {
  return timer.elapsed + (timer.started === null ? 0 : Math.max(0, now - timer.started))
}

function toggleTime(timer, now) {
  return timer.started === null ? { ...timer, started: now } : { elapsed: elapsedTime(timer, now), started: null }
}

export function formatMeetingTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600)
  const units = hours ? [hours, minutes, seconds] : [minutes, seconds]
  return units.map(value => String(value).padStart(2, '0')).join(':')
}

export function useMeetingTiming(week, schedule, rehearsal = false) {
  const key = (rehearsal ? 'meeting:rehearsal:' : 'meeting:timers:') + week
  const [session, setSession] = useState(() => readLocal(key, emptySession))
  const latest = useRef(session)
  const [now, setNow] = useState(Date.now)
  const [storageError, setStorageError] = useState(false)
  const start = scheduledStart(week, schedule)

  const save = useCallback(next => {
    latest.current = next
    setSession(next)
    try {
      localStorage.setItem(key, JSON.stringify(next))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [key])

  useEffect(() => {
    function sync(event) {
      if (event.key !== key && event.key !== null) return
      const stored = readLocal(key, emptySession)
      latest.current = stored
      setSession(stored)
      setNow(Date.now())
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [key])

  const canStart = !session.manual && session.general.started === null && session.general.elapsed === 0
  const shouldRearm = week === weekKey(dateKey()) && (session.scheduleRevision ?? 0) !== schedule.revision
  useEffect(() => {
    if (rehearsal) return
    if (shouldRearm) {
      setNow(Date.now())
      save({
        ...latest.current,
        scheduleRevision: schedule.revision,
        general: emptyTimer,
        generalStartedAt: null,
        manual: false,
        warningSeen: false, undo: null,
      })
    } else if (!canStart) {
      return
    }
    let timeout

    function checkSchedule() {
      clearTimeout(timeout)
      const at = Date.now()
      const current = latest.current
      if (current.manual || current.general.started !== null || current.general.elapsed > 0) return
      if (at < start) {
        timeout = setTimeout(checkSchedule, Math.min(start - at, 24 * 60 * 60 * 1000))
        return
      }
      const general = timerForSchedule(start, at)
      if (!general) return
      setNow(at)
      save({ ...current, general })
    }

    checkSchedule()
    window.addEventListener('focus', checkSchedule)
    document.addEventListener('visibilitychange', checkSchedule)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('focus', checkSchedule)
      document.removeEventListener('visibilitychange', checkSchedule)
    }
  }, [canStart, rehearsal, save, schedule.revision, shouldRearm, start])

  const running = session.general.started !== null || session.parts[session.active]?.started != null
  const projecting = session.programStartedAt != null && session.finishedAt == null
  useEffect(() => {
    if (!running && !projecting) return
    function refresh() {
      const at = Date.now()
      const current = latest.current
      const general = current.general
      if (general.started !== null && general.elapsed < meetingDuration && elapsedTime(general, at) >= meetingDuration) {
        save({ ...current, general: { elapsed: meetingDuration, started: null } })
      }
      setNow(at)
    }
    refresh()
    const tick = setInterval(refresh, running ? 250 : 1000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      clearInterval(tick)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [projecting, running, save])

  const undoUntil = session.undo?.until
  useEffect(() => {
    if (!undoUntil) return
    const timeout = setTimeout(() => setNow(Date.now()), Math.max(0, undoUntil - Date.now()))
    return () => clearTimeout(timeout)
  }, [undoUntil])

  function toggleGeneral() {
    const at = Date.now()
    const current = latest.current
    setNow(at)
    save({
      ...current, manual: true, general: toggleTime(current.general, at),
      undo: current.undo?.clock ? null : current.undo,
      generalStartedAt: current.generalStartedAt ?? at - elapsedTime(current.general, at),
    })
  }

  function resetGeneral() {
    const at = Date.now()
    setNow(at)
    const current = latest.current
    save({ ...current, general: rehearsal ? emptyTimer : timerForSchedule(start, at) ?? emptyTimer,
      generalStartedAt: null, manual: false, warningSeen: false, undo: current.undo?.clock ? null : current.undo })
  }

  function stopPart(current, at) {
    const timer = current.parts[current.active]
    return timer?.started != null ? { ...current.parts, [current.active]: toggleTime(timer, at) } : current.parts
  }

  function togglePart(id) {
    const at = Date.now()
    const current = latest.current
    const parts = current.active === id ? current.parts : stopPart(current, at)
    const timer = toggleTime(parts[id] || emptyTimer, at)
    setNow(at)
    save({
      ...current, parts: { ...parts, [id]: timer }, active: id, anchor: null,
      programStartedAt: current.programStartedAt ?? at, finishedAt: null, undo: null,
    })
  }

  function advanceProgram(id) {
    const at = Date.now()
    const current = latest.current
    if (id === current.active || (!id && current.finishedAt != null)) return
    const parts = stopPart(current, at)
    const presented = current.active ? { ...current.presented, [current.active]: true } : current.presented
    const { active, anchor = null, programStartedAt = null, finishedAt = null, general, generalStartedAt = null, manual } = current
    const startsPractice = id && rehearsal && !manual && general.started === null && general.elapsed === 0
    const stopsGeneral = !id && general.started !== null
    const undo = {
      until: at + undoWindow,
      progress: { active, anchor, programStartedAt, finishedAt, parts: current.parts, presented: current.presented || {} },
      clock: startsPractice || stopsGeneral ? { general, generalStartedAt, manual } : null,
    }
    setNow(at)
    if (id) {
      const clock = startsPractice ? { general: { ...emptyTimer, started: at }, generalStartedAt: at, manual: true } : {}
      save({
        ...current, ...clock, undo, active: id, anchor: null, presented, parts: {
          ...parts, [id]: { ...(parts[id] || emptyTimer), started: at },
        },
        programStartedAt: programStartedAt ?? at, finishedAt: null,
      })
    } else {
      save({
        ...current, undo, active: null, anchor: active || anchor, parts, presented,
        general: stopsGeneral ? toggleTime(general, at) : general,
        manual: manual || stopsGeneral, finishedAt: at,
      })
    }
  }

  function undoAdvance() {
    const current = latest.current
    const at = Date.now()
    if (!current.undo || at >= current.undo.until) return
    setNow(at)
    save({ ...current, ...current.undo.progress, ...current.undo.clock, undo: null })
  }

  function pausePractice() {
    const current = latest.current
    const at = Date.now()
    const parts = stopPart(current, at)
    const general = current.general.started === null ? current.general : toggleTime(current.general, at)
    if (parts === current.parts && general === current.general) return
    setNow(at)
    save({ ...current, parts, general, undo: null })
  }

  function resetProgram() {
    const at = Date.now()
    setNow(at)
    save({
      ...latest.current, active: null, anchor: null, presented: {}, parts: {},
      programStartedAt: null, finishedAt: null, generalStartedAt: null,
      general: rehearsal ? emptyTimer : timerForSchedule(start, at) ?? emptyTimer,
      manual: false, warningSeen: false, undo: null,
    })
  }

  function releasePart(id, anchor) {
    const current = latest.current
    if (current.active !== id) {
      if (current.undo) save({ ...current, undo: null })
      return
    }
    const at = Date.now()
    setNow(at)
    save({ ...current, active: null, anchor, parts: stopPart(current, at), undo: null })
  }

  function resetPart(id) {
    const current = latest.current
    if (!current.parts[id]) {
      if (current.undo) save({ ...current, undo: null })
      return
    }
    const parts = { ...current.parts }
    delete parts[id]
    save({ ...current, parts, active: current.active === id ? null : current.active, undo: null })
  }

  return {
    session, now, storageError, toggleGeneral, resetGeneral, togglePart, resetPart,
    advanceProgram, releasePart, resetProgram, undoAdvance, pausePractice, start, rehearsal,
    canUndo: Boolean(undoUntil && now < undoUntil),
    dismissWarning: () => save({ ...latest.current, warningSeen: true }),
  }
}
