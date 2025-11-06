const sliderWrapper = document.querySelector('.slider-games__content-wrapper');
const btnLeft = document.querySelector('.slider-games__btn-left');
const btnRight = document.querySelector('.slider-games__btn-right');

let originalSlides = Array.from(sliderWrapper.children); // сохраняем оригинальные слайды при загрузке

let slider;
let slides;
let slideWidth;
let totalSlides;
let position;
let isAnimating = false;

function initSlider() {
  // Очистим контейнер и вставим оригинальные слайды
  sliderWrapper.innerHTML = '';
  sliderWrapper.append(...originalSlides.map(slide => slide.cloneNode(true)));

  slider = sliderWrapper;
  slides = Array.from(slider.children);
  slideWidth = slides[0].offsetWidth;
  totalSlides = slides.length;

  // Если все слайды помещаются — отключаем кнопки
  if (slider.offsetWidth >= slides.length * slideWidth) {
    btnLeft.style.display = 'none';
    btnRight.style.display = 'none';
    slider.style.justifyContent = 'center';
    slider.style.transform = 'none';
    return;
  }

  // === Активируем бесконечный слайдер ===
  btnLeft.style.display = 'flex';
  btnRight.style.display = 'flex';

  // создаем дубликаты
  const clonesBefore = slides.map(slide => slide.cloneNode(true));
  const clonesAfter = slides.map(slide => slide.cloneNode(true));

  slider.prepend(...clonesBefore);
  slider.append(...clonesAfter);

  slides = Array.from(slider.children);
  totalSlides = slides.length;
  position = totalSlides / 3;

  function updateTransform(withTransition = true) {
    slider.style.transition = withTransition ? 'transform 0.4s ease' : 'none';
    slider.style.transform = `translateX(${-slideWidth * position}px)`;
  }

  function scrollRight() {
    if (isAnimating) return;
    isAnimating = true;
    position++;
    updateTransform(true);
    slider.addEventListener(
      'transitionend',
      () => {
        if (position >= totalSlides - totalSlides / 3) {
          position = totalSlides / 3;
          updateTransform(false);
        }
        isAnimating = false;
      },
      { once: true }
    );
  }

  function scrollLeft() {
    if (isAnimating) return;
    isAnimating = true;
    position--;
    updateTransform(true);
    slider.addEventListener(
      'transitionend',
      () => {
        if (position <= totalSlides / 3 - 1) {
          position = totalSlides - totalSlides / 3 - 1;
          updateTransform(false);
        }
        isAnimating = false;
      },
      { once: true }
    );
  }

  btnRight.onclick = scrollRight;
  btnLeft.onclick = scrollLeft;

  // свайп
  let startX = 0;
  let isTouching = false;

  slider.addEventListener('touchstart', (e) => {
    if (isAnimating) return;
    isTouching = true;
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      diff < 0 ? scrollRight() : scrollLeft();
    }
  });

  updateTransform(false);
}

// Инициализация
initSlider();

// При изменении ширины окна — перезапуск
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSlider, 300); // дебаунс
});
