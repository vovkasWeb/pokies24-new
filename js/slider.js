const sliderWrapper = document.querySelector('.slider-games__content-wrapper');
const btnLeft = document.querySelector('.slider-games__btn-left');
const btnRight = document.querySelector('.slider-games__btn-right');

let originalSlides = Array.from(sliderWrapper.children).map(s => s.cloneNode(true)); 
let slides, slideWidth, totalSlides, position;
let isAnimating = false;
let startX = 0;
let isTouching = false;

function initSlider() {
  sliderWrapper.innerHTML = '';
  sliderWrapper.append(...originalSlides.map(s => s.cloneNode(true)));

  const curSlides = Array.from(sliderWrapper.children);
  const clonesBefore = curSlides.map(s => s.cloneNode(true));
  const clonesAfter = curSlides.map(s => s.cloneNode(true));
  sliderWrapper.prepend(...clonesBefore);
  sliderWrapper.append(...clonesAfter);

  // Дождаться, пока браузер применит стили (особенно media queries)
  requestAnimationFrame(() => {
    slides = Array.from(sliderWrapper.children);
    slideWidth = slides[0].getBoundingClientRect().width;
    totalSlides = slides.length;
    position = Math.floor(totalSlides / 3);

    // === 👇 Добавляем "peek" при ширине меньше 550px ===
    const isMobilePeek = window.innerWidth <= 550;
    const peekOffset = isMobilePeek ? slideWidth * 0.5 : 0; 
    // 0.25 = половина от половины слайда → видны по бокам

    function updateTransform(withTransition = true) {
      sliderWrapper.style.transition = withTransition ? 'transform 0.4s ease' : 'none';
      sliderWrapper.style.transform = `translateX(${-slideWidth * position + peekOffset}px)`;
    }

    function scrollRight() {
      if (isAnimating) return;
      isAnimating = true;
      position++;
      updateTransform(true);

      sliderWrapper.addEventListener('transitionend', function tr() {
        if (position >= totalSlides - Math.floor(totalSlides / 3)) {
          position = Math.floor(totalSlides / 3);
          updateTransform(false);
        }
        isAnimating = false;
        sliderWrapper.removeEventListener('transitionend', tr);
      });
    }

    function scrollLeft() {
      if (isAnimating) return;
      isAnimating = true;
      position--;
      updateTransform(true);

      sliderWrapper.addEventListener('transitionend', function tl() {
        if (position <= Math.floor(totalSlides / 3) - 1) {
          position = totalSlides - Math.floor(totalSlides / 3) - 1;
          updateTransform(false);
        }
        isAnimating = false;
        sliderWrapper.removeEventListener('transitionend', tl);
      });
    }

    // Показываем/скрываем кнопки
    const viewportWidth = sliderWrapper.clientWidth;
    const originalsCount = originalSlides.length;
    if (viewportWidth >= originalsCount * slideWidth) {
      btnLeft.style.display = 'none';
      btnRight.style.display = 'none';
      sliderWrapper.style.justifyContent = 'center';
      sliderWrapper.style.transform = 'none';
      return;
    } else {
      btnLeft.style.display = 'flex';
      btnRight.style.display = 'flex';
    }

    // События
    btnRight.onclick = scrollRight;
    btnLeft.onclick = scrollLeft;

    sliderWrapper.ontouchstart = (e) => {
      if (isAnimating) return;
      startX = e.touches[0].clientX;
      isTouching = true;
    };
    sliderWrapper.ontouchend = (e) => {
      if (!isTouching) return;
      isTouching = false;
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) diff < 0 ? scrollRight() : scrollLeft();
    };

    updateTransform(false);
  });
}

initSlider();
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSlider, 250);
});
