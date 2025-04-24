/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const pageType = () => {
  const dark = [
    "canaldigitaal.nl/actie/series/v/",
    "canaldigitaal.nl/actie/series/m/",
  ];

  let type = "light";
  dark.forEach((url) => {
    if (window.location.href.indexOf(url) !== -1) type = "darl";
  });

  return type;
};

const closeSvg = `<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<line y1="-1" x2="29.6985" y2="-1" transform="matrix(-0.707107 0.707107 -0.817077 -0.576529 22 0)" stroke="white" stroke-width="2"/>
<line y1="-1" x2="30.4138" y2="-1" transform="matrix(-0.723356 -0.690476 0.804149 -0.594427 24 21)" stroke="white" stroke-width="2"/>
</svg>
`;
const steps = `
<div class="row align-items-top mt-md-4">
            <div class="col-md my-3 my-lg-0">
                <div class="item row align-items-stretch">
                    <div class="col-12">
                        <a href="/checkout/producthandlerott?bomvol">

                         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 20 20" class="icon-48 ${ID}_stepsColor d-block mx-auto">
                            <path d="M9.5 11c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zM9.5 1c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5z" fill="#000000"></path>
                            <path d="M11.5 20h-10c-0.827 0-1.5-0.673-1.5-1.5 0-0.068 0.014-1.685 1.225-3.3 0.705-0.94 1.67-1.687 2.869-2.219 1.464-0.651 3.283-0.981 5.406-0.981 0.351 0 0.698 0.011 1.031 0.031 0.276 0.017 0.485 0.255 0.468 0.53s-0.255 0.486-0.53 0.468c-0.313-0.019-0.639-0.029-0.969-0.029-3.487 0-6.060 0.953-7.441 2.756-1.035 1.351-1.058 2.732-1.059 2.746 0 0.274 0.224 0.498 0.5 0.498h10c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" fill="#000000"></path>
                            <path d="M15.5 20c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zM15.5 12c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z" fill="#000000"></path>
                            <path d="M17.5 15h-1.5v-1.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v1.5h-1.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h1.5v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h1.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5z" fill="#000000"></path>
                        </svg>
                        </a>
                    </div>
                    <div class="col mt-3 text-center">
                        <p class="${ID}_stepsColor bold font-15 mb-0">
                            <a href="/checkout/producthandlerott?bomvol">Stap 1:</a>
                        </p>
                        <p class="mb-2 ${ID}_stepsColor lh-auto w-80 d-table font-16 font-lg-18">Maak een account aan</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-auto align-self-center hidden-sm-down">
                <i class="lnr-chevron-right font-40 font-md-80 light opacity-20"></i>
            </div>

            <div class="col-md my-3 my-lg-0">
                <div class="item row align-items-stretch">
                    <div class="col-12">
                          <svg version="1.1" width="20" height="20" viewBox="0 0 20 20" class="icon-48 ${ID}_stepsColor d-block mx-auto">
                                <path d="M18.5 5h-3.001c0.315-0.418 0.501-0.938 0.501-1.5 0-1.378-1.122-2.5-2.5-2.5-1.39 0-2.556 1.101-3.127 1.758-0.346 0.397-0.644 0.823-0.873 1.235-0.229-0.412-0.527-0.837-0.873-1.235-0.571-0.656-1.737-1.758-3.127-1.758-1.378 0-2.5 1.122-2.5 2.5 0 0.562 0.187 1.082 0.501 1.5h-3.001c-0.276 0-0.5 0.224-0.5 0.5v3c0 0.276 0.224 0.5 0.5 0.5h0.5v9.5c0 0.827 0.673 1.5 1.5 1.5h14c0.827 0 1.5-0.673 1.5-1.5v-9.5h0.5c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5zM11.127 3.414c0.782-0.899 1.647-1.414 2.373-1.414 0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5h-3.378c0.173-0.442 0.523-1.032 1.005-1.586zM11 19h-3v-13h3v13zM4 3.5c0-0.827 0.673-1.5 1.5-1.5 0.726 0 1.591 0.515 2.373 1.414 0.482 0.554 0.832 1.144 1.005 1.586h-3.378c-0.827 0-1.5-0.673-1.5-1.5zM1 6h6v2h-6v-2zM2 18.5v-9.5h5v10h-4.5c-0.276 0-0.5-0.224-0.5-0.5zM17 18.5c0 0.276-0.224 0.5-0.5 0.5h-4.5v-10h5v9.5zM18 8h-6v-2h6v2z" fill="#000000" xmlns="http://www.w3.org/2000/svg"> </path>
                            </svg>

                    </div>
                    <div class="col mt-3 text-center">
                        <p class="${ID}_stepsColor bold font-15 mb-0">Stap 2:</p>
                        <p class="mb-2 ${ID}_stepsColor lh-auto w-80 d-table font-16 font-lg-18">Verifieer je account en kies een wachtwoord</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-auto align-self-center hidden-sm-down">
                <i class="lnr-chevron-right font-40 font-md-80 light opacity-20"></i>
            </div>

            <div class="col-md my-3 my-lg-0">
                <div class="item row align-items-stretch">
                    <div class="col-12">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 20 20" class="icon-48 ${ID}_stepsColor d-block mx-auto">
                            <path d="M11.5 14h-8c-0.827 0-1.5-0.673-1.5-1.5v-8c0-0.827 0.673-1.5 1.5-1.5h13c0.827 0 1.5 0.673 1.5 1.5v1c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-1c0-0.276-0.224-0.5-0.5-0.5h-13c-0.276 0-0.5 0.224-0.5 0.5v8c0 0.276 0.224 0.5 0.5 0.5h8c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" fill="#000000"></path>
                            <path d="M11.5 18h-10c-0.827 0-1.5-0.673-1.5-1.5v-1c0-0.276 0.224-0.5 0.5-0.5h11c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-10.5v0.5c0 0.276 0.224 0.5 0.5 0.5h10c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" fill="#000000"></path>
                            <path d="M18.5 18h-4c-0.827 0-1.5-0.673-1.5-1.5v-8c0-0.827 0.673-1.5 1.5-1.5h4c0.827 0 1.5 0.673 1.5 1.5v8c0 0.827-0.673 1.5-1.5 1.5zM14.5 8c-0.276 0-0.5 0.224-0.5 0.5v8c0 0.276 0.224 0.5 0.5 0.5h4c0.276 0 0.5-0.224 0.5-0.5v-8c0-0.276-0.224-0.5-0.5-0.5h-4z" fill="#000000"></path>
                            <path d="M16.5 16c-0.132 0-0.26-0.053-0.353-0.147s-0.147-0.222-0.147-0.353 0.053-0.261 0.147-0.353c0.093-0.093 0.222-0.147 0.353-0.147s0.261 0.053 0.353 0.147c0.093 0.093 0.147 0.222 0.147 0.353s-0.053 0.261-0.147 0.353c-0.093 0.093-0.222 0.147-0.353 0.147z" fill="#000000"></path>
                        </svg>
                    </div>
                    <div class="col mt-3 text-center">
                        <p class="${ID}_stepsColor bold font-15 mb-0">Stap 3:</p>
                        <p class="mb-2 ${ID}_stepsColor lh-auto w-80 d-table font-16 font-lg-18">Kijk direct op je telefoon, laptop of tablet</p>
                    </div>
                </div>
            </div>

             <div class="col-12 mt-lg-5 pt-3 pt-lg-0">
                <a href="/checkout/producthandlerott?bomvol" class="${ID}_primaryClick btn d-inline-block btn-red1 d-table lh-20 mt-4">START JE GRATIS WEEK</a>
            </div>
        </div>
`;

