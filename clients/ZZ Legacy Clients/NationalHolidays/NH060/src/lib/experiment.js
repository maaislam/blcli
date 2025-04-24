/**
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import settings from './settings';

/**
 * Build HTML for Tooltip
 *
 * @param {String} itemTitle
 * @param {String} itemLink
 * @param {String} id
 */
const buildHtmlForTooltip = (itemTitle, itemLink, id) => {
  return `
    <div style="display: none;">
      <div id="${id}" class="${settings.ID}-info-html">
        <span class="${settings.ID}-close">&times;</span>
        <p class="${settings.ID}-heading">${itemTitle}</p>
        <div class="${settings.ID}-content" data-url="${itemLink}">
          <p class="${settings.ID}-content__loading-image-wrap">
            <img class="${settings.ID}-content__loading-image" 
              src="https://www.nationalholidays.com/images/loader-01.gif">
          </p>
        </div>
        <p class="${settings.ID}-more-info"><a href="${itemLink}">See more info &gt;</a></p>
      </div>
    </div>
  `;
};

/**
 * Grab page 
 *
 * @param {String} pageUrl
 * @return {Promise}
 */
const grabPageContent = (pageUrl) => {
  return new Promise((res, rej) => {
    let request = new XMLHttpRequest();
    request.open('GET', pageUrl, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;

        res(temp);
      }
    };

    request.send();
  });
}

/**
 * Parse page content paragraphs
 *
 * @param {HTMLElement} pageDom element containing inner HTML elements
 * @return {Promise}
 */
const parsePageContent = (pageDom) => {
  return new Promise((res, rej) => {
    const cardTextFirstParagraph = pageDom.querySelector('.main-content .tab-area .content-block.active .text p');
    const paragraphs = pageDom.querySelectorAll('.main-content .tab-area .content-block.active .text p');

    if(cardTextFirstParagraph) {
      const cardText = cardTextFirstParagraph.innerText.trim();

      let cardBulletsContainer = null;
      [].forEach.call(paragraphs, (p) => {
        if(p.innerText.trim().match(/●|•/)) {
          cardBulletsContainer = p;
        }
      });

      let bullets = [];
      if(cardBulletsContainer) {
        [].forEach.call(cardBulletsContainer.querySelectorAll('br'), (br) => br.remove());

        const children = cardBulletsContainer.childNodes;
        [].forEach.call(children, (child) => {
          if(child.nodeType == 3) {
            bullets.push(child.textContent.replace('•', '●'));
          }
        });
      }

      res({
        openingParagraphText: cardText,
        bulletPoints: bullets,
      });
    }
  });
};

/**
 * On tooltip show - load content
 *
 * @param {String} pageUrl
 * @param {Function} cb
 */
const onTooltipShow = (pageUrl, cb ) => {
  grabPageContent(pageUrl).then(parsePageContent).then((parsedPageContent) => {
    const lightboxContent = document.querySelector(`.tooltipster-show .tooltipster-box .tooltipster-content .${settings.ID}-content`);
    lightboxContent.classList.add(`${settings.ID}-activated`);

    lightboxContent.innerHTML = `
      <p>
        ${parsedPageContent.openingParagraphText}
      </p>
      <p>
        ${parsedPageContent.bulletPoints.join('<br>')}
      </p>
    `;

    cb();
  });
};

/**
 * Initialise tooltipster
 * 
 * @param {Function} cb
 */
