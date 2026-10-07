import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './AstroFisic.css';

/* =====================================================================
   CONSTANTES Y UTILIDADES
   ===================================================================== */
const G = 6.6743e-11;
const C = 299792458;
const MSUN = 1.989e30;
const RSUN = 6.957e8;
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = (x, d = 3) => {
  if (x === Infinity || x === -Infinity) return '∞';
  if (!isFinite(x)) return '—';
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 1e6 || a < 1e-3) return x.toExponential(d - 1).replace('e+', 'e');
  return x.toLocaleString('es-ES', { maximumFractionDigits: a >= 100 ? 1 : d });
};

const NAV = [
  { id: 1, title: 'Evolución Estelar', sub: 'Constructor de estrellas' },
  { id: 2, title: 'Lab de Gravedad', sub: 'F = G·m₁·m₂ / r²' },
  { id: 3, title: 'Simulador de Nave', sub: 'Órbitas y telemetría' },
  { id: 4, title: 'Objetos Compactos', sub: 'Mareas y espaguetización' },
  { id: 5, title: 'Relatividad General', sub: 'Tiempo propio y redshift' },
  { id: 6, title: 'Desafíos', sub: '7 misiones' },
  { id: 7, title: 'Comparador Cósmico', sub: 'De la Tierra al agujero negro' },
  { id: 8, title: 'Centro de Fórmulas', sub: 'Ecuaciones interactivas' },
];

const OBJECTS = {
  wd: { id: 'wd', type: 'wd', name: 'Enana Blanca', M: 0.6, R: 8.7e6, k: 4, desc: 'Remanente de una estrella tipo Sol. Del tamaño de la Tierra, sostenida por presión de degeneración electrónica.' },
  ns: { id: 'ns', type: 'ns', name: 'Estrella de Neutrones', M: 1.4, R: 1.2e4, k: 5, desc: 'Púlsar: gira rápido con un campo magnético de ~10⁸ T que emite haces de radiación.' },
  bh: { id: 'bh', type: 'bh', name: 'Agujero Negro Estelar', M: 10, R: 0, k: 8, desc: 'Colapso de una estrella masiva. Horizonte de sucesos de ~30 km con disco de acreción.' },
  smbh: { id: 'smbh', type: 'bh', name: 'Agujero Negro Supermasivo', M: 4.3e6, R: 0, k: 8, desc: 'Como Sagitario A* en el centro de la Vía Láctea. Mareas suaves en el horizonte.' },
};

/* =====================================================================
   DATOS ALEATORIOS PARA FONDOS Y EFECTOS (generados una sola vez)
   ===================================================================== */
const rnd = (n, f) => Array.from({ length: n }, (_, i) => f(i));
const STARS = rnd(280, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * 1.6 + 0.4, a: Math.random() * 0.7 + 0.2, tw: Math.random() * 2 + 0.5, p: Math.random() * 6 }));
const DISC = rnd(700, () => {
  const u = Math.random();
  return { r: 2.6 + Math.pow(u, 1.6) * 5.2, phi: Math.random() * TAU, s: Math.random() * 1.4 + 0.6, a: Math.random() * 0.5 + 0.25 };
});
const CLOUD = rnd(520, () => ({ a: Math.random() * TAU, r: Math.pow(Math.random(), 0.7), s: Math.random() * 2.2 + 0.6, al: Math.random() * 0.5 + 0.15, h: Math.random() }));
const EJECTA = rnd(320, () => ({ a: Math.random() * TAU, s: Math.random() * 0.9 + 0.1, z: Math.random() }));

/* =====================================================================
   HOOK DE CANVAS (HiDPI + ResizeObserver + rAF)
   ===================================================================== */
