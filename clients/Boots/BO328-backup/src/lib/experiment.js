import {
  setup,
  fireEvent,
  newEvents,
  bootsEvents,
  fireBootsEvent,
} from "../../../../../core-files/services";
import { poller, pollerLite } from "../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import productSAPs from "../components/productSAPs";
import productRecs from "../components/productRecs";
import eventTypes from "./eventTypes";
import actionTypes from "./actionTypes";
import elementTypes from "./elementTypes";
import Swiper from 'swiper/swiper-bundle';

const { ID, VARIATION } = shared;
const testID = `${ID}|Commonly Forgotten Products Reminder`;
const testVariant = `${VARIATION === "control" ? "Control" : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

const arrowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
  <path d="M1.1452 0.825623L6.1452 5.82562L1.1452 10.3256" stroke="black" stroke-linecap="round"/>
</svg>`;

const bootsSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 29 22" fill="none">
  <path d="M19.9443 1.38756L4.27379 3.78845C1.91344 4.15008 0.337391 6.10582 0.753584 8.15672L2.51195 16.8215C2.92814 18.8724 5.17897 20.2419 7.53932 19.8802L23.2099 17.4793C25.5702 17.1177 27.1463 15.162 26.7301 13.1111L24.9717 4.44626C24.5555 2.39536 22.3047 1.02593 19.9443 1.38756Z" fill="white"/>
  <path d="M20.7823 1.89818L5.11179 4.29907C2.75144 4.6607 1.17539 6.61644 1.59158 8.66734L2.84755 14.8565C3.26375 16.9074 5.51458 18.2768 7.87493 17.9152L23.5455 15.5143C25.9058 15.1527 27.4819 13.1969 27.0657 11.146L25.8097 4.95688C25.3935 2.90598 23.1427 1.53655 20.7823 1.89818Z" stroke="#05054B"/>
  <path d="M5.15308 8.1217L13.7007 6.81213" stroke="#E41B68"/>
  <path d="M5.65546 10.5974L14.203 9.28784" stroke="#E41B68"/>
  <mask id="mask0_164_98" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="11" y="2" width="16" height="15">
    <path d="M22.617 2.11575L12.9912 3.41041C12.2494 3.51018 11.794 4.1607 11.9739 4.86337L14.5808 15.0418C14.7608 15.7445 15.5081 16.2333 16.2498 16.1335L25.8757 14.8388C26.6175 14.739 27.0729 14.0885 26.8929 13.3859L24.286 3.20741C24.106 2.50473 23.3588 2.01598 22.617 2.11575Z" fill="white"/>
  </mask>
  <g mask="url(#mask0_164_98)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M41.8649 4.93788C41.6795 4.25107 41.1515 3.63978 40.4495 3.41609C40.6107 3.02748 40.7621 2.64042 40.9025 2.26563C41.248 2.68236 41.7162 3.1196 41.8715 3.75777C41.97 4.1623 41.9658 4.57343 41.8649 4.93788ZM41.4192 5.6835C41.1959 5.90276 40.9033 6.05418 40.5451 6.10307C40.0675 6.16824 39.616 6.04087 39.2872 5.75957C39.6342 5.1496 39.9596 4.4751 40.2561 3.79353C40.843 3.99632 41.2096 4.59875 41.349 5.1706C41.3922 5.34733 41.4158 5.51834 41.4192 5.6835ZM38.9861 5.33079C38.9359 5.23048 38.8956 5.12161 38.8672 5.00474C38.7241 4.41667 39.0523 3.88206 39.6382 3.8021C39.6771 3.79678 39.7154 3.79317 39.7532 3.79104C39.5012 4.34191 39.2427 4.8658 38.9861 5.33079ZM32.6076 9.08073C32.4016 9.10886 32.2698 8.96246 32.1985 8.66975C31.9684 7.72424 32.3638 5.62069 33.4897 4.2624C33.7062 4.48918 33.8524 4.79328 33.9336 5.12033C34.3212 6.68225 33.3345 8.98153 32.6076 9.08073ZM27.2889 10.8675C27.0922 10.8943 26.9543 10.7449 26.8873 10.4694C26.5946 9.26698 27.774 5.04251 28.8488 4.89582C29.052 4.86808 29.1834 5.01838 29.252 5.30018C29.5477 6.51512 28.3768 10.719 27.2889 10.8675ZM23.2046 7.25741C22.8739 7.01886 22.5294 6.83605 22.1903 6.70327C22.5751 5.14802 23.0617 3.66219 23.8336 2.47362C24.2666 2.77112 24.5707 3.21623 24.7076 3.77859C25.0484 5.17892 24.3819 6.5394 23.2046 7.25741ZM20.7409 14.5648C20.4523 14.6042 20.1819 14.6039 19.9315 14.5727C20.8891 13.0334 21.3181 10.7179 21.8342 8.38138C22.2783 8.33478 22.6904 8.22587 23.05 8.11201C23.3612 8.49956 23.6134 8.99087 23.7607 9.59593C24.2427 11.5766 23.2849 14.2176 20.7409 14.5648ZM18.88 14.2126C18.3878 13.8874 18.071 13.4229 17.977 13.0134C17.9303 12.8102 17.9377 12.615 17.9844 12.4405C18.1822 12.7065 18.5463 12.8812 18.923 12.8298C19.0691 12.8098 19.2012 12.7598 19.3154 12.6883C19.1889 13.2532 19.0487 13.7678 18.88 14.2126ZM19.96 7.24712C19.8928 6.97097 20.2124 6.87813 20.5776 6.87231C20.5079 7.12826 20.4426 7.38538 20.3812 7.64276C20.1504 7.54512 19.9988 7.40647 19.96 7.24712ZM22.0625 7.18596C22.227 7.27364 22.3883 7.37906 22.5425 7.50296C22.3527 7.56904 22.1547 7.62062 21.9497 7.656C21.9865 7.49904 22.0241 7.34229 22.0625 7.18596ZM41.2527 0.936971C41.2122 0.770512 41.0849 0.679078 40.9206 0.701501C40.6478 0.738743 40.3987 1.10339 40.5156 1.58389C40.5321 1.65171 40.5566 1.71784 40.5874 1.78299C40.3876 2.29024 40.1759 2.80409 39.9576 3.30353C39.8397 3.2975 39.7186 3.30226 39.5949 3.31914C38.8026 3.42728 38.1238 4.10246 38.3721 5.12285C38.4397 5.40059 38.5498 5.63676 38.689 5.83541C38.19 6.66158 37.7092 7.21883 37.3065 7.2738C37.1468 7.2956 37.0318 7.22635 36.9902 7.05568C36.9456 6.87232 36.968 6.56875 37.0558 6.13869L38.1916 0.92208L40.6364 0.297458L40.7844 -0.306952L38.3706 0.100032L38.5761 -0.844L37.6595 -0.603966L37.4283 0.258895L34.0519 0.828204L33.7207 2.06443L37.1814 1.18021L36.7937 2.62724C36.3907 2.52036 35.9249 2.49222 35.4099 2.5625C34.6313 2.66877 33.9518 2.95123 33.3764 3.34908C33.0477 3.25291 32.6994 3.2329 32.3601 3.27921C31.5379 3.39143 30.6988 3.89399 30.1035 4.65529C29.8413 4.22734 29.4545 4.00165 28.9802 4.06639C28.427 4.14188 27.9072 4.49873 27.4539 5.0209C27.0537 4.80445 26.5483 4.79676 26.0813 5.05033C26.2374 4.52369 26.2629 3.98222 26.1371 3.46553C25.917 2.5609 25.3094 1.95813 24.3979 1.66876C24.6244 1.41529 24.8709 1.18285 25.1399 0.975003C25.0059 0.905612 24.9199 0.86211 24.8122 0.824583C24.446 1.03597 24.1088 1.27235 23.7978 1.53009C23.2479 1.44487 22.6166 1.44915 21.9165 1.5447C18.6695 1.98787 16.0311 4.18912 16.5669 6.39058C16.8032 7.36126 17.4656 7.62927 18.0365 7.55136C18.5708 7.47843 19.0238 7.12207 19.1049 6.75531C18.6185 6.72761 18.2502 6.38243 18.132 5.89688C17.7148 4.18278 19.5347 2.38462 21.7768 2.07861C22.2787 2.01011 22.7353 2.03945 23.1319 2.15458C22.0126 3.3376 21.2975 4.83535 20.7869 6.40344C20.6562 6.40216 20.5323 6.40967 20.4171 6.42538C19.7731 6.51329 19.3718 6.83972 19.4956 7.34851C19.5798 7.69453 19.8884 7.95819 20.3031 8.12338C20.0266 9.25221 19.817 10.3717 19.6023 11.3941C19.3758 11.1236 18.9748 10.9816 18.5646 11.0376C17.577 11.1724 17.0359 12.0992 17.2846 13.1212C17.4468 13.7876 17.8868 14.3868 18.5015 14.8304C18.1581 15.3853 17.7223 15.7466 17.1341 15.8404C16.9407 15.8712 16.7414 15.8536 16.551 15.7844C17.0036 15.6725 17.304 15.2932 17.19 14.8691C17.0761 14.445 16.6295 14.195 16.121 14.2761C15.4973 14.3755 15.2801 14.9198 15.3965 15.3539C15.6131 16.159 16.4371 16.4844 17.374 16.335C18.1825 16.2061 18.8152 15.8346 19.3244 15.2855C20.0042 15.5648 20.7968 15.6825 21.6222 15.5698C24.1209 15.2288 25.7484 12.9183 25.0878 10.204C24.8254 9.12605 24.325 8.31125 23.7283 7.71806C24.4739 7.33562 25.08 6.80639 25.5078 6.20744C26.1057 5.37007 26.7003 5.3586 27.0784 5.51231C26.0982 6.95946 25.5503 9.15338 25.8857 10.5313C26.0934 11.3848 26.5881 11.8922 27.2801 11.7977C29.3527 11.5149 30.9042 7.37799 30.3651 5.29513C30.8607 4.50268 31.65 3.96339 32.372 3.86485C32.5094 3.8461 32.6377 3.84444 32.7572 3.85752C31.402 5.16731 30.8451 7.16694 31.1937 8.59908C31.3784 9.3578 31.9109 9.87957 32.6761 9.77514C34.1029 9.58041 35.4475 7.21504 34.935 5.10926C34.7775 4.46209 34.4657 4.00194 34.0753 3.70191C34.5056 3.35153 35.0124 3.10527 35.5987 3.02524C35.9402 2.97863 36.3153 3.00589 36.6681 3.09581L35.8943 5.98366C35.7217 6.68658 35.7115 7.19012 35.7977 7.54415C35.93 8.08789 36.3326 8.32125 36.865 8.24859C37.6402 8.14278 38.3874 7.33416 39.0603 6.23199C39.5673 6.64108 40.2308 6.76518 40.7384 6.69589C40.8999 6.67385 41.0625 6.63608 41.2221 6.58373C40.9504 7.09615 40.3961 7.53013 39.5134 7.88051L39.451 9.40067C40.9812 8.69896 41.7538 7.43413 41.923 6.2422C42.6044 5.78314 43.1222 5.01344 42.8937 4.0748C42.6414 3.03793 41.5757 2.5432 41.0599 1.83624C41.2415 1.53711 41.3127 1.18357 41.2527 0.936971Z" fill="#05054B"/>
  </g>
