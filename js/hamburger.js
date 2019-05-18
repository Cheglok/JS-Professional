class Hamburger {
  constructor(container) {
    this.container = container;
    //Мне не очень нравится, что в конструкторе я создаю столько пустых переменных. Это нормально?
    this.availibleComponents = {};
    this.components = [];
    this.calories = 0;
    this.price = 0;
    this.say = "";
    this._init();
}

  _init() {
    const button = document.getElementById("construct");
    this.fetchComponents()
      .then(() => {
        button.addEventListener('click', () => this.construct()); /*Здесь запустить 4 метода?(см. стр 32)*/
      })
      .catch(error => console.log(error));
  }

  //С сервера получаются данные о текущих ценах, калорийности и прочих параметрах компонентов
  fetchComponents() {
    return fetch("https://raw.githubusercontent.com/Cheglok/JS-Professional/lesson3/availible-components.json")
      .then(result => result.json())
      .then(data => {
        this.availibleComponents = Object.assign(data);
      })
      .catch(error => console.log(error));
  }

  //Метод, у которого задача только запустить много других методов. Это разумная конструкция, или
  // лучше запустить их наверху?
  construct() {
    this.reset();
    this.getComponents();
    this.calculate();
    this.render();
  }

  reset() {
    this.components = [];
    this.price = 0;
    this.calories = 0;
    this.say = "";
  }

  getComponents() {
    let checkedFields = [...document.querySelectorAll(`${this.container} input:checked`)];
    for (let field of checkedFields) {
      let value = field.value;
      this.components.push(value);
    }
  }

  calculate() {
    this.components.forEach(component => {
      this.price += this.availibleComponents[`${component}`].price;
      this.calories += this.availibleComponents[component].calories;
      this.say += this.availibleComponents[component].say;
    });
  }

  render() {
    document.querySelector(".result").textContent = `цена: ${this.price}, калорийность: ${this.calories}`;
    //Захотелось поэкспериментировать с датой и insertAdjacentHTML
    let date = new Date;
    let now = date.toTimeString();
    document.querySelector(".result").insertAdjacentHTML("afterend",
      `<p>Недавние заказы: ${now}: ${this.say}.</p>`)
  }
}