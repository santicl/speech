import { act, fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'
import { dateKey, shiftDate, weekKey } from './meetingData'

const week = weekKey(dateKey())
const guide = {
  week,
  label: '16-22 DE NOVIEMBRE',
  source: 'https://wol.jw.org/es/wol/d/r4/lp-s/12345',
  parts: [
    {
      id: 'tesoros|1|tema',
      title: 'Tema del discurso',
      number: 1,
      section: 'tesoros',
      minutes: 10,
      speech: true,
      points: [{
        id: 'a',
        text: 'Punto del bosquejo',
        verses: [{ label: 'Lam 2:11', url: 'https://wol.jw.org/es/wol/bc/r4/lp-s/12345/1/0' }],
        support: [],
      }],
    },
    { id: 'maestros|4|conversaciones', title: 'Empecemos conversaciones', number: 4, section: 'maestros', minutes: 3 },
  ],
}

function openSchedule() {
  const dialog = document.getElementById('meeting-schedule')
  if (!dialog.showModal) {
    dialog.showModal = () => dialog.setAttribute('open', '')
    dialog.close = () => dialog.removeAttribute('open')
  }
  fireEvent.click(screen.getByRole('button', { name: 'Configurar horario' }))
  return screen.getByRole('dialog', { name: 'Horario de la reunión' })
}

function changeScheduleTime(time) {
  const dialog = within(openSchedule())
  fireEvent.change(dialog.getByLabelText('Hora de inicio'), { target: { value: time } })
  fireEvent.click(dialog.getByRole('button', { name: 'Guardar horario' }))
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  global.fetch = jest.fn(async url => ({
    ok: true,
    json: async () => url.includes('verse=') ? [{ number: 11, text: 'Texto del versículo.' }] : guide,
  }))
})

test('recupera los asignados, la evaluación, las partes propias y el bosquejo de la semana', async () => {
  const first = render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: /tema del discurso sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  fireEvent.change(screen.getByLabelText('Persona asignada'), { target: { value: 'Daniel' } })
  fireEvent.click(screen.getByRole('button', { name: 'Bosquejo' }))
  fireEvent.click(screen.getByLabelText('Punto del bosquejo'))
  expect(await screen.findByText(/texto del versículo/i)).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('Mi explicación'), { target: { value: 'Mi comentario preparado' } })

  fireEvent.click(screen.getByRole('button', { name: /empecemos conversaciones sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  fireEvent.change(screen.getByLabelText('Qué hizo bien'), { target: { value: 'Buen uso de preguntas' } })
  fireEvent.click(screen.getByRole('button', { name: 'Añadir parte' }))
  fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Anuncio local' } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar parte' }))
  first.unmount()

  await act(async () => { render(<App />) })
  fireEvent.click(await screen.findByRole('button', { name: /tema del discurso daniel/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Bosquejo' }))
  fireEvent.click(screen.getByRole('button', { name: 'Vista de lectura' }))
  expect(screen.getByText('Mi comentario preparado')).toBeInTheDocument()
  expect(screen.getByText(/texto del versículo/i)).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /empecemos conversaciones sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  expect(screen.getByLabelText('Qué hizo bien')).toHaveValue('Buen uso de preguntas')
  expect(screen.getByRole('button', { name: /anuncio local sin asignar/i })).toBeInTheDocument()
})

test('permite reasignar una persona cuando cambia el título publicado', async () => {
  localStorage.setItem('meeting:week:' + week, JSON.stringify({
    entries: { 'maestros|4|anterior': { title: 'Título anterior', person: 'Ana' } },
    extras: [],
  }))
  await act(async () => { render(<App />) })
  expect(await screen.findByText('Título anterior · Ana')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /empecemos conversaciones sin asignar/i })).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('Reasignar Título anterior'), { target: { value: guide.parts[1].id } })
  fireEvent.click(screen.getByRole('button', { name: 'Reasignar' }))
  expect(screen.getByRole('button', { name: /empecemos conversaciones ana/i })).toBeInTheDocument()
})

