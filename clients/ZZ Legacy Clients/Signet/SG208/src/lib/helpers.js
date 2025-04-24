
import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";


const { ID } = shared;

export const financeInfo = () => {
  const message = document.createElement("div");
  message.innerHTML = `
  <p>
    <span class="ifc"></span>
    <span class="clearpay"></span>
  </p>`;

  document.querySelector(`.${ID}-finance`).appendChild(message);

  pollerLite(["finance-options"], () => {

    document.body.appendChild(document.querySelector('finance-options'));
    message.querySelector(".ifc").innerHTML = `0% finance available`;

      const ifcButton =  document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button');
      message.addEventListener('click', () => {
        ifcButton.click();
      });

      document.querySelector("finance-options").shadowRoot.querySelector(".finance-options").style = "background-color: none; padding: 0px;";
      if (document.querySelector("finance-options").shadowRoot.querySelector(".finance-options > p")) {
        document.querySelector("finance-options").shadowRoot.querySelector(".finance-options > p").style = "display: none";
      }
      if(document.querySelector("finance-options").shadowRoot.querySelector(".finance-options__button")) {
        document.querySelector("finance-options").shadowRoot.querySelector(".finance-options__button").style = "display: none";
      }
  });

  pollerLite([".product-clearpay"], () => {
    const clearpayPrice = document.querySelector(".product-clearpay").textContent.match(/\d+(?:\.\d+)?/g)[1];
    message.querySelector(".clearpay").innerHTML = `or 4 payments of £${clearpayPrice} with <span></span>`;
  });
  
};

export const addCtas = () => {
  const actions = `
  <div class="${ID}-ctas">
    <a class="${ID}-button secondary">View full details</a>
  </div>`;

  document.querySelector('#basketForm').insertAdjacentHTML('beforeend', actions);

  const add = document.querySelector('#basketForm .product-buy-now');
  if(add) {
    document.querySelector(`.${ID}-ctas`).insertAdjacentElement('afterbegin', add);
  }


  // Full details click
  document.querySelector(`.${ID}-ctas .${ID}-button.secondary`).addEventListener('click', () => {
    fireEvent('Clicked view full details');
    window.location.href = window.location.pathname;
  });
}