const btnHome = document.querySelector('.main-home__btn');
const popupHome = document.querySelector('.main-home__popup');
const btnText = btnHome.querySelector('.main-home__btn-text');
const btnIcon = btnHome.querySelector('.main-home__btn-icon');

btnHome.addEventListener('click', () => {
  popupHome.classList.toggle('active');
  btnHome.classList.toggle('active');

  if (btnIcon.style.display === 'block') {
    btnText.style.display = 'block';
    btnIcon.style.display = 'none';
  } else {
    btnIcon.style.display = 'block';
    btnText.style.display = 'none';
    console.log('dd')
  }
});
