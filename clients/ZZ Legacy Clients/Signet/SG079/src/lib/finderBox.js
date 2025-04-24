import shared from './shared';
import { journeyData } from './questionData';
import { getSiteFromHostname } from './services';

const { ID } = shared;

export default class FinderBox {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}-finderBox-wrapper`);

    
    element.innerHTML = 
    `<div class="${ID}-finderBox">
      <div class="${ID}-closeFinder"></div>
        <h2>Ring Selector</h2>
        <div class="${ID}-steps">
          <div class="${ID}-step ${ID}-question1">Ring Metal</div>
          <div class="${ID}-step ${ID}-question2">Stone Shape</div>
          <div class="${ID}-step ${ID}-question3">Price Range</div>
        </div>
        <div class="${ID}-finderOptions">
          <div class="${ID}-options ${ID}-question ${ID}-question1">
            <p class="${ID}-optionsTitle">Choose up to 3 ring metals</p>
            <p class="${ID}-error">Please select an option</p>
            <div class="${ID}-innerOptions"></div>
            <div class="${ID}-buttons ${ID}-oneButton">
              <div class="${ID}-next ${ID}-button" data-step="1">Next</div>
            </div>
          </div>
          <div class="${ID}-options ${ID}-question ${ID}-question2">
            <p class="${ID}-optionsTitle">Choose up to 3 stone shapes</p>
            <p class="${ID}-error">Please select an option</p>
            <div class="${ID}-innerOptions"></div>
            <div class="${ID}-buttons">
              <div class="${ID}-back ${ID}-button" data-step="2">Back</div>
              <div class="${ID}-next ${ID}-button" data-step="2">Next</div>
            </div>
          </div>
          <div class="${ID}-options ${ID}-question ${ID}-question3">
            <p class="${ID}-optionsTitle">Select your price range</p>
            <p class="${ID}-error">Please select an option</p>
            <div class="${ID}-innerOptions"></div>
            <div class="${ID}-buttons">
              <div class="${ID}-back ${ID}-button" data-step="3">Back</div>
              <div class="${ID}-next ${ID}-button" data-step="3"">Refine</div>
            </div>
          </div>
        </div>
      </div>`;
    this.component = element;


    // add the step options
    const metalOptions = journeyData["stepOne"];
    const stoneShapes = journeyData["stepTwo"];
    const price = journeyData["stepThree"];


    Object.keys(metalOptions.options).forEach((i) => {
      const metalData = metalOptions.options[i];
      const metalOption = document.createElement('div');
      metalOption.classList.add(`${ID}-answer`);
      metalOption.setAttribute('data-result', metalData.url);
      if(getSiteFromHostname() === 'hsamuel') {
        metalOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${metalData.hsimage})"></div><span>${[i][0]}</span>`;
      } else {
        metalOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${metalData.image})"></div><span>${[i][0]}</span>`;
      }
      element.querySelector(`.${ID}-question1 .${ID}-innerOptions`).appendChild(metalOption);
    });

    Object.keys(stoneShapes.options).forEach((x) => {
      const stoneData = stoneShapes.options[x];
      const stoneOption = document.createElement('div');
      stoneOption.classList.add(`${ID}-answer`);
      stoneOption.setAttribute('data-result', stoneData.url);
      stoneOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${stoneData.image})"></div><span>${[x][0]}</span>`;

      element.querySelector(`.${ID}-question2 .${ID}-innerOptions`).appendChild(stoneOption);
    });

    // now price
    Object.keys(price.options).forEach((j) => {
      const priceData = price.options[j];
      const priceOption = document.createElement('div');
      priceOption.classList.add(`${ID}-answer`);
      priceOption.setAttribute('data-result', priceData.url);
      priceOption.innerHTML = `<span>${[j][0]}</span>`;
      
      element.querySelector(`.${ID}-question3 .${ID}-innerOptions`).appendChild(priceOption);
    });
  }


  render() {
    const { component } = this;
    document.body.appendChild(component);
  }
}

