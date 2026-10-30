"use client"

import { useEffect, useState } from "react"

const sections = [
  {
    title: "PERTURBADORES",
    color: "#b45309",
    questions: [
      {
        title: "1. ¿Cómo debemos actuar cuando alguien intenta interrumpir la predicación?",
        content: (
          <>
            <p>La pauta principal es mantener la calma, ser corteses y evitar las discusiones.</p>
            <p>El objetivo no es ganar una discusión ni convencer a alguien que no desea escuchar. Debemos proteger la paz y evitar que la situación se convierta en un conflicto.</p>
            <p>La guía S-148 indica que, si alguien intenta perturbar la predicación, debemos:</p>
            <ul><li>No discutir ni entrar en provocaciones.</li><li>Mantener la calma y tratar a la persona con cortesía.</li><li>Intentar terminar la conversación de manera amable.</li><li>Si continúa perturbando la tranquilidad o se enoja, retirarnos.</li><li>Si hay amenazas, puede ser necesario dejar temporalmente el exhibidor o los equipos.</li><li>En situaciones extremas, podría ser necesario acudir a las autoridades.</li></ul>
            <p className="reference">Base bíblica: Proverbios 15:1; 2 Timoteo 2:24, 25.</p>
          </>
        ),
      },
      {
        title: "2. ¿Por qué no debemos responder a las provocaciones?",
        content: (
          <>
            <p>Porque una respuesta impulsiva puede empeorar la situación. Aunque tengamos buenas intenciones, no debemos permitir que una conversación se transforme en una discusión.</p>
            <p>La publicación ¡Despertad! del 22 de noviembre de 2001, páginas 23-25, en el artículo «¿Qué hago si alguien se enoja conmigo?», presenta experiencias que nos ayudan a comprenderlo.</p>
            <ul><li>David mantuvo la calma cuando un hombre se mostró agresivo con él. En lugar de responder con hostilidad, averiguó qué le pasaba y descubrió que el hombre estaba molesto porque le habían robado su almuerzo. David le ofreció comprarle otro y la situación terminó de manera cordial.</li><li>Jeremy, en cambio, perdió el control cuando alguien insultó a su madre y terminó involucrándose en una pelea.</li><li>Merissa se encontró con unas jóvenes que querían pelear. En vez de enfrentarlas, se alejó y pidió ayuda a un guardia de seguridad.</li></ul>
            <p><strong>¿Qué nos enseñan estas experiencias?</strong></p><p>Que mantener la calma no significa ser débiles. Significa tener dominio propio y saber cuándo es mejor retirarse.</p>
          </>
        ),
      },
      {
        title: "3. Ejemplos prácticos para analizar con los publicadores",
        content: (
          <>
            <div className="scenario"><strong>Situación 1:</strong> Una persona se acerca al exhibidor y dice: «¡Ustedes no deberían estar aquí! ¡Dejen de molestar a la gente!».<p><strong>¿Cómo podríamos reaccionar?</strong></p><p className="answer">Respuesta sugerida: Mantener una expresión tranquila y contestar con respeto: «Entendemos que no todos compartan nuestras creencias. No queremos incomodarlo. Que tenga un buen día». Después, si la persona continúa molestando, debemos retirarnos.</p></div>
            <div className="scenario"><strong>Situación 2:</strong> Una persona comienza a grabar a los publicadores y hace comentarios provocadores.<p><strong>¿Deberíamos intentar demostrarle que está equivocada?</strong></p><p className="answer">Respuesta sugerida: No. No debemos convertir la situación en una discusión. Podemos mantener la calma y, si la persona continúa perturbando la tranquilidad, retirarnos.</p></div>
            <div className="scenario"><strong>Situación 3:</strong> Una persona amenaza con agredir a los publicadores.<p><strong>¿Deberíamos quedarnos para defender el exhibidor?</strong></p><p className="answer">Respuesta sugerida: No. La seguridad de los publicadores es más importante que el equipo. Puede ser necesario dejar temporalmente el exhibidor y alejarnos. Si la situación lo requiere, se puede acudir a las autoridades.</p></div>
          </>
        ),
      },
      {
        title: "4. Preguntas para reflexionar",
        content: <><ul><li>¿Qué sería más importante: demostrarle a una persona que está equivocada o evitar que la situación empeore?</li><li>Si alguien nos insulta, ¿qué impresión daríamos si respondemos de la misma manera?</li><li>¿Por qué retirarnos de una situación peligrosa no significa que estamos abandonando nuestra asignación?</li><li>¿Cómo podemos demostrar que somos personas pacíficas incluso cuando alguien nos trata mal?</li></ul><p className="idea">Idea principal: No estamos allí para discutir. Estamos allí para dar testimonio. Si una persona no desea escucharnos, debemos respetar su decisión y actuar con prudencia.</p></>,
      },
    ],
  },
  {
    title: "EXPULSADOS",
    color: "#166534",
    questions: [
      { title: "1. ¿Cómo debemos actuar si una persona expulsada se acerca al exhibidor?", content: <><p>La guía S-148 establece una instrucción específica para esta situación.</p><p>Si una persona expulsada desea regresar a la congregación, debemos mostrarle la sección «Buscar una reunión» de jw.org, para que pueda encontrar la congregación más cercana.</p><p>Podemos ayudarla a localizar la información, pero no debemos intentar determinar por nuestra cuenta su situación espiritual ni asumir el papel de los ancianos.</p><p className="reference">Base bíblica: Lucas 15:11-24; Santiago 5:19, 20.</p></> },
      { title: "2. ¿Cómo podemos mostrar empatía?", content: <><p>Es importante recordar que una persona que desea regresar puede estar atravesando sentimientos difíciles.</p><p>La Atalaya del 15 de abril de 2015, páginas 29-31, artículo «La expulsión: una muestra de amor», explica que la expulsión es una medida disciplinaria que busca ayudar a la persona a reaccionar y que la congregación debe seguir las instrucciones bíblicas.</p><p>También presenta la experiencia de un padre cuyo hijo fue expulsado y regresó después de diez años. Con el tiempo, llegó a ser anciano.</p><p>Esto nos ayuda a recordar que no debemos tratar con desprecio a quien desea regresar.</p></> },
      { title: "3. Ejemplos prácticos", content: <><div className="scenario"><strong>Situación 1:</strong> Una persona se acerca al exhibidor y dice: «Hace muchos años que no voy a las reuniones. Me gustaría regresar, pero no sé cómo hacerlo».<p><strong>¿Cómo podríamos ayudarla?</strong></p><p className="answer">Respuesta sugerida: Escucharla con respeto y mostrarle la sección «Buscar una reunión» de jw.org. Podemos explicarle cómo encontrar el Salón del Reino más cercano. No debemos presionarla ni intentar resolver todos los asuntos de su situación en ese momento.</p></div><div className="scenario"><strong>Situación 2:</strong> Una persona dice: «Fui expulsado hace tiempo, pero quiero volver. ¿Qué tengo que hacer?».<p><strong>¿Cómo deberíamos reaccionar?</strong></p><p className="answer">Respuesta sugerida: Podemos mostrarle la sección «Buscar una reunión» de jw.org y animarla a acercarse a la congregación. Debemos tratarla con respeto y cariño, sin hacer preguntas innecesarias sobre su pasado.</p></div><div className="scenario"><strong>Situación 3:</strong> Una persona se acerca y comienza a contar detalles de su expulsión.<p><strong>¿Deberíamos darle nuestra opinión sobre si los ancianos actuaron correctamente?</strong></p><p className="answer">Respuesta sugerida: No. No nos corresponde juzgar los asuntos de la congregación ni emitir opiniones sobre decisiones que no conocemos. Debemos escuchar con respeto y dirigirla a los medios indicados para encontrar una congregación.</p></div></> },
      { title: "4. Una distinción importante: expulsados e inactivos", content: <><p>Debemos tener presente que no son situaciones idénticas.</p><ul><li>Persona expulsada: Si desea regresar, podemos mostrarle la sección «Buscar una reunión» de jw.org.</li><li>Persona inactiva: La publicación Jehová desea que vuelva puede ser una herramienta útil para ayudarla a acercarse nuevamente a Jehová.</li></ul><p>La Atalaya de junio de 2020, páginas 24-29, artículo «Vuelvan a mí», destaca la importancia de demostrar paciencia, empatía y amor al ayudar a los hermanos inactivos.</p></> },
      { title: "5. Preguntas para reflexionar", content: <><ul><li>¿Cómo podría sentirse alguien que desea regresar después de muchos años?</li><li>¿Por qué debemos evitar hacer preguntas que puedan incomodar a esa persona?</li><li>¿Qué diferencia hay entre ayudar a alguien a encontrar una congregación y tratar de resolver personalmente su situación?</li><li>¿Cómo podemos demostrar que nos alegra que alguien quiera acercarse nuevamente a Jehová?</li></ul><p className="idea">Idea principal: Debemos tratar con respeto y dignidad a quienes desean regresar, siguiendo las instrucciones de la organización y sin asumir responsabilidades que no nos corresponden.</p></> },
    ],
  },
  {
    title: "MEDIOS DE COMUNICACIÓN",
    color: "#1d4ed8",
    questions: [
      { title: "1. ¿Cómo debemos actuar si un periodista se acerca al exhibidor?", content: <><p>La guía S-148 establece que, por lo general, los publicadores no deben conceder entrevistas personales a los medios de comunicación.</p><p>Si un periodista se acerca y desea obtener información sobre nuestras creencias o actividades, debemos dirigirlo a las secciones correspondientes de jw.org:</p><ul><li>Prensa.</li><li>Sobre nosotros.</li></ul><p>Estas secciones contienen información oficial sobre los testigos de Jehová.</p></> },
      { title: "2. ¿Qué debemos hacer si el periodista insiste en entrevistarnos?", content: <><p>Si insiste en obtener una entrevista, la guía indica que podemos invitarlo a dejar sus datos de contacto y una breve explicación de lo que desea conocer.</p><p>Después, debemos informar cuanto antes a un anciano.</p><p>Es importante no improvisar declaraciones, dar opiniones personales en nombre de la organización ni comprometernos a conceder entrevistas.</p></> },
      { title: "3. Ejemplos prácticos", content: <><div className="scenario"><strong>Situación 1:</strong> Un periodista se acerca y pregunta: «Buenos días. Estamos haciendo un reportaje sobre los testigos de Jehová. ¿Podría explicarme cuáles son sus creencias?».<p className="answer">Respuesta sugerida: «Buenos días. Muchas gracias por su interés. En jw.org encontrará información oficial sobre nuestras creencias y actividades. Le recomiendo consultar las secciones “Prensa” y “Sobre nosotros”».</p></div><div className="scenario"><strong>Situación 2:</strong> El periodista dice: «Necesito que alguien me conceda una entrevista ahora mismo. ¿Usted puede hablar en representación de la organización?».<p className="answer">Respuesta sugerida: Explicarle amablemente que no estamos autorizados para conceder entrevistas personales. Si desea, puede dejar sus datos y una breve explicación de su solicitud. Después, informaremos cuanto antes a un anciano.</p></div><div className="scenario"><strong>Situación 3:</strong> El periodista pregunta algo polémico y espera una respuesta inmediata. Por ejemplo: «¿Por qué los testigos de Jehová tienen esa postura sobre determinado asunto?».<p className="answer">Respuesta sugerida: No debemos improvisar una declaración ante los medios. Lo apropiado es dirigirlo a la información oficial de jw.org y seguir las instrucciones de la guía.</p></div></> },
      { title: "4. Preguntas para reflexionar", content: <><ul><li>¿Por qué no debemos conceder entrevistas personales en nombre de la organización?</li><li>¿Qué diferencia hay entre conversar con una persona interesada y responder a un periodista que busca declaraciones para un reportaje?</li><li>¿Por qué es importante dirigir a los medios a las fuentes oficiales?</li><li>¿Qué debemos hacer si el periodista insiste o plantea preguntas difíciles?</li></ul><p className="idea">Idea principal: Debemos actuar con prudencia y recordar que no nos corresponde hablar en representación de la organización ante los medios de comunicación.</p></> },
    ],
  },
]

