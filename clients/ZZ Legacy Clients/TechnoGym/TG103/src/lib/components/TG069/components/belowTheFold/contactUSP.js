import { __ } from '../../../../helpers';
export default () => {
  const contactSection = document.querySelector('.TG103-contact'); // UP TO HERE TRANSLATIONS
  contactSection.innerHTML = `
  <div class="TG103-text_container"> 
    <h2>${__('The Perfect Fit For Your Home')}</h2>
    <p>${__('With all our Wellness Experts trained in CAD design to perfectly visualise the space you have and augment the stylish pieces within your home.')}</p>
    <div class="TG103-button TG103-secondary_button"><a target="_blank" href="${__('https://www.technogym.com/gb/contacts/?reason=call&sku=MYRUN-CONFIGURABLE-EUROPE&type=conf')}">${__('Speak to A Wellness Expert Now')}</a></div>
    <span></span>
  </div>`;


  /* USP section */
  const uspSection = document.querySelector('.TG103-section.TG103-usps');
  uspSection.innerHTML = `<div class="TG103-runnerImage"></div><ul class="TG103-usps_wrapper"><h2>${__('Why Buy From')} <span>technogym</span></h2></ul>`;

  const usps = [
    [`${__('Official supplier to the latest editions of the Olympics, from Sydney 2000 to PyeongChang 2018.')}`],
    [`${__('Designed and made in Italy with the utmost care to fit your space and wellness needs.')}`],
    [`${__('Eager to understand your expectations and consult with you on the right purchase.')}`],
    [`${__('Offering a comprehensive interior design service to create the perfect wellness area.')}`],
    [`${__('No hassle: equipment delivered to your door with high-quality installation by our experts (included in the price).')}`],
    [`${__('Outstanding after-sales and customer support ensure your equipment is always perfectly operational over time.')}`],
  ];

  for (let index = 0; index < usps.length; index += 1) {
    const element = usps[index];
    const newUsp = document.createElement('li');
    newUsp.classList.add('TG103-usp');
    newUsp.innerHTML = `${element}`;
    uspSection.querySelector('.TG103-usps_wrapper').appendChild(newUsp);
  }
};
