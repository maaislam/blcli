import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const entryElement = document.querySelector("#header-promo-banner");
  const rootElement = document.createElement("div");

  rootElement.innerHTML = `
  <a href='https://www.hotelchocolat.com/uk/shop/?pmin=35&pmax=300&inStockOnly=true' style='display: block; background: black; color: white; padding: 11px; text-align: center; font-size: 16px;'>
    Spend over £35 and pay in 3 interest-free instalments with
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 452.9 101.1" style="enable-background:new 0 0 452.9 101.1; width: 64px; height: auto; margin-left: 2px;" xml:space="preserve" fill='#fff'>
    <path d="M79.7,0H57.4c0,18.3-8.4,35-23,46l-8.8,6.6l34.2,46.6h28.1L56.4,56.3C71.3,41.5,79.7,21.5,79.7,0z"/>
    <rect width="22.8" height="99.2"/>
    <rect x="94.5" width="21.5" height="99.2"/>
    <path d="M304.6,28.7c-8.2,0-16,2.5-21.2,9.6v-7.7H263v68.6h20.7v-36c0-10.4,7-15.5,15.4-15.5c9,0,14.2,5.4,14.2,15.4v36.2h20.5V55.6
      C333.8,39.6,321.1,28.7,304.6,28.7z"/>
    <path d="M181,30.6V35c-5.8-4-12.8-6.3-20.4-6.3c-20,0-36.2,16.2-36.2,36.2s16.2,36.2,36.2,36.2c7.6,0,14.6-2.3,20.4-6.3v4.4h20.5
      V30.6H181z M162.3,82.5c-10.3,0-18.6-7.9-18.6-17.6s8.3-17.6,18.6-17.6c10.3,0,18.6,7.9,18.6,17.6S172.6,82.5,162.3,82.5z"/>
    <path d="M233.3,39.5v-8.9h-21v68.6h21.1v-32c0-10.8,11.7-16.6,19.8-16.6c0.1,0,0.2,0,0.2,0v-20C245.1,30.6,237.4,34.2,233.3,39.5z"
      />
    <path d="M397.6,30.6V35c-5.8-4-12.8-6.3-20.4-6.3c-20,0-36.2,16.2-36.2,36.2s16.2,36.2,36.2,36.2c7.6,0,14.6-2.3,20.4-6.3v4.4h20.5
      V30.6H397.6z M378.9,82.5c-10.3,0-18.6-7.9-18.6-17.6s8.3-17.6,18.6-17.6c10.3,0,18.6,7.9,18.6,17.6
      C397.6,74.6,389.2,82.5,378.9,82.5z"/>
    <path d="M440,74.9c-7.1,0-12.9,5.8-12.9,12.9c0,7.1,5.8,12.9,12.9,12.9c7.1,0,12.9-5.8,12.9-12.9C452.9,80.6,447.1,74.9,440,74.9z"
      />
    </svg>
  </a>
  `;

  entryElement.parentNode.insertBefore(rootElement, entryElement.nextSibling);
};
