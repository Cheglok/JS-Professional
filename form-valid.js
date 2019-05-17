class Form {
  constructor(formClass) {
    this.checkRules = {
      inputName: {rule: /^[a-zа-яё]+\b$/i, mistake: "Допустимы только буквы!"},
      inputTel: {rule: /^\+7\(\d{3}\)\d{3}-\d{4}\.$/, mistake: "Необходимый формат +7(000)000-0000. да-да, с точкой"},
      inputEmail: {rule: /^[a-z\d]+-?\.?[a-z\d]+-?\.?[a-z\d}+@[a-z]+.[a-z]+$/, mistake: "Это не похоже на электронную почту"},
      // Да, я нашел регулярку в гугле, но решил оставить свою, т.к. понимаю как она работает)
      //  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      inputText: {rule: /.+/i, mistake: "Надо что-то написать!"},
    };
    this.fieldsForCheck = [];
    this._init(formClass);
  }

  _init(formClass) {
    this.getFields(formClass);
    document.querySelector('button.btn-primary').addEventListener('click', event => {
      event.preventDefault();
      this.checkAll();
    });
  }

  getFields(formClass) {
    this.fieldsForCheck = [...document.querySelectorAll(`${formClass} input`)];
    console.log(this.fieldsForCheck);
  }

  checkAll() {
    this.fieldsForCheck.forEach(el => this.check(el.id));
  }

  check(field) {
    //извлекаем данные для текущей проверки в локальные переменные, для читабельности
    let rule = this.checkRules[field].rule;
    let mistake = this.checkRules[field].mistake;
    let help = `#${field} + div`;

    let val = document.getElementById(field).value;
    if (rule.test(val)) {
      document.getElementById(field).classList.value = "is-valid form-control"; /*либо каждый раз писать form-control*/
      document.querySelector(`${help}`).classList.value = "valid-feedback";
      document.querySelector(`${help}`).textContent = "Всё отлично!";
    } else {
      document.getElementById(field).classList.add("is-invalid");
      document.getElementById(field).classList.remove("is-valid");/*либо использовать add и remove*/
      document.querySelector(`${help}`).classList.value = "invalid-feedback";
      document.querySelector(`${help}`).textContent = mistake;
    }
  }
}

const form = new Form(".formForCheck");