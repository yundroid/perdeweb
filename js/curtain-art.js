/*
 * Fotoğraf olmayan ürünler için perde illüstrasyonu (SVG) üretir.
 * Gerçek fotoğraf eklendiğinde bu çizim kullanılmaz.
 */
(function () {
  let uid = 0;

  function windowScene(id) {
    return `
      <defs>
        <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#bcd7e6"/><stop offset="1" stop-color="#eef5f7"/>
        </linearGradient>
        <linearGradient id="wall${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f4efe8"/><stop offset="1" stop-color="#e9e1d6"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#wall${id})"/>
      <rect x="0" y="262" width="400" height="38" fill="#d8ccbb"/>
      <rect x="95" y="50" width="210" height="190" rx="3" fill="#fff"/>
      <rect x="103" y="58" width="194" height="174" fill="url(#sky${id})"/>
      <path d="M103 200 Q150 170 200 190 T297 180 V232 H103Z" fill="#a9c7a0" opacity=".7"/>
      <rect x="198" y="58" width="4" height="174" fill="#fff"/>
      <rect x="88" y="238" width="224" height="8" rx="2" fill="#fff"/>`;
  }

  function rod() {
    return `<rect x="60" y="36" width="280" height="6" rx="3" fill="#6b5d4f"/>
            <circle cx="60" cy="39" r="6" fill="#6b5d4f"/><circle cx="340" cy="39" r="6" fill="#6b5d4f"/>`;
  }

  function folds(x, w, h, color, accent, n, opacity) {
    const step = w / n;
    let s = `<rect x="${x}" y="42" width="${w}" height="${h}" fill="${color}" opacity="${opacity}"/>`;
    for (let i = 0; i < n; i++) {
      const fx = x + i * step + step * 0.55;
      s += `<rect x="${fx}" y="42" width="${step * 0.28}" height="${h}" fill="${accent}" opacity="${opacity * 0.45}"/>`;
    }
    return s;
  }

  const draw = {
    tul: (c, a) => rod() + folds(70, 260, 212, c, a, 14, 0.72),
    fon: (c, a) =>
      rod() +
      folds(70, 260, 212, "#f7f3ec", "#e7dfd2", 14, 0.55) +
      `<path d="M62 42 H138 Q120 150 132 254 H62Z" fill="${c}"/>
       <path d="M262 42 H338 V254 H268 Q280 150 262 42Z" fill="${c}"/>
       <path d="M78 42 L84 254 M98 42 Q96 150 104 254 M118 42 Q112 150 120 254" stroke="${a}" stroke-width="5" fill="none" opacity=".6"/>
       <path d="M322 42 L316 254 M302 42 Q304 150 296 254 M282 42 Q288 150 280 254" stroke="${a}" stroke-width="5" fill="none" opacity=".6"/>`,
    stor: (c, a) =>
      `<rect x="95" y="44" width="210" height="12" rx="6" fill="#ddd5c8"/>
       <rect x="100" y="56" width="200" height="122" fill="${c}"/>
       <rect x="100" y="172" width="200" height="8" fill="${a}"/>
       <rect x="197" y="180" width="6" height="22" rx="3" fill="${a}"/>`,
    zebra: (c, a) => {
      let s = `<rect x="95" y="44" width="210" height="12" rx="6" fill="#ddd5c8"/>`;
      for (let i = 0; i < 9; i++) {
        s += `<rect x="100" y="${56 + i * 18}" width="200" height="18" fill="${i % 2 ? c : a}" opacity="${i % 2 ? 0.5 : 0.95}"/>`;
      }
      return s + `<rect x="100" y="218" width="200" height="6" fill="${a}"/>`;
    },
    jaluzi: (c, a) => {
      let s = `<rect x="95" y="46" width="210" height="10" rx="2" fill="${a}"/>`;
      for (let i = 0; i < 17; i++) {
        s += `<rect x="100" y="${60 + i * 10}" width="200" height="7" rx="1" fill="${c}"/>
              <rect x="100" y="${65 + i * 10}" width="200" height="2" fill="${a}" opacity=".6"/>`;
      }
      return s + `<line x1="140" y1="56" x2="140" y2="232" stroke="#fff" opacity=".5"/><line x1="260" y1="56" x2="260" y2="232" stroke="#fff" opacity=".5"/>`;
    },
    plise: (c, a) => {
      let s = `<rect x="103" y="58" width="194" height="6" fill="${a}"/>`;
      for (let i = 0; i < 26; i++) {
        s += `<rect x="103" y="${64 + i * 4}" width="194" height="4" fill="${i % 2 ? c : a}"/>`;
      }
      return s + `<rect x="103" y="168" width="194" height="5" fill="${a}"/>`;
    },
    dikey: (c, a) => {
      let s = `<rect x="80" y="40" width="240" height="8" rx="2" fill="#cfd3d6"/>`;
      for (let i = 0; i < 12; i++) {
        s += `<rect x="${84 + i * 19.5}" y="48" width="16" height="200" fill="${i % 2 ? c : a}" opacity=".95"/>`;
      }
      return s;
    },
    blackout: (c, a) =>
      rod() +
      `<path d="M62 42 H198 Q190 150 196 254 H62Z" fill="${c}"/>
       <path d="M202 42 H338 V254 H204 Q210 150 202 42Z" fill="${c}"/>
       <path d="M90 42 Q86 150 92 254 M125 42 Q120 150 128 254 M160 42 Q154 150 162 254 M240 42 Q246 150 238 254 M275 42 Q280 150 272 254 M310 42 Q314 150 308 254"
             stroke="${a}" stroke-width="7" fill="none" opacity=".7"/>`
  };

  window.curtainArt = function (type, color, accent) {
    const id = ++uid;
    const fn = draw[type] || draw.tul;
    return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      ${windowScene(id)}${fn(color, accent)}</svg>`;
  };
})();
