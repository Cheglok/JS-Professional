Vue.component('error', {
  props: ["error"],
  template:
  `<h1 v-if="error">Ошибка! {{error}}</h1>`
});