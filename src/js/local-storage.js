// const addBn = document.querySelector('.added');   кнопка додавання картки до локал сторедж

let STORAGE_KEY;

// книги для прикладу

// const addedBook1 = {
//     id: "643282b1e85766588626a0dc",
//     book_image: "https://storage.googleapis.com/du-prd/books/images/9781538748367.jpg",
//     author: "Harlan Coben",
//     list_name: "Audio Fiction",
//     description: "A man imprisoned for murdering his 3-year-old son becomes convinced his son is still alive and plans an escape. Read by Steven Weber. 10 hours, 16 minutes unabridged.",
//     title: "I WILL FIND YOU",
//     amazonURL: "https://www.amazon.com/dp/1538748363?tag=NYTBSREV-20",
//     appleURL: "https://goto.applebooks.apple/9781543661385?at=10lIEQ",
// };

   const addedBook2 = {
    id: "643282b1e85766588626a080",
    book_image: "https://storage.googleapis.com/du-prd/books/images/9781982185824.jpg",
    author: "Harlan Coben",
    list_name: "Audio Fiction",
    description: "",
    title: "FIND YOU",
    amazonURL: "https://www.amazon.com/dp/1538748363?tag=NYTBSREV-20",
    appleURL: "https://goto.applebooks.apple/9781543661385?at=10lIEQ",
    };


function saveToLS(STORAGE_KEY, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(STORAGE_KEY, jsonData);
};

addBn.addEventListener('click', onAddBtnClick);
function onAddBtnClick() {

    
    STORAGE_KEY = addedBook1.id;     // дістаємо id з форми
    saveToLS(STORAGE_KEY, addedBook1);
};

// saveToLS('643282b1e85766588626a080', addedBook2);