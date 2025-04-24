/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const firstImg = document.querySelector('.card-grid picture:first-child');
  const diamondSlot = document.querySelector('.card-grid a:first-child');
  const sources = firstImg.querySelectorAll('source');
  const firstAnchor = document.querySelector('.card-grid a:first-child');

  for (let index = 0; index < sources.length; index++) {
    const element = sources[index];
    element.remove();
    
  }

  setTimeout(() => { 
    firstImg.querySelector('img').setAttribute('src', 'https://service.maxymiser.net/cm/images-us/1/1/2/9E1B11AC6BF4D89DA507C40135C2FACAA7B2C98735439EF028422342DC54B5B3/hsamuel-co-uk/HS059---Diamond-Offer/HS20WC02_Valentiens_Day_Homepage_1342x1050_13.jpg');
    firstAnchor.setAttribute('href', 'https://www.hsamuel.co.uk/webstore/l/diamonds/select%7Csale/stock+position%7Cin+stock/');
  }, 1000);

  setTimeout(() => { 
    firstImg.querySelector('img').setAttribute('src', 'https://service.maxymiser.net/cm/images-us/1/1/2/9E1B11AC6BF4D89DA507C40135C2FACAA7B2C98735439EF028422342DC54B5B3/hsamuel-co-uk/HS059---Diamond-Offer/HS20WC02_Valentiens_Day_Homepage_1342x1050_13.jpg');
  }, 2000);

  setTimeout(() => { 
    firstImg.querySelector('img').setAttribute('src', 'https://service.maxymiser.net/cm/images-us/1/1/2/9E1B11AC6BF4D89DA507C40135C2FACAA7B2C98735439EF028422342DC54B5B3/hsamuel-co-uk/HS059---Diamond-Offer/HS20WC02_Valentiens_Day_Homepage_1342x1050_13.jpg');
  }, 3000);
  
  events.send('HS059 - V1', 'Fired');

  firstImg.addEventListener('click',()=>{
    events.send('HS059 - V1', 'Clicked Banner');
  })

  diamondSlot.addEventListener('click',()=>{
    events.send('HS059 - V1', 'Clicked Diamond Slot');
  })

};
