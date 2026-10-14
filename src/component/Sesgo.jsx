"use client"

import { useEffect, useState } from "react"

const sections = [
  {
    id: "contexto",
    number: "01",
    title: "¿Qué es el sesgo de confirmación?",
    content: (
      <>
        <p className="lead">¿Alguna vez ha escuchado la frase <strong>Sesgo de confirmación</strong>?</p>
        <p>Ocurre cuando una persona busca, interpreta, prefiere y recuerda información que confirma sus creencias, hipótesis o ideas previas. Al mismo tiempo, se ignora, minimiza o descarta cualquier dato que contradiga lo que ya se piensa.</p>
        <div className="callout accent">
          <p>Esta definición resume muy bien la forma de pensar de las personas que habían quedado después del asesinato de Guedalías.</p>
        </div>
        <h3>Recordemos lo que había pasado</h3>
        <ul>
          <li>Babilonia había puesto a Guedalías como gobernador, pero estaba bajo su dominio.</li>
          <li>Ismael, quizá por envidia, mata a Guedalías, además de otros soldados babilónicos.</li>
          <li>Como Ismael logra su cometido, se lleva cautivas a las personas que quedaron, pero Johanán los rescata.</li>
          <li>Todos se quedan en un lugar de alojamiento cerca de Belén.</li>
        </ul>
        <p>Y es lógico pensar que ellos se sintieran con miedo, porque ¿cuáles serían las represalias de Nabucodonosor?</p>
      </>
    ),
  },
  {
    id: "consulta",
    number: "02",
    title: "Comenzaron haciendo lo correcto",
    content: (
      <>
        <p>Así que ellos procedieron de una manera sabia. Comenzaron haciendo lo correcto.</p>
        <Scripture reference="Jeremías 42:1-3">
          <p><strong>42</strong> Entonces todos los jefes del ejército, Johanán hijo de Caréah, Jezanías hijo de Hosaya y toda la gente, desde el menor hasta el mayor, se acercaron <strong>2</strong> al profeta Jeremías y le dijeron: “Por favor, escucha nuestra súplica. Órale a Jehová tu Dios por nosotros y por todo este resto porque, como puedes ver, solo quedamos unos pocos de los muchos que éramos. <strong>3</strong> Que Jehová tu Dios nos diga qué camino seguir y qué debemos hacer”.</p>
        </Scripture>
        <p>Allí proceden a consultar a Jehová mediante Jeremías. Usan a un profeta autorizado por Jehová.</p>
        <div className="question-card">
          <span className="question-mark">?</span>
          <p>Pero ¿será que su idea era obedecer a Jehová sea cual fuera su instrucción o más bien solo esperaban que Jehová les confirmara algo que ya habían decidido?</p>
        </div>
        <p className="transition">Bueno, veamos la respuesta de Jehová...</p>
      </>
    ),
  },
  {
    id: "respuesta",
    number: "03",
    title: "La respuesta de Jehová fue clara",
    content: (
      <>
        <Scripture reference="Jeremías 42:9, 10, 19">
          <p><strong>9</strong> Les dijo: “Esto es lo que dice Jehová, el Dios de Israel, a quien ustedes me enviaron para presentarle su súplica: <strong>10</strong> ‘Si ustedes al final se quedan en este país, yo los edificaré y no los derrumbaré, los plantaré y no los arrancaré, porque sentiré pesar por la calamidad que les he causado.</p>
          <p><strong>19</strong> Jehová ha hablado contra ustedes, oh, resto de Judá. No vayan a Egipto. Tengan bien claro que hoy les he advertido.</p>
        </Scripture>
        <div className="callout clear">
          <strong>El mensaje de Jehová era muy claro.</strong>
          <p>No dejaba nada a la duda.</p>
        </div>
        <p>La instrucción era: <strong>“Quédense en Judá”.</strong> Jehová les promete que no les harán daño si lo obedecen.</p>
        <p className="transition">Ahora veamos cómo reaccionan...</p>
      </>
    ),
  },
  {
    id: "desobediencia",
    number: "04",
    title: "Rechazaron el consejo",
    content: (
      <>
        <Scripture reference="Jeremías 43:4-7">
          <p><strong>4</strong> Así que Johanán hijo de Caréah, todos los jefes del ejército y toda la gente desobedecieron la voz de Jehová y no se quedaron en la tierra de Judá. <strong>5</strong> En vez de eso, Johanán hijo de Caréah y todos los jefes del ejército se llevaron al resto de la gente de Judá que había vuelto a la tierra de Judá desde todas las naciones adonde había sido dispersada para vivir de nuevo allí. <strong>6</strong> Se llevaron a los hombres, las mujeres, los niños, las hijas del rey y a todos los que Nebuzaradán, el jefe de la guardia, había dejado con Guedalías, hijo de Ahicam, hijo de Safán, así como al profeta Jeremías y a Baruc hijo de Nerías. <strong>7</strong> Entraron a la tierra de Egipto, pues no obedecieron la voz de Jehová, y llegaron hasta Tahpanhés.</p>
        </Scripture>
        <div className="warning-card">
          <span className="warning-label">Una advertencia para nosotros</span>
          <p>Entonces aquí vemos con claridad que la consulta a Jehová no era para obedecer. Solo querían confirmar si Jehová pensaba igual que ellos.</p>
        </div>
        <p>Qué atrevimiento. Ellos deseaban que Jehová se amoldara a sus decisiones.</p>
        <p>Al final, ese error les costó a muchos la vida.</p>
      </>
    ),
  },
  {
    id: "aplicacion",
    number: "05",
    title: "¿Pongo en práctica el consejo bíblico?",
    content: (
      <>
        <div className="reflection-card">
          <span className="reflection-label">Meditemos</span>
          <p>“Cuando me dan un consejo basado en la Biblia, ¿lo pongo en práctica aunque no sea lo que quiero oír?”</p>
        </div>
        <h3>Imagine la siguiente escena</h3>
        <p>Un hermano recibe una oferta de trabajo bien remunerada. Pero debe sacrificar una cosa por otra: por un lado, le permite mejorar su estilo de vida, a costa de estar lejos de su familia.</p>
        <p>Este hermano acude a un anciano y este hermanito le brinda consejos usando la Biblia.</p>
        <p>Pero al hermano que le ofrecieron trabajo no le gustó para nada ese consejo. Él desea que le digan: “Hermanito, acepte el trabajo, no hay problema”.</p>
        <p>Ese mismo hermanito va y busca a otros hasta que consigue la respuesta que quiere.</p>
        <div className="callout insight">
          <p>Es fácil notar que ese hermano no buscaba el consejo de Jehová. Buscaba una respuesta que le confirmara su propia decisión.</p>
        </div>
      </>
    ),
  },
]

