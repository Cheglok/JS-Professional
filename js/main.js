class ProductsList {
  constructor(container = '.products') {
    this.products = [];
    this.allProducts = [];
    this.container = container;
    this.totalPrice = 0;
    this._init();
  }

  _init() {
    this._fetchProducts();
    this._countTotalPrice();
    this._render();
  }

  _fetchProducts() {
    this.products = [
      {id: 1, title: 'Notebook', price: 2000, src: "img/notebook.jpg"},
      {id: 2, title: 'Mouse', price: 20, src: "img/mouse.jpg"},
      {id: 3, title: 'Keyboard', price: 35, src: "img/keyboard.jpg"},
      {id: 4, title: 'Gamepad', price: 65, src: "img/gamepad.jpg"},
      {id: 5, title: 'Notebook', price: 2000, src: "img/notebook.jpg"},
      {id: 6, title: 'Mouse', price: 20, src: "img/mouse.jpg"},
      {id: 7, title: 'Keyboard', price: 35, src: "img/keyboard.jpg"},
      {id: 8, title: 'Gamepad', price: 65, src: "img/gamepad.jpg"},
    ];
  }

  _render() {
    const block = document.querySelector(this.container);
    const el = document.querySelector('main');
    for (let product of this.products) {
      const prodObj = new ProductItem(product);
      this.allProducts.push(prodObj);
      block.insertAdjacentHTML('beforeend', prodObj.render());
    }
    el.insertAdjacentHTML('beforeend', `<h1>Общая цена равняется ${this.totalPrice}$</h1>`);
  }

  //Оставил этой функции единственную задачу - считать стоимость,
  //а отображение на странице отправил в общий метод render
  _countTotalPrice() {
    for (let product of this.products) {
      this.totalPrice += product.price;
    }
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.src = product.src;
  }

  render() {
    return `<div class="product-item">
              <h3>${this.title}</h3>
              <img src=${this.src} alt=${this.title} class="product-picture" width="200" height="200">
              <p>${this.price}</p>
              <button class="buy-btn">Купить</button>
            </div>`;
  }
}

const products = new ProductsList();

/*
class Cart {
  constructor(container = '.cart') {
    this.productsInCart = [];
    this.container = container;
  }

  Необходимо получить массив товаров извне. Этот метод пусть вызывает сама корзина
  _getProducts() {
    this.productsInCart = [/!*Какой-то массив, собранный на странице*!/]
  }

  Подсчитать общую стоимость товаров. Пусть тоже работает автоматически
  _countTotalPrice(){};

  Отобразить всю корзину. Этот метод активируется извне, по кнопке "Показать корзину"
  render(){};

  иметь возможность очистить всю корзину
  clearCart(){};

  вызвать оформление заказа
  initCheckout(){};
}

class CartItem {
  constructor() {
  this.properties=[];
  }
  Получить извне свойства товара(название, цена, картинка...)
  _getProperties(){};

  Удалить из корзины
  deleteItem(){};

  Добавить аналогичный
  addMore(){};

  добавить в избранное
  addToFavorites(){};

  выбрать опции(например расширенную гарантию)
  setOptions(){};

  показать наличие в магазинах(на карте)
  showOnMap(){};
}

const products = new ProductsList();
*/
