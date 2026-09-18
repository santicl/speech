"use client";

import { useEffect, useState } from "react";
import "./SpeechOutline.css";

const planImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pizarra%20online%20Plano%20de%20Arquitectura%20de%20una%20Casa%20profesional%20lineal%20blanco-USbuMxJovkkIE5OXLK2Dzfh6tjQmrJ.png";

const sections = [
  { title: "1. OBJETIVO", content: `Realizar un simulacro de evacuación que permita comprobar la capacidad del personal y de los asistentes para abandonar el recinto de manera ordenada, rápida y segura, utilizando las rutas de evacuación previamente establecidas.

El simulacro permitirá evaluar:
- El tiempo total de evacuación.
- La capacidad de los líderes para dirigir a los asistentes.
- La utilización adecuada de las dos puertas de salida.
- El flujo de personas por los dos pasillos.
- La ausencia de aglomeraciones.
- La comunicación entre el coordinador y los líderes.
- El desplazamiento hacia el punto de encuentro.
- La capacidad de realizar un conteo posterior a la evacuación.` },
  { title: "2. CARACTERÍSTICAS DEL RECINTO", content: `El recinto está compuesto por:

Plataforma de discursos, ubicada en la parte frontal.

Auditorio, compuesto por tres bloques de sillas y una sala auxiliar.

Dos pasillos que separan los tres bloques.

Puerta 1 (P1): ubicada en la parte posterior, correspondiente al acceso principal.

Puerta 2 (P2): ubicada en la parte frontal derecha, junto a la plataforma.

Distribución de las sillas
Bloque izquierdo: 9 filas × 5 sillas = 45 sillas.
Bloque central: 8 filas × 9 sillas = 72 sillas.
Bloque derecho: 8 filas × 5 sillas = 40 sillas.
Sala Auxiliar: 3 filas x 6 sillas = 18 sillas

Capacidad total: 186 sillas.
Para el simulacro se contempla una ocupación de 175 personas, dejando 11 sillas sin ocupar.` },
  { title: "3. DISTRIBUCIÓN DE LAS PERSONAS", content: `Para efectos del ejercicio se utilizará la siguiente distribución aproximada:

Sector                 Capacidad       Personas

Bloque izquierdo       45

Bloque central         72

Bloque derecho         40

Sala Auxiliar          18

TOTAL                  175

La ubicación exacta de las 11 sillas desocupadas deberá quedar definida antes del inicio del simulacro.` },
  { title: "4. IDENTIFICACIÓN DE LAS FILAS", content: `Las filas se numerarán desde la plataforma hacia la parte posterior del recinto:
Fila 1: más próxima a la plataforma.
Fila 8 y 9: más próxima a la entrada/Puerta 1.
Esta numeración será utilizada por los líderes durante el simulacro.` },
  { title: "5. ASIGNACIÓN DE LOS LÍDERES", content: `LÍDER 1 (Hermano Acomodador 1) — BLOQUE IZQUIERDO Y SALA AUXILIAR.
Zona asignada: bloque izquierdo, filas 5–9 + la sala auxiliar.
Salida principal: Puerta 1.
Responsabilidades:
Dar instrucciones a las personas del bloque izquierdo.
Mantener despejado el pasillo correspondiente.
Evitar que las personas regresen por objetos personales.
Conducir al grupo hacia P1.
Verificar visualmente que no queden personas en su sector.

LÍDER 2 (Hermano Acomodador 2) — BLOQUE CENTRAL POSTERIOR + BLOQUE DERECHO POSTERIOR
Zona asignada: bloque Central, filas 4-8 y bloque derecho, filas 6–8.
Salida principal: Puerta 1.
Responsabilidades:
Coordinar la evacuación de las filas asignadas.
Mantener un flujo ordenado hacia el pasillo.
Evitar cruces innecesarios con otros grupos.
Coordinarse con el Líder 1.
Realizar una revisión visual del sector cuando sea seguro hacerlo.

LÍDER 3 (Hermano... ) — BLOQUE DERECHO.
Zona asignada: bloque derecho, filas 1–5.
Salida principal: Puerta 2.
Responsabilidades:
Dirigir las filas asignadas hacia P2.
Mantener libre el acceso a la puerta.
Evitar que las personas regresen al auditorio.
Coordinar el flujo con el Líder 4.

LÍDER 4 (Hermano... ) — BLOQUE IZQUIERDO Y CENTRAL
Zona asignada: bloque izquierdo, filas 1–4 y bloque central, filas 1-3.
Salida principal: Puerta 2.
Responsabilidades:
Dirigir el bloque derecho hacia P2.
Controlar la circulación en las proximidades de la salida.
Evitar aglomeraciones.
Mantener libre la zona de la puerta.
Realizar una revisión visual del sector cuando sea seguro.
Coordinar el flujo con el Líder 3.` },
  { title: "6. DISTRIBUCIÓN DE LAS RUTAS DE EVACUACIÓN", content: `PUERTA 1 — SALIDA POSTERIOR
Será utilizada principalmente por:
Bloque izquierdo y sala auxiliar: 43 personas.
Bloque central y derecho: aproximadamente 60 personas.
Carga aproximada: 103 personas.

PUERTA 2 — SALIDA FRONTAL
Será utilizada principalmente por:
Bloque derecho: 25 personas.
Bloque central: 27 personas.
Bloque izquierdo: 20 personas.
Carga aproximada: 72 personas.

La distribución no pretende que ambas puertas reciban exactamente el mismo número de personas. El criterio principal es utilizar la salida más conveniente para cada zona y evitar cruces innecesarios dentro del auditorio.` },
  { title: "8. PROCEDIMIENTO DEL SIMULACRO", content: `Fase 1 — Preparación
Antes de iniciar:
Informar a los responsables que se realizará el simulacro.
Confirmar la presencia de los cuatro líderes.
Confirmar que ambas puertas puedan abrirse y utilizarse.
Verificar que los dos pasillos estén completamente despejados.
Identificar cualquier obstáculo que pueda dificultar la evacuación.
Confirmar el punto de encuentro.
Explicar a los líderes sus zonas y rutas.
Establecer el sistema de comunicación entre el coordinador y los líderes.
Designar a la persona encargada de medir el tiempo.
Preparar la lista o mecanismo para realizar el conteo.` },
  { title: "9. INICIO DEL SIMULACRO", content: `El coordinador general dará la orden de inicio.
Mensaje recomendado:
“Atención. Este es un simulacro de evacuación. Mantengan la calma y sigan las instrucciones de los líderes de evacuación. Evacúen de manera ordenada por las rutas indicadas. No corran, no empujen y no regresen por objetos personales. Diríjanse directamente al punto de encuentro.”
En ese momento comienza el registro del tiempo.` },
  { title: "10. EVACUACIÓN", content: `Puerta 1
El Líder 1 inicia la evacuación del bloque izquierdo.
El Líder 2 dirige las filas 4–8 del bloque central hacia P1.
Ambos líderes deben coordinarse para evitar que los dos grupos bloqueen simultáneamente el acceso a la puerta.

Puerta 2
El Líder 3 dirige las filas 1–5 del bloque derecho hacia P2.
El Líder 4 dirige el bloque izquierdo hacia P2.
Los líderes deben mantener un flujo continuo y evitar detener innecesariamente a las personas frente a la salida.` },
  { title: "11. REGLAS PARA LOS ASISTENTES", content: `Durante el simulacro todos los asistentes deberán:
Mantener la calma.
Seguir las instrucciones de los líderes.
Caminar, sin correr.
No empujar.
No gritar innecesariamente.
No regresar por objetos personales.
No bloquear los pasillos.
No detenerse en las puertas.
No cambiar de ruta sin indicación.
Dirigirse directamente al punto de encuentro.
Permanecer en el punto de encuentro hasta recibir instrucciones.` },
  { title: "12. PUNTO DE ENCUENTRO", content: `Una vez fuera del recinto, las personas deberán desplazarse hasta:
Punto de encuentro: ______________________________________
Ninguna persona deberá permanecer inmediatamente frente a las puertas de evacuación, ya que podría obstaculizar la salida de otras personas.` },
  { title: "13. CONTROL Y CONTEO", content: `Una vez que los asistentes lleguen al punto de encuentro:
Los líderes se reúnen con el coordinador.
Cada líder informa que su sector ha sido evacuado.
Se realiza el conteo de las personas.
Se compara el número registrado con las 186 personas previstas.
Cualquier diferencia deberá ser comunicada inmediatamente al coordinador.
No se permitirá el reingreso al recinto hasta que el responsable indique que es seguro.

Registro
Sector                 Personas previstas       Personas contabilizadas       Diferencia

Bloque izquierdo       45

Bloque central         72

Bloque derecho         40

Sala Auxiliar          18

TOTAL                  175` },
  { title: "14. CONTROL DEL TIEMPO", content: `Registrar:
Hora de inicio:
Hora de salida de la primera persona:
Hora de salida de la última persona:
Tiempo total de evacuación:
Tiempo hasta el punto de encuentro:

Nota: Además del tiempo, deberá evaluarse la calidad de la evacuación. Un tiempo menor no debe considerarse automáticamente mejor si se consiguió mediante carreras, empujones, bloqueos o conductas inseguras.` },
  { title: "15. CRITERIOS DE EVALUACIÓN", content: `Criterio                                      Cumplido       Observaciones

Los 4 líderes ocuparon sus posiciones       ☐

Las dos puertas fueron utilizadas             ☐

Los pasillos permanecieron despejados          ☐

No hubo carreras                               ☐

No hubo empujones                              ☐

No hubo retorno al recinto                     ☐

No hubo aglomeración en P1                     ☐

No hubo aglomeración en P2                     ☐

Las personas llegaron al punto de encuentro   ☐

Se realizó el conteo                           ☐

Se contabilizaron las 186 personas             ☐

La comunicación entre líderes fue adecuada     ☐` },
  { title: "16. EVALUACIÓN POSTERIOR", content: `Después del simulacro, el coordinador deberá reunirse con los cuatro líderes para identificar:

Aspectos positivos

Problemas encontrados

Zonas donde se produjo congestión

Problemas con las puertas o pasillos

Tiempo de evacuación

Acciones correctivas` },
  { title: "17. RESPONSABILIDADES DEL COORDINADOR GENERAL", content: `El coordinador será responsable de:
Autorizar el inicio del simulacro.
Confirmar que los líderes estén preparados.
Supervisar el desarrollo general.
Mantener comunicación con los cuatro líderes.
Registrar o recibir el tiempo de evacuación.
Confirmar el conteo final.
Recopilar las observaciones.
Determinar las acciones de mejora.
Autorizar la finalización del ejercicio.` },
  { title: "18. RESPONSABILIDADES DE LOS LÍDERES", content: `Cada líder deberá conocer antes del simulacro:
Su zona de responsabilidad.
Su ruta de evacuación.
La puerta asignada.
La ubicación de los demás líderes.
La ubicación del punto de encuentro.
El procedimiento de conteo.
El procedimiento para informar una incidencia.
Los líderes deberán priorizar siempre la seguridad de las personas sobre la velocidad de evacuación.` },
  { title: "19. FINALIZACIÓN DEL SIMULACRO", content: `El simulacro finalizará cuando:
Las 186 personas hayan llegado al punto de encuentro.
Se haya realizado el conteo.
Los cuatro líderes hayan informado el estado de sus sectores.
El coordinador haya registrado el tiempo.
Se hayan documentado las incidencias.
El coordinador comunicará:
“El simulacro ha finalizado. Permanezcan en el punto de encuentro hasta recibir instrucciones.”
El reingreso al recinto se realizará únicamente cuando el responsable correspondiente lo autorice.` },
  { title: "20. REGISTRO FINAL DEL SIMULACRO", content: `Fecha: __________________________
Hora de inicio: __________________
Hora de finalización: ____________
Tiempo total: ____________________
Personas previstas: 186
Personas evacuadas: ______________
Personas faltantes: _______________
Incidentes registrados: ____________
Acciones correctivas propuestas:
Responsable del simulacro: _______________________________

Firma: ___________________________
Fecha: ___________________________` },
];

