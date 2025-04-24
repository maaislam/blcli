import shared from "../shared";

const { ID } = shared;

export default class CategoriesBar {
    constructor() {
      this.create();
      this.render();
    }
  
    create() {

      const element = document.createElement('div');
      element.classList.add(`${ID}_categoryBar`);
      element.innerHTML = `
      <div class="${ID}_categoriesInner">
        <div class="${ID}_categories"></div>
      </div>`;
      
      this.component = element;
    }
    render() {
      const { component } = this;
      document.querySelector('.cm-placement-main').insertAdjacentElement('afterbegin', component);
    }
  }