export default function TrainingGuidance() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return undefined
    const interval = setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => clearInterval(interval)
  }, [running])

  const formatTime = (value) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`

  return (
    <main className="training-page">
      <style jsx>{`
        .training-page { min-height: 100vh; padding: 32px 18px 72px; background: #f6f7f9; color: #243247; font-family: Georgia, 'Times New Roman', serif; line-height: 1.65; }
        .training-shell { max-width: 920px; margin: 0 auto; }
        .hero { padding: 42px 34px; border-radius: 22px; color: white; background: linear-gradient(135deg, #20344e, #335d70); box-shadow: 0 18px 45px rgba(32, 52, 78, .2); text-align: center; }
        .eyebrow { margin: 0 0 8px; letter-spacing: .14em; font: 700 12px/1.2 Arial, sans-serif; opacity: .75; }
        h1 { margin: 0; font-size: clamp(2rem, 5vw, 3.3rem); line-height: 1.1; }
        .hero p { margin: 14px auto 0; max-width: 680px; opacity: .88; }
        .timer { position: sticky; top: 14px; z-index: 5; display: flex; align-items: center; justify-content: space-between; gap: 12px; max-width: 320px; margin: -20px 18px 28px auto; padding: 10px 12px 10px 16px; border: 1px solid #d8e0e8; border-radius: 14px; background: rgba(255,255,255,.96); box-shadow: 0 8px 24px rgba(32,52,78,.12); font-family: Arial, sans-serif; }
        .timer strong { font: 700 20px/1 'Courier New', monospace; color: #20344e; }
        .timer button { border: 0; border-radius: 8px; padding: 8px 11px; color: white; background: #335d70; cursor: pointer; font-weight: 700; }
        .timer button:last-child { background: #dbe5ec; color: #243247; }
        .section { margin-top: 28px; padding: 24px; border-radius: 18px; background: white; box-shadow: 0 8px 25px rgba(32,52,78,.08); border-top: 5px solid var(--section-color); }
        .section h2 { margin: 0 0 20px; color: var(--section-color); font-size: clamp(1.35rem, 3vw, 1.8rem); }
        .question { margin-top: 24px; padding: 22px 24px; border: 1px solid #e4eaf0; border-radius: 14px; background: #fbfcfd; box-shadow: 0 3px 10px rgba(32,52,78,.035); }
        .question:first-of-type { margin-top: 0; }
        .question-title { margin: 0 0 14px; color: #243247; font: 700 1.08rem/1.4 Arial, sans-serif; }
        .question-body { padding: 0; }
        p { margin: 0 0 13px; } ul { margin: 8px 0 16px; padding-left: 24px; } li { margin: 7px 0; }
        .reference { color: #52657a; font-style: italic; }
        .scenario { margin: 14px 0; padding: 15px 16px; border-left: 4px solid var(--section-color); border-radius: 0 10px 10px 0; background: #f5f7f9; }
        .answer { margin: 10px 0 0; color: #3d5268; }
        .idea { margin-top: 18px; padding: 14px 16px; border-radius: 10px; color: #20344e; background: #eef4f7; font-weight: 700; }
        .references { margin-top: 28px; padding: 24px; border-radius: 18px; color: #31465c; background: #e9eff3; }
        .references h2 { margin-top: 0; font-size: 1.25rem; }
        @media (max-width: 620px) { .training-page { padding: 16px 10px 48px; } .hero { padding: 30px 20px; } .section { padding: 18px 14px; } .timer { margin: -12px 8px 20px auto; } .question { padding: 18px 16px; } .question-title { font-size: 1rem; } }
      `}</style>
      <div className="training-shell">
        <header className="hero"><p className="eyebrow">CAPACITACIÓN PARA LOS PUBLICADORES</p><h1>Perturbadores, expulsados y medios de comunicación</h1><p>Principios y situaciones prácticas para actuar con prudencia, respeto y empatía.</p></header>
        <div className="timer" aria-label="Cronómetro"><strong>{formatTime(seconds)}</strong><div><button type="button" onClick={() => setRunning((value) => !value)}>{running ? "Pausar" : "Iniciar"}</button><button type="button" onClick={() => { setSeconds(0); setRunning(false) }}>Reiniciar</button></div></div>
        {sections.map((section) => <section className="section" style={{ "--section-color": section.color }} key={section.title}><h2>{section.title}</h2>{section.questions.map((question, index) => <article className="question" key={`${section.title}-${index}`}><h3 className="question-title">{question.title}</h3><div className="question-body">{question.content}</div></article>)}</section>)}
        <section className="references"><h2>Referencias para preparar esta capacitación</h2><ul><li>Guía S-148-S: Pautas para la predicación pública. Apartados sobre perturbadores, expulsados y medios de comunicación.</li><li>¡Despertad!, 22 de noviembre de 2001, páginas 23-25: «¿Qué hago si alguien se enoja conmigo?».</li><li>La Atalaya, 15 de abril de 2015, páginas 29-31: «La expulsión: una muestra de amor».</li><li>La Atalaya, junio de 2020, páginas 24-29: «Vuelvan a mí».</li><li><a href="https://www.jw.org/es/testigos-de-jehova/?utm_source=chatgpt.com">jw.org — Sobre nosotros</a>.</li><li><a href="https://www.jw.org/es/noticias/?utm_source=chatgpt.com">jw.org — Prensa</a>.</li></ul><p>Nota: Los diálogos de los ejemplos son situaciones hipotéticas para practicar. Las instrucciones y principios se basan en la guía S-148 y en las publicaciones citadas.</p></section>
      </div>
    </main>
  )
}