test('mantiene activo un cronómetro por parte y separa el cronómetro general', async () => {
  jest.useFakeTimers()
  jest.setSystemTime(shiftDate(week, 1).setHours(12, 0, 0, 0))
  try {
    await act(async () => { render(<App />) })
    const first = screen.getByRole('button', { name: 'Iniciar Tema del discurso' })
    const clock = within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    fireEvent.click(first)
    expect(clock.getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    expect(clock.getByRole('status')).toHaveTextContent('En cursoTema del discurso')
    fireEvent.click(clock.getByRole('button', { name: 'Iniciar' }))
    act(() => jest.advanceTimersByTime(2000))
    fireEvent.click(screen.getByRole('button', { name: 'Pausar Tema del discurso' }))
    expect(clock.getByRole('status')).toHaveTextContent('En pausaTema del discurso')
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Empecemos conversaciones' }))
    expect(clock.getByRole('status')).toHaveTextContent('En cursoEmpecemos conversaciones')
    act(() => jest.advanceTimersByTime(1000))
    expect(clock.getByText('00:03')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('00:02')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Seamos Mejores Maestros' })).getByText('00:01')).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('separa las canciones de las partes del presidente y asigna sus tiempos', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      ...guide,
      parts: [
        { id: 'open', title: 'Canción 28 y oración | Palabras de introducción', section: 'apertura', minutes: 8 },
        ...guide.parts,
        { id: 'close', title: 'Palabras de conclusión | Canción 75 y oración', section: 'cierre', minutes: 5 },
      ],
    }),
  })
  const first = render(<App />)
  const open = await screen.findByRole('region', { name: 'Apertura' })
  const rowTitles = scope => within(scope).getAllByRole('button')
    .filter(button => button.classList.contains('mp-part-label'))
    .map(button => button.querySelector('strong').textContent)
  expect(rowTitles(open)).toEqual(['Canción 28', 'Oración inicial', 'Palabras de introducción'])
  expect(within(open).getByText('1 minuto')).toBeInTheDocument()
  expect(within(open).queryByRole('button', { name: /iniciar canción/i })).not.toBeInTheDocument()
  const close = screen.getByRole('region', { name: 'Cierre' })
  expect(within(close).getByText('3 minutos')).toBeInTheDocument()
  expect(rowTitles(close)).toEqual(['Palabras de conclusión', 'Canción 75', 'Oración final'])
  for (const [section, title, person] of [
    [open, 'Oración inicial', 'Ana'],
    [close, 'Oración final', 'David'],
  ]) {
    fireEvent.click(within(section).getByRole('button', { name: title + ' Sin asignar' }))
    fireEvent.change(within(section).getByLabelText('Persona asignada'), { target: { value: person } })
  }
  fireEvent.click(within(close).getByRole('button', { name: 'Palabras de conclusión' }))
  fireEvent.click(within(close).getByRole('button', { name: 'Guía' }))
  expect(within(close).getByText(/incluye los anuncios y recordatorios/i)).toBeInTheDocument()
  fireEvent.click(within(close).getByRole('button', { name: 'Bosquejo' }))
  expect(within(close).queryByLabelText('Persona asignada')).not.toBeInTheDocument()
  expect(within(close).getByRole('button', { name: 'Añadir punto' })).toBeInTheDocument()
  first.unmount()
  await act(async () => { render(<App />) })
  expect(screen.getByRole('button', { name: 'Oración inicial Ana' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Oración final David' })).toBeInTheDocument()
})

test('abre el contenido de una cita dentro de su párrafo', async () => {
  const reference = { label: 'Lam 2:11', bible: true, url: 'https://wol.jw.org/es/wol/bc/r4/lp-s/12345/1/0' }
  const firstPart = {
    ...guide.parts[0],
    details: ['Consulta Lam 2:11.'],
    links: [reference],
    blocks: [{ runs: [{ text: 'Consulta ' }, { text: reference.label, reference }, { text: '.' }] }],
  }
  global.fetch.mockImplementation(async url => ({
    ok: true,
    json: async () => url.includes('verse=') ? [{ number: 11, text: 'Texto del versículo.' }] : { ...guide, parts: [firstPart] },
  }))
  await act(async () => { render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: /tema del discurso sin asignar/i }))
  fireEvent.click(screen.getByRole('button', { name: 'Lam 2:11' }))
  expect(await screen.findByText(/texto del versículo/i)).toBeInTheDocument()
  expect(screen.queryByRole('link', { name: 'Lam 2:11' })).not.toBeInTheDocument()
})

test('arranca el miércoles a las 19:00 y avisa cuando faltan diez minutos', async () => {
  jest.useFakeTimers()
  const start = shiftDate(week, 2).setHours(19, 0, 0, 0)
  jest.setSystemTime(start - 1000)
  try {
    const consolePanel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    let first
    await act(async () => { first = render(<App />) })
    expect(consolePanel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1000))
    expect(consolePanel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()

    jest.setSystemTime(start + 95 * 60 * 1000 - 250)
    act(() => jest.advanceTimersByTime(250))
    expect(consolePanel().getByText('01:35:00')).toBeInTheDocument()
    expect(consolePanel().getByText(/Quedan 10 minutos/)).toBeInTheDocument()
    fireEvent.click(consolePanel().getByRole('button', { name: 'Entendido' }))

    first.unmount()
    await act(async () => { render(<App />) })
    expect(consolePanel().getByText('01:35:00')).toBeInTheDocument()
    expect(consolePanel().queryByText(/Quedan 10 minutos/)).not.toBeInTheDocument()

    jest.setSystemTime(start + 105 * 60 * 1000 - 250)
    act(() => jest.advanceTimersByTime(250))
    expect(consolePanel().getByText('01:45:00')).toBeInTheDocument()
    expect(consolePanel().getByText(/Tiempo previsto cumplido/)).toBeInTheDocument()
    expect(consolePanel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(5000))
    expect(consolePanel().getByText('01:45:00')).toBeInTheDocument()
    fireEvent.click(consolePanel().getByRole('button', { name: 'Continuar' }))
    act(() => jest.advanceTimersByTime(1000))
    expect(consolePanel().getByText('01:45:01')).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('guarda el horario y recupera el tiempo general y por parte después de una recarga', async () => {
  jest.useFakeTimers()
  const startsAt = shiftDate(week, 3).setHours(18, 30, 0, 0)
  jest.setSystemTime(startsAt + 5 * 60 * 1000)
  try {
    const panel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    let first
    await act(async () => { first = render(<App />) })
    expect(panel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    expect(panel().queryByRole('button', { name: 'Configurar horario' })).not.toBeInTheDocument()
    openSchedule()
    expect(screen.getByLabelText('Día de la reunión')).toHaveValue('3')
    expect(screen.getByLabelText('Hora de inicio')).toHaveValue('19:00')
    fireEvent.change(screen.getByLabelText('Día de la reunión'), { target: { value: '4' } })
    fireEvent.change(screen.getByLabelText('Hora de inicio'), { target: { value: '18:30' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar horario' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(panel().getByText('05:00')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Tema del discurso' }))
    act(() => jest.advanceTimersByTime(6000))
    fireEvent.click(panel().getByRole('button', { name: 'Pausar' }))
    first.unmount()
    jest.setSystemTime(startsAt + 5 * 60 * 1000 + 10000)
    await act(async () => { render(<App />) })

    expect(panel().getByText('05:06')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('00:10')).toBeInTheDocument()
    openSchedule()
    expect(screen.getByLabelText('Día de la reunión')).toHaveValue('4')
    expect(screen.getByLabelText('Hora de inicio')).toHaveValue('18:30')
  } finally {
    jest.useRealTimers()
  }
})

test('reprograma el arranque después de pausar o volver a cambiar el horario', async () => {
  jest.useFakeTimers()
  const start = shiftDate(week, 2).setHours(19, 0, 0, 0)
  jest.setSystemTime(start)
  try {
    const panel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    const advance = milliseconds => act(() => jest.advanceTimersByTime(milliseconds))
    let first
    await act(async () => { first = render(<App />) })
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Tema del discurso' }))
    advance(60000)
    fireEvent.click(screen.getByRole('button', { name: 'Pausar Tema del discurso' }))
    fireEvent.click(panel().getByRole('button', { name: 'Pausar' }))

    changeScheduleTime('19:02')
    expect(panel().getByText('00:00')).toBeInTheDocument()
    advance(30000)
    changeScheduleTime('19:03')
    advance(30000)
    expect(panel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    advance(60000)
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()
    advance(60000)
    expect(panel().getByText('01:00')).toBeInTheDocument()

    changeScheduleTime('19:05')
    first.unmount()
    await act(async () => { render(<App />) })
    expect(panel().getByRole('button', { name: 'Iniciar' })).toBeInTheDocument()
    advance(60000)
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()
    advance(5000)
    expect(panel().getByText('00:05')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('01:00')).toBeInTheDocument()
    changeScheduleTime('19:05')
    expect(panel().getByText('00:05')).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('recalcula el tiempo y el aviso cuando el inicio se cambia a una hora anterior', async () => {
  jest.useFakeTimers()
  const sixPm = shiftDate(week, 2).setHours(18, 0, 0, 0)
  jest.setSystemTime(sixPm)
  localStorage.setItem('meeting:schedule', JSON.stringify({ day: 3, time: '18:00' }))
  try {
    const panel = () => within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    let first
    await act(async () => { first = render(<App />) })
    expect(panel().getByText('00:00')).toBeInTheDocument()

    changeScheduleTime('17:00')
    expect(panel().getByText('01:00:00')).toBeInTheDocument()
    expect(panel().getByText('45:00 restantes')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(250))
    expect(panel().getByText('45:00 restantes')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(4750))
    expect(panel().getByText('01:00:05')).toBeInTheDocument()
    expect(panel().getByText('44:55 restantes')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Pausar' })).toBeInTheDocument()

    fireEvent.click(panel().getByRole('button', { name: 'Pausar' }))
    act(() => jest.advanceTimersByTime(5000))
    expect(panel().getByText('01:00:05')).toBeInTheDocument()
    fireEvent.click(panel().getByRole('button', { name: 'Reiniciar cronómetro general' }))
    expect(panel().getByText('01:00:10')).toBeInTheDocument()
    expect(panel().getByText('44:50 restantes')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1000))
    expect(panel().getByText('01:00:11')).toBeInTheDocument()
    expect(panel().getByText('44:49 restantes')).toBeInTheDocument()

    changeScheduleTime('16:20')
    expect(panel().getByText('04:49 restantes')).toBeInTheDocument()
    expect(panel().getByText(/Quedan 10 minutos/)).toBeInTheDocument()

    changeScheduleTime('16:00')
    expect(panel().getByText('01:45:00')).toBeInTheDocument()
    expect(panel().getByText('Tiempo previsto cumplido')).toBeInTheDocument()
    fireEvent.click(panel().getByRole('button', { name: 'Reiniciar cronómetro general' }))
    expect(panel().getByText('01:45:00')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
    first.unmount()
    await act(async () => { render(<App />) })
    expect(panel().getByText('01:45:00')).toBeInTheDocument()
    expect(panel().getByRole('button', { name: 'Continuar' })).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('prepara la introducción con puntos de la semana y guarda los anuncios en el cierre', async () => {
  const published = [
    { id: 'open', title: 'Palabras de introducción', section: 'apertura', minutes: 1 },
    ...guide.parts,
    { id: 'close', title: 'Palabras de conclusión', section: 'cierre', minutes: 3 },
  ]
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ...guide, parts: published }) })
  localStorage.setItem('meeting:week:' + week, JSON.stringify({
    entries: {
      open: { presiderOutline: [{ id: 'legacy-announcement', kind: 'announcement', title: 'Anuncio anterior', text: 'Aviso que se guardó antes.' }] },
      close: { title: 'Palabras de conclusión', notes: 'Nota anterior del cierre.' },
    },
    extras: [],
  }))
  function addClosingPoint(region, kind, title, text) {
    fireEvent.click(region.getByRole('button', { name: 'Añadir punto' }))
    fireEvent.change(region.getByLabelText('Tipo de punto'), { target: { value: kind } })
    fireEvent.change(region.getByLabelText('Título del punto'), { target: { value: title } })
    fireEvent.change(region.getByLabelText('Mis palabras'), { target: { value: text } })
    fireEvent.click(region.getByRole('button', { name: 'Guardar punto' }))
  }

  let first
  await act(async () => { first = render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: 'Palabras de introducción' }))
  let introduction = within(screen.getByRole('region', { name: 'Bosquejo de introducción' }))
  expect(introduction.queryByText('Anuncio anterior')).not.toBeInTheDocument()
  fireEvent.click(introduction.getByRole('button', { name: 'Escribir palabras' }))
  const script = introduction.getByLabelText('Mis palabras')
  const sentence = 'En esta reunión veremos por ejemplo. Luego seguiremos.'
  fireEvent.change(script, { target: { value: sentence } })
  const caret = sentence.indexOf('.')
  script.setSelectionRange(caret, caret)
  fireEvent.blur(script)
  fireEvent.click(introduction.getByRole('button', { name: 'Insertar referencia' }))
  expect(introduction.getByLabelText('Asignación')).toBeDisabled()
  fireEvent.change(introduction.getByLabelText('Sección de la reunión'), { target: { value: 'maestros' } })
  expect(introduction.getByRole('option', { name: /Empecemos conversaciones/ })).toBeInTheDocument()
  fireEvent.change(introduction.getByLabelText('Sección de la reunión'), { target: { value: 'tesoros' } })
  expect(introduction.queryByRole('option', { name: /Empecemos conversaciones/ })).not.toBeInTheDocument()
  fireEvent.change(introduction.getByLabelText('Asignación'), { target: { value: guide.parts[0].id } })
  fireEvent.click(introduction.getByRole('button', { name: 'Insertar en el texto' }))
  expect(script).toHaveValue('En esta reunión veremos por ejemplo (Tesoros · Tema del discurso). Luego seguiremos.')
  fireEvent.click(introduction.getByRole('button', { name: 'Guardar palabras' }))

  fireEvent.click(screen.getByRole('button', { name: 'Palabras de conclusión' }))
  let closing = within(screen.getByRole('region', { name: 'Bosquejo de conclusión' }))
  expect(closing.getByText('Nota anterior del cierre.')).toBeInTheDocument()
  expect(closing.getByText('Aviso que se guardó antes.')).toBeInTheDocument()
  addClosingPoint(closing, 'announcement', 'Cambio de salón', 'La próxima reunión será en el salón pequeño.')
  addClosingPoint(closing, 'reminder', 'Materiales', 'Traer el material de la próxima semana.')
  fireEvent.click(closing.getByRole('button', { name: 'Editar Materiales' }))
  fireEvent.change(closing.getByLabelText('Mis palabras'), { target: { value: 'Traer el material el miércoles.' } })
  fireEvent.click(closing.getByRole('button', { name: 'Guardar punto' }))
  first.unmount()

  await act(async () => { render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: 'Palabras de conclusión' }))
  closing = within(screen.getByRole('region', { name: 'Bosquejo de conclusión' }))
  expect(closing.getAllByRole('heading', { level: 5 }).map(title => title.textContent)).toEqual(['Mis notas', 'Anuncio anterior', 'Cambio de salón', 'Materiales'])
  expect(closing.getByText('Traer el material el miércoles.')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Palabras de introducción' }))
  introduction = within(screen.getByRole('region', { name: 'Bosquejo de introducción' }))
  expect(introduction.getByText('En esta reunión veremos por ejemplo (Tesoros · Tema del discurso). Luego seguiremos.')).toBeInTheDocument()
  fireEvent.click(introduction.getByRole('button', { name: 'Editar palabras' }))
  fireEvent.click(introduction.getByRole('button', { name: 'Quitar referencia Tesoros · Tema del discurso' }))
  expect(introduction.getByLabelText('Mis palabras')).toHaveValue('En esta reunión veremos por ejemplo. Luego seguiremos.')
  fireEvent.click(introduction.getByRole('button', { name: 'Guardar palabras' }))
  const confirm = jest.spyOn(window, 'confirm').mockReturnValue(true)
  try {
    fireEvent.click(introduction.getByRole('button', { name: 'Borrar introducción' }))
    expect(introduction.queryByText(/Luego seguiremos/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Palabras de conclusión' }))
    closing = within(screen.getByRole('region', { name: 'Bosquejo de conclusión' }))
    fireEvent.click(closing.getByRole('button', { name: 'Eliminar Materiales' }))
    expect(closing.queryByText('Traer el material el miércoles.')).not.toBeInTheDocument()
    fireEvent.click(closing.getByRole('button', { name: 'Escribir palabras' }))
    fireEvent.change(closing.getByLabelText('Mis palabras'), { target: { value: 'Gracias por su participación.' } })
    fireEvent.click(closing.getByRole('button', { name: 'Insertar referencia' }))
    fireEvent.change(closing.getByLabelText('Sección de la reunión'), { target: { value: 'maestros' } })
    fireEvent.change(closing.getByLabelText('Asignación'), { target: { value: guide.parts[1].id } })
    fireEvent.click(closing.getByRole('button', { name: 'Insertar en el texto' }))
    fireEvent.click(closing.getByRole('button', { name: 'Guardar palabras' }))
    expect(closing.getByText('Gracias por su participación. (Seamos Mejores Maestros · Empecemos conversaciones)')).toBeInTheDocument()
    fireEvent.click(closing.getByRole('button', { name: 'Borrar conclusión' }))
    expect(closing.queryByRole('heading', { name: 'Anuncio anterior' })).not.toBeInTheDocument()
    expect(closing.queryByText(/Gracias por su participación/)).not.toBeInTheDocument()
  } finally {
    confirm.mockRestore()
  }
})

test('oculta una ficha desde su pie y devuelve el foco a su fila', async () => {
  const reading = { id: 'reading', title: 'Lectura de la Biblia', number: 3, minutes: 4, section: 'tesoros', details: ['Pasaje de lectura'] }
  const study = { id: 'study', title: 'Estudio bíblico de la congregación', number: 8, minutes: 30, section: 'vida', details: ['Texto del capítulo'] }
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ...guide, parts: [reading, study] }) })
  await act(async () => { render(<App />) })
  for (const part of [reading, study]) {
    const row = screen.getByRole('button', { name: new RegExp('^' + part.title) })
    fireEvent.click(row)
    expect(screen.getByText(part.details[0])).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Ocultar información' }))
    expect(screen.queryByText(part.details[0])).not.toBeInTheDocument()
    expect(row).toHaveAttribute('aria-expanded', 'false')
    expect(row).toHaveFocus()
  }
})


test('muestra el capítulo y guarda sus respuestas, encargado, lector y tema', async () => {
  const study = {
    id: 'study', title: 'Estudio bíblico de la congregación', number: 8, minutes: 30, section: 'vida',
    links: [{ label: 'wcg cap. 17', url: 'https://wol.jw.org/es/wol/pc/r4/lp-s/12345/9/0' }],
  }
  const chapter = {
    title: 'La más bendita de las mujeres',
    context: 'Capítulo 17',
    blocks: [
      { kind: 'heading', text: 'Aprenda de Jael' },
      { kind: 'image', url: 'https://wol.jw.org/es/wol/mp/r4/lp-s/wcg/2025/422', alt: 'Jael en su tienda' },
      { kind: 'paragraph', runs: [{ text: 'Jael actuó con valor.' }] },
      {
        kind: 'paragraph', runs: [{ text: '¿Cómo mostró valor? ¿Qué aprendemos?' }],
        questions: [{ id: 'q1', label: '¿Cómo mostró valor?' }, { id: 'q2', label: '¿Qué aprendemos?' }],
      },
    ],
  }
  global.fetch.mockImplementation(async url => ({
    ok: true,
    json: async () => url.includes('document=') ? chapter : { ...guide, parts: [study] },
  }))
  const first = render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: /^Estudio bíblico de la congregación/ }))
  expect(await screen.findByRole('heading', { name: chapter.title })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Jael en su tienda' })).toBeInTheDocument()
  expect(screen.getByText('Jael actuó con valor.')).toBeInTheDocument()
  fireEvent.change(screen.getByRole('textbox', { name: /Cómo mostró valor/ }), { target: { value: 'Mi primera respuesta' } })
  fireEvent.change(screen.getByRole('textbox', { name: /Qué aprendemos/ }), { target: { value: 'Mi segunda respuesta' } })
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  fireEvent.change(screen.getByLabelText('Encargado del estudio'), { target: { value: 'Daniel' } })
  fireEvent.change(screen.getByLabelText('Lector'), { target: { value: 'Luis' } })
  fireEvent.click(screen.getByRole('button', { name: 'Modo oscuro' }))
  first.unmount()

  await act(async () => { render(<App />) })
  expect(screen.getByRole('main').closest('[data-theme]')).toHaveAttribute('data-theme', 'dark')
  fireEvent.click(screen.getByRole('button', { name: 'Modo claro' }))
  expect(screen.getByRole('main').closest('[data-theme]')).toHaveAttribute('data-theme', 'light')
  fireEvent.click(screen.getByRole('button', { name: /Estudio bíblico de la congregación Encargado · Daniel Lector · Luis/ }))
  expect(await screen.findByRole('textbox', { name: /Cómo mostró valor/ })).toHaveValue('Mi primera respuesta')
  expect(screen.getByRole('textbox', { name: /Qué aprendemos/ })).toHaveValue('Mi segunda respuesta')
})

test('muestra el número, título y texto bíblico de una canción en la ficha', async () => {
  const link = { label: 'Canción 28', url: 'https://wol.jw.org/es/wol/pc/r4/lp-s/12345/0/0' }
  const scripture = { label: 'Salmo 15', url: 'https://wol.jw.org/es/wol/bc/r4/lp-s/1102016828/0/0', bible: true }
  const song = { title: 'Cómo hacernos amigos de Jehová', stanzas: [['Jehová, tu gran bondad']], themeScriptures: [scripture] }
  const opening = { id: 'open', title: 'Canción 28 y oración | Palabras de introducción', section: 'apertura', links: [link] }
  global.fetch.mockImplementation(async url => ({
    ok: true,
    json: async () => {
      if (url.includes('document=')) return song
      if (url.includes('verse=')) return [{ number: 1, text: 'Jehová, ¿quién puede ser huésped en tu tienda?' }]
      return { ...guide, parts: [opening] }
    },
  }))
  await act(async () => { render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: 'Canción 28' }))
  expect(await screen.findByRole('heading', { name: song.title })).toBeInTheDocument()
  const publishedText = within(screen.getByRole('region', { name: 'Texto bíblico de la canción' }))
  expect(publishedText.getByText('Salmo 15')).toBeInTheDocument()
  expect(await publishedText.findByText(/quién puede ser huésped/)).toBeInTheDocument()
})

test('encadena las partes, conserva el tiempo y calcula el atraso respecto al horario', async () => {
  jest.useFakeTimers()
  const start = shiftDate(week, 2).setHours(19, 0, 0, 0)
  jest.setSystemTime(start)
  localStorage.setItem('meeting:week:' + week, JSON.stringify({
    entries: { [guide.parts[1].id]: { title: guide.parts[1].title, person: 'Sara' } }, extras: [],
  }))
  try {
    const chair = () => within(screen.getByRole('region', { name: 'Conducción de la reunión' }))
    const status = () => screen.getByText('En curso').parentElement
    let first
    await act(async () => { first = render(<App />) })
    fireEvent.click(chair().getByRole('button', { name: 'Empezar programa' }))
    expect(status()).toHaveTextContent('Tema del discurso')
    expect(chair().getByText('Empecemos conversaciones')).toBeInTheDocument()
    expect(chair().getByText('Sara')).toBeInTheDocument()
    expect(chair().getByText('A tiempo')).toBeInTheDocument()

    act(() => jest.advanceTimersByTime(16 * 60 * 1000))
    expect(chair().getByText('6 min de retraso')).toBeInTheDocument()
    fireEvent.click(chair().getByRole('button', { name: 'Pasar a la siguiente' }))
    expect(status()).toHaveTextContent('Empecemos conversaciones')
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('16:00')).toBeInTheDocument()

    first.unmount()
    await act(async () => { render(<App />) })
    expect(status()).toHaveTextContent('Empecemos conversaciones')
    fireEvent.click(chair().getByRole('button', { name: 'Finalizar programa' }))
    expect(chair().getByText('Programa finalizado')).toBeInTheDocument()
    expect(chair().getByText('Hora de cierre')).toBeInTheDocument()
    expect(screen.queryByText('En curso')).not.toBeInTheDocument()
    const confirm = jest.spyOn(window, 'confirm').mockReturnValue(true)
    try {
      fireEvent.click(chair().getByRole('button', { name: 'Reiniciar recorrido' }))
      expect(chair().getByRole('button', { name: 'Empezar programa' })).toBeInTheDocument()
      expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('00:00')).toBeInTheDocument()
      expect(chair().getByText('16 min de retraso')).toBeInTheDocument()
    } finally {
      confirm.mockRestore()
    }
  } finally {
    jest.useRealTimers()
  }
})

test('reemplaza sin borrar notas, abre el bosquejo listo y conserva el orden y las omisiones', async () => {
  const extra = { id: 'vida|8|avisos', title: 'Avisos de la congregación', section: 'vida', number: 8, minutes: 5 }
  const [speech, second] = guide.parts
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ...guide, parts: [...guide.parts, extra] }) })
  localStorage.setItem('meeting:week:' + week, JSON.stringify({
    entries: {
      [speech.id]: { title: speech.title, person: 'Luis', outline: { intro: 'Bosquejo que ya preparé' } },
      [second.id]: { title: second.title, person: 'Sara', assessment: 'Evaluación guardada' },
    }, extras: [],
  }))
  let first
  await act(async () => { first = render(<App />) })
  const chair = () => within(screen.getByRole('region', { name: 'Conducción de la reunión' }))
  const menu = title => {
    fireEvent.click(screen.getByRole('button', { name: 'Cambios para ' + title }))
    return within(screen.getByRole('region', { name: 'Cambios para ' + title }))
  }

  fireEvent.click(menu(speech.title).getByRole('button', { name: 'Abrir mi bosquejo' }))
  expect(screen.getByText('Bosquejo que ya preparé')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Editar bosquejo' })).toBeInTheDocument()

  let changes = menu(second.title)
  fireEvent.click(changes.getByRole('button', { name: 'Reemplazar' }))
  fireEvent.change(changes.getByLabelText('Persona asignada'), { target: { value: 'Rosa' } })
  fireEvent.click(changes.getByRole('button', { name: 'Guardar reemplazo' }))
  fireEvent.click(chair().getByRole('button', { name: 'Empezar programa' }))
  expect(chair().getByText('Rosa')).toBeInTheDocument()

  changes = menu(speech.title)
  fireEvent.click(changes.getByRole('button', { name: 'Mover' }))
  fireEvent.change(changes.getByLabelText('Nueva posición'), { target: { value: extra.id } })
  fireEvent.click(changes.getByRole('button', { name: 'Guardar posición' }))
  expect(screen.queryByText('En curso')).not.toBeInTheDocument()
  expect(chair().getByText(second.title)).toBeInTheDocument()
  fireEvent.click(menu(second.title).getByRole('button', { name: 'Omitir parte' }))
  expect(chair().getByText(extra.title)).toBeInTheDocument()
  first.unmount()

  await act(async () => { render(<App />) })
  expect(chair().getByText(extra.title)).toBeInTheDocument()
  const life = screen.getByRole('region', { name: 'Nuestra Vida Cristiana' })
  expect(Array.from(life.querySelectorAll('.mp-part-information strong'), element => element.textContent)).toEqual([extra.title, speech.title])
  fireEvent.click(menu(second.title).getByRole('button', { name: 'Volver a incluir' }))
  expect(chair().getByText('Rosa')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /Empecemos conversaciones Rosa/ }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparación' }))
  expect(screen.getByLabelText('Qué hizo bien')).toHaveValue('Evaluación guardada')
  fireEvent.click(menu(speech.title).getByRole('button', { name: 'Restaurar posición' }))
  expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByRole('button', { name: /Tema del discurso Luis/ })).toBeInTheDocument()
})

