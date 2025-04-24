/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import { pollerLite } from "../../../../../lib/utils";
import shared from "./shared";
import { events } from '../../../../../lib/utils';

const runChanges = () => {

  pollerLite([
    '#product-info-accordion'
  ], () => {
    const accordionSection = document.querySelector("#product-info-accordion");
    if (accordionSection) {
      const existingDesignerAccordion = accordionSection.querySelectorAll(
        ".accordion-group"
      )[6];

      if(existingDesignerAccordion) {
        const designerText = existingDesignerAccordion.querySelectorAll('p')[1];
        // const allDesigner = existingDesignerAccordion.querySelectorAll('p');

        pollerLite([
          '#designPanel'
        ], () => {

          const designPanel = document.querySelector('#designPanel');
          const paragraph = designPanel.querySelector('p');

          if (paragraph) {
            const testMarkup = `
            <div class="accordion-group ${shared.ID}__item">
              <div class="accordion-heading">
                <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#product-info-accordion" href="#designPanel">
                  Meet The Designer <i class="icon icon-large icon-caret-right"></i>
                </a>
              </div><div id="designPanel" class="accordion-body collapse" style="height: 0px;">
                <div id="designer-information" class="accordion-inner narrow-accordion-inner">
                  
                </div>
              </div>
            </div>
            `;
        
            existingDesignerAccordion.insertAdjacentHTML("afterend", testMarkup);
            existingDesignerAccordion.remove();
            existingDesignerAccordion.style.display="none";
            const designerInfoId = document.querySelector('#designer-information');
            if (designerInfoId) {
              designerInfoId.insertAdjacentElement('afterbegin', paragraph);
            }

            const experiment = document.querySelector(`.${shared.ID}__item`);
            if (experiment) {
              experiment.addEventListener('click', () => {
                events.send(`${shared.ID}`, 'clicked-meet-the-designer');
              })
            }
          }

        })

    
      }
    }
  })
};

export default () => {
  const init = () => {
    runChanges();
    setup();
  };
  init();
};
