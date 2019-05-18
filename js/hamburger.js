class Hamburger {
  constructor(container) {
    this.container = container;
    this.calories = 0;
    this.price = 0;
    this.components = [];
    this.availibleComponents = {};
    // {
    //   big: {price: 100, calories: 40},
    //   small: {price: 50, calories: 20},
    //   cheese: {price: 10, calories: 20},
    //   salad: {price: 20, calories: 5},
    //   potato: {price: 15, calories: 10},
    //   spice: {price: 15, calories: 0},
    //   mayo: {price: 20, calories: 5},
    // };
    this._init();
}

  _init() {
    const button = document.getElementById("construct");
    button.addEventListener('click', () => this.construct());
    this.construct()
  }

  construct() {
    this.getComponents();
    this.calculate();
    this.render();
  }

  getComponents() {
    this.components = [];
    let checkedFields = [...document.querySelectorAll(`#${this.container} input:checked`)];
    for (let field of checkedFields) {
      let value = field.value;
      this.components.push(value);
    }
    return fetch()



    console.log(this.components);
  }

  calculate() {
    this.price = 0;
    this.calories = 0;
    this.components.forEach(component => {
      console.log(component);
      this.price += this.availibleComponents[`${component}`].price;
      this.calories += this.availibleComponents[component].calories;
    });
  }

  render() {
    document.querySelector('.result').textContent = `цена: ${this.price}, калорийность: ${this.calories}`;
  }

}