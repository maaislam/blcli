import settings from '../../lib/settings';

const { ID } = settings;

export default () => {
  const changeAccordianNames = () => {

    const reviewStars = document.querySelector('.BVRRRatingNormalImage .BVImgOrSprite');
    const numberOfReviews = window.digitalData.product[0].productInfo.ratingCount;

    const names = {
      Description: 'Product description',
      Specification: 'Product specifications',
      // 'Delivery & Returns': 'Refunds & Returns',
      Reviews: `Reviews ${reviewStars ? `<img src="${reviewStars.getAttribute('src')}"/><span>(${numberOfReviews})</span>` : ''}`,
      'Help Centre': 'Help centre <span></span>',
    };

    const allTabHeadings = document.querySelectorAll('#js-accordion-tabs div[class^=product-details__]');
    for (let index = 0; index < allTabHeadings.length; index += 1) {
      const element = allTabHeadings[index];
      const headings = element.querySelector('h2[data-accordion-tabs-target]');
      if (headings) {
        const headingText = headings.textContent.trim();
        if (Object.keys(names).indexOf(headingText) > -1) {
          headings.innerHTML = `${names[headingText]}`;
        }
      }
    }
  };

  changeAccordianNames();


  const addDeliveryTab = () => {
    const returnsTab = document.createElement('div');
    returnsTab.classList.add(`${ID}-delivery_Tab`);
    returnsTab.innerHTML =
    `<h2 class="${ID}-delivery_heading">Delivery</h2>
      <div id="${ID}-delivery_content" class="${ID}-delivery_content">
      <div class="${ID}-delivery_description">
      <p>At Ernest Jones we provide the following range of delivery options:</p>
      <ul>
        <li>Free Standard Delivery available on orders over £100.</li>
        <li>Free Next Day Delivery available on selected orders over £499.</li>
        <li>Free Click &amp; Collect to any Ernest Jones store in the UK.</li>
      </ul>
      <p>
        For more Delivery Information <a href="/webstore/static/customerservice/customer_deliveryinfo.do">click here.</a>
      </p>
      </div>
    </div>`;

    const deliveryTab = document.querySelector('.product-details__specification-container');
    deliveryTab.insertAdjacentElement('afterend', returnsTab);
  };

  //addDeliveryTab();

  const changeReturnsContent = () => {
    const returnsTab = document.querySelector('.product-details__delivery-returns');
    returnsTab.querySelector('#product-details__delivery-returns').innerHTML =
    `<p> Returns policy: you can return items to us by post or in store within 30 days for a full refund or exchange.*</p>
    <p>*We cannot refund or exchange pierced jewellery, e.g. earrings, if they have been removed from the original sealed packaging due to hygiene reasons.</p>
    <p><a href="/webstore/static/customerservice/customer_returns.do">Click here to see our full Returns policy.</a></p>`;
  };
  // changeReturnsContent();

  // functionality of the new delivery tab
  const newTab = () => {
    // check if any are open based on the height then close
    const removeActiveAccordians = () => {
      const allAccordians = document.querySelectorAll('#js-accordion-tabs div[class^=product-details__]');
      for (let index = 0; index < allAccordians.length; index += 1) {
        const element = allAccordians[index];

        element.addEventListener('click', () => {
          const deliveryTab = document.querySelector(`#${ID}-delivery_content`);
          if (deliveryTab.classList.contains(`${ID}-tab_active`)) {
            deliveryTab.classList.remove(`${ID}-tab_active`);
          }
        });

        const elInner = element.querySelector('[data-accordion-tabs]');
        if (elInner) {
          if (elInner.style.height !== '0px') {
            element.querySelector('h2').click();
          }
        }
      }
    };

    // open the new delivery tab
    const deliveryAccordian = document.querySelector(`.${ID}-delivery_Tab`);
    const deliveryContent = document.querySelector(`#${ID}-delivery_content`);
    deliveryAccordian.addEventListener('click', () => {
      removeActiveAccordians();
      if (deliveryContent.classList.contains(`${ID}-tab_active`)) {
        deliveryAccordian.classList.remove(`${ID}-delivery_active`);
        deliveryContent.classList.remove(`${ID}-tab_active`);
      } else {
        deliveryAccordian.classList.add(`${ID}-delivery_active`);
        deliveryContent.classList.add(`${ID}-tab_active`);
      }
    });
  };

  //newTab();
};
