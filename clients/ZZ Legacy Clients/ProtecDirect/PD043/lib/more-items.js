/**
 * @desc Add the more items module below the cart table
 * @param {Element} siteSearch
 * @param {Element} reference
 */
export default (siteSearch, reference) => {
  let submit;
  submit = siteSearch.querySelector('input.button');
  if (!submit) {
    submit = siteSearch.querySelector('button.searchButton img');
  }

  submit.setAttribute('src', 'https://www.sitegainer.com/fu/up/x0i4dhcnbheljdy.png');
  const html = `
    <div class="PD043d-more-items">
      <div class="PD043d-items-wrap">
        <h3>Add more items to your basket:</h3>

        <div class="PD043d-items">
          <a href="https://www.protecdirect.co.uk/my-account/orders" class="button positive">Add items from a previous order</a>
          <p>or</p>
          ${siteSearch.outerHTML}
        </div>
      </div>
    </div>
  `;
  if (reference) {
    reference.insertAdjacentHTML('beforeend', html);
  }
};