</svg>`;

let swiper;
const startSwiper = () => {
  const isDesktop = document.querySelector('.oct-basket').classList.contains(`${ID}-desktop-basket`);

  console.log('swiper start');

  if (isDesktop) {
    swiper = new Swiper(
      `#${ID}-swiper`,
      {
        slidesPerView: 3,
        slidesPerGroup: 3,
        // loop: true,
        // rewind: true,
        spaceBetween: 20,
        navigation: {
          nextEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-next`,
          prevEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-prev`,
        },
        scrollbar: {
          el: `.${ID}-product-recs-swiper-scrollbar`,
          draggable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2.5,
            slidesPerGroup: 2,
          },
          500: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          }
        },
      }
    );
  } else {
    swiper = new Swiper(
      `#${ID}-swiper`,
      {
        slidesPerView: 3,
        // loop: true,
        // rewind: true,
        spaceBetween: 20,
        // navigation: {
        //   nextEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-next`,
        //   prevEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-prev`,
        // },
        // scrollbar: {
        //   el: `.${ID}-product-recs-swiper-scrollbar`,
        //   draggable: true,
        // },
        breakpoints: {
          0: {
            slidesPerView: 2.5,
          },
          500: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          }
        },
        mousewheel: true,
      }
    );
  }

  // window.addEventListener("resize", () => {
  //   swiper.update();
  // });

}

