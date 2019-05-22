Vue.component('cart', {
  props: ["cartItems", "img", "visibility", "totalPrice"],
  template: `<div class="cart-block" v-if="visibility">
              <p class="empty-basket" v-if="!cartItems.length">Корзина пуста</p>
              <item
              v-for="product of cartItems"
              :key="product.id_product"
              :img="img"
              :cart-item="product"
              ></item>
              <p class="product-price" v-if="cartItems.length">Your order {{ totalPrice }}</p>
            </div>`
});
Vue.component('item', {
  props: ["cartItem", "img"],
  template: `<div class="cart-item">
                <div class="product-bio">
                  <img :src="img" alt="cartItem.product_name">
                  <div class="product-desc">
                    <p class="product-title">{{cartItem.product_name}}</p>
                    <p class="product-quantity">{{cartItem.quantity}}</p>
                    <p class="product-single-price">each {{cartItem.price}}</p>
                  </div>
                </div>
                <div class="right-block">
                  <p class="product-price">total {{cartItem.price * cartItem.quantity}}</p>
                  <button class="del-btn" @click = "$parent.$emit('remove', cartItem)">&times;</button>
                </div>
              </div>`
});