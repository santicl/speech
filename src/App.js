import { useState, useEffect } from "react"

export default function SpeechOutline() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setTime(0)
    setIsRunning(false)
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
          font-family: Georgia, "Times New Roman", serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fafafa;
          min-height: 100vh;
        }

        .timer-container {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .timer-container.collapsed {
          padding: 10px 15px;
          min-width: auto;
        }

        .timer-container.expanded {
          padding: 15px;
          min-width: 200px;
          cursor: default;
        }

        .timer-container.collapsed:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .timer-display {
          font-weight: bold;
          text-align: center;
          font-family: "Courier New", monospace;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px;
          border-radius: 6px;
        }

        .timer-container.collapsed .timer-display {
          font-size: 20px;
          margin-bottom: 0;
        }

        .timer-container.expanded .timer-display {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .timer-controls {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .timer-btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .timer-btn.start {
          background-color: #4caf50;
          color: white;
        }

        .timer-btn.pause {
          background-color: #ff9800;
          color: white;
        }

        .timer-btn.reset {
          background-color: #f44336;
          color: white;
        }

        .timer-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .font-control {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .font-control input[type="range"] {
          flex: 1;
        }

        .font-control span {
          min-width: 35px;
          text-align: center;
        }

        .expand-hint {
          font-size: 10px;
          text-align: center;
          opacity: 0.7;
          margin-top: 5px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .speech-content {
          margin-top: 20px;
        }

        .speech-title {
          color: #2c3e50;
          text-align: center;
          border-bottom: 3px solid #3498db;
          padding-bottom: 15px;
          margin-bottom: 30px;
          font-size: 1.8em;
        }

        .speech-section {
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .speech-section:hover {
          transform: translateY(-2px);
        }

        .bible-text {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-left: 5px solid #3498db;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .bible-text h3 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.2em;
          text-decoration: underline;
        }

        .bible-text p {
          margin: 8px 0;
          font-weight: 500;
        }

        .bible-text strong {
          color: #e74c3c;
          font-size: 1.1em;
        }

        .bible-reference {
          background-color: #3498db;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 0.9em;
        }

        .question {
          color: #e67e22;
          font-weight: bold;
          font-style: italic;
          background-color: #fef9e7;
          padding: 2px 4px;
          border-radius: 3px;
          border-left: 3px solid #f39c12;
          padding-left: 8px;
          display: inline-block;
          margin: 2px 0;
        }

        .meditation {
          text-align: center;
          font-style: italic;
          color: #7f8c8d;
          font-weight: bold;
          margin: 20px 0;
          padding: 10px;
          background-color: #ecf0f1;
          border-radius: 6px;
        }

        .quote {
          background-color: #f8f9fa;
          border-left: 4px solid #6c757d;
          padding: 15px 20px;
          margin: 20px 0;
          font-style: italic;
          border-radius: 0 6px 6px 0;
        }

        .conclusion {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .final-points {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px 20px;
          border-radius: 6px;
          margin: 15px 0;
        }

        .final-points li {
          margin: 8px 0;
          font-weight: 500;
        }

        .closing {
          text-align: center;
          font-weight: bold;
          font-size: 1.1em;
          margin-top: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
        }

        p {
          margin-bottom: 15px;
          text-align: justify;
        }

        em {
          background-color: #fff3cd;
          padding: 2px 4px;
          border-radius: 3px;
          font-style: italic;
          color: #856404;
        }

        strong {
          color: #2c3e50;
        }

        h3 {
          color: #34495e;
          margin-top: 25px;
          margin-bottom: 15px;
        }

        @media (max-width: 768px) {
          .speech-container {
            padding: 10px;
            margin-top: 120px;
          }

          .timer-container.collapsed {
            top: 10px;
            right: 10px;
            padding: 8px 12px;
          }
          
          .timer-container.expanded {
            top: 10px;
            left: 10px;
            right: 10px;
            min-width: auto;
          }

          .timer-controls {
            flex-direction: column;
          }

          .speech-title {
            font-size: 1.4em;
          }

          .speech-section {
            padding: 15px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .speech-container {
            padding: 25px;
            max-width: 90%;
          }

          .timer-container.expanded {
            min-width: 220px;
            padding: 18px;
          }

          .timer-container.expanded .timer-display {
            font-size: 26px;
          }

          .speech-title {
            font-size: 2em;
          }

          .speech-section {
            padding: 25px;
          }
        }
      `}</style>

      <div className="speech-container">
        <div className={`timer-container ${isTimerExpanded ? "expanded" : "collapsed"}`} onClick={toggleTimerExpansion}>
          <div className="timer-display">{formatTime(time)}</div>
          {isTimerExpanded && (
            <>
              <div className="timer-controls" onClick={handleControlClick}>
                <button className={`timer-btn ${isRunning ? "pause" : "start"}`} onClick={handleStartPause}>
                  {isRunning ? "Pausar" : "Iniciar"}
                </button>
                <button className="timer-btn reset" onClick={handleReset}>
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
          <h1 className="speech-title">Sabios consejos sobre las bebidas alcohólicas</h1>

          <div className="speech-section">
            <p>
              En la antigüedad era común que las personas comieran junto con vino, una bebida alcohólica. De hecho,{" "}
              <span className="bible-reference">Mateo 11:19</span> afirma que Jesús bebió vino con sus comidas, cuando
              lo había. Lo cual demuestra que es posible disfrutar de una bebida alcohólica.
            </p>

            <p>
              Ante esta posibilidad debemos examinar cuales son los consejos que da la biblia si decidimos beber vino o
              otra bebida alcohólica.
            </p>

            <p>
              Si decidimos beber bebidas alcohólicas, hagámoslo con moderación{" "}
              <span className="bible-reference">(Pr 23:20, 21; w04 1/12 19 párrs. 5, 6)</span>.
            </p>
          </div>

          <div className="speech-section">
            <p>Examinemos el primer consejo que se muestra en proverbios...</p>

            <div className="bible-text">
              <h3>Proverbios 23:20, 21:</h3>
              <p>
                <strong>20</strong> No estés entre los que beben demasiado vino ni entre los que se dan un atracón de
                carne,
              </p>
              <p>
                <strong>21</strong> porque el borracho y el glotón caerán en la pobreza, y la somnolencia los vestirá de
                harapos.
              </p>
            </div>

            <p>Este versículo nos invita a que sí tomamos alguna bebida alcohólica debe ser con moderación.</p>

            <p>
              Normalmente la bebida alcohólica en un consumo bajo, produce relajación en el cuerpo humano. Pero hay un
              punto a meditar... Recordemos a Jesús, cuando lo tenían retenido... Antes de pasar por la prueba le
              ofrecieron vino, aunque mezclado, prefirió pasar la prueba usando el 100% de sus facultades mentales. Y ya
              al pasar por la prueba, cuando tenía sed, pidió un poco de vino.
            </p>

            <p>
              Lo que nos lleva a pensar en la gran tribulación... Esos momentos puede que nos cause estrés... Pero y{" "}
              <span className="question">¿si acudimos constantemente a la bebida para estar relajados?</span> O que tal{" "}
              <span className="question">¿Si llega el día de Jehová y nos sorprende embotados por el alcohol?</span>
            </p>

            <p className="meditation">Para meditar hermanos.</p>

            <p className="question">Ahora ¿Con cuántas copas consideraría usted que es un consumo excesivo?</p>

            <p>
              Bueno, esta es una decisión de cada personal y cada uno debe conocer sus límites personales y no
              sobrepasarlos.
            </p>

            <p>
              Pero el artículo relacionado da un consejo apropiado que debe tener en cuenta...{" "}
              <em>"cualquier cantidad que nuble el juicio y embote la capacidad de pensar es excesiva"</em>
            </p>
          </div>

          <div className="speech-section">
            <p>
              Y no hace falta beber en exceso para saber cuáles son los efectos o peor aún... las consecuencias de
              hacerlo. Y de eso se trata el segundo consejo. Vamos a analizarlo... Para ello leamos:
            </p>

            <div className="bible-text">
              <h3>Proverbios 23:29, 30, 33, 34:</h3>
              <p>
                <strong>29</strong> ¿De quién son los lamentos? ¿De quién es la inquietud? ¿De quién son las peleas? ¿De
                quién las quejas? ¿De quién las heridas sin motivo? ¿De quién los ojos vidriosos?
              </p>
              <p>
                <strong>30</strong> De los que se pasan las horas bebiendo vino, los que andan buscando vino mezclado.
              </p>
            </div>

            <p>
              Aquí se muestran las consecuencias de beber en exceso... Inclusive, simplemente viendo los noticieros
              podemos percibir esto... Personas que provocan graves accidentes. O que una persona bebida, le quite la
              vida a otro.
            </p>

            <p>Pero el exceso puede hacer más que eso... Mire lo que dicen los versículos del 33 y 34</p>

            <div className="bible-text">
              <p>
                <strong>33</strong> Tus ojos verán cosas extrañas y tu corazón dirá cosas perversas.
              </p>
              <p>
                <strong>34</strong> Y serás como quien está tendido en medio del mar, como quien está acostado en lo
                alto del mástil de un barco.
              </p>
            </div>

            <p>
              La revista relacionada a este punto, menciona que la persona podría experimentar alucinaciones por beber
              en niveles altos.
            </p>

            <p className="question">¿Alguna vez ha escuchado sobre "LAS SIRENAS"?</p>

            <p>
              Actualmente se consideran un mito. Sin embargo, hay caricaturas animadas que la protagonista es una mujer
              mitad humana y mitad pez.
            </p>

            <p>
              Referente al tema de las SIRENAS la revista <strong>"HEKTOEN INTERNATIONAL"</strong> dice lo siguiente:
            </p>

            <div className="quote">
              "La combinación de alcohol prolongado, deshidratación y la mitología preexistente creó el terreno perfecto
              para que los marineros vieran lo que esperaban ver: SIRENAS." Lo que normalmente veían eran manatíes o
              dugondos.
            </div>
          </div>

          <div className="speech-section">
            <p>
              Esto nos refuerza la importancia de ser moderados ante el consumo de bebidas alcohólicas. No nos engañemos
              pensando que excedernos no podría hacernos daño. Hablemos un poco más de este punto en el tercer
              consejo...
            </p>

            <div className="bible-text">
              <h3>Proverbios 23:31, 32:</h3>
              <p>
                <strong>31</strong> No te quedes mirando el color rojo del vino cuando brilla en la copa y baja con
                suavidad,
              </p>
              <p>
                <strong>32</strong> porque acaba mordiendo como una serpiente y soltando veneno como una víbora.
              </p>
            </div>

            <p>El versículo 31 dice... No te quedes mirando...</p>

            <p className="question">¿A qué se refiere esta frase?</p>

            <p>
              Piense por un momento que usted está sentado... Pero enfrente de usted se coloca una persona vestida de
              forma inapropiada... <span className="question">¿Qué es lo correcto hacer?</span>... No seguir mirando.
            </p>

            <p>
              Referente a la bebida... Puede que usted se haya tomado una copa de vino... Pero se la queda viendo...
              Pero está rico y está frío con deseo de beber más.
            </p>

            <p className="question">¿Cuál sería el resultado?</p>

            <p>
              Versículo 32 alude a consecuencias negativas... Y cuando caiga en razón, puede que le pase como la hermana
              en la IMAGEN.
            </p>

            <p>
              Observe como mira la hermana a la botella... No son con ojos de querer beber. De hecho, si mira la
              botella, está por la mitad.
            </p>

            <p>
              Quizá esté afrontando las consecuencias de beber en exceso.{" "}
              <span className="question">¿Habrá dicho o hecho algo inapropiado la hermana?</span> Puede ser.
            </p>
          </div>

          <div className="speech-section conclusion">
            <p>Qué positivo sería tener en cuenta los 3 consejos que estuvimos analizando...</p>

            <ol className="final-points">
              <li>Beber con moderación.</li>
              <li>
                Recordemos las terribles consecuencias de beber en exceso, podría inclusive provocarnos alucinaciones.
              </li>
              <li>No nos dejemos llevar por el deseo o por lo rico que esté la bebida.</li>
            </ol>

            <p className="closing">Aplicando estos consejos, Jehová nos verá con buenos ojos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
