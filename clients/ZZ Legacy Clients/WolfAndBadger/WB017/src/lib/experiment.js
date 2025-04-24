/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const runChanges = () => {

  const data = [
    {
      title: 'ILLUMINATING YELLOW',
      image: 'https://res.cloudinary.com/wolfandbadger/image/upload/s--5Vw7DRGm--/q_auto:best,f_auto,w_1170,h_400,c_fill,g_center/categories/diauorf1gnurx7qxfvwe',
      content: "Pantone named 'Illuminating', an optimistic hue of yellow, as one of their colours for 2021. Evoke the promise of a sunshine-filled day with our mellow yellow edit and fortify your surroundings with energy, clarity and hope to uplift the human spirit.",
      link: 'https://www.wolfandbadger.com/uk/category/gifts/illuminating-yellow/',
    },
    {
      title: 'BLACK TO BASICS',
      image: 'https://res.cloudinary.com/wolfandbadger/image/upload/s--_kbBoSgc--/q_auto:best,f_auto,w_1170,h_400,c_fill,g_center/categories/p16fqrckotwcjxkq5mph',
      content: "Time to go back to black. The fashion set do it, the French do it, we can all do it. Go head-to-toe, accent it, use it as a base. We don’t mind, we just think a bit of moody black can go a long way in making an outfit the ultimate statement in chic...",
      link: 'https://www.wolfandbadger.com/uk/category/gifts/black-to-basics/',
    },
    {
      title: 'HAPPY HOME',
      image: 'https://res.cloudinary.com/wolfandbadger/image/upload/s--v6DE1AZP--/q_auto:best,f_auto,w_1170,h_400,c_fill,g_center/categories/lzal4jnw9pjcr9tngqio',
      content: "Vivaciously vibrant colours & warming pastels are making our homes a happy place ♡",
      link: 'https://www.wolfandbadger.com/uk/category/homewares/happy-home/',
    }
  ];


  const container = `
    <div class="${shared.ID}__curation container">
      <h1 class="${shared.ID}__curation__title">CONTINUE BROWSING</h1>

      <a class="${shared.ID}__curation__item" href="${data[0].link}">
        <h1 class="${shared.ID}__curation__item__title">${data[0].title}</h1>
        <img class="${shared.ID}__curation__item__img" src="${data[0].image}"/>
        <div class="${shared.ID}__curation__item__content">${data[0].content}</div>
      </a>

      <a class="${shared.ID}__curation__item" href="${data[1].link}">
        <h1 class="${shared.ID}__curation__item__title">${data[1].title}</h1>
        <img class="${shared.ID}__curation__item__img" src="${data[1].image}"/>
        <div class="${shared.ID}__curation__item__content">${data[1].content}</div>
      </a>

      <a class="${shared.ID}__curation__item" href="${data[2].link}">
        <h1 class="${shared.ID}__curation__item__title">${data[2].title}</h1>
        <img class="${shared.ID}__curation__item__img" src="${data[2].image}"/>
        <div class="${shared.ID}__curation__item__content">${data[2].content}</div>
      </a>

    </div>
  `;

  const pagination = document.querySelector('.pagination');
  if (pagination) {
    pagination.insertAdjacentHTML('afterend', container);
  }


  const curationBlocks = document.querySelectorAll(`.${shared.ID}__curation__item`);
  if (curationBlocks) {
    [].forEach.call(curationBlocks, block => {
      const blockTitle = block.querySelector(`.${shared.ID}__curation__item__title`).innerText;
      block.addEventListener('click', () => {
        events.send(`${shared.ID}`, blockTitle);
      })
    })
  }

  // Event tracking

  var executedEvent = false;

  $(window).scroll(function(){

    function elementScrolled(elem)
    {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(elem).offset().top;
      return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }
  
    if(elementScrolled(`.${shared.ID}__curation`)) {
      
      if (!executedEvent) {
        executedEvent = true;
        events.send(`${shared.ID}`, 'experiment-seen');
      }
    }
  });
}

const init = () => {
  setup();
  runChanges();
  window.$(document).on('pjax:success', function() {
    runChanges();
  });
}

export default () => {
  init();
};
