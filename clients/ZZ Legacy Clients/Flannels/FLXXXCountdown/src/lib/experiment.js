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

  const yellowBar = document.querySelector('.HeaderTopFlan > a');
  yellowBar ? yellowBar.textContent = '' : null;

  yellowBar ? yellowBar.insertAdjacentHTML('afterbegin', `
    20% OFF OUTLET – USE CODE EXTRA20 – ENDS IN
    <span id="FL-countdown" class="FLXXX-Countdown"></span>
  `) : '';
  
  const countdownTimeStart = () => {

    let countDownDate = new Date("June 8, 2020 23:59:59").getTime();
    
    // Update the count down every 1 second
    let x = setInterval(function() {
    
        // Get todays date and time
        let now = new Date().getTime();
        
        // Find the distance between now an the count down date
        let distance = countDownDate - now;
        let sec_num = (countDownDate - now) / 1000;


        let weekdays     = Math.floor(distance/1000/60/60/24/7);
        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let days = Math.floor(sec_num / (3600 * 24));


        
        // Output the result in an element with id="demo"
        document.getElementById("FL-countdown").innerHTML = days + "D " + hours + "H "
        + minutes + "M " + seconds + "S ";
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("FL-countdown").innerHTML = "";
        }
    }, 1000);
  }

  countdownTimeStart();
};