function Scripture({ reference, children }) {
  return (
    <div className="scripture-card">
      <div className="scripture-heading">
        <span className="scripture-icon">✦</span>
        <span>Lectura bíblica</span>
        <strong>{reference}</strong>
      </div>
      <div className="scripture-text">{children}</div>
    </div>
  )
}

export default function DiscourseConfirmationBias() {
  const [openSection, setOpenSection] = useState("contexto")
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [timerOpen, setTimerOpen] = useState(false)

  useEffect(() => {
    if (!running) return undefined
    const interval = window.setInterval(() => setTime((value) => value + 1), 1000)
    return () => window.clearInterval(interval)
  }, [running])

  const formattedTime = `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`

  return (
    <main className="discourse-page">
      <style jsx>{`
        .discourse-page { min-height: 100vh; padding: 34px 20px 72px; color: #263238; background: linear-gradient(135deg, #f4f8f7, #e9f0ef); font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        .discourse-shell { max-width: 920px; margin: 0 auto; }
        .timer { position: fixed; top: 18px; right: 18px; z-index: 10; border: 1px solid #c7d8d4; border-radius: 16px; background: rgba(255,255,255,.94); box-shadow: 0 12px 32px rgba(28,58,52,.16); backdrop-filter: blur(14px); overflow: hidden; }
        .timer-display { padding: 11px 17px; color: #176b5d; font: 700 24px/1 ui-monospace, monospace; letter-spacing: 1px; cursor: pointer; }
        .timer-controls { display: flex; gap: 8px; padding: 0 12px 12px; }
        .timer button { border: 0; border-radius: 9px; padding: 9px 12px; color: white; background: #167c6c; font-weight: 700; cursor: pointer; transition: transform .2s, filter .2s; }
        .timer button:hover { transform: translateY(-1px); filter: brightness(1.08); }
        .timer button.reset { background: #64748b; }
        .hero { padding: 44px 42px; border-radius: 28px; color: white; background: linear-gradient(135deg, #176b5d, #2d8b77); box-shadow: 0 18px 42px rgba(23,107,93,.23); }
        .eyebrow { margin: 0 0 14px; color: #b9f2df; font-size: .76rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        h1 { margin: 0; max-width: 720px; font-size: clamp(2rem, 5vw, 3.8rem); line-height: 1.04; letter-spacing: -.045em; }
        .hero-subtitle { max-width: 650px; margin: 20px 0 0; color: #e1faf3; font-size: 1.08rem; line-height: 1.7; }
        .intro { margin: 24px 0; padding: 25px 28px; border: 1px solid #d3e2df; border-radius: 20px; background: rgba(255,255,255,.78); box-shadow: 0 8px 25px rgba(28,58,52,.06); line-height: 1.8; }
        .intro strong { color: #176b5d; }
        .section-list { display: grid; gap: 15px; }
        .section-card { overflow: hidden; border: 1px solid #cfdfdc; border-radius: 18px; background: rgba(255,255,255,.88); box-shadow: 0 6px 20px rgba(28,58,52,.07); }
        .section-trigger { display: flex; align-items: center; gap: 16px; width: 100%; padding: 20px 22px; border: 0; color: #213d38; background: transparent; text-align: left; cursor: pointer; }
        .section-trigger:hover { background: #f1f8f6; }
        .section-number { display: grid; flex: 0 0 42px; place-items: center; width: 42px; height: 42px; border-radius: 13px; color: white; background: #176b5d; font-weight: 800; }
        .section-title { flex: 1; font-size: 1.08rem; font-weight: 800; }
        .chevron { color: #176b5d; font-size: 1.35rem; transition: transform .3s; }
        .chevron.open { transform: rotate(180deg); }
        .section-body { padding: 0 28px 28px; border-top: 1px solid #e3eeeb; animation: reveal .28s ease; line-height: 1.8; }
        .section-body p { margin: 18px 0; }
        .section-body h3 { margin: 25px 0 10px; color: #176b5d; font-size: 1.12rem; }
        .section-body ul { padding-left: 22px; }
        .section-body li { margin: 9px 0; }
        .lead { font-size: 1.16rem; }
        .transition { color: #176b5d; font-weight: 800; }
        .callout, .question-card, .warning-card, .reflection-card { margin: 22px 0; padding: 19px 21px; border-radius: 14px; }
        .callout { border-left: 5px solid #2d8b77; background: #e9f7f2; }
        .callout.clear { border-color: #4384a8; background: #edf6fb; }
        .callout.insight { border-color: #a8782b; background: #fff7e5; }
        .callout p, .question-card p, .warning-card p, .reflection-card p { margin: 0; }
        .question-card { display: flex; gap: 15px; border: 1px solid #b8dacf; background: #eefaf6; }
        .question-mark { display: grid; flex: 0 0 30px; place-items: center; width: 30px; height: 30px; border-radius: 50%; color: white; background: #176b5d; font-weight: 800; }
        .warning-card { border-left: 5px solid #c27d2c; background: #fff5df; }
        .warning-label, .reflection-label { display: block; margin-bottom: 8px; color: #98601b; font-size: .75rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .reflection-card { border: 1px solid #b9d5e5; background: linear-gradient(135deg, #edf7fc, #f7fbfd); }
        .reflection-card p { color: #245a72; font-size: 1.12rem; font-weight: 750; }
        .scripture-card { margin: 24px 0; border: 1px solid #bfdad3; border-radius: 16px; overflow: hidden; background: #fbfffe; box-shadow: 0 7px 20px rgba(23,107,93,.08); }
        .scripture-heading { display: flex; align-items: center; gap: 10px; padding: 13px 17px; color: #176b5d; background: #e8f5f1; font-size: .82rem; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }
        .scripture-heading strong { margin-left: auto; padding: 5px 10px; border-radius: 8px; color: white; background: #176b5d; font-size: .75rem; letter-spacing: 0; }
        .scripture-text { padding: 4px 21px 15px; color: #354a46; line-height: 1.85; }
        .scripture-text p { margin: 15px 0; }
        .scripture-text strong { color: #176b5d; }
        .conclusion { margin-top: 24px; padding: 27px 30px; border-radius: 20px; color: white; background: linear-gradient(135deg, #176b5d, #245a72); box-shadow: 0 14px 30px rgba(23,107,93,.18); line-height: 1.8; }
        .conclusion p { margin: 0; }
        @keyframes reveal { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 640px) { .discourse-page { padding: 20px 12px 50px; } .hero { padding: 30px 24px; border-radius: 22px; } .intro, .section-body { padding-left: 20px; padding-right: 20px; } .section-trigger { padding: 17px; } .scripture-heading { align-items: flex-start; flex-wrap: wrap; } .scripture-heading strong { margin-left: 0; } .timer { top: 10px; right: 10px; } }
      `}</style>

      <div className="timer">
        <div className="timer-display" onClick={() => setTimerOpen((value) => !value)}>{formattedTime}</div>
        {timerOpen && (
          <div className="timer-controls">
            <button onClick={() => setRunning((value) => !value)}>{running ? "Pausar" : "Iniciar"}</button>
            <button className="reset" onClick={() => { setTime(0); setRunning(false) }}>Reiniciar</button>
          </div>
        )}
      </div>

      <div className="discourse-shell">
        <header className="hero">
          <p className="eyebrow">Discurso bíblico</p>
          <h1>¿Busco el consejo de Jehová o solo confirmación?</h1>
          <p className="hero-subtitle">Aprendamos de lo que ocurrió con el resto de Judá después del asesinato de Guedalías.</p>
        </header>

        <section className="intro">
          <p>Este discurso nos ayudará a examinar con sinceridad nuestra actitud cuando pedimos consejo basado en la Biblia. Meditaremos en el relato de Jeremías 42 y 43 y veremos por qué debemos estar resueltos a aceptar la guía de Jehová.</p>
        </section>

        <section className="section-list" aria-label="Contenido del discurso">
          {sections.map((section) => {
            const isOpen = openSection === section.id
            return (
              <article className="section-card" key={section.id}>
                <button className="section-trigger" onClick={() => setOpenSection(isOpen ? "" : section.id)} aria-expanded={isOpen}>
                  <span className="section-number">{section.number}</span>
                  <span className="section-title">{section.title}</span>
                  <span className={`chevron ${isOpen ? "open" : ""}`} aria-hidden="true">⌄</span>
                </button>
                {isOpen && <div className="section-body">{section.content}</div>}
              </article>
            )
          })}
        </section>

        <footer className="conclusion">
          <p>Así que, hermanos, estemos siempre resueltos a pedir y aceptar consejos que vengan de Jehová.</p>
        </footer>
      </div>
    </main>
  )
}

export { Scripture }