const addSwipeFunctionality = (swiperClass) => {
  const slider = document.querySelector(swiperClass);
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });

}


const basketTabHtml = `
<div class="oct-tab ${ID}-tab"><button data-testid="button" class="oct-button oct-button--default oct-button--default-default oct-button--default-default-responsive oct-tab__btn" role="tab"><div class="oct-button__content"><p class="${ID}-BL-tab oct-text oct-text--bold oct-text--size_m oct-tab__text" data-testid="text">Frequently topped up</p></div></button><div class="oct-tab__line"></div></div>
`;

//also works for multple saps with sap string below
const getProductFromAPI = (sapCode) => {
  return new Promise((resolve, reject) => {
    // pollerLite(['#cvosVariantId_1'], () => {
    fetch('https://www.boots-optimisation.co.uk/prod-info/model/' + sapCode, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        // console.log(' ~ .then ~ responseJSON:', responseJSON);
        resolve(responseJSON); // Resolve the promise with the response data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        reject(error); // Reject the promise with the error
      });
    // });
  });
};

const getAllProductDetailsPromise = new Promise((resolve, reject) => {
  const promises = [];
  let sapCodeString = '';
  productSAPs.forEach((el, index) => {
    sapCodeString += index == 0 ? `${el}` : `&${el}`;
  });
  console.log(' ~ sapCodeString', sapCodeString);

  const promise = getProductFromAPI(sapCodeString).then((response) => {
    // console.log(' ~ response', response);
    return response;
  });

  promises.push(promise);

  Promise.all(promises)
    .then((results) => {
      // Find the index of the product with the lowest price per unit
      // console.log(' ~ Promise.all ~ results:', results);
      resolve(...results); // Resolve the promise with the response data
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      reject(error); // Reject the promise with the error
    });
});

