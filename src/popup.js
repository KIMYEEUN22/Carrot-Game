'use strict';

export default class PopUp {
    constructor() {
        this.popup = document.querySelector('.pop-up--hide');
        this.popupText = document.querySelector('.pop-up__text');
        this.popupReplay = document.querySelector('.pop-up__replay');
        this.popupReplay.addEventListener('click', () => {
           this.onClick && this.onClick();
           this.hide();
        })
    }

    setClickListner(onClick){
        this.onClick = onClick;
    }

    showText(text) {
        this.popupText.innerText = text;
        this.popup.classList.remove('pop-up--hide');
    }

    hide() {
        this.popup.classList.add('pop-up--hide');
    }
}