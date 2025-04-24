import settings from '../settings';
import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  const id = settings.ID;

  const tpWidget = document.querySelector('.trustpilot-widget');
  if(tpWidget) {
    tpWidget.insertAdjacentHTML('afterend', `
      <div class="${settings.ID}-tp-reviews-container">
        <div class="${settings.ID}-tp-reviews">
          <div class="${settings.ID}-review">
            <div class="${settings.ID}-star-container">
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
            </div>
            <div class="${settings.ID}-review-date">
              18 October 2018
            </div>
            <div class="${settings.ID}-review-title">
              Thank You Eharmony!
            </div>
            <div class="${settings.ID}-review-text">
              <p>I cannot even put into words how much I love Eharmony. I joined just over three year's ago and was only using it for a month before I met the love of my life, we are now happily living together and are due to be married! &lt;3 </p>
            </div>
            <p class="${settings.ID}-review-author">Carolanne Marie</p>
          </div>
          <div class="${settings.ID}-review">
            <div class="${settings.ID}-star-container">
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
            </div>
            <div class="${settings.ID}-review-date">
              09 October 2018
            </div>
            <div class="${settings.ID}-review-title">
              I found love
            </div>
            <div class="${settings.ID}-review-text">
              <p>Eharmony is a safe and secure environment that supported me in my search for love. Through eharmony I was able to meet the most amazing man. We've been together for over 2 years and have just bought a house together! I'm really grateful to eharmony for enabling this to come about.</p>
            </div>
            <p class="${settings.ID}-review-author">Gina</p>
          </div>
          <div class="${settings.ID}-review">
            <div class="${settings.ID}-star-container">
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
              <div class="${settings.ID}-star">
                <img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg">
              </div>
            </div>
            <div class="${settings.ID}-review-date">
              14 October 2018
            </div>
            <div class="${settings.ID}-review-title">
              Met a man and married him
            </div>
            <div class="${settings.ID}-review-text">
              <p>Met a man and married him! Eharmony worked for us!</p>
            </div>
            <p class="${settings.ID}-review-author">Lizzie Francke-Daniels</p>
          </div>
        </div>
      </div>
    `);

    pollerLite([
      () => {
        return window.tns;
      },
    ], () => {
      const slider = tns({
        container: `.${id}-tp-reviews`,
        items: 1,
        loop: false,
        mouseDrag: true,
        nav: false,
        disable: false,
      });

      const sliderButtons = document.querySelectorAll('.tns-controls button');
      for (let i = 0; i < sliderButtons.length; i += 1) {
        const element = sliderButtons[i];
        element.textContent = '';
      }
    });
  }
};
