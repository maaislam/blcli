import { postcodeMatch } from '../helpers/checkpostcode';
import skuValidity from '../helpers/checkSkuValidity';
import timeValidity from '../helpers/checkTimeValidity';

const renderUsp = (id, data, parentContainer, TypedPostcode, stageTwo) => {
  const { uspContent, uspTitle, uspTick, uspLogo1, uspLogo2, skus, postcodes } = data;
  const htmlStr1 = `
    
       
            <div class="${id}__usp--logo">${uspLogo1}</div>
            <div class="${id}__usp--title">${uspTitle}</div>
            <div class="${id}__usp--content">
                ${uspContent
                  .map(
                    (item) => `
                  <div class="component">
                    <span>${uspTick}</span>
                    <p>${item.body}</p>
                  </div>`
                  )
                  .join('\n')}
            </div>
        
    `;

  const showDeliveryNotice = timeValidity() && skuValidity(skus) && postcodeMatch(postcodes);
  console.log('valid', showDeliveryNotice);

  const htmlStr2 = `
        <div class="${id}__usp--logo">${uspLogo2}</div>
        <div class="${id}__usp--title title2">You have successfully added your postcode, ${TypedPostcode}</div>
        <div class="${id}__noticeLabel ${showDeliveryNotice ? `` : `${id}__hide`}">
            <img src="https://sb.monetate.net/img/1/581/3437428.png" />
            <p>You can also get<strong> next day delivery</strong> on selected products <span style="font-weight: 700; color: #182D3D;">if you order before 4pm</span></p>
        </div>
        <div class="${id}__stageCompleteBtn">Start Browsing</div>
        `;

  const uspContainer = document.createElement('div');
  uspContainer.classList.add(`${id}__usp--container`);
  document.querySelector(`.${id}__usp--container`)?.remove();
  parentContainer.insertAdjacentElement('afterbegin', uspContainer);
  uspContainer.innerHTML = !stageTwo ? htmlStr1 : htmlStr2;
  const warningBlock = document.querySelector('[data-test-id="warning-message"]');
  warningBlock && warningBlock.classList.add(`${id}__warning--block`);
};

export default renderUsp;
