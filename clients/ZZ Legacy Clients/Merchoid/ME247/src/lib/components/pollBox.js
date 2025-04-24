import shared from "../shared";
import { events } from "../../../../../../lib/utils";

const { ID } = shared;

export default class PollBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}_pollBox`);
      element.innerHTML = `
        <h3>Before you leave...</h3>
        <div class="${ID}-poll_question">
            <p>Were you buying for yourself or someone else today?</p>
            <div class="${ID}-options">
                <div class="${ID}-option" data-tag="Self-Purchase"><span>Myself</span></div>
                <div class="${ID}-option ${ID}-last" data-tag="Gifter"><span>Someone else</span></div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const options = component.querySelectorAll(`.${ID}-options .${ID}-option`);
      for (let index = 0; index < options.length; index += 1) {
        const element = options[index];
        element.addEventListener('click', (e) => {
          const optionName = e.currentTarget.getAttribute('data-tag');
          component.querySelector(`.${ID}-poll_question`).innerHTML = `<span class="${ID}_feedback">Thanks for you response. Your feedback is appreciated.</span>`;
          events.send(`${ID}`, 'click', `shopping for ${optionName}`);
        });
      }
    }
  
    render() {
      const { component } = this;
      if(innerWidth > 1024) {
        document.querySelector('#maincontent .columns').insertAdjacentElement('afterend', component);
      } else {
        document.querySelector('#registration').insertAdjacentElement('afterend', component);
      }
    }
  }
  
