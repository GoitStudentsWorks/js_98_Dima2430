
const slistGalleryEl = document.querySelector('.slist-card-section');
const background = document.querySelector('.slist-demo-thumb');

let key;                  //ключ
let arrOfBooks = [];       // збираємо данні localStorage в масив  


//завантажуємо з ЛС по данним ключа і збираємо в масив обєктів
function loadFromLS(key) {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      const data = localStorage.getItem(key);
      const result = JSON.parse(data);
      arrOfBooks.push(result);
 
    };
  } catch {console.log(error);}
         
};
      
  loadFromLS();
  


renderImages(arrOfBooks);     //рендеримо розмітку

  


function imageTemplate({ id, book_image,title,list_name,description,author,amazonURL,appleURL}) {
  return `<div class="slist-card-list">
            <div class="slist-card-item">
              <button type="button" data-id=${id} class="slist-del-btn js-slist-del-btn">
                <svg class="slist-del-btn-img">
                  <use href="./img/javascript.svg#trash"></use>
                </svg>
              </button>
              <div class="slist-card-picture">
                <img src="${book_image}" class="slist-book-img" alt="books" />
              </div>
              <div class="slist-info-container">
                <h3 class="slist-book-header">${title}</h3>
                <div class="slist-book-category">${list_name}</div>
                <p class="slist-book-description">${description}</p>
                <div class="slist-book-autor">${author}</div>

                <div class="slist-nav">
                  <ul class="slist-nav-list">
                    <li class="slist-nav-item">
                      <a href="${amazonURL}" class="slist-nav-link">
                      <svg class="img-amazone">
            <use href="./img/icons.svg#icon-amazon-pay"></use>
          </svg></a>
                    </li>

                    <li class="slist-nav-item">
                      <a href="${appleURL}" class="slist-nav-link"><img class="img-app" src="./img/ap.png" alt="app"></a>
                      
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
   if (localStorage.length === 0) {
    showbackground(); 
    }
    const markup = imagesTemplate(array);
  slistGalleryEl.innerHTML = markup;
 
  
   slistGalleryEl.addEventListener('click', onBtnClick); // ставимо слухача на форму 
};

  function onBtnClick(e) {
 

  if (e.target.nodeName === 'BUTTON') {
    console.log(e.target.dataset.id);
    let bookId = (e.target.dataset.id);//знаходимо по ід на кнопку повішену
    localStorage.removeItem(e.target.dataset.id);
    // console.log(arrOfBooks);
   const newarr = arrOfBooks.filter(item => (item.id === bookId));
    arrOfBooks.splice(
      arrOfBooks.findIndex(item => item.id === bookId),
      1
    );
    console.log(arrOfBooks);
        
    renderImages(arrOfBooks);
    
  };


};

function hidebackground() {
    background.classList.add('is-hidden');
};


function showbackground() {
  background.classList.remove('is-hidden');

};