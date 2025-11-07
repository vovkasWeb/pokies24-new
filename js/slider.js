const sliderWrapper = document.querySelector('.slider-games__content-wrapper');
const btnLeft = document.querySelector('.slider-games__btn-left');
const btnRight = document.querySelector('.slider-games__btn-right');

let originalSlides = Array.from(sliderWrapper.children).map(s => s.cloneNode(true));
let slides, slideWidth, totalSlides, position;
let isAnimating = false;
let startX = 0;
let currentX = 0;
let isTouching = false;
let rafScroll = null;

function initSlider() {
  // Очистка и новые клоны
  sliderWrapper.innerHTML = '';
  const originals = originalSlides.map(s => s.cloneNode(true));
  const clonesBefore = originals.map(s => s.cloneNode(true));
  const clonesAfter = originals.map(s => s.cloneNode(true));

  sliderWrapper.append(...clonesBefore, ...originals, ...clonesAfter);

  slides = Array.from(sliderWrapper.children);
  slideWidth = slides[0].getBoundingClientRect().width;
  totalSlides = slides.length;
  position = Math.floor(totalSlides / 3);

  const isMobilePeek = window.innerWidth <= 550;
  const peekOffset = isMobilePeek ? slideWidth * 0.5 : 0;

  function updateTransform(withTransition = true) {
    sliderWrapper.style.transition = withTransition ? 'transform 0.35s ease' : 'none';
    sliderWrapper.style.transform = `translateX(${-slideWidth * position + peekOffset}px)`;
  }

  function scrollRight() {
    if (isAnimating) return;
    isAnimating = true;
    position++;
    updateTransform(true);

    const onEnd = () => {
      if (position >= totalSlides - Math.floor(totalSlides / 3)) {
        position = Math.floor(totalSlides / 3);
        updateTransform(false);
      }
      isAnimating = false;
      sliderWrapper.removeEventListener('transitionend', onEnd);
    };
    sliderWrapper.addEventListener('transitionend', onEnd);
  }

  function scrollLeft() {
    if (isAnimating) return;
    isAnimating = true;
    position--;
    updateTransform(true);

    const onEnd = () => {
      if (position < Math.floor(totalSlides / 3)) {
        position = totalSlides - Math.floor(totalSlides / 3) - 1;
        updateTransform(false);
      }
      isAnimating = false;
      sliderWrapper.removeEventListener('transitionend', onEnd);
    };
    sliderWrapper.addEventListener('transitionend', onEnd);
  }

  // ==== Свайп ====
  sliderWrapper.addEventListener('touchstart', e => {
    if (isAnimating) return;
    startX = e.touches[0].clientX;
    currentX = startX;
    isTouching = true;
    sliderWrapper.style.transition = 'none';
    cancelAnimationFrame(rafScroll);
  });

  sliderWrapper.addEventListener('touchmove', e => {
    if (!isTouching) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    sliderWrapper.style.transform = `translateX(${-slideWidth * position + diff}px)`;
  });

  sliderWrapper.addEventListener('touchend', () => {
    if (!isTouching) return;
    isTouching = false;
    const diff = currentX - startX;

    if (Math.abs(diff) > 40) {
      diff < 0 ? scrollRight() : scrollLeft();
    } else {
      updateTransform(true);
    }
  });

  // ==== Кнопки ====
  btnRight.onclick = scrollRight;
  btnLeft.onclick = scrollLeft;

  updateTransform(false);
}

// === Перезапуск при resize ===
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSlider, 300);
});

initSlider();
