const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    basketUrl: '/getBasket.json',
    products: [],
    productsBasket: [],
    filteredProducts: [],
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
          this.filteredProducts.push(el);
        }
      });
    this.getJson(`getProducts.json`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filteredProducts.push(el);
        }
      });
    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.productsBasket.push(el);
        }
      })
  },
  computed: {
    totalPrice() {
      return this.productsBasket.reduce((accum, el) => accum += el.price * el.quantity, 0);
    }
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error))
    },
    // Здесь использую три метода из предыдущей реализации, кажется что в них нет ничего лишнего
    //
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result) {
            let find = this.productsBasket.find(el => el.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let cartProd = Object.assign({quantity: 1}, product);
              this.productsBasket.push(cartProd);
            }
          }
        })
    },
    delProduct(product){
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result){
            if(product.quantity > 1){
              product.quantity--;
            } else {
              this.productsBasket.splice(this.productsBasket.indexOf(product), 1);
            }
          }
        })
    },
    filterGoods() {
      let regExp = new RegExp( '^' + this.searchLine, 'i');
      this.filteredProducts = this.products.filter(el => regExp.test(el.product_name));
    },
  }
});
