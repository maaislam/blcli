/**
 * Query Form lightbox
 */

import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { closeLightbox } from "./helpers";

const { ID } = shared;

export default class QueryLightbox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
     
    }
  
    create() { 
      
      const element = document.createElement('div');
      element.classList.add(`${ID}-modal`);
      element.classList.add(`${ID}-form`);
      element.innerHTML = `
        <div class="${ID}-close"></div>
        
        <div class="${ID}-modalInner">
            <div class="${ID}-formStep">
              <h3>We can see you're ordering a high number of gifts. Let us help you on this one.</h3>
              <div class="${ID}-formContent"></div>
              <div class="${ID}-contact">
                <div class="${ID}-inner">
                  <span></span>
                  <h4>Call our gifting team: <br><a href="tel:03444932323">03444 93 23 23</a></h4>
                </div>
              </div>
            </div>
        </div>`;

        this.component = element;

        const form = document.querySelector('#custom-form');
        element.querySelector(`.${ID}-formContent`).appendChild(form);
    }
  
    bindEvents() {
      const { component } = this;


      const overlay = document.querySelector(`.${ID}-overlay`);
      overlay.addEventListener('click', () => {
        closeLightbox(component);
      });

      const closeBox = component.querySelector(`.${ID}-close`);
      closeBox.addEventListener('click', () => {
        closeLightbox(component);
      });


      component.querySelector('button').addEventListener('click', () => {
        fireEvent('Clicked form submit');
      });

    }
  
    render() {
      const { component } = this;
      document.body.append(component);
    }
  }