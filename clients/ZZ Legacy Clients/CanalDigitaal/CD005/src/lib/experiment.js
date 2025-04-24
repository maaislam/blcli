/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from "../../../../../lib/utils";
import { fireEvent, setup } from "./services";
import shared from "./shared";

export default () => {
  setup();
  const { ID, VARIATION } = shared;
  const imgSrc = "https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd5/";

  // Add image collage
  const makeCollage = () => `
    <div class="${ID}_collage-wrapper">
      <div class="${ID}_collage">
        <div style="grid-area: item1;" class="${ID}_collage-item">
          <img src="${imgSrc}high-fidelity.png" style="margin-left:0%">
          <img src="${imgSrc}gangs-of-london.png" style="margin-left:0%">
          <img src="${imgSrc}high-fidelity.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item2;" class="${ID}_collage-item">
          <img src="${imgSrc}powerpuff-girls.png" style="margin-left:0%">
          <img src="${imgSrc}love-nature.png" style="margin-left:0%">
          <img src="${imgSrc}powerpuff-girls.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item3;" class="${ID}_collage-item">
          <img src="${imgSrc}socials-seks-centen.png" style="margin-left:0%">
          <img src="${imgSrc}chateau-meiland.png" style="margin-left:0%">
          <img src="${imgSrc}socials-seks-centen.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item4;" class="${ID}_collage-item">
          <img src="${imgSrc}rupaul.png" style="margin-left:0%">
          <img src="${imgSrc}jinek.png" style="margin-left:0%">
          <img src="${imgSrc}rupaul.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item5;" class="${ID}_collage-item">
          <img src="${imgSrc}normal-people.png" style="margin-left:0%">
          <img src="${imgSrc}small-axe.png" style="margin-left:0%">
          <img src="${imgSrc}normal-people.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item6;" class="${ID}_collage-item">
          <img src="${imgSrc}catch22.png" style="margin-left:0%">
          <img src="${imgSrc}the-tudors.png" style="margin-left:0%">
          <img src="${imgSrc}catch22.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item7;" class="${ID}_collage-item">
          <img src="${imgSrc}mad-men.png" style="margin-left:0%">
          <img src="${imgSrc}voice-kids.png" style="margin-left:0%">
          <img src="${imgSrc}mad-men.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item8;" class="${ID}_collage-item">
          <img src="${imgSrc}eredivisie.png" style="margin-left:0%">
          <img src="${imgSrc}the-great.png" style="margin-left:0%">
          <img src="${imgSrc}eredivisie.png" style="margin-left:100%">
        </div>

        <div style="grid-area: item9;" class="${ID}_collage-item">
          <img src="${imgSrc}nick-simon-kees.png" style="margin-left:0%">
          <img src="${imgSrc}ramy.png" style="margin-left:0%">
          <img src="${imgSrc}nick-simon-kees.png" style="margin-left:100%">
        </div>
      </div>
    </div>
  `;

  const makeTitle = () => {
    if (VARIATION === "1") {
      return "Voetbal, series en je favoriete tv-programma's in één app";
    }
    return "DE MEEST <br> COMPLETE TV-APP";
  };

  const makeDescription = () => {
    if (VARIATION === "1") {
      return `
      <ul class="${ID}_usps">
        <li>
          <a href="#" class="${ID}_link" data-target="#modal-channels" data-toggle="modal">78 zenders incl. ESPN, ESPN2, ESPN3</a>
        </li>
        <li>
          Canal+ Series: urenlang kijkplezier met de beste series en films on demand.
        </li>
        <li>
          Kijk live of tot 7 dagen terug
        </li>
        <li>
          Kijk op je telefoon, laptop, tablet of smart-tv
        </li>
        <li>
          Maandelijks opzegbaar
        </li>
      </ul>
      `;
    } else {
      return `
        <p class="${ID}_subheading">
          Live Eredivisie-voetbal, awardwinnende series en films en tv-programma's in één app
        </p>
      `;
    }
  };

  const init = () => {
    // Update banner
    const $banner = document.querySelector(".banner1");
    const $container = $banner.querySelector(".container");

    if ($container) {
      $container.innerHTML = `
        <div class="row ${ID}_row" style="opacity: 0;">
          <div class="col-12 col-md-6">${makeCollage()}</div>
          <div class="col-12 col-md-6 ${ID}_content">
          <p>Slechts € 14,95${
            VARIATION === "1" ? ` per maand` : ` per maand!`
          }</p>
            <h1>${makeTitle()}</h1>
            ${makeDescription()}
            <ul class="${ID}_ctas">
              <li>
                <a class="btn btn-green1 ${ID}_primaryCta" href="/checkout/producthandlerott?bomvol">Start je gratis week</a>
              </li>
              <li>
                <a class="btn outline btn-white border-width-1 ${ID}_scroll">Ontdek meer</a>
              </li>
            </ul>
          </div>
        </div>
      `;

      // Event tracking.
      const primaryCta = document.querySelector(`.${ID}_primaryCta`);
      const secondaryCta = document.querySelector(`.${ID}_scroll`);
      const linkCta = document.querySelector(`.${ID}_link`);

      if (primaryCta) {
        primaryCta.addEventListener("click", () => {
          fireEvent("Click - primary_cta");
        });
      }

      if (secondaryCta) {
        secondaryCta.addEventListener("click", () => {
          fireEvent("Click - secondary_cta");
        });
      }

      if (linkCta) {
        linkCta.addEventListener("click", () => {
          fireEvent("Click - channels_link");
        });
      }

      const $row = $container.querySelector(`.${ID}_row`);
      setTimeout(() => {
        $container.style.opacity = "100%";
        $row.style.opacity = "100%";
      }, 300);
    }

    pollerLite([() => !!window.jQuery], () => {
      const $ = window.jQuery;
      $(`.${ID}_scroll`).click(() => {
        const $anchor = $(".banner1").next("section");
        $("html, body").animate(
          {
            scrollTop: $anchor.offset().top - 60,
          },
          500
        );
      });
    });
  };

  init();
};
