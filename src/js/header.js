const themeSwitch = document.querySelector('.theme-switch-input');
const body = document.querySelector('body');
const menuOpenButton = document.querySelector('.menu-open-btn');
const menuCloseButton = document.querySelector('.menu-close-btn');
const mobMenu = document.querySelector('.menu-modal');
const booksBtn = document.querySelector('.book-card-btn');
const modal = document.querySelector('.modal-content')
const h1 = document.querySelectorAll('h1');
const h2 = document.querySelectorAll('h2');
const h4 = document.querySelectorAll('h4');
const h5 = document.querySelectorAll('h5');
const h6 = document.querySelectorAll('h6');
const a = document.querySelectorAll('a');

// Функція для зміни теми та збереження її в локальному сховищі
function toggleTheme() {
    if (themeSwitch.checked === false) {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light'); // Зберігаємо стан теми в локальному сховищі
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark'); // Зберігаємо стан теми в локальному сховищі
    }
}

// Перевірка, яка тема встановлена за замовчуванням
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    themeSwitch.checked = true;
    toggleTheme();
} else {
    themeSwitch.checked = false;
}

// Додавання події для перемикання теми
themeSwitch.addEventListener('change', toggleTheme);
themeSwitch.addEventListener('click', toggleTheme);


// функція додавання та видалення класу
const menu = document.querySelector('.header-menu');
  menu.addEventListener('click', function(event) {
    if (event.target.matches('.header-menu-link')) {

      const links = menu.querySelectorAll('.header-menu-link');
      links.forEach(link => {
        link.classList.remove('exception');
      });
   event.target.classList.add('exception');
    }
  });
  
  
      
 
// Відкриття меню при кліку на кнопку відкриття
  menuOpenButton.addEventListener('click', () => {
  mobMenu.classList.add('menu-is-open');
  menuOpenButton.classList.remove('is-open');
  document.body.style.overflow = 'hidden';
  mobMenu.body.style.overflow = 'hidden';
  menuOpenButton.classList.add('hidden');
  menuCloseButton.classList.remove('hidden');
});

// Закриття меню при кліку на кнопку закриття
  menuCloseButton.addEventListener('click', () => {
  mobMenu.classList.remove('menu-is-open');
  menuOpenButton.classList.remove('hidden');
  document.body.style.overflow = 'auto';
  mobMenu.body.style.overflow = 'auto';
   menuCloseButton.classList.add('hidden');
 });