const revertAllChanges = async () => {
  // const allBasketPoints = document.querySelectorAll(`.${ID}-basket-points`);
  // const allBasketSummary = document.querySelectorAll(
  //   `.${ID}-advantage-summary`
  // );
  // const allBasketSummaryMessage = document.querySelectorAll(
  //   `.${ID}-summary-message`
  // );
  // const allBasketFooter = document.querySelectorAll(`.${ID}-basket-footer`);
  const basketHolder = document.querySelector(".oct-basket");

  const newBasketTab = document.querySelector(`.${ID}-tab`);
  const newBasketRecs = document.querySelector(`.${ID}-product-recs-container`);

  if (newBasketTab && newBasketRecs) {
    newBasketTab.remove();
    newBasketRecs.remove();
  }

  const originalBasketTab = document.querySelector(`.${ID}-original-basket-tab`);
  const originalBasketRecs = document.querySelector('.oct-products .oct-tabs .oct-tabs__content');
  if (originalBasketTab) {
    originalBasketTab.classList.add('oct-tab--active');
    originalBasketRecs.classList.remove(`${ID}-display-none`);
  }

  // pollerLite([`.${ID}-tab`, `.${ID}-product-recs-container`], () => {
  //   const newBasketTab = document.querySelector(`.${ID}-tab`);
  //   const newBasketRecs = document.querySelector(`.${ID}-product-recs-container`);

  //   newBasketRecs.remove();
  //   newBasketTab.remove();
  // });

  // allBasketPoints.forEach((item) => {
  //   item.remove();
  // });

  // allBasketSummary.forEach((item) => {
  //   item.remove();
  // });

  // allBasketSummaryMessage.forEach((item) => {
  //   item.remove();
  // });

  // allBasketFooter.forEach((item) => {
  //   item.remove();
  // });

  if (basketHolder && basketHolder.classList.contains(`${ID}-mobile-basket`)) {
    basketHolder.classList.remove(`${ID}-mobile-basket`);
  }

  if (basketHolder && basketHolder.classList.contains(`${ID}-desktop-basket`)) {
    basketHolder.classList.remove(`${ID}-desktop-basket`);
  }
};

