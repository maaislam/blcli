/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

const createBanner = (data) => {
  const { ID } = shared;

  const banner = document.createElement('div');
  banner.classList.add(`${ID}-noticeBanner`);
  if(data.link) {
    banner.innerHTML = `
      <a class="${ID}__bannerLink" href="${data.link}"></a>
      <h4><img src="${data.icon}"><span>${data.text1}</span></h4>
      <p>${data.text2} <a class="${ID}_link" href="${data.link}">${data.linkText}</a></p>
    `;
  } else {
    banner.innerHTML = `
      <h4><img src="${data.icon}"><span>${data.text1}</span></h4>
      <p>${data.text2} <span class="${ID}_link">${data.linkText}</span></p>
    `;
  }

  return banner;
};

const runSlick = () => {
	const init = () => {
    window.jQuery(`.${shared.ID}-bannerwrap`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        arrows: false,
    });
  };

  if(window.jQuery && window.jQuery.fn.slick) {
    init();
  } else {
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
      init();
    });
  }
};

export default () => {
  setup();

  const { ID } = shared;

  const banner1 = createBanner({
    link: '/webstore/secure/storeLocator.sdo',
    icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/22E874EBDA21173E2654CBFE621ED895E9DA3416B3AD515C5F9462A2F7C9C678/ernestjones-co-uk/FIX---EJ061---Notice-Banner/hs-store-png.png',
    text1: 'Our stores are re-opening',
    text2: `We've reopened our stores in England and can't wait to welcome you back`,
    linkText: 'Find out more',
  });

  const banner2 = createBanner({
    link: 'https://customer.bookingbug.com/?client=h_samuel&service=49232&company=37398',
    icon: 'https://service.maxymiser.net/cm/images-us/hsamuel-co-uk/7B94558EE094078C3B38991769B0E2C8F4870AB6CDDAA5DA1003B588BECDF3D1.png?meta=/FIX---HS064---Notice-Banner/noun_VideoCall_23239711.png',
    text1: 'Book a virtual online appointment',
    text2: `Speak to one of our experts from the comfort of your own home`,
    linkText: 'Book now',
  });

  const banner3 = createBanner({
    link: 'https://booking.hsamuel.co.uk/',
    icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5FE2D3EA0650DDBC929F68F68CA890C15013A08C068F9800F303DAF6569F5670/ernestjones-co-uk/FIX---EJ061---Notice-Banner/hs-calendar-png.png',
    text1: 'Book an in-store appointment',
    text2: `Avoid the queues and book an appointment with one of our in-store experts`,
    linkText: 'Book an in-store appointment',
  });

  const wrapper = document.createElement('div');
  wrapper.classList.add(`${ID}-bannerwrap`);

  document.querySelector('.delivery-banner').insertAdjacentElement('afterend', wrapper);

  //wrapper.insertAdjacentElement('beforeend', banner1);
  wrapper.insertAdjacentElement('beforeend', banner2)
  wrapper.insertAdjacentElement('beforeend', banner3);

  banner2.classList.add(`${ID}-livechat`);

  /*document.querySelector(`.${ID}-noticeBanner.${ID}-livechat`).addEventListener('click', () => {
    const liveChat = document.querySelector('.live-chat-toggle');
    if(liveChat) {
      liveChat.click();
    }
  });*/

  if(window.innerWidth < 580) {
    runSlick();
  }
};
