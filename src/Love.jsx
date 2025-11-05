import { useState, useEffect } from "react"
import "./SpeechOutline.css"

export default function DiscourseTrueLove() {
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
          background: linear-gradient(135deg, #fdf2f8 0%, #f0e6ff 100%);
          border-left: 5px solid #d946ef;
          padding: 35px;
          margin: 35px 0;
          border-radius: 0 12px 12px 0;
          box-shadow: 
            0 4px 12px rgba(217, 70, 239, 0.1),
            0 2px 4px rgba(217, 70, 239, 0.06);
          position: relative;
          overflow: hidden;
          font-size: 1.1em;
        }

        .bible-text::before {
          content: '💕';
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
          border-bottom: 2px solid #d946ef;
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
          color: #be185d;
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
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
          color: #880e4f;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 6px;
          border-left: 3px solid #d946ef;
          display: inline-block;
          margin: 2px;
          box-shadow: 0 2px 4px rgba(217, 70, 239, 0.2);
        }

        .conclusion {
          background: linear-gradient(135deg, #be185d 0%, #d946ef 100%);
          color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          margin-top: 40px;
          text-align: center;
          box-shadow: 
            0 8px 20px rgba(217, 70, 239, 0.3),
            0 4px 8px rgba(217, 70, 239, 0.2);
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

        <div className="speech-content">
          <h1 className="speech-title">Una Historia de Amor Verdadero</h1>

          <p>
            Entramos a un nuevo libro de la Biblia. Hoy nos centraremos en una historia de amor verdadero que nos
            ayudará tanto a los que estamos casados como a los que están en camino para casarse.
          </p>

          <p>
            Los protagonistas de esta historia son{" "}
            <span className="key-point">la Sulamita, un joven pastor y Salomón</span>. Esta es una historia de
            importancia crucial porque <span className="key-point">Colombia es un país donde hay muchos divorcios</span>
            .
          </p>

          <p>
            Según la Superintendencia de Notariado y Registro-SNR, entre enero de 2023 y abril de 2024 se registraron
            88,069 matrimonios y 32,567 divorcios, lo que implica que por cada 100 matrimonios, aproximadamente 37
            terminaron en divorcio.
          </p>

          <p>
            Las principales causas de esos divorcios son:{" "}
            <span className="key-point">
              la infidelidad, la violencia y el incumplimiento de las obligaciones en pareja
            </span>
            . En resumen... <span className="key-point">falta de amor verdadero</span>.
          </p>

          <h2>LA PRUEBA DEL AMOR VERDADERO</h2>

          <p>
            Precisamente el ejemplo de la Sulamita y el joven pastor nos enseña la forma correcta de demostrar y
            cultivar amor verdadero. Veamos la prueba que enfrentó:
          </p>

          <div className="bible-text">
            <h3>Cantar de los Cantares 1:9-11</h3>
            <p>
              <strong>9</strong> "A una yegua entre los carros del faraón te comparo a ti, amada mía.{" "}
              <strong>10</strong> Hermosas son tus mejillas con adornos y hermoso es tu cuello con collares.{" "}
              <strong>11</strong> Haremos para ti adornos de oro con incrustaciones de plata".
            </p>
          </div>

          <p>
            Quien le dijo estos piropos a la Sulamita fue Salomón.{" "}
            <span className="key-point">Esta clase de palabras eran del más alto nivel en su época</span>.
          </p>

          <p>
            Le comparó a una yegua entre los carros del faraón.{" "}
            <span className="question">¿Por qué esa comparación?</span> Israel no podría sencillamente dedicarse a criar
            y exportar caballos, por eso se los compraban a los egipcios.
          </p>

          <p>
            Eran un símbolo de <span className="key-point">poder, nobleza, elegancia y belleza</span>. Solo lo podrían
            tener reyes o personas ricas.
          </p>

          <p>
            Ese piropo de Salomón equivaldría a decir:{" "}
            <span className="question">"Eres tan elegante y única como una joya real"</span>.
          </p>

          <p>
            Sin embargo, Salomón no termina allí. La intenta deslumbrar diciendo que hermosos sus mejillas con
            adornos... Como sugerir que se le verían bien collares y aretes de oro.
          </p>

          <p>
            Quizá cualquier mujer en su tiempo quedaría rendida a los pies de Salomón. Y allí es donde está el punto...{" "}
            <span className="key-point">La Sulamita no era cualquiera, era única</span>.
          </p>

          <p>
            Mientras Salomón le decía esto y le proponía regalos, la actitud de ella hacia Salomón era de rechazo
            rotundo. Pero ella responde en:
          </p>

          <div className="bible-text">
            <h3>Cantar de los cantares 2:16, 17</h3>
            <p>
              <strong>16</strong> "Mi amado es mío y yo soy suya. Él pastorea el rebaño entre los lirios.{" "}
              <strong>17</strong> Antes de que sople la brisa del día y huyan las sombras, vuelve rápido, oh, amado mío,
              como la gacela o el ciervo joven sobre las montañas de separación.
            </p>
          </div>

          <p>
            Ella pensaba y hablaba de su amado, y estaba deseando que él volviera lo más rápido posible.{" "}
            <span className="key-point">Demostró con hechos que tenía un amor verdadero hacia el joven pastor</span>.
          </p>

          <h2>CÓMO CULTIVAR AMOR VERDADERO</h2>

          <p>
            Algo que ayuda a cultivar ese tipo de amor son <span className="key-point">las muestras de cariño</span>.
            Pueden ser de tres formas:
          </p>

          <p>
            <span className="key-point">Con palabras:</span> Decirle lo que sientes hacia la otra persona, recordarle
            las bonitas cualidades que tiene. Tenga cuidado de no usar los piropos de Salomón en la actualidad...
            Diciéndole a su esposa o enamorada que es parecida a una yegua.
          </p>

          <p>
            <span className="key-point">Con gestos físicos:</span> Tomarle la mano cuando caminan, un abrazo sincero.
          </p>

          <p>
            <span className="key-point">Con detalles:</span> Puede ser algo pequeño que no sea caro, lo importante es
            que muestre que piensa en la otra persona.
          </p>

          <h2>LEYENDO EL CANTAR DE LOS CANTARES</h2>

          <p>
            Algo que pueden notar es que no vemos a quien se está hablando porque es una canción. Pero se puede
            distinguir. Sin embargo, hay una sugerencia importante:
          </p>

          <p style={{ fontStyle: "italic", background: "#f0f4f8", padding: "15px", borderRadius: "8px" }}>
            "Cuando lea El Cantar de los Cantares, use el 'Contenido del libro' de la Traducción del Nuevo Mundo para
            saber quién dice cada cosa".
          </p>

          <p>
            Así que hermanos, aprovechemos al máximo los consejos de este libro incluidos los que aprendimos hoy...{" "}
            <span className="key-point">Demostrar con hechos ese amor y cultivarlo con muestras de cariño</span>.
          </p>

          <div className="conclusion">
            <p>En conclusión, el ejemplo de la Sulamita nos muestra que el amor verdadero se demuestra con hechos.</p>
            <p className="question closing">¿Cómo aplicaremos estas lecciones en nuestras relaciones?</p>
          </div>
        </div>
      </div>
    </div>
  )
}
