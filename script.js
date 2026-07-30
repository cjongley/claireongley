// Draws a "Bargello flame" style wave: bands of colour whose shared
// edges are triangle waves at staggered phases, so the strips interlock
// the way graduated fabric strips do in real Bargello quilting.

const PALETTE = ['#147D77', '#FF6B54', '#F2B705', '#6C4E8C', '#E8497A'];
const VIEW_W = 1200;
const VIEW_H = 90;
const BAND_COUNT = PALETTE.length;

function triWave(x, period, amp, phase) {
  const f = ((x + phase) / period) % 1;
  const val = 2 * Math.abs(2 * (f - Math.floor(f + 0.5))) - 1;
  return amp * val;
}

function shuffledPalette() {
  const arr = [...PALETTE];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildWaveSVG(seedOffset) {
  const thickness = VIEW_H / BAND_COUNT;
  const amp = thickness * 0.42;
  const period = 260 + Math.random() * 220;
  const phaseStep = period / BAND_COUNT + seedOffset;
  const step = 15;
  const colors = shuffledPalette();

  const edgeY = (edgeIndex, x) => {
    const base = edgeIndex * thickness;
    const phase = edgeIndex * phaseStep + seedOffset;
    return base + triWave(x, period, amp, phase);
  };

  let polys = '';
  for (let b = 0; b < BAND_COUNT; b++) {
    const top = [];
    const bot = [];
    for (let x = 0; x <= VIEW_W; x += step) {
      top.push(`${x},${edgeY(b, x).toFixed(1)}`);
      bot.push(`${x},${edgeY(b + 1, x).toFixed(1)}`);
    }
    bot.reverse();
    const points = top.concat(bot).join(' L');
    polys += `<path d="M${points} Z" fill="${colors[b]}"></path>`;
  }

  return `<svg viewBox="0 0 ${VIEW_W} ${VIEW_H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${polys}</svg>`;
}

function renderWaves() {
  const dividers = document.querySelectorAll('.wave-divider');
  dividers.forEach((el, i) => {
    el.innerHTML = buildWaveSVG(i * 40 + Math.random() * 30);
  });
}

document.addEventListener('DOMContentLoaded', renderWaves);

const shuffleBtn = document.getElementById('shuffle-btn');
if (shuffleBtn) {
  shuffleBtn.addEventListener('click', renderWaves);
}