function useCanvas(draw) {
  const cvRef = useRef(null);
  const wrapRef = useRef(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const cv = cvRef.current;
    const wrap = wrapRef.current;
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, raf = 0, last = performance.now();
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      cv.style.width = w + 'px';
      cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      drawRef.current(ctx, w, h, now / 1000, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return [cvRef, wrapRef];
}

/* =====================================================================
   PRIMITIVAS DE DIBUJO
   ===================================================================== */
function glow(ctx, x, y, r, c, a = 1) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`);
  g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
}

function drawStars(ctx, w, h, time, lens) {
  for (const s of STARS) {
    let x = s.x * w, y = s.y * h;
    if (lens) {
      const dx = x - lens.cx, dy = y - lens.cy;
      const d = Math.hypot(dx, dy) || 1;
      const nd = (d + Math.sqrt(d * d + 4 * lens.rE * lens.rE)) / 2;
      if (lens.rE > 1.5 && nd < lens.rE * 0.55) continue;
      x = lens.cx + (dx / d) * nd;
      y = lens.cy + (dy / d) * nd;
    }
    const tw = 0.6 + 0.4 * Math.sin(time * s.tw + s.p);
    ctx.fillStyle = `rgba(255,255,255,${s.a * tw})`;
    ctx.fillRect(x, y, s.s, s.s);
  }
}

function arrow(ctx, x, y, dx, dy, color, lw = 2) {
  const L = Math.hypot(dx, dy);
  if (L < 1) return;
  const ux = dx / L, uy = dy / L;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx - ux * 6, y + dy - uy * 6); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + dx, y + dy);
  ctx.lineTo(x + dx - ux * 9 - uy * 5, y + dy - uy * 9 + ux * 5);
  ctx.lineTo(x + dx - ux * 9 + uy * 5, y + dy - uy * 9 - ux * 5);
  ctx.closePath(); ctx.fill();
}

/* Agujero negro: disco de acreción con beaming Doppler, anillo de fotones y lente */
function drawBlackHole(ctx, cx, cy, rs, time) {
  glow(ctx, cx, cy, rs * 7, [255, 120, 30], 0.2);
  const sz = Math.max(1, rs * 0.045);
  ctx.globalCompositeOperation = 'lighter';
  const plot = (x, y, p, lum, k) => {
    const t = (p.r - 2.6) / 5.2;
    ctx.fillStyle = `rgba(255,${Math.round(lerp(235, 105, t))},${Math.round(lerp(190, 35, t))},${clamp(lum * p.a * k, 0, 1)})`;
    ctx.fillRect(x, y, p.s * sz, p.s * sz);
  };
  const state = (p) => {
    const om = 14 / Math.pow(p.r, 1.5);
    const phi = p.phi + time * om;
    const beta = Math.sqrt(1 / (2 * p.r));
    const cs = Math.cos(phi), sn = Math.sin(phi);
    const lum = Math.pow((1 - beta * cs) / (1 + beta), 3) * 1.4 + 0.05;
    return [cs, sn, lum];
  };
  for (const p of DISC) {
    const [cs, sn, lum] = state(p);
    if (sn >= 0) continue;
    const rr = p.r * rs;
    plot(cx + rr * cs, cy + rr * sn * 0.3, p, lum, 0.8);
    plot(cx + rr * cs * 0.75, cy - rs * 1.35 + sn * rr * 0.35, p, lum, 0.9);
    plot(cx + rr * cs * 0.75, cy + rs * 1.35 - sn * rr * 0.28, p, lum, 0.35);
  }
  ctx.globalCompositeOperation = 'source-over';
  const g = ctx.createRadialGradient(cx, cy, rs, cx, cy, rs * 1.9);
  g.addColorStop(0, 'rgba(0,0,0,0.95)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rs * 1.9, 0, TAU); ctx.fill();
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, rs, 0, TAU); ctx.fill();
  ctx.save();
  ctx.shadowColor = '#ff9100'; ctx.shadowBlur = 14;
  ctx.strokeStyle = 'rgba(255,190,110,0.85)'; ctx.lineWidth = Math.max(1, rs * 0.06);
  ctx.beginPath(); ctx.arc(cx, cy, rs * 1.5, 0, TAU); ctx.stroke();
  ctx.restore();
  ctx.globalCompositeOperation = 'lighter';
  for (const p of DISC) {
    const [cs, sn, lum] = state(p);
    if (sn < 0) continue;
    const rr = p.r * rs;
    plot(cx + rr * cs, cy + rr * sn * 0.3, p, lum, 1);
  }
  ctx.globalCompositeOperation = 'source-over';
}

function drawPulsar(ctx, cx, cy, rad, time) {
  const ang = time * 6;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(0.5);
  ctx.strokeStyle = 'rgba(213,0,249,0.35)'; ctx.lineWidth = 1;
  for (const k of [2.2, 3.6, 5]) {
    ctx.beginPath(); ctx.ellipse(0, 0, rad * k * 0.55, rad * k, 0, 0, TAU); ctx.stroke();
  }
  ctx.restore();
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(ang);
  const len = Math.max(rad * 14, 110);
  for (let k = 0; k < 2; k++) {
    ctx.save(); ctx.rotate(k * Math.PI);
    const g = ctx.createLinearGradient(0, 0, len, 0);
    g.addColorStop(0, 'rgba(213,0,249,0.65)'); g.addColorStop(1, 'rgba(0,229,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(0, -rad * 0.5); ctx.lineTo(len, -len * 0.09); ctx.lineTo(len, len * 0.09); ctx.lineTo(0, rad * 0.5); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  ctx.restore();
  glow(ctx, cx, cy, rad * 6, [150, 190, 255], 0.6);
  ctx.fillStyle = '#eaf4ff'; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, TAU); ctx.fill();
}

function tempColor(T) {
  if (T < 3500) return [255, 110, 55];
  if (T < 5000) return [255, 165, 85];
  if (T < 6000) return [255, 225, 150];
  if (T < 7500) return [255, 248, 232];
  if (T < 10000) return [205, 226, 255];
  return [150, 190, 255];
}

/* =====================================================================
   FÍSICA: MOTOR DUAL (NEWTON / EINSTEIN-SCHWARZSCHILD) + RK4
   ===================================================================== */
function makeBody(key) {
  const o = OBJECTS[key];
  const M = o.M * MSUN;
  const rs = (2 * G * M) / (C * C);
  const bh = o.type === 'bh';
  const R = bh ? rs : o.R;
  const Rref = Math.max(R, rs);
  return { key, o, M, mu: G * M, rs, R, Rref, r0: o.k * Rref, bh };
}

function vcirc(b, r, rel) {
  let v2 = b.mu / r;
  if (rel) { const d = 1 - (1.5 * b.rs) / r; v2 = d > 0.02 ? v2 / d : v2 * 50; }
  return Math.sqrt(v2);
}

function launch(e, preset, rel) {
  const b = e.body;
  let x = b.r0, vy;
  const vc = vcirc(b, b.r0, rel);
  if (preset === 'elliptic') vy = vc * 0.85;
  else if (preset === 'escape') vy = Math.sqrt((2 * b.mu) / b.r0) * (rel ? 1.12 : 1.03);
  else if (preset === 'sling') { x = 1.6 * b.r0; vy = 0.6 * Math.sqrt(b.mu / x); }
  else vy = vc;
  e.s = { x, y: 0, vx: 0, vy };
  e.ang = Math.atan2(vy, 0);
  e.fuel = 100; e.t = 0; e.tau = 0; e.trail = [];
  e.trapped = false; e.collided = false; e.horizon = false; e.thrusting = 0; e.hitAt = 0;
  e.preset = preset;
  e.m = { angle: 0, minR: Infinity, prevTheta: Math.atan2(0, x) };
}

function createEngine(key, rel) {
  const body = makeBody(key);
  const e = {
    body, zoom: 1, speed: 1, paused: false, keys: {}, shipLen: 20,
    Tref: TAU * Math.sqrt(Math.pow(body.r0, 3) / body.mu),
    vc0: Math.sqrt(body.mu / body.r0),
  };
  e.tScale = e.Tref / 12;
  launch(e, 'circular', rel);
  return e;
}

function rk4(e, h, rel) {
  const s = e.s, mu = e.body.mu;
  const f = (x, y, vx, vy) => {
    const r2 = x * x + y * y, r = Math.sqrt(r2);
    let k = mu / (r2 * r);
    if (rel) { const L = x * vy - y * vx; k *= 1 + (3 * L * L) / (C * C * r2); }
    return [vx, vy, -k * x, -k * y];
  };
  const a = f(s.x, s.y, s.vx, s.vy);
  const b = f(s.x + (h / 2) * a[0], s.y + (h / 2) * a[1], s.vx + (h / 2) * a[2], s.vy + (h / 2) * a[3]);
  const c = f(s.x + (h / 2) * b[0], s.y + (h / 2) * b[1], s.vx + (h / 2) * b[2], s.vy + (h / 2) * b[3]);
  const d = f(s.x + h * c[0], s.y + h * c[1], s.vx + h * c[2], s.vy + h * c[3]);
  s.x += (h / 6) * (a[0] + 2 * b[0] + 2 * c[0] + d[0]);
  s.y += (h / 6) * (a[1] + 2 * b[1] + 2 * c[1] + d[1]);
  s.vx += (h / 6) * (a[2] + 2 * b[2] + 2 * c[2] + d[2]);
  s.vy += (h / 6) * (a[3] + 2 * b[3] + 2 * c[3] + d[3]);
}

/* Adición relativista de velocidades: u' = (u + dv) / (1 + u·dv/c²) */
function addVelocity(s, ux, uy, dv, rel) {
  if (!rel) { s.vx += ux * dv; s.vy += uy * dv; return; }
  const par = s.vx * ux + s.vy * uy;
  const px = s.vx - par * ux, py = s.vy - par * uy;
  const den = 1 + (par * dv) / (C * C);
  const g = Math.sqrt(1 - (dv * dv) / (C * C));
  const np = (par + dv) / den;
  s.vx = np * ux + (px * g) / den;
  s.vy = np * uy + (py * g) / den;
}

function stepEngine(e, dt, rel) {
  const b = e.body, k = e.keys;
  if (e.paused) return;
  if (e.trapped) {
    const f = Math.pow(0.35, dt);
    e.s.x *= f; e.s.y *= f;
    return;
  }
  if (e.collided) return;
  const rot = (k.d ? 1 : 0) - (k.a ? 1 : 0);
  e.ang += rot * 2.6 * dt;
  const thrust = (k.w ? 1 : 0) - (k.s ? 1 : 0);
  e.thrusting = e.fuel > 0 ? thrust : 0;
  if (e.thrusting) e.fuel = Math.max(0, e.fuel - 4 * dt * e.speed);
  const aT = (0.35 * b.mu) / (b.r0 * b.r0);
  const ux = Math.cos(e.ang), uy = Math.sin(e.ang);
  let rem = dt * e.tScale * e.speed, n = 0;
  const s = e.s;
  while (rem > 0 && n < 1500) {
    const r = Math.hypot(s.x, s.y), v = Math.hypot(s.vx, s.vy);
    const h = Math.min(rem, (0.02 * r) / (v + 0.05 * e.vc0));
    rk4(e, h, rel);
    if (e.thrusting) addVelocity(s, ux, uy, e.thrusting * aT * h, rel);
    const nr = Math.hypot(s.x, s.y), nv = Math.hypot(s.vx, s.vy);
    if (rel && nv > 0.9999 * C) { const q = (0.9999 * C) / nv; s.vx *= q; s.vy *= q; }
    const fac = rel ? Math.sqrt(Math.max(0, 1 - b.rs / nr - (nv * nv) / (C * C))) : 1;
    e.t += h; e.tau += h * fac;
    if (nr < e.m.minR) e.m.minR = nr;
    const lt = e.trail;
    const lx = lt[lt.length - 2], ly = lt[lt.length - 1];
    if (lt.length < 2 || Math.hypot(s.x - lx, s.y - ly) > 0.004 * b.r0) {
      lt.push(s.x, s.y);
      if (lt.length > 6000) lt.splice(0, 1000);
    }
    if (rel && b.bh && nr <= b.rs) { e.trapped = true; e.horizon = true; break; }
    if (nr <= b.R) { e.collided = true; e.hitAt = performance.now() / 1000; break; }
    rem -= h; n++;
  }
}

function telemetry(e, rel) {
  const b = e.body, s = e.s;
  const r = Math.hypot(s.x, s.y), v = Math.hypot(s.vx, s.vy);
  const L = s.x * s.vy - s.y * s.vx;
  let g = b.mu / (r * r);
  if (rel) g *= 1 + (3 * L * L) / (C * C * r * r);
  const m = 1000;
  const eps = 0.5 * v * v - b.mu / r;
  const ecc = Math.sqrt(Math.max(0, 1 + (2 * eps * L * L) / (b.mu * b.mu)));
  const fac = rel ? Math.sqrt(Math.max(1e-9, 1 - b.rs / r - (v * v) / (C * C))) : 1;
  const gamma = rel ? (e.trapped ? Infinity : 1 / fac) : 1;
  const z = rel ? (r <= b.rs ? Infinity : 1 / Math.sqrt(1 - b.rs / r) - 1) : 0;
  const dg = (2 * b.mu * e.shipLen) / (r * r * r);
  const gs = dg / 9.81;
  const stretch = 1 + Math.min(7, Math.log10(1 + gs) * 0.8);
  let status = 'Órbita Ligada', cls = 'ok';
  if (e.trapped) { status = 'Atrapado en el Horizonte'; cls = 'bad'; }
  else if (e.collided) { status = 'Colisión'; cls = 'bad'; }
  else if (eps >= 0) { status = 'Trayectoria de Escape'; cls = 'warn'; }
  else if (ecc < 0.1) status = 'Órbita Ligada (circular)';
  else status = 'Órbita Ligada (elíptica)';
  return {
    r, v, L, g, K: 0.5 * m * v * v, U: (-b.mu * m) / r, E: 0.5 * m * v * v - (b.mu * m) / r,
    eps, ecc, gamma, z, dg, gs, stretch, status, cls, fuel: e.fuel, t: e.t, tau: e.tau,
    vr: (s.x * s.vx + s.y * s.vy) / r, Tref: e.Tref, rsr: b.rs / r,
  };
}

/* ---------- Misiones ---------- */
const MISSIONS = [
  { id: 1, title: 'Órbita Estacionaria', desc: 'Completa una vuelta entera en órbita casi circular (e < 0,15).', hint: 'Usa el preajuste Órbita Circular y no toques los propulsores.',
    ok: (e, t) => e.m.angle >= TAU && t.ecc < 0.15 && t.eps < 0 },
  { id: 2, title: 'Escape Gravitacional', desc: 'Alcanza energía positiva y aléjate 3 veces la órbita inicial sin agotar el combustible.', hint: 'Acelera en sentido prógrado hasta que E > 0.',
    ok: (e, t) => t.eps >= 0 && t.r > 3 * e.body.r0 && e.fuel > 3 && e.m.fuelUsed > 1 },
  { id: 3, title: 'Sobrevuelo Cercano', desc: 'Pasa por debajo del 60 % de tu órbita inicial y regresa a salvo.', hint: 'Frena un poco en el apoastro o usa la órbita elíptica.',
    ok: (e, t) => e.m.minR <= 0.6 * e.body.r0 && e.m.minR >= 1.15 * e.body.Rref && t.vr > 0 && t.r >= 0.8 * e.body.r0 },
  { id: 4, title: 'Asistencia Gravitacional', desc: 'Pasa cerca del cuerpo y sal con energía positiva gastando ≤ 35 % de combustible.', hint: 'Preajuste Slingshot: acelera justo en el periapsis.',
    ok: (e, t) => t.eps >= 0 && e.m.minR <= 0.5 * e.body.r0 && e.m.minR >= 1.15 * e.body.Rref && t.r > 3 * e.body.r0 && e.m.fuelUsed <= 35 },
  { id: 5, title: 'Al Borde del Horizonte', desc: 'Acércate a menos de 2 r_s de un agujero negro sin cruzarlo.', hint: 'Elige un agujero negro y frena para caer. Corrige antes de r_s.',
    ok: (e, t) => e.body.bh && t.r < 2 * e.body.rs && t.r > e.body.rs && !e.collided },
  { id: 6, title: 'Dilatación Temporal', desc: 'Acumula más de 10 s de diferencia entre t y τ.', hint: 'Necesitas el motor de Einstein y un objeto masivo: prueba el Agujero Negro Supermasivo.',
    ok: (e, t) => t.t - t.tau > 10 },
  { id: 7, title: 'Maestro Relativista', desc: 'Cruza el Horizonte de Sucesos.', hint: 'Motor de Einstein + agujero negro + una caída decidida.',
    ok: (e) => e.horizon },
];

function checkMissions(e, t, onMission) {
  const m = e.m;
  m.fuelUsed = 100 - e.fuel;
  const th = Math.atan2(e.s.y, e.s.x);
  let d = th - m.prevTheta;
  while (d > Math.PI) d -= TAU;
  while (d < -Math.PI) d += TAU;
  m.prevTheta = th;
  if (t.ecc < 0.15 && t.eps < 0 && !e.paused) m.angle += Math.abs(d); else if (t.ecc >= 0.15 || t.eps >= 0) m.angle = 0;
  if (e.paused) return;
  for (const ms of MISSIONS) if (ms.ok(e, t)) onMission(ms.id);
}

/* =====================================================================
   RENDER DE LA ESCENA ORBITAL
   ===================================================================== */
function drawScene(ctx, w, h, time, e, o, t) {
  const b = e.body;
  const cx = w / 2, cy = h * 0.46;
  const scale = (e.zoom * 0.34 * Math.min(w, h)) / b.r0;
  ctx.fillStyle = '#02030a'; ctx.fillRect(0, 0, w, h);
  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
  bg.addColorStop(0, 'rgba(30,20,70,0.45)'); bg.addColorStop(1, 'rgba(2,3,10,0)');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

  const rsPx = b.rs * scale;
  const rE = rsPx * 2.6;
  drawStars(ctx, w, h, time, o.lens ? { cx, cy, rE } : null);
  if (o.lens && b.bh) {
    ctx.strokeStyle = 'rgba(0,229,255,0.12)'; ctx.lineWidth = 1;
    ctx.setLineDash([3, 7]); ctx.beginPath(); ctx.arc(cx, cy, rE * 1.6, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  }

  /* Malla de espacio-tiempo deformada */
  if (o.mesh) {
    const sp = Math.max(26, (b.r0 * scale) / 4);
    const Rpx = Math.max(b.Rref * scale, 7);
    const mf = 1 + 0.25 * Math.log10(1 + b.M / MSUN);
    const dim = new Path2D(), hot = new Path2D();
    const line = (vertical, pos) => {
      let has = false, px0 = 0, py0 = 0;
      const N = vertical ? h : w;
      for (let u = -sp; u <= N + sp; u += 14) {
        const px = vertical ? pos : u, py = vertical ? u : pos;
        const dx = px - cx, dy = py - cy;
        const d = Math.hypot(dx, dy) || 1;
        const wv = Math.min(0.85, 0.5 * (Rpx / d) * mf);
        const X = cx + dx * (1 - wv), Y = cy + dy * (1 - wv);
        if (has) { const P = wv > 0.12 ? hot : dim; P.moveTo(px0, py0); P.lineTo(X, Y); }
        has = true; px0 = X; py0 = Y;
      }
    };
    for (let x = cx % sp; x <= w + sp; x += sp) line(true, x);
    for (let y = cy % sp; y <= h + sp; y += sp) line(false, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,229,255,0.16)'; ctx.stroke(dim);
    ctx.strokeStyle = 'rgba(255,145,0,0.5)'; ctx.stroke(hot);
  }

  /* Cuerpo central */
  const Rpx = Math.max(b.R * scale, 4);
  if (b.o.type === 'bh') {
    drawBlackHole(ctx, cx, cy, Math.max(rsPx, 7), time);
  } else if (b.o.type === 'ns') {
    drawPulsar(ctx, cx, cy, Math.max(Rpx, 5), time);
  } else {
    glow(ctx, cx, cy, Rpx * 4, [150, 220, 255], 0.5);
    const g = ctx.createRadialGradient(cx - Rpx * 0.3, cy - Rpx * 0.3, 1, cx, cy, Rpx);
    g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#8fd8ff');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Rpx, 0, TAU); ctx.fill();
  }

  /* Trayectoria */
  if (o.trail && e.trail.length > 4) {
    const tr = e.trail, n = tr.length / 2;
    ctx.lineWidth = 1.6; ctx.lineJoin = 'round';
    for (let c = 0; c < 3; c++) {
      const i0 = Math.floor((n * c) / 3), i1 = Math.min(n - 1, Math.floor((n * (c + 1)) / 3));
      ctx.strokeStyle = `rgba(0,229,255,${0.12 + 0.3 * c})`;
      ctx.beginPath();
      for (let i = i0; i <= i1; i++) {
        const X = cx + tr[i * 2] * scale, Y = cy + tr[i * 2 + 1] * scale;
        if (i === i0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();
    }
  }

  /* Nave */
  const sx = cx + e.s.x * scale, sy = cy + e.s.y * scale;
  const visible = !e.collided && Math.hypot(e.s.x, e.s.y) * scale > 1.5;
  if (visible) {
    ctx.save();
    ctx.translate(sx, sy);
    const rad = Math.atan2(sy - cy, sx - cx);
    ctx.rotate(rad);
    ctx.scale(t.stretch, 1 / Math.sqrt(t.stretch));
    ctx.rotate(e.ang - rad);
    if (e.thrusting) {
      const f = (6 + Math.random() * 8) * (e.thrusting > 0 ? 1 : 0.6);
      ctx.fillStyle = e.thrusting > 0 ? 'rgba(255,145,0,0.9)' : 'rgba(0,229,255,0.9)';
      ctx.beginPath();
      if (e.thrusting > 0) { ctx.moveTo(-6, -3); ctx.lineTo(-6 - f, 0); ctx.lineTo(-6, 3); }
      else { ctx.moveTo(8, -2.5); ctx.lineTo(8 + f * 0.6, 0); ctx.lineTo(8, 2.5); }
      ctx.closePath(); ctx.fill();
    }
    ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 10;
    ctx.fillStyle = '#e9fbff'; ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-6, -5); ctx.lineTo(-3, 0); ctx.lineTo(-6, 5); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
    if (o.vectors) {
      const v = Math.hypot(e.s.vx, e.s.vy) || 1;
      arrow(ctx, sx, sy, (e.s.vx / v) * 38, (e.s.vy / v) * 38, '#00e676');
      const r = Math.hypot(e.s.x, e.s.y);
      arrow(ctx, sx, sy, (-e.s.x / r) * 30, (-e.s.y / r) * 30, '#ff1744');
    }
  }
  if (e.collided) {
    const dtc = performance.now() / 1000 - e.hitAt;
    for (let k = 0; k < 3; k++) {
      const q = clamp(dtc * 0.9 - k * 0.15, 0, 1);
      ctx.strokeStyle = `rgba(255,${100 + k * 40},40,${1 - q})`;
      ctx.lineWidth = 3 - k;
      ctx.beginPath(); ctx.arc(sx, sy, 6 + q * 70, 0, TAU); ctx.stroke();
    }
  }
}

/* =====================================================================
   COMPONENTES DE UI REUTILIZABLES
   ===================================================================== */
function Slider({ label, value, min, max, step = 1, onChange, fmtv, unit = '', disabled }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className={'slider' + (disabled ? ' disabled' : '')}>
      <span className="slider-head"><span>{label}</span><b>{fmtv ? fmtv(value) : value}{unit}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled}
        style={{ '--pct': pct + '%' }}
        onChange={(ev) => onChange(parseFloat(ev.target.value))}
        onPointerUp={(ev) => ev.currentTarget.blur()} />
    </label>
  );
}

function Toggle({ label, on, onChange }) {
  return (
    <button type="button" className={'toggle' + (on ? ' on' : '')} aria-pressed={on} onClick={() => onChange(!on)}>
      <i /><span>{label}</span>
    </button>
  );
}

function Chip({ active, onClick, children, title }) {
  return <button type="button" title={title} className={'chip' + (active ? ' active' : '')} onClick={onClick}>{children}</button>;
}

function Learn({ f, v, e, r }) {
  const steps = [['Fórmula', f], ['Variable', v], ['Experimento', e], ['Resultado visual', r]];
  return (
    <div className="learn">
      {steps.map(([k, txt], i) => (
        <div key={k} className="learn-step" style={{ '--i': i }}><b>{k}</b><span>{txt}</span></div>
      ))}
    </div>
  );
}

function Metric({ label, value, unit, tone }) {
  return (
    <div className={'metric' + (tone ? ' ' + tone : '')}>
      <span>{label}</span>
      <b>{value}{unit && <small> {unit}</small>}</b>
    </div>
  );
}

/* =====================================================================
   MÓDULO 1 — EVOLUCIÓN ESTELAR
   ===================================================================== */
const STAGE_LABEL = { cloud: 'Nube Molecular', proto: 'Protoestrella', ms: 'Secuencia Principal', rg: 'Gigante Roja', srg: 'Supergigante Roja', sn: 'Supernova', pn: 'Nebulosa Planetaria', wd: 'Enana Blanca', ns: 'Estrella de Neutrones', bh: 'Agujero Negro' };

function stellar(m, age) {
  const a = age / 100;
  const type = m < 8 ? 'wd' : m < 25 ? 'ns' : 'bh';
  const Mrem = type === 'wd' ? Math.min(1.4, 0.109 * m + 0.394) : type === 'ns' ? (m < 18 ? 1.4 : 1.9) : Math.max(3, 0.35 * m);
  const Rms = RSUN * (m < 1 ? Math.pow(m, 0.8) : Math.pow(m, 0.57));
  const Tms = clamp(5772 * Math.pow(m, 0.52), 2600, 45000);
  let stage, R, T, Mc = m, prog;
  if (a < 0.1) { stage = 'cloud'; prog = a / 0.1; R = RSUN * Math.pow(10, lerp(5, 3, prog)); T = 15 + prog * 40; }
  else if (a < 0.2) { stage = 'proto'; prog = (a - 0.1) / 0.1; R = RSUN * Math.pow(10, lerp(3, Math.log10(Rms / RSUN), prog)); T = lerp(3000, Tms * 0.8, prog); }
  else if (a < 0.7) { stage = 'ms'; prog = (a - 0.2) / 0.5; R = Rms * (1 + 0.5 * prog); T = Tms; }
  else if (a < 0.85) { stage = m >= 8 ? 'srg' : 'rg'; prog = (a - 0.7) / 0.15; R = Rms * 1.5 * Math.pow(10, prog * (m >= 8 ? 2.5 : 2)); T = lerp(Tms, 3500, Math.min(1, prog * 2)); }
  else if (a < 0.92) { prog = (a - 0.85) / 0.07; stage = m >= 8 ? 'sn' : 'pn'; R = RSUN * Math.pow(10, lerp(2.5, 4.5, prog)); T = 1e5; }
  else { prog = (a - 0.92) / 0.08; stage = type; Mc = Mrem; T = type === 'wd' ? 25000 : type === 'ns' ? 1e6 : 0;
    R = type === 'wd' ? 0.0126 * RSUN * Math.pow(Mrem / 0.7, -1 / 3) : type === 'ns' ? 1.2e4 : (2 * G * Mrem * MSUN) / (C * C); }
  return { stage, R, T, Mc, prog, type, Mrem, ...bodyProps(Mc, R, stage === 'bh') };
}

function bodyProps(M, R, bh) {
  const Mk = M * MSUN;
  return {
    rho: Mk / ((4 / 3) * Math.PI * Math.pow(R, 3)) / 1000,
    g: (G * Mk) / (R * R),
    vesc: bh ? C / 1000 : Math.sqrt((2 * G * Mk) / R) / 1000,
  };
}

const starPx = (R, m) => 5 + clamp((Math.log10(R) - 3.3) / (13.9 - 3.3), 0, 1) * (0.4 * m - 5);

function drawStellar(ctx, w, h, time, info, exp) {
  ctx.fillStyle = '#02030a'; ctx.fillRect(0, 0, w, h);
  drawStars(ctx, w, h, time);
  const m = Math.min(w, h);
  ctx.font = '12px "Fira Code", monospace'; ctx.textAlign = 'center';

  if (exp) {
    const items = [
      { n: 'Sol', R: RSUN, c: [255, 225, 150] },
      { n: 'Enana Blanca', R: 0.0126 * RSUN * Math.pow(1 / 0.7, -1 / 3), c: [190, 225, 255] },
      { n: 'Est. Neutrones', R: 1.2e4, c: [213, 0, 249] },
      { n: 'Agujero Negro', R: (2 * G * MSUN) / (C * C), c: [255, 145, 0] },
    ];
    const maxR = Math.min(w / 8.5, h * 0.28);
    items.forEach((it, i) => {
      const x = (w * (i + 0.5)) / 4, y = h * 0.46;
      const pr = lerp(4, maxR, (Math.log10(it.R) - 3.3) / (8.9 - 3.3));
      glow(ctx, x, y, pr * 2.8 + 10, it.c, 0.4);
      if (i === 3) { ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(x, y, pr, 0, TAU); ctx.fill(); ctx.strokeStyle = '#ffb066'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, pr * 1.5, 0, TAU); ctx.stroke(); }
      else { ctx.fillStyle = `rgb(${it.c})`; ctx.beginPath(); ctx.arc(x, y, pr, 0, TAU); ctx.fill(); }
      ctx.fillStyle = '#d6f6ff'; ctx.fillText(it.n, x, y + maxR * 1.9 + 10);
      ctx.fillStyle = 'rgba(214,246,255,0.6)'; ctx.fillText('R = ' + fmt(it.R / 1000) + ' km', x, y + maxR * 1.9 + 28);
    });
    ctx.fillStyle = 'rgba(0,229,255,0.7)'; ctx.fillText('Misma masa (1 M☉) · radios en escala logarítmica', w / 2, h - 18);
    return;
  }

  const cx = w / 2, cy = h / 2;
  const rad = starPx(info.R, m);
  const sunPx = starPx(RSUN, m);
  const st = info.stage;
  const col = tempColor(info.T);

  if (st === 'cloud') {
    ctx.globalCompositeOperation = 'lighter';
    for (const p of CLOUD) {
      const a = p.a + time * 0.03 * (1.4 - p.r);
      const rr = p.r * rad * (0.8 + 0.2 * Math.sin(p.h * 6 + time * 0.3));
      ctx.fillStyle = p.h > 0.5 ? `rgba(120,90,255,${p.al * 0.6})` : `rgba(0,190,255,${p.al * 0.5})`;
      ctx.fillRect(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8, p.s, p.s);
    }
    ctx.globalCompositeOperation = 'source-over';
    glow(ctx, cx, cy, rad * 0.5, [255, 170, 110], 0.15 + info.prog * 0.5);
  } else if (st === 'proto') {
    glow(ctx, cx, cy, rad * 3 + 30, [255, 140, 60], 0.45);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.35);
    ctx.strokeStyle = 'rgba(255,170,90,0.55)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, rad * 3.2 + 30, rad * 0.8 + 8, 0, 0, TAU); ctx.stroke();
    const jg = ctx.createLinearGradient(0, -rad * 5 - 60, 0, rad * 5 + 60);
    jg.addColorStop(0, 'rgba(0,229,255,0)'); jg.addColorStop(0.5, 'rgba(0,229,255,0.35)'); jg.addColorStop(1, 'rgba(0,229,255,0)');
    ctx.fillStyle = jg; ctx.fillRect(-4, -rad * 5 - 60, 8, rad * 10 + 120);
    ctx.restore();
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    g.addColorStop(0, '#fff2d8'); g.addColorStop(1, `rgb(${col})`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Math.max(rad, 8), 0, TAU); ctx.fill();
  } else if (st === 'ms' || st === 'rg' || st === 'srg') {
    const giant = st !== 'ms';
    const c = giant ? [255, 85, 40] : col;
    const rr = rad * (1 + (giant ? 0.02 * Math.sin(time * 2) : 0));
    glow(ctx, cx, cy, rr * 2.6 + 20, c, giant ? 0.4 : 0.5);
    ctx.strokeStyle = `rgba(${c},0.35)`; ctx.lineWidth = 1.5;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * TAU + time * 0.1;
      const L = rr * (1.12 + 0.1 * Math.sin(time * 2 + i * 1.7));
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); ctx.lineTo(cx + Math.cos(a) * L, cy + Math.sin(a) * L); ctx.stroke();
    }
    const g = ctx.createRadialGradient(cx - rr * 0.3, cy - rr * 0.3, rr * 0.1, cx, cy, rr);
    g.addColorStop(0, '#fffdf5'); g.addColorStop(0.35, `rgb(${c})`); g.addColorStop(1, giant ? '#5a0d05' : `rgb(${c.map((v) => v * 0.55)})`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, TAU); ctx.fill();
    if (giant) {
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, TAU); ctx.clip();
      for (let i = 0; i < 14; i++) {
        const a = i * 2.4 + time * 0.12, d = rr * (0.2 + ((i * 37) % 70) / 100);
        ctx.fillStyle = 'rgba(60,5,0,0.22)'; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, rr * 0.13, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
  } else if (st === 'sn') {
    const q = info.prog;
    glow(ctx, cx, cy, rad * 2.2 + 60, [255, 255, 255], 0.55 * (1 - q * 0.5));
    for (let k = 0; k < 3; k++) {
      ctx.strokeStyle = `rgba(255,${120 + k * 40},60,${0.7 - q * 0.4})`; ctx.lineWidth = 4 - k;
      ctx.beginPath(); ctx.arc(cx, cy, rad * (0.4 + 0.3 * k + q * 0.5), 0, TAU); ctx.stroke();
    }
    ctx.globalCompositeOperation = 'lighter';
    for (const p of EJECTA) {
      const d = rad * p.s * (0.3 + q * 0.7);
      ctx.fillStyle = `rgba(255,${100 + p.z * 120},50,0.7)`;
      ctx.fillRect(cx + Math.cos(p.a) * d, cy + Math.sin(p.a) * d, 2.4, 2.4);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, 5 + 6 * Math.sin(time * 14) ** 2, 0, TAU); ctx.fill();
  } else if (st === 'pn') {
    const q = info.prog;
    for (let k = 0; k < 3; k++) {
      ctx.strokeStyle = k === 0 ? 'rgba(0,230,118,0.5)' : k === 1 ? 'rgba(0,229,255,0.4)' : 'rgba(213,0,249,0.35)';
      ctx.lineWidth = 10 - k * 3;
      ctx.beginPath(); ctx.ellipse(cx, cy, rad * (0.55 + k * 0.18) * (0.6 + q * 0.4), rad * (0.45 + k * 0.14) * (0.6 + q * 0.4), 0.4, 0, TAU); ctx.stroke();
    }
    glow(ctx, cx, cy, 36, [200, 230, 255], 0.9);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, TAU); ctx.fill();
  } else if (st === 'wd') {
    const p = 0.8 + 0.2 * Math.sin(time * 2);
    glow(ctx, cx, cy, 70 * p, [160, 215, 255], 0.65);
    ctx.fillStyle = '#f2fbff'; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, TAU); ctx.fill();
  } else if (st === 'ns') {
    drawPulsar(ctx, cx, cy, 8, time);
  } else if (st === 'bh') {
    drawBlackHole(ctx, cx, cy, 28, time);
  }

  ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, sunPx, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.textAlign = 'left'; ctx.fillText('1 R☉', cx + sunPx + 6, cy - 4);
  if (['wd', 'ns', 'bh'].includes(st)) { ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,229,255,0.6)'; ctx.fillText('tamaño simbólico, no a escala', w / 2, h - 18); }
}

function StellarModule() {
  const [ms, setMs] = useState(333);
  const [age, setAge] = useState(40);
  const [exp, setExp] = useState(false);
  const [play, setPlay] = useState(false);
  const mass = Math.pow(10, -1 + (3 * ms) / 1000);
  const info = useMemo(() => stellar(mass, age), [mass, age]);
  useEffect(() => {
    if (!play) return undefined;
    const id = setInterval(() => setAge((a) => { if (a >= 100) { setPlay(false); return 100; } return Math.min(100, a + 0.25); }), 50);
    return () => clearInterval(id);
  }, [play]);
  const [cv, wrap] = useCanvas((ctx, w, h, t) => drawStellar(ctx, w, h, t, info, exp));
  const finalName = info.type === 'wd' ? 'Enana Blanca' : info.type === 'ns' ? 'Estrella de Neutrones' : 'Agujero Negro';
  const Rtxt = info.R > 1e8 ? fmt(info.R / RSUN) + ' R☉' : fmt(info.R / 1000) + ' km';
  const rows = [
    ['Sol', RSUN, 1, false], ['Enana Blanca', 0.0126 * RSUN * Math.pow(1 / 0.7, -1 / 3), 1, false],
    ['Est. Neutrones', 1.2e4, 1, false], ['Agujero Negro', (2 * G * MSUN) / (C * C), 1, true],
  ];
  return (
    <div className="module-grid">
      <div className="stage" ref={wrap}><canvas ref={cv} /><div className="stage-tag">{exp ? 'Experimento · 1 M☉' : STAGE_LABEL[info.stage]}</div></div>
      <aside className="side">
        <div className="card">
          <h3>Constructor estelar</h3>
          <Slider label="Masa inicial" value={ms} min={0} max={1000} onChange={setMs} fmtv={() => fmt(mass, 2)} unit=" M☉" disabled={exp} />
          <Slider label="Edad estelar" value={age} min={0} max={100} step={0.5} onChange={(v) => { setPlay(false); setAge(v); }} fmtv={(v) => v.toFixed(1)} unit=" %" disabled={exp} />
          <div className="chip-row">
            {[0.3, 1, 8, 25, 60].map((v) => <Chip key={v} onClick={() => setMs(Math.round(((Math.log10(v) + 1) / 3) * 1000))}>{v} M☉</Chip>)}
          </div>
          <div className="btn-row">
            <button type="button" className="btn" onClick={() => { if (age >= 100) setAge(0); setPlay(!play); }}>{play ? '❚❚ Pausar' : '▶ Evolucionar'}</button>
            <button type="button" className={'btn' + (exp ? ' primary' : '')} onClick={() => setExp(!exp)}>{exp ? 'Volver al constructor' : 'Misma masa (1 M☉), distinto radio'}</button>
          </div>
        </div>
        {!exp ? (
          <div className="card">
            <h3>{STAGE_LABEL[info.stage]}</h3>
            <div className="metric-grid">
              <Metric label="Radio" value={Rtxt} />
              <Metric label="Temperatura" value={info.T > 0 ? fmt(info.T, 3) : '—'} unit="K" />
              <Metric label="Densidad media" value={fmt(info.rho)} unit="g/cm³" />
              <Metric label="Gravedad superficial" value={fmt(info.g)} unit="m/s²" />
              <Metric label="Velocidad de escape" value={fmt(info.vesc)} unit="km/s" />
              <Metric label="Remanente final" value={finalName} tone="accent" />
            </div>
          </div>
        ) : (
          <div className="card">
            <h3>Cuatro objetos, 1 M☉</h3>
            <div className="table-scroll">
              <table className="table">
                <thead><tr><th>Objeto</th><th>ρ (g/cm³)</th><th>g (m/s²)</th><th>v_esc (km/s)</th></tr></thead>
                <tbody>
                  {rows.map(([n, R, M, bh]) => { const p = bodyProps(M, R, bh); return <tr key={n}><td>{n}</td><td>{fmt(p.rho)}</td><td>{fmt(p.g)}</td><td>{fmt(p.vesc)}</td></tr>; })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <Learn f="ρ = M / (4/3·π·R³) · g = GM/R² · v = √(2GM/R)" v="Masa M y radio R de la etapa actual" e="Mueve la edad o pulsa el experimento de 1 M☉" r="El radio colapsa y la gravedad se dispara" />
      </aside>
    </div>
  );
}

/* =====================================================================
   MÓDULO 2 — LABORATORIO DE GRAVEDAD
   ===================================================================== */
function drawGravity(ctx, w, h, time, S) {
  ctx.fillStyle = '#02030a'; ctx.fillRect(0, 0, w, h);
  drawStars(ctx, w, h, time);
  const cy = h * 0.5, x1 = Math.min(w * 0.2, 150);
  const r1 = clamp(8 + S.lm1 * 1.3, 8, 44), r2 = clamp(8 + S.lm2 * 1.3, 8, 44);
  const span = Math.max(120, w - x1 - 70);
  const d = Math.max(lerp(80, span, S.lr / 13), r1 + r2 + 30);
  const x2 = x1 + d;
  const F = (G * Math.pow(10, S.lm1) * Math.pow(10, S.lm2)) / Math.pow(10, 2 * S.lr);
  const L = clamp(lerp(14, w * 0.3, (Math.log10(F) + 14) / 44), 14, w * 0.34);
  glow(ctx, x1, cy, r1 * 3, [0, 229, 255], 0.35);
  glow(ctx, x2, cy, r2 * 3, [255, 145, 0], 0.35);
  let g = ctx.createRadialGradient(x1 - r1 * 0.3, cy - r1 * 0.3, 1, x1, cy, r1);
  g.addColorStop(0, '#e7fbff'); g.addColorStop(1, '#0097b2');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x1, cy, r1, 0, TAU); ctx.fill();
  g = ctx.createRadialGradient(x2 - r2 * 0.3, cy - r2 * 0.3, 1, x2, cy, r2);
  g.addColorStop(0, '#fff1de'); g.addColorStop(1, '#c46a00');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x2, cy, r2, 0, TAU); ctx.fill();
  const ya = cy - Math.max(r1, r2) - 22, yb = cy + Math.max(r1, r2) + 22;
  arrow(ctx, x1, ya, L, 0, '#ff1744', 3);
  arrow(ctx, x2, yb, -L, 0, '#ff1744', 3);
  ctx.font = '12px "Fira Code", monospace'; ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd0d8'; ctx.fillText('F₁₂ = ' + fmt(F) + ' N', x1 + L / 2, ya - 8);
  ctx.fillText('F₂₁ = ' + fmt(F) + ' N', x2 - L / 2, yb + 18);
  const yd = cy + Math.max(r1, r2) + 62;
  ctx.strokeStyle = 'rgba(0,229,255,0.55)'; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.moveTo(x1, yd); ctx.lineTo(x2, yd); ctx.moveTo(x1, yd - 6); ctx.lineTo(x1, yd + 6); ctx.moveTo(x2, yd - 6); ctx.lineTo(x2, yd + 6); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = '#00e5ff'; ctx.fillText('r = ' + fmt(Math.pow(10, S.lr)) + ' m', (x1 + x2) / 2, yd + 18);
  const pulse = 0.5 + 0.5 * Math.sin(time * 3);
  ctx.strokeStyle = `rgba(255,145,0,${0.3 + 0.4 * pulse})`; ctx.beginPath(); ctx.arc(x2, cy, r2 + 8 + pulse * 3, 0, TAU); ctx.stroke();
  ctx.fillStyle = 'rgba(214,246,255,0.5)'; ctx.fillText('arrastra para cambiar la distancia', w / 2, h - 16);
}

function GravityModule() {
  const [S, setS] = useState({ lm1: 24.776, lm2: 22.866, lr: 8.585 });
  const [ref, setRef] = useState(null);
  const drag = useRef(false);
  const F = (G * Math.pow(10, S.lm1) * Math.pow(10, S.lm2)) / Math.pow(10, 2 * S.lr);
  const [cv, wrap] = useCanvas((ctx, w, h, t) => drawGravity(ctx, w, h, t, S));
  const set = (k, v) => setS((s) => ({ ...s, [k]: clamp(v, k === 'lr' ? 0 : 0, k === 'lr' ? 13 : 32) }));
  const onDrag = (ev) => {
    if (!drag.current) return;
    const r = ev.currentTarget.getBoundingClientRect();
    const x1 = Math.min(r.width * 0.2, 150), span = Math.max(120, r.width - x1 - 70);
    set('lr', ((ev.clientX - r.left - x1 - 80) / (span - 80)) * 13);
  };
  const presets = [
    ['Tierra–Luna', 24.776, 22.866, 8.585], ['Tierra–Persona', 24.776, 1.845, 6.804],
    ['Sol–Tierra', 30.299, 24.776, 11.175], ['Dos personas a 1 m', 1.845, 1.845, 0],
  ];
  return (
    <div className="module-grid">
      <div className="stage" ref={wrap}>
        <canvas ref={cv} style={{ touchAction: 'none', cursor: 'ew-resize' }}
          onPointerDown={(ev) => { drag.current = true; ev.currentTarget.setPointerCapture(ev.pointerId); onDrag(ev); }}
          onPointerMove={onDrag} onPointerUp={() => { drag.current = false; }} onPointerCancel={() => { drag.current = false; }} />
        <div className="stage-tag">F = G·m₁·m₂ / r²</div>
      </div>
      <aside className="side">
        <div className="card">
          <h3>Variables</h3>
          <Slider label="Masa m₁" value={S.lm1} min={0} max={32} step={0.01} onChange={(v) => set('lm1', v)} fmtv={(v) => fmt(Math.pow(10, v))} unit=" kg" />
          <Slider label="Masa m₂" value={S.lm2} min={0} max={32} step={0.01} onChange={(v) => set('lm2', v)} fmtv={(v) => fmt(Math.pow(10, v))} unit=" kg" />
          <Slider label="Distancia r" value={S.lr} min={0} max={13} step={0.01} onChange={(v) => set('lr', v)} fmtv={(v) => fmt(Math.pow(10, v))} unit=" m" />
          <div className="chip-row">{presets.map(([n, a, b, c]) => <Chip key={n} onClick={() => setS({ lm1: a, lm2: b, lr: c })}>{n}</Chip>)}</div>
        </div>
        <div className="card">
          <h3>Resultado</h3>
          <div className="metric-grid">
            <Metric label="Fuerza F" value={fmt(F)} unit="N" tone="accent" />
            <Metric label="Aceleración de m₁" value={fmt(F / Math.pow(10, S.lm1))} unit="m/s²" />
            <Metric label="Aceleración de m₂" value={fmt(F / Math.pow(10, S.lm2))} unit="m/s²" />
            <Metric label={ref ? 'F / F_ref' : 'F_ref'} value={ref ? fmt(F / ref, 4) + '×' : 'sin fijar'} />
          </div>
          <div className="btn-row">
            <button type="button" className="btn" onClick={() => setRef(F)}>Fijar referencia</button>
            <button type="button" className="btn" onClick={() => set('lr', S.lr + 0.30103)}>r × 2</button>
            <button type="button" className="btn" onClick={() => set('lm1', S.lm1 + 0.30103)}>m₁ × 2</button>
            <button type="button" className="btn" onClick={() => set('lm2', S.lm2 + 0.30103)}>m₂ × 2</button>
          </div>
        </div>
        <Learn f="F = G·m₁·m₂ / r²" v="m₁, m₂ en kg · r en m · G = 6,674×10⁻¹¹" e="Fija la referencia y duplica r: F cae a ¼" r="Las flechas rojas crecen o se encogen en tiempo real" />
      </aside>
    </div>
  );
}

/* =====================================================================
   VISTA DE SIMULACIÓN (módulos 3, 4, 5 y 6)
   ===================================================================== */
function HoldBtn({ eng, k, children, label, wide }) {
  const [on, setOn] = useState(false);
  const set = (v) => { eng.current.keys[k] = v; setOn(v); };
  return (
    <button type="button" aria-label={label} className={'hold' + (on ? ' on' : '') + (wide ? ' wide' : '')}
      onPointerDown={(ev) => { ev.currentTarget.setPointerCapture(ev.pointerId); set(true); }}
      onPointerUp={() => set(false)} onPointerCancel={() => set(false)} onPointerLeave={() => set(false)}
      onContextMenu={(ev) => ev.preventDefault()}>{children}</button>
  );
}

function Hud({ t, rel, open, setOpen }) {
  return (
    <div className={'hud' + (open ? ' open' : '')}>
      <button type="button" className="hud-head" onClick={() => setOpen(!open)}>
        <span>Telemetría</span><span className={'pill ' + t.cls}>{t.status}</span><i className="chev" />
      </button>
      <div className="hud-body"><div className="hud-inner">
        <div className="hud-grid">
          <div><span>Velocidad</span><b>{fmt(t.v / 1000)} km/s</b></div>
          <div><span>% de c</span><b>{((t.v / C) * 100).toFixed(3)} %</b></div>
          <div><span>Distancia r</span><b>{fmt(t.r / 1000)} km</b></div>
          <div><span>Gravedad g</span><b>{fmt(t.g)} m/s²</b></div>
          <div><span>Cinética K</span><b>{fmt(t.K)} J</b></div>
          <div><span>Potencial U</span><b>{fmt(t.U)} J</b></div>
          <div><span>Energía E</span><b>{fmt(t.E)} J</b></div>
          <div><span>Excentricidad</span><b>{t.ecc.toFixed(3)}</b></div>
          <div><span>Tiempo propio τ</span><b>{fmt(t.tau)} s</b></div>
          <div><span>Observador t</span><b>{fmt(t.t)} s</b></div>
          <div><span>Dilatación γ</span><b>{rel ? fmt(t.gamma, 4) : '1 (Newton)'}</b></div>
          <div><span>Marea Δg</span><b>{fmt(t.dg)} m/s²</b></div>
        </div>
        <div className="fuel"><span>Combustible</span><div className="bar"><i style={{ width: t.fuel + '%' }} className={t.fuel < 20 ? 'low' : ''} /></div><b>{t.fuel.toFixed(0)}%</b></div>
      </div></div>
    </div>
  );
}

function ControlsCard({ eng, rel, tele, objKey, setObj, showObjects, opts, setOpts, toggles }) {
  const e = eng.current;
  const label = { trail: 'Trayectoria', vectors: 'Vectores', mesh: 'Malla espacio-tiempo', lens: 'Lente gravitacional' };
  return (
    <div className="card">
      <h3>Centro de mando</h3>
      {showObjects && (
        <div className="chip-row">
          {Object.values(OBJECTS).map((o) => <Chip key={o.id} active={objKey === o.id} onClick={() => setObj(o.id)}>{o.name}</Chip>)}
        </div>
      )}
      <div className="sub">Preajustes de lanzamiento</div>
      <div className="btn-grid">
        {[['circular', 'Órbita Circular'], ['elliptic', 'Órbita Elíptica'], ['escape', 'Vel. de Escape'], ['sling', 'Slingshot']].map(([k, n]) => (
          <button key={k} type="button" className={'btn' + (e.preset === k ? ' primary' : '')} onClick={() => launch(e, k, rel)}>{n}</button>
        ))}
      </div>
      <div className="sub">Velocidad de simulación</div>
      <div className="chip-row">
        {[0.25, 0.5, 1, 2, 4].map((s) => <Chip key={s} active={e.speed === s} onClick={() => { e.speed = s; }}>×{s}</Chip>)}
      </div>
      <div className="btn-row">
        <button type="button" className="btn" onClick={() => { e.paused = !e.paused; }}>{e.paused ? '▶ Reanudar' : '❚❚ Pausar'}</button>
        <button type="button" className="btn" onClick={() => launch(e, e.preset || 'circular', rel)}>⟲ Reiniciar</button>
        <button type="button" className="btn" onClick={() => { e.zoom = clamp(e.zoom / 1.25, 0.3, 4); }}>− Zoom</button>
        <button type="button" className="btn" onClick={() => { e.zoom = clamp(e.zoom * 1.25, 0.3, 4); }}>+ Zoom</button>
      </div>
      <div className="toggle-row">
        {toggles.map((k) => <Toggle key={k} label={label[k]} on={opts[k]} onChange={(v) => setOpts((o) => ({ ...o, [k]: v }))} />)}
      </div>
    </div>
  );
}

function SimView({ eng, rel, opts, onMission, renderSide }) {
  const [tele, setTele] = useState(() => telemetry(eng.current, rel));
  const [hudOpen, setHudOpen] = useState(() => typeof window === 'undefined' || window.innerWidth >= 900);
  const acc = useRef(0);
  const draw = (ctx, w, h, time, dt) => {
    const e = eng.current;
    stepEngine(e, dt, rel);
    const t = telemetry(e, rel);
    checkMissions(e, t, onMission);
    drawScene(ctx, w, h, time, e, opts, t);
    acc.current += dt;
    if (acc.current > 0.09) { acc.current = 0; setTele(t); }
  };
  const [cv, wrap] = useCanvas(draw);

  useEffect(() => {
    const map = { KeyW: 'w', ArrowUp: 'w', KeyS: 's', ArrowDown: 's', KeyA: 'a', ArrowLeft: 'a', KeyD: 'd', ArrowRight: 'd' };
    const dn = (ev) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(ev.target.tagName)) return;
      if (ev.code === 'Space') { ev.preventDefault(); eng.current.paused = !eng.current.paused; return; }
      const k = map[ev.code];
      if (k) { ev.preventDefault(); eng.current.keys[k] = true; }
    };
    const up = (ev) => { const k = map[ev.code]; if (k) eng.current.keys[k] = false; };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
  }, [eng]);

  const align = (sign) => { const s = eng.current.s; eng.current.ang = Math.atan2(s.vy, s.vx) + (sign < 0 ? Math.PI : 0); };
  return (
    <div className="module-grid">
      <div className="stage" ref={wrap}>
        <canvas ref={cv} onWheel={(ev) => { eng.current.zoom = clamp(eng.current.zoom * (ev.deltaY > 0 ? 0.92 : 1.08), 0.3, 4); }} />
        <div className="stage-tag">{eng.current.body.o.name} · {rel ? 'Einstein' : 'Newton'}</div>
        <Hud t={tele} rel={rel} open={hudOpen} setOpen={setHudOpen} />
        <div className="controls">
          <div className="pad left">
            <HoldBtn eng={eng} k="a" label="Girar a la izquierda">◀</HoldBtn>
            <HoldBtn eng={eng} k="d" label="Girar a la derecha">▶</HoldBtn>
            <button type="button" className="hold small" onClick={() => align(1)}>Prógrado</button>
            <button type="button" className="hold small" onClick={() => align(-1)}>Retrógrado</button>
          </div>
          <div className="pad right">
            <HoldBtn eng={eng} k="w" label="Acelerar" wide>▲ Acelerar</HoldBtn>
            <HoldBtn eng={eng} k="s" label="Frenar" wide>▼ Frenar</HoldBtn>
          </div>
        </div>
        {(tele.cls === 'bad') && <div className="alert">{tele.status}<button type="button" className="btn primary" onClick={() => launch(eng.current, eng.current.preset || 'circular', rel)}>Reiniciar nave</button></div>}
      </div>
      <aside className="side">{renderSide(tele)}</aside>
    </div>
  );
}

/* ---------- Paneles laterales ---------- */
function ShipSide(p) {
  return (
    <>
      <ControlsCard {...p} showObjects toggles={['trail', 'vectors', 'mesh']} />
      <div className="card">
        <h3>Estado de la nave</h3>
        <div className="metric-grid">
          <Metric label="Estado orbital" value={p.tele.status} tone={p.tele.cls} />
          <Metric label="Gravedad local" value={fmt(p.tele.g)} unit="m/s²" />
          <Metric label="Energía total E" value={fmt(p.tele.E)} unit="J" />
          <Metric label="Velocidad" value={((p.tele.v / C) * 100).toFixed(3)} unit="% de c" />
        </div>
        <p className="note">Controles: W/↑ acelerar · S/↓ frenar · A/D o ←/→ girar · Espacio pausa. En móvil usa los botones táctiles.</p>
      </div>
      <Learn f={p.rel ? 'a = −(GM/r²)(1 + 3L²/c²r²)' : 'a = GM / r²'} v="M del objeto, r, L = r × v" e="Elige un preajuste y aplica empuje prógrado" r="Elipses, escape o caída: la trayectoria lo cuenta" />
    </>
  );
}

function CompactSide(p) {
  const e = p.eng.current, t = p.tele;
  const tid = t.gs < 0.1 ? 'Imperceptible' : t.gs < 1 ? 'Notable' : t.gs < 10 ? 'Peligrosa' : t.gs < 1000 ? 'Letal' : 'Espaguetización';
  const [len, setLen] = useState(Math.log10(e.shipLen));
  const r1g = Math.cbrt((2 * e.body.mu * e.shipLen) / 9.81);
  return (
    <>
      <div className="card">
        <h3>Selecciona un objeto</h3>
        <div className="obj-list">
          {Object.values(OBJECTS).map((o) => (
            <button key={o.id} type="button" className={'obj' + (p.objKey === o.id ? ' active' : '')} onClick={() => p.setObj(o.id)}>
              <b>{o.name}</b>
              <small>{fmt(o.M, 3)} M☉ · {o.type === 'bh' ? 'horizonte r_s = ' + fmt((2 * G * o.M * MSUN) / (C * C) / 1000) + ' km' : 'R = ' + fmt(o.R / 1000) + ' km'}</small>
              <span>{o.desc}</span>
            </button>
          ))}
        </div>
        {p.objKey === 'ns' && <p className="note">Campo magnético de superficie ≈ 10⁸ T. Los haces del púlsar giran en la escena.</p>}
      </div>
      <div className="card">
        <h3>Fuerzas de marea</h3>
        <Slider label="Longitud de la nave Δr" value={len} min={0} max={3} step={0.01}
          onChange={(v) => { setLen(v); e.shipLen = Math.pow(10, v); }} fmtv={(v) => fmt(Math.pow(10, v))} unit=" m" />
        <div className="ship-stage"><div className="ship-vis" style={{ transform: `scale(${t.stretch},${1 / Math.sqrt(t.stretch)})` }} /></div>
        <div className="metric-grid">
          <Metric label="Δg = 2GMΔr / r³" value={fmt(t.dg)} unit="m/s²" tone="accent" />
          <Metric label="En unidades de g" value={fmt(t.gs)} unit="g" />
          <Metric label="Estiramiento" value={t.stretch.toFixed(2)} unit="×" />
          <Metric label="Efecto" value={tid} tone={t.gs > 10 ? 'bad' : t.gs > 1 ? 'warn' : 'ok'} />
          <Metric label="Distancia a la que Δg = 1 g" value={fmt(r1g / 1000)} unit="km" />
        </div>
      </div>
      <ControlsCard {...p} showObjects={false} toggles={['trail', 'vectors']} />
      <Learn f="Δg = 2·G·M·Δr / r³" v="Δr = longitud de la nave · r = distancia al centro" e="Acércate a distintos objetos con el mismo Δr" r="La nave se estira en vertical y se comprime de lado" />
    </>
  );
}

function Clock({ value, tref, color, label }) {
  const ang = (value / tref) * 360;
  return (
    <div className="clock">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1="50" y1="8" x2="50" y2={i % 3 === 0 ? 15 : 12} stroke={color} strokeOpacity="0.6" transform={`rotate(${i * 30} 50 50)`} />)}
        <line className="hand" x1="50" y1="50" x2="50" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ transform: `rotate(${ang}deg)` }} />
        <circle cx="50" cy="50" r="3" fill={color} />
      </svg>
      <b>{label}</b>
    </div>
  );
}

function RelSide(p) {
  const t = p.tele;
  return (
    <>
      <div className="card">
        <h3>Renderizado relativista</h3>
        <div className="toggle-row">
          <Toggle label="Malla de espacio-tiempo" on={p.opts.mesh} onChange={(v) => p.setOpts((o) => ({ ...o, mesh: v }))} />
          <Toggle label="Lente gravitacional" on={p.opts.lens} onChange={(v) => p.setOpts((o) => ({ ...o, lens: v }))} />
        </div>
        <div className="chip-row">
          {Object.values(OBJECTS).map((o) => <Chip key={o.id} active={p.objKey === o.id} onClick={() => p.setObj(o.id)}>{o.name}</Chip>)}
        </div>
      </div>
      <div className="card">
        <h3>Dos relojes</h3>
        <div className="clocks">
          <Clock value={t.t} tref={t.Tref} color="#00e5ff" label="Observador t" />
          <Clock value={t.tau} tref={t.Tref} color="#ff9100" label="Nave τ" />
        </div>
        <div className="metric-grid">
          <Metric label="t (observador)" value={fmt(t.t)} unit="s" />
          <Metric label="τ (nave)" value={fmt(t.tau)} unit="s" />
          <Metric label="dτ/dt" value={p.rel ? fmt(1 / t.gamma, 5) : '1'} />
          <Metric label="Dilatación γ" value={p.rel ? fmt(t.gamma, 4) : '1'} />
          <Metric label="Redshift z" value={p.rel ? fmt(t.z, 4) : '0 (Newton)'} tone="accent" />
          <Metric label="r_s / r" value={t.rsr.toFixed(4)} />
        </div>
        {!p.rel && <p className="note">Activa el motor de Einstein para ver que τ y t se separan.</p>}
      </div>
      <ControlsCard {...p} showObjects={false} toggles={['trail']} />
      <Learn f="dτ = dt·√(1 − r_s/r − v²/c²) · z = 1/√(1 − r_s/r) − 1" v="r_s = 2GM/c², r y v de la nave" e="Acércate al horizonte con el motor de Einstein" r="El reloj naranja se atrasa y la malla se hunde" />
    </>
  );
}

function MissionSide(p) {
  const total = Object.keys(p.done).length;
  return (
    <>
      <div className="card">
        <h3>Progreso</h3>
        <div className="progress"><div className="bar big"><i style={{ width: (total / 7) * 100 + '%' }} /></div><b>{total} / 7</b></div>
        <div className="mission-list">
          {MISSIONS.map((m, i) => (
            <div key={m.id} className={'mission' + (p.done[m.id] ? ' done' : '')} style={{ '--i': i }}>
              <span className="check">{p.done[m.id] ? '✓' : m.id}</span>
              <div><b>{m.title}</b><p>{m.desc}</p><small>{m.hint}</small></div>
            </div>
          ))}
        </div>
        <button type="button" className="btn" onClick={p.resetMissions}>Reiniciar misiones</button>
      </div>
      <ControlsCard {...p} showObjects toggles={['trail', 'vectors']} />
    </>
  );
}

/* =====================================================================
   MÓDULO 7 — COMPARADOR CÓSMICO
   ===================================================================== */
const COMPARE = [
  { n: 'Tierra', M: 5.972e24, R: 6.371e6, c: '#00e676' },
  { n: 'Sol', M: 1.989e30, R: 6.957e8, c: '#ffd54f' },
  { n: 'Enana Blanca (0,6 M☉)', M: 0.6 * MSUN, R: 8.7e6, c: '#00e5ff' },
  { n: 'Estrella de Neutrones (1,4 M☉)', M: 1.4 * MSUN, R: 1.2e4, c: '#d500f9' },
  { n: 'Agujero Negro (10 M☉)', M: 10 * MSUN, R: (2 * G * 10 * MSUN) / (C * C), c: '#ff9100', bh: true },
];

function CompareModule() {
  const [on, setOn] = useState(false);
  useEffect(() => { const id = setTimeout(() => setOn(true), 60); return () => clearTimeout(id); }, []);
  const rows = COMPARE.map((o) => ({ ...o, g: (G * o.M) / (o.R * o.R), v: o.bh ? C : Math.sqrt((2 * G * o.M) / o.R) }));
  const cols = [['Masa', 'M', 'kg'], ['Radio', 'R', 'm'], ['Gravedad', 'g', 'm/s²'], ['Velocidad de escape', 'v', 'm/s']];
  const pct = (k, v) => { const l = rows.map((r) => Math.log10(r[k])); const mn = Math.min(...l), mx = Math.max(...l); return 6 + ((Math.log10(v) - mn) / (mx - mn || 1)) * 94; };
  return (
    <div className="page">
      <div className="card wide">
        <h3>Tabla comparativa</h3>
        <div className="table-scroll">
          <table className="table">
            <thead><tr><th>Objeto</th>{cols.map((c) => <th key={c[0]}>{c[0]} ({c[2]})</th>)}</tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.n}><td><i className="dot" style={{ background: r.c }} />{r.n}</td>{cols.map((c) => <td key={c[1]}>{fmt(r[c[1]])}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bars-grid">
        {cols.map(([title, k, u]) => (
          <div className="card" key={k}>
            <h3>{title} <small>escala logarítmica</small></h3>
            {rows.map((r, i) => (
              <div className="hbar" key={r.n}>
                <span>{r.n.split(' (')[0]}</span>
                <div className="track"><i style={{ width: on ? pct(k, r[k]) + '%' : '0%', background: r.c, transitionDelay: i * 70 + 'ms' }} /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================================
   MÓDULO 8 — CENTRO DE FÓRMULAS
   ===================================================================== */
const lg = (def, min, max, step, label, unit) => ({ log: true, def, min, max, step, label, unit });
const FORMULAS = [
  { id: 'newton', title: 'Gravitación de Newton', eq: 'F = G · m₁ · m₂ / r²', goto: 2,
    vars: [['F', 'fuerza de atracción (N)'], ['G', 'constante gravitacional 6,674×10⁻¹¹'], ['m₁, m₂', 'masas (kg)'], ['r', 'distancia entre centros (m)']],
    text: 'Dos masas se atraen con una fuerza proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia. Es la base de las órbitas keplerianas.',
    inputs: { m1: lg(24.78, 0, 32, 0.01, 'm₁', 'kg'), m2: lg(22.87, 0, 32, 0.01, 'm₂', 'kg'), r: lg(8.58, 0, 13, 0.01, 'r', 'm') },
    calc: (v) => { const F = (G * v.m1 * v.m2) / (v.r * v.r); return [['F', fmt(F) + ' N'], ['a₁ = F / m₁', fmt(F / v.m1) + ' m/s²']]; } },
  { id: 'rs', title: 'Radio de Schwarzschild', eq: 'r_s = 2 · G · M / c²', goto: 4,
    vars: [['r_s', 'radio del horizonte de sucesos (m)'], ['M', 'masa del objeto (kg)'], ['c', '299 792 458 m/s']],
    text: 'Si toda la masa M se comprime dentro de r_s, ni la luz puede escapar. Define la frontera de no retorno de un agujero negro.',
    inputs: { M: lg(0, -1, 7, 0.01, 'Masa M', 'M☉') },
    calc: (v) => { const rs = (2 * G * v.M * MSUN) / (C * C); return [['r_s', fmt(rs / 1000) + ' km'], ['Densidad media interior', fmt((v.M * MSUN) / ((4 / 3) * Math.PI * Math.pow(rs, 3))) + ' kg/m³']]; } },
  { id: 'dil', title: 'Dilatación temporal', eq: 'dτ = dt · √(1 − r_s/r − v²/c²)', goto: 5,
    vars: [['dτ', 'tiempo propio de la nave'], ['dt', 'tiempo del observador lejano'], ['r_s/r', 'efecto gravitatorio'], ['v/c', 'efecto de la velocidad']],
    text: 'Combina la dilatación gravitacional y la cinemática. Cerca del horizonte el reloj de la nave casi se detiene visto desde lejos.',
    inputs: { x: lg(0.7, 0.005, 2, 0.005, 'r / r_s', ''), b: { def: 0.3, min: 0, max: 0.95, step: 0.01, label: 'v / c', unit: '' } },
    calc: (v) => { const f = 1 - 1 / v.x - v.b * v.b; if (f <= 0) return [['Resultado', 'Dentro del horizonte o v demasiado alta']]; return [['dτ / dt', fmt(Math.sqrt(f), 5)], ['Por cada 1 s de observador', fmt(Math.sqrt(f), 4) + ' s en la nave'], ['γ total', fmt(1 / Math.sqrt(f), 4)]]; } },
  { id: 'tide', title: 'Fuerzas de marea', eq: 'Δg = 2 · G · M · Δr / r³', goto: 4,
    vars: [['Δg', 'diferencia de aceleración (m/s²)'], ['Δr', 'longitud del cuerpo (m)'], ['r', 'distancia al centro (m)']],
    text: 'El gradiente gravitacional estira un cuerpo en la dirección radial. Cerca de agujeros negros pequeños es letal antes del horizonte: espaguetización.',
    inputs: { M: lg(1, -1, 7, 0.01, 'Masa M', 'M☉'), r: lg(3, 0.5, 10, 0.01, 'Distancia r', 'km'), dr: lg(1.3, 0, 3, 0.01, 'Longitud Δr', 'm') },
    calc: (v) => { const dg = (2 * G * v.M * MSUN * v.dr) / Math.pow(v.r * 1000, 3); return [['Δg', fmt(dg) + ' m/s²'], ['En g terrestres', fmt(dg / 9.81) + ' g']]; } },
  { id: 'en', title: 'Energía orbital', eq: 'E = K + U = ½mv² − GMm / r', goto: 3,
    vars: [['K', 'energía cinética'], ['U', 'energía potencial'], ['E < 0', 'órbita ligada'], ['E ≥ 0', 'escape']],
    text: 'El signo de la energía total decide el destino: negativa significa órbita cerrada; positiva, trayectoria abierta.',
    inputs: { M: lg(0, -1, 7, 0.01, 'Masa M', 'M☉'), r: lg(5, 0.5, 11, 0.01, 'r', 'km'), v: lg(1.5, 0, 5, 0.01, 'v', 'km/s') },
    calc: (v) => { const K = 0.5 * Math.pow(v.v * 1000, 2), U = -(G * v.M * MSUN) / (v.r * 1000), E = K + U; return [['K por kg', fmt(K) + ' J'], ['U por kg', fmt(U) + ' J'], ['E por kg', fmt(E) + ' J'], ['Destino', E < 0 ? 'Órbita ligada' : 'Escape']]; } },
  { id: 'gr', title: 'Aceleración relativista', eq: 'a = −(GM/r²)·(1 + 3L² / c²r²)', goto: 3,
    vars: [['L', 'momento angular específico = r·v_t'], ['3L²/c²r²', 'corrección de Schwarzschild']],
    text: 'El término extra refuerza la atracción cerca del objeto y produce la precesión del periastro, como en Mercurio.',
    inputs: { M: lg(1, -1, 7, 0.01, 'Masa M', 'M☉'), r: lg(2.5, 0.5, 10, 0.01, 'r', 'km'), v: lg(4, 0, 5.4, 0.01, 'v tangencial', 'km/s') },
    calc: (v) => { const a = (G * v.M * MSUN) / Math.pow(v.r * 1000, 2), k = 1 + (3 * Math.pow(v.v * 1000, 2)) / (C * C); return [['a Newton', fmt(a) + ' m/s²'], ['a Einstein', fmt(a * k) + ' m/s²'], ['Corrección', fmt((k - 1) * 100) + ' %']]; } },
  { id: 'esc', title: 'Velocidad de escape', eq: 'v_esc = √(2 · G · M / R)', goto: 1,
    vars: [['M', 'masa'], ['R', 'radio (o distancia)']],
    text: 'Velocidad mínima para escapar sin propulsión. Cuando iguala a c, el objeto es un agujero negro.',
    inputs: { M: lg(0, -1, 7, 0.01, 'Masa M', 'M☉'), R: lg(5, 0.3, 9, 0.01, 'Radio R', 'km') },
    calc: (v) => { const ve = Math.sqrt((2 * G * v.M * MSUN) / (v.R * 1000)); return [['v_esc', fmt(ve / 1000) + ' km/s'], ['% de c', fmt((ve / C) * 100) + ' %']]; } },
  { id: 'z', title: 'Corrimiento al rojo gravitacional', eq: 'z = 1 / √(1 − r_s/r) − 1', goto: 5,
    vars: [['z', 'desplazamiento de la longitud de onda'], ['r_s/r', 'cercanía al horizonte']],
    text: 'La luz que sube desde un pozo gravitatorio pierde energía y se enrojece. En el horizonte z tiende a infinito.',
    inputs: { x: lg(0.5, 0.005, 2, 0.005, 'r / r_s', '') },
    calc: (v) => { const z = 1 / Math.sqrt(1 - 1 / v.x) - 1; return [['z', fmt(z, 4)], ['Frecuencia observada f/f₀', fmt(1 / (1 + z), 4)]]; } },
];

function FormulaModule({ goto }) {
  const [id, setId] = useState('newton');
  const f = FORMULAS.find((x) => x.id === id);
  const [vals, setVals] = useState({});
  useEffect(() => { setVals(Object.fromEntries(Object.entries(f.inputs).map(([k, i]) => [k, i.def]))); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  const real = Object.fromEntries(Object.entries(f.inputs).map(([k, i]) => [k, vals[k] === undefined ? (i.log ? Math.pow(10, i.def) : i.def) : (i.log ? Math.pow(10, vals[k]) : vals[k])]));
  return (
    <div className="formula-layout">
      <div className="formula-tabs">
        {FORMULAS.map((x) => <button key={x.id} type="button" className={'ftab' + (x.id === id ? ' active' : '')} onClick={() => setId(x.id)}>{x.title}</button>)}
      </div>
      <div className="card formula-detail" key={id}>
        <div className="flow"><span>Fórmula</span><i /><span>Variable</span><i /><span>Experimento</span><i /><span>Resultado</span></div>
        <h3>{f.title}</h3>
        <div className="equation">{f.eq}</div>
        <p>{f.text}</p>
        <ul className="vars">{f.vars.map(([s, d]) => <li key={s}><code>{s}</code><span>{d}</span></li>)}</ul>
        <div className="calc">
          <h4>Calculadora</h4>
          {Object.entries(f.inputs).map(([k, i]) => (
            <Slider key={k} label={i.label} value={vals[k] === undefined ? i.def : vals[k]} min={i.min} max={i.max} step={i.step}
              onChange={(v) => setVals((s) => ({ ...s, [k]: v }))} fmtv={(v) => (i.log ? fmt(Math.pow(10, v)) : v)} unit={i.unit ? ' ' + i.unit : ''} />
          ))}
          <div className="metric-grid">{f.calc(real).map(([a, b]) => <Metric key={a} label={a} value={b} tone="accent" />)}</div>
        </div>
        <button type="button" className="btn primary" onClick={() => goto(f.goto)}>Probar en el laboratorio</button>
      </div>
    </div>
  );
}

/* =====================================================================
   APLICACIÓN PRINCIPAL
   ===================================================================== */
export default function Astrolab() {
  const [mod, setMod] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const [rel, setRel] = useState(true);
  const [objKey, setObjKey] = useState('bh');
  const [opts, setOpts] = useState({ mesh: true, lens: true, trail: true, vectors: true });
  const [done, setDone] = useState({});
  const [toasts, setToasts] = useState([]);
  const doneRef = useRef({});
  const eng = useRef(null);
  if (!eng.current) eng.current = createEngine('bh', true);

  const setObj = useCallback((key) => {
    const old = eng.current;
    const n = createEngine(key, rel);
    n.zoom = old.zoom; n.speed = old.speed;
    eng.current = n;
    setObjKey(key);
  }, [rel]);

  const onMission = useCallback((id) => {
    if (doneRef.current[id]) return;
    doneRef.current = { ...doneRef.current, [id]: true };
    setDone(doneRef.current);
    const tid = Date.now() + id;
    setToasts((t) => [...t, { id: tid, text: 'Misión completada: ' + MISSIONS[id - 1].title }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== tid)), 4200);
  }, []);

  const resetMissions = () => { doneRef.current = {}; setDone({}); };
  const go = (id) => { setMod(id); setDrawer(false); };

  const common = { eng, rel, objKey, setObj, opts, setOpts };
  let body;
  if (mod === 1) body = <StellarModule />;
  else if (mod === 2) body = <GravityModule />;
  else if (mod === 3) body = <SimView eng={eng} rel={rel} opts={opts} onMission={onMission} renderSide={(tele) => <ShipSide {...common} tele={tele} />} />;
  else if (mod === 4) body = <SimView eng={eng} rel={rel} opts={opts} onMission={onMission} renderSide={(tele) => <CompactSide {...common} tele={tele} />} />;
  else if (mod === 5) body = <SimView eng={eng} rel={rel} opts={opts} onMission={onMission} renderSide={(tele) => <RelSide {...common} tele={tele} />} />;
  else if (mod === 6) body = <SimView eng={eng} rel={rel} opts={opts} onMission={onMission} renderSide={(tele) => <MissionSide {...common} tele={tele} done={done} resetMissions={resetMissions} />} />;
  else if (mod === 7) body = <CompareModule />;
  else body = <FormulaModule goto={go} />;

  return (
    <div className="astro-app">
      <div className={'backdrop' + (drawer ? ' show' : '')} onClick={() => setDrawer(false)} />
      <nav className={'sidebar' + (drawer ? ' open' : '')} aria-label="Módulos">
        <div className="brand"><b>ASTROLAB</b><span>Colapso estelar &amp; Relatividad General</span></div>
        <div className="nav-list">
          {NAV.map((n) => (
            <button key={n.id} type="button" className={'nav-item' + (mod === n.id ? ' active' : '')} onClick={() => go(n.id)}>
              <span className="nav-num">{n.id}</span>
              <span className="nav-txt"><b>{n.title}</b><small>{n.sub}</small></span>
            </button>
          ))}
        </div>
        <div className="side-foot">Fórmula → Variable → Experimento → Resultado visual</div>
      </nav>
      <main className="content">
        <header className="topbar">
          <button type="button" className="burger" aria-label="Abrir menú" onClick={() => setDrawer(true)}><i /><i /><i /></button>
          <div className="title"><b>{NAV[mod - 1].title}</b><small>{NAV[mod - 1].sub}</small></div>
          <div className="engine" role="group" aria-label="Motor físico">
            <i className="engine-ind" style={{ transform: rel ? 'translateX(100%)' : 'translateX(0)' }} />
            <button type="button" className={!rel ? 'on' : ''} onClick={() => setRel(false)}>Newton</button>
            <button type="button" className={rel ? 'on' : ''} onClick={() => setRel(true)}>Einstein</button>
          </div>
        </header>
        <div className="module-wrap"><div className="module" key={mod}>{body}</div></div>
      </main>
      <div className="toast-wrap" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className="toast"><i>✓</i>{t.text}</div>)}
      </div>
    </div>
  );
}