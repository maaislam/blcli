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
  
  events.send('HS059 - Control', 'Fired');

  firstImg.addEventListener('click',()=>{
    events.send('HS059 - Control', 'Clicked Banner');
  })

  diamondSlot.addEventListener('click',()=>{
    events.send('HS059 - Control', 'Clicked Diamond Slot');
  })
};
