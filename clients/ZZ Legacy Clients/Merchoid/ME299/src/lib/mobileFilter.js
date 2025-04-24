import shared from "../../../../../core-files/shared";

const { ID } = shared;

export default class MobileFilter {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-mobileFilter`);
      element.innerHTML = `
      <div class="${ID}-close"></div>
      <div class="${ID}-innerContent">
        <h3>Filter by:</h3>
        <div class="${ID}-filters"></div>
      </div>
      `;
      this.component = element;

      const filters = document.querySelector('.sidebar.sidebar-main');
      element.querySelector(`.${ID}-filters`).appendChild(filters);

    }
  
    bindEvents() {
      const { component } = this;
      const filterButton = document.querySelector(`.${ID}-filter-sort__filter`);

      filterButton.addEventListener('click', () => {
          component.classList.add(`${ID}-filterOpen`);
      });

      component.querySelector(`.${ID}-close`).addEventListener('click', () => {
        component.classList.remove(`${ID}-filterOpen`);
    });
      
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
    }
  }