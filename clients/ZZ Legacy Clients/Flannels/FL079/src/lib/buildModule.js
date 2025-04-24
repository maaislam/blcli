import { getCookie, setCookie, events } from "../../../../../lib/utils";

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  let newS;
  if (s.match(/\w\s+./)) {
    const sArr = s.split(/\s/g);
    newS = sArr.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    newS = newS.join(' ');
    if (newS.match('And')) {
      newS = newS.replace('And', 'and');
    }
    return newS;
  } else {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}


const reg = new RegExp(/(\/)(mensclearancehome|men|mens|kids|womensclearancehome|women|Women|womens|moncler|clearancehome|kidshome|homeware|flannelswoman|gift)(($|\?.*)|(\/)[\w\d_+-]+($|(\?|\#).*)|(\/)[\w\d_+-]+(\/)[\w\d_+-]+($|(\?|\#).*)|(\/)[\w\d_+-]+(\/)[\w\d_+-]+(\/)[\w\d_+-]+($|(\?|\#).*)|(\/)[\w\d_+-]+(\/)[\w\d_+-]+(\/)[\w\d_+-]+(\/)[\w\d_+-]+($|(\?|\#).*))/);

export const buildModule = (brandName, ref, VAR) => {
  if (!brandName) return;
  
  let showMoreCount = 0;

  const brandUrl = `https://www.flannels.com/${brandName.replace(/\s/g, '-').toLowerCase()}`;
  
  const { CategoryLevel0 } = window.dataLayer[1];

  let brandFilterUrl = capitalize(brandName.toLowerCase());
  
  brandFilterUrl = encodeURI(brandFilterUrl);

  // brandFilterUrl.match('%20And%20') ? brandFilterUrl.replace(/\%20And%20/, '%20and%20') : null;

  const filterUrl = `https://www.flannels.com${window.location.pathname}#dcp=1&dppp=100&OrderBy=rank&Filter=ABRA%5E${brandFilterUrl}`;
  
  const trimedBrandName = brandName.replace(/\s/g, '').toLowerCase();
  
  const imageUrl = `https://ucds.ams3.digitaloceanspaces.com/FL079/${trimedBrandName}.png`;


  // Retrieve category label from the URL
  let newCat = window.location.href.replace(window.location.hash ? window.location.hash : '', '');
  
  const ss = newCat.split('/').pop().trim(); 
  if (ss) {
    newCat = capitalize(ss);
    newCat = newCat.replace(/\-/g, ' ');
    newCat = newCat.toLowerCase();
  }
  const html = `
    <div class="FL079-popup">
      <div class="popup-wrap">
        <div class="popup-wrap--center">
          <div class="popup-close"><p class="popup-close">+</p></div>

          <p>Want to see more ${brandName}${newCat ? ` ${newCat}?` : ` ${CategoryLevel0}?`}</p>

          ${imageUrl ? `<img src="${imageUrl}" alt="${brandName}"/>` : ''}

          <a id="FL079-showMore" href="${showMoreCount == 0 ? filterUrl : brandUrl}">Show Me More</a>

          <button class="FL079-no">No thanks</button>
        </div>
      </div>
    </div>
  `;

  if (!document.querySelector('.FL079-popup') && !getCookie('FL079-noshow')) {
    
    if (VAR == 2) {
      events.send('FL079', 'FL079 Control', 'FL079 Module Shown (Control)');
      return false;
    }

    console.log('ref = ', ref);
    console.log('html = ', html);
    ref.insertAdjacentHTML('beforeend', html);

    document.body.classList.add('no-scroll');

    events.send('FL079', 'FL079 Variation 1', 'FL079 Module Shown');
  }

  const closePopup = (popupEl) => {
    popupEl.parentNode.removeChild(popupEl);
    document.body.classList.remove('no-scroll');
  }

  // Add events
  const popup = document.querySelector('.FL079-popup');
  popup.addEventListener('click', (e) => {
    const { target } = e;

    

    if (target.classList.contains('FL079-no')) {
      closePopup(popup);

      // Set Cookie
      setCookie('FL079-noshow', true, 9);
    }
    if (target.classList.contains('popup-close')) {
      closePopup(popup);
    }

    if (target.getAttribute('id') == 'FL079-showMore') {
      closePopup(popup);
      showMoreCount += 1;

      events.send('FL079', 'FL079 Variation 1', 'FL079 Clicks Show More');
    }
  });

  const bodyWrap = document.querySelector('#BodyWrap');
  const popupWrap = popup.querySelector('.popup-wrap--center');
  bodyWrap.addEventListener('click', (e) => {
    if (!popupWrap.contains(e.target)) {
      closePopup(popup);
    }
  });
};