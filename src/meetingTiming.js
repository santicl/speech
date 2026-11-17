import { useCallback, useEffect, useRef, useState } from 'react'
import { dateKey, readLocal, shiftDate, weekKey } from './meetingData'

export const scheduleKey = 'meeting:schedule'
export const defaultSchedule = { day: 3, time: '19:00', revision: 0 }
export const meetingDuration = 105 * 60 * 1000
export const warningTime = meetingDuration - 10 * 60 * 1000

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

export function useMeetingTiming(week, schedule) {
  const key = 'meeting:timers:' + week
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
    if (shouldRearm) {
      setNow(Date.now())
      save({
        ...latest.current,
        scheduleRevision: schedule.revision,
        general: emptyTimer,
        manual: false,
        warningSeen: false,
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
  }, [canStart, save, schedule.revision, shouldRearm, start])

  const running = session.general.started !== null || session.parts[session.active]?.started != null
  useEffect(() => {
    if (!running) return
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
    const tick = setInterval(refresh, 250)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      clearInterval(tick)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [running, save])

  function toggleGeneral() {
    const at = Date.now()
    const current = latest.current
    setNow(at)
    save({ ...current, manual: true, general: toggleTime(current.general, at) })
  }

  function resetGeneral() {
    const at = Date.now()
    setNow(at)
    save({ ...latest.current, general: timerForSchedule(start, at) ?? emptyTimer, manual: false, warningSeen: false })
  }

  function togglePart(id) {
    const at = Date.now()
    const current = latest.current
    const parts = { ...current.parts }
    if (current.active && current.active !== id && parts[current.active]?.started != null) {
      parts[current.active] = toggleTime(parts[current.active], at)
    }
    parts[id] = toggleTime(parts[id] || emptyTimer, at)
    setNow(at)
    save({ ...current, parts, active: id })
  }

  function resetPart(id) {
    const current = latest.current
    if (!current.parts[id]) return
    const parts = { ...current.parts }
    delete parts[id]
    save({ ...current, parts, active: current.active === id ? null : current.active })
  }

  return {
    session, now, storageError, toggleGeneral, resetGeneral, togglePart, resetPart,
    dismissWarning: () => save({ ...latest.current, warningSeen: true }),
  }
}
