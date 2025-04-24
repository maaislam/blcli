import { fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "../../../../../lib/utils";
import shared from "../../../../Flannels/FLAN-858/src/lib/shared";

const { ID, VARIATION } = shared;

const headerBanner = `<div class="${ID}--basket-header"><span class="basket-text">ITEM ADDED TO BASKET</span><span class="basket-close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 17" fill="none">
    <g clip-path="url(#clip0_40_1206)">
    <path d="M14.4695 16.4917L8.41235 10.4345L2.35521 16.4917C2.12664 16.7202 1.89807 16.8345 1.55521 16.8345C0.869496 16.8345 0.412354 16.3774 0.412354 15.6917C0.412354 15.3488 0.526639 15.1202 0.755211 14.8917L6.81235 8.83453L0.755211 2.77739C0.298068 2.32025 0.298068 1.63453 0.755211 1.17739C1.21235 0.720248 1.89807 0.720248 2.35521 1.17739L8.41235 7.23453L14.4695 1.17739C14.9266 0.720248 15.6124 0.720248 16.0695 1.17739C16.5266 1.63453 16.5266 2.32025 16.0695 2.77739L10.0124 8.83453L16.0695 14.8917C16.5266 15.3488 16.5266 16.0345 16.0695 16.4917C15.6124 16.9488 14.9266 16.9488 14.4695 16.4917Z" fill="black"/>
    </g>
    <defs>
    <clipPath id="clip0_40_1206">
    <rect width="16" height="16" fill="white" transform="translate(0.412354 0.834534)"/>
    </clipPath>
    </defs>
    </svg></span></div>`;

const basketHeader = `<div class="basket-header">
<span class="basket-header-text">ITEM ADDED TO BASKET</span>
<span class="basket-header-icon"
  ><svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
    <g clip-path="url(#clip0_43_890)">
      <path
        d="M13.2612 8.41666L8.76121 13.1042C8.31121 13.5729 7.59121 13.5729 7.14121 13.1042L4.89121 10.7604C4.44121 10.2917 4.44121 9.54166 4.89121 9.07291C5.34121 8.60416 6.06121 8.60416 6.51121 9.07291L7.95121 10.5729L11.6412 6.72916C12.0912 6.26041 12.8112 6.26041 13.2612 6.72916C13.7112 7.19791 13.7112 7.94791 13.2612 8.41666Z"
        fill="#80E096"
      />
      <path
        d="M9.12109 0.541656C4.17109 0.541656 0.121094 4.76041 0.121094 9.91666C0.121094 15.0729 4.17109 19.2917 9.12109 19.2917C14.0711 19.2917 18.1211 15.0729 18.1211 9.91666C18.1211 4.76041 14.0711 0.541656 9.12109 0.541656ZM13.2611 8.41666L8.76109 13.1042C8.31109 13.5729 7.59109 13.5729 7.14109 13.1042L4.89109 10.7604C4.44109 10.2917 4.44109 9.54166 4.89109 9.07291C5.34109 8.60416 6.06109 8.60416 6.51109 9.07291L7.95109 10.5729L11.6411 6.72916C12.0911 6.26041 12.8111 6.26041 13.2611 6.72916C13.7111 7.19791 13.7111 7.94791 13.2611 8.41666Z"
        fill="#80E096"
      />
      <path
        d="M13.2612 9.39886L8.76121 14.0864C8.31121 14.5551 7.59121 14.5551 7.14121 14.0864L4.89121 11.7426C4.44121 11.2739 4.44121 10.5239 4.89121 10.0551C5.34121 9.58637 6.06121 9.58637 6.51121 10.0551L7.95121 11.5551L11.6412 7.71136C12.0912 7.24261 12.8112 7.24261 13.2612 7.71136C13.7112 8.18011 13.7112 8.93011 13.2612 9.39886Z"
        fill="#1C1C1C"
      />
    </g>
    <defs>
      <clipPath id="clip0_43_890">
        <rect width="18" height="18.75" fill="white" transform="translate(0.121094 0.541656)" />
      </clipPath>
    </defs></svg
></span>
</div>`;

const basketFooter = (quantity, price, items) => {
  let checkOutFlag = items.find((item) => item.outofstock !== "");
  return `<div class="basket-footer">
<div class="basket-total-price">
  <span id="basket-total-label">Total:</span>
  <span id="basket-total-value">${price}</span>
</div>
<div class="basket-view-bag"><a href="/cart" id="basket-viewBag"><p>View Bag <span class="basket-view-quantity">(${quantity})</span></p></a></div>

${
  !checkOutFlag
    ? `
<div class="basket-checkout">
<a href="/checkoutsp" id="basket-checkout">
  <p>Checkout<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <g clip-path="url(#clip0_43_904)">
  <path d="M9.98087 5.32432V3.97297C9.98087 2.08108 8.28783 0.594589 6.13305 0.594589C3.97826 0.594589 2.28522 2.08108 2.28522 3.97297V5.32432C1.4387 5.32432 0.746094 5.93243 0.746094 6.67567V10.054C0.746094 10.7973 1.4387 11.4054 2.28522 11.4054H9.98087C10.8274 11.4054 11.52 10.7973 11.52 10.054V6.67567C11.52 5.93243 10.8274 5.32432 9.98087 5.32432ZM8.44174 5.32432H3.82435V3.97297C3.82435 2.82432 4.82479 1.94594 6.13305 1.94594C7.44131 1.94594 8.44174 2.82432 8.44174 3.97297V5.32432Z" fill="black"/>
  </g>
  <defs>
  <clipPath id="clip0_43_904">
  <rect width="10.7739" height="10.8108" fill="white" transform="translate(0.746094 0.594589)"/>
  </clipPath>
  </defs>
  </svg>
  </p>
  </a>
  </div>`
    : `<span class="basket-outofstock">Item out of stock. Please remove.</span>`
}
</div>
`;
};

const removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
<g clip-path="url(#clip0_43_910)">
<path d="M4.07407 15.6588C2.68519 15.6588 1.57407 14.7472 1.48148 13.5041L0.925926 5.29967C0.37037 5.29967 0 4.8853 0 4.47094C0 3.9737 0.462963 3.64221 0.925926 3.64221H4.07407V2.23337C4.07407 1.40464 4.81481 0.658783 5.83333 0.658783H9.16667C10.0926 0.658783 10.9259 1.32177 10.9259 2.23337V3.64221H14.0741C14.6296 3.64221 15 3.9737 15 4.47094C15 4.96818 14.6296 5.29967 14.0741 5.29967L13.4259 13.5041C13.3333 14.7472 12.2222 15.6588 10.8333 15.6588H4.07407ZM3.42593 13.4212C3.42593 13.7527 3.7963 14.0013 4.16667 14.0013H11.0185C11.3889 14.0013 11.6667 13.7527 11.7593 13.4212L12.4074 5.38254H2.77778L3.42593 13.4212ZM9.07407 3.64221V2.31624H6.01852V3.64221H9.07407ZM8.24074 11.8466V7.45436C8.24074 6.95713 8.61111 6.62563 9.16667 6.62563C9.72222 6.62563 10.0926 6.95713 10.0926 7.45436V11.8466C10.0926 12.3439 9.72222 12.6754 9.16667 12.6754C8.61111 12.6754 8.24074 12.3439 8.24074 11.8466ZM4.90741 11.8466V7.45436C4.90741 6.95713 5.27778 6.62563 5.83333 6.62563C6.38889 6.62563 6.75926 6.95713 6.75926 7.45436V11.8466C6.75926 12.3439 6.38889 12.6754 5.83333 12.6754C5.27778 12.6754 4.90741 12.3439 4.90741 11.8466Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_43_910">
<rect width="15" height="15" fill="white" transform="translate(0 0.658783)"/>
</clipPath>
</defs>
</svg>`;

// let hoverEventFlag = false;
let basketSummary = false;
const regularAction = () => {
  document.querySelector(`.${ID}--basket-summary`)?.remove();
  const basket = document.querySelector(`#divBagItems .innerdivBagItems`);
  let items = [];
  let listItems = basket.querySelectorAll("#ulBag li");
  let bagQuantity = document.querySelector("#divBag #bagQuantity").innerText.trim();
  let totalPrice = document.querySelector("#spanBagSubTotalValue").innerText.trim();

  listItems.forEach((item) => {
    let itemObj = {
      id: item.id,
      name: item.querySelector(".BaskName").innerText.trim(),
      prodUrl: item.getAttribute("data-prdurl"),
      image: item.querySelector("img.Baskimg").src ? item.querySelector("img.Baskimg").src : "",
      color: item.querySelector(".ColrandSize span.BaskColr").innerText.trim(),
      size: item.querySelector(".ColrandSize span.BaskSize").innerText.trim(),
      quantity: item.querySelector(".BaskQuant").innerText.trim(),
      price: item.querySelector(".BaskPrice").innerText.trim(),
      outofstock: item.querySelector(".lineProblems .outofstock") ? item.querySelector(".lineProblems .outofstock").innerText.trim() : "",
      removeElem: item.querySelector("#removeItem"),
    };
    items.push(itemObj);
  });
  window.items = items;
  let basket_footer = basketFooter(bagQuantity, totalPrice, items);

  let userAgentString = navigator.userAgent;
  let chromeAgent = userAgentString.indexOf("Chrome") > -1;
  let safariAgent = userAgentString.indexOf("Safari") > -1;
  if (chromeAgent && safariAgent) safariAgent = false;

  var safariClass = `basket-product-name-safari`;

  const newBasket = `
  <div class="${ID}--basket-summary">
    ${basketHeader}
    <div class="basket-product">
      ${items
        .map((item) => {
          return `
      <div class="basket-product-container">
        <a href="${item.prodUrl}" title="${item.name}">
          <div data-id="${item.id}">
            <div class="basket-product-img"><img ${item.image ? `src=${item.image}` : `style="visibility: hidden;"`} alt/></div>
            <div class="basket-product-info">
              <div class="product-info-name-price"><span class="basket-product-name ${safariAgent ? safariClass : ""}">${
            item.name
          }</span><span class="basket-text-bold">${item.price}</span></div>
              <div class="product-info-color-quantity"><span>Colour: ${item.color}</span><span>${item.quantity}</span></div>
              <div class="product-info-size-remove"><span>Size: ${item.size}</span><span data-id="prod-${
            item.id
          }" class="remove-product-item">${removeIcon}Remove</span></div>
              <div class="product-outofstock-message"><span>${item.outofstock}</span></div>
            </div>
          </div>
        </a>
      </div>
        `;
        })
        .join("")}
    </div>
    ${basket_footer}
  </div>`;
  bagQuantity > 0 && document.querySelector("#ProductStandardAddToBag").insertAdjacentHTML("afterend", newBasket);
  pollerLite([`.${ID}--basket-summary`], () => {
    document.querySelectorAll(`.${ID}--basket-summary .product-info-size-remove [data-id^="prod"]`).forEach(function (ele) {
      ele.addEventListener("click", (e) => {
        e.preventDefault();
        let id = ele.getAttribute("data-id")?.split("-")[1];
        let item = items.find((item) => item.id === id);
        if (item !== undefined) {
          item?.removeElem?.click();
          setTimeout(() => {
            document.querySelector(`.${ID}--basket-summary div#${item.id}`)?.remove();
            bagQuantity = document.querySelector("#divBag #bagQuantity").innerText.trim();
            // console.log(bagQuantity);
            bagQuantity == 0 && document.querySelector(`.${ID}--basket-summary`)?.remove();
          }, 1000);
        }
      });
    });
    function runSlick() {
      $(`.${ID}--basket-summary .basket-product`)
        .not(".slick-initialized")
        .slick({
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          autoplay: false,
          vertical: true,
          arrows: true,
          dots: false,
          initialSlide: 0,
          prevArrow: `<div id="previous-item" class="product-navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 15l8-8l8 8"/></svg>
        </div>`,
          nextArrow: `<div id="next-item" class="product-navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 9l8 8l8-8"/></svg>
        </div>`,
        });
      $(`.${ID}--basket-summary`).addClass(`${ID}--x-visible`);
    }
    !basketSummary &&
      !document.querySelector(`.${ID}--basket-summary`)?.classList.contains(`${ID}--x-transition`) &&
      document.querySelector(`.${ID}--basket-summary`)?.classList.add(`${ID}--x-transition`);
    setTimeout(() => {
      basketSummary = true;
      document.querySelector(`.${ID}--basket-summary`)?.classList.contains(`${ID}--x-transition`) &&
        document.querySelector(`.${ID}--basket-summary`)?.classList.remove(`${ID}--x-transition`);
    }, 1200);
    if (window.jQuery.fn.slick) runSlick();
    else {
      jQuery.getScript("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js", () => {
        runSlick();
      });
    }
  });
};