test('la revisión previa enlaza con los campos pendientes y actualiza su estado', async () => {
  const study = { id: 'study', title: 'Estudio bíblico de la congregación', number: 8, section: 'vida', minutes: 30 }
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ...guide, parts: [...guide.parts, study] }) })
  await act(async () => { render(<App />) })

  fireEvent.click(screen.getByRole('button', { name: 'Revisión previa' }))
  const review = within(screen.getByRole('region', { name: 'Revisión previa' }))
  expect(review.getByText('5 pendientes de preparación')).toBeInTheDocument()
  expect(review.getByText('Semana pendiente de descargar')).toBeInTheDocument()
  fireEvent.click(review.getByRole('button', { name: 'Ir a descarga' }))
  expect(screen.getByRole('button', { name: 'Descargar semana' })).toHaveFocus()

  fireEvent.click(review.getByRole('button', { name: /Asignar lector/ }))
  expect(screen.getByLabelText('Lector')).toHaveFocus()
  fireEvent.change(screen.getByLabelText('Lector'), { target: { value: 'Luis' } })
  expect(review.queryByRole('button', { name: /Asignar lector/ })).not.toBeInTheDocument()
  fireEvent.click(review.getByRole('button', { name: /Asignar encargado/ }))
  expect(screen.getByLabelText('Encargado del estudio')).toHaveFocus()
  fireEvent.change(screen.getByLabelText('Encargado del estudio'), { target: { value: 'Inés' } })

  fireEvent.click(review.getByRole('button', { name: /Preparar bosquejo/ }))
  fireEvent.change(screen.getByLabelText('Introducción'), { target: { value: 'Presentar el tema' } })
  expect(review.queryByRole('button', { name: /Preparar bosquejo/ })).not.toBeInTheDocument()
  expect(review.getByText('2 pendientes de preparación')).toBeInTheDocument()
})

