/**
 *  Класс для создания формы создания нового тикета
 * */
export default class Modal {
  constructor() {
    this.wrap = null;
    this.btn = null;
    this.input = null;
    this.error = null;
  }

  open() {
    const wrap = document.createElement('div');
    wrap.classList.add('modal-wrap');
    this.wrap = wrap;

    const modal = document.createElement('div');
    modal.classList.add('modal');

    document.body.append(wrap);
    wrap.append(modal);

    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = 'Что-то пошло не так(';
    modal.append(header);

    const content = document.createElement('div');
    content.classList.add('content');
    modal.append(content);

    const text = document.createElement('p');
    text.textContent = 'К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.';
    content.append(text);

    const text1 = document.createElement('p');
    text1.textContent = 'Широта и долгота через запятую:';
    content.append(text1);

    const input = document.createElement('input');
    input.classList.add('modal-input');
    input.setAttribute('type', 'text');
    input.placeholder = '51.50851, 52.35816';
    modal.append(input);
    this.input = input;

    const errBox = document.createElement('div');
    errBox.classList.add('errore');
    this.error = errBox;
    this.input.after(errBox);

    const buttonBox = document.createElement('div');
    buttonBox.classList.add('modal-button-box');
    modal.append(buttonBox);

    const btn = document.createElement('button');
    btn.classList = 'btn';
    btn.textContent = 'Ok';
    buttonBox.append(btn);
    this.btn = btn;

    const close = document.createElement('button');
    close.classList = 'btn';
    close.textContent = 'Отмена';
    buttonBox.append(close);
    
    close.addEventListener('click', (e) => {
      this.close();
    })

    wrap.addEventListener('click', (e) => {
        const targetClass = e.target.classList;
        if(targetClass.contains('modal-wrap')
        && !targetClass.contains('modal')) {
            this.close();
        }
    })      
  }

  close() {
    this.wrap && this.wrap.remove();
    this.wrap = null;
  }

  addOnClickHandler(handler) {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.clearError();
      const data = this.input.value;        
      if(!data) return;
      handler(data);
    })
  }

  showError() {    
    this.error.textContent = 'Координаты введены неверно!';
  }

  clearError() {
    this.error.textContent = '';
  }
}
  