/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from "./services";
import shared from "./shared";

export default () => {
  setup();
  const { ID, VARIATION } = shared;

  // Hide current video panel.
  const trailer = document.getElementById("trailer");
  if (trailer) trailer.remove();

  // Hide current feature panel.
  const scrollDown = document.getElementById("scrollDown");
  if (scrollDown) scrollDown.remove();

  // Create a new panel and re-structure content.
  const newPanel = document.createElement("section");
  newPanel.classList.add(`${ID}_wrapper`, "row-block", "bg-white");
  newPanel.insertAdjacentHTML(
    "afterbegin",
    `
    <div id="trailer">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7">
            <div class="${ID}_content">
              <p class="${ID}_title">Urenlang kijkplezier</p>
              <div class="${ID}_numbers">
                <div>
                  <span class="${ID}_number">150</span>
                  <span class="${ID}_label">Series</span>
                </div>
                <div>
                  <span class="${ID}_number">34</span>
                  <span class="${ID}_label">Awardwinnende<br> series</span>
                </div>
                <div>
                  <span class="${ID}_number">1013</span>
                  <span class="${ID}_label">Kijkuren</span>
                </div>
              </div>
              <p class="text-left font-18 lh-15 mt-3">Met Canal Digitaal heb je de beste kwaliteitsseries en -films altijd in huis én in je broekzak. Binge series zoals o.a. Mad Men (alle seizoenen!), Normal People, The Great en Gangs of London waar je ook bent. Naast on demand films en series kan je ook gewoon de spraakmakendste tv-programma's van <a href="#" class="underline" data-toggle="modal" data-target="#modal-channels">78 zenders bij</a> ons kijken. Eindeloos kijkplezier!</p>
            </div>
          </div>

          <div class="col-12 col-md-5 ${ID}_video">
            <iframe src="https://player.vimeo.com/video/537635426?title=0&amp;byline=0" width="800" height="260" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" data-vimeo-tracked="true" data-ready="true"></iframe>
          </div>

          <div class="col-12">
            <div class="row pt-md-5 mt-5">
              <div class="col-md-4 mb-md-0 mb-4 justify-content-center d-flex flex-column align-items-center">
                <h3 class="font-18 color-black mb-3">Normal People</h3>
                <div class="d-flex flex-row align-items-center">
                  <img alt="baron-noir-portret" class="img-fluid" src="https://m7cdn.io/canaldigitaal/temp/img/actie/baron-noir/award.svg">
                  <div class="d-flex flex-column text-center">
                    <div class="star-rating">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <p class="text-center d-flex flex-column font-14 text-uppercase">
                      van de Volkskrant
                    </p>
                  </div>
                  <img alt="spiral" class="img-fluid reverse" src="https://m7cdn.io/canaldigitaal/temp/img/actie/baron-noir/award.svg">
                </div>
              </div>

              <div class="col-md-4 mb-md-0 mb-4 justify-content-center d-flex flex-column align-items-center">
                <h3 class="font-18 color-black mb-3">The Great</h3>
                <div class="d-flex flex-row align-items-center">
                  <img alt="baron-noir-portret" class="img-fluid" src="https://m7cdn.io/canaldigitaal/temp/img/actie/baron-noir/award.svg">

                  <p class="text-center d-flex flex-column font-14 text-uppercase">
                    <strong class="text-uppercase">Satellite Awards 2021 </strong>
                    <strong class="text-uppercase">Best Actress</strong>
                  </p>
                  <img alt="baron-noir" class="img-fluid reverse" src="https://m7cdn.io/canaldigitaal/temp/img/actie/baron-noir/award.svg">
                </div>
              </div>

              <div class="col-md-4 mb-md-0 mb-4 justify-content-center d-flex flex-column align-items-center">
                <h3 class="font-18 color-black mb-3">Gangs of London</h3>
                <div class="d-flex flex-row align-items-center">
                  <img alt="when the dust settles" class="img-fluid" src="https://m7cdn.io/canaldigitaal/temp/img/actie/baron-noir/award.svg">
                  <div class="d-flex flex-column text-center">
                    <div class="star-rating">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <p class="text-center d-flex flex-column font-14 text-uppercase">
                      van The Guardian
                    </p>
                  </div>
                  <img alt="baron-noir-portret" class="img-fluid reverse" src="https://m7cdn.io/canaldigitaal/temp/img/actie/baron-noir/award.svg">
                </div>
              </div>
            </div>

            <div class="${ID}_cta">
              <p>Geniet van je gratis 7-daagse proefperiode en betaal daarna slechts € 14.95 per maand.</p>
              <a class="cta-internet btn btn-red1 lh-20 ml-0 smooth-scroll col-8 col-sm ${ID}_track" href="/checkout/producthandlerott?bomvol" style="color: #fff !important;">Start je gratis week</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  );

  if (VARIATION === "1") {
    const banner = document.querySelector(".banner1");
    if (banner) {
      banner.insertAdjacentElement("afterend", newPanel);
    }
  } else {
    const crime = document.getElementById("crime");
    if (crime) {
      crime.insertAdjacentElement("beforebegin", newPanel);
    }
  }

  // Track CTA clicks
  const cta = document.querySelector(`.${ID}_track`);
  if (cta) {
    cta.addEventListener("click", () => {
      fireEvent("Click - CTA");
    });
  }
};
