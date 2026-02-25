import { useState, useEffect, useRef } from "react";

export default function DiscourseAnnualReport() {
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
              onClick={(e) => { e.stopPropagation(); setGlobalRunning(!globalRunning); }}
            >
              {globalRunning ? "Pausar" : "Iniciar"}
            </button>
            <button
              className="timer-btn reset"
              onClick={(e) => { e.stopPropagation(); setGlobalRunning(false); setGlobalTime(0); }}
            >
              Reiniciar
            </button>
            <div className="font-control" onClick={(e) => e.stopPropagation()}>
              <label>Fuente: {fontSize}px</label>
              <input type="range" min="12" max="28" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
            </div>
            <button
              className="timer-btn collapse-btn"
              onClick={(e) => { e.stopPropagation(); setTimerExpanded(false); }}
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

        <h1 className="title">Informe de Servicio Anual 2025</h1>

        <p>El texto del año 2025 nos animó a darle "a Jehova la gloria que su nombre merece" <strong>(Sal. 96:8)</strong>. Es evidente que justo eso es lo que el pueblo de Jehova hizo por todo el mundo durante el ano pasado. Nos complace compartir con ustedes algunos aspectos animadores del informe mundial de los testigos de Jehova del ano de servicio 2025. Por ejemplo, se dirigieron <strong>7.603.182</strong> cursos biblicos, lo que supone un aumento del <strong>1,6 %</strong>. Tambien nos alegra informar que tuvimos un aumento del <strong>2,8 %</strong> en el numero de bautizados, ya que <strong>304.643</strong> nuevos discipulos hicieron declaracion publica de su dedicacion. Encontraran mas detalles del informe en <strong>jw.org</strong>, en <strong>JW Library</strong>, en la <strong>BIBLIOTECA EN LINEA Watchtower</strong> y en <strong>Watchtower Library</strong>.</p>

        <p>En el territorio de nuestra sucursal, seguimos experimentando un crecimiento positivo. Como resultado, se formaron <strong>62</strong> nuevas congregaciones y <strong>10</strong> nuevos circuitos. Durante la campana especial de septiembre de 2025, se iniciaron mas de <strong>13.600</strong> cursos biblicos, lo que resalta el excelente potencial para cursos biblicos y un mayor crecimiento. Ademas, la sucursal completo <strong>189</strong> proyectos de construccion y remodelacion de Salones del Reino.</p>

        <p>Jehova y su Hijo están recogiendo las "cosas valiosas de todas las naciones" y tenemos el gran honor de colaborar con ellos <strong>(Ag 2:7)</strong>. El texto del ano 2026 nos recuerda: <strong>"Felices los que reconocen sus necesidades espirituales" (Mat. 5:3)</strong>. Estamos totalmente seguros de que Jehova bendecira sus esfuerzos por ayudar este ano a otras personas a cubrir sus necesidades espirituales.</p>

        <h1 className="title">Pregunta para el auditorio</h1>
        <h2><strong>¿Qué aspectos positivos del informe del año de servicio 2025 le gustaría comentar?</strong></h2>
        <h1 className="title">Entrevista</h1>
        <h2><strong>¿Hermano(a), cuéntenos alguna experiencia animadora que haya tenido el año de servicio 2025?</strong></h2>
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 24px;
          padding-top: 80px;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: #e0e0e0;
          line-height: 1.8;
        }

        /* TIMER */
        .timer-float {
          position: fixed;
          top: 12px;
          right: 12px;
          z-index: 9999;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
        }
        .timer-float.collapsed { padding: 10px 20px; }
        .timer-float.collapsed:hover { transform: scale(1.05); }
        .timer-float.expanded { padding: 16px 20px; cursor: default; min-width: 200px; }
        .timer-display {
          font-family: 'Courier New', monospace;
          font-size: 1.8em;
          font-weight: 700;
          color: #00e676;
          text-align: center;
          letter-spacing: 3px;
        }
        .timer-hint { color: #555; font-size: 0.65em; text-align: center; margin-top: 2px; }
        .timer-controls { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .timer-btn {
          border: none; padding: 8px 14px; border-radius: 8px;
          font-size: 0.85em; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .timer-btn.start { background: #00e676; color: #0a0a0a; }
        .timer-btn.start:hover { background: #00c853; }
        .timer-btn.reset { background: #ff5252; color: #fff; }
        .timer-btn.reset:hover { background: #d50000; }
        .timer-btn.collapse-btn { background: #2a2a2a; color: #888; }
        .timer-btn.collapse-btn:hover { background: #333; }
        .font-control { display: flex; flex-direction: column; gap: 4px; }
        .font-control label { color: #888; font-size: 0.75em; }
        .font-control input[type="range"] { width: 100%; accent-color: #00e676; }

        /* CONTENT */
        .content-area {
          max-width: 720px;
          margin: 0 auto;
        }

        .title {
          font-size: 1.8em;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 32px 0;
          line-height: 1.3;
          border-bottom: 3px solid #00e676;
          padding-bottom: 16px;
        }

        p {
          margin: 0 0 24px 0;
          text-align: left;
          color: #fff;
          line-height: 1.9;
        }

        @media (max-width: 768px) {
          .page-wrapper { padding: 16px; padding-top: 75px; }
          .title { font-size: 1.4em; }
          .timer-float.expanded { right: 8px; left: 8px; min-width: auto; }
        }

        @media (max-width: 480px) {
          .title { font-size: 1.2em; }
          .subtitle { font-size: 1.05em; }
        }

        @media (min-width: 1024px) {
          .content-area { max-width: 780px; }
        }
      `}</style>
    </div>
  );
}
