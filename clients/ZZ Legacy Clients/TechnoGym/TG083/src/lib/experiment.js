/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import TopHeader from './components/topHeader';
import PageMarkup from './components/pageMarkup';
import treadmills from './components/treadmills';
import TGusps from './components/TGusps';

const activate = () => {
  setup();

  const topHeader = new TopHeader();
  const pageContent = new PageMarkup();

  treadmills();
  TGusps();

  // add learn more button to the bottom treadmills
  const moreTreadmills = document.querySelectorAll('.TG083-moreTreadmills .shortcode-column');
  for (let index = 0; index < moreTreadmills.length; index += 1) {
    const element = moreTreadmills[index];
    const learnButton = document.createElement('div');

    const treadmillLink = element.querySelector('a').getAttribute('href');

    learnButton.classList.add('TG083-CTA');
    learnButton.innerHTML = `<a href=${treadmillLink}>Learn more</a>`;
    element.appendChild(learnButton);
  }
};

export default activate;