const addToBag = (action) => {
  const send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function () {
    this.addEventListener("load", function () {
      if (this.status === 200 && this.responseURL.includes("/api/basket/v1/add")) {
        // console.log(this);
        if (VARIATION == 2) {
          pollerLite(["#divBagItems"], () => {
            document.querySelector("#divBagItems").style.cssText = `height: 0 !important`;
          });
        }
        action();
      }
    });
    return send.apply(this, arguments);
  };
};

let mutationFlag = false;
let addToBagFlag = false;
export const addToBagActionVar1 = () => {
  !addToBagFlag &&
    addToBag(() => {
      // console.log("clicked");
      addToBagFlag = true;
      let basket = document.querySelector(`#divBagItems .innerdivBagItems`);
      let closeButton = basket.querySelector("#clsBasketMob");

      !basket?.classList.contains(`${ID}--basket-summary`) && basket.classList.add(`${ID}--basket-summary`);
      // console.log(document.querySelector("#divBagItemsChild"));
      !document.querySelector("#divBagItemsChild")?.classList.contains(`${ID}--basket-summary-child`) &&
        document.querySelector("#divBagItemsChild").classList.add(`${ID}--basket-summary-child`);

      basket.querySelector("#clsBasketMob")?.classList.contains(`${ID}--x-hidden`) &&
        basket.querySelector("#clsBasketMob")?.classList.remove(`${ID}--x-hidden`);

      basket.querySelector("#clsBasketMob")?.classList.add(`${ID}--x-hidden`);
      basket.querySelector(`.${ID}--basket-header`)?.remove();
      let bagHeader = basket.querySelector(".bagHeader");
      bagHeader.insertAdjacentHTML("afterbegin", headerBanner);
      // basket.insertAdjacentHTML("afterbegin", headerBanner);
      document.querySelector(`.${ID}--basket-header .basket-close`)?.addEventListener("click", (e) => {
        e.preventDefault();
        closeButton.click();
      });
      !mutationFlag &&
        basket.querySelector("#clsBasketMob").addEventListener("click", () => {
          setTimeout(() => {
            basket.querySelector(`.${ID}--basket-header`)?.remove();
            document.querySelector("#divBagItemsChild")?.classList.contains(`${ID}--basket-summary-child`) &&
              document.querySelector("#divBagItemsChild").classList.remove(`${ID}--basket-summary-child`);
            basket.querySelector("#clsBasketMob")?.classList.contains(`${ID}--x-hidden`) &&
              basket.querySelector("#clsBasketMob")?.classList.remove(`${ID}--x-hidden`);
          }, 500);
        });
      !mutationFlag &&
        (function miniBagObserver() {
          mutationFlag = true;
          let miniBag = document.querySelector("#divBagItems");
          if (miniBag) {
            const observer = new MutationObserver(function (mutationList, observer) {
              observer.disconnect();
              if (!miniBag.classList.contains("open") && !document.querySelector("#divBag").classList.contains("activeHover")) {
                // console.log("mutation to check...");
                setTimeout(() => {
                  basket.querySelector(`.${ID}--basket-header`)?.remove();
                  document.querySelector("#divBagItemsChild")?.classList.contains(`${ID}--basket-summary-child`) &&
                    document.querySelector("#divBagItemsChild").classList.remove(`${ID}--basket-summary-child`);
                  basket.querySelector("#clsBasketMob")?.classList.contains(`${ID}--x-hidden`) &&
                    basket.querySelector("#clsBasketMob")?.classList.remove(`${ID}--x-hidden`);
                }, 1000);
              }
              miniBagObserver();
            });
            observer.observe(miniBag, { attributeFilter: ["class"], childList: true, subtree: false });
          }
        })();
    });
};

export const addToBagActionVar2 = () => {
  !addToBagFlag &&
    addToBag(() => {
      addToBagFlag = true;
      // setTimeout(() => {
      regularAction();
      !mutationFlag &&
        (function mutationAction() {
          mutationFlag = true;
          const observer = new MutationObserver(function (mutationList, observer) {
            observer.disconnect();
            // console.log("mutation...");
            regularAction();
            mutationAction();
          });
          observer.observe(document.querySelector("#divBagItems .innerdivBagItems #ulBag"), { attributes: false, childList: true, subtree: true });
        })();
      setTimeout(() => {
        if (document.querySelector(`.${ID}--basket-summary`)) {
          const basketViewBag = document.querySelector(`.${ID}--basket-summary #basket-viewBag`);
          const basketCheckout = document.querySelector(`.${ID}--basket-summary #basket-checkout`);

          basketViewBag?.addEventListener("click", () => fireEvent(`Clicks on the view CTA under the PDP CTA`));
          basketCheckout?.addEventListener("click", () => fireEvent(`Clicks on the checkout CTA under the PDP CTA`));
        }
      }, 1000);
      // }, 1200);
    });
};
