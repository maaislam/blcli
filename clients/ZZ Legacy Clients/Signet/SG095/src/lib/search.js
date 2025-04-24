import shared from './shared';

/**
 * Create new slide out search
 */

const { ID } = shared;

export default class SearchBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }

  
    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}-searchModal`);
        element.innerHTML = `
        <div class="${ID}-searchInner header">
        <div class="${ID}-searchClose"></div>
        </div>
        `;
        this.component = element;

        const searchBox = document.querySelector('#js-search');
        element.querySelector(`.${ID}-searchInner`).appendChild(searchBox);
        
    }
  
    bindEvents() {
      const { component } = this;

      const searchIcon = document.querySelector(`.${ID}-link.${ID}-search`);

      searchIcon.addEventListener('click', () => {
        component.classList.add(`${ID}-active`);
        document.body.classList.add(`${ID}-noScroll`);
      });

      const closeSearch = component.querySelector(`.${ID}-searchClose`);
      closeSearch.addEventListener('click', () => {
        component.classList.remove(`${ID}-active`);
        document.body.classList.remove(`${ID}-noScroll`);
        document.querySelector('.page-overlay').classList.remove('page-overlay--is-active');
      });
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
    }
  }