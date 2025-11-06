const buttons = document.querySelectorAll('.slider-games__line-btn');
const bg = document.querySelector('.slider-games__line-bg');

function moveBg(target) {
  const rect = target.getBoundingClientRect();
  const parentRect = target.parentElement.getBoundingClientRect();

  bg.style.width = `${rect.width}px`;
  bg.style.height = `${rect.height}px`;
  bg.style.transform = `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`;
}

function updateActiveBg() {
  const activeBtn = document.querySelector('.slider-games__line-btn.active');
  if (activeBtn) moveBg(activeBtn);
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.slider-games__line-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    moveBg(btn);
  });
});

// при загрузке
window.addEventListener('load', updateActiveBg);

// при ресайзе — с небольшой задержкой для производительности
window.addEventListener('resize', () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(updateActiveBg, 150);
});






