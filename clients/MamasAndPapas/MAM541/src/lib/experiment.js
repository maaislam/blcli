/* eslint-disable no-undef */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const debug = false;

const trustpilotLogo = `
<svg xmlns="http://www.w3.org/2000/svg" width="72" height="19" viewBox="0 0 72 19" fill="none">
  <g clip-path="url(#clip0_83_1827)">
    <path d="M19.3974 6.95654H26.5526V8.29152H23.7391V15.7961H22.1921V8.29152H19.3911V6.95654H19.3974ZM26.2469 9.39569H27.5694V10.6309H27.5944C27.638 10.4562 27.7191 10.2878 27.8376 10.1256C27.9562 9.96336 28.0996 9.80741 28.2681 9.67641C28.4365 9.53917 28.6237 9.43312 28.8295 9.34578C29.0354 9.26468 29.2475 9.22102 29.4596 9.22102C29.6218 9.22102 29.7403 9.22726 29.8027 9.23349C29.8651 9.23973 29.9274 9.25221 29.9961 9.25845V10.6184C29.8962 10.5997 29.7964 10.5872 29.6904 10.5747C29.5843 10.5622 29.4845 10.556 29.3847 10.556C29.1477 10.556 28.9231 10.6059 28.711 10.6995C28.4989 10.793 28.318 10.9365 28.162 11.1174C28.0061 11.3046 27.8813 11.5292 27.7877 11.8036C27.6942 12.0781 27.6505 12.39 27.6505 12.7456V15.7899H26.2407V9.39569H26.2469ZM36.4776 15.7961H35.0927V14.904H35.0677C34.8931 15.2284 34.6373 15.4842 34.2942 15.6776C33.9511 15.871 33.6017 15.9708 33.2462 15.9708C32.404 15.9708 31.7927 15.7649 31.4184 15.3469C31.0441 14.929 30.8569 14.2989 30.8569 13.4568V9.39569H32.2668V13.3195C32.2668 13.881 32.3728 14.2802 32.5912 14.511C32.8033 14.7418 33.1089 14.8604 33.4957 14.8604C33.7951 14.8604 34.0384 14.8167 34.238 14.7231C34.4377 14.6296 34.5999 14.511 34.7184 14.3551C34.8431 14.2054 34.9305 14.0182 34.9866 13.8061C35.0428 13.594 35.0677 13.3632 35.0677 13.1137V9.40193H36.4776V15.7961ZM38.8793 13.7437C38.9229 14.1554 39.0789 14.4424 39.3471 14.6108C39.6216 14.773 39.946 14.8604 40.3265 14.8604C40.4575 14.8604 40.6072 14.8479 40.7757 14.8292C40.9441 14.8105 41.1063 14.7668 41.2498 14.7106C41.3995 14.6545 41.518 14.5672 41.6178 14.4549C41.7114 14.3426 41.7551 14.1991 41.7488 14.0182C41.7426 13.8373 41.674 13.6876 41.5492 13.5753C41.4244 13.4568 41.2685 13.3694 41.0751 13.2946C40.8817 13.226 40.6634 13.1636 40.4139 13.1137C40.1643 13.0638 39.9148 13.0076 39.659 12.9515C39.397 12.8953 39.1413 12.8205 38.898 12.7394C38.6547 12.6583 38.4363 12.546 38.243 12.4025C38.0496 12.2653 37.8936 12.0844 37.7813 11.866C37.6628 11.6477 37.6067 11.3794 37.6067 11.0551C37.6067 10.7057 37.694 10.4188 37.8624 10.1817C38.0309 9.94465 38.2492 9.7575 38.505 9.61402C38.767 9.47055 39.0539 9.37073 39.3721 9.30835C39.6902 9.25221 39.9959 9.22102 40.2829 9.22102C40.6135 9.22102 40.9316 9.25845 41.2311 9.32707C41.5305 9.39569 41.805 9.50798 42.0483 9.67017C42.2916 9.82612 42.4912 10.032 42.6534 10.2815C42.8156 10.531 42.9154 10.8367 42.959 11.1923H41.4868C41.4182 10.8554 41.2685 10.6246 41.0252 10.5123C40.7819 10.3938 40.5012 10.3377 40.1893 10.3377C40.0895 10.3377 39.9709 10.3439 39.8337 10.3626C39.6965 10.3813 39.5717 10.4125 39.4469 10.4562C39.3284 10.4999 39.2286 10.5685 39.1413 10.6558C39.0602 10.7431 39.0165 10.8554 39.0165 10.9989C39.0165 11.1736 39.0789 11.3108 39.1974 11.4169C39.3159 11.5229 39.4719 11.6103 39.6653 11.6851C39.8587 11.7537 40.077 11.8161 40.3265 11.866C40.5761 11.9159 40.8318 11.9721 41.0938 12.0282C41.3496 12.0844 41.5991 12.1592 41.8486 12.2403C42.0982 12.3214 42.3165 12.4337 42.5099 12.5772C42.7033 12.7207 42.8592 12.8953 42.9778 13.1074C43.0963 13.3195 43.1587 13.5878 43.1587 13.8997C43.1587 14.2802 43.0713 14.5984 42.8967 14.8666C42.722 15.1286 42.4974 15.3469 42.2229 15.5091C41.9485 15.6713 41.6365 15.7961 41.2997 15.871C40.9628 15.9458 40.626 15.9832 40.2953 15.9832C39.8899 15.9832 39.5156 15.9396 39.1725 15.846C38.8294 15.7524 38.5299 15.6152 38.2804 15.4343C38.0309 15.2471 37.8312 15.0163 37.6878 14.7418C37.5443 14.4674 37.4694 14.1367 37.457 13.7562H38.8793V13.7437ZM43.533 9.39569H44.5997V7.47432H46.0095V9.39569H47.2821V10.4499H46.0095V13.8685C46.0095 14.0182 46.0158 14.143 46.0282 14.2553C46.0407 14.3613 46.0719 14.4549 46.1156 14.5297C46.1592 14.6046 46.2279 14.6607 46.3214 14.6982C46.415 14.7356 46.5335 14.7543 46.6957 14.7543C46.7955 14.7543 46.8954 14.7543 46.9952 14.7481C47.095 14.7418 47.1948 14.7294 47.2946 14.7044V15.7961C47.1386 15.8148 46.9827 15.8273 46.8392 15.846C46.6895 15.8647 46.5398 15.871 46.3838 15.871C46.0095 15.871 45.7101 15.8335 45.4855 15.7649C45.2609 15.6963 45.08 15.5902 44.9553 15.453C44.8243 15.3158 44.7432 15.1473 44.6933 14.9415C44.6496 14.7356 44.6184 14.4986 44.6122 14.2365V10.4624H43.5454V9.39569H43.533ZM48.2802 9.39569H49.6152V10.2628H49.6402C49.8398 9.88851 50.1143 9.6265 50.4698 9.46431C50.8254 9.30211 51.2059 9.22102 51.6239 9.22102C52.1292 9.22102 52.5659 9.30835 52.9402 9.48926C53.3145 9.66393 53.6264 9.90722 53.8759 10.2191C54.1254 10.531 54.3063 10.8929 54.4311 11.3046C54.5559 11.7163 54.6182 12.1592 54.6182 12.6271C54.6182 13.0575 54.5621 13.4755 54.4498 13.8747C54.3375 14.2802 54.1691 14.6358 53.9445 14.9477C53.72 15.2596 53.433 15.5029 53.0837 15.6901C52.7343 15.8772 52.3288 15.9708 51.8547 15.9708C51.6489 15.9708 51.443 15.9521 51.2371 15.9146C51.0313 15.8772 50.8317 15.8148 50.6445 15.7337C50.4574 15.6526 50.2765 15.5466 50.1205 15.4156C49.9583 15.2846 49.8273 15.1348 49.715 14.9664H49.6901V18.1604H48.2802V9.39569ZM53.2084 12.6021C53.2084 12.3152 53.171 12.0345 53.0961 11.76C53.0213 11.4855 52.909 11.2484 52.7593 11.0363C52.6096 10.8242 52.4224 10.6558 52.2041 10.531C51.9795 10.4063 51.7237 10.3377 51.4368 10.3377C50.8441 10.3377 50.395 10.5435 50.0956 10.9552C49.7961 11.367 49.6464 11.9159 49.6464 12.6021C49.6464 12.9265 49.6838 13.226 49.7649 13.5004C49.846 13.7749 49.9583 14.012 50.1205 14.2116C50.2765 14.4112 50.4636 14.5672 50.6819 14.6795C50.9003 14.798 51.156 14.8541 51.443 14.8541C51.7674 14.8541 52.0356 14.7855 52.2602 14.6545C52.4848 14.5235 52.6657 14.3488 52.8092 14.143C52.9526 13.9309 53.0587 13.6938 53.1211 13.4256C53.1772 13.1573 53.2084 12.8829 53.2084 12.6021ZM55.6975 6.95654H57.1073V8.29152H55.6975V6.95654ZM55.6975 9.39569H57.1073V15.7961H55.6975V9.39569ZM58.3674 6.95654H59.7772V15.7961H58.3674V6.95654ZM64.1003 15.9708C63.5888 15.9708 63.1334 15.8834 62.7342 15.715C62.3349 15.5466 61.998 15.3095 61.7173 15.0163C61.4428 14.7169 61.2307 14.3613 61.0873 13.9496C60.9438 13.5379 60.8689 13.0825 60.8689 12.5897C60.8689 12.1031 60.9438 11.6539 61.0873 11.2422C61.2307 10.8305 61.4428 10.4749 61.7173 10.1755C61.9918 9.87603 62.3349 9.64522 62.7342 9.47678C63.1334 9.30835 63.5888 9.22102 64.1003 9.22102C64.6119 9.22102 65.0672 9.30835 65.4665 9.47678C65.8657 9.64522 66.2026 9.88227 66.4833 10.1755C66.7578 10.4749 66.9699 10.8305 67.1134 11.2422C67.2569 11.6539 67.3317 12.1031 67.3317 12.5897C67.3317 13.0825 67.2569 13.5379 67.1134 13.9496C66.9699 14.3613 66.7578 14.7169 66.4833 15.0163C66.2088 15.3158 65.8657 15.5466 65.4665 15.715C65.0672 15.8834 64.6119 15.9708 64.1003 15.9708ZM64.1003 14.8541C64.4122 14.8541 64.6867 14.7855 64.9175 14.6545C65.1483 14.5235 65.3355 14.3488 65.4852 14.1367C65.6349 13.9246 65.741 13.6813 65.8158 13.4131C65.8845 13.1449 65.9219 12.8704 65.9219 12.5897C65.9219 12.3152 65.8845 12.0469 65.8158 11.7724C65.7472 11.498 65.6349 11.2609 65.4852 11.0488C65.3355 10.8367 65.1483 10.6683 64.9175 10.5373C64.6867 10.4063 64.4122 10.3377 64.1003 10.3377C63.7884 10.3377 63.5139 10.4063 63.2831 10.5373C63.0523 10.6683 62.8652 10.843 62.7154 11.0488C62.5657 11.2609 62.4597 11.498 62.3848 11.7724C62.3162 12.0469 62.2788 12.3152 62.2788 12.5897C62.2788 12.8704 62.3162 13.1449 62.3848 13.4131C62.4534 13.6813 62.5657 13.9246 62.7154 14.1367C62.8652 14.3488 63.0523 14.5235 63.2831 14.6545C63.5139 14.7917 63.7884 14.8541 64.1003 14.8541ZM67.7434 9.39569H68.8102V7.47432H70.22V9.39569H71.4926V10.4499H70.22V13.8685C70.22 14.0182 70.2262 14.143 70.2387 14.2553C70.2512 14.3613 70.2824 14.4549 70.326 14.5297C70.3697 14.6046 70.4383 14.6607 70.5319 14.6982C70.6255 14.7356 70.744 14.7543 70.9062 14.7543C71.006 14.7543 71.1058 14.7543 71.2056 14.7481C71.3054 14.7418 71.4053 14.7294 71.5051 14.7044V15.7961C71.3491 15.8148 71.1932 15.8273 71.0497 15.846C70.9 15.8647 70.7502 15.871 70.5943 15.871C70.22 15.871 69.9206 15.8335 69.696 15.7649C69.4714 15.6963 69.2905 15.5902 69.1657 15.453C69.0347 15.3158 68.9536 15.1473 68.9037 14.9415C68.8601 14.7356 68.8289 14.4986 68.8226 14.2365V10.4624H67.7559V9.39569H67.7434Z" fill="#333333"/>
    <path d="M17.7504 6.95655H11.2876L9.2914 0.805664L7.28894 6.95655L0.826172 6.95031L6.06002 10.7556L4.05756 16.9003L9.2914 13.1012L14.519 16.9003L12.5228 10.7556L17.7504 6.95655Z" fill="#00B67A"/>
    <path d="M12.972 12.1467L12.5229 10.7556L9.2915 13.1012L12.972 12.1467Z" fill="#005128"/>
  </g>
  <defs>
    <clipPath id="clip0_83_1827">
      <rect width="70.6665" height="17.3547" fill="white" transform="translate(0.826172 0.805664)"/>
    </clipPath>
  </defs>
</svg>
`;

