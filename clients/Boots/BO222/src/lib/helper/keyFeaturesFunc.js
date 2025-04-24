import shared from "../../../../../../core-files/shared";
import { featureDataGenerator } from "./featureDataGenerator";
import { featuresGenerator } from "./keyFeaturesDOM";
import { paypalIMG, statSVG } from "../assets/svgIcons";
import { pollerLite } from "../../../../../../lib/utils";

const { ID, VARIATION } = shared;

export const keyFeaturesFunc = (keyFeaturesDataRaw) => {
  const keyFeaturesData = featureDataGenerator(keyFeaturesDataRaw);
  // console.log(keyFeaturesData);
  const newkeyFeatures = featuresGenerator(keyFeaturesData);
  const rowContainer = document.querySelector(`#estore_productpage_template_container .rowContainer div.row:nth-child(2)`);
  //   prodDetailsContainer.insertAdjacentHTML("beforebegin", newkeyFeatures);
  rowContainer.insertAdjacentHTML("afterend", newkeyFeatures);
  $(document).ready(function () {
    // accordion 1
    $(`.${ID}-newKeyFeatures-accordion .acc-head .view-full`).on("click", function () {
      $(this).toggleClass(`${ID}--x-hidden`);
      $(`.${ID}-newKeyFeatures-accordion .acc-head .view-less`).toggleClass(`${ID}--x-hidden`);
      $(`.${ID}-newKeyFeatures-description`).toggleClass(`auto-ellipsis`);
      if ($(this).hasClass("active")) {
        // $(this).siblings(".acc-content").slideUp();
        $(`.${ID}-newKeyFeatures-accordion .acc-content`).slideUp();
        $(this).removeClass("active");
      } else {
        $(`.${ID}-newKeyFeatures-accordion .acc-content`).slideUp();
        $(`.${ID}-newKeyFeatures-accordion .acc-head`).removeClass("active");
        // $(this).siblings(".acc-content").slideToggle();
        $(`.${ID}-newKeyFeatures-accordion .acc-content`).slideToggle();
        $(this).toggleClass("active");
      }
    });
    $(`.${ID}-newKeyFeatures-accordion .acc-head .view-less`).on("click", () => {
      $("html, body").animate(
        {
          scrollTop: $(`.${ID}-newKeyFeatures`).offset().top,
        },
        "300"
      );
      $(`.${ID}-newKeyFeatures-accordion .acc-head .view-full`).click();
    });

    const slickFn = () => {
      $(`.${ID}-newKeyFeatures-products`).hasClass(`slick-initialized`) && $(`.${ID}-newKeyFeatures-products`).slick("unslick");
      if ($(`.${ID}-newKeyFeatures-products`).hasClass(`related-products-desktop`)) {
        $(`.${ID}-newKeyFeatures-products`).removeClass(`related-products-desktop`);
        !$(`.${ID}-newKeyFeatures-products`).hasClass(`related-products-slick`) && $(`.${ID}-newKeyFeatures-products`).addClass(`related-products-slick`);
      }
      $(`.${ID}-newKeyFeatures-products`).slick({
        //   slidesToShow: 1,
        padding: "40px",
        centerMode: true,
        slidesToShow: 2,
        arrows: true,
        dots: false,
        autoplay: false,
        //   slidesToScroll: 1,
        speed: 500,
        infinite: true,
        // autoplaySpeed: 1200,
        prevArrow: `<div class="slick-slider-prev" style="transform: rotate(180deg);"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="black" d="m12.97 4.28l-1.44 1.44L21.814 16L11.53 26.28l1.44 1.44l11-11l.686-.72l-.687-.72l-11-11z"/></svg></div>`,
        nextArrow: `<div class="slick-slider-next"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="black" d="m12.97 4.28l-1.44 1.44L21.814 16L11.53 26.28l1.44 1.44l11-11l.686-.72l-.687-.72l-11-11z"/></svg></div>`,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
          //   {
          //     breakpoint: 767,
          //     settings: {
          //       slidesToShow: 1,
          //     },
          //   },
        ],
      });
    };
    if (window.innerWidth <= 1019) {
      slickFn();
    }
    $(window).resize(function () {
      if (window.innerWidth > 1019) {
        !$(`.${ID}-newKeyFeatures-products`).hasClass(`related-products-desktop`) && $(`.${ID}-newKeyFeatures-products`).addClass(`related-products-desktop`);
        $(`.${ID}-newKeyFeatures-products`).hasClass(`slick-initialized`) && $(`.${ID}-newKeyFeatures-products`).slick("unslick");
      } else {
        if (!$(`.${ID}-newKeyFeatures-products`).hasClass(`slick-initialized`)) {
          slickFn();
        }
      }
    });
  });

  const newDeliveryAndFinance = `<div class="${ID}-newDeliveryAndFinance">
  <div class="${ID}-newDeliveryAndFinance-wrapper">
  <div class="${ID}-Delivery">
    <h2 class="text-heading">Delivery information</h2>
    <div class="${ID}-Delivery-options">
      <h3 class="text-heading-bold">Click & Collect</h3>
      <p>Collect from one of 2,200 stores. £1.50 or free when you spend £15 or more.</p>
    </div>
    <div class="${ID}-Delivery-options">
      <h3 class="text-heading-bold">Standard Delivery</h3>
      <p>£3.75 or free when you spend £25 <span class="text-hidden">...</span><span class="text-show">or more.</span></p>
    </div>
    <div class="${ID}-newDeliveryAndFinance-Delivery-accordion">
        <div class="acc-container">
            <div class="acc">
            <div class="acc-content">
                <div class="${ID}-Delivery-options">
                <h3 class="text-heading-bold">Next Day Delivery</h3>
                <p>
                    Order by 10pm (subject to change during promotions), available 7 days a week for £4.95. This may not be available during public holidays or weekends in
                    between public holidays. Usually delivered between 8am and 9pm. The earliest delivery date for these orders will be shown at the checkout.
                </p>
                </div>
                <div class="${ID}-Delivery-options">
                <h3 class="text-heading-bold">Named Day Delivery</h3>
                <p>£3.95 - choose a weekday within the next 14 days for delivery.</p>
                </div>
                <p>
                For more information see our <a href="https://www.boots.com/delivery-information">delivery help</a> or view our
                <a href="https://www.boots.com/returns-exchange">returns policy.</a>
                </p>
            </div>
            <div class="acc-head">
            <a href="javascript:void(0)" class="view-full">View more</a>
            <a href="javascript:void(0)" class="view-less ${ID}--x-hidden">View less</a>
            </div>
            </div>
        </div>
</div>
  </div>
  <div class="${ID}-Finance">
    <h2 class="text-heading">Finance information</h2>
    <div class="${ID}-Finance-paypal">
      ${paypalIMG}
    </div>
    <div class="${ID}-Finance-body">
      <div class="finance-description">
        <h3 class="text-heading-bold">Pay in 3 interest-free payments (Representative Example Shown Below)</h3>
        <p>Split your purchase of £280.00 into 3 with no sign-up fees or late fees.</p>
        </div>
        <div class="${ID}-newDeliveryAndFinance-Finance-accordion">
        <div class="acc-container">
          <div class="acc">
            <div class="acc-content">
              ${statSVG}
              <div class="finance-list">
                <p>
                  <span class="text-bold">1 - </span>Choose <span class="text-bold">PayPal</span> at checkout to pay later with <span class="text-bold">Pay in 3</span>.
                </p>
                <p> <span class="text-bold">2 - </span>Complete your purchase with the first payment today. </p>
                <p> <span class="text-bold">3 - </span>Remaining payments are taken automatically. </p>
              </div>
            </div>
            <div class="acc-head">
              <a href="javascript:void(0)" class="view-full">View more</a>
              <a href="javascript:void(0)" class="view-less ${ID}--x-hidden">View less</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`;
  //   prodDetailsContainer.insertAdjacentHTML("afterend", newDeliveryAndFinance);
  pollerLite([`.${ID}-newKeyFeatures`], () => {
    const newKeyFeaturesContainer = document.querySelector(`.${ID}-newKeyFeatures`);
    newKeyFeaturesContainer?.insertAdjacentHTML("afterend", newDeliveryAndFinance);
  });
  $(document).ready(function () {
    // accordion 2
    $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-head .view-full`).on("click", function () {
      $(this).toggleClass(`${ID}--x-hidden`);

      $(`.BO222-Delivery-options p span`).toggleClass(`text-show`);

      $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-head .view-less`).toggleClass(`${ID}--x-hidden`);
      if ($(this).hasClass("active")) {
        // $(this).siblings(".acc-content").slideUp();
        $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-content`).slideUp();
        $(this).removeClass("active");
      } else {
        $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-content`).slideUp();
        $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-head`).removeClass("active");
        // $(this).siblings(".acc-content").slideToggle();
        $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-content`).slideToggle();
        $(this).toggleClass("active");
      }
    });
    $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-head .view-less`).on("click", () =>
      $(`.${ID}-newDeliveryAndFinance-Delivery-accordion .acc-head .view-full`).click()
    );
    // accordion 3
    $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-head .view-full`).on("click", function () {
      $(this).toggleClass(`${ID}--x-hidden`);

      $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-head .view-less`).toggleClass(`${ID}--x-hidden`);
      if ($(this).hasClass("active")) {
        // $(this).siblings(".acc-content").slideUp();
        $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-content`).slideUp();
        $(this).removeClass("active");
      } else {
        $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-content`).slideUp();
        $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-head`).removeClass("active");
        // $(this).siblings(".acc-content").slideToggle();
        $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-content`).slideToggle();
        $(this).toggleClass("active");
      }
    });
    $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-head .view-less`).on("click", () =>
      $(`.${ID}-newDeliveryAndFinance-Finance-accordion .acc-head .view-full`).click()
    );
  });
};
