export default (catSelected) => {
  if (catSelected && !catSelected.querySelector('button.btn.btn-primary.w-100.os-zoom-out')) {
    // Login Register CTA
    const loginRegisterContainer = `<div class="pl-3 px-3 my-4 font-weight-light"><div class="my-3">
      <a href="/en-gb/discover" title="Discover Advice and Guidance">Discover - Advice &amp; Guidance</a></div>
      <div class="my-3">
      <a href="/en-gb/contact-us" title="Contact us">Contact us</a></div>
      <div class="my-3">
      <a href="/en-gb/help" title="Help">Help</a></div>
      <div class="my-3">
      <a href="/en-gb/delivery-collections-and-returns-information" title="Delivery information">Delivery information</a></div>
      <div class="my-3">
      <a href="/en-gb/store-finder" title="Store finder">Store finder</a></div>
      <div class="my-3">
      <a href="/en-gb/personal-shopping" title="Personal Shopping">Personal Shopping</a></div>
      <div class="my-3">
      <a href="/en-gb/parents-to-be " title="Parents to Be Events">Parents to Be Events</a></div>
    </div>
    <a href="/en-gb/login" class="d-block mx-0 px-3 my-3 text-center">
      <button class="btn btn-primary w-100 os-zoom-out">Login / Register</button>
    </a>`;

    
    catSelected.insertAdjacentHTML('beforeend', loginRegisterContainer);
  } 
};