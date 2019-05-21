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
        }
      });
    this.getJson(`getProducts.json`) /*Файлик расширил, чтобы можно было осуществить множественный поиск*/
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
      })
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
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result){
            if(product.quantity > 1){
              product.quantity--;
            } else {
              this.productsBasket.splice(this.productsBasket.indexOf(product), 1);
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
      this.filteredProducts = [];
      let regExp = new RegExp( '^' + this.searchLine, 'i');
      for (let el of this.products) {
        //Поиск можно осуществлять по фразе любой длины, но обязательно с самого начала названия товара
        //Хотел сделать чтобы с любого слова начинался поиск, но при '\\b' + this.searchLine, 'i'
        // Перестаёт искать русские слова. Не считает русскую букву границей слова
        if (el.product_name.match(regExp)) {
          this.filteredProducts.push(el);
        }
      }
    },
    closeFiltered() {
      this.filteredProducts = [];
    },
  }
});
