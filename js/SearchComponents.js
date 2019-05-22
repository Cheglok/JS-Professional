Vue.component('search', {
  props: ['value', "filtered", "img"],
  template:
    `
<div><form action="#" class="search-form">
        <label for="search-field">Поиск</label>
        <input type="text" class="search-field" id="search-field"
               :value="value"
      @input="$emit('input', $event.target.value)">
        <button class="btn-search" type="submit"
        @click.prevent="$emit('alarm')">
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div class="filtered-products" v-if="filtered.length">
        <h3>Найденные товары</h3>
        <button type="button" class="del-btn close-filtered-button" @click="$emit('close')">&times;</button>
  
        <product
        v-for="product of filtered"
        :key="product.id_product"
        :img="img"
        :product="product"        
        ></product>
      </div></div>`
});
Vue.component('product', {
    props: ["product", "img"],
    template: `<div class="product-item">
              <img :src="img" :alt="product.product_name">
              <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}}</p>
                <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
              </div>
            </div>`

  }
);