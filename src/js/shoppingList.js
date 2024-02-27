
const slistGalleryEl = document.querySelector('.slist-card-section');
const background = document.querySelector('.slist-demo-thumb');




const STORAGE_KEY = "local-storage-books";                 //ключ
 
function loadFromLS(key) {
  try {
   
      const data = localStorage.getItem(key);
      const result = JSON.parse(data);
        return result;
  } catch {console.log('error');
    showbackground(); }
         
};

   

const array = loadFromLS(STORAGE_KEY);

  

renderImages(array);     //рендеримо розмітку

  


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
                <h4 class="slist-book-category">${list_name}</h4>
                <p class="slist-book-description">${description}</p>
                <h5 class="slist-book-autor">${author}</h5>

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
   
  if (array === null || array === [] || !STORAGE_KEY) {
    
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
   
    const jsonString = localStorage.getItem(STORAGE_KEY);
    let currentArray = JSON.parse(jsonString);
    localStorage.removeItem(STORAGE_KEY)
     currentArray.splice(
      currentArray.findIndex(item => item.id === bookId),
      1
    );
    console.log(currentArray);
    if (currentArray.length < 1) {
      localStorage.removeItem(STORAGE_KEY);
      slistGalleryEl.innerHTML = "";
      showbackground(); 
    } else {
    const updatedJsonString = JSON.stringify(currentArray);
      localStorage.setItem(STORAGE_KEY, updatedJsonString);
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





