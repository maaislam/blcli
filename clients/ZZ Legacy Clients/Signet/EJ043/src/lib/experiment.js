/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();
    
  let bannerMessage = 'CYBER MONDAY';
  let countDownDate = new Date("Dec 2, 2019 23:59:59").getTime();

  // const today = new Date();
  // let day = today.getDate();
  //   if (day < 10) {
  //     day = '0' + dd;
  //   } 
  // let month = today.getMonth() + 1;
  //   if (month < 10) {
  //   month = '0' + mm;
  //   }  
  // var dateToday = '' + day + '/' + month + '';

  // if (dateToday === '29/11') {
  //   bannerMessage = 'BLACK FRIDAY';
  //   countDownDate = new Date("Dec 1, 2019 23:59:59").getTime();
  // }
  
  const getTime = setInterval(function() {
  // Get today's date and time
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % ((1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + (days * 24));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);


  document.querySelector(".EJ043-countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished
  if (distance < 0) {
    clearInterval(getTime);
    document.getElementById("demo").innerHTML = "OFFER EXPIRED, Please Refresh Page";
    }
  }, 1000);
  
  const offerMessage = document.createElement('div');
  offerMessage.classList.add('EJ043-offer_banner');
  offerMessage.innerHTML = `<p class="EJ043-message">${bannerMessage} - <span class="EJ043-countdownText">Offer ends in <span class="EJ043-countdown"></span></span></p>`;

  const header = document.querySelector('#js-header');
  header.insertAdjacentElement('afterend', offerMessage);
};
