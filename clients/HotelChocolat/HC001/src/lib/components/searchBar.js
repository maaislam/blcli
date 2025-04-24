import shared from "../shared";

const { ID } = shared;

export default class SearchBar {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-searchContainer`);
      element.innerHTML = `<div class="${ID}-searchBox"></div>`;


      const searchBox = document.querySelector(`#header-search`);
      element.querySelector(`.${ID}-searchBox`).appendChild(searchBox);

      searchBox.querySelector('input').setAttribute('placeholder', 'Looking for something? Search here');

      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      if(window.innerWidth >= 1024) {
        document.querySelector('#navigation').insertAdjacentElement('beforebegin', component);
      } else {
        document.querySelector('#navigation').insertAdjacentElement('afterend', component);
      }
    }
  }
  
