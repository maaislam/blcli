import { fireEvent } from "./services";
import shared from "./shared";

export default () => {

    const { ID} = shared;

    const data = {
        1: {
            id: "happiness-msg",
            msg: "If you're not 100% happy with our products or service, we guarantee that we'll immediately put it right for you",
            img: "https://editor-assets.abtasty.com/48343/600ae861de1271611327585.png",
            alt: "100% happiness promise icon",
        },
        2: {
            id: "natural-msg",
            msg: "We’re committed to using only real, natural ingredients – nothing artificial, ever",
            img: "https://editor-assets.abtasty.com/48343/600ae87b8d9461611327611.png",
            alt: "Natural ingredients icon",
        },
        4: {
            id: "ethical-msg",
            msg: "Being ethical is about doing the right thing, not just saying it; that’s why we’re making cacao fairer for farmers",
            img: "https://editor-assets.abtasty.com/48343/600ae899567731611327641.png",
            alt: "Ethical cocoa icon",
        },
        3: {
            id: "delivery-msg",
            msg: "Next and Nominated day delivery available from £5.95*",
            img: "https://editor-assets.abtasty.com/48343/600ae8b88cb331611327672.png",
            alt: "Next day delivery icon",
        },
    };

    const rightSideProductContent = document.querySelector('#product-content');

    let itemList = '';
    for (let i = 1; i <= 4; i += 1) {
        const usp = data[i];
        itemList += `<li class="${ID}-usp-msg" id="${ID}-${usp.id}">
      <div class="${ID}-usp__img">
        <div>
          <img alt="${usp.alt}" src="${usp.img}">
        </div>
      </div>
      <div class="${ID}-usp__msg">
        <span>${usp.msg}</span>
      </div>
    </li>`;
    }

    const uspMessagesContainer = `<div class="${ID}-valueMessages__wrapper v2">
    <div class="${ID}-valueMessages__container">
      <ul class="${ID}-valueMessages__content">
        ${itemList}
      </ul>
    </div>
  </div>`;

  rightSideProductContent.querySelector('.product-actions').insertAdjacentHTML('beforebegin', uspMessagesContainer);

  const allMessages = document.querySelectorAll(`.${ID}-usp-msg`);
  for (let index = 0; index < allMessages.length; index += 1) {
    const element = allMessages[index];
    element.addEventListener('click', () => {
      fireEvent('Clicked Value Message');
    });
  }
}