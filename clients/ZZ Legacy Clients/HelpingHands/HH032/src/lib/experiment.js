/**
 * HH032 - Above Fold Branch Page
 *
 * Deprioritising the map and make the contact phone numbers more prominent,
 * in addition to introducing the ability to see the branch on Google Maps
 *
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';

const activate = () => {
  setup();

  const { ID } = settings;
  const allBranchDetails = document.querySelectorAll('.branch-details');
  const branchAddressHTML = allBranchDetails[0].querySelector('.wpsl-locations-details').outerHTML;
  const branchManagerHTML = (() => {
    const addressEl = allBranchDetails[0].querySelector('.wpsl-locations-details');
    let node = addressEl.nextSibling;
    let HTML = '';

    while (node) {
      HTML += node.nodeType === 3 ? node.textContent : node.outerHTML.trim();
      node = node.nextSibling;
    }

    return HTML;
  })();
  const addressText = allBranchDetails[0].querySelector('.wpsl-location-address').innerText.trim();
  const googleMapsSearchLink = `https://www.google.co.uk/maps/search/${addressText}`;
  const branchDetailsDesktop = document.querySelector('#sidebar .branch-details');
  const header = document.querySelector('#hero > .container > .row');
  const title = header.querySelector('h1').parentElement;
  const map = document.querySelector('#map');
  const hoursTable = document.querySelector('.branch-hours');

  // Change markup for branch details boxes
  for (let i = 0; i < allBranchDetails.length; i += 1) {
    const branchDetails = allBranchDetails[i];
    const phoneNumbers = branchDetails.querySelectorAll('.phone_ctp');
    const phoneNumbersHTML = [].map.call(phoneNumbers, phoneNumber => phoneNumber.outerHTML);

    branchDetails.innerHTML = `
      <h2>Call us</h2>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          Looking for care?
          <p class="${ID}_phoneNumber">${phoneNumbersHTML[0]}</p>
        </div>
        <div class="col-xs-12 col-md-6">
          Looking for a job?
          <p class="${ID}_phoneNumber">${phoneNumbersHTML[1]}</p>
        </div>
        <div class="col-xs-12">
          or we can <a href="/about-us/contact-us/call-me-back-now">Call You Now</a>
        </div>
      </div>
    `;
  }

  // Add Address and Manager details to 'Branch Details' tab
  const additionalDetailsHTML = `
    <div class="${ID}_additionalDetails">
      ${!branchAddressHTML ? '' : `
        <div class="${ID}_branchAddressSection">
          <div class="${ID}_branchAddress">
            <strong>Branch Address</strong>
            ${branchAddressHTML}
          </div>

          <div class="${ID}_mapsAddressSearch">
            <p>Find this branch on <a href="${googleMapsSearchLink}" target="_blank">Google Maps</a></p>
            <a href="${googleMapsSearchLink}" target="_blank">
              <img src="http://pluspng.com/img-png/google-maps-png-google-maps-logo-900.png" />
            </a>
          </div>
        </div>
      `}

      ${!branchManagerHTML ? '' : `
        <div class="${ID}_branchManager">
          ${branchManagerHTML}
        </div>
      `}
    </div>
  `;
  if (hoursTable) {
    hoursTable.insertAdjacentHTML('afterend', additionalDetailsHTML);
  } else {
    const branchDetailsSection = document.querySelector('.HH024_Box3 .HH024_Box_Elements');
    branchDetailsSection.insertAdjacentElement('beforeend', additionalDetailsHTML);
  }

  // Move map to sidebar
  if (map) branchDetailsDesktop.insertAdjacentElement('beforebegin', map);

  // Resize title
  title.className = 'col-xs-12 col-md-7 col-lg-8';

  // Move branch details to header
  const container = document.createElement('div');
  container.className = 'hidden-xs col-md-5 col-lg-4';
  container.appendChild(branchDetailsDesktop);
  header.appendChild(container);
};

export default activate;
