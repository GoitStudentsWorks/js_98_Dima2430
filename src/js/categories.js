import axios from 'axios';

// const bookCardBtn = document.querySelector('.book-card-btn');
// // const chooseButton = document.querySelector('.buttonChoose');
// // const categoriesSelect = document.getElementById('categories');
// let selectedCategory = '';


// bookCardBtn.addEventListener('click', function() {
//     selectedCategory = bookCardBtn.dataset.category;
    
//     console.log(selectedCategory);
//     loadBooks(selectedCategory)
//     .then((result) => {
//         renderBooks(result, selectedCategory);

//     }).catch((err) => {
        
//     });

// });
const bookCardBtn = document.querySelectorAll('.book-card-btn');
const booksContainer = document.querySelector('.best-books-gallery');
// const chooseButton = document.querySelector('.buttonChoose');
// const categoriesSelect = document.getElementById('categories');

booksContainer.addEventListener('click', onSeeMoreBtnClick);

function onSeeMoreBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const target = e.target;
  try {
    if (target.matches('button[data-category]')) {
      const category = target.dataset.category;

      loadBooks(category)
        .then(result => {
          renderBooks(result, category);
        })
        .catch(err => {});
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadBooks(category) {
    try{
        
        const response = await axios.get(`https://books-backend.p.goit.global/books/category?category=${category}`);
        return response.data;
        
    }
    catch(error){
        console.log(error);
        return;
    }
}

function booksMarkup({_id, book_image, title, author}){
    return `
    <li class="book-card" data-id="${_id}">
      <div class="book-thumb">
        <img class="book-cover" src="${book_image}" alt="${title}"/>
        </div>
        <div class="book-descr">
        <h2 class="book-name">${title}</h2>
        <h3 class="book-author">${author}</h3>
        </div>
      </li>`;
}

function renderBooks(books, nc){
    // separatesWordsAddToTitle(nc);
    const markup = books.map(booksMarkup).join('');
    const categoriesList = `<ul class="category-books">${markup}</ul>`;
    const booksCategory = `<h2 class="category-title">${nc}</h2>${categoriesList}`;
    console.log(markup);
    const booksContainer = document.querySelector('.best-books-gallery');
    booksContainer.innerHTML = booksCategory;
}


// // Додавання назви категорії до заголовку та кольору
// function separatesWordsAddToTitle(event) {
    
//     const categoryBooksTitle = document.querySelector('.');
//     const currentCategory = event.target.textContent;
//     const arrrayCurrentCategory = currentCategory.split(' ');
//     const lastElementBookTitle = arrrayCurrentCategory.pop();
//     const wordsOfCategoryTitle = arrrayCurrentCategory.join(' ');
  
//     categoryBooksTitle.textContent = wordsOfCategoryTitle;
//     const textEl = document.createElement('span');
//     textEl.classList.add('last_word_category_title');
//     textEl.textContent = lastElementBookTitle;
//     categoryBooksTitle.appendChild(textEl);
  
    
//   }

//   // Рендеринг списку книг
// function renderBooksList(books, event) {
//     bestsellersContainer.style.display = 'none';
//     categoryBooksContainer.style.display = 'flex';
//     separatesWordsAddToTitle(event);
//     checksBooks(books);
  
//     const markup = books.map(book => generateBookMarkup(book)).join('');
//     categoryBooks.insertAdjacentHTML('beforeend', markup);
//   }

//   function onButtonClick(event) {
//     if (event.target.className !== 'category_button') {
//       return;
//     }