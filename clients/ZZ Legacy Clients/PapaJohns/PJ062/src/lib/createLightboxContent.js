export default (orderMethod, hideMinimumForDelivery, hidePreOrder, ctaButton) => {
  const lightboxMainContainer = document.querySelector('#fancyStoreConfirm');
  // Get Store Details
  const storeDetails = lightboxMainContainer.querySelector('.storeDetails');
  const storeName = storeDetails.querySelector('h1').innerText;
  const storeMapContainer = lightboxMainContainer.querySelector('.location');
  const storeMap = storeMapContainer.querySelector('img').getAttribute('src');
  const storeAddress = storeDetails.querySelector('.address').innerHTML;
  const openingHours = storeDetails.querySelector('.openingHours').outerHTML;
  const buttons = storeDetails.querySelector('.buttons');
  const minimumDeliveryAmount = storeDetails.querySelector('p strong').innerText;

  const newLightboxContent = `<div class="PJ062-lightbox__wrapper">
    <div class="PJ062-lighbox__container">
      <ul class="PJ062-lightbox__content">
        <li class="PJ062-lightbox__item main" id="PJ062-main">
          <div class="PJ062-orderMethod">${orderMethod} from</div>
          <div class="PJ062-storeAddress">${storeName}</div>
          <div class="PJ062-minimumAmount ${hideMinimumForDelivery}">*${minimumDeliveryAmount}</div>
          <div class="PJ062-orderButton">${ctaButton}</div>
          <div class="PJ062-preOrder ${hidePreOrder}">Currently closed PRE-ORDER for later</div>
        </li>
        <li class="PJ062-lightbox__item store_address" id="PJ062-store_address">
          <div class="PJ062-itemContent">
            <span class="PJ062-icon"><div id="PJ062-store"></div></span>
            <span class="PJ062-label"><div>Store address</div></span>
            <span class="PJ062-subLabel"><div>View full address</div></span>
            <span class="PJ062-icon__toggle"><div></div></span>
          </div>
          <div class="PJ062-itemContent__hidden">
            <div class="PJ062-storeAddress">${storeName}</div>
            <div>${storeAddress}</div>
          </div>
        </li>
        <li class="PJ062-lightbox__item store_map" id="PJ062-store_map">
          <div class="PJ062-itemContent">
            <span class="PJ062-icon"><div id="PJ062-map"></div></span>
            <span class="PJ062-label"><div>Store</div></span>
            <span class="PJ062-subLabel"><div>View map</div></span>
            <span class="PJ062-icon__toggle"><div></div></span>
          </div>
          <div class="PJ062-itemContent__hidden">
            <div style="background-image: url('${storeMap}');"></div>
          </div>
        </li>
        <li class="PJ062-lightbox__item opening_hours" id="PJ062-opening_hours">
          <div class="PJ062-itemContent">
            <span class="PJ062-icon"><div id="PJ062-hours"></div></span>
            <span class="PJ062-label"><div>Opening Hours</div></span>
            <span class="PJ062-subLabel"><div>View our hours</div></span>
            <span class="PJ062-icon__toggle"><div></div></span>
          </div>
          <div class="PJ062-itemContent__hidden">
            <div>${openingHours}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>`;

  // ----- Phone Number Item
  // <li class="PJ062-lightbox__item contact_details" id="PJ062-contact_details">
  //   <div class="PJ062-itemContent">
  //     <span class="PJ062-icon"><div id="PJ062-contact"></div></span>
  //     <span class="PJ062-label"><div>Contact details</div></span>
  //     <span class="PJ062-subLabel"><div>Phone number</div></span>
  //     <span class="PJ062-icon__toggle"><div></div></span>
  //   </div>
  //   <div class="PJ062-itemContent__hidden">
  //     <div>Unavailable</div>
  //   </div>
  // </li>

  return newLightboxContent;
};