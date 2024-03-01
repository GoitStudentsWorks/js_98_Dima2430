import axios from 'axios';
const STORAGE_KEY = "local-storage-books";
const storedBooks = {};
let dataId ;
let dataBookId = dataId;


document.addEventListener('DOMContentLoaded', function () {
  const parentContainer = document.getElementById('container');
  const modal = document.getElementById('myModal');
  const shoppingListBtn = document.getElementById('shoppingListBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const notification = document.getElementById('notification');
  const modalContent = document.querySelector('.modal-content');

  parentContainer.addEventListener('click', function (event) {
      const clickedElement = event.target.closest('.book-card');

      if (clickedElement) {
          dataId = clickedElement.dataset.id;
          dataBookId = dataId;
          console.log(dataId)
          openModal(dataId);
      }
  });

  closeModalBtn.addEventListener('click', function () {
      closeModal();
  });

  window.addEventListener('click', function (event) {
      if (event.target === modal) {
          closeModal();
      }
  });

shoppingListBtn.addEventListener('click', function () {
  toggleShoppingList();
});

function toggleShoppingList() {
  const bookId = shoppingListBtn.dataset.bookId; // Assuming dataId is stored in dataset

  if (shoppingListBtn.textContent === "Add to shopping list") {
    onAddBtnClick();
    showNotification('Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.');
    expandModalContent();
  } else {
    hideNotification();
    collapseModalContent();
    onDeleteBtnClick(bookId);  // Pass bookId to onDeleteBtnClick
    shoppingListBtn.textContent = "Add to shopping list";
  }
}

async function onAddBtnClick() {
  // Отримати поточний масив об'єктів з localStorage
  const jsonString = localStorage.getItem(STORAGE_KEY);
  let currentArray;

  try {
    currentArray = jsonString ? JSON.parse(jsonString) : [];
  } catch (error) {
    console.log('Помилка при парсингу JSON:', error);
    return;
  }

  // Створити новий об'єкт з dataId
  const newObject = {
    dataId: dataId, // Функція для генерації унікального ID
  };

  // Перевірити, чи існує вже такий об'єкт в масиві
  if (currentArray.every(item => item.dataId !== newObject.dataId)) {
    currentArray.push(newObject);

    // Перетворити масив JavaScript в JSON-рядок
    const updatedJsonString = JSON.stringify(currentArray);

    // Зберегти JSON-рядок в localStorage
    try {
      localStorage.setItem(STORAGE_KEY, updatedJsonString);
    } catch (error) {
      console.log('Помилка при зберіганні даних:', error);
    }
  }
  shoppingListBtn.textContent = "Remove from the shopping list";
}

async function onDeleteBtnClick(bookId) {
  const storedBooks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const bookIndex = storedBooks.findIndex(item => item.dataId === dataBookId); // Find book by dataId

  if (bookIndex !== -1) {
    storedBooks.splice(bookIndex, 1); // Remove the book from the array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedBooks)); // Update localStorage
    shoppingListBtn.textContent = "Add to shopping list";
  } else {
    console.log('Book with dataId:', dataBookId, 'not found in localStorage');
  }
}

  function showNotification(message) {
      notification.innerHTML = `<span>${message}</span>`;
      notification.style.display = 'block';
  }

  function hideNotification() {
      notification.style.display = 'none';
  }

  function expandModalContent() {
      modalContent.classList.add('expanded');
  }

  function collapseModalContent() {
      modalContent.classList.remove('expanded');
  }

  function openModal(bookId) {

      loadBookData(bookId);
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
  }

  function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; 
  }
});

function loadBookData(bookId) {
  fetch('https://books-backend.p.goit.global/books/top-books')
      .then(response => response.json())
      .then(data => {
          for (const list of data) {
              const book = list.books.find(book => book._id === bookId);
              if (book) {
                  fillModalContent(book);
                  return;
              }
          }
          console.error('Book not found.');
      })
      .catch(error => console.error('Error fetching data:', error));
}

function fillModalContent(book) {
  const bookNameElement = document.querySelector('.book_name');
  const authorElement = document.querySelector('.author');
  const descriptionElement = document.querySelector('.description');
  const bookImageElement = document.querySelector('.img_modal');

  const amazonLinkElement = document.querySelector('.links a[name="Amazon"]');
  const appleBooksLinkElement = document.querySelector('.links a[name="Apple Books"]');

  bookNameElement.textContent = book.title;
  authorElement.textContent = book.author;
  descriptionElement.textContent = book.description;
  bookImageElement.src = book.book_image;

  if (amazonLinkElement) {
      const amazonLink = book.buy_links.find(link => link.name === 'Amazon');
      if (amazonLink) {
          amazonLinkElement.href = amazonLink.url;
      }
  }

  if (appleBooksLinkElement) {
      const appleBooksLink = book.buy_links.find(link => link.name === 'Apple Books');
      if (appleBooksLink) {
          appleBooksLinkElement.href = appleBooksLink.url;
      }
  }

}
setInterval(()=>{
  console.log(localStorage);
  // localStorage.clear();
},2000)