function hideOriginalBasketTab() {
  pollerLite(['.oct-tabs__labels .oct-tab.oct-tab--active', `.${ID}-tab`], () => {
    const originalBasketTab = document.querySelector('.oct-tabs__labels .oct-tab.oct-tab--active');
    originalBasketTab.classList.add(`${ID}-original-basket-tab`);
    originalBasketTab.classList.remove('oct-tab--active');
    const newBasketTab = document.querySelector(`.${ID}-tab`);
    newBasketTab.classList.add('oct-tab--active');

    const originalBasketRecs = document.querySelector('.oct-products .oct-tabs .oct-tabs__content');
    originalBasketRecs.classList.add(`${ID}-display-none`);

    // add fixed width to overall container 
    const tabContainer = document.querySelector('.oct-basket .oct-products .oct-tabs');
    const isDesktop = document.querySelector('.oct-basket').classList.contains(`${ID}-desktop-basket`);
    if (isDesktop) {
      tabContainer.style.width = '685px';
    }
  });


}

function addTabEventListeners() {
  // const newBasketTab = document.querySelector(`.${ID}-tab`);
  // const newBasketRecs = document.querySelector(`.${ID}-product-recs-container`);

  // const originalBasketTab = document.querySelector(`.${ID}-original-basket-tab`);
  // const originalBasketRecs = document.querySelector('.oct-products .oct-tabs .oct-tabs__content');

  // newBasketTab.addEventListener('click', () => {
  //   newBasketTab.classList.add('oct-tab--active');
  //   originalBasketTab.classList.remove('oct-tab--active');

  //   newBasketRecs.classList.remove(`${ID}-display-none`);
  //   originalBasketRecs.classList.add(`${ID}-display-none`);

  //   swiper.update();
  //   swiper.scrollbar.updateSize();
  // });

  // originalBasketTab.addEventListener('click', () => {
  //   originalBasketTab.classList.add('oct-tab--active');
  //   newBasketTab.classList.remove('oct-tab--active');

  //   originalBasketRecs.classList.remove(`${ID}-display-none`);
  //   newBasketRecs.classList.add(`${ID}-display-none`);
  // });
}

