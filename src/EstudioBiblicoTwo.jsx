import { useState, useEffect, useRef } from "react";

export default function DiscourseHolySpirit() {
  const [globalTime, setGlobalTime] = useState(0);
  const [globalRunning, setGlobalRunning] = useState(false);
  const [timerExpanded, setTimerExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (globalRunning) {
      intervalRef.current = setInterval(() => {
        setGlobalTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [globalRunning]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="page-wrapper" style={{ fontSize: `${fontSize}px` }}>
      {/* TIMER */}
      <div
        className={`timer-float ${timerExpanded ? "expanded" : "collapsed"}`}
        onClick={() => !timerExpanded && setTimerExpanded(true)}
      >
        <div className="timer-display">{formatTime(globalTime)}</div>
        {timerExpanded ? (
          <div className="timer-controls">
            <button
              className="timer-btn start"
              onClick={(e) => {
                e.stopPropagation();
                setGlobalRunning(!globalRunning);
              }}
            >
              {globalRunning ? "Pausar" : "Iniciar"}
            </button>
            <button
              className="timer-btn reset"
              onClick={(e) => {
                e.stopPropagation();
                setGlobalRunning(false);
                setGlobalTime(0);
              }}
            >
              Reiniciar
            </button>
            <div
              className="font-control"
              onClick={(e) => e.stopPropagation()}
            >
              <label>Fuente: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="28"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>
            <button
              className="timer-btn collapse"
              onClick={(e) => {
                e.stopPropagation();
                setTimerExpanded(false);
              }}
            >
              Minimizar
            </button>
          </div>
        ) : (
          <div className="timer-hint">Toca para expandir</div>
        )}
      </div>

      {/* CONTENT */}
      <div className="content-area">
        {/* SECTION INTRO */}
        <div className="lesson-card intro-card">
          <div className="lesson-header">
            <span className="lesson-number">14</span>
            <h1 className="lesson-title">Introduccion a la seccion numero 14</h1>
          </div>

          <div className="section-label">Que analizara esta seccion?</div>

          <div className="main-question">
            <span className="q-badge main-badge">P2</span>
            <p>Que lecciones encontraremos?</p>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta fiel numero 2</div>
            <ul className="answer-list">
              <li><strong>a)</strong> Jehova nos encargo darle gloria.</li>
              <li><strong>b)</strong> Dedicar nuestra vida mediante la oracion.</li>
              <li><strong>c)</strong> Demostraremos que apoyamos su gobierno.</li>
            </ul>
          </div>
        </div>

        {/* TOPIC - DISCIPULOS RECIBEN ESPIRITU SANTO */}
        <div className="lesson-card">
          <div className="topic-banner">
            <span className="topic-label">Tema</span>
            <h2 className="topic-title">Los discipulos reciben espiritu santo</h2>
          </div>

          <div className="section-label">Preguntas principales</div>

          <div className="main-question">
            <span className="q-badge main-badge">P1</span>
            <p>Que paso en las fiestas del Pentecostes del ano 33?</p>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 1</div>
            <p>120 discipulos se habian reunido. Ocurrio algo asombroso: alli recibieron espiritu santo.</p>
          </div>

          <div className="main-question">
            <span className="q-badge main-badge">P2</span>
            <p>Por que se bautizaron tantas personas?</p>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 2</div>
            <p>Pedro les explico que se les daria espiritu santo, asegurando la resurreccion a pesar de todo.</p>
          </div>

          <div className="main-question">
            <span className="q-badge main-badge">P3</span>
            <p>Como podemos aplicar Romanos 10:9?</p>
          </div>

          <div className="bible-text">
            <div className="bible-ref">Romanos 10:9 (leer y explicar)</div>
            <p>"Porque, si declaras publicamente esa palabra que esta en tu propia boca, que Jesus es Senor, y demuestras fe en tu corazon de que Dios lo levanto de entre los muertos, seras salvado".</p>
          </div>

          <div className="reflection-section">
            <h3 className="reflection-title">Leamos Juan 15:26</h3>
            <div className="main-question reflection-q">
              <span className="q-badge main-badge">R1</span>
              <p>Que nos ensena este relato acerca de Jehova?</p>
            </div>
            <div className="main-question reflection-q">
              <span className="q-badge main-badge">R2</span>
              <p>Que lecciones practicas podemos aprender de este relato?</p>
            </div>
            <div className="main-question reflection-q">
              <span className="q-badge main-badge">R3</span>
              <p>Como podemos aplicarlo en la congregacion Torices?</p>
            </div>
          </div>
        </div>

        {/* LESSON 95 */}
        <div className="lesson-card">
          <div className="lesson-header">
            <span className="lesson-number">95</span>
            <h1 className="lesson-title">Nada los detiene</h1>
          </div>

          <div className="topic-banner">
            <span className="topic-label">Tema</span>
            <h2 className="topic-title">Nada los detiene</h2>
          </div>

          <div className="section-label">Preguntas principales</div>

          <div className="main-question">
            <span className="q-badge main-badge">P1</span>
            <p>Por que no dejaron de predicar los discipulos?</p>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 1</div>
            <p>Porque oraron a Jehova para que los ayudara a ser valientes ante las necesidades ya vistas.</p>
          </div>

          <div className="main-question">
            <span className="q-badge main-badge">P2</span>
            <p>Como los ayudo Jehova?</p>
          </div>

          <div className="answer-block">
            <div className="answer-header">Respuesta 2</div>
            <p>Los ayudo con su espiritu santo. Dios lo ha demostrado...</p>
          </div>

          <div className="main-question">
            <span className="q-badge main-badge">P3</span>
            <p>Que nos ensena Hechos 5:29?</p>
          </div>

          <div className="bible-text large">
            <div className="bible-ref">Hechos 5:29, 30 (leer)</div>
            <p><sup>29</sup> "En respuesta, Pedro y los demas apostoles dijeron: 'Tenemos que obedecer a Dios como gobernante mas bien que a los hombres. <sup>30</sup> El Dios de nuestros antepasados resucito a Jesus, a quien ustedes mataron colgandolo en un madero'".</p>
          </div>

          <div className="reflection-section">
            <h3 className="reflection-title">Reflexion / Aplicacion - Leccion 95</h3>
            <div className="main-question reflection-q">
              <span className="q-badge main-badge">R1</span>
              <p>Que nos ensena este relato acerca de Jehova?</p>
            </div>
            <div className="main-question reflection-q">
              <span className="q-badge main-badge">R2</span>
              <p>Que lecciones practicas podemos aprender de este relato?</p>
            </div>
            <div className="main-question reflection-q">
              <span className="q-badge main-badge">R3</span>
              <p>Como aplicarlo en la congregacion?</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
          padding: 20px;
          padding-top: 80px;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: #2d3748;
          line-height: 1.7;
        }

        /* ========== TIMER ========== */
        .timer-float {
          position: fixed;
          top: 12px;
          right: 12px;
          z-index: 9999;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid #cbd5e0;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }
        .timer-float.collapsed {
          padding: 10px 20px;
        }
        .timer-float.collapsed:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.18);
        }
        .timer-float.expanded {
          padding: 16px 20px;
          cursor: default;
          min-width: 200px;
        }
        .timer-display {
          font-family: 'Courier New', monospace;
          font-size: 1.8em;
          font-weight: 700;
          color: #38a169;
          text-align: center;
          letter-spacing: 3px;
        }
        .timer-hint {
          color: #a0aec0;
          font-size: 0.65em;
          text-align: center;
          margin-top: 2px;
        }
        .timer-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }
        .timer-btn {
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.85em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .timer-btn.start {
          background: #38a169;
          color: #fff;
        }
        .timer-btn.start:hover {
          background: #2f855a;
        }
        .timer-btn.reset {
          background: #e53e3e;
          color: #fff;
        }
        .timer-btn.reset:hover {
          background: #c53030;
        }
        .timer-btn.collapse {
          background: #edf2f7;
          color: #718096;
        }
        .timer-btn.collapse:hover {
          background: #e2e8f0;
        }
        .font-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .font-control label {
          color: #718096;
          font-size: 0.75em;
        }
        .font-control input[type="range"] {
          width: 100%;
          accent-color: #38a169;
        }

        /* ========== CONTENT ========== */
        .content-area {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* ========== LESSON CARD ========== */
        .lesson-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .intro-card {
          border-top: 5px solid #38a169;
        }
        .lesson-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 3px solid #38a169;
        }
        .lesson-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: #38a169;
          color: #ffffff;
          font-size: 1.5em;
          font-weight: 800;
          border-radius: 14px;
          flex-shrink: 0;
        }
        .lesson-title {
          font-size: 1.5em;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
          line-height: 1.3;
        }

        /* ========== TOPIC BANNER ========== */
        .topic-banner {
          background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
          border-radius: 14px;
          padding: 22px 26px;
          margin-bottom: 24px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(56, 161, 105, 0.25);
        }
        .topic-label {
          display: inline-block;
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-size: 0.7em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 14px;
          border-radius: 20px;
          margin-bottom: 10px;
        }
        .topic-title {
          margin: 0;
          color: #ffffff;
          font-size: 1.5em;
          font-weight: 800;
          line-height: 1.3;
        }

        /* ========== SECTION LABELS ========== */
        .section-label {
          font-size: 0.8em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 6px 14px;
          border-radius: 6px;
          margin: 24px 0 14px 0;
          display: inline-block;
          background: #e6f4ea;
          color: #2f855a;
        }

        /* ========== MAIN QUESTIONS ========== */
        .main-question {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          margin: 10px 0;
          background: #f0fdf4;
          border-left: 5px solid #38a169;
          border-radius: 0 12px 12px 0;
        }
        .main-question p {
          margin: 0;
          font-weight: 600;
          font-size: 1.05em;
          color: #2f855a;
        }
        .q-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          border-radius: 10px;
          font-size: 0.75em;
          font-weight: 800;
          flex-shrink: 0;
        }
        .main-badge {
          background: #38a169;
          color: #ffffff;
        }

        /* ========== ANSWERS ========== */
        .answer-block {
          background: #f7fafc;
          border-radius: 12px;
          padding: 20px 24px;
          margin: 12px 0;
          border: 1px solid #e2e8f0;
        }
        .answer-header {
          font-weight: 700;
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #3182ce;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2eef9;
        }
        .answer-block p {
          margin: 8px 0;
          text-align: left;
          color: #4a5568;
        }
        .answer-list {
          margin: 8px 0 0 0;
          padding-left: 0;
          list-style: none;
        }
        .answer-list li {
          margin: 10px 0;
          padding: 12px 16px;
          background: #ffffff;
          border-radius: 10px;
          border-left: 4px solid #38a169;
          color: #4a5568;
          line-height: 1.6;
        }
        .answer-list li strong {
          color: #2f855a;
          margin-right: 4px;
        }

        /* ========== BIBLE TEXTS ========== */
        .bible-text {
          background: #e6fffa;
          border-left: 5px solid #319795;
          border-radius: 0 14px 14px 0;
          padding: 20px 26px;
          margin: 18px 0;
        }
        .bible-text.large {
          padding: 24px 28px;
        }
        .bible-text.large p {
          font-size: 1.1em;
        }
        .bible-ref {
          display: inline-block;
          background: #319795;
          color: #fff;
          font-size: 0.78em;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 6px;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }
        .bible-text p {
          margin: 8px 0 0 0;
          color: #285e61;
          font-size: 1.05em;
          line-height: 1.8;
          text-align: left;
        }
        .bible-text p sup {
          color: #319795;
          font-weight: 700;
          font-size: 0.75em;
          margin-right: 2px;
        }

        /* ========== REFLECTION ========== */
        .reflection-section {
          margin-top: 28px;
          padding: 24px;
          background: #f7fafc;
          border-radius: 14px;
          border: 2px solid #e2e8f0;
        }
        .reflection-title {
          font-size: 1.05em;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 18px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #cbd5e0;
        }
        .reflection-q {
          margin: 10px 0;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .page-wrapper {
            padding: 12px;
            padding-top: 75px;
          }
          .lesson-card {
            padding: 20px 16px;
            border-radius: 12px;
          }
          .lesson-header {
            gap: 12px;
          }
          .lesson-number {
            width: 44px;
            height: 44px;
            font-size: 1.2em;
          }
          .lesson-title {
            font-size: 1.2em;
          }
          .topic-title {
            font-size: 1.2em;
          }
          .timer-float.expanded {
            right: 8px;
            left: 8px;
            min-width: auto;
          }
          .main-question {
            padding: 12px 14px;
          }
          .bible-text {
            padding: 16px 18px;
          }
          .bible-text.large p {
            font-size: 1em;
          }
        }

        @media (max-width: 480px) {
          .lesson-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .lesson-title {
            font-size: 1.1em;
          }
          .main-question {
            flex-direction: column;
            gap: 8px;
          }
          .q-badge {
            align-self: flex-start;
          }
          .answer-block {
            padding: 14px 16px;
          }
          .reflection-section {
            padding: 16px;
          }
        }

        @media (min-width: 1024px) {
          .content-area {
            max-width: 860px;
          }
          .lesson-card {
            padding: 40px;
          }
          .bible-text.large p {
            font-size: 1.15em;
          }
        }
      `}</style>
    </div>
  );
}