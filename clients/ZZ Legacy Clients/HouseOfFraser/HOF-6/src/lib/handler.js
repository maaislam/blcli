import shared from './shared';
import { fireEvent } from './services';
import data from './data';

/**
 * Remove active state from all links
 */
export const removeActivStateOnLinks = () => {
  const brandLogos = document.querySelector('.HOFhomeBrandLogos');
  if(brandLogos) {
    const links = brandLogos.querySelectorAll('.swiper-slide a');

    [].forEach.call(links, l => l.classList.remove(`${shared.ID}-active`));
  }
};

/**
 * Helper populate the sublinks
 */
export const populateSublinks = (href, alt) => {
  const brandLogos = document.querySelector('.HOFhomeBrandLogos');

  let subsection = brandLogos.querySelector(`.${shared.ID}-subsection`);
  if(!subsection) {
    brandLogos.insertAdjacentHTML('beforeend', `<div class="${shared.ID}-subsection">
      <span class="${shared.ID}-subsection__close"></span>
    </div>`);

    // Handle close clicked
    const close = brandLogos.querySelector(`.${shared.ID}-subsection__close`);
    if(close) {
      close.addEventListener('click', e => {
        removeActivStateOnLinks();

        const brandLogos = document.querySelector('.HOFhomeBrandLogos');
        brandLogos.classList.remove(`${shared.ID}-bl--active`);
      });
    }

    subsection = brandLogos.querySelector(`.${shared.ID}-subsection`);
  }

  const links = data[href];
  if(links) {
    subsection.insertAdjacentHTML('afterbegin', `
      <div class="${shared.ID}-subsection__inner">
        <div class="${shared.ID}-subsection__links">
          ${
            (Object.keys(links).map((link, idx) => {
              return `${(idx == 2 ? '<break></break>' : '')}<a class="${shared.ID}-subsection__link" href="${link}">${links[link]}</a>`;
            })).join('')
          }
        </div>
        <p class="${shared.ID}-subsection__all">
          <a href="${href}">Shop all ${alt}</a>
        </p>
      </div>
    `);

    const subsections = document.querySelectorAll(`.${shared.ID}-subsection__inner`);
    if(subsections.length > 1) {
      subsections[0].classList.add(`${shared.ID}-fadein`);
      subsections[1].classList.add(`${shared.ID}-fadeout`);

      setTimeout(() => {
        subsections[1].remove();
      }, 500);
    } else {
      subsections[0] && subsections[0].classList.add(`${shared.ID}-fadein`);
    }
  }
};

/**
 * Helper on did interact with a logo or 'explore more'
 */
export const didInteract = (swiper, slide) => {
  if(swiper) {
    // -------------------------
    // Stop autoplay on slider
    // -------------------------
    swiper.autoplay.stop();
  }

  const brandLogos = document.querySelector('.HOFhomeBrandLogos');

  // -------------------------
  // Populate sublinks
  // -------------------------
  if(slide) {
    const href = slide.querySelector('a').getAttribute('href');
    const alt = slide.querySelector('img[alt]')?.alt;

    populateSublinks(href, alt);
    
    // -------------------------
    // Sublink event tracking
    // -------------------------
    [].forEach.call(document.querySelectorAll(`.${shared.ID}-subsection__link`), link => {
      link.addEventListener('click', evt => {
        fireEvent('Clicked Sublink - ' + evt.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll(`.${shared.ID}-subsection__all a`), link => {
      link.addEventListener('click', evt => {
        fireEvent('Clicked All Link');
      });
    });

    // -------------------------
    // Show sublinks as active
    // -------------------------
    const subsection = document.querySelector(`.${shared.ID}-subsection`);
    if(subsection) {
      const brandLogos = document.querySelector('.HOFhomeBrandLogos');
      brandLogos.classList.add(`${shared.ID}-bl--active`);
    }
  }

  // -------------------------
  // Update active state on all logos
  // -------------------------
  const links = brandLogos.querySelectorAll('.swiper-slide a');

  removeActivStateOnLinks();

  slide.querySelector('a').classList.add(`${shared.ID}-active`);

  // Apply to cloned slides
  [].forEach.call(document.querySelectorAll('[data-swiper-slide-index="' 
    + slide.getAttribute('data-swiper-slide-index') + '"]'
  ), d => {
    d.querySelector('a').classList.add(`${shared.ID}-active`);
  });
};
