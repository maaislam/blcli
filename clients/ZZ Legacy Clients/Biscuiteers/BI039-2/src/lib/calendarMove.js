import { addPoller, addObserver } from './winstack';


export const moveOccasionToTab = () => {
  // add the whens your occasion to slide out tab
  const occasionBox = document.querySelector('product-when-your-occasion');
  const deliveryTabOccasion = document.querySelector('.BI039-2-occasion_content');
  occasionBox.querySelector('.fs-3.col-12.lh-2.m-b').textContent = 'verify delivery for your desired date';
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
  const occasionInDeliverySlide = document.querySelector('.BI039-2-occasion_content product-when-your-occasion');
  const newDeliveryText = document.createElement('div');
  newDeliveryText.classList.add('BI039-2-deliver_text');
  newDeliveryText.style.display = 'none';
  newDeliveryText.innerHTML = `
  <p>Great News! If you order now we can deliver by</p>
  <span></span>
  <p>Simply set your desired delivery date in the checkout. Easy Peasy!</p>`;

  occasionInDeliverySlide.querySelector('.bg-col-15').appendChild(newDeliveryText);

  // when occasion is selected update the text
  const occasionBox = document.querySelector('.BI039-2-occasion_content');
  addObserver([occasionBox.querySelector('input')], () => {
    addPoller(['.BI039-2-occasion_content .bg-col-15 .fw-bold.block'], () => {
      const currentDeliveryText = occasionBox.querySelector('.bg-col-15 .fw-bold.block');
      const deliveryDate = currentDeliveryText.textContent;

      newDeliveryText.style.display = 'block';
      document.querySelector('.BI039-2-deliver_text span').textContent = deliveryDate;

      dataLayer.push({
        'event': 'BI039-2 Date Selected',
        'dateSelected': `${occasionBox.querySelector('input').value}`,
        'deliveryDate': `${deliveryDate}`,
      });
    });
  }, {
    childList: true,
    attributes: false,
  });
};

