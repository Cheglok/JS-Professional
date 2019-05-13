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
    this.allProductsInBasket = [];
    this.containerBasket = container;
    this._init();
  }

  _init() {
    this._getBasket()
      .then(() => {
        this._renderBasket();
      });
    this.setHandler();
  }

  setHandler() {
    let btnBasket = document.querySelector('.btn-basket');
    let basket = document.querySelector('.basket');
    btnBasket.addEventListener('click', () => this.showBasket(basket));
  }

  showBasket(element) {
    element.style.display === 'none' ? element.style.display = '' :  element.style.display = 'none'
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
    blockBasket.insertAdjacentHTML('beforeend', (`<p>${this._countTotalPrice()}</p>`));
  }

  _countTotalPrice() {
    return this.productsInBasket.reduce((accum, item) => accum += item.price, 0);
  }
}

class BasketItem {
  constructor(product, img = 'https://placehold.it/80x80') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.quantity = product.quantity;
    this.img = img;
  }

  render() {
    return `<div class="basket-product-item">              
              <img src=${this.img} alt=${this.product_name} class="basket-product-picture" width="80" height="80">
              <div class="text-content">
                <h3>${this.product_name}</h3>
                <p>Цена: ${this.price}</p>
                <p>Количество: ${this.quantity}</p>
                <p>Общая цена: ${this.quantity * this.price}</p>
              </div>              
              <button class="del-btn">Удалить</button>
            </div>`;
  }
}

const basket = new Basket();
