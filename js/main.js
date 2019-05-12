const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductsList {
  constructor(container = '.products') {
    this.products = [];
    this.allProducts = [];
    this.container = container;
    this._init();
  }

  _init() {
    this._fetchProducts()
      .then(() => {
        this._render();
      })
  }

  _fetchProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .then(data => {
        this.products = [...data];

      })
      .catch(error => console.log(error));
  }

  _render() {
    const block = document.querySelector(this.container);
    for (let product of this.products) {
      const prodObj = new ProductItem(product);
      this.allProducts.push(prodObj);
      block.insertAdjacentHTML('beforeend', prodObj.render());
    }
  }
}


class ProductItem {
  constructor(product, img = 'https://placehold.it/200x200') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item">
              <h3>${this.product_name}</h3>
              <img src=${this.img} alt=${this.product_name} class="product-picture" width="200" height="200">
              <p>${this.price}</p>
              <button class="buy-btn">Купить</button>
            </div>`;
  }
}

const products = new ProductsList();


class Basket {
  constructor(container = '.basket') {
    this.productsInBasket = [];
    this.allProductsInBasket =[];
    this.containerBasket = container;
    this._init();
  }

  _init() {
    this._getBasket()
      .then(() => {
        this._renderBasket();
      })
  }

  _getBasket() {
    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .then((data) => {
        this.productsInBasket = [...data['contents']];
      })
      .catch(error => console.log(error));
  }

  _renderBasket() {
    const blockBasket = document.querySelector(this.containerBasket);
    for (let product of this.productsInBasket) {
      const prodObj = new BasketItem(product);
      this.allProductsInBasket.push(prodObj);
      blockBasket.insertAdjacentHTML('beforeend', prodObj.render());
    }
    // _countTotalPrice() {
    //   return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    // }
  }
  }


  // Отобразить всю корзину. Этот метод активируется извне, по кнопке "Показать корзину"
  // render(){};
  //
  // иметь возможность очистить всю корзину
  // clearCart(){};
  //
  // вызвать оформление заказа
  // initCheckout(){};

class BasketItem {
  constructor(product, img = 'https://placehold.it/50x50') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }
  render() {
    return `<div class="basket-product-item">
              <h3>${this.product_name}</h3>
              <img src=${this.img} alt=${this.product_name} class="basket-product-picture" width="50" height="50">
              <p>${this.price}</p>
              <button class="del-btn">Удалить</button>
            </div>`;
  }
}

const basket = new Basket();