test('un avance accidental se deshace tras recargar y solo durante su ventana', async () => {
  jest.useFakeTimers()
  jest.setSystemTime(shiftDate(week, 1).setHours(14, 0, 0, 0))
  try {
    const chair = () => within(screen.getByRole('region', { name: 'Conducción de la reunión' }))
    let app
    await act(async () => { app = render(<App />) })
    fireEvent.click(chair().getByRole('button', { name: 'Empezar programa' }))
    act(() => jest.advanceTimersByTime(3000))
    fireEvent.click(chair().getByRole('button', { name: 'Pasar a la siguiente' }))
    act(() => jest.advanceTimersByTime(2000))

    app.unmount()
    await act(async () => { render(<App />) })
    fireEvent.click(chair().getByRole('button', { name: 'Deshacer avance' }))
    expect(screen.getByText('En curso').parentElement).toHaveTextContent('Tema del discurso')
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('00:05')).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Seamos Mejores Maestros' })).getByText('00:00')).toBeInTheDocument()
    expect(screen.queryByText('Presentada')).not.toBeInTheDocument()

    fireEvent.click(chair().getByRole('button', { name: 'Pasar a la siguiente' }))
    act(() => jest.advanceTimersByTime(20000))
    expect(chair().queryByRole('button', { name: 'Deshacer avance' })).not.toBeInTheDocument()
    expect(screen.getByText('En curso').parentElement).toHaveTextContent('Empecemos conversaciones')

    fireEvent.click(chair().getByRole('button', { name: 'Finalizar programa' }))
    expect(chair().getByText('Programa finalizado')).toBeInTheDocument()
    fireEvent.click(chair().getByRole('button', { name: 'Deshacer avance' }))
    expect(screen.getByText('En curso').parentElement).toHaveTextContent('Empecemos conversaciones')
  } finally {
    jest.useRealTimers()
  }
})