const startExperiment = () => {
  const warningMessage = document.querySelector('.oct-basket-warning');
  if (warningMessage && warningMessage.textContent.includes('empty')) return;

  getAllProductDetailsPromise.then((productDetails) => {
    // make the swiper with the product details
    // const attachPoint = document.querySelector('.oct-grid__row--full-width');
    // attachPoint.insertAdjacentHTML('beforebegin', productRecs(productDetails));
    // startSwiper();
    // addSwipeFunctionality(`.${ID}-product-recs-swiper`);



    if (window.outerWidth < 992) {
      pollerLite([".oct-basket__content", ".oct-basket-totals"], () => {
        if (document.querySelector(`.${ID}-mobile-basket`)) {
          return;
        } else {
          let theBasket = document.querySelector(".oct-basket");

          theBasket.classList.add(`${ID}-mobile-basket`);
          console.log("mobile basket");

          let mobileBasketInterval = setInterval(() => {
            if (
              document.querySelector(".oct-product-tile-new") ||
              document.querySelector(".oct-product-tile")
            ) {
              clearInterval(mobileBasketInterval);

              pollerLite([".oct-tabs__labels .oct-tab"], () => {
                const basketTab = document.querySelector(".oct-tabs__labels");
                basketTab.insertAdjacentHTML("afterbegin", basketTabHtml);

                const attachPoint = document.querySelector(`.${ID}-mobile-basket .oct-products .oct-tabs`);

                const recsContainers = document.querySelectorAll(`.${ID}-product-recs-container`);
                if (recsContainers.length > 0) {
                  recsContainers.forEach((el) => el.remove());
                }

                attachPoint.insertAdjacentHTML('beforeend', productRecs(productDetails));

                hideOriginalBasketTab();
                // addTabEventListeners();

                startSwiper();
                // addSwipeFunctionality(`.${ID}-product-recs-swiper`);


              });
            }
          }, 100);
        }
      });
    } else {
      pollerLite([".oct-basket__content", ".oct-basket-totals"], () => {
        console.log("desktop basket");

        if (document.querySelector(`.${ID}-desktop-basket`)) {
          console.log("desktop basket IF");
          return;
        } else {
          let theBasket = document.querySelector(".oct-basket");
          console.log("desktop basket ELSE");

          theBasket.classList.add(`${ID}-desktop-basket`);

          let basketInterval = setInterval(() => {
            if (
              document.querySelector(".oct-product-tile-new") ||
              document.querySelector(".oct-product-tile")
            ) {
              clearInterval(basketInterval);

              pollerLite([".oct-tabs__labels .oct-tab"], () => {
                const basketTab = document.querySelector(".oct-tabs__labels");
                basketTab.insertAdjacentHTML("afterbegin", basketTabHtml);

                const attachPoint = document.querySelector(`.${ID}-desktop-basket .oct-products .oct-tabs`);

                const recsContainers = document.querySelectorAll(`.${ID}-product-recs-container`);
                if (recsContainers.length > 0) {
                  recsContainers.forEach((el) => el.remove());
                }
                attachPoint.insertAdjacentHTML('beforeend', productRecs(productDetails));

                hideOriginalBasketTab();
                // addTabEventListeners();

                startSwiper();
                // addSwipeFunctionality(`.${ID}-product-recs-swiper`);


              });
            }

          }, 100);

          basketInterval;
        }
      });
    }

  }).catch((error) => {
    console.error('Error fetching data:', error);
  });

  if (window.location.hash.includes('#scrollToReviews')) {
    pollerLite(['[data-bv-show="reviews"]'], () => {
      const SCROLLDELAY = 1000;
      setTimeout(() => {
        const reviewSection = document.querySelector('[data-bv-show="reviews"]');
        reviewSection.scrollIntoView({
          behavior: 'smooth'
        });
      }, SCROLLDELAY);
    });
  }
};

const controlTracking = () => {
  if (window.outerWidth < 992) {
    pollerLite([".oct-basket__content", ".oct-basket-totals"], () => {
      const isLoggedInAdcardUser =
        window.userObj.isLoggedIn && window.userObj.advantageCardFlag;
      const isLoggedInResultBoolean = isLoggedInAdcardUser === "true";

      fireBootsEvent(`Mobile Basket`, true, eventTypes.experience_render, {
        render_element: elementTypes.Icons,
        render_detail: `Mobile Basket open - Frequent items would have been displayed`,
      });

      // if (isLoggedInResultBoolean) {
      //   fireBootsEvent(
      //     `Signed In and Adcard Owner Summary`,
      //     true,
      //     eventTypes.experience_render,
      //     {
      //       render_element: elementTypes.Icons,
      //       render_detail: `Mobile Signed In and Adcard Owner Summary would have been displayed`,
      //     }
      //   );
      // } else if (!isLoggedInResultBoolean) {
      //   fireBootsEvent(
      //     `Signed Out and Adcard Owner Summary`,
      //     true,
      //     eventTypes.experience_render,
      //     {
      //       render_element: elementTypes.Icons,
      //       render_detail: `Mobile Signed Out and Adcard Owner Summary would have been displayed`,
      //     }
      //   );
      // }
    });
  } else {
    pollerLite([".oct-basket__content", ".oct-basket-totals"], () => {
      const isLoggedInAdcardUser =
        window.userObj.isLoggedIn && window.userObj.advantageCardFlag;
      const isLoggedInResultBoolean = isLoggedInAdcardUser === "true";

      fireBootsEvent(`Desktop Basket`, true, eventTypes.experience_render, {
        render_element: elementTypes.Icons,
        render_detail: `Desktop Basket open - Frequent items would have been displayed`,
      });

      // if (isLoggedInResultBoolean) {
      //   fireBootsEvent(
      //     `Signed In and Adcard Owner Summary`,
      //     true,
      //     eventTypes.experience_render,
      //     {
      //       render_element: elementTypes.Icons,
      //       render_detail: `Desktop Signed In and Adcard Owner Summary would have been displayed`,
      //     }
      //   );
      // } else if (!isLoggedInResultBoolean) {
      //   fireBootsEvent(
      //     `Signed Out and Adcard Owner Summary`,
      //     true,
      //     eventTypes.experience_render,
      //     {
      //       render_element: elementTypes.Icons,
      //       render_detail: `Desktop Signed Out and Adcard Owner Summary would have been displayed`,
      //     }
      //   );
      // }
    });
  }
};

