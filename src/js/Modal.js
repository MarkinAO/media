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
    header.textContent = 'Выберите псевдоним';
    modal.append(header);

    const input = document.createElement('input');
    input.classList.add('modal-input');
    input.setAttribute('name', 'nickname');
    input.setAttribute('type', 'text');
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
      const nickname = this.input.value;        
      if(!nickname) return;
      handler(nickname);
    })
  }

  showError() {    
    this.error.textContent = 'Псевдоним уже занят!';
  }

  clearError() {
    this.error.textContent = '';
  }
}
  