const initialiseTooltipster = (cb) => {
  jQuery.getScript('https://cdn.jsdelivr.net/npm/tooltipster@4.2.6/dist/js/tooltipster.bundle.min.js', () => {
    jQuery(`.${settings.ID}-tooltip`).tooltipster({
      trigger: 'click',
      interactive: true,
      maxWidth: 800,
      functionReady: (t, tooltip) => {
        events.send(`${settings.ID}`, 'saw-a-tooltip', '', {
          sendOnce: true
        });

        const origin = tooltip.origin;

        if(origin) {
          const url = origin.dataset.link;
          if(url) {
            onTooltipShow(url, () => {
              // Workaround trigger window resize has he effect of relayout tooltip
              jQuery(window).trigger('resize');
            });
          }
        }
      },
    });

    jQuery.tooltipster.on('close', (t) => {
      const origin = t.origin;
      if(origin) {
        origin.classList.remove(`${settings.ID}-active`);
      }
    });
    jQuery.tooltipster.on('ready', (t) => {
      const origin = t.origin;
      if(origin) {
        origin.classList.add(`${settings.ID}-active`);
      }
    });

    document.body.classList.add(`${settings.ID}-tooltips-initialised`);

    jQuery(`.${settings.ID}-close`).off('click').on('click', function() {
      events.send(`${settings.ID}`, 'clicked-close-cross', '', {
        sendOnce: true  
      });
      jQuery(`.${settings.ID}-tooltip`).tooltipster('hide');
    });

    if(typeof cb === 'function') {
      cb();
    }
  });
};

/**
 * Entry point
 */
const activate = () => {
  setup();

  const resultItems = document.querySelectorAll('.result-item');
  if(resultItems.length) {
    [].forEach.call(resultItems, (item) => {
      // ---------------------------------
      // Update title text
      // ---------------------------------
      const title = item.querySelector('.itin-title');
      const imageWrap = item.querySelector('.result-content > .image');
      const moreInfoBtn = item.querySelector('.btn-more-info');
      const moreInfoLink = moreInfoBtn.href;
      const id = settings.ID + (+new Date()) + Math.ceil(Math.random() * 1000);

      if(title && moreInfoBtn) {
        const titleText = title.innerText.trim();
        if(moreInfoLink && titleText) {
          const tooltipHtml = buildHtmlForTooltip(titleText, moreInfoLink, id);
          document.body.insertAdjacentHTML('afterbegin', tooltipHtml);

          title.innerHTML = `
            <a class="${settings.ID}-title-link" href="${moreInfoLink}">${titleText}</a>
            <span class="${settings.ID}-more-info-link ${settings.ID}-tooltip" data-tooltip-content="#${id}" data-link="${moreInfoLink}">i</span>
          `;

          // Event Tracking
          const infoLink = title.querySelector(`.${settings.ID}-more-info-link`);
          if(infoLink) {
            infoLink.addEventListener('mouseover', () => {
              events.send(settings.ID, 'mouseover', 'info-button', {
                sendOnce: true  
              });
            });
            infoLink.addEventListener('click', () => {
              events.send(settings.ID, 'click', 'info-button', {
                sendOnce: true  
              });
            });
          }
          
          const titleLink = title.querySelector(`.${settings.ID}-title-link`);
          if(titleLink) {
            titleLink.addEventListener('mouseover', () => {
              events.send(settings.ID, 'mouseover', 'item-title', {
                sendOnce: true  
              });
            });
            titleLink.addEventListener('click', () => {
              events.send(settings.ID, 'click', 'item-title', {
                sendOnce: true  
              });
            });
          }

          [].forEach.call(document.querySelectorAll(`.${settings.ID}-more-info a`), (moreInfoLink) => {
            moreInfoLink.addEventListener('click', () => {
              events.send(settings.ID, 'click', 'in-lightbox-see-more-info-link', {
                sendOnce: true  
              });
            });
          });
        }
      }
      
      // ---------------------------------
      // Image overlay
      // ---------------------------------
      if(imageWrap) {
        imageWrap.insertAdjacentHTML('afterbegin', `
          <div class="${settings.ID}-overlay">
            Click for more info
          </div>
        `);

        imageWrap.addEventListener('click', () => {
          window.location = moreInfoLink;  
        });

        imageWrap.addEventListener('mouseover', () => {
          events.send(settings.ID, 'mouseover', 'item-image', {
            sendOnce: true  
          });
        });
        imageWrap.addEventListener('click', () => {
          events.send(settings.ID, 'click', 'item-image', {
            sendOnce: true  
          });
        });
      }
    });

    // ---------------------------------
    // Tooltips on items
    // ---------------------------------
    initialiseTooltipster();
  }
};

export default activate;
