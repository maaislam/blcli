import { fireEvent } from '../../../../../core-files/services';
const initMain = (bag, ID, className, classNameOne, variant) => {
  let checkTime;
  const checkTimeAndAddCountDown = () => {
    let testId = 'test';
    let todaysStartingTimeStamp = '';
    let todaysLastTimeStamp = '';
    let current_time = '';
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // from 6 pm to 9 pm
    todaysStartingTimeStamp = new Date(year + '-' + month + '-' + day + 'T00:00').getTime();
    todaysLastTimeStamp = new Date(year + '-' + month + '-' + day + 'T21:00').getTime();

    current_time = new Date().getTime();

    if (current_time > todaysStartingTimeStamp && current_time < todaysLastTimeStamp) {
      if (!document.getElementById(`${testId}_countDown`)) {
        className != undefined && classNameOne !== undefined
          ? addCountDownDivV1(testId, bag, ID, className, classNameOne, variant)
          : addCountDownDivV2(testId, bag, ID, (className = ''), (classNameOne = ''), variant);
      }

      // Find the difference between current_time and the count down date
      let timeLeft = todaysLastTimeStamp - current_time;

      // Time calculations for days, hours, minutes and seconds
      let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Output the result in an element with id="timerSection"
      document.getElementById(`${testId}_timerSection`).innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's ';
    } else {
      if (document.getElementById(`${testId}_countDown`)) {
        document.getElementById(`${testId}_countDown`).remove();
      }

      if (document.getElementById(`${testId}_timerSection`)) {
        document.getElementById(`${testId}_timerSection`).remove();
      }
    }

    if (current_time > todaysLastTimeStamp) {
      clearInterval(checkTime);
    }
  };
  checkTime = window.setInterval(checkTimeAndAddCountDown, 1000);
};

const addCountDownDivV1 = (testId, bag, ID, className, classNameOne) => {
  document.documentElement.classList.add(`${ID}-countdown-timer`);

  const countDown = document.createElement('div');
  countDown.setAttribute('class', `col-xs-12 ${testId}_countDown ${testId}_countDownV1`);
  countDown.setAttribute('id', `${testId}_countDown`);

  countDown.innerHTML = `
        <div class="${testId}_text-container-div">
            <div class="${testId}_image"> 
                <div class="${testId}_text"> 
                    <h4 class="${testId}_text_bold"> GET YOUR ORDER WITHIN 2 DAYS </h4>
                    <p class="${className}"> If you checkout within <span id="${testId}_timerSection" class="${testId}_text_bold ${classNameOne}-gap"></span></p>

                    
                    <p class="${testId}_excludesPreOrderv1">*Excludes pre-order items</p>
                </div> 
            </div>
        </div>
        `;

  //OrderSumm.after(countDown);
  bag.after(countDown);
  document.getElementById(`${testId}_timerSection`).innerHTML = 'Coundown is running';
  className ? fireEvent('Variation displayed on minibag') : fireEvent('Variation displayed on bag');
};

const addCountDownDivV2 = (testId, bag, ID, className, classNameOne) => {
  document.documentElement.classList.add(`${ID}-countdown-timer`);

  const countDown = document.createElement('div');
  countDown.setAttribute('class', `col-xs-12 ${testId}_countDown col-md-12 col-sm-6 ${testId}_countDownV2`);
  countDown.setAttribute('id', `${testId}_countDown`);

  countDown.innerHTML = `
        <div class="${testId}_text-container-div">
            <div class="${testId}_image"> 
                <div class="${testId}_text"> 
                    <h4 class="${testId}_text_bold"> GET YOUR ORDER WITHIN 2 DAYS </h4>
                    <p class="${className}"> If you checkout within <span id="${testId}_timerSection" class="${testId}_text_bold ${classNameOne}-gap"></span></p>
                    <span class="${testId}_excludesPreOrder">*Excludes pre-order items</span>
                </div> 
            </div>
        </div>
        `;

  //OrderSumm.after(countDown);
  bag.after(countDown);

  document.getElementById(`${testId}_timerSection`).innerHTML = 'Coundown is running';
  className ? fireEvent('Variation displayed on minibag') : fireEvent('Variation displayed on bag');
};

export default initMain;