const trustPilotRating = `
<svg xmlns="http://www.w3.org/2000/svg" width="92" height="18" viewBox="0 0 92 18" fill="none">
  <g clip-path="url(#clip0_83_1836)">
    <path d="M17.8602 0.1604H0.826172V17.1944H17.8602V0.1604Z" fill="#00B67A"/>
    <path d="M36.3138 0.1604H19.2798V17.1944H36.3138V0.1604Z" fill="#00B67A"/>
    <path d="M54.7669 0.1604H37.7329V17.1944H54.7669V0.1604Z" fill="#00B67A"/>
    <path d="M73.2205 0.1604H56.1865V17.1944H73.2205V0.1604Z" fill="#00B67A"/>
    <path d="M91.6741 0.1604H74.6401V17.1944H91.6741V0.1604Z" fill="#00B67A"/>
    <path d="M9.34324 11.6406L11.9338 10.9841L13.0162 14.32L9.34324 11.6406ZM15.3051 7.32891H10.745L9.34324 3.03491L7.94148 7.32891H3.38135L7.07204 9.99048L5.67029 14.2845L9.36098 11.6229L11.6322 9.99048L15.3051 7.32891Z" fill="white"/>
    <path d="M27.7964 11.6406L30.3869 10.9841L31.4693 14.32L27.7964 11.6406ZM33.7583 7.32891H29.1981L27.7964 3.03491L26.3946 7.32891H21.8345L25.5252 9.99048L24.1234 14.2845L27.8141 11.6229L30.0853 9.99048L33.7583 7.32891Z" fill="white"/>
    <path d="M46.25 11.6406L48.8406 10.9841L49.9229 14.32L46.25 11.6406ZM52.2119 7.32891H47.6517L46.25 3.03491L44.8482 7.32891H40.2881L43.9788 9.99048L42.577 14.2845L46.2677 11.6229L48.5389 9.99048L52.2119 7.32891Z" fill="white"/>
    <path d="M64.7036 11.6406L67.2942 10.9841L68.3765 14.32L64.7036 11.6406ZM70.6655 7.32891H66.1053L64.7036 3.03491L63.3018 7.32891H58.7417L62.4324 9.99048L61.0306 14.2845L64.7213 11.6229L66.9925 9.99048L70.6655 7.32891Z" fill="white"/>
    <path d="M83.1572 11.6406L85.7478 10.9841L86.8302 14.32L83.1572 11.6406ZM89.1191 7.32891H84.559L83.1572 3.03491L81.7555 7.32891H77.1953L80.886 9.99048L79.4843 14.2845L83.1749 11.6229L85.4461 9.99048L89.1191 7.32891Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_83_1836">
      <rect width="90.8481" height="17.034" fill="white" transform="translate(0.826172 0.1604)"/>
    </clipPath>
  </defs>
</svg>
`;