const newPanelv1 = `
  <section class="${ID}_panel ${ID}_${pageType()} row-block position-relative border-bottom">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2 class="font-family-1">Wat is de TV app?</h2>
          <p class="${ID}_content">
            De Canal Digitaal TV App geeft je toegang tot: live tv, de beste on
            demand series en films, én live Eredivisie voetbal. Het beste wat tv
            te bieden heeft in één app. Kijk op al je devices.
          </p>
          <ul class="${ID}_usps">
            <li>Kijk zonder kastjes en kabels op je smart-tv</li>
            <li>
              Op vakantie? Oók binnen de hele EU geniet je van tv met de app
            </li>
            <li>
              Geen duur alles-in-1 abonnement meer, je hebt alleen de TV App nodig
              en 4G of Wifi
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <img src="https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd9/cd009_v1_panel.png" />
        </div>
        <div class="col-md-12">
          <span class="${ID}_link">Is mijn tv geschikt?</span>
        </div>
      </div>

      ${steps}
    </div>
  </section>
`;

const newPanelv2 = `
<section class="${ID}_panel ${ID}_${pageType()} row-block position-relative border-bottom">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2 class="font-family-1">Wat is de TV app?</h2>
          <p class="${ID}_content">
            Met de TV App kijk je de meest spraakmakende tv-programma’s, binge je de beste on demand series en films én kijk je live Eredivisie-voetbal.
          </p>
          <ul class="${ID}_usps">
            <li>Live voetbal met ESPN, ESPN2 en ESPN3</li>
            <li>
              Kijk op je smart-tv of een van je andere devices
            </li>
            <li>
              Standaard in de TV App: kijk on demand series en films van o.a. STARZPLAY, Hulu, BBC en Canal+. Het aanbod wordt voortdurend aangevuld
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <img src="https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd9/cd009_v2_panel.png" />
        </div>
        <div class="col-md-12">
          <span class="${ID}_link">Is mijn tv geschikt?</span>
        </div>
      </div>

      ${steps}
    </div>
  </section>
  `;

