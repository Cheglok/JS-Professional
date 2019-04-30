const products = [
    {id: 1, title: 'Notebook', price: 2000, src: "img/notebook.jpg"},
    {id: 2, title: 'Mouse', price: 20, src: "img/mouse.jpg"},
    {id: 3, title: 'Keyboard', price: 35, src: "img/keyboard.jpg"},
    {id: 4, title: 'Gamepad', price: 65, src: "img/gamepad.jpg"},
    {id: 5, title: 'Notebook', price: 2000, src: "img/notebook.jpg"},
    {id: 6, title: 'Mouse', src: "img/mouse.jpg"},
    {id: 7, title: 'Keyboard', price: 35, src: "img/keyboard.jpg"},
    {id: 8, title: 'Gamepad', price: 65},
];

const renderProduct = (title, price = "Цена не определена", src = "img/no-picture.jpg") =>
  `<div class="product-item">
      <h3>${title}</h3>
      <img src=${src} alt="товар" class="product-picture">
      <p>${price}</p>
      <button class="buy-btn">Купить</button>
  </div>`;
//Поскольку всё, что делает функция - это возвращает некоторое значение, можно убрать фигурные скобки и return

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price, item.src));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join("");
};
//Когда мы вставляем массив в innerHTML он преобразуется в строку по встроенному методу toString.
// По умолчанию, в этом методе вставляется разделитель - запятая.
// Можно самостоятельно установить метод Join и в нём разделитель - любой символ, пробел,
// или даже пустую строку, то есть ничего.
renderPage(products);
//Сделал отдельный пулл-реквест, чтобы не было красно-зелёной зебры в изменённых файлах