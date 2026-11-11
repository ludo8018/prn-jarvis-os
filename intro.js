/* ===== PRN JARVIS OS - CINEMATIC INTRO =====
   Voice file: assets/intro-voice.mp3 (~5 s). Scene timings below are in SECONDS FROM VOICE START.
   If a scene feels early/late when you listen, just change its "t" value. */
(function () {
  const VOICE_SRC = "assets/intro-voice.mp3";
  const CLICK_SRC = "assets/jarvis-click.wav";
  const IGNITE = 1.4;   // seconds of core power-up before the voice starts
  const HOLD   = 1.1;   // seconds to hold the last scene after the voice ends
  const DUR_FALLBACK = 5.04;
  const CUES = [
    { t: 0.00, s: "online",  cap: "System online." },
    { t: 1.10, s: "welcome", cap: "Welcome to PRN JARVIS OS." },
    { t: 1.95, s: "name",    cap: "I'm Pratik Ranjan Nayak," },
    { t: 2.65, s: "role",    cap: "a Full Stack Developer." },
    { t: 3.35, s: "explore", cap: "Explore my projects, skills, and development journey." },
    { t: 4.10, s: "explore", cap: "Let's begin!", go: true }
  ];
  const ENV = "002433211113552333322222111143533223344443332222222111111111110444445675646554333321334333533232246666754454446666743211246576753233336655553212112644553434345466566558755476675544646596666554455454553422223222122100000000000000000000000000000000000".split("").map(c => +c / 9); // voice loudness @50/s (drives the waveform)

  const root = document.documentElement, el = document.getElementById("intro");
  const force = /[?&]intro=1/.test(location.search);
  let seen = false; try { seen = sessionStorage.getItem("prnIntroSeen") === "1"; } catch (e) {}
  if (!el) return;
  if (seen && !force) { root.classList.remove("intro-lock"); el.remove(); return; }
  root.classList.add("intro-lock");

  const $ = id => document.getElementById(id);
  const wave = $("introWave"), cap = $("introCap"), bar = $("introBar");
  const scenes = {}; el.querySelectorAll(".sc").forEach(n => scenes[n.dataset.s] = n);
  const bars = []; for (let i = 0; i < 41; i++) { const b = document.createElement("i"); wave.appendChild(b); bars.push(b); }

  const voice = new Audio(VOICE_SRC); voice.preload = "auto";
  const click = new Audio(CLICK_SRC);
  let started = false, finished = false, t0 = 0, cueIdx = -1, ctx;

  function powerUp() {           // short synthesized "reactor charging" sweep
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime;
      o.type = "sawtooth"; o.frequency.setValueAtTime(55, n); o.frequency.exponentialRampToValueAtTime(330, n + IGNITE);
      g.gain.setValueAtTime(0.0001, n); g.gain.exponentialRampToValueAtTime(0.07, n + IGNITE * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, n + IGNITE + 0.1);
      o.connect(g).connect(ctx.destination); o.start(n); o.stop(n + IGNITE + 0.15);
    } catch (e) {}
  }

  function start() {
    if (started) return; started = true;
    try { click.currentTime = 0; click.play(); } catch (e) {}
    powerUp();
    el.classList.add("run");
    setTimeout(() => { t0 = performance.now(); voice.currentTime = 0; voice.play().catch(() => {}); }, IGNITE * 1000);
    requestAnimationFrame(tick);
  }

  function now() {               // voice clock (falls back to a timer if audio is blocked/missing)
    if (!t0) return -1;
    return (!voice.paused && voice.currentTime > 0) ? voice.currentTime : (performance.now() - t0) / 1000;
  }

  function show(c) {
    Object.values(scenes).forEach(n => n.classList.remove("on"));
    scenes[c.s].classList.add("on"); el.classList.add("scene-on");
    cap.textContent = c.cap;
    if (c.go) scenes[c.s].querySelector(".go").classList.add("hit");
  }

  function tick() {
    if (finished) return;
    const t = now(), dur = isFinite(voice.duration) ? voice.duration : DUR_FALLBACK;
    if (t >= 0) {
      let k = -1; CUES.forEach((c, i) => { if (t >= c.t) k = i; });
      if (k !== cueIdx && k >= 0) { cueIdx = k; show(CUES[k]); }
      const base = Math.floor(t * 50);
      bars.forEach((b, i) => { const v = ENV[base + i - 20] || 0; b.style.height = (4 + v * 42) + "px"; });
      bar.style.width = Math.min(100, ((IGNITE + t) / (IGNITE + dur + HOLD)) * 100) + "%";
      if (t > dur + HOLD) return finish();
    }
    requestAnimationFrame(tick);
  }

  function finish() {
    if (finished) return; finished = true;
    try { voice.pause(); ctx && ctx.close(); sessionStorage.setItem("prnIntroSeen", "1"); } catch (e) {}
    el.classList.add("out"); root.classList.remove("intro-lock"); root.classList.add("intro-done");
    setTimeout(() => el.remove(), 950);
  }

  $("introStart").addEventListener("click", start);
  $("introSkip").addEventListener("click", finish);
  document.addEventListener("keydown", e => { if (e.key === "Escape") finish(); if ((e.key === "Enter" || e.key === " ") && !started) { e.preventDefault(); start(); } });
  window.PRNIntro = { replay: () => { try { sessionStorage.removeItem("prnIntroSeen"); } catch (e) {} location.search = "?intro=1"; } };
})();
