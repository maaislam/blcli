import settings from '../settings';

export default () => {
  const productName = document.querySelector('.product-name h1').textContent;
  const ctaArea = document.createElement('div');
  ctaArea.classList.add(`${settings.ID}-cta_area`);
  ctaArea.innerHTML = `
  <h4></h4>
  <p></p>
  <div class="${settings.ID}-quote"></div> 
    <span>- OR -</span>
  <div class="${settings.ID}-catalogue">Request a catalogue</div>
 `;

  const addToBag = document.querySelector('.btn-cart');
  const topDescription = document.querySelector('.product-main-info .product-description-wrapper');


  // change the text based on product type
  const ctaInnerText = ctaArea.querySelector('p');
  const quoteButton = ctaArea.querySelector(`.${settings.ID}-quote`);
  const optionsWrapper = document.querySelector('.options-container-small');
  const title = ctaArea.querySelector('h4');

  if (optionsWrapper && addToBag) { // hybrid
    quoteButton.textContent = 'Request a quote';
    title.textContent = `${productName} For Your Business`;
    ctaInnerText.textContent = 'Bespoke pricing based on your individual business requirements';
    optionsWrapper.insertAdjacentElement('afterend', ctaArea);
  } else if (!optionsWrapper && addToBag) { // sole
    quoteButton.textContent = 'Request a callback';
    title.textContent = `${productName} For Your Business`;
    ctaInnerText.textContent = 'Bespoke pricing based on your individual business requirements';
    addToBag.insertAdjacentElement('afterend', ctaArea);
  } else if (optionsWrapper && !addToBag) { // sole
    quoteButton.textContent = 'Request a quote';
    title.textContent = `${productName} For Your Business`;
    ctaInnerText.textContent = 'Bespoke pricing based on your individual business requirements';
    optionsWrapper.insertAdjacentElement('afterend', ctaArea);
  } else {
    quoteButton.textContent = 'Request a quote';
    title.textContent = `${productName} For Your Business`;
    ctaInnerText.textContent = 'Bespoke pricing based on your individual business requirements';
    topDescription.insertAdjacentElement('afterend', ctaArea);
  }

  // on click of the new buttons
  const newRequestCatalouge = document.querySelector('.TG079-catalogue');
  const requestAQuote = document.querySelector('.TG079-quote');
  const requestAQuoteMain = document.querySelector('.request-quote a');
  newRequestCatalouge.addEventListener('click', () => {
    document.querySelector('.addition-info figcaption a').click();
  });

  requestAQuote.addEventListener('click', () => {
    if (requestAQuoteMain) {
      requestAQuoteMain.click();
    } else {
      document.querySelector('.contact-team a').click();
    }
  });
};
