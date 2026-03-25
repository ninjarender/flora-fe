/**
 * Creates a responsive horizontal slider.
 * Item widths and gap are read from rendered DOM / CSS variables,
 * so the slider adapts automatically to any viewport width.
 *
 * @param {object} opts
 * @param {HTMLElement} opts.track   - Flex container with slide items
 * @param {HTMLElement} opts.prevBtn - Previous arrow button
 * @param {HTMLElement} opts.nextBtn - Next arrow button
 * @param {HTMLElement} [opts.dotsEl] - Container for dot indicators
 */
export function createSlider({ track, prevBtn, nextBtn, dotsEl }) {
  let current = 0;

  function getItemWidth() {
    const item = track.children[0];
    return item ? item.offsetWidth : 0;
  }

  function getGap() {
    return parseFloat(getComputedStyle(track).gap) || 32;
  }

  function getVisibleCount() {
    const itemW = getItemWidth();
    const gap = getGap();
    const wrapW = track.parentElement.offsetWidth;
    if (!itemW) return 1;
    return Math.max(1, Math.round((wrapW + gap) / (itemW + gap)));
  }

  function maxIndex() {
    return Math.max(0, track.children.length - getVisibleCount());
  }

  function goTo(index) {
    current = Math.min(Math.max(index, 0), maxIndex());
    const itemW = getItemWidth();
    const gap = getGap();
    track.style.transform = `translateX(-${current * (itemW + gap)}px)`;
    updateDots();
    updateArrows();
  }

  function updateDots() {
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function updateArrows() {
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= maxIndex();
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  const ro = new ResizeObserver(() => {
    buildDots();
    goTo(Math.min(current, maxIndex()));
  });
  ro.observe(track.parentElement);

  return {
    init() {
      buildDots();
      goTo(0);
    },
    refresh() {
      buildDots();
      goTo(0);
    },
    destroy() {
      ro.disconnect();
    },
  };
}