const popup = document.createElement("div");

const showPopup = () => {
  popup.classList.add(`${ID}_active`);
  document.documentElement.classList.add(`${ID}_noscroll`);
};

const closePopup = () => {
  popup.classList.remove(`${ID}_active`);
  document.documentElement.classList.remove(`${ID}_noscroll`);
};

const createPopupv1 = () => {
  if (document.querySelector(`.${ID}_popup`)) return;

  // Add popup to the dom
  popup.classList.add(`${ID}_popup`);
  popup.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="${ID}_content ${ID}_${pageType()}">
        <h2 class="${ID}_${pageType()}_title">Welke smart tv's zijn geschikt?</h2>
        <div class="${ID}_flex">
          <div class="${ID}_image"><img src="https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd9/cd009_v1_popup.png" alt="tv" /></div>
          <div class="${ID}_${pageType()}_text">
            <span class="${ID}_close">${closeSvg}</span>
            <p class="${ID}_${pageType()}_text">Je kan de smart TV app installeren op de meeste smart tv's sinds 2016</p>
            <ul class="${ID}_${pageType()}_text">
              <li>Samsung</li>
              <li>LG</li>
              <li>Toshiba</li>
              <li>Hitachi</li>
              <li>Hyundai</li>
              <li>Nikkei</li>
              <li>Telefunken</li>
              <li>Panasonic</li>
              <li>Sony (from Android 7)</li>
              <li>Philips (from Android 7)</li>
            </ul>
            <p class="${ID}_${pageType()}_text">Zoek in de App store van je tv naar "Canal Digitaal", als je de App ziet, maak dan een account aan en begin direct met kijken. Twijfel je? <a class="${ID}_linkSpec" href="https://www.canaldigitaal.nl/klantenservice/alles-over/smart-tv-app/geschikte-smart-tvs/">Hier is een lijst met ondersteunde tv's.</a></p>
          </div>
        </div>
      </div>
    `
  );

  document.body.insertAdjacentElement("beforeend", popup);
};

const createPopupv2 = () => {
  if (document.querySelector(`.${ID}_popup`)) return;

  // Add popup to the dom
  popup.classList.add(`${ID}_popup`);
  popup.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="${ID}_content ${ID}_${pageType()}">
        <h2 class="${ID}_${pageType()}_title">Welke smart tv's zijn geschikt?</h2>
        <div class="${ID}_flex">
          <div class="${ID}_image"><img src="https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd9/cd009_v2_popup.png" alt="tv" /></div>
          <div>
            <span class="${ID}_close">${closeSvg}</span>
            <p class="${ID}_${pageType()}_text">Je kan de smart TV app installeren op de meeste smart tv's sinds 2016</p>
            <ul class="${ID}_${pageType()}_text">
              <li>Samsung</li>
              <li>LG</li>
              <li>Toshiba</li>
              <li>Hitachi</li>
              <li>Hyundai</li>
              <li>Nikkei</li>
              <li>Telefunken</li>
              <li>Panasonic</li>
              <li>Sony (from Android 7)</li>
              <li>Philips (from Android 7)</li>
            </ul>
            <p class="${ID}_${pageType()}_text">Zoek in de App store van je tv naar "Canal Digitaal", als je de App ziet, maak dan een account aan en begin direct met kijken. Twijfel je? <a class="${ID}_linkSpec" href="https://www.canaldigitaal.nl/klantenservice/alles-over/smart-tv-app/geschikte-smart-tvs/">Hier is een lijst met ondersteunde tv's.</a></p>
          </div>
        </div>
      </div>
    `
  );

  document.body.insertAdjacentElement("beforeend", popup);
};

