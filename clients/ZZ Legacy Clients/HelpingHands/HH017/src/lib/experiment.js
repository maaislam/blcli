import { setup } from './services';

/**
 * {{HH017}} - {{About Us Submenu}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const contactUsLink = bodyVar.querySelector('[title="Contact Us"]');
      const aboutUsLink = bodyVar.querySelector('[title="About us"]');

      return {
        docVar,
        bodyVar,
        contactUsLink,
        aboutUsLink,
      };
    })(),
    init: () => {
      setup();
      // Switch attributes of links
      // Change 'About us' attributes
      Exp.cache.aboutUsLink.setAttribute('href', 'https://www.helpinghandshomecare.co.uk/about-us/contact-us/');
      Exp.cache.aboutUsLink.setAttribute('title', 'Contact Us');
      Exp.cache.aboutUsLink.textContent = 'Contact Us';
      // Change 'Contact us' attributes
      Exp.cache.contactUsLink.setAttribute('href', 'https://www.helpinghandshomecare.co.uk/about-us/');
      Exp.cache.contactUsLink.setAttribute('title', 'About us');
      Exp.cache.contactUsLink.textContent = 'About us';
    },
  };

  Exp.init();
};

export default Run;
