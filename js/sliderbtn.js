// const slider = document.querySelector('.slider-games__line');

//   let slides = Array.from(slider.children);
//   let slideWidth = slides[0].offsetWidth;

//   slides.forEach(slide => slider.appendChild(slide.cloneNode(true)));

//   let position = 0;
//   const totalSlides = slider.children.length;
//   const halfSlides = totalSlides / 2;
//   let isAnimating = false;

//   let startX = 0;
//   let startY = 0;
//   let isTouching = false;

//   document.addEventListener('touchstart', (e) => {
//     if (isAnimating) return;
//     isTouching = true;
//     startX = e.touches[0].clientX;
//     startY = e.touches[0].clientY;
//   });

//   document.addEventListener('touchmove', (e) => {
//     if (!isTouching) return;

//     const diffX = e.touches[0].clientX - startX;
//     const diffY = e.touches[0].clientY - startY;

//     if (Math.abs(diffX) > Math.abs(diffY)) {
//       e.preventDefault(); 
//     } else {
//       isTouching = false; 
//     }
//   }, { passive: false });

//   document.addEventListener('touchend', (e) => {
//     if (!isTouching) return;
//     isTouching = false;

//     const endX = e.changedTouches[0].clientX;
//     const diff = endX - startX;

//   });

//   window.addEventListener('resize', () => {
//     slideWidth = slides[0].offsetWidth;
//     slider.style.transition = 'none';
//     slider.style.transform = `translateX(${-slideWidth * position}px)`;
//   });