const startExperiment = () => {
  // console.log('MAM541: Experiment started');
  pollerLite(['.page-container #shopify-section-usp-bar', () => typeof window.DY.ServerUtil === 'object'], () => {
    const targetAudiences = {
      neverSignedup: 1874702,
      signedup: 1874701,
      signedupApi: 1874688,
      neverSignedupApi: 1874689,
      neverbooked: 1774604,
      returninguser: 1789831,
    };

    //for debugging
    //sessionStorage.setItem('blqa-data', JSON.stringify([]));
    const setFakeAudiences = (audiences) => {
      //check if audince type is an array if not console a message
      if (!Array.isArray(audiences)) {
        console.log('MAM541: Audience type is not an array');
        return;
      }
      //store it in session storage
      sessionStorage.setItem('blqa-data', JSON.stringify(audiences));
    };
    //make this functiion available in the console
    if (debug) {
      window.setFakeAudiences = setFakeAudiences;
    }

    //get fake audiences from session storage as an array

    const currentAudiences = debug ? JSON.parse(sessionStorage.getItem('blqa-data')) : window.DY.ServerUtil.getUserAudiences();
    //console.log('🚀 ~ pollerLite ~ currentAudiences:', currentAudiences);
    const isSignedUp = currentAudiences.some(
      (audience) => audience === targetAudiences.signedup || audience === targetAudiences.signedupApi
    );

    const bookedApi = !currentAudiences.some((audience) => audience === targetAudiences.neverbooked);
    //console.log('🚀 ~ pollerLite ~ neverbookedApi:', neverbookedApi);
    const returninguser = currentAudiences.some((audience) => audience === targetAudiences.returninguser);

    let contentData = {
      usp1: {},
      usp2: {},
      usp3: {},
      usp4: {},
    };

    const contentConfig = {
      option1: {
        link: '/pages/newsletter-signup',
        line1: 'Sign Up & Save',
        line2: 'plus tailored help & advice',
        class: `usp__block`,
      },

      option2: {
        link: '/pages/personal-shopping-in-store',
        line1: 'Book a Buying for Baby',
        line2: 'one-to-one appointment',
        class: `usp__block`,
      },
      option3: {
        link: '/pages/refer-a-friend',
        line1: 'Refer a Friend',
        line2: '& save on your next order',
        class: `usp__block`,
      },
      option4: {
        link: '/pages/klarna',
        line1: 'Flexible payments',
        line2: 'at checkout',
        class: `usp__block`,
      },
      option5: {
        link: '/pages/store-locator',
        line1: 'Find your Local Store',
        line2: 'over 150 stores nationwide',
        class: `usp__block`,
      },
      option6: {
        link: '/pages/delivery-and-collection-information',
        line1: 'Free Delivery',
        line2: 'on orders over £50',
        class: `usp__block`,
      },
      option7: {
        link: '/pages/returns',
        line1: `${trustpilotLogo} ${trustPilotRating}`,
        line2: 'over 9000 ratings',
        class: `usp__block ${ID}-trustpilot-container ${ID}__usp`,
      },
    };

    let showTrustpilot = true;
    if (!returninguser) {
      contentData.usp4 = contentConfig.option6;
    } else {
      contentData.usp4 = contentConfig.option5;
    }

    //console.log('🚀 ~ pollerLite ~ bookedApi:', bookedApi);
    if (!isSignedUp && !bookedApi && !returninguser) {
      contentData.usp1 = contentConfig.option7;
      contentData.usp2 = contentConfig.option2;
    } else if (!isSignedUp && !bookedApi && returninguser) {
      contentData.usp1 = contentConfig.option1;
      contentData.usp2 = contentConfig.option2;
      showTrustpilot = false;
      //console.log('🚀 ~ pollerLite ~ showTrustpilot:', showTrustpilot);
    } else if (!returninguser && isSignedUp && !bookedApi) {
      contentData.usp1 = contentConfig.option7;
      contentData.usp2 = contentConfig.option4;
    } else if (returninguser && isSignedUp && !bookedApi) {
      contentData.usp1 = contentConfig.option2;
      contentData.usp2 = contentConfig.option3;
    } else if (isSignedUp && bookedApi) {
      contentData.usp1 = contentConfig.option3;
      contentData.usp2 = contentConfig.option4;
    } else if (returninguser && bookedApi && !isSignedUp) {
      contentData.usp1 = contentConfig.option1;
      contentData.usp2 = contentConfig.option3;
    } else if (!returninguser && bookedApi && !isSignedUp) {
      contentData.usp1 = contentConfig.option7;
      contentData.usp2 = contentConfig.option4;
    }
    console.log('MAM541: contentData', contentData);

    const signUpCopy = contentConfig.option1;

    const { usp1, usp2, usp4 } = contentData;

    const trustCopy = `
      <a href="https://uk.trustpilot.com/review/www.mamasandpapas.com?utm_medium=trustbox&utm_source=MicroCombo" class="usp__block ${ID}-trustpilot-container ${ID}__usp">
        <div class="usp__line_1 ${ID}-trustpilot-logo">${trustpilotLogo} ${trustPilotRating}</div>
        <div class="usp__line_2">over 9000 ratings</div>
      </a>
    `;

    const uspBarCopyHtml = `
    <div id="shopify-section-usp-bar" class="shopify-section ${ID}-shopify-section-copy">
      <a href="${usp1.link}" class="${usp1.class} ${ID}__usp">
        <div class="usp__line_1">${usp1.line1}</div>
        <div class="usp__line_2">${usp1.line2}</div>
      </a>
      <a href="${usp2.link}" class="${usp1.class} ${ID}__usp">
        <div class="usp__line_1">${usp2.line1}</div>
        <div class="usp__line_2">${usp2.line2}</div>
      </a>
      ${
        showTrustpilot
          ? !returninguser
            ? ''
            : trustCopy
          : `<a href="/pages/refer-a-friend" class="usp__block ${ID}__usp">
        <div class="usp__line_1">Refer a Friend</div>
        <div class="usp__line_2">& save on your next order</div>
      </a>`
      }
      <a href="${usp4.link}" class="${usp4.class} ${ID}__usp">
        <div class="usp__line_1">${usp4.line1}</div>
        <div class="usp__line_2">${usp4.line2}</div>
      </a>
      ${
        !returninguser
          ? `<a href="${signUpCopy.link}" class="${signUpCopy.class} ${ID}__usp">
        <div class="usp__line_1">${signUpCopy.line1}</div>
        <div class="usp__line_2">${signUpCopy.line2}</div>
        </a>`
          : ``
      }
    </div>`;
    const target = document.querySelector('.page-container #shopify-section-usp-bar');
    target.insertAdjacentHTML('beforebegin', uspBarCopyHtml);

    let slidesToShow = 4;
    if (window.outerWidth < 1024) {
      slidesToShow = 3;
    } else if (window.outerWidth < 600) {
      slidesToShow = 2;
    }

    $(`.${ID}-shopify-section-copy`).slick({
      infinite: false,
      slidesToShow: slidesToShow,
      slidesToScroll: 2,
      autoplay: true, // Autoplay enabled
      autoplaySpeed: 3000, // Autoplay speed in milliseconds
      speed: 1000,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-PVM1K635XR';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__usp`)) {
      fireEvent('User clicks the USPs');
    }
  });

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
