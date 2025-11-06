const buttons = document.querySelectorAll('.slider-games__line-btn');
const bg = document.querySelector('.slider-games__line-bg');

function moveBg(target) {
  const rect = target.getBoundingClientRect();
  const parentRect = target.parentElement.getBoundingClientRect();

  bg.style.width = `${rect.width}px`;
  bg.style.height = `${rect.height}px`;
  bg.style.transform = `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`;
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.slider-games__line-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    moveBg(btn);
  });
});

// при загрузке сразу поставить фон под активную кнопку
window.addEventListener('load', () => {
  const activeBtn = document.querySelector('.slider-games__line-btn.active');
  if (activeBtn) moveBg(activeBtn);
});
