// ВЗАЄМОДІЯ ІЗ ВІКНОМ
document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('myModal');
  
    openModalBtn.addEventListener('click', function () {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  
    closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
      }
    });
  
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
});

// РОЗШИРЕННЯ ВІКНА ПРИ ДОДАВАННІ ДО ЛОКАЛ СТОРЕДЖА
document.addEventListener('DOMContentLoaded', function () {
    const shoppingListBtn = document.getElementById('shoppingListBtn');
    const notification = document.getElementById('notification');
    const modalContent = document.querySelector('.modal-content');
  
    shoppingListBtn.addEventListener('click', function () {
        toggleShoppingList();
    });
  
    function toggleShoppingList() {
        if (shoppingListBtn.textContent === "Add to shopping list") {
            addToShoppingList();
            showNotification('Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.');
            expandModalContent();
        } else {
            removeFromShoppingList();
            hideNotification();
            collapseModalContent();
        }
    }
  
    function addToShoppingList() {
        // TEST ще ніц нема
        alert("Додано до локального сховища!");
        shoppingListBtn.textContent = "Remove from the shopping list";
    }
  
    function removeFromShoppingList() {
        // TEST ще ніц нема
        alert("Видалено з локального сховища!");
        shoppingListBtn.textContent = "Add to shopping list";
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
});
  

// ІНІЦІАЛІЗАЦІЯ ЗА id ТА ДОДАВАННЯ КОНТЕНТУ
document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('myModal');
    // test
    openModalBtn = loadBookData('643282b1e85766588626a0c2');
  
    openModalBtn.addEventListener('click', function () {
      loadBookData(bookId);
      modal.style.display = 'block';
    });
  
    closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
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