export default function DiscourseEvacuationDrill() {
  const [isDark, setIsDark] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isViewerOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsViewerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isViewerOpen]);

  const openViewer = () => { setZoom(1); setIsViewerOpen(true); };
  const closeViewer = () => { setIsViewerOpen(false); setZoom(1); };

  return (
    <main className={`evacuation-page ${isDark ? "evacuation-night" : ""}`}>
      <div className="evacuation-theme-toggle" role="group" aria-label="Modo de color">
        <button type="button" className={!isDark ? "active" : ""} aria-pressed={!isDark} onClick={() => setIsDark(false)}>Día</button>
        <button type="button" className={isDark ? "active" : ""} aria-pressed={isDark} onClick={() => setIsDark(true)}>Noche</button>
      </div>
      <article className="evacuation-content">
        <header className="evacuation-hero">
          <p className="evacuation-kicker">PLAN FORMAL</p>
          <h1>Simulacro de evacuación en el Salón Del Reino</h1>
          <div className="evacuation-meta">
            <span>Recinto: Salón del Reino “Torices”</span>
            <span>Fecha del simulacro: Sábado 19 de septiembre de 2026.</span>
            <span>Hora: 8:30 p.m.</span>
            <span>Responsables generales: Cuerpo de ancianos de la congregación Torices.</span>
            <span>Número de personas previstas: 186</span>
            <span>Número de líderes de evacuación: 4</span>
            <span>Puertas de evacuación: 2</span>
          </div>
        </header>
        {sections.slice(0, 6).map((section) => <section className="evacuation-section" key={section.title}><h2>{section.title}</h2><div className="evacuation-copy">{section.content}</div></section>)}
        <section className="evacuation-section evacuation-plan-section">
          <h2>7. ESQUEMA GENERAL</h2>
          <div className="plan-card">
            <div className="plan-card-heading"><div><p className="evacuation-kicker">RUTAS Y PUNTOS DE ENCUENTRO</p><h3>Plano general de evacuación</h3></div><button type="button" className="open-plan-button" onClick={openViewer}>Abrir plano y ampliar</button></div>
            <img className="evacuation-plan-image" src={planImage} alt="Plano del Salón del Reino con rutas de evacuación y lugares de encuentro" onClick={openViewer} />
            <p className="plan-caption">L1 = ********<br />L2 = ********<br />L3 = ********<br />L4 = ********</p>
          </div>
        </section>
        {sections.slice(6).map((section) => <section className="evacuation-section" key={section.title}><h2>{section.title}</h2><div className="evacuation-copy">{section.content}</div></section>)}
        <footer className="evacuation-safety"><h2>NOTA DE SEGURIDAD</h2><p>Este documento es una base organizativa para el simulacro. Antes de ejecutarlo, debe verificarse que las rutas, puertas, capacidades, punto de encuentro y procedimientos sean compatibles con las condiciones físicas reales del recinto y con la normativa local aplicable. El ejercicio debe suspenderse si aparece una condición que pueda poner a las personas en peligro.</p></footer>
      </article>
      {isViewerOpen && <div className="plan-modal" role="dialog" aria-modal="true" aria-label="Visor del plano" onClick={(event) => { if (event.target === event.currentTarget) closeViewer(); }}><button type="button" className="plan-close-button" aria-label="Cerrar visor del plano" onClick={closeViewer}>Cerrar ×</button><div className="plan-toolbar"><button type="button" onClick={() => setZoom((value) => Math.max(0.75, value - 0.25))}>−</button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom((value) => Math.min(4, value + 0.25))}>+</button><button type="button" onClick={() => setZoom(1)}>Restablecer</button></div><div className="plan-viewport"><img src={planImage} alt="Plano ampliado del Salón del Reino" style={{ transform: `scale(${zoom})` }} /></div></div>}
    </main>
  );
}

export { planImage };
