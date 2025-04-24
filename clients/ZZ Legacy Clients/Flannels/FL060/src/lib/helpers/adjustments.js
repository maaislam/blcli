/**
 * @desc Swaps the text content of an element.
 * @param {Element} el 
 * @param {String} text 
 */
export const changeTitle = (el, text) => {
  if (el && text) {
    el.textContent = text;
  }
}

/**
 * @desc Adds the string to the element as HTML. Must be a string.
 * @param {Element} el 
 * @param {String} htmlString 
 * @param {Boolean} append Instead of replacing, add instead before end.
 * @param {String} position Left empty the default is beforeend
 */
export const addHTML = (el, htmlString, append, position) => {
  let pos = 'beforeend';
  if (el && htmlString && htmlString && typeof htmlString === 'string') {
    if (!append) {
      el.innerHTML = '';
    }
    if (position) {
      pos = position;
    }
    el.insertAdjacentHTML(pos, htmlString);
  }
}

/**
 * @desc Returns a HTML list as a String.
 * @param {Array} listArr Array of features as strings
 */
export const createFeatureList = (listArr) => {
  if (listArr.length > 0) {
    // Create UL
    const ul = document.createElement('UL');
    ul.classList.add('FL060-featureList');
    listArr.map((feature) => {
      ul.insertAdjacentHTML('beforeend', `
        <li><span class="FL060-tick FL060-tickActive"></span> <p>${feature.trim()}</p></li>
      `);
    });

    return ul;
  }
}

const clearStorage = () => {
  localStorage.removeItem('FL060-option');

  if (document.querySelector('.FL060-chosenOption')) {
    const existingEls = document.querySelectorAll('.FL060-chosenOption');
    for (let i = 0; existingEls.length > i; i += 1) {
      existingEls[i].parentNode.removeChild(existingEls[i]);
    }
  }
}

export const storeChosenOption = (event) => {
  // If previous selection exists. Remove it.
  clearStorage();

  // Store chosen
  const el = event.currentTarget;
  const obj = {
    title: el.querySelector('span.deliveryHead') ? el.querySelector('span.deliveryHead').textContent : null,
    subtitle: el.querySelector('span.locationHead') ? el.querySelector('span.locationHead').textContent : null,
  };

  if (obj.subtitle.indexOf('from £') > -1) {
    obj.subtitle = obj.subtitle.replace(/(from £\d.+)$/, '<span>$1</span>');
  }

  // Add HTML above title.
  const html = `
    <div class="FL060-chosenOption">
      <p>${obj.title}</p>
      <p><span>${obj.subtitle}</span></p>

      <span class="FL060-tick FL060-tickActive"></span>
    </div>
  `;

  localStorage.setItem('FL060-option', html);

  const refs = document.querySelectorAll('.Delivery.leftWrap .innerDelWrap');
  for (let i = 0; refs.length > i; i += 1) {
    addHTML(refs[i], html, true, 'beforeend');
  }
  // if (document.querySelector('#DeliveryOptionsWrapper').style.display === 'none') {
  // }
}