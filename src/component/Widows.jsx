import { useEffect, useRef, useState } from "react";

export default function DiscourseJehovahProtectsWidows() {
  const [darkMode, setDarkMode] = useState(false);
  const [timerExpanded, setTimerExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((time) => time + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <main className={`widows-discourse ${darkMode ? "is-dark" : ""}`}>
      <button
        className="theme-toggle"
        type="button"
        onClick={() => setDarkMode((value) => !value)}
        aria-label={darkMode ? "Activar modo día" : "Activar modo noche"}
      >
        {darkMode ? "Modo día" : "Modo noche"}
      </button>

      <section
        className={`timer-widget ${timerExpanded ? "is-expanded" : "is-collapsed"} ${running ? "is-running" : ""}`}
        aria-label="Cronómetro del discurso"
        onClick={() => !timerExpanded && setTimerExpanded(true)}
      >
        <div className="timer-value">{formatTime(elapsed)}</div>
        {timerExpanded ? (
          <div className="timer-controls" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="timer-button timer-start" onClick={() => setRunning((value) => !value)}>
              {running ? "Pausar" : "Iniciar"}
            </button>
            <button
              type="button"
              className="timer-button timer-reset"
              onClick={() => {
                setRunning(false);
                setElapsed(0);
              }}
            >
              Reiniciar
            </button>
            <button type="button" className="timer-close" onClick={() => setTimerExpanded(false)}>
              Cerrar
            </button>
          </div>
        ) : (
          <span className="timer-hint">Abrir controles</span>
        )}
      </section>

      <header className="discourse-hero">
        <span className="eyebrow">Asignación</span>
        <h1>Jehová protege a las viudas</h1>
        <p className="hero-subtitle">Una reflexión sobre el cuidado, la protección y la honra que Jehová les da.</p>
      </header>

      <div className="discourse-content">
        <section className="intro-card" aria-labelledby="intro-title">
          <div className="section-kicker">Introducción</div>
          <h2 id="intro-title">Jehová decide llegar a ser lo que haga falta</h2>
          <p>
            El libro <em>El Reino de Dios ya está gobernando</em> menciona una idea muy bonita sobre el nombre de Jehová: "Jehová decide llegar a ser lo que haga falta para cumplir las promesas que les hace a su pueblo".
          </p>
          <blockquote>
            <p>"Qué aspecto tan bonito de Jehová! Precisamente, él prometió cuidar de las viudas.</p>
            <cite>Salmo 68:5</cite>
          </blockquote>
          <p>
            Salmo 68:5 lo llama "padre de los huérfanos y protector de las viudas".
          </p>
          <p>
            En esta asignación veremos algunos relatos que muestran cómo Jehová cuidó y protegió a las viudas, y qué podemos aprender de ellos. Comencemos con el primer punto...
          </p>
        </section>

        <div className="transition-label">Preguntas para analizar</div>

        <section className="question-card question-blue" aria-labelledby="question-one">
          <div className="question-number">01</div>
          <div className="question-body">
            <h2 id="question-one">Use las herramientas de investigación disponibles en su idioma para encontrar uno o dos relatos bíblicos que hablen sobre alguna viuda.</h2>
            <div className="question-prompt">¿Cómo nos muestran estas historias que Jehová quiere y protege a las viudas?</div>
            <div className="notes-area" aria-label="Espacio para notas">Ideas y relatos bíblicos</div>
          </div>
        </section>

        <section className="video-card" aria-labelledby="video-title">
          <div className="section-kicker">A continuación</div>
          <h2 id="video-title">Ahora veamos cómo Jehová cuida de ellas en la actualidad...</h2>
          <div className="video-placeholder">
            <div className="play-mark" aria-hidden="true">▶</div>
            <p>Veamos el siguiente vídeo</p>
          </div>
        </section>

        <section className="question-card question-green" aria-labelledby="question-two">
          <div className="question-number">02</div>
          <div className="question-body">
            <h2 id="question-two">¿Qué le enseña este video sobre cómo Jehová cuida y protege a las viudas hoy en día?</h2>
            <div className="answer-highlight">
              Jehová usa a los hermanos de la congregación para darles ayuda y honra, además que hace parte de la nuestra adoración.
            </div>
          </div>
        </section>

        <section className="question-card question-purple" aria-labelledby="question-three">
          <div className="question-number">03</div>
          <div className="question-body">
            <h2 id="question-three">¿Cómo podemos honrar a las viudas hoy en día?</h2>
            <div className="notes-area" aria-label="Espacio para respuestas">Aplicación personal y comentarios</div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .widows-discourse {
          --ink: #243447;
          --muted: #607080;
          --paper: #f5f8fb;
          --card: #ffffff;
          --line: #dce6ef;
          min-height: 100vh;
          padding: 84px 20px 64px;
          color: var(--ink);
          background: linear-gradient(145deg, #eef5f8 0%, #f9fbfd 52%, #edf4f2 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition: background .35s ease, color .35s ease;
        }
        .discourse-content { max-width: 900px; margin: 0 auto; }
        .theme-toggle, .timer-widget { position: fixed; z-index: 20; border: 1px solid rgba(255,255,255,.8); box-shadow: 0 12px 32px rgba(36,52,71,.14); backdrop-filter: blur(16px); }
        .theme-toggle { top: 16px; left: 16px; padding: 10px 16px; border-radius: 999px; color: #294052; background: rgba(255,255,255,.92); font-weight: 700; cursor: pointer; transition: transform .25s ease, box-shadow .25s ease; }
        .theme-toggle:hover { transform: translateY(-2px); box-shadow: 0 16px 38px rgba(36,52,71,.2); }
        .timer-widget { top: 16px; right: 16px; min-width: 132px; padding: 10px 14px; border-radius: 16px; color: #193c42; background: rgba(255,255,255,.94); cursor: pointer; transition: all .3s ease; }
        .timer-widget.is-expanded { min-width: 280px; cursor: default; }
        .timer-widget.is-running { border-color: #65bda8; box-shadow: 0 12px 32px rgba(45,145,116,.22), 0 0 0 4px rgba(101,189,168,.12); }
        .timer-value { font: 800 1.55rem/1.1 ui-monospace, SFMono-Regular, Menlo, monospace; text-align: center; letter-spacing: .06em; }
        .timer-hint { display: block; margin-top: 5px; color: #718096; font-size: .68rem; text-align: center; }
        .timer-controls { display: flex; gap: 7px; margin-top: 12px; }
        .timer-button, .timer-close { flex: 1; border: 0; border-radius: 9px; padding: 9px 8px; color: white; font-weight: 700; font-size: .75rem; cursor: pointer; transition: transform .2s ease, filter .2s ease; }
        .timer-button:hover, .timer-close:hover { transform: translateY(-1px); filter: brightness(1.06); }
        .timer-start { background: #298c70; } .timer-reset { background: #c45c52; } .timer-close { background: #718096; }
        .discourse-hero { max-width: 900px; margin: 0 auto 30px; padding: 52px 42px; border-radius: 28px; color: white; background: linear-gradient(135deg, #246a70, #2e8b7d 56%, #6bb39a); box-shadow: 0 18px 42px rgba(39,103,105,.22); }
        .eyebrow, .section-kicker { display: inline-block; color: #d8fff2; font-size: .75rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
        .discourse-hero h1 { max-width: 650px; margin: 12px 0 10px; font-size: clamp(2rem, 5vw, 3.8rem); line-height: 1.08; letter-spacing: -.045em; }
        .hero-subtitle { max-width: 600px; margin: 0; color: #e6fff7; font-size: 1.05rem; }
        .intro-card, .question-card, .video-card { margin: 24px 0; padding: clamp(24px, 5vw, 38px); border: 1px solid var(--line); border-radius: 22px; background: var(--card); box-shadow: 0 10px 28px rgba(40,67,89,.08); }
        .section-kicker { color: #287d70; }
        .intro-card h2, .video-card h2 { margin: 9px 0 18px; color: var(--ink); font-size: clamp(1.35rem, 3vw, 2rem); line-height: 1.2; }
        .intro-card p, .question-body h2 { line-height: 1.8; }
        .intro-card blockquote { margin: 24px 0; padding: 20px 22px; border-left: 5px solid #4da890; border-radius: 0 15px 15px 0; background: #edf9f5; color: #245b55; }
        .intro-card blockquote p { margin: 0 0 10px; font-weight: 700; }
        .intro-card cite { font-size: .85rem; font-style: normal; font-weight: 800; color: #287d70; }
        .transition-label { margin: 34px 0 14px; color: #547080; font-size: .78rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
        .question-card { display: flex; gap: 22px; overflow: hidden; border-left: 6px solid #5599c5; }
        .question-green { border-left-color: #4da890; } .question-purple { border-left-color: #8b77bd; }
        .question-number { display: grid; flex: 0 0 54px; height: 54px; place-items: center; border-radius: 16px; color: white; background: #5599c5; font-weight: 900; }
        .question-green .question-number { background: #4da890; } .question-purple .question-number { background: #8b77bd; }
        .question-body { min-width: 0; flex: 1; }
        .question-body h2 { margin: 0; font-size: clamp(1.1rem, 2.4vw, 1.45rem); }
        .question-prompt { margin-top: 18px; padding: 16px 18px; border-radius: 13px; color: #245674; background: #eef7fc; font-weight: 700; line-height: 1.6; }
        .answer-highlight { margin-top: 18px; padding: 18px; border-radius: 14px; color: #245b55; background: #edf9f5; line-height: 1.75; font-weight: 650; }
        .video-card { text-align: center; }
        .video-placeholder { display: grid; min-height: 170px; place-items: center; margin-top: 22px; padding: 24px; border: 1px dashed #9bb8c2; border-radius: 18px; color: #53717b; background: linear-gradient(145deg, #f0f8f8, #f7fbfc); }
        .video-placeholder p { margin: 10px 0 0; font-weight: 750; }
        .play-mark { display: grid; width: 54px; height: 54px; place-items: center; padding-left: 3px; border-radius: 50%; color: white; background: #3b8f82; box-shadow: 0 8px 18px rgba(59,143,130,.25); }
        .notes-area { min-height: 54px; margin-top: 18px; padding: 15px; border: 1px dashed #b7c8d4; border-radius: 12px; color: #718096; background: var(--paper); font-size: .88rem; }
        .is-dark { --ink: #edf5f4; --muted: #b8c8cc; --paper: #26343a; --card: #202d33; --line: #3d5158; background: linear-gradient(145deg, #172327, #1c2b30 55%, #172b28); }
        .is-dark .theme-toggle, .is-dark .timer-widget { color: #e7f3f0; background: rgba(38,52,58,.96); border-color: #52676d; }
        .is-dark .discourse-hero { background: linear-gradient(135deg, #22545a, #287568 56%, #477f70); }
        .is-dark .intro-card blockquote, .is-dark .question-prompt, .is-dark .answer-highlight { color: #c4eee2; background: #243e3d; }
        .is-dark .video-placeholder { color: #b8d2d1; border-color: #557579; background: #25363b; }
        @media (max-width: 640px) { .widows-discourse { padding: 78px 12px 42px; } .theme-toggle { left: 10px; } .timer-widget { right: 10px; } .discourse-hero { padding: 34px 24px; border-radius: 22px; } .question-card { gap: 14px; padding: 22px 18px; } .question-number { flex-basis: 44px; height: 44px; border-radius: 12px; } .timer-widget.is-expanded { min-width: 220px; } }
      `}</style>
    </main>
  );
}
