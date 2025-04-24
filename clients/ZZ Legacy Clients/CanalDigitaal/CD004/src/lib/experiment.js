/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from "../../../../../lib/utils";
// import data from "./data";
import { setup } from "./services";
import shared from "./shared";
const data = window.fixturesData;
export default () => {
  setup();
  const { ID } = shared;
  const $banner = $(".banner1");
  const $channels = $("#urlblock");
  const $fixtures = $(`<section class="row-block ${ID}_fixtures"></section>`);

  const makeImgPath = (img) =>
    `https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd4/${img}`;

  const updateHero = () => {
    $banner
      .find(".banner-title")
      .text("De Eredivisie, jouw favoriete programma’s én series in één app")
      .after(`
        <p class="${ID}_heroText">Of je nou die ene wedstrijd live wilt zien, programma’s wilt terugkijken of een serie wilt bingen...Het kan allemaal met de Canal Digitaal TV App. Het enige dat je nodig hebt is de app en een internetverbinding, zo simpel is het!</p>
      `);

    const $list = $banner.find("ul li");
    if ($list && $list[2]) {
      $list[2].childNodes[2].nodeValue = $list[2].childNodes[2].nodeValue
        .replace("(", "")
        .replace("-)", " ");
    }

    const $sticker = $(".sticker-responsive .sticker-content .uppercase");
    if ($sticker) $sticker.prepend("€");
  };

  const makeItems = (tab) => {
    return data[tab]
      .map(
        (img) => `
        <div class="${ID}_carouselItem">
          <div class="${ID}_itemContent">
            <img width="296" height="155" data-lazy="${makeImgPath(img)}" />
          </div>
        </div>
      `
      )
      .join("");
  };

  const createCarousel = () => {
    const markup = $(`
      <section class="${ID}_carouselContainer container">
        <div class="row">
        <div class="col-xs-12">
          <h2 class="font-xs-24 font-32 color-black bold mt-5 text-uppercase">Mis het niet</h2>
          <p class="${ID}_subheading">Raak niet uitgekeken met ESPN1, ESPN2 en ESPN3, meer dan 150 on demand films en series en tv-shows van 78 zenders.</p>
        </div>
          <div class="${ID}_tabs">
            <div data-tab="football" class="${ID}_tab ${ID}_active">Voetbal</div>
            <div data-tab="series" class="${ID}_tab">Series</div>
            <div data-tab="shows" class="${ID}_tab">Programma’s</div>
          </div>
        </div>
        <div class="row ${ID}_tabContent ${ID}_active" data-tab="football">
          <div class="${ID}_prev ${ID}_prevFootball">
            <i class="lnr lnr-chevron-left color-white font-12 bold" aria-hidden="true"></i>
          </div>

          <div class="${ID}_next ${ID}_nextFootball">
            <i class="lnr lnr-chevron-right color-white font-12 bold" aria-hidden="true"></i>
          </div>

          <div class="${ID}_carousel ${ID}_carouselFootball">
            ${makeItems("football")}
          </div>
        </div>

        <div class="row ${ID}_tabContent" data-tab="series">
          <div class="${ID}_prev ${ID}_prevSeries">
            <i class="lnr lnr-chevron-left color-white font-12 bold" aria-hidden="true"></i>
          </div>

          <div class="${ID}_next ${ID}_nextSeries">
            <i class="lnr lnr-chevron-right color-white font-12 bold" aria-hidden="true"></i>
          </div>

          <div class="${ID}_carousel ${ID}_carouselSeries">
            ${makeItems("series")}
          </div>
        </div>

        <div class="row ${ID}_tabContent" data-tab="shows">
          <div class="${ID}_prev ${ID}_prevShows">
            <i class="lnr lnr-chevron-left color-white font-12 bold" aria-hidden="true"></i>
          </div>

          <div class="${ID}_next ${ID}_nextShows">
            <i class="lnr lnr-chevron-right color-white font-12 bold" aria-hidden="true"></i>
          </div>

          <div class="${ID}_carousel ${ID}_carouselShows">
            ${makeItems("shows")}
          </div>
        </div>
      </section>
    `);

    $banner.after(markup);

    // Initiate sliders
    const sharedSettings = {
      lazyLoad: "ondemand",
      dots: true,
      arrows: true,
      infinite: false,
      slidesToShow: 4.2,
      slidesToScroll: 3,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1398,
          settings: {
            slidesToShow: 3.5,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 2.8,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
          },
        },
      ],
    };

    // Doing individually to support multi-slider arrows.
    $(`.${ID}_carouselFootball`)
      .slick({
        prevArrow: $(`.${ID}_prevFootball`),
        nextArrow: $(`.${ID}_nextFootball`),
        ...sharedSettings,
      })
      .on("swipe", function (event, slick, direction) {
        // make direction logically the same as arrows.
        events.send(
          `Don't miss these`,
          "Carousel swipes",
          direction === "left" ? "right" : "left"
        );
      });

    $(`.${ID}_carouselSeries`)
      .slick({
        prevArrow: $(`.${ID}_prevSeries`),
        nextArrow: $(`.${ID}_nextSeries`),
        ...sharedSettings,
      })
      .on("swipe", function (event, slick, direction) {
        // make direction logically the same as arrows.
        events.send(
          `Don't miss these`,
          "Carousel swipes",
          direction === "left" ? "right" : "left"
        );
      });

    $(`.${ID}_carouselShows`)
      .slick({
        prevArrow: $(`.${ID}_prevShows`),
        nextArrow: $(`.${ID}_nextShows`),
        ...sharedSettings,
      })
      .on("swipe", function (event, slick, direction) {
        // make direction logically the same as arrows.
        events.send(
          `Don't miss these`,
          "Carousel swipes",
          direction === "left" ? "right" : "left"
        );
      });

    // Tabs toggle
    $(`.${ID}_tab`).click(function () {
      const tab = $(this).data("tab");
      $(`.${ID}_tab`).removeClass(`${ID}_active`);
      $(`.${ID}_tabContent`).removeClass(`${ID}_active`);

      events.send(`Don't miss these`, "Tab clicks", tab);

      $(this).addClass(`${ID}_active`);
      $(`.${ID}_tabContent[data-tab="${tab}"]`).addClass(`${ID}_active`);
    });

    // Track arrow clicks
    $(`.${ID}_next`).click(() => {
      events.send(`Don't miss these`, "Carousel swipes", "right");
    });
    $(`.${ID}_prev`).click(() => {
      events.send(`Don't miss these`, "Carousel swipes", "left");
    });
  };

  const createFixturesPanel = () => {
    $channels.after($fixtures);

    const games = [];
    const today = new Date();
    const fiveDays = 1000 * 60 * 60 * 24 * 5;

    // Get the next 15 fixtures or 5 days, whichever contains more games.
    data.fixtures.forEach((game) => {
      const when = new Date(game.when);
      game.when = when;
      const isFuture = when.getTime() > today.getTime();
      const isWithin5Days = when.getTime() <= today.getTime() + fiveDays;

      // Only add more than 15 games when they fall within 5 days.
      if (isFuture) {
        if (games.length >= 15) {
          if (isWithin5Days) games.push(game);
        } else games.push(game);
      }
    });

    const $tableWrapper = $(`
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-5">
            <img src="https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd4/fixtures.png" />
            <div class="${ID}_cta">
              <a class="btn btn-green1 ml-0" href="/checkout/producthandlerott?bomvol">Bestel en kijk direct</a>
            </div>
          </div>
          <div class="col-12 col-lg-7 ${ID}_fixturesCol">
            <h2 class="font-xs-24 font-32 color-black bold text-uppercase">Eredivisie speelschema</h2>
            <div class="${ID}_fixturesTable">
             <div class="${ID}_fixturesHeader">
              <p>Wedstrijd</p>
              <p>Datum</p>
              <p>Tijd</p>
             </div>
              ${games
                .map((game) => {
                  return `
                    <div>
                      <p>${game.home} <span>-</span><span class="${ID}_mobileVs">VS</span> ${game.away}</p>
                      <p>${game.dateString}<span class="${ID}_mobileTime">${game.timeString}</span></p>
                      <p>${game.timeString}</p>
                    </div>
                  `;
                })
                .join("")}
            </div>
            <div class="${ID}_fixturesToggle">Bekijk meer</div>

            <div class="${ID}_ctaMobile">
              <a href="/checkout/producthandlerott?bomvol" class=" btn btn-green1 ml-0">Bestel en kijk direct</a>
            </div>

          </div>
        </div>
      </div>
    `);

    $fixtures.append($tableWrapper);

    const $table = $(`.${ID}_fixturesTable`);
    const $toggle = $(`.${ID}_fixturesToggle`);
    $toggle.click(function () {
      $table[0].scrollTop = 0;
      $table.toggleClass(`${ID}_expanded`);
      $(this).text(
        $(this).text() === "Bekijk meer" ? "Minder zien" : "Bekijk meer"
      );
    });
  };

  const updateChannels = () => {
    const $carousel = $(`.${ID}_carouselContainer`);

    // Move channels.
    $carousel.after($channels);

    // Change title styles.
    const $title = $channels.find(".col-10");
    $title.removeClass("col-10 mx-auto").addClass(`${ID}_channelsTitle`);
    const $titleText = $title.find("p");
    $titleText.text("Inclusief 78 Zenders");
    $titleText.after(
      `<p class="${ID}_subheading">Krijg toegang tot de programma's van deze zenders.</p>`
    );

    const $viewAll = $channels.find(".col-sm-8").children().last();
    $viewAll.parent().after($viewAll);
    $viewAll.addClass(`${ID}_channelsAll`);
    $viewAll.click(() => {
      events.send(`View all channels`, "Open overlay");
    });
  };

  const removeElements = () => {
    // The last elm is the only one with a unique class to target.
    // We use it as the end panel, and remove the preceeding panels.
    const $lastElm = $("#page-wrapper section.z1");
    $lastElm
      .prev("section")
      .prev("section")
      .prev("section")
      .prev("section")
      .prev("section")
      .addClass(`${ID}_hide`);
    $lastElm
      .prev("section")
      .prev("section")
      .prev("section")
      .prev("section")
      .addClass(`${ID}_hide`);
    $lastElm
      .prev("section")
      .prev("section")
      .prev("section")
      .addClass(`${ID}_hide`);
    $lastElm.prev("section").prev("section").addClass(`${ID}_hide`);
    $lastElm.prev("section").addClass(`${ID}_hide`);
    $lastElm.addClass(`${ID}_hide`);
  };

  const replaceReviews = () => {
    const $lastElm = $("#page-wrapper section.z1");

    // Reviews follow the last elm, we need to update them
    const $reviews = $lastElm.next("section").find(".row.align-items-start");
    const $newMarkup = $(`
            <div class="col-lg-4 px-0 d-inline-flex flex-column">
            <div class="col-12 mt-4 mt-lg-0 h-auto">
                <a class="d-block opacity-hover-90 align-self-end" href="https://www.feefo.com/nl_NL/reviews/m7group-canaldigitaal/5bfe5cbae4b0d6ca68ea72fc/customer-review-fluitje-van-een-cent?displayFeedbackType=BOTH" target="_blank">
                    <div class="star-rating">
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>

                    <p class="font-18 bold m-0 lh-auto mt-2">
                       Mattie De Graaf 02-04-2021
                    </p>
                    <p class="font-16 m-0">
                        Tegek
                    </p>

                </a>
            </div>
             <div class="col-12 mt-4">
                <a class="d-block opacity-hover-90 align-self-end" href="https://www.feefo.com/nl_NL/reviews/m7group-canaldigitaal/5bfe5cbae4b0d6ca68ea72fc/customer-review-fluitje-van-een-cent?displayFeedbackType=BOTH" target="_blank">
                    <div class="star-rating">
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>

                    <p class="font-18 bold m-0 lh-auto mt-2 ">
                        Willem Cox 03-04-2021
                    </p>
                    <p class="font-16 m-0 ">
                        Perfect
                    </p>

                </a>
            </div>
            </div>
             <div class="col-lg-4 mt-lg-0 mt-4">
                <a class="d-block opacity-hover-90 align-self-end" href="https://www.feefo.com/nl_NL/reviews/m7group-canaldigitaal/5bfe5cbae4b0d6ca68ea72fc/customer-review-fluitje-van-een-cent?displayFeedbackType=BOTH" target="_blank">
                    <div class="star-rating">
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>

                    <p class="font-18 bold m-0 lh-auto mt-2 ">
                        Geert van eerden 01-04-2021
                    </p>
                    <p class="font-16 m-0 ">
                       Werkt fijn, dik tevreden mee.
                    </p>

                </a>
                 <a class="d-block opacity-hover-90 align-self-end mt-4" href="https://www.feefo.com/nl_NL/reviews/m7group-canaldigitaal/5bfe5cbae4b0d6ca68ea72fc/customer-review-fluitje-van-een-cent?displayFeedbackType=BOTH" target="_blank">
                    <div class="star-rating">
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>

                    <p class="font-18 bold m-0 lh-auto mt-2 ">
                        Betsy Thomas 01-04-2021
                    </p>
                    <p class="font-16 m-0 ">
                       Zeer goed
                    </p>

                </a>
            </div>
        `);

    $reviews.empty().append($newMarkup);
  };

  const createCTAPanel = () => {
    const $cta = $(`
      <section class="bg-grey1 row-block ${ID}_ctaPanel">
      <div class="container">
        <div class="row justify-content-between align-items-center">
            <div class="col-12 col-lg-5">
              <h2 class="font-xs-24 font-32 bold text-uppercase">
                Geniet van de TV App voor slechts <span class="color-red1">€14,95</span> p.m. Nu de eerste week <span class="color-green1">gratis</span>
              </h2>

              <ul class="pt-2">
                <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>78 zenders incl. ESPN, ESPN2, en ESPN3</li>

                <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>Uren kijkplezier met Canal+ Series</li>
                <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>Kijk op elk scherm</li>
                <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>Pauzeer live tv</li>
                <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>Kijk tot 7 dagen terug</li>
                    <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>Neem je favoriete programma op</li>
                    <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>Geen kastjes en geen kabels nodig, alleen internet</li>
                    <li class="my-0 font-md-18 align-items-start lh-10 mb-3">
                    <i class="lnr-checkmark stroke-3 color-green1 mr-2 font-10 font-md-13"></i>Maandelijks opzegbaar</li>
                </ul>

                <div class="${ID}_cta">
                  <a href="/checkout/producthandlerott?bomvol" class=" btn btn-green1 ml-0">Bestel en kijk direct</a>
                </div>
            </div>
            <div class="col-12 col-lg-6">
              <div>
                <img src="https://brainlabs-media.s3.eu-west-2.amazonaws.com/cd4/cta.png" />
              </div>
              <div class="${ID}_ctaMobile">
                <a href="/checkout/producthandlerott?bomvol" class=" btn btn-green1 ml-0">Bestel en kijk direct</a>
              </div>
            </div>
          </div>
        </div>
      </section>`);
    $fixtures.after($cta);
  };

  const init = () => {
    updateHero();
    createCarousel();
    updateChannels();
    createFixturesPanel();
    createCTAPanel();
    removeElements();
    replaceReviews();
  };

  init();
};
