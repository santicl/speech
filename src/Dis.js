"use client"

import { useState, useEffect } from "react"
import "./SpeechOutline.css"

export default function SpeechOutline() {
  const [globalTime, setGlobalTime] = useState(0)
  const [isGlobalTimerRunning, setIsGlobalTimerRunning] = useState(false)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  // Global timer effect
  useEffect(() => {
    let interval = null
    if (isGlobalTimerRunning) {
      interval = setInterval(() => {
        setGlobalTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isGlobalTimerRunning])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleGlobalStartPause = () => {
    setIsGlobalTimerRunning(!isGlobalTimerRunning)
  }

  const handleGlobalReset = () => {
    setGlobalTime(0)
    setIsGlobalTimerRunning(false)
  }

  const handleFontSizeChange = (e) => {
    setFontSize(Number.parseInt(e.target.value))
  }

  const toggleTimerExpansion = () => {
    setIsTimerExpanded(!isTimerExpanded)
  }

  const handleControlClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <style jsx>{`
        .speech-container {
          font-family: "Inter", "Segoe UI", "Roboto", sans-serif;
          line-height: 1.7;
          color: #2d3748;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          min-height: 100vh;
          position: relative;
        }

        .timer-container {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.98);
          color: #2d3748;
          border-radius: 12px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .timer-container.collapsed {
          padding: 12px 18px;
          min-width: auto;
        }

        .timer-container.expanded {
          padding: 20px;
          min-width: 260px;
          cursor: default;
        }

        .timer-container.collapsed:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.12),
            0 3px 8px rgba(0, 0, 0, 0.08);
        }

        .timer-display {
          font-weight: 700;
          text-align: center;
          font-family: "JetBrains Mono", "Fira Code", monospace;
          color: #1a202c;
          padding: 8px;
          border-radius: 8px;
          position: relative;
          background: linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%);
          border: 1px solid #cbd5e0;
        }

        .timer-container.collapsed .timer-display {
          font-size: 22px;
          margin-bottom: 0;
        }

        .timer-container.expanded .timer-display {
          font-size: 28px;
          margin-bottom: 16px;
        }

        .timer-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
        }

        .timer-btn {
          flex: 1;
          padding: 10px 14px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .timer-btn.start {
          background: #38a169;
          color: white;
          box-shadow: 0 2px 8px rgba(56, 161, 105, 0.3);
        }

        .timer-btn.pause {
          background: #dd6b20;
          color: white;
          box-shadow: 0 2px 8px rgba(221, 107, 32, 0.3);
        }

        .timer-btn.reset {
          background: #e53e3e;
          color: white;
          box-shadow: 0 2px 8px rgba(229, 62, 62, 0.3);
        }

        .timer-btn:hover {
          transform: translateY(-1px);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .timer-btn:active {
          transform: translateY(0);
        }

        .font-control {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          color: #4a5568;
        }

        .font-control input[type="range"] {
          flex: 1;
          height: 4px;
          border-radius: 2px;
          background: #e2e8f0;
          outline: none;
          -webkit-appearance: none;
        }

        .font-control input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4a5568;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .font-control span {
          min-width: 40px;
          text-align: center;
          font-weight: 600;
          color: #2d3748;
        }

        .expand-hint {
          font-size: 11px;
          text-align: center;
          opacity: 0.7;
          margin-top: 6px;
          animation: pulse 2s infinite;
          color: #4a5568;
          font-weight: 500;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .speech-content {
          margin-top: 20px;
          background: #ffffff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.08),
            0 4px 10px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .speech-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2d3748 0%, #4a5568 50%, #2d3748 100%);
        }

        .speech-title {
          color: #1a202c;
          text-align: center;
          font-size: 2.4em;
          font-weight: 800;
          margin-bottom: 40px;
          position: relative;
          letter-spacing: -0.5px;
        }

        .speech-title::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: #2d3748;
          border-radius: 2px;
        }

        .bible-text {
          background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
          border-left: 5px solid #38a169;
          padding: 35px;
          margin: 35px 0;
          border-radius: 0 12px 12px 0;
          box-shadow: 
            0 4px 12px rgba(56, 161, 105, 0.1),
            0 2px 4px rgba(56, 161, 105, 0.06);
          position: relative;
          overflow: hidden;
          font-size: 1.1em;
        }

        .bible-text::before {
          content: '📖';
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 24px;
          opacity: 0.4;
        }

        .bible-text h3 {
          color: #1a202c;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.4em;
          font-weight: 700;
          border-bottom: 2px solid #38a169;
          padding-bottom: 10px;
          display: inline-block;
        }

        .bible-text p {
          margin: 14px 0;
          font-weight: 500;
          line-height: 1.8;
          color: #2d3748;
          font-size: 1.05em;
        }

        .bible-text strong {
          color: #c53030;
          font-size: 1.1em;
          font-weight: 700;
        }

        .bible-reference {
          background: #2d3748;
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          font-weight: 600;
          font-size: 0.9em;
          box-shadow: 0 2px 4px rgba(45, 55, 72, 0.3);
          transition: all 0.3s ease;
          display: inline-block;
        }

        .bible-reference:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(45, 55, 72, 0.4);
        }

        .question {
          color: #d69e2e;
          font-weight: 700;
          font-style: italic;
          background: linear-gradient(135deg, #fffbeb 0%, #fef5e7 100%);
          padding: 8px 12px;
          border-radius: 8px;
          border-left: 4px solid #f6ad55;
          display: inline-block;
          margin: 4px 2px;
          box-shadow: 0 2px 4px rgba(246, 173, 85, 0.2);
          transition: all 0.3s ease;
        }

        .question:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(246, 173, 85, 0.3);
        }

        .key-point {
          background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
          color: #742a2a;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 6px;
          border-left: 3px solid #e53e3e;
          display: inline-block;
          margin: 2px;
          box-shadow: 0 2px 4px rgba(229, 62, 62, 0.2);
        }

        .conclusion {
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          color: #ffffff; /* Cambiar a blanco para mejor contraste */
          padding: 40px;
          border-radius: 12px;
          margin-top: 40px;
          text-align: center;
          box-shadow: 
            0 8px 20px rgba(45, 55, 72, 0.3),
            0 4px 8px rgba(45, 55, 72, 0.2);
          position: relative;
          overflow: hidden;
        }

        .conclusion::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        .conclusion p {
          position: relative;
          z-index: 1;
          color: #ffffff; /* Asegurar que sea blanco */
        }

        .conclusion .question {
          color: #1a202c !important;
          background: linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%) !important;
          border-left: 4px solid #f6ad55 !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
        }

        .conclusion .question:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
        }

        .conclusion .closing {
          font-size: 1.3em;
          font-weight: 700;
          margin-top: 20px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          color: #ffffff;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        h2 {
          color: #1a202c;
          margin: 40px 0 30px 0;
          font-size: 1.7em;
          font-weight: 700;
          text-align: center;
          position: relative;
          letter-spacing: -0.3px;
        }

        h2::before,
        h2::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 60px;
          height: 2px;
          background: #4a5568;
        }

        h2::before {
          left: -80px;
        }

        h2::after {
          right: -80px;
        }

        p {
          margin-bottom: 20px;
          text-align: left; /* Cambiar de justify a left */
          line-height: 1.8;
          color: #4a5568;
          font-weight: 400;
        }

        strong {
          color: #1a202c;
          font-weight: 700;
        }

        /* RESPONSIVE DESIGN */

        /* Tablets (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .speech-container {
            max-width: 100%;
            padding: 25px;
          }
          
          .timer-container {
            top: 25px;
            right: 25px;
          }
          
          .timer-container.expanded {
            min-width: 240px;
            padding: 18px;
          }
          
          .speech-content {
            padding: 35px;
            margin-top: 25px;
          }
          
          .speech-title {
            font-size: 2.1em;
            margin-bottom: 35px;
          }
          
          .bible-text {
            padding: 30px;
            margin: 30px 0;
            font-size: 1.05em;
          }
          
          .conclusion {
            padding: 35px;
          }
          
          h2 {
            font-size: 1.6em;
            margin: 35px 0 25px 0;
          }
          
          h2::before,
          h2::after {
            width: 50px;
          }
          
          h2::before {
            left: -70px;
          }
          
          h2::after {
            right: -70px;
          }
        }

        /* Mobile Large (481px - 768px) */
        @media (max-width: 768px) and (min-width: 481px) {
          .speech-container {
            padding: 20px;
            margin-top: 120px;
          }
          
          .timer-container {
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            width: auto;
          }
          
          .timer-container.expanded {
            min-width: auto;
            padding: 20px;
          }
          
          .timer-controls {
            flex-direction: row;
            gap: 8px;
          }
          
          .speech-content {
            padding: 30px;
            border-radius: 12px;
            margin-top: 20px;
          }
          
          .speech-title {
            font-size: 1.9em;
            margin-bottom: 30px;
          }
          
          .bible-text {
            padding: 25px;
            margin: 25px 0;
            border-radius: 0 10px 10px 0;
            font-size: 1.02em;
          }
          
          .bible-text::before {
            font-size: 20px;
            top: 18px;
            right: 18px;
          }
          
          .conclusion {
            padding: 30px;
            border-radius: 10px;
          }
          
          .closing {
            font-size: 1.2em;
          }
          
          h2 {
            font-size: 1.5em;
            margin: 30px 0 20px 0;
          }
          
          h2::before,
          h2::after {
            display: none;
          }
          
          .question {
            padding: 6px 10px;
            margin: 3px 1px;
            font-size: 0.95em;
          }
          
          .bible-reference {
            padding: 3px 10px;
            font-size: 0.85em;
          }
        }

        /* Mobile Small (320px - 480px) */
        @media (max-width: 480px) {
          .speech-container {
            padding: 15px;
            margin-top: 140px;
          }
          
          .timer-container {
            top: 15px;
            left: 15px;
            right: 15px;
          }
          
          .timer-container.collapsed {
            padding: 10px 15px;
          }
          
          .timer-container.expanded {
            padding: 18px;
          }
          
          .timer-container.collapsed .timer-display {
            font-size: 20px;
          }
          
          .timer-container.expanded .timer-display {
            font-size: 24px;
            margin-bottom: 14px;
          }
          
          .timer-controls {
            flex-direction: column;
            gap: 6px;
            margin-bottom: 14px;
          }
          
          .timer-btn {
            padding: 8px 12px;
            font-size: 12px;
          }
          
          .font-control {
            font-size: 12px;
            gap: 8px;
          }
          
          .speech-content {
            padding: 25px;
            border-radius: 12px;
          }
          
          .speech-title {
            font-size: 1.6em;
            margin-bottom: 25px;
          }
          
          .bible-text {
            padding: 20px;
            margin: 20px 0;
            font-size: 1em;
          }
          
          .bible-text h3 {
            font-size: 1.3em;
            margin-bottom: 15px;
          }
          
          .bible-text::before {
            font-size: 18px;
            top: 15px;
            right: 15px;
          }
          
          .conclusion {
            padding: 25px;
            margin-top: 30px;
          }
          
          .closing {
            font-size: 1.1em;
            margin-top: 15px;
          }
          
          h2 {
            font-size: 1.4em;
            margin: 25px 0 18px 0;
          }
          
          p {
            margin-bottom: 16px;
            text-align: left;
          }
          
          .question {
            padding: 5px 8px;
            margin: 2px 1px;
            font-size: 0.9em;
            border-radius: 6px;
          }
          
          .bible-reference {
            padding: 2px 8px;
            font-size: 0.8em;
            border-radius: 12px;
          }
        }

        /* Extra Small Mobile (max 320px) */
        @media (max-width: 320px) {
          .speech-container {
            padding: 12px;
          }
          
          .speech-content {
            padding: 20px;
          }
          
          .speech-title {
            font-size: 1.4em;
          }
          
          .bible-text {
            padding: 18px;
          }
          
          .conclusion {
            padding: 20px;
          }
          
          .timer-container.expanded {
            padding: 15px;
          }
        }

        /* Desktop Large (1025px+) */
        @media (min-width: 1025px) {
          .speech-container {
            padding: 30px;
          }
          
          .timer-container {
            top: 30px;
            right: 30px;
          }
          
          .timer-container.expanded {
            min-width: 280px;
            padding: 25px;
          }
          
          .timer-container.expanded .timer-display {
            font-size: 32px;
            margin-bottom: 20px;
          }
          
          .speech-content {
            padding: 50px;
            margin-top: 30px;
          }
          
          .speech-title {
            font-size: 2.6em;
            margin-bottom: 45px;
          }
          
          .bible-text {
            padding: 40px;
            margin: 40px 0;
            font-size: 1.15em;
          }
          
          .conclusion {
            padding: 45px;
          }
          
          h2 {
            font-size: 1.8em;
            margin: 45px 0 35px 0;
          }
          
          h2::before,
          h2::after {
            width: 70px;
          }
          
          h2::before {
            left: -90px;
          }
          
          h2::after {
            right: -90px;
          }
        }
      `}</style>

      <div className="speech-container">
        {/* Global Timer con funcionalidad expandible */}
        <div className={`timer-container ${isTimerExpanded ? "expanded" : "collapsed"}`} onClick={toggleTimerExpansion}>
          <div className="timer-display">{formatTime(globalTime)}</div>
          {isTimerExpanded && (
            <>
              <div className="timer-controls" onClick={handleControlClick}>
                <button
                  className={`timer-btn ${isGlobalTimerRunning ? "pause" : "start"}`}
                  onClick={handleGlobalStartPause}
                >
                  {isGlobalTimerRunning ? "Pausar" : "Iniciar"}
                </button>
                <button className="timer-btn reset" onClick={handleGlobalReset}>
                  Reiniciar
                </button>
              </div>
              <div className="font-control" onClick={handleControlClick}>
                <label htmlFor="fontSize">Tamaño:</label>
                <input type="range" id="fontSize" min="12" max="24" value={fontSize} onChange={handleFontSizeChange} />
                <span>{fontSize}px</span>
              </div>
            </>
          )}
          {!isTimerExpanded && <div className="expand-hint">👆 Toca para expandir</div>}
        </div>

        {/* Speech Content */}
        <div className="speech-content">
          <h1 className="speech-title">Jehová, el Gran Creador - 101</h1>

          <p>
            Imagine este mundo increíble, con paisajes, así como se muestra en la imagen… imagínese despertando de su
            cama, coge su pocillito de café y cuando salga a su puerta, todos los días vea ese paisaje…{" "}
            <span className="question">
              ¿Sabía usted que todo esto que admiramos lo creó Dios como regalo para usted y para mí?
            </span>{" "}
            <span className="question">¿Cómo se siente al saber esto?</span>, seguramente agradecido.
          </p>

          <p>
            Ahora bien, veamos todo lo que <span className="key-point">Jehová Dios ha hecho por nosotros</span> y
            también el cómo podemos demostrar que agradecemos todos estos maravillosos regalos...
          </p>

          <p>
            Para comenzar, empezaremos desde el inicio de todo,{" "}
            <span className="question">¿Cómo empezó la vida, dónde comenzó todo?</span>
          </p>

          <div className="bible-text">
            <h3>Colosenses 1:15, 16:</h3>
            <p>
              <strong>15</strong> Él es la imagen del Dios invisible, el primogénito de toda la creación;
            </p>
            <p>
              <strong>16</strong> porque por medio de él todo lo demás fue creado en los cielos y en la tierra, las
              cosas visibles y las cosas invisibles, ya sean tronos, dominios, gobiernos o autoridades. Todo lo demás ha
              sido creado mediante él y para él.
            </p>
          </div>

          <p>
            <span className="key-point">Jehová Dios empezó creando a Jesús</span>, y a través de su Hijo, Dios creó todo
            lo demás.
          </p>

          <p>
            En primer lugar, creando a los ángeles a miles de cientos de ellos. Algo interesante de este versículo es
            que <span className="key-point">creó autoridades</span>.
          </p>

          <p>
            De hecho, comenzando por <span className="key-point">el jefe de todos los ángeles que es Jesús</span>, a lo
            que recibe el título de Arcángel.
          </p>

          <p>
            Asimismo, existen dos grupos que gozan de una posición especial, como{" "}
            <span className="key-point">los serafines y querubines</span>. Y también está el resto de los ángeles que
            tienen la labor de ser mensajeros del Dios altísimo.
          </p>

          <p>
            Posteriormente, después que estaba todo organizado en la región espiritual, se creó lo físico, las
            estrellas, la tierra, inclusive,{" "}
            <span className="key-point">creó a la primera pareja humana, los hizo perfectos en todo sentido</span>.
          </p>

          <p>
            En consecuencia, al ver todo lo que Jehová ha creado,{" "}
            <span className="key-point">podemos ver sus cualidades, podemos conocerlo</span>...
          </p>

          <p>
            Entonces,{" "}
            <span className="question">¿qué les parece si vemos solo uno de los regalos que Jehová nos ha dado?</span>
          </p>

          <p>
            Con este ejemplo, veremos dos cualidades de JEHOVÁ: <span className="key-point">1. Sabiduría</span>{" "}
            <span className="key-point">2. Poderoso</span>.
          </p>

          <p>En ese sentido, centrémonos en algo vital que pasa cada cierto tiempo en la tierra.</p>

          <p>
            Para ilustrar esto, veamos una imagen de lo que analizaremos,{" "}
            <span className="question">¿Ha logrado escuchar alguna vez sobre la teoría de las placas tectónicas?</span>
          </p>

          <p>
            <span className="key-point">Las placas tectónicas son grandes bloques de la capa externa de la Tierra</span>
            .
          </p>

          <p>
            Podríamos decir, que podemos imaginarlas como un rompecabezas gigante, donde cada pieza se mueve muy
            lentamente. A veces estas placas se chocan, se separan o se deslizan unas junto a otras.
          </p>

          <p>
            Por ejemplo, <span className="question">¿han escuchado hablar del río Amazonas?</span> Pues hace millones de
            años ese río no existía.
          </p>

          <p>
            Como resultado, cuando las placas chocaron, se formaron los Andes, una enorme cadena de montañas. Esa gran
            barrera bloqueó el paso del agua, haciendo que cambiara de dirección.{" "}
            <span className="key-point">
              Así fue como se empezó a formar el río Amazonas, que hoy es el más caudaloso del mundo
            </span>
            .
          </p>

          <p>En pocas palabras, todo eso ocurrió gracias al lento pero poderoso movimiento de las placas tectónicas.</p>

          <p>
            Ahora bien, piense por un momento <span className="question">¿Por qué es importante saber esto?</span>
          </p>

          <p>
            En efecto, <span className="key-point">este movimiento de las placas es continuo, nunca se detiene</span>...
            Y cada 50 a 100 millones de años, el paisaje de la tierra cambia.
          </p>

          <p>
            Es decir,{" "}
            <span className="key-point">
              cada 50 a 100 millones de años, nosotros los seres humanos debemos conocer un paisaje único y diferente
            </span>
            .
          </p>

          <p>
            Entonces surge la pregunta,{" "}
            <span className="question">¿sería aburrido vivir para siempre en la tierra?</span>
          </p>

          <p>
            <span className="question">
              ¿No sería este un indicativo claro que el ser humano fue creado con el objetivo de vivir para siempre?
            </span>
          </p>

          <p>
            De esta manera, este proceso revela algo de Jehová...{" "}
            <span className="key-point">
              Su poder y sabiduría al crear cada cosa que existe en la tierra.... Que es poderoso y sabio
            </span>
            .
          </p>

          <h2>LOS CIELOS Y LA TIERRA "DECLARAN LA GLORIA DE DIOS"</h2>

          <p>
            Ahora bien,{" "}
            <span className="question">
              ¿Por qué usted y yo sí podemos ver las cualidades de Jehová y hay otras personas que no?
            </span>
          </p>

          <div className="bible-text">
            <h3>Romanos 1:20:</h3>
            <p>
              Porque sus cualidades invisibles —su poder eterno y divinidad— se ven claramente desde la creación del
              mundo, pues se perciben por las cosas creadas, de modo que ellos no tienen excusa
            </p>
          </div>

          <p>A partir de lo leído, respondamos la pregunta pensando en el siguiente ejemplo:</p>

          <p>
            Imaginemos que un conductor se percata que más adelante hay un semáforo en rojo, aun así decide ignorarlo...
          </p>

          <p>
            Del mismo modo, un agente de tránsito se da cuenta y lo detiene y el conductor se justifica diciendo que no
            lo vio. <span className="question">¿Es creíble esto?</span> Del mismo modo,{" "}
            <span className="key-point">
              las evidencias de la existencia de Dios en la naturaleza están a simple vista, solo que algunos deciden
              ignorarlas
            </span>
            .
          </p>

          <p>
            En conclusión,{" "}
            <span className="key-point">
              todos debemos tener la responsabilidad de percibir a Jehová en su creación
            </span>
            .
          </p>

          <p>
            Recordemos además, que antes había mencionado que{" "}
            <span className="key-point">
              Jehová creó a la primera pareja humana sin defectos y con la oportunidad de vivir para siempre aquí en la
              tierra
            </span>
            .
          </p>

          <div className="bible-text">
            <h3>Romanos 5:12:</h3>
            <p>
              Así pues, por medio de un solo hombre, el pecado entró en el mundo y por medio del pecado entró la muerte,
              y así fue como la muerte se extendió a todos los hombres, porque todos habían pecado.
            </p>
          </div>

          <p>
            <span className="key-point">
              Adán y Eva se rebelaron contra Jehová. Al desobedecer, ellos obtuvieron el pecado
            </span>
            .
          </p>

          <p>
            Por lo tanto,{" "}
            <span className="key-point">el propósito de Jehová se había dañado por la desobediencia de Adán y Eva</span>
            .
          </p>

          <p>
            Sin embargo, inmediatamente después de sentenciar a nuestros primeros padres,{" "}
            <span className="key-point">
              Dios prometió reparar todo el daño que resultara del pecado, sin incumplir sus justas normas
            </span>
            .
          </p>

          <p>
            Así pues, como gran creador que es Jehová,{" "}
            <span className="key-point">se propuso hacer algo nuevo, algo que al principio no había pensado hacer</span>
            .
          </p>

          <div className="bible-text">
            <h3>2 Corintios 5:17:</h3>
            <p>
              Por lo tanto, si alguien está en unión con Cristo, es una nueva creación. Las cosas viejas pasaron.
              ¡Miren! Ahora han llegado a existir cosas nuevas
            </p>
          </div>

          <p>
            Para ser una nueva creación,{" "}
            <span className="key-point">estas personas deben estar en unión con Cristo</span>.
          </p>

          <p>
            Para aclararlo mejor, ilustremos este punto: Suponga que tiene en sus manos 2 TUBOS PVC y quiere unirlos,
            normalmente usaría una unión o conector. Cuando estas dos partes se unen, comparten un mismo objetivo, que
            fluya agua.
          </p>

          <p>
            En ese sentido, traigamos esa lógica hacia lo que dice el versículo… dice que hay personas en unión, quiere
            decir{" "}
            <span className="key-point">
              trabajan bajo un mismo objetivo, que es vivir en los Cielos y Gobernar la tierra con Jesús
            </span>{" "}
            como lo dice <span className="bible-reference">Apocalipsis 5:10</span>.
          </p>

          <p>
            Ahora bien, para que estas personas trabajen junto a Jesús en los Cielos, debe haber algo que funcione como
            una Unión como en el ejemplo de los TUBOS.{" "}
            <span className="key-point">En este caso es el espíritu Santo de Dios</span>. Veamos con la biblia como
            Jehová Dios usa su espíritu en este caso especial.
          </p>

          <div className="bible-text">
            <h3>Romanos 8:16:</h3>
            <p>El espíritu mismo da testimonio con nuestro espíritu de que somos hijos de Dios</p>
          </div>

          <p>
            Note que al principio del versículo dice…{" "}
            <span className="key-point">El Espíritu Mismo, se refiere al espíritu Santo de DIOS</span>. DA TESTIMONIO,
            esta palabra TESTIMONIO es similar a decir… Certifica que o Autoriza que.
          </p>

          <p>Pensemos en un ejemplo sencillo, como ir a reclamar medicamentos de la EPS.</p>

          <p>
            Cuando va a reclamar un medicamento{" "}
            <span className="question">¿qué documento debe tener aparte de la cédula?</span>
          </p>

          <p>
            Evidentemente, necesita una orden médica o prescripción. Es algo que le da seguridad de recibir la medicina.
          </p>

          <p>Si ese papel se le olvida… perdió la platica…</p>

          <p>
            Pues bien, algo similar pasa con estas personas las cuales trabajarán con Jesús en los cielos.{" "}
            <span className="key-point">
              Jehová, con su espíritu, les deja muy claro que han sido adoptados como hijos y que su esperanza está en
              el cielo
            </span>
            .
          </p>

          <p>
            De modo que, como fuimos creados para vivir en la tierra,{" "}
            <span className="key-point">
              el que Jehová le cambie sus deseos, hace que sean una nueva creación o nueva criatura
            </span>
            .
          </p>

          <p>
            Ahora surge otra pregunta,{" "}
            <span className="question">¿cuántas personas llegarán a ser una nueva creación?</span>
          </p>

          <p>
            <span className="bible-reference">Apocalipsis 14:1 (NO LEER):</span>
          </p>

          <p>
            <span className="key-point">Estas 144.000 personas que irán al cielo van a gobernar junto con Jesús</span>.
          </p>

          <p>
            Pero tal vez alguien se pregunte,{" "}
            <span className="question">
              ¿si existen miles de millones de ángeles, por qué para este grupo se les escoge de la tierra?
            </span>
          </p>

          <p>
            Reflexionemos entonces en lo siguiente...{" "}
            <span className="question">¿Dónde se levantó el desafío al derecho de gobernar a JEHOVÁ?</span>{" "}
            <span className="question">¿Dónde fue que Jesús sacrificó su vida?</span>{" "}
            <span className="question">¿Dónde Jesús probó su lealtad?</span>
          </p>

          <p>
            Por consiguiente,{" "}
            <span className="key-point">
              fue de la Tierra de donde Jehová hizo arreglos para tomar un "rebaño pequeño" de personas para que estén
              asociadas con su Hijo en el reino celestial
            </span>
            .
          </p>

          <p>
            Además, sobre todo porque así fue la voluntad de Jehová, así como lo menciona{" "}
            <span className="bible-reference">Efesios 2:9-12</span>.
          </p>

          <p>
            De hecho,{" "}
            <span className="key-point">el que se haya establecido este arreglo, demuestra la sabiduría de JEHOVÁ</span>
            .
          </p>

          <p>
            Pensemos también en que,{" "}
            <span className="key-point">estas personas han pasado por lo mismo que usted esté pasando</span>. Fíjese
            bien… PROBLEMAS ECONÓMICOS, ENFERMEDADES, LUCHAR CONTRA LA MALA TENDENCIA.
          </p>

          <p className="question">¿LOS ÁNGELES ENTENDERÍAN QUÉ ES PASAR POR CADA UNA DE ELLAS?</p>

          <p>
            Sin embargo, <span className="question">¿saben por qué también sería un regalo este arreglo?</span>
          </p>

          <div className="bible-text">
            <h3>1 Juan 3:8 parte B:</h3>
            <p>El Hijo de Dios fue manifestado con este propósito: para deshacer las obras del Diablo</p>
          </div>

          <p>
            <span className="key-point">
              El propósito de este grupo pequeño es el mismo que tiene Jesús y es deshacer lo que provocó satanás
            </span>
            .
          </p>

          <p>
            En otras palabras,{" "}
            <span className="key-point">la tierra recuperará las condiciones con la que fue creada al principio</span>.
          </p>

          <p>
            Además, <span className="question">¿si recuerda que por Adán y Eva heredamos el pecado?</span> Bueno,
            <span className="key-point">
              gracias a este arreglo que hizo el gran creador, se nos liberará del pecado y con ello la muerte
            </span>
            .
          </p>

          <div className="conclusion">
            <p>En definitiva, de tantos regalos que Jehová nos ha dado y que muy pronto nos dará...</p>
            <p className="question closing">¿Cómo puede demostrar que agradece todo lo que ha hecho por usted?</p>
          </div>
        </div>
      </div>
    </div>
  )
}