export default () => {
  const { ID, VARIATION } = shared;

  bootsEvents.initiate = true;
  bootsEvents.methods = ["datalayer"];
  bootsEvents.property = "G-C3KVJJE2RH";
  bootsEvents.testID = testIDAndVariant;

  setup();

  // fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == "control") {
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains('#oct-basket #Recommended-tab') ||
        e.target.closest('#oct-basket .oct-tab .oct-tab__btn[aria-controls="Recommended-tab"]')) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'User has clicked on the Recommended tab'
        });
      }

      if (e.target.classList.contains('#oct-basket .oct-product-card__button') ||
        e.target.closest('#oct-basket .oct-product-card__button')) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.view_product,
          action_detail: 'User has clicked on the View Product button'
        });
      }

      if (e.target.classList.contains('#oct-basket .oct-product-card__badge--offer') ||
        e.target.closest('#oct-basket .oct-product-card__badge--offer')) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'User has clicked on the Offer Roundel'
        });
      }

      if (e.target.classList.contains('#oct-basket .oct-product-card__offer') ||
        e.target.closest('#oct-basket .oct-product-card__offer__container')) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_promotion,
          action_detail: 'User has clicked on the Offer Detail'
        });
      }

      const originalProducts = document.querySelectorAll('#oct-basket .oct-products .oct-tabs__content .oct-product-card');
      originalProducts.forEach((product, index) => {
        const productName = product['data-productname'];
        const positionInCarousel = index + 1;

        fireBootsEvent('', true, eventTypes.experience_render, {
          render_element: elementTypes.Product_carousel,
          render_detail: `Product ${productName} in position ${positionInCarousel} in the carousel`
        });
      });

    })

    return;
  }

  // startExperiment();

  const variantTracking = () => {
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains(`${ID}-BL-tab`) ||
        e.target.closest(`.${ID}-tab`)) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'User has clicked on the Frequently topped up tab'
        });
      }

      // add tracking for user clicking original tab
      if (e.target.classList.contains('#oct-basket #Recommended-tab') ||
        e.target.closest('#oct-basket .oct-tab .oct-tab__btn[aria-controls="Recommended-tab"]')) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'User has clicked on the Recommended tab'
        });
      }

      //add tracking for view product for each product and include that product name
      if (e.target.classList.contains(`${ID}-personalised--product--add`) ||
        e.target.closest(`#oct-basket .${ID}-personalised--product--add`)) {
        const productName = e.target.closest(`.${ID}-personalised--product`).querySelector('h4').innerText;
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.view_product,
          action_detail: `User has clicked on the View Product for ${productName}`
        });
      }

      //do the same for reviews
      if (e.target.classList.contains(`${ID}-personalised--product--rating`) ||
        e.target.closest(`.${ID}-personalised--product--rating`)) {
        const productName = e.target.closest(`.${ID}-personalised--product`).querySelector('h4').innerText;
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_pdp_product_rating,
          action_detail: `User has clicked on the product rating for ${productName}`
        });
      }

      //fire tracking for product positions in the carousel
      const personalisedProducts = document.querySelectorAll(`.${ID}-personalised--product`);
      personalisedProducts.forEach((product, index) => {
        const productName = product.querySelector('h4').innerText;
        const positionInCarousel = index + 1;

        fireBootsEvent('', true, eventTypes.experience_render, {
          render_element: elementTypes.Product_carousel,
          render_detail: `Product ${productName} in position ${positionInCarousel} in the carousel`
        });
      });


    });
  };

  variantTracking();

  window.addEventListener("oct-basket:updated", () => {
    console.log("Basket updated");
    revertAllChanges();
    startExperiment();
    variantTracking();

    // if (document.querySelector(`.${ID}-basket-points`)) {
    //   let currPoints = document.querySelector('.oct-adCardTile__login-amount')?.innerText;
    //   document.querySelector(`.${ID}-basket-points`).innerText = currPoints + "points";
    // }

    // let allCurrBasketItems = document.querySelectorAll(`.${ID}-basket .oct-product-tile`);
    // if (allCurrBasketItems.length == 1) {
    //   [].slice.call(allCurrBasketItems).forEach((item) => {
    //     if (!item.querySelector(`.${ID}-remove-button`)) {
    //       item.querySelector('.oct-product-buttons__remove-cta').insertAdjacentHTML('afterend', `<button data-testid="button" class="${ID}-remove-button oct-button oct-button--cta oct-button--cta-textOnly oct-button--cta-textOnly-responsive oct-product-buttons__remove-cta" tabindex="-1"><div class="oct-button__content"><p class="oct-text oct-text--standard oct-text--size_s" data-testid="text" role="button" tabindex="0" aria-label="Remove">Remove</p></div></button>`);
    //       item.querySelector('.oct-product-buttons__remove-cta').classList.add(`${ID}-hidden`);
    //     }

    //   });
    // }
  });

  document.body.addEventListener("click", (e) => {
    const { target } = e;

    if (target.closest('#oct-basket-container .oct-iconButton')) {
      pollerLite([".oct-basket__content"], () => {
        if (document.querySelector(`.${ID}-product-wrapper .swiper-wrapper`)) return;

        // revertAllChanges();
        // startExperiment();
        // variantTracking();
      });
    } else if (target.closest(`.${ID}-tab`)) {
      const newBasketTab = target.closest(`.${ID}-tab`);
      const newBasketRecs = document.querySelector(`.${ID}-product-recs-container`);
      const originalBasketTab = document.querySelector(`.${ID}-original-basket-tab`);
      const originalBasketRecs = document.querySelector('.oct-products .oct-tabs .oct-tabs__content');

      if (newBasketRecs && originalBasketTab && originalBasketRecs) {
        newBasketTab.classList.add('oct-tab--active');
        originalBasketTab.classList.remove('oct-tab--active');

        newBasketRecs.classList.remove(`${ID}-display-none`);
        originalBasketRecs.classList.add(`${ID}-display-none`);

        swiper.update();
        swiper.scrollbar.updateSize();
      }
    } else if (target.closest(`.${ID}-original-basket-tab`)) {
      const newBasketTab = document.querySelector(`.${ID}-tab`);
      const newBasketRecs = document.querySelector(`.${ID}-product-recs-container`);
      const originalBasketTab = target.closest(`.${ID}-original-basket-tab`);
      const originalBasketRecs = document.querySelector('.oct-products .oct-tabs .oct-tabs__content');

      if (newBasketRecs && originalBasketTab && originalBasketRecs) {
        originalBasketTab.classList.add('oct-tab--active');
        newBasketTab.classList.remove('oct-tab--active');

        originalBasketRecs.classList.remove(`${ID}-display-none`);
        newBasketRecs.classList.add(`${ID}-display-none`);
      }
    }
  });
};
