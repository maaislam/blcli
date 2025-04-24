/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  const url = window.location.href;

  const getCountryName = () => {
    let countryName;
    if(url.indexOf('/uk/') > -1) {
      countryName = "UK";
    }
    if(url.indexOf('/eu/') > -1) {
      countryName = "European";
    }
    if(url.indexOf('/world/') > -1) {
      countryName = "US";
    }
    if(url.indexOf('/us/') > -1) {
      countryName = "US";
    }

    return countryName;
  }

  const deliverytext = () => {
    let text;

    const productName = document.querySelector('.page-title');
    if(productName.innerText.indexOf('Preorder') > -1) {
      text = "We pay for your shipping so you don't have to! Once the pre-order products arrive  at our Warehouse, they’re shipped within 48 working hours.";
    } else {
      text = `We pay for your shipping so you don't have to! All orders are shipped from our ${getCountryName()} Warehouse within 48 working hours.`;
    }
    return text;
  }

  const addPoints = () => {

    const pointsBlock = document.createElement('div');
    pointsBlock.classList.add(`${ID}-afterBuy`);
    pointsBlock.innerHTML = `<div class="${ID}-container"><h3>What happens after I buy?</h3><div class="${ID}-points"></div></div>`;

    document.querySelector('.product-secondary-tabs-wrapper').insertAdjacentElement('beforebegin', pointsBlock);

    const sellingPoints = {
      point1: {
        name: "Secure Your Merch",
        text: "Once your order is placed, you’ve secured your officially licensed merch and it’ll be on it’s way to you.",
        icon: "//cdn.optimizely.com/img/6087172626/afdc131309114b1ca2b78530c3d38323.png",
      },
      point2: {
        name: "Delivery",
        text: deliverytext(),
        icon: "//cdn.optimizely.com/img/6087172626/91e83c25724247ef81e9ec2b9e5beb91.png",
      },
      point3: {
        name: "Enjoy Your Purchase",
        text: "We’re so confident you’ll love our <b>Officially Licensed Merch</b> that we give you 100 days to return your product if you’re not happy.",
        icon: "//cdn.optimizely.com/img/6087172626/d16c18123a9843baa0cd857613f8e9f2.png",
      },
    }

    Object.keys(sellingPoints).forEach((i) => {
      const data = sellingPoints[i];
      const step = document.createElement('div');
      step.classList.add(`${ID}-step`);
      step.innerHTML = `
      <div class="${ID}-icon" style="background-image:url(${data.icon})"></div>
      <div class="${ID}-textBlock">
        <span>${data.name}</span><p>${data.text}</p>
      </div>`;

      document.querySelector(`.${ID}-afterBuy .${ID}-points`).appendChild(step);
    });

  }

  addPoints();


  const inViewEvent =() => {
      function isScrolledIntoView(el) {
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;
    
        // Only completely visible elements return true:
        var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
      }

      window.addEventListener('scroll', () => {
        if(isScrolledIntoView(document.querySelector(`.${ID}-afterBuy`))) {
          events.send(`${ID}`, 'saw', 'What happens after I buy', {sendOnce:true});
        }
      });
    
  }

  inViewEvent();


};
