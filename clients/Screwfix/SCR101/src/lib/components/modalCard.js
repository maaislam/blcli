import { checkIcon } from '../assets/svg';
import isIncludingVat from '../helpers/isIncludingVat';

const modalCard = (id, quantity) => {
  const freeProdPriceIncVat = '20.00';
  const freeProdPriceExVat = '16.67';
  const freeProdImg = 'https://media.screwfix.com/is/image/ae235/602HN_P?$fxSharpen$=&wid=257&hei=257&dpr=on';
  const prodPrice = isIncludingVat() ? freeProdPriceIncVat : freeProdPriceExVat;

  const htmlStr = `<div class='${id}__modalCard'>
        <div class='${id}__modalCardContainer'>
            <title class='modalCard-title'>Get a FREE Flomasta TRV when bought with this radiator</title>

            <div class='content'>
                <div class='image'>
                    <img src='${freeProdImg}' alt='Product Image' />
                </div>
                <div class=''>
                    <div class='price-container'>
                        <span class="free-text">FREE</span>
                        <span class="price-text">was £${prodPrice}</span>
                    </div>
                    <div class='${id}__checkbox-container'>
                        <input type="checkbox" class="${id}__checkbox sr-only-input is-checked" id="addToBasketCheckbox" name="addToBasket" value="" aria-hidden="false">
                        <label for="addToBasketCheckbox">
                            ${checkIcon}
                            <span class='checkbox-label'>You’ve added ${quantity} Flomasta TRV <span>(602HN)</span> to the basket</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="${id}__offerContainer ${id}__invisible">
            You have an unclaimed offer <span>Claim offer</span>
        </div>
    </div>
    `;

  return htmlStr;
};

export default modalCard;
