export default () => {
  const fields = document.querySelectorAll('fieldset');

  // Personal Details
  fields[0].insertAdjacentHTML('afterbegin', `<div class='BR003-form__heading personalDetails'><h3>Personal Details</h3></div>`);

  // Billing Address
  fields[1].insertAdjacentHTML('afterbegin', `<div class='BR003-form__heading'><h3>Billing Address</h3></div>`);

  // Payment Type
  fields[2].insertAdjacentHTML('afterbegin', `<div class='BR003-form__heading'><h3>Donation Type</h3></div>`);

  // Donation Type
  fields[3].insertAdjacentHTML('afterbegin', `<div class='BR003-form__heading'><h3>Payment Type</h3></div>`);

  // Keeping in touch
  fields[5].insertAdjacentHTML('afterbegin', `<div class='BR003-form__heading'><h3>Keeping in touch</h3></div>`);
};