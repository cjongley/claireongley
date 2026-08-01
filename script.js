document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('.game-reel-wrap');
  const track = document.querySelector('.game-reel-track');
  if (!wrap || !track) return;

  const leftBtn = wrap.querySelector('.reel-arrow-left');
  const rightBtn = wrap.querySelector('.reel-arrow-right');
  const items = Array.from(track.children);
  const setCount = items.length / 2;
  const firstSetItems = items.slice(0, setCount);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LOOP_MS = 70000; 

  let halfWidth = 0;
  let boundaries = [];

  function measure() {
    halfWidth = track.scrollWidth / 2;
    let acc = 0;
    boundaries = firstSetItems.map((el) => {
      const start = acc;
      acc += el.getBoundingClientRect().width + 14;
      return start;
    });
  }
  measure();
  window.addEventListener('resize', measure);

  let offset = 0;
  let paused = false;
  let lastTime = null;

  let jumpFrom = null;
  let jumpTo = null;
  let jumpStart = null;
  const jumpDuration = reduceMotion ? 0 : 350;

  function wrapOffset(x) {
    if (halfWidth <= 0) return 0;
    x = x % halfWidth;
    if (x < 0) x += halfWidth;
    return x;
  }

  function applyOffset() {
    track.style.transform = `translateX(${-offset}px)`;
  }

  function nextBoundary(current) {
    for (const b of boundaries) {
      if (b > current + 0.5) return b;
    }
    return boundaries[0] + halfWidth;
  }

  function prevBoundary(current) {
    for (let i = boundaries.length - 1; i >= 0; i--) {
      if (boundaries[i] < current - 0.5) return boundaries[i];
    }
    return boundaries[boundaries.length - 1] - halfWidth;
  }

  function startJump(target) {
    jumpFrom = offset;
    jumpTo = target;
    jumpStart = null;
    if (jumpDuration === 0) {
      offset = wrapOffset(target);
      applyOffset();
      jumpTo = null;
    }
  }

  rightBtn.addEventListener('click', () => startJump(nextBoundary(offset)));
  leftBtn.addEventListener('click', () => startJump(prevBoundary(offset)));

  wrap.addEventListener('mouseenter', () => { paused = true; });
  wrap.addEventListener('mouseleave', () => { paused = false; });

  function step(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    if (jumpTo !== null) {
      if (jumpStart === null) jumpStart = timestamp;
      const t = Math.min(1, (timestamp - jumpStart) / jumpDuration);
      const eased = 1 - Math.pow(1 - t, 3);
      offset = wrapOffset(jumpFrom + (jumpTo - jumpFrom) * eased);
      applyOffset();
      if (t >= 1) { jumpTo = null; jumpFrom = null; jumpStart = null; }
    } else if (!paused && !reduceMotion && halfWidth > 0) {
      offset = wrapOffset(offset + (halfWidth / LOOP_MS) * dt);
      applyOffset();
    }

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});