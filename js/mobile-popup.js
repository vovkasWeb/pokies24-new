import { pagas } from './obj.js'; // если у тебя отдельный файл с объектом

const menuBtn = document.querySelector('.main-home__mobileMenu-btn');
const menuPopup = document.querySelector('.popup-mobileMenu');

// стек истории для возврата назад
let historyStack = [];

// показать меню
menuBtn.addEventListener('click', () => {
  menuPopup.classList.toggle('active');
  if (menuPopup.classList.contains('active')) {
    renderMenu(pagas); // первый уровень
  }
});

// рендер меню по объекту
function renderMenu(obj, parentTitle = null) {
  menuPopup.innerHTML = ''; // очистить меню

  // если это подменю — добавить кнопку "Назад"
  if (parentTitle) {
    const backBtn = document.createElement('button');
    backBtn.className = 'popup-mobileMenu__back';
    backBtn.innerHTML =`
        <span>${parentTitle}</span>
        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.204905 5.49462C-0.0682659 5.22145 -0.0682659 4.77855 0.204905 4.50538L4.65648 0.0538052C4.92965 -0.219365 5.37255 -0.219365 5.64572 0.0538053C5.91889 0.326976 5.91889 0.769874 5.64572 1.04304L1.68876 5L5.64572 8.95695C5.91889 9.23013 5.91889 9.67302 5.64572 9.94619C5.37255 10.2194 4.92965 10.2194 4.65648 9.94619L0.204905 5.49462ZM0.699524 5L0.699524 4.3005L11.6995 4.3005L11.6995 5L11.6995 5.6995L0.699524 5.6995L0.699524 5Z" fill="#7B6CAC"/>
        </svg>`;
    backBtn.addEventListener('click', () => {
      const prev = historyStack.pop();
      renderMenu(prev.obj, prev.title);
    });
    menuPopup.appendChild(backBtn);
  }

  // список пунктов
  Object.entries(obj).forEach(([key, value]) => {
    const link = document.createElement('a');
    link.href = value.url;
    link.className = 'popup-mobileMenu__link';
    link.innerHTML = `
      <span>${value.name}</span>
      ${Object.keys(value.pages).length
        ? `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4946 5.64599C11.7678 5.37281 11.7678 4.92992 11.4946 4.65675L7.04304 0.205172C6.76987 -0.067998 6.32698 -0.067998 6.05381 0.205172C5.78063 0.478343 5.78063 0.921241 6.05381 1.19441L10.0108 5.15137L6.05381 9.10832C5.78064 9.38149 5.78064 9.82439 6.05381 10.0976C6.32698 10.3707 6.76987 10.3707 7.04305 10.0976L11.4946 5.64599ZM11 5.15137L11 4.45187L0 4.45187L0 5.15137L0 5.85086L11 5.85086L11 5.15137Z" fill="#D4CBF2"/>
          </svg>`
        : ''
      }
    `;

    // если есть подстраницы — переходим внутрь
    if (Object.keys(value.pages).length > 0) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        historyStack.push({ obj, title: parentTitle }); // сохранить текущее
        renderMenu(value.pages, value.name);
      });
    }

    menuPopup.appendChild(link);
  });
}
