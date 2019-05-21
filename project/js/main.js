const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    basketUrl: '/getBasket.json',
    products: [],
    productsBasket: [],
    imgCatalog: 'https://placehold.it/200x150',
    imgBasket: 'https://placehold.it/50x50',
    searchLine: "",
    isVisibleCart: true,
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
        }
        console.log(this.products);
      });
    this.getJson(`getProducts.json`)
      .then(data => {
        for (let el of data) {
          this.products.push(el)
        }
      });
    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.productsBasket.push(el);
        }
        console.log(this.productsBasket);
      })
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error))
    },
    addProduct(product) {
      console.log(product.id_product);
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result) {
            let find = this.getItem(product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let cartProd = Object.assign({quantity: 1}, product);
              this.productsBasket.push(cartProd);
            }
          } else {
            alert('Error!')
          }
        })
    },
    delProduct(product){
      console.log(product.id_product);
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result){
            if(product.quantity > 1){
              product.quantity--;
            } else {
              this.productsBasket.splice(this.productsBasket.indexOf(product), 1);
              document.querySelector(`.cart-item[data-id="${product.id_product}"]`).remove()
            }
          } else {
            alert('Error!')
          }
        })
    },
    getItem(id){
        return this.productsBasket.find(el => el.id_product === id)
    },
    filterGoods() {
      console.log(this.searchLine);
    }
  }
});

// class List {
//     constructor(url, container){
//         this.url = url;
//         this.container = container;
//         this.products = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init()
//     }
//     getJson(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }
//     handleData(data){
//         this.products = [...data];
//         this._render();
//     }
//     _init(){
//         return false
//     }
//     getItem(id){
//         return this.allProducts.find(el => el.id_product === id)
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     _render(){
//         const block = document.querySelector(this.container);
//         for(let product of this.products){
//             const prodObj = new list[this.constructor.name](product);
//             this.allProducts.push(prodObj);
//             this.filtered.push(prodObj)
//             block.insertAdjacentHTML('beforeend', prodObj.render());
//         }
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//
// }
// class Item {
//     constructor(product, img = 'https://placehold.it/200x150'){
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.id_product = product.id_product;
//         this.img = img;
//     }
//     render(){
//         return `<div class="product-item" data-id="${this.id_product}">
//                  <img src="${this.img}" alt="${this.product_name}">
//                   <div class="desc">
//                       <h3>${this.product_name}</h3>
//                       <p>${this.price}</p>
//                       <button class="buy-btn"
//                       data-id="${this.id_product}">Купить</button>
//                   </div>
//               </div>`
//     }
// }
//
// class ProductsList extends List{
//     constructor(cart ,url=`/catalogData.json` ,container='.products'){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(this.getItem(+e.target.dataset.id))
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value);
//         })
//     }
// }
//
// class ProductItem extends Item{}
//
//
// class Cart extends List {
//     constructor(url='/getBasket.json', container = '.cart-block'){
//         super(url, container);
//         this.getJson()
//             .then(data => this.handleData(data.contents))
//     }
//     addProduct(product){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result){
//                     let find = this.getItem(product.id_product);
//                     if(find){
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let cartProd = Object.assign({quantity: 1}, product);
//                         this.products = [cartProd];
//                         this._render()
//                     }
//                 } else {
//                     alert('Error!')
//                 }
//             })
//     }
//     removeProduct(product){
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result){
//                     if(product.quantity > 1){
//                         product.quantity--;
//                         this._updateCart(product);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(product), 1);
//                         document.querySelector(`.cart-item[data-id="${product.id_product}"]`).remove()
//                     }
//                 } else {
//                     alert('Error!')
//                 }
//             })
//     }
//     _updateCart(product){
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector(`.product-quantity`).textContent = `Quantity: ${product.quantity}`;
//         block.querySelector(`.product-price`).textContent = `$${product.quantity*product.price}`;
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('del-btn')){
//                 this.removeProduct(this.getItem(+e.target.dataset.id))
//             }
//         });
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         })
//     }
// }
//
// class CartItem extends Item {
//     constructor(el, img = 'https://placehold.it/50x100'){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render(){
//         return `<div class="cart-item" data-id="${this.id_product}">
//     <div class="product-bio">
//         <img src="${this.img}" alt="Some image">
//         <div class="product-desc">
//             <p class="product-title">${this.product_name}</p>
//             <p class="product-quantity">Quantity: ${this.quantity}</p>
//             <p class="product-single-price">$${this.price} each</p>
//         </div>
//     </div>
//     <div class="right-block">
//         <p class="product-price">$${this.quantity*this.price}</p>
//         <button class="del-btn" data-id="${this.id_product}">&times;</button>
//     </div>
// </div>`
//     }
// }
//
// let list = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };
//
// const cart = new Cart();
// const products = new ProductsList(cart);
//
// products.getJson(`getProducts.json`).then(data => products.handleData(data));


// let getRequest = url => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> xhr = new ActiveXObject();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error!')
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

// async function func() {
//     let data = await getRequest(url);
//     console.log(data);
// }
// getRequest(url)
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
