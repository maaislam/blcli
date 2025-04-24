import { setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { h, render } from 'preact';
import { App } from './App';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  if (VARIATION == 'control') {
    return;
  }

  const idOrNameOfPlacementOnPage = '.sdHomeButtonTwo';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementonPage.insertAdjacentHTML('beforebegin', "<div id='root'></div>");

  render(<App />, document.getElementById('root'));
};