test('el ensayo conserva sus propios tiempos, omisiones y estado después de recargar', async () => {
  jest.useFakeTimers()
  const startsAt = shiftDate(week, 2).setHours(19, 0, 0, 0)
  jest.setSystemTime(startsAt - 5000)
  try {
    let app
    await act(async () => { app = render(<App />) })
    fireEvent.click(screen.getByRole('button', { name: 'Modo ensayo' }))
    const practice = () => within(screen.getByRole('complementary', { name: 'Cronómetro de ensayo' }))
    fireEvent.click(practice().getByRole('button', { name: 'Empezar programa' }))
    act(() => jest.advanceTimersByTime(6000))
    expect(practice().getByText('00:06')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Cambios para Empecemos conversaciones' }))
    fireEvent.click(screen.getByRole('button', { name: 'Omitir parte' }))
    expect(practice().getByRole('button', { name: 'Finalizar programa' })).toBeInTheDocument()

    app.unmount()
    await act(async () => { render(<App />) })
    expect(practice().getByText('00:06')).toBeInTheDocument()
    fireEvent.click(practice().getByRole('button', { name: 'Salir del ensayo' }))
    const real = within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
    expect(real.getByText('00:01')).toBeInTheDocument()
    expect(real.getByRole('button', { name: 'Empezar programa' })).toBeInTheDocument()
    expect(screen.queryByText('Omitida')).not.toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: 'Tesoros de la Biblia' })).getByText('00:00')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Modo ensayo' }))
    expect(practice().getByText('En pausa')).toBeInTheDocument()
    expect(practice().getByText('00:06')).toBeInTheDocument()
  } finally {
    jest.useRealTimers()
  }
})

