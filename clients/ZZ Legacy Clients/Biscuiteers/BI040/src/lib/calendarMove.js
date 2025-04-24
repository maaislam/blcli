import settings from './settings';
import { addPoller, addObserver, addEventListener } from './winstack';
import { getMessaging } from './deliveryLogic';

const { ID } = settings;

export const moveOccasionToTab = () => {
  // add the whens your occasion to slide out tab
  const occasionBox = document.querySelector('product-when-your-occasion');
  const deliveryTabOccasion = document.querySelector(`.${ID}-occasion_content`);
  occasionBox.querySelector('h3').textContent = 'check delivery for your chosen date';
  occasionBox.querySelector('.fs-3.col-12.lh-2.m-b').textContent = "";

  addPoller([occasionBox], () => {
    deliveryTabOccasion.appendChild(occasionBox);
    occasionBox.style.display = 'block';
  });
};

export const moveOccasionBackToPage = () => {
  // add the whens your occasion to slide out tab
  const occasionBox = document.querySelector('product-when-your-occasion');
  const backOnPage = document.querySelector('local-product-view');
  addPoller([occasionBox], () => {
    backOnPage.appendChild(occasionBox);
    occasionBox.style.display = 'none';
    occasionBox.querySelector('input').value = '';
  });
};

// adds the new delivery text on calander click
export const calanderTextUpdate = () => {
  // add the text to occasion box when it's in the delivery slide
  const occasionInDeliverySlide = document.querySelector(`.${ID}-occasion_content product-when-your-occasion`);
  if(occasionInDeliverySlide.classList.contains(`${ID}-text-updated`)) {
    return;
  }

  occasionInDeliverySlide.classList.add(`${ID}-text-updated`);

  const newDeliveryText = document.createElement('div');
  newDeliveryText.classList.add(`${ID}-deliver_text`);
  newDeliveryText.style.display = 'none';

  // when occasion is selected update the text
  const occasionBox = document.querySelector(`.${ID}-occasion_content`);
  const occasionBoxInput = occasionBox.querySelector('input');
  addObserver([occasionBoxInput], () => {
    addPoller([`.${ID}-occasion_content .bg-col-15 .fw-bold.block`], () => {
      const currentDeliveryText = occasionBox.querySelector('.bg-col-15 .fw-bold.block');
      const chosenDate = occasionBoxInput.value;
      const deliveryMessaging = getMessaging(chosenDate);
      if(deliveryMessaging && deliveryMessaging.line1) {
        let html = `<p class="${ID}-delmsg ${ID}-delmsg--line1"><strong>${deliveryMessaging.line1}</strong></p>`;

        if(deliveryMessaging.line2) {
          html += `<p class="${ID}-delmsg ${ID}-delmsg--line2">${deliveryMessaging.line2}</p>`;
        }

        newDeliveryText.style.display = 'block';

        occasionInDeliverySlide.querySelector('.bg-col-15').appendChild(newDeliveryText);
        document.querySelector(`.${ID}-deliver_text`).innerHTML = html;

        const initPressieReminder = document.querySelector(`.${ID}-init-pressie-reminder`);
        if(initPressieReminder) {
          addEventListener(initPressieReminder, 'click', () => {
            const controlInitPressieReminder = document.querySelectorAll('[click-event="reminder-modal.toggle.request"]');
            if(controlInitPressieReminder.length) {
              controlInitPressieReminder[controlInitPressieReminder.length - 1].click();

              const deliveryTab = document.querySelector(`.${ID}_deliveryTab`);
              if(deliveryTab) {
                deliveryTab.classList.remove(`${ID}-tab_active`);
              }
            }
          });
        }

        dataLayer.push({
          'event': `${ID} Date Selected`,
          'dateSelected': `${chosenDate}`,
          'deliveryDate': `${deliveryMessaging.line1}`,
        });
      }

    });
  }, {
    childList: true,
    attributes: false,
  });
};

