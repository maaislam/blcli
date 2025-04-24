/*
Usage
-----
  new Accordion({
    target: 'body',
    injectPosition: 'afterbegin',
    uniqueName: 'trigger',
  });
  OR
  let accordion;
  accordion = new Accordion({
                target: 'body',
                injectPosition: 'afterbegin',
                uniqueName: 'trigger',
              });
-----
*/

import settings from '../../lib/settings';
import AccordionData from './AccordionData';
import AccordionBlock from './AccordionBlock';

const { ID, VARIATION } = settings;

export default class Accordion {
  constructor(options) {
    const opts = options || {};
    this.target = opts.target;
    this.injectPosition = opts.injectPosition;
    this.uniqueName = opts.uniqueName;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_accordionWrap`);
    element.innerHTML = `
      <div class="${ID}_accordion variation-${VARIATION}">
        ${AccordionBlock({
          elements: AccordionData,
          uniqueName: this.uniqueName,
        })}
      </div>
    `;
    this.component = element;
  }

  bindEvents() {

  }

  render() {
    document.querySelector(this.target).insertAdjacentElement(this.injectPosition, this.component);
  }
}
