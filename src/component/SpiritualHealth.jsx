"use client"

import React, { useState, useEffect } from 'react'

export default function DiscourseSpiritualHealth() {
  const [expandedSections, setExpandedSections] = useState({})
  const [globalTime, setGlobalTime] = useState(0)
  const [isGlobalTimerRunning, setIsGlobalTimerRunning] = useState(false)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)

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

  const toggleTimerExpansion = () => {
    setIsTimerExpanded(!isTimerExpanded)
  }

  const handleControlClick = (e) => {
    e.stopPropagation()
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="discourse-container">
      <style jsx>{`
        .discourse-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
          min-height: 100vh;
        }

        .timer-container {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.98);
          color: #2d3748;
          border-radius: 14px;
          box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .timer-container.collapsed {
          padding: 12px 20px;
        }

        .timer-container.expanded {
          padding: 20px;
          min-width: 240px;
          cursor: default;
        }

        .timer-container.collapsed:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 8px 28px rgba(0, 0, 0, 0.14),
            0 3px 8px rgba(0, 0, 0, 0.08);
        }

        .timer-container.running {
          border-color: rgba(56, 161, 105, 0.5);
          box-shadow:
            0 4px 20px rgba(56, 161, 105, 0.25),
            0 0 0 3px rgba(56, 161, 105, 0.12);
        }

        .timer-display {
          font-weight: 700;
          text-align: center;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          color: #1a202c;
          padding: 8px 12px;
          border-radius: 10px;
          background: linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%);
          border: 1px solid #cbd5e0;
          letter-spacing: 1px;
        }

        .timer-container.collapsed .timer-display {
          font-size: 24px;
          margin-bottom: 0;
        }

        .timer-container.expanded .timer-display {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .timer-container.running .timer-display {
          color: #2f855a;
          background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
          border-color: #9ae6b4;
        }

        .timer-controls {
          display: flex;
          gap: 10px;
        }

        .timer-btn {
          flex: 1;
          padding: 11px 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: white;
        }

        .timer-btn.start {
          background: #38a169;
          box-shadow: 0 2px 8px rgba(56, 161, 105, 0.3);
        }

        .timer-btn.pause {
          background: #dd6b20;
          box-shadow: 0 2px 8px rgba(221, 107, 32, 0.3);
        }

        .timer-btn.reset {
          background: #e53e3e;
          box-shadow: 0 2px 8px rgba(229, 62, 62, 0.3);
        }

        .timer-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
          box-shadow: 0 5px 14px rgba(0, 0, 0, 0.18);
        }

        .timer-btn:active {
          transform: translateY(0);
        }

        .expand-hint {
          font-size: 11px;
          text-align: center;
          opacity: 0.7;
          margin-top: 6px;
          animation: hint-pulse 2s infinite;
          color: #4a5568;
          font-weight: 500;
        }

        @keyframes hint-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .discourse-header {
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          padding: 35px 30px;
          border-radius: 20px;
          margin-bottom: 30px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(30, 58, 95, 0.3);
          position: relative;
          overflow: hidden;
        }

        .discourse-header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        .discourse-header h1 {
          margin: 0 0 10px 0;
          font-size: 1.8em;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .discourse-header .theme-label {
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.9em;
          display: inline-block;
          position: relative;
          z-index: 1;
        }

        .discourse-header .scripture-ref {
          margin-top: 12px;
          font-size: 0.95em;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }

        .intro-section {
          background: white;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-left: 5px solid #3498db;
        }

        .intro-question {
          font-size: 1.25em;
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .intro-text {
          color: #555;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .intro-reasons {
          background: linear-gradient(135deg, #e8f4fc 0%, #d6eaf8 100%);
          border-radius: 12px;
          padding: 20px 24px;
          margin: 20px 0;
        }

        .intro-reasons h4 {
          color: #2980b9;
          margin: 0 0 14px 0;
          font-size: 1.05em;
        }

        .intro-reasons ol {
          margin: 0;
          padding-left: 24px;
          color: #34495e;
        }

        .intro-reasons li {
          margin: 10px 0;
          line-height: 1.6;
          padding-left: 8px;
        }

        .definition-box {
          background: linear-gradient(135deg, #fef9e7 0%, #fcf3cf 100%);
          border: 1px solid #f4d03f;
          border-left: 5px solid #f1c40f;
          border-radius: 12px;
          padding: 22px 26px;
          margin: 24px 0;
        }

        .definition-box h4 {
          color: #9a7b0a;
          margin: 0 0 12px 0;
          font-size: 1.1em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .definition-box h4::before {
          content: '?';
          background: #f1c40f;
          color: white;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9em;
        }

        .definition-box p {
          color: #7d6608;
          line-height: 1.7;
          margin: 0;
        }

        .question-highlight {
          background: linear-gradient(135deg, #ebf5fb 0%, #d4e6f1 100%);
          border: 2px dashed #3498db;
          border-radius: 14px;
          padding: 20px 26px;
          margin: 24px 0;
          text-align: center;
        }

        .question-highlight p {
          color: #21618c;
          font-size: 1.15em;
          font-weight: 600;
          line-height: 1.6;
          margin: 0;
        }

        .reason-section {
          background: white;
          border-radius: 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .reason-section:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .reason-header {
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: white;
          padding: 20px 26px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .reason-header.reason-2 {
          background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
        }

        .reason-header.reason-3 {
          background: linear-gradient(135deg, #7d3c98 0%, #9b59b6 100%);
        }

        .reason-header:hover {
          filter: brightness(1.05);
        }

        .reason-number {
          background: rgba(255, 255, 255, 0.25);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3em;
          font-weight: 700;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .reason-title {
          flex: 1;
          font-size: 1.15em;
          font-weight: 600;
        }

        .expand-icon {
          font-size: 1.5em;
          transition: transform 0.3s ease;
        }

        .expand-icon.expanded {
          transform: rotate(180deg);
        }

        .reason-content {
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .reason-content.expanded {
          padding: 26px;
          max-height: 3000px;
        }

        .scripture-box {
          background: linear-gradient(135deg, #eaf2f8 0%, #d4e6f1 100%);
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 22px;
          border-left: 4px solid #3498db;
        }

        .scripture-reference {
          color: #2471a3;
          font-weight: 700;
          font-size: 1.05em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .scripture-reference::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #3498db;
          border-radius: 50%;
        }

        .scripture-text {
          color: #1a5276;
          line-height: 1.8;
          font-style: italic;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
        }

        .scripture-text .verse-num {
          color: #e74c3c;
          font-weight: 700;
          font-style: normal;
          margin-right: 4px;
        }

        .explanation-text {
          color: #444;
          line-height: 1.8;
          margin: 18px 0;
          padding: 16px 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .highlight-box {
          background: linear-gradient(135deg, #e8f8f5 0%, #d1f2eb 100%);
          border-left: 4px solid #1abc9c;
          padding: 18px 22px;
          border-radius: 0 12px 12px 0;
          margin: 18px 0;
        }

        .highlight-box p {
          color: #0e6655;
          line-height: 1.7;
          margin: 0;
        }

        .key-term {
          background: linear-gradient(135deg, #fdebd0 0%, #fae5d3 100%);
          border-left: 4px solid #e67e22;
          padding: 18px 22px;
          border-radius: 0 12px 12px 0;
          margin: 18px 0;
        }

        .key-term p {
          color: #a04000;
          line-height: 1.7;
          margin: 0;
        }

        .image-description {
          background: linear-gradient(135deg, #fdfefe 0%, #f4f6f6 100%);
          border: 1px solid #e5e8e8;
          border-radius: 14px;
          padding: 24px;
          margin: 20px 0;
        }

        .image-description h5 {
          color: #2c3e50;
          margin: 0 0 18px 0;
          font-size: 1.05em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .image-description h5::before {
          content: '';
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
          border-radius: 6px;
        }

        .image-point {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          margin: 10px 0;
          background: white;
          border-radius: 10px;
          border: 1px solid #eaecee;
          transition: all 0.2s ease;
        }

        .image-point:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateX(4px);
        }

        .image-point-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.85em;
          flex-shrink: 0;
        }

        .image-point-icon.bg-image { background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); }
        .image-point-icon.circle-image { background: linear-gradient(135deg, #e67e22 0%, #f39c12 100%); }

        .image-point p {
          color: #555;
          line-height: 1.7;
          margin: 0;
        }

        .conclusion-box {
          background: linear-gradient(135deg, #d5f5e3 0%, #abebc6 100%);
          border-radius: 12px;
          padding: 20px 24px;
          margin-top: 20px;
          border: 1px solid #82e0aa;
        }

        .conclusion-box p {
          color: #1e8449;
          line-height: 1.7;
          margin: 0;
          font-weight: 500;
        }

        .warning-box {
          background: linear-gradient(135deg, #fdedec 0%, #fadbd8 100%);
          border-radius: 12px;
          padding: 20px 24px;
          margin-top: 20px;
          border: 1px solid #f5b7b1;
          border-left: 4px solid #e74c3c;
        }

        .warning-box p {
          color: #922b21;
          line-height: 1.7;
          margin: 0;
          font-weight: 500;
        }

        .application-section {
          background: white;
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          border-top: 5px solid #e74c3c;
        }

        .application-section h3 {
          color: #c0392b;
          margin: 0 0 22px 0;
          font-size: 1.25em;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .application-section h3::before {
          content: '';
          width: 8px;
          height: 30px;
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          border-radius: 4px;
        }

        .application-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .application-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px 20px;
          margin: 12px 0;
          background: linear-gradient(135deg, #fdf2f2 0%, #fce4e4 100%);
          border-radius: 12px;
          border-left: 4px solid #e74c3c;
          transition: all 0.2s ease;
        }

        .application-item:hover {
          transform: translateX(6px);
          box-shadow: 0 4px 16px rgba(231, 76, 60, 0.15);
        }

        .application-number {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .application-text {
          color: #922b21;
          line-height: 1.7;
        }

        .final-conclusion {
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(30, 58, 95, 0.3);
        }

        .final-conclusion p {
          font-size: 1.1em;
          line-height: 1.8;
          margin: 0 0 14px 0;
        }

        .final-conclusion p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .discourse-container {
            padding: 20px 15px;
          }

          .discourse-header {
            padding: 25px 20px;
          }

          .discourse-header h1 {
            font-size: 1.4em;
          }

          .intro-section,
          .application-section {
            padding: 22px 18px;
          }

          .reason-header {
            padding: 16px 18px;
          }

          .reason-content.expanded {
            padding: 20px 18px;
          }

          .image-point {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      {/* Cronometro flotante */}
      <div
        className={`timer-container ${isTimerExpanded ? "expanded" : "collapsed"} ${isGlobalTimerRunning ? "running" : ""}`}
        onClick={toggleTimerExpansion}
      >
        <div className="timer-display">{formatTime(globalTime)}</div>
        {isTimerExpanded ? (
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
        ) : (
          <div className="expand-hint">Toca para abrir</div>
        )}
      </div>

      {/* Header */}
      <div className="discourse-header">
        <div className="theme-label">Discurso</div>
        <h1>No nos enfermemos espiritualmente como les pasó a los de Judá</h1>
        <div className="scripture-ref">Basado en Jeremias 4-6</div>
      </div>

      {/* Introduccion */}
      <div className="intro-section">
        <p className="intro-question">Si usted estuviera gravemente enfermo, que necesitaria para recuperarse?</p>
        <p className="intro-text">Primero, un diagnostico exacto. Y segundo, aceptar ese diagnostico y seguir el tratamiento indicado.</p>

        <p className="intro-text">Algo parecido ocurre en sentido espiritual. Jehova siempre hace diagnosticos exactos de nuestra condicion espiritual. El problema es que, igual que ocurrio con los habitantes de Juda, una persona puede rechazar ese diagnostico o ignorarlo.</p>

        <p className="intro-text">Analicemos que les paso a ellos y durante el discurso tengamos esta pregunta presente...</p>

        <div className="question-highlight">
          <p>Que podemos hacer para no enfermarnos espiritualmente?</p>
        </div>
      </div>

      {/* Punto 1: El mal sintoma */}
      <div className="reason-section">
        <div 
          className="reason-header"
          onClick={() => toggleSection('point1')}
        >
          <div className="reason-number">1</div>
          <div className="reason-title">El mal sintoma de Juda</div>
          <span className={`expand-icon ${expandedSections['point1'] ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div className={`reason-content ${expandedSections['point1'] ? 'expanded' : ''}`}>
          <p className="explanation-text">Un mal sintoma que tenian los de Juda se muestra en Jeremias 4: 4 y 14.</p>

          <div className="scripture-box">
            <div className="scripture-reference">Jeremias 4: 4 y 14</div>
            <div className="scripture-text">
              <span className="verse-num">4</span> Circuncidense para Jehova y quiten el prepucio de sus corazones, hombres de Juda y habitantes de Jerusalen, para que mi furia no se encienda como un fuego y arda sin que nadie pueda apagarla por culpa de sus malas acciones". <span className="verse-num">14</span> Limpia de maldad tu corazon, oh, Jerusalen, para salvarte. Hasta cuando abrigaras malos pensamientos?
            </div>
          </div>

          <div className="key-term">
            <p>Cuando dice... <strong>Quiten el prepucio de sus corazones...</strong> En realidad quiere decir: librarse de: pensamientos, deseos o motivos que estuvieran en conflicto con las normas divinas.</p>
          </div>

          <div className="explanation-text">
            El problema no era que no supieran lo que estaba mal. Jehova se los estaba diciendo claramente. El problema era que eran tercos y no querian cambiar.
          </div>

          <div className="explanation-text">
            El versiculo 14 nos muestra que sus pensamientos y deseos eran malos. Todas estas actitudes comienzan en el corazon.
          </div>

          <div className="explanation-text">
            Por ejemplo, alguien podria guardar resentimiento contra un hermano y hablar negativamente de el con otras personas. Aunque nadie mas lo note, Jehova si ve lo que hay en el corazon.
          </div>

          <div className="highlight-box">
            <p>Debido a ello, lo correcto seria que nuestras conversaciones sean edificantes.</p>
          </div>
        </div>
      </div>

      {/* Punto 2: Rechazaron el diagnostico */}
      <div className="reason-section">
        <div 
          className="reason-header reason-2"
          onClick={() => toggleSection('point2')}
        >
          <div className="reason-number">2</div>
          <div className="reason-title">Rechazaron el diagnostico</div>
          <span className={`expand-icon ${expandedSections['point2'] ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div className={`reason-content ${expandedSections['point2'] ? 'expanded' : ''}`}>
          <p className="explanation-text">Ahora, los de Juda recibieron ese diagnostico de Jehova mediante Jeremias... Pero Lo aceptaron?</p>

          <div className="scripture-box">
            <div className="scripture-reference">Jeremias 5: 31</div>
            <div className="scripture-text">
              <span className="verse-num">31</span> los profetas profetizan mentiras y los sacerdotes usan su autoridad para dominar a otros. Y a mi propio pueblo le encanta eso. Pero que haran ustedes cuando llegue el fin?".
            </div>
          </div>

          <div className="explanation-text">
            Bueno es logico concluir que no lo aceptaron, mas bien, noten lo que hacian los profetas... Profetizaban mentiras. Por ejemplo, en Jeremias 6: 14 decian, hay paz, cuando en realidad no habia esa paz. Es como decir, todo esta bien, estamos haciendo las cosas bien. Cuando en realidad no es asi.
          </div>

          <div className="key-term">
            <p>Los de Juda hacian como el paciente que solo quiere que le doctor le diga palabras que lo tranquilice y que de hecho, pase por alto los intimas graves.</p>
          </div>

          <div className="explanation-text">Ahora pensemos en el aspecto practico para nosotros.</div>

          <div className="image-description">
            <h5>Analisis de la imagen</h5>

            <div className="image-point">
              <div className="image-point-icon bg-image">F</div>
              <p><strong>Imagen de fondo:</strong> Vemos a la hermana, teniendo su estudio personal.</p>
            </div>

            <div className="image-point">
              <div className="image-point-icon circle-image">C</div>
              <p><strong>Imagen circular:</strong> Vemos a una doctora indicando directamente donde esta el problema.</p>
            </div>
          </div>

          <div className="highlight-box">
            <p>Jehova es como ese doctor, quiza, mediante el estudio personal de la hermana, le muestra en que debe mejorar, que falla tiene y ella medita en eso.</p>
          </div>

          <div className="explanation-text">
            Y en la actualidad, Jehova nos diagnostica con discursos, estudios de la atalaya, nuestro estudio personal.
          </div>

          <div className="warning-box">
            <p>Pero que tal si hay algo que nos atane y digamos... Esto le cae a fulanito o sutanito. Porque yo estoy bien. No estariamos aceptando el diagnostico tal como los de Juda.</p>
          </div>
        </div>
      </div>

      {/* Punto 3: El resultado tragico */}
      <div className="reason-section">
        <div 
          className="reason-header reason-3"
          onClick={() => toggleSection('point3')}
        >
          <div className="reason-number">3</div>
          <div className="reason-title">El resultado de no escuchar</div>
          <span className={`expand-icon ${expandedSections['point3'] ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div className={`reason-content ${expandedSections['point3'] ? 'expanded' : ''}`}>
          <p className="explanation-text">De hecho, el que el Reino de Juda no aceptara los llevo un resultado muy tragico. Leamos por por favor.</p>

          <div className="scripture-box">
            <div className="scripture-reference">Jeremias 6: 17 - 19</div>
            <div className="scripture-text">
              <span className="verse-num">17</span> "Y nombre centinelas, que dijeron: 'Presten atencion al sonido del cuerno!'". Pero ellos respondieron: "No vamos a prestar atencion". <span className="verse-num">18</span> "Por eso, oigan, oh, naciones! Y enterate, oh, asamblea, de lo que les pasara a ellos. <span className="verse-num">19</span> Escucha, oh, tierra! Le voy a mandar una calamidad a este pueblo como fruto de sus propios planes malvados, porque no prestaron atencion a mis palabras y rechazaron mi ley".
            </div>
          </div>

          <div className="explanation-text">
            Jehova les decia a Juda... Nombre centinelas, esto paso mucho antes de la caida de Jerusalen... Como fueron tan tercos y rebeldes, se les llevo al exilio.
          </div>

          <div className="highlight-box">
            <p>Hoy dia tambien tenemos un centinela... El esclavo fiel y prudente. El esclavo en el sitio web coloca articulos que dice... Estemos siempre vigilantes... o que tal, los informes, los Broadcasting, nos mantienen siempre alertas en sentido espiritual.</p>
          </div>

          <div className="conclusion-box">
            <p>Siempre prestemos atencion y hagamos los cambios necesarios.</p>
          </div>
        </div>
      </div>

      {/* Aplicacion */}
      <div className="application-section">
        <h3>Que puedo hacer para no enfermarme en sentido espiritual?</h3>
        <p className="intro-text">Despues de analizar el ejemplo de Juda, volvamos a la pregunta. Hemos visto dos cosas:</p>

        <ul className="application-list">
          <li className="application-item">
            <div className="application-number">1</div>
            <div className="application-text">No ser tercos ni rebeldes cuando Jehova nos ayuda a identificar algo que debemos corregir.</div>
          </li>
          <li className="application-item">
            <div className="application-number">2</div>
            <div className="application-text">Aceptar con humildad el diagnostico que nos da mediante su Palabra y su organizacion.</div>
          </li>
        </ul>
      </div>

      {/* Conclusion final */}
      <div className="final-conclusion">
        <p>Si hacemos esto, no actuaremos como los habitantes de Juda, que rechazaron las advertencias de Jehova.</p>
        <p>Mas bien, mantendremos una buena salud espiritual y seguiremos disfrutando de su aprobacion y bendicion.</p>
      </div>
    </div>
  )
}