const addCTABlock = () => {
  const back = localStorage.getItem(`${ID}_visited`);
  const markup = `
  <div class="${ID}_cta">
    <a class="${ID}_primary btn d-inline-block btn-red1 d-table lh-20 mt-4" href="/checkout/producthandlerott?bomvol">Start je gratis week</a>
    <a class="${ID}_secondary btn mr-0 outline btn-grey1 border-width-1 lh-20" href="${back}">Ontdek meer</a>
  </div>
  `;

  const faqdetails = document.querySelector(".faqdetail");
  if (faqdetails) {
    faqdetails.nextElementSibling.insertAdjacentHTML("afterbegin", markup);

    const cta = document.querySelector(`.${ID}_primary`);
    if (cta) {
      cta.addEventListener("click", () => {
        fireEvent("Click - CTA (tvs page)");
      });
    }
    const ctaSecondary = document.querySelector(`.${ID}_secondary`);
    if (ctaSecondary) {
      ctaSecondary.addEventListener("click", () => {
        fireEvent("Click - Back (tvs page)");
      });
    }
  }
};

const hideCurrentPanels = () => {
  if (pageType() === "light") {
    const first = document.querySelector("#crime ~ section");
    if (first) {
      const second = first.nextElementSibling;
      first.classList.add(`${ID}_hidden`);
      second.classList.add(`${ID}_hidden`);
    }
  } else {
    const ctas = document.querySelectorAll(".cta-internet");
    if (ctas) {
      if (ctas[2]) {
        ctas[2].closest("section").classList.add(`${ID}_hidden`);
      }
      if (ctas[3]) {
        ctas[3].closest("section").classList.add(`${ID}_hidden`);
      }
    }
  }
};

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // This page gets CTA panel
  if (
    localStorage.getItem(`${ID}_visited`) &&
    window.location.href.indexOf(
      "/klantenservice/alles-over/smart-tv-app/geschikte-smart-tvs/"
    ) !== -1
  ) {
    addCTABlock();
    return;
  }

  // The other pages get a new panel and popup
  localStorage.setItem(`${ID}_visited`, window.location.href);

  let anchor = document.getElementById("crime");
  if (pageType() === "light") {
    anchor = document.getElementById("urlblock");
    if (anchor) {
      anchor = anchor.closest("section.row-block");
    }
  }

  // Add new panel & popup.
  if (VARIATION === "1") {
    if (anchor) {
      anchor.insertAdjacentHTML("beforebegin", newPanelv1);
      hideCurrentPanels();
    }
    createPopupv1();
  } else if (VARIATION === "2") {
    if (anchor) {
      anchor.insertAdjacentHTML("beforebegin", newPanelv2);
      hideCurrentPanels();
    }
    createPopupv2();
  }

  // Popup triggers
  const trigger = document.querySelector(`.${ID}_link`);
  if (trigger) {
    trigger.addEventListener("click", () => {
      showPopup();
      fireEvent("Click - Is my tv compatible?");
    });
  }

  // POpup close
  const close = document.querySelector(`.${ID}_close`);
  if (close) {
    close.addEventListener("click", () => {
      closePopup();
    });
  }

  // Tracking
  const linkSpec = document.querySelector(`.${ID}_linkSpec`);
  if (linkSpec) {
    linkSpec.addEventListener("click", () => {
      fireEvent("Click - supported tvs page");
    });
  }
  const cta = document.querySelector(`.${ID}_primaryClick`);
  if (cta) {
    cta.addEventListener("click", () => {
      fireEvent("Click - CTA (panel)");
    });
  }
};
