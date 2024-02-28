// const addBn = document.querySelector('.added');   кнопка додавання картки до локал сторедж



export const STORAGE_KEY = "local-storage-books";   // назву залишити



// книги для прикладу
const addedBook1 = {
    id: "643282b1e85766588626a0dc",
    book_image: "https://storage.googleapis.com/du-prd/books/images/9781538748367.jpg",
    author: "Harlan Coben",
    list_name: "Audio Fiction",
    description: "A man imprisoned for murdering his 3-year-old son becomes convinced his son is still alive and plans an escape. Read by Steven Weber. 10 hours, 16 minutes unabridged.",
    title: "I WILL FIND YOU",
    amazonURL: "https://www.amazon.com/dp/1538748363?tag=NYTBSREV-20",
    appleURL: "https://goto.applebooks.apple/9781543661385?at=10lIEQ",
};

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




// addBn.addEventListener('click', onAddBtnClick);  // кнопка
function onAddBtnClick() {

// отримуємо поточний массив объектів из localStorage
const jsonString = localStorage.getItem(STORAGE_KEY);
let currentArray = jsonString ? JSON.parse(jsonString) : [];

    
    // додаємо новий обьект в масив
    const newObject = addedBook1;                 //тут саме обьєкт
    // перевіряємо  на співпадіння
    if (currentArray.every(item => item.id !== newObject.id)) {
        
        currentArray.push(newObject);
   };

// масив в строку JSON
const updatedJsonString = JSON.stringify(currentArray);

// зберігаємо строку JSON в localStorage під ключем
localStorage.setItem(STORAGE_KEY, updatedJsonString);

   
};


onAddBtnClick(STORAGE_KEY);












