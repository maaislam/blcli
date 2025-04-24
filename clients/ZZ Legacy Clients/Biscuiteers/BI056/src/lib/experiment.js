import { setup, isLoggedIn, getPressiePoints } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './shared';

const createPressieBox = (title, text, overlayValue = '') => {
  const markup = `
    <div class="${settings.ID}-pp-wrap ${settings.ID}-DOD">
      <div class="${settings.ID}-pp">
        <div class="${settings.ID}-pp__parcel">
          <span class="${settings.ID}-pp__parcel-overlay ${
            overlayValue > 9 ? 
              (overlayValue < 100 ? `${settings.ID}-pp__parcel-overlay--bigval"` : `${settings.ID}-pp__parcel-overlay--biggerval"`)
              : ''
            }"
           >${overlayValue ? `£${overlayValue}` : ''}</span>
        </div>

        <div class="${settings.ID}-pp__body">
          <div class="${settings.ID}-pp__title">${title}</div>
          <div class="${settings.ID}-pp__text">${text}</div>
        </div>
      </div>
    </div>
  `;

  return markup;
};

/**
 * Entry point for experiment
 */
export default () => {

  events.send(`${settings.ID}`, isLoggedIn() ? 'Logged In' : 'Not Logged In');
  if(isLoggedIn()) {
    events.send(`${settings.ID}`, 'Balance: ' + getPressiePoints());
  }

  if(settings.VARIATION == 'control') {
    events.send(`${settings.ID}`, 'Control', 'Initialised');
    return;
  }

  setup();

  events.send(`${settings.ID}`, 'Variation', 'Initialised');

  // -------------------------------------
  // Generate box depending on whether signed in or not
  // and whether user has points
  // -------------------------------------
  let html = '';
  if(isLoggedIn()) {
    const balance = getPressiePoints();
    if(balance > 0) {
      html += createPressieBox(
        `You have ${balance} Pressie Points`,
        `That's £${balance} worth of points to be redeemed at payment stage.`,
        balance
      );
    } else {
      html += createPressieBox(
        `<a class="${settings.ID}-link" data-ident="pressiepoints" href="/pressie-points">Earn 1 Pressie Point for every £10 you spend</a>`,
        'You can use your Pressie Points towards your next purchase',
      );
    }
  } else {
    html += createPressieBox(
      `<a class="${settings.ID}-link" data-ident="pressiepoints" href="/pressie-points">Pressie Points</a>`,
      `<a class="${settings.ID}-link" data-ident="signin" href="/account/login">Sign in</a> and earn 
        <a class="${settings.ID}-link" data-ident="pressiepoints" href="/pressie-points">Pressie Points</a>`
    );
  }

  const newsletterFormHeader = document.querySelector('newsletter-form-header');
  const main = document.querySelector('ui-view main');

  if(newsletterFormHeader) {
    // -------------
    // Desktop use form header
    // -------------
    let widthClass = 'w-4-x';
    if(isLoggedIn() && getPressiePoints() == 0) {
      widthClass = 'w-5-x';
    }

    newsletterFormHeader.insertAdjacentHTML('beforebegin', `
      <div class="${settings.ID}-pp-wrap-container ${settings.ID}-DOD w-3 ${widthClass} w-4-l">
        ${html}
      </div>
    `);
  } else {
    // -------------
    // Smaller devices insert after header
    // -------------
    if(main && html) {
      main.insertAdjacentHTML('beforebegin', html);
    }
  }

  [].forEach.call(document.querySelectorAll(`.${settings.ID}-link`), (link) => {
    addEventListener(link, 'click', (e) => {
      const ident = e.currentTarget.getAttribute('data-ident');
      
      events.send(`${settings.ID}`, 'Clicked Link', ident);
    });
  });
};
