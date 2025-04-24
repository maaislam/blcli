import settings from '../settings';
import Lightbox from '../components/formlightbox';
import { events } from '../../../../../../lib/utils';

export default () => {
  /**
   * Create the form wrapper
   */
  const ID = `${settings.ID}`;
  const newFormWrapper = document.createElement('div');
  newFormWrapper.classList.add(`${ID}-page_form_wrapper`);
  newFormWrapper.innerHTML = `<div class="${ID}-form_title"><span class="${ID}-close_form">&times;</span>Learn more about MYRUN's features</div>
  <div class="${ID}-form_download">
    <span></span>
    <h2>Request your brochure</h2>
    <hr/>
    <p>A Wellness Expert will follow up with a FREE consultation, offering advice tailored to your goals</p>
    <div class="${ID}-form-main"></div>
  </div>`;

  document.querySelector(`.${ID}-abovefold_wrapper`).appendChild(newFormWrapper);

  // move the form on tablet
  if (window.innerWidth >= 767) {
    document.querySelector(`.${ID}-abovefold_wrapper .TG065-text_wrapper`).appendChild(newFormWrapper);
  } else {
    document.querySelector(`.${ID}-abovefold_wrapper`).appendChild(newFormWrapper);
  }

  // change labels in form
  document.querySelector('#requestform .form-group label').textContent = 'Name*';
  document.querySelectorAll('#requestform .form-group')[1].querySelector('label').textContent = 'Email*';

  /**
   * Make the form toggle sticky on scroll
   */
  const stickyFormTrigger = () => {
    const ppcForm = document.querySelector('.TG065-page_form_wrapper');
    const stop = ppcForm.offsetTop;
    window.addEventListener('scroll', () => {
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if (scrollTop >= stop) {
        ppcForm.classList.add('TG065-sticky_form');
      } else {
        ppcForm.classList.remove('TG065-sticky_form');
      }
    }, false);
  };
  stickyFormTrigger();


  /* Form lightbox */
  const pageform = document.querySelector('#requestform');
  if (window.innerWidth < 1024) {
    const lightBox = new Lightbox(settings.ID, {
      content: `<div class="${ID}-lightbox_heading"></div>
      <div class="${ID}-lightbox_content_inner">
        <div class="${ID}-lightbox_content_intro">
        <div class="${ID}_Lightbox__close">&times;</div>
        <span>Learn more about myruns's features</span>
        </div>
        <div class="${ID}_Lightbox__inner">
          <span></span>
          <h2>Request your brochure</h2>
          <hr/>
          <p>A Wellness Expert will follow up with a FREE consultation, offering advice tailored to your goals</p>
          <div class="${ID}-form-main"></div>
          <div class="${ID}-form_usp">
            <hr/>
            <h3>What's in the brochure?</h3>
            <ul>
              <li>Details on features like the Wake Up Sensor</li>
              <li>Examples of training programmes</li>
              <li>MYRUN's full spec</li>
            </ul>
          </div>
        </div>
      </div>`,
    });
    document.querySelector(`.${ID}-lightbox_content_inner .${ID}-form-main`).appendChild(pageform);
  } else {
    const formMain = document.querySelector(`.${ID}-page_form_wrapper .${ID}-form-main`);
    formMain.appendChild(pageform);
    const lightBoxTrigger = document.querySelector('.TG065-form_download');
    const closeLightbox = document.querySelector('.TG065-close_form');
    lightBoxTrigger.addEventListener('click', () => {
      if (!lightBoxTrigger.parentNode.classList.contains(`${ID}-show_desktopForm`)) {
        lightBoxTrigger.parentNode.classList.add(`${ID}-show_desktopForm`);
        closeLightbox.classList.add('TG065-close_form_show');
        events.send(`TG065 Desktop v${settings.VARIATION}`, 'Click', 'Opened Form');
      }
    });
    // close desktop form
    closeLightbox.addEventListener('click', () => {
      if (lightBoxTrigger.parentNode.classList.contains(`${ID}-show_desktopForm`)) {
        lightBoxTrigger.parentNode.classList.remove(`${ID}-show_desktopForm`);
        closeLightbox.classList.remove('TG065-close_form_show');
      } else {
        lightBoxTrigger.parentNode.classList.add(`${ID}-show_desktopForm`);
        closeLightbox.classList.add('TG065-close_form_show');
      }
    });

    const brochureDetailsDesktop = document.createElement('div');
    brochureDetailsDesktop.classList.add(`${ID}-form_usp`);
    brochureDetailsDesktop.innerHTML =
    `<hr/>
    <h3>What's in the brochure?</h3>
    <ul>
      <li>Details on features like the Wake Up Sensor</li>
      <li>Examples of training programmes</li>
      <li>MYRUN's full spec</li>
    </ul>`;
    formMain.appendChild(brochureDetailsDesktop);
  }
  const disclaimerText = document.querySelector('.TG065-form-main .disclaimer-text');
  disclaimerText.textContent = 'I consent to the use of personal data for marketing and publicity purposes';

  const formButton = document.querySelector('.TG065-form-main #submit-button');
  formButton.value = 'Request Brochure';

  if (settings.VARIATION === '2') {
    const phoneNumberField = document.querySelector('.TG065-form-main .form-group #phone');
    phoneNumberField.parentNode.style.display = 'none';
  }
};
