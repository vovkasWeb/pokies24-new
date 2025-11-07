const buttons = document.querySelectorAll('.slider-games__line-btn');
const bg = document.querySelector('.slider-games__line-bg');
const container = document.querySelector('.slider-games__line');

function moveBg(target) {
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  // учёт горизонтального скролла
  const offsetLeft = rect.left - parentRect.left + container.scrollLeft;
  const offsetTop = rect.top - parentRect.top + container.scrollTop;

  bg.style.width = `${rect.width}px`;
  bg.style.height = `${rect.height}px`;
  bg.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
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

    // плавный авто-скролл, если кнопка выходит за границы
    const btnRect = btn.getBoundingClientRect();
    const lineRect = container.getBoundingClientRect();

    if (btnRect.left < lineRect.left || btnRect.right > lineRect.right) {
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  });
});

window.addEventListener('load', updateActiveBg);

window.addEventListener('resize', () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(updateActiveBg, 150);
});

// при скролле полосы — фон остаётся на месте
container.addEventListener('scroll', updateActiveBg);