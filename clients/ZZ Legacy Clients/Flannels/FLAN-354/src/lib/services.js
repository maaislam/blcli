import { events } from './../../../../../lib/utils';
import shared from './shared';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);
  events.analyticsReference = '_gaUAT';

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}

export const lineContainsPrice = (line) => {
  const { ID, VARIATION } = shared;

  let priceLine = false;
  if((line.outerHTML.indexOf('£') > -1 || line.outerHTML.indexOf('$') > -1 || line.outerHTML.indexOf('€') > -1)
  && line.outerHTML.indexOf('|') > -1) {
    priceLine = true;
  }

  return priceLine;
}

// --- Capitalize the First Letter of each Word
export const stringFormat = (str) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  let separateWord = str.toLowerCase().split(' ');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
    separateWord[i].substring(1);
  }
  return separateWord.join(' ');

}

