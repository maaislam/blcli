/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import MobileBasket from './components/mobileBasket/mobileBasket';
import ApplicationStyle from './components/applicationStyles/applicationStyles';
import CustomisationOptions from './components/customisationBoxes/customisationBoxes';
import LogoPlacement from './components/logoLocation/location';
import DesktopBasket from './components/desktopBasket.js/desktopBasket';
import NotesArea from './components/notesSection/notes';

const activate = () => {
  setup();

  // unhide hidden elements
  const notesSection = document.querySelector('#notes_comments');
  notesSection.removeAttribute('style');
  const CtaButtons = document.querySelector('#buttons');
  CtaButtons.removeAttribute('style');

  if (window.innerWidth < 767) {
    const mobileItems = new MobileBasket();
  } else {
    const mainBasket = new DesktopBasket();
  }

  const options = new CustomisationOptions({
    customOptions: [
      {
        name: 'logo-upload',
        img: 'https://cdn-sitegainer.com/fcofy89bqxd9p4v.png',
        title: 'Upload your logo(s)',
        subtext: 'Upload a logo',
      },
      {
        name: 'existing-logo-upload',
        img: 'https://cdn-sitegainer.com/g6brdjqrgepiodl.png',
        title: 'Use an exisiting logo',
        subtext: 'Select a logo from previous uploads',
      },
      {
        name: 'email-later',
        img: 'https://cdn-sitegainer.com/bt4f32vmp4pp3cc.png',
        title: 'Email Later',
        subtext: 'We will email/telephone you for your logo',
      },
    ],
  });

  // add the new application styles
  const applicationStyles = new ApplicationStyle({
    styles: [
      {
        img: 'https://cdn-sitegainer.com/2z9rdobrbkpcikn.jpg',
        matchingAttr: 'application_style_a',
        title: 'Embroidered Logo',
      },
      {
        img: 'https://cdn-sitegainer.com/s5xiis6onscidi6.jpg',
        matchingAttr: 'application_style_b',
        title: 'Embroidered Text',
      },
      {
        img: 'https://cdn-sitegainer.com/nt7aw1xp1od44d6.jpg',
        matchingAttr: 'application_style_c',
        title: 'Printed Logo',
      },
      {
        img: 'https://cdn-sitegainer.com/47i1loj01rb0vdh.jpg',
        matchingAttr: 'application_style_d',
        title: 'Printed Text',
      },
    ],
  });

  const logoLocation = new LogoPlacement();

  const notesArea = new NotesArea();
};

export default activate;