test('muestra las notas en la transición y guía de vuelta a la parte y al consejo', async () => {
  const second = { ...guide.parts[1], links: [{ label: 'lmd lección 3 punto 2', url: 'https://wol.jw.org/es/wol/pc/r4/lp-s/12345/2/0' }] }
  global.fetch.mockImplementation(async url => ({
    ok: true,
    json: async () => url.includes('document=')
      ? { title: 'Escuche con atención', paragraphs: ['Deje que la persona termine de hablar.'] }
      : { ...guide, parts: [guide.parts[0], second] },
  }))

  let app
  await act(async () => { app = render(<App />) })
  fireEvent.click(screen.getByRole('button', { name: 'Tema del discurso Sin asignar' }))
  fireEvent.click(screen.getByRole('button', { name: 'Transición' }))
  fireEvent.change(screen.getByLabelText('Al cerrar esta parte'), { target: { value: 'Agradecer el análisis.' } })
  fireEvent.click(screen.getByRole('button', { name: 'Empecemos conversaciones Sin asignar' }))
  fireEvent.click(screen.getByRole('button', { name: 'Transición' }))
  fireEvent.change(screen.getByLabelText('Al presentar esta parte'), { target: { value: 'Presentar la demostración.' } })

  app.unmount()
  await act(async () => { render(<App />) })
  const chair = within(screen.getByRole('region', { name: 'Conducción de la reunión' }))
  fireEvent.click(chair.getByRole('button', { name: 'Empezar programa' }))
  fireEvent.click(chair.getByRole('button', { name: 'Pasar a la siguiente' }))
  const transition = within(screen.getByRole('region', { name: 'Notas de transición' }))
  expect(transition.getByText('Agradecer el análisis.')).toBeInTheDocument()
  expect(transition.getByText('Presentar la demostración.')).toBeInTheDocument()
  fireEvent.click(transition.getByRole('button', { name: 'Cerrar notas de transición' }))

  fireEvent.click(screen.getByRole('button', { name: /Tema del discurso Sin asignar/ }))
  const clock = within(screen.getByRole('complementary', { name: 'Cronómetro general' }))
  expect(clock.getByText('Seamos Mejores Maestros · 2 de 2')).toBeInTheDocument()
  fireEvent.click(clock.getByRole('button', { name: 'Volver a la parte en curso' }))
  const row = screen.getByRole('button', { name: 'Empecemos conversaciones Sin asignar' })
  expect(row).toHaveFocus()
  expect(row).toHaveAttribute('aria-expanded', 'true')
  expect(row).toHaveAttribute('aria-current', 'step')

  fireEvent.click(clock.getByRole('button', { name: 'Consejo' }))
  const coach = within(screen.getByRole('region', { name: 'Consejo para el participante' }))
  expect(coach.getByLabelText('Qué hizo bien')).toHaveFocus()
  expect(await coach.findByText('Deje que la persona termine de hablar.')).toBeInTheDocument()
  fireEvent.change(coach.getByLabelText('Qué puede mejorar'), { target: { value: 'Dejar una pausa antes de preguntar' } })
  expect(JSON.parse(localStorage.getItem('meeting:week:' + week)).entries[second.id].counsel)
    .toBe('Dejar una pausa antes de preguntar')
})
