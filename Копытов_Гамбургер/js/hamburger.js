class Hamburger {
  constructor(container) {
    this.container = container;
    this.availibleComponents = {};
    this.components = this.getComponents();
    //Мне не очень нравится, что в конструкторе я создаю столько пустых переменных. Это нормально?
    this.calories = 0;
    this.price = 0;
    this.say = "";
    this._init();
}

  //С сервера получаются данные о текущих ценах, калорийности и прочих параметрах компонентов
  _init() {
    return fetch("https://raw.githubusercontent.com/Cheglok/JS-Professional/lesson3/availible-components.json")
      .then(result => result.json())
      .then(data => {
        this.availibleComponents = Object.assign(data);
      })
      .then(() => {
        this.calculate();
        this.render();
      })
      .catch(error => console.log(error));
  }

  getComponents() {
    let checkedFields = [...document.querySelectorAll(`${this.container} input:checked`)];
    let result = [];
    for (let field of checkedFields) {
      let value = field.value;
      result.push(value);
    }
    return result;
  }

  calculate() {
    this.components.forEach(component => {
      let item = this.availibleComponents[component];
      this.price += +item.price;
      this.calories += +item.calories;
      this.say += item.say;
    });
  }

  render() {
    document.querySelector(".result").textContent = `Цена: ${this.price}, Калорийность: ${this.calories}`;
    //Захотелось поэкспериментировать с датой и insertAdjacentHTML
    let date = new Date;
    let now = `${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
    document.querySelector(".result").insertAdjacentHTML("afterend",
      `<p>Недавние заказы: ${now} ${this.say}.</p>`)
  }
}