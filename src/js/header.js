const themeSwitch = document.querySelector('.theme-switch-input');
const body = document.querySelector('body');
const menuOpenButton = document.querySelector('.menu-open-btn');
const menuCloseButton = document.querySelector('.menu-close-btn');

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

// Функція для зміни кольору шрифтів
function toggleFontColor() {
  const body = document.querySelector('body');
  
  if (body.classList.contains('dark-theme')) {
      body.style.color = 'white'; // Змінюємо колір шрифтів для темної теми
  } else {
      body.style.color = 'black'; // Змінюємо колір шрифтів для світлої теми
  }
}

// Викликаємо функцію при завантаженні сторінки
toggleFontColor();

// Додавання подій для зміни кольору шрифтів при зміні теми
themeSwitch.addEventListener('change', toggleFontColor);
themeSwitch.addEventListener('click', toggleFontColor);


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
  mobMenu.classList.add('is-open');
  menuOpenButton.classList.remove('is-open')
  menuOpenButton.classList.add('hidden');
  menuCloseButton.classList.remove('hidden');
});

// Закриття меню при кліку на кнопку закриття
  menuCloseButton.addEventListener('click', () => {
  mobMenu.classList.remove('is-open');
  menuOpenButton.classList.remove('hidden');
  menuCloseButton.classList.add('hidden');

});


