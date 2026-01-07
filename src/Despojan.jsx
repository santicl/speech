import { useState, useEffect } from "react"
import "./SpeechOutline.css"

export default function DiscourseSpoil() {
  const [globalTime, setGlobalTime] = useState(0)
  const [isGlobalTimerRunning, setIsGlobalTimerRunning] = useState(false)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)
  const [fontSize, setFontSize] = useState(16)

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

        .section-intro {
          background: linear-gradient(135deg, #ebf8ff 0%, #e6fffa 100%);
          border-left: 4px solid #3182ce;
          padding: 25px;
          margin: 30px 0;
          border-radius: 0 10px 10px 0;
          color: #2d3748;
          box-shadow: 0 3px 10px rgba(49, 130, 206, 0.1);
        }

        .section-intro p {
          margin: 10px 0;
          line-height: 1.7;
        }

        .highlight {
          background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
          color: #742a2a;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
          display: inline-block;
          margin: 0 2px;
        }

        .image-reference {
          background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%);
          border: 2px solid #805ad5;
          padding: 20px;
          margin: 25px 0;
          border-radius: 10px;
          text-align: center;
          font-style: italic;
          color: #553c9a;
          box-shadow: 0 3px 10px rgba(128, 90, 213, 0.15);
        }

        .conclusion {
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          color: #ffffff;
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
          color: #ffffff;
        }

        .conclusion strong {
          position: relative;
          z-index: 1;
          color: #ffffff;
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
          text-align: left;
          line-height: 1.8;
          color: #4a5568;
          font-weight: 400;
        }

        strong {
          color: #1a202c;
          font-weight: 700;
        }

        ul {
          margin: 15px 0;
          padding-left: 30px;
          color: #4a5568;
        }

        ul li {
          margin: 8px 0;
          line-height: 1.6;
        }

        /* RESPONSIVE DESIGN */

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
        {/* Global Timer */}
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
          {!isTimerExpanded && <div className="expand-hint">Click para expandir</div>}
        </div>

        {/* Speech Content */}
        <div className="speech-content">
          <h1 className="speech-title">“Lo que van a recibir quienes nos despojan”</h1>

          <div className="section-intro">
            <p>
              Si lee el título del discurso, podemos notar que hay dos clases de grupos...{" "}
              <span className="highlight">A quienes despojan</span> y están quienes hacen ese acto de maldad.
            </p>
            <p>
              El miércoles de la semana pasada, vimos estos dos grupos... A quienes despojaron que fueron los de
              Israel... Y quiénes lo hacían, eran 3 naciones: <strong>Babilonia, Asiria y Moab</strong>.
            </p>
          </div>

          <p>
            Lo sucedido en el pasado da un precedente de lo que sucederá para nuestro tiempo. Y es sencillo determinar
            que es a nosotros a quienes despojan. Sin embargo, analicemos juntos quienes son los que nos despojan en la
            actualidad y como actuarían según la biblia.
          </p>

          <div className="bible-text">
            <h3>Isaías 17:12</h3>
            <p>
              <strong>12</strong> ¡Escuchen! ¡Hay muchos pueblos en conmoción! Están tan agitados como los mares. ¡Las
              naciones están alborotadas! Suenan como el rugido de poderosas aguas.
            </p>
          </div>

          <p>
            El versículo habla de <span className="key-point">Pueblos, Naciones</span> que hace referencia a las personas del mundo,
            además dice cuál sería su estado mental y emocional... Estarían agitadas, alborotadas.
          </p>

          <h2>El Ambiente Actual</h2>

          <p>
            Fíjese por ejemplo en que este año hay <strong>Elecciones</strong> para escoger un nuevo presidente.
          </p>

          <p>
            <span className="question">¿Como persive usted el ambiente debido este tema?</span>
          </p>

          <p>
            Bastante tenso, inclusive hace unos meses le quitaron la vida a un candidato presencial. Quizá por alguna
            diferencia política. Se nota la agitación que menciona Isaías.
          </p>

          <p>
            O que dice usted de las personas que lo insulten por ser neutral en temas políticos. Claro, hay personas que
            respecta nuestra postura neutral, pero hay otras personas que reflejan un sentimiento que Jesús predijo hace
            tiempo.
          </p>

          <div className="bible-text">
            <h3>Juan 15:18, 19</h3>
            <p>
              <strong>18</strong> Si el mundo los odia, ya saben que a mí me odió antes que a ustedes.{" "}
              <strong>19</strong> Si fueran parte del mundo, el mundo los amaría porque serían algo suyo. Pero, como no
              son parte del mundo, sino que yo los he elegido de entre el mundo, por eso el mundo los odia.
            </p>
          </div>

          <p>
            Odian que no apoyemos sus ideales políticos... Es como dice el dicho....{" "}
            <em>Si no estás conmigo, estás en mi contra</em>.
          </p>

          <h2>¿De Qué Nos Despojan?</h2>

          <p>
            Ahora, <span className="question">¿De qué nos despojan o que nos saquean?</span>
          </p>

          <p>Se ve claramente en la imagen hermanos:</p>

          <div className="image-reference">
            En la imagen se ve a un hermano que está preso. Lo despojaron de su libertad.
            <br />
            Le quitaron la libertad por ser neutral, no por que haya cometido algún delito.
            <br />
            (El rostro del hermano tiene golpes o moretones)
          </div>

          <p>Nosotros aún tenemos la libertad ser neutrales ante el gobierno colombiano.</p>

          <p>
            Pero, hágase está pregunta{" "}
            <span className="question">¿Estaría listo por si llegara a pasar en Colombia?</span>
          </p>

          <p>
            Analizar esto nos debe motivar a <span className="key-point">prepararnos en todo sentido</span>.
          </p>

          <h2>¿Qué Recibirán Quienes Nos Despojan?</h2>

          <p>
            Ahora hermanos. De estas personas que nos despojan...{" "}
            <span className="question">¿Que van a recibir y de quién?</span>
          </p>

          <p>Nuevamente el libro de Isaías da la repuesta:</p>

          <div className="bible-text">
            <h3>Isaías 17:13, 14</h3>
            <p>
              <strong>13</strong> Las naciones sonarán como el rugido de muchas aguas. Él las reprenderá, y ellas huirán
              lejos, perseguidas como la paja de las montañas ante el viento, como un cardo seco ante un ventarrón.
            </p>
            <p>
              <strong>14</strong> Al atardecer hay terror. Antes de la mañana, ellos ya han dejado de existir.{" "}
              <span className="key-point">Eso es lo que van a recibir quienes nos despojan</span> y es lo que les toca a
              quienes nos saquean.
            </p>
          </div>

          <p>
            En el versículo 14 dice que <span className="highlight">dejarán de existir. Será eliminados.</span> Eso es
            lo que recibirán.
          </p>

          <p>
            Y En el versículo 13 habla de que <strong>Jehová las reprenderá</strong>... Ningún ser humano tiene este
            poder... Solo Jehová y Jesús.
          </p>

          <div className="conclusion">
            <p>
              La época en la que Gobiernos, personas hagan pasar por sufrimientos a nuestros hermanos se está acabando.
              Porque muy pronto si no se arrepienten serán destruidos para siempre.
            </p>
            <p>
              <strong>Esperanza</strong> - Atenderá todas las injusticias que han hecho al pueblo de Jehová.
            </p>
            <p className="closing">Y en cuanto a nosotros sigamos siendo leales al Dios que juzga con justicia.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
