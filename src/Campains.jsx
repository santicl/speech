import { useState, useEffect, useRef } from "react";

export default function DiscourseCampaign() {
  const [globalTime, setGlobalTime] = useState(0);
  const [globalRunning, setGlobalRunning] = useState(false);
  const [timerExpanded, setTimerExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(17);
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
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  };

  return (
    <div className="page-wrapper" style={{ fontSize: fontSize + "px" }}>

      {/* TIMER */}
      <div
        className={timerExpanded ? "timer-float expanded" : "timer-float collapsed"}
        onClick={() => { if (!timerExpanded) setTimerExpanded(true); }}
      >
        <div className="timer-display">{formatTime(globalTime)}</div>
        {!timerExpanded && <div className="timer-hint">Toca para expandir</div>}
        {timerExpanded && (
          <div className="timer-controls" onClick={(e) => e.stopPropagation()}>
            <button
              className={globalRunning ? "timer-btn pause" : "timer-btn start"}
              onClick={() => setGlobalRunning(!globalRunning)}
            >
              {globalRunning ? "Pausar" : "Iniciar"}
            </button>
            <button
              className="timer-btn reset"
              onClick={() => { setGlobalRunning(false); setGlobalTime(0); }}
            >
              Reiniciar
            </button>
            <div className="font-control">
              <label>Tamano de fuente: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="28"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>
            <button className="timer-btn collapse-btn" onClick={() => setTimerExpanded(false)}>
              Colapsar
            </button>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="content-area">

        <h1 className="title">El sábado 7 de marzo comienza la campaña de la Conmemoración 2026</h1>

        <div className="bible-ref">Juan 3:16</div>
        <p className="bible-quote">{"\"Porque tanto amo Dios al mundo que dio a su hijo.\""}</p>

        <p>El sabado <strong>7 de marzo</strong> comienza la campaña de la Conmemoración. Ese dia <strong>no habrá salida virtual por Zoom</strong>, la predicación se hará presencial de casa en casa e invitaremos tanto al discurso especial como a la Conmemoración.</p>

        <h2 className="section-title">Puntos de salida</h2>

        <div className="location-block">
          <h3 className="location-name">Salida Loamador</h3>
          <p><strong>Hora:</strong> 8:00 AM</p>
          <p>Habrá un capitan esperando en el punto de salida para coordinar y organizar a los publicadores.</p>
        </div>

        <div className="location-block">
          <h3 className="location-name">Campaña en Caño de Oro</h3>
          <p><strong>Fecha:</strong> 22 de marzo</p>
          <p><strong>Lugar:</strong> Muelle la Bodeguita</p>
          <p><strong>Hora:</strong> 7:00 AM</p>
          <p>Tambien habra un capitan esperando con las invitaciones para dirigir la salida.</p>
        </div>

        <h2 className="section-title">Apoyo durante la campaña</h2>

        <p>Durante los meses de <strong>marzo y abril</strong>, los publicadores tienen la oportunidad de aumentar su participación en la predicacion. Se anima a quienes esten en la posibilidad de hacerlo a tomar el <strong>precursorado auxiliar</strong>, con una meta de <strong>15 horas</strong>, como apoyo especial a la campaña.</p>

        <div className="note-block">
          <p><strong>Nota importante:</strong> En todos los puntos de salida habra hermanos esperando a los publicadores para organizar adecuadamente la campaña y asegurar que todo se desarrolle en orden.</p>
        </div>

        <h2 className="section-title">Invitar a todo tipo de personas</h2>

        <p>Se anima a todos a hacer un esfuerzo especial por invitar a:</p>

        <ul className="invite-list">
          <li>Familiares no Testigos o inactivos</li>
          <li>Estudiantes de la Biblia</li>
          <li>Revisitas</li>
          <li>Otros conocidos</li>
        </ul>

        <h2 className="section-title">Pagina JW.ORG</h2>

        <p>Durante la campaña, la pagina de inicio de <strong>jw.org</strong> presentara contenido relacionado con el discurso especial y la Conmemoracion. Se invita a todos a estar muy pendientes de cada publicacion y material relacionado con estas fechas especiales.</p>

        <h2 className="section-title">Por ultimo</h2>

        <p>Cada <strong>superintendente de grupo</strong> sera el encargado de entregar las invitaciones de la Conmemoracion a los publicadores de su grupo.</p>

      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: #000000;
          padding: 20px;
          padding-top: 80px;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: #ffffff;
          line-height: 1.8;
        }

        /* ========== TIMER ========== */
        .timer-float {
          position: fixed;
          top: 12px;
          right: 12px;
          z-index: 9999;
          background: #111111;
          border: 1px solid #333;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.8);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
        }
        .timer-float.collapsed {
          padding: 10px 20px;
        }
        .timer-float.collapsed:hover {
          transform: scale(1.05);
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
          color: #00e676;
          text-align: center;
          letter-spacing: 3px;
        }
        .timer-hint {
          color: #555;
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
          background: #00e676;
          color: #000;
        }
        .timer-btn.start:hover {
          background: #00c853;
        }
        .timer-btn.pause {
          background: #ffa726;
          color: #000;
        }
        .timer-btn.pause:hover {
          background: #ff9800;
        }
        .timer-btn.reset {
          background: #ff5252;
          color: #fff;
        }
        .timer-btn.reset:hover {
          background: #d50000;
        }
        .timer-btn.collapse-btn {
          background: #222;
          color: #888;
        }
        .timer-btn.collapse-btn:hover {
          background: #333;
        }
        .font-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .font-control label {
          color: #888;
          font-size: 0.75em;
        }
        .font-control input[type="range"] {
          width: 100%;
          accent-color: #00e676;
        }

        /* ========== CONTENT ========== */
        .content-area {
          max-width: 780px;
          margin: 0 auto;
        }

        .title {
          font-size: 1.8em;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 24px 0;
          line-height: 1.3;
          border-bottom: 3px solid #00e676;
          padding-bottom: 16px;
        }

        .bible-ref {
          display: inline-block;
          background: #00e676;
          color: #000;
          font-size: 0.8em;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .bible-quote {
          font-size: 1.1em;
          font-style: italic;
          color: #b9f6ca;
          margin: 0 0 28px 0;
          padding-left: 16px;
          border-left: 3px solid #00e676;
          line-height: 1.7;
        }

        p {
          margin: 0 0 20px 0;
          text-align: left;
          color: #e0e0e0;
          line-height: 1.85;
          font-weight: 400;
        }

        strong {
          color: #ffffff;
          font-weight: 700;
        }

        /* ========== SECTION TITLES ========== */
        .section-title {
          font-size: 1.2em;
          font-weight: 700;
          color: #00e676;
          margin: 36px 0 16px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #222;
        }

        /* ========== LOCATION BLOCKS ========== */
        .location-block {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-left: 4px solid #42a5f5;
          border-radius: 0 10px 10px 0;
          padding: 18px 22px;
          margin: 14px 0;
        }
        .location-block p {
          margin: 6px 0;
          color: #ccc;
        }
        .location-name {
          font-size: 1em;
          font-weight: 700;
          color: #42a5f5;
          margin: 0 0 10px 0;
        }

        /* ========== NOTE ========== */
        .note-block {
          background: #1a1000;
          border: 1px solid #332800;
          border-left: 4px solid #ffa726;
          border-radius: 0 10px 10px 0;
          padding: 18px 22px;
          margin: 20px 0;
        }
        .note-block p {
          margin: 0;
          color: #ffe0b2;
        }
        .note-block strong {
          color: #ffa726;
        }

        /* ========== LIST ========== */
        .invite-list {
          margin: 0 0 24px 0;
          padding-left: 24px;
        }
        .invite-list li {
          color: #e0e0e0;
          margin: 8px 0;
          line-height: 1.7;
        }
        .invite-list li::marker {
          color: #00e676;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .page-wrapper {
            padding: 14px;
            padding-top: 75px;
          }
          .title {
            font-size: 1.4em;
          }
          .section-title {
            font-size: 1.05em;
          }
          .location-block {
            padding: 14px 16px;
          }
          .timer-float.expanded {
            right: 8px;
            left: 8px;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.2em;
          }
          .bible-quote {
            font-size: 1em;
          }
        }

        @media (min-width: 1024px) {
          .content-area {
            max-width: 850px;
          }
        }
      `}</style>
    </div>
  );
}
