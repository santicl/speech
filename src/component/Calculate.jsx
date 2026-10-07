import { useState, useEffect, useMemo, useRef } from "react";

/* ───────────── Utilidades ───────────── */
const PRESETS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
const COMPARE = [1, 1.25, 1.5, 2, 2.5, 3];
const MIN_SPEED = 0.25;
const MAX_SPEED = 4;

const pad = (n) => String(n).padStart(2, "0");
const parseNum = (v) => parseFloat(String(v).replace(",", "."));

function humanTime(totalSeconds) {
  const abs = Math.abs(Math.round(totalSeconds));
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  if (h > 0) return `${h} h ${pad(m)} min ${pad(s)} s`;
  if (m > 0) return `${m} min ${pad(s)} s`;
  return `${s} s`;
}

function clockTime(totalSeconds) {
  const abs = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

/* Anima un número suavemente hacia su nuevo valor */
function useAnimatedNumber(target, duration = 550) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const next = from + (target - from) * eased;
      fromRef.current = next;
      setValue(next);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}

/* ───────────── Componente ───────────── */
export default function VideoSpeedCalculator() {
  const [minutesText, setMinutesText] = useState("60");
  const [secondsText, setSecondsText] = useState("0");
  const [videosText, setVideosText] = useState("1");
  const [speed, setSpeed] = useState(1.5);
  const [speedText, setSpeedText] = useState("1.5");
  const [copied, setCopied] = useState(false);

  const mins = minutesText === "" ? 0 : parseInt(minutesText, 10);
  const secs = secondsText === "" ? 0 : parseInt(secondsText, 10);
  const baseSec = mins * 60 + secs; // duración exacta de un video, en segundos
  const videos = Math.max(1, Math.floor(parseNum(videosText)) || 1);
  const valid = Number.isFinite(baseSec) && baseSec > 0;

  // Si los segundos superan 59, se pasan a minutos (ej. 90 s → 1 min 30 s)
  const normalizeTime = () => {
    if (!Number.isFinite(baseSec) || baseSec <= 0) return;
    setMinutesText(String(Math.floor(baseSec / 60)));
    setSecondsText(String(baseSec % 60));
  };

  const data = useMemo(() => {
    if (!valid) return null;
    const originalSec = baseSec * videos;
    const finalSec = originalSec / speed;
    const savedSec = originalSec - finalSec;
    const percent = (savedSec / originalSec) * 100;
    return {
      originalSec,
      finalSec,
      savedSec,
      percent,
      perMinute: speed, // minutos de contenido por minuto de reloj
      wasted: 60 / speed, // segundos reales por cada minuto de video
    };
  }, [valid, baseSec, videos, speed]);

  const aFinal = useAnimatedNumber(data ? data.finalSec : 0);
  const aSaved = useAnimatedNumber(data ? data.savedSec : 0);
  const aPercent = useAnimatedNumber(data ? data.percent : 0);

  const setSpeedSafe = (value) => {
    const v = Math.min(MAX_SPEED, Math.max(MIN_SPEED, value));
    setSpeed(v);
    setSpeedText(String(Number(v.toFixed(2))));
  };

  const onSpeedText = (e) => {
    const raw = e.target.value;
    setSpeedText(raw);
    const n = parseNum(raw);
    if (Number.isFinite(n) && n >= MIN_SPEED && n <= MAX_SPEED) setSpeed(n);
  };

  const finishAt = data
    ? new Date(Date.now() + data.finalSec * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const isFaster = speed > 1;
  const isSlower = speed < 1;
  const maxSec = data ? Math.max(data.originalSec, data.finalSec) : 1;
  const origW = data ? (data.originalSec / maxSec) * 100 : 0;
  const finalW = data ? (data.finalSec / maxSec) * 100 : 0;
  const fill = ((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100;

  const copySummary = async () => {
    if (!data) return;
    const text = [
      `Video: ${humanTime(data.originalSec)}${videos > 1 ? ` (${videos} videos)` : ""}`,
      `Velocidad: ${Number(speed.toFixed(2))}x`,
      `Duración final: ${humanTime(data.finalSec)} (${data.finalSec.toFixed(2)} s exactos)`,
      `${data.savedSec >= 0 ? "Tiempo ahorrado" : "Tiempo extra"}: ${humanTime(data.savedSec)} (${Math.abs(data.percent).toFixed(1)}%)`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setMinutesText("60");
    setSecondsText("0");
    setVideosText("1");
    setSpeedSafe(1.5);
  };

  return (
    <div className="vt-root">
      <style>{css}</style>
      <div className="vt-aurora" aria-hidden="true">
        <span className="vt-blob vt-b1" />
        <span className="vt-blob vt-b2" />
        <span className="vt-blob vt-b3" />
      </div>

      <main className="vt-shell">
        <header className="vt-head">
          <h1>Cuánto tiempo te ahorra la velocidad</h1>
          <p>Ingresa los minutos del video y elige a qué velocidad lo verás.</p>
        </header>

        <div className="vt-grid">
          {/* ── Controles ── */}
          <section className="vt-card vt-controls" aria-label="Controles">
            <div className="vt-row3">
              <label className="vt-field">
                <span>Minutos</span>
                <div className={`vt-input ${!valid ? "is-error" : ""}`}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={minutesText}
                    onChange={(e) => setMinutesText(e.target.value.replace(/[^\d]/g, ""))}
                    onBlur={normalizeTime}
                    placeholder="0"
                    aria-invalid={!valid}
                  />
                  <em>min</em>
                </div>
              </label>

              <label className="vt-field">
                <span>Segundos</span>
                <div className={`vt-input ${!valid ? "is-error" : ""}`}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={secondsText}
                    onChange={(e) => setSecondsText(e.target.value.replace(/[^\d]/g, ""))}
                    onBlur={normalizeTime}
                    placeholder="0"
                    aria-invalid={!valid}
                  />
                  <em>s</em>
                </div>
              </label>

              <label className="vt-field vt-videos">
                <span>Videos</span>
                <div className="vt-input">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={videosText}
                    onChange={(e) => setVideosText(e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="1"
                  />
                  <em>uds</em>
                </div>
              </label>
            </div>
            {!valid && <small className="vt-err">Ingresa al menos 1 segundo de duración.</small>}

            <div className="vt-field">
              <div className="vt-speedhead">
                <span>Velocidad de reproducción</span>
                <div className="vt-input vt-mini">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={speedText}
                    onChange={onSpeedText}
                    onBlur={() => setSpeedText(String(Number(speed.toFixed(2))))}
                    aria-label="Velocidad personalizada"
                  />
                  <em>x</em>
                </div>
              </div>

              <input
                className="vt-range"
                type="range"
                min={MIN_SPEED}
                max={MAX_SPEED}
                step="0.05"
                value={speed}
                style={{ "--fill": `${fill}%` }}
                onChange={(e) => setSpeedSafe(parseFloat(e.target.value))}
                aria-label="Velocidad"
              />
              <div className="vt-scale" aria-hidden="true">
                <span>0.25x</span>
                <span>1x</span>
                <span>2x</span>
                <span>4x</span>
              </div>

              <div className="vt-chips" role="group" aria-label="Velocidades rápidas">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`vt-chip ${Math.abs(p - speed) < 0.001 ? "on" : ""}`}
                    onClick={() => setSpeedSafe(p)}
                  >
                    {p}x
                  </button>
                ))}
              </div>
            </div>

            <div className="vt-actions">
              <button type="button" className="vt-btn ghost" onClick={reset}>
                Restablecer
              </button>
              <button type="button" className="vt-btn" onClick={copySummary} disabled={!data}>
                {copied ? "Copiado" : "Copiar resumen"}
              </button>
            </div>
          </section>

          {/* ── Resultados ── */}
          <section className="vt-card vt-results" aria-live="polite" aria-label="Resultados">
            <div className="vt-hero">
              <span className="vt-label">Duración final</span>
              <div className="vt-big">{data ? humanTime(aFinal) : "—"}</div>
              <span className="vt-sub">
                {data ? `Terminarías a las ${finishAt} si empiezas ahora` : "Completa los datos"}
              </span>
              {data && (
                <span className="vt-exact">
                  Exacto: {data.finalSec.toFixed(2)} s · {isSlower ? "extra" : "ahorro"}{" "}
                  {Math.abs(data.savedSec).toFixed(2)} s
                </span>
              )}
            </div>

            {/* Línea de tiempo comparativa: el elemento protagonista */}
            <div className="vt-timeline">
              <div className="vt-track-row">
                <span>Original</span>
                <div className="vt-track">
                  <i className="vt-bar orig" style={{ width: `${origW}%` }} />
                </div>
                <b>{data ? clockTime(data.originalSec) : "—"}</b>
              </div>
              <div className="vt-track-row">
                <span>Final</span>
                <div className="vt-track">
                  <i
                    className={`vt-bar fin ${isSlower ? "slow" : ""}`}
                    style={{ width: `${finalW}%` }}
                  />
                  {isFaster && data && (
                    <i
                      className="vt-bar saved"
                      style={{ left: `${finalW}%`, width: `${origW - finalW}%` }}
                    />
                  )}
                </div>
                <b>{data ? clockTime(data.finalSec) : "—"}</b>
              </div>
            </div>

            <div className="vt-stats">
              <article className="vt-stat">
                <span className="vt-label">{isSlower ? "Tiempo extra" : "Tiempo ahorrado"}</span>
                <strong className={isSlower ? "warn" : "good"}>
                  {data ? humanTime(aSaved) : "—"}
                </strong>
              </article>
              <article className="vt-stat">
                <span className="vt-label">{isSlower ? "Porcentaje adicional" : "Porcentaje ahorrado"}</span>
                <strong className={isSlower ? "warn" : "good"}>
                  {data ? `${Math.abs(aPercent).toFixed(1)}%` : "—"}
                </strong>
              </article>
              <article className="vt-stat">
                <span className="vt-label">Contenido por minuto</span>
                <strong>{data ? `${Number(data.perMinute.toFixed(2))} min` : "—"}</strong>
              </article>
              <article className="vt-stat">
                <span className="vt-label">Segundos por minuto de video</span>
                <strong>{data ? `${data.wasted.toFixed(1)} s` : "—"}</strong>
              </article>
            </div>

            {data && (
              <div className="vt-compare">
                <h2>Comparación de velocidades</h2>
                <ul>
                  {COMPARE.map((c) => {
                    const sec = data.originalSec / c;
                    const w = (sec / data.originalSec) * 100;
                    const active = Math.abs(c - speed) < 0.001;
                    return (
                      <li key={c} className={active ? "on" : ""}>
                        <button type="button" onClick={() => setSpeedSafe(c)}>
                          <span className="x">{c}x</span>
                          <span className="meter">
                            <i style={{ width: `${w}%` }} />
                          </span>
                          <span className="t">{humanTime(sec)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

/* ───────────── Estilos (CSS puro) ───────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Figtree:wght@400;500;600&display=swap');

.vt-root{
  --ink:#0d1024; --ink-2:#151a38; --text:#eef0ff; --muted:#9aa1c9;
  --violet:#7b6cff; --aqua:#3fe3c4; --peach:#ffb48a; --rose:#ff7aa8;
  --glass:rgba(255,255,255,.055); --line:rgba(255,255,255,.1);
  --ease:cubic-bezier(.22,1,.36,1);
  position:relative; min-height:100vh; box-sizing:border-box; overflow:hidden;
  padding:clamp(20px,4vw,56px) clamp(14px,3vw,40px);
  background:radial-gradient(120% 90% at 20% 0%,#1b1f4a 0%,var(--ink) 55%);
  color:var(--text); font-family:'Figtree',system-ui,-apple-system,'Segoe UI',sans-serif;
  -webkit-font-smoothing:antialiased;
}
.vt-root *,.vt-root *::before,.vt-root *::after{box-sizing:border-box}

.vt-aurora{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.vt-blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.38;animation:vt-drift 26s ease-in-out infinite alternate}
.vt-b1{width:420px;height:420px;background:var(--violet);top:-120px;left:-80px}
.vt-b2{width:360px;height:360px;background:var(--aqua);bottom:-140px;right:-60px;animation-delay:-9s;opacity:.26}
.vt-b3{width:300px;height:300px;background:var(--rose);top:38%;left:52%;animation-delay:-16s;opacity:.16}
@keyframes vt-drift{to{transform:translate3d(60px,40px,0) scale(1.15)}}

.vt-shell{position:relative;max-width:1080px;margin:0 auto}
.vt-head{margin-bottom:clamp(20px,3vw,36px)}
.vt-head h1{
  margin:0 0 8px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;
  font-size:clamp(28px,5vw,48px);line-height:1.05;letter-spacing:-.025em;
  background:linear-gradient(95deg,#fff 20%,#c9c3ff 60%,var(--aqua));
  -webkit-background-clip:text;background-clip:text;color:transparent;
}
.vt-head p{margin:0;color:var(--muted);font-size:clamp(14px,1.6vw,17px);max-width:56ch}

.vt-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(14px,2vw,24px);align-items:start}
@media (max-width:860px){.vt-grid{grid-template-columns:1fr}}

.vt-card{
  background:linear-gradient(160deg,rgba(255,255,255,.085),rgba(255,255,255,.03));
  border:1px solid var(--line);border-radius:28px;padding:clamp(18px,2.4vw,30px);
  backdrop-filter:blur(22px) saturate(140%);-webkit-backdrop-filter:blur(22px) saturate(140%);
  box-shadow:0 30px 60px -30px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.08);
}

/* Campos */
.vt-controls{display:flex;flex-direction:column;gap:26px}
.vt-row3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.vt-row3 .vt-input{padding:0 12px}
@media (max-width:460px){
  .vt-row3{grid-template-columns:repeat(2,minmax(0,1fr))}
  .vt-videos{grid-column:1/-1}
}
.vt-field{display:flex;flex-direction:column;gap:10px;min-width:0}
.vt-field>span,.vt-speedhead>span{font-size:14px;font-weight:500;color:var(--muted)}
.vt-input{
  display:flex;align-items:center;gap:8px;padding:0 16px;height:58px;border-radius:18px;
  background:rgba(8,10,28,.55);border:1px solid var(--line);
  transition:border-color .35s var(--ease),box-shadow .35s var(--ease),background .35s var(--ease);
}
.vt-input:focus-within{border-color:var(--violet);box-shadow:0 0 0 4px rgba(123,108,255,.22);background:rgba(8,10,28,.75)}
.vt-input.is-error{border-color:var(--rose);box-shadow:0 0 0 4px rgba(255,122,168,.15)}
.vt-input input{
  flex:1;min-width:0;width:100%;background:none;border:0;outline:0;color:var(--text);
  font:600 24px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em;
}
.vt-input input::placeholder{color:rgba(255,255,255,.25)}
.vt-input em{font-style:normal;color:var(--muted);font-size:14px}
.vt-err{color:var(--rose);font-size:13px}
.vt-mini{height:44px;padding:0 12px;width:100px;border-radius:14px}
.vt-mini input{font-size:18px}

/* Slider */
.vt-speedhead{display:flex;align-items:center;justify-content:space-between;gap:12px}
.vt-range{
  -webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:99px;margin:10px 0 0;cursor:pointer;
  background:linear-gradient(90deg,var(--violet),var(--aqua)) 0/var(--fill) 100% no-repeat,rgba(255,255,255,.1);
  transition:background-size .2s linear;outline:0;
}
.vt-range::-webkit-slider-thumb{
  -webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:#fff;border:0;
  box-shadow:0 0 0 6px rgba(123,108,255,.35),0 6px 16px rgba(0,0,0,.4);
  transition:transform .3s var(--ease),box-shadow .3s var(--ease);
}
.vt-range::-moz-range-thumb{
  width:28px;height:28px;border-radius:50%;background:#fff;border:0;
  box-shadow:0 0 0 6px rgba(123,108,255,.35),0 6px 16px rgba(0,0,0,.4);
}
.vt-range:hover::-webkit-slider-thumb{transform:scale(1.08)}
.vt-range:active::-webkit-slider-thumb{transform:scale(.94);box-shadow:0 0 0 10px rgba(123,108,255,.3),0 6px 16px rgba(0,0,0,.4)}
.vt-range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px #0d1024,0 0 0 7px var(--aqua)}
.vt-scale{display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.35);padding:0 2px}

.vt-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.vt-chip{
  font:500 14px 'Figtree',sans-serif;color:var(--text);cursor:pointer;
  padding:9px 14px;border-radius:99px;border:1px solid var(--line);background:var(--glass);
  transition:transform .3s var(--ease),background .3s var(--ease),border-color .3s var(--ease),color .3s var(--ease);
}
.vt-chip:hover{background:rgba(255,255,255,.12);transform:translateY(-2px)}
.vt-chip.on{background:linear-gradient(135deg,var(--violet),#5b8cff);border-color:transparent;color:#fff;box-shadow:0 10px 24px -8px rgba(123,108,255,.7)}
.vt-chip:focus-visible,.vt-btn:focus-visible,.vt-compare button:focus-visible{outline:2px solid var(--aqua);outline-offset:3px}

.vt-actions{display:flex;gap:10px;flex-wrap:wrap}
.vt-btn{
  flex:1;min-width:130px;height:50px;border-radius:16px;border:0;cursor:pointer;
  font:600 15px 'Figtree',sans-serif;color:#0d1024;
  background:linear-gradient(135deg,var(--aqua),#8ff0dc);
  transition:transform .3s var(--ease),box-shadow .3s var(--ease),opacity .3s;
  box-shadow:0 14px 28px -12px rgba(63,227,196,.6);
}
.vt-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 18px 32px -12px rgba(63,227,196,.75)}
.vt-btn:active:not(:disabled){transform:scale(.98)}
.vt-btn:disabled{opacity:.4;cursor:not-allowed}
.vt-btn.ghost{background:var(--glass);color:var(--text);border:1px solid var(--line);box-shadow:none}
.vt-btn.ghost:hover:not(:disabled){background:rgba(255,255,255,.11);box-shadow:none}

/* Resultados */
.vt-results{display:flex;flex-direction:column;gap:28px}
.vt-label{font-size:13px;color:var(--muted);font-weight:500}
.vt-hero{display:flex;flex-direction:column;gap:6px}
.vt-big{
  font-family:'Bricolage Grotesque',sans-serif;font-weight:800;letter-spacing:-.035em;line-height:1;
  font-size:clamp(38px,7.2vw,76px);font-variant-numeric:tabular-nums;
  background:linear-gradient(100deg,#fff 10%,var(--peach) 55%,var(--rose));
  -webkit-background-clip:text;background-clip:text;color:transparent;
  padding-bottom:4px;
}
.vt-sub{color:var(--muted);font-size:14px}
.vt-exact{
  align-self:flex-start;margin-top:6px;padding:6px 12px;border-radius:99px;
  font-size:13px;color:var(--aqua);font-variant-numeric:tabular-nums;
  background:rgba(63,227,196,.1);border:1px solid rgba(63,227,196,.25);
}

/* Línea de tiempo */
.vt-timeline{display:flex;flex-direction:column;gap:14px;padding:20px;border-radius:20px;background:rgba(8,10,28,.45);border:1px solid var(--line)}
.vt-track-row{display:grid;grid-template-columns:62px 1fr auto;align-items:center;gap:14px;font-size:14px}
.vt-track-row>span{color:var(--muted)}
.vt-track-row>b{font:600 15px 'Bricolage Grotesque',sans-serif;font-variant-numeric:tabular-nums;min-width:62px;text-align:right}
.vt-track{position:relative;height:16px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden}
.vt-bar{position:absolute;top:0;bottom:0;left:0;border-radius:99px;transition:width .7s var(--ease),left .7s var(--ease)}
.vt-bar.orig{background:linear-gradient(90deg,#5b6199,#8b92d6)}
.vt-bar.fin{background:linear-gradient(90deg,var(--violet),var(--aqua));box-shadow:0 0 22px rgba(63,227,196,.45)}
.vt-bar.fin.slow{background:linear-gradient(90deg,var(--peach),var(--rose));box-shadow:0 0 22px rgba(255,122,168,.4)}
.vt-bar.saved{
  border-radius:0 99px 99px 0;
  background:repeating-linear-gradient(135deg,rgba(63,227,196,.28) 0 6px,rgba(63,227,196,.06) 6px 12px);
  border:1px dashed rgba(63,227,196,.5);
}

/* Estadísticas */
.vt-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media (max-width:420px){.vt-stats{grid-template-columns:1fr}}
.vt-stat{
  display:flex;flex-direction:column;gap:8px;padding:18px;border-radius:20px;
  background:var(--glass);border:1px solid var(--line);
  transition:transform .4s var(--ease),background .4s var(--ease);
}
.vt-stat:hover{transform:translateY(-3px);background:rgba(255,255,255,.085)}
.vt-stat strong{font:700 clamp(20px,2.6vw,28px) 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.vt-stat strong.good{color:var(--aqua)}
.vt-stat strong.warn{color:var(--peach)}

/* Comparación */
.vt-compare h2{margin:0 0 12px;font:600 15px 'Figtree',sans-serif;color:var(--muted)}
.vt-compare ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.vt-compare button{
  all:unset;box-sizing:border-box;cursor:pointer;width:100%;
  display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:14px;
  padding:10px 14px;border-radius:14px;border:1px solid transparent;
  transition:background .3s var(--ease),border-color .3s var(--ease);
}
.vt-compare button:hover{background:rgba(255,255,255,.06)}
.vt-compare li.on button{background:rgba(123,108,255,.14);border-color:rgba(123,108,255,.45)}
.vt-compare .x{font:600 15px 'Bricolage Grotesque',sans-serif}
.vt-compare .t{font-size:14px;color:var(--muted);font-variant-numeric:tabular-nums;text-align:right}
.vt-compare li.on .t{color:var(--text)}
.vt-compare .meter{height:6px;border-radius:99px;background:rgba(255,255,255,.07);overflow:hidden}
.vt-compare .meter i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--violet),var(--aqua));transition:width .7s var(--ease)}

@media (prefers-reduced-motion:reduce){
  .vt-root *,.vt-root *::before,.vt-root *::after{animation:none!important;transition:none!important}
}
`;