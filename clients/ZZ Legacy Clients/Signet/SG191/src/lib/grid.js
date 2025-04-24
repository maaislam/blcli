import shared from "../../../../../core-files/shared";
import { data } from "./data";
import { addGridTile } from "./helpers";

const { ID } = shared;

export default class HomePageGrid {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

        const gridData = window.SGdata;
        //const gridData = data;

      const element = document.createElement('div');
      element.classList.add(`${ID}-gridWrapper`);
      element.innerHTML = `
        ${addGridTile(`${ID}-homeTile-large`, gridData.largeTile)}
        ${addGridTile(`${ID}-homeTile-small`, gridData.smallTile1)}
        ${addGridTile(`${ID}-homeTile-small ${ID}-last`, gridData.smallTile2)}
        ${addGridTile(`${ID}-homeTile-full`, gridData.smallWideTile)}
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      if(document.querySelector('.banner')) {
        document.querySelector('.banner').insertAdjacentElement('beforebegin', component);
      } else {
        document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', component);
      }
      
    }
  }