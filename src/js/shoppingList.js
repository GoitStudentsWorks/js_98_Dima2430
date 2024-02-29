
const slistGalleryEl = document.querySelector('.slist-card-section');
const background = document.querySelector('.slist-demo-thumb');
// console.log(slistGalleryEl);



import { STORAGE_KEY } from "./local-storage"          //ключ
                
 
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

                      <img class="img-amazone logo" src="./img/amazon.png" alt="app">
                     </a>

                    </li>

                    <li class="slist-nav-item">
                      <a href="${appleURL}" class="slist-nav-link"><img class="img-app logo" src="./img/ibook.png" alt="app"></a>
                      
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









//  const addedBook2 = {
//     id: "643282b1e85766588626a080",
//     book_image: "https://storage.googleapis.com/du-prd/books/images/9781982185824.jpg",
//     author: "Harlan Coben",
//     list_name: "Audio Fiction",
//     description: "",
//     title: "FIND YOU",
//     amazonURL: "https://www.amazon.com/dp/1538748363?tag=NYTBSREV-20",
//     appleURL: "https://goto.applebooks.apple/9781543661385?at=10lIEQ",
//     };



// function saveToLS(STORAGE_KEY, value) {
//   const jsonData = JSON.stringify(value);
//   localStorage.setItem(STORAGE_KEY, jsonData);
// }; 

// function onAddBtnClick() {

    
//     STORAGE_KEY = addedBook2.id;     // дістаємо id з форми
//     saveToLS(STORAGE_KEY, addedBook2);
// };

// saveToLS('643282b1e85766588626a080', addedBook2);


