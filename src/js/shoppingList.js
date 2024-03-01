
import axios from 'axios';

const slistGalleryEl = document.querySelector('.slist-card-section');
const background = document.querySelector('.slist-demo-thumb');


// import { STORAGE_KEY } from "./local-storage"          //ключ
const STORAGE_KEY = "local-storage-books"; 
let booksIDarray = [];
const myStoreKey = "my-key";  
let myLsArr = [];

//  закидаємо до ЛС обєкт 
function loadFromLS(key) {
  try {
   
      const data = localStorage.getItem(key);
      const result = JSON.parse(data);
      console.log(result);
      booksIDarray = result.map(item => item.dataId);   
      console.log(booksIDarray);
        return booksIDarray;
  } catch {console.log('error');
    showbackground(); }
         
};
const arrOfId = loadFromLS(STORAGE_KEY);

//  оновлюємо ЛС зі своїм ключем і розміткою

updateLocalStorage(booksIDarray); 

async function updateLocalStorage(array) {
   
  if (array.length === 0 ) {
    
    showbackground(); 
  } else {
      
      for (const item of array) {
          console.log(item);
        const currentBook = await getbook(item);
        console.log(currentBook);
        myLsArr.push(currentBook);
        const updatedJsonString = JSON.stringify(myLsArr);

        // зберігаємо строку JSON в localStorage під ключем
        localStorage.setItem(myStoreKey, updatedJsonString);
      }
    
    } 
};

async function getbook(bookId) {
    const BASE_URL = `https://books-backend.p.goit.global/books/${bookId}`;
    
    try {
        const res = await axios.get(BASE_URL);
        console.log(res.data);
        return res.data;

   
    } catch (error) {
        console.log('Результатів не знайдено.');
    };

};
 
// витягуємо зі свого ЛС та рендеримо

function loadFromMYLS(key) {
  try {
   
      const data = localStorage.getItem(key);
      const result = JSON.parse(data);
        return result;
  } catch {console.log('error');
    showbackground(); }
         
};

   
const array = loadFromMYLS(myStoreKey);

renderImages(array);     //рендеримо розмітку

  
function imageTemplate({ _id, book_image,title,list_name,description,author,amazonURL,appleURL}) {
  return `<div class="slist-card-list">
            <div class="slist-card-item">
              <button type="button" data-id=${_id} class="slist-del-btn js-slist-del-btn">
              </button>
              <div class="slist-card-picture">
                <img src="${book_image}" class="slist-book-img" alt="books" />
              </div>
              <div class="slist-info-container">
                <h3 class="slist-book-header">${title}</h3>
                <h4 class="slist-book-category">${list_name}</h4>
                <p class="slist-book-description">${description}</p>
                <h5 class="slist-book-autor">${author}</h5>

                <div class="slist-nav">
                  <ul class="slist-nav-list">
                    <li class="slist-nav-item">
                      <a href="${amazonURL}" class="slist-nav-link">

                      <img class="img-amazone logo" src="./img/amazonicon.png" alt="app">
                     </a>

                    </li>

                    <li class="slist-nav-item">
                      <a href="${appleURL}" class="slist-nav-link"><img class="img-app logo" src="./img/appbook.png" alt="app"></a>
                      
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>`};



function imagesTemplate(array) {
  return array.map(imageTemplate).join('');
      
};

function renderImages(array) {
   
  if (array === null || array === [] || !myStoreKey) {
    
    showbackground(); 
  } else {
   const markup = imagesTemplate(array);
  slistGalleryEl.innerHTML = markup;
    slistGalleryEl.addEventListener('click', onBtnClick);
    } // ставимо слухача на форму
};



 async function onBtnClick(e) {
   if (e.target.nodeName === 'BUTTON') {
    console.log(e.target.dataset.id);
  
    let bookId = (e.target.dataset.id);//знаходимо по ід на кнопку повішену
   
    const jsonString = localStorage.getItem(myStoreKey);
    let currentArray = JSON.parse(jsonString);
    localStorage.removeItem(myStoreKey)
     currentArray.splice(
      currentArray.findIndex(item => item.id === bookId),
      1
    );
    console.log(currentArray);
    if (currentArray.length < 1) {
      localStorage.removeItem(myStoreKey);
      slistGalleryEl.innerHTML = "";
      showbackground(); 
    } else {
    const updatedJsonString = JSON.stringify(currentArray);
      localStorage.setItem(myStoreKey, updatedJsonString);
      renderImages(currentArray);
    };
        
      
  };


};

function hidebackground() {
    background.classList.add('is-hidden');
};


function showbackground() {
  background.classList.remove('is-hidden');

};


