/**
 * Add the grid images
 */
import { __ } from '../helpers';
import settings from '../../lib/settings';
import scrollToElement from './scrollTo';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default () => {
  const createImage = () => {
    const gridImages = [
      {
        image: '//cdn.optimizely.com/img/8355110909/d6bb5b02387c486883734523ed11af90.png',
        title: `${__('Fitness facilities')}`,
        link: `${ID}-fitness`,
      },
      {
        image: '//cdn.optimizely.com/img/8355110909/0fac523d51b84b59b98d402dcf254754.png',
        title: `${__('Hospitality')}`,
        link: `${ID}-hospitality`,
      },
      {
        image: '//cdn.optimizely.com/img/8355110909/4479dc2aa8504aa6aa9429641ec84ec8.png',
        title: `${__('Residential')}`,
        link: `${ID}-residential`,
      },
      {
        image: '//cdn.optimizely.com/img/8355110909/187926307d8644c09b63b4d9dbe34339.png',
        title: `${__('Health')}`,
        link: `${ID}-health`,
      },
      {
        image: '//cdn.optimizely.com/img/8355110909/483ecf01a6af4eecad927afa6e73f6d5.png',
        title: `${__('Workplace')}`,
        link: `${ID}-workplace`,
      },
      {
        image: '//cdn.optimizely.com/img/8355110909/dbb376c9a65e465b81910a79dce8265c.png',
        title: `${__('Performance')}`,
        link: `${ID}-performance`,
      },
    ];

    const gridContainer = document.querySelector(`.${ID}-gridImages`);
    Object.keys(gridImages).forEach((i) => {
      const data = gridImages[i];
      const gridImage = document.createElement('div');
      gridImage.classList.add(`${ID}-grid_image`);
      gridImage.setAttribute('cat-target', data.link);
      gridImage.style = `background-image: url(${data.image})`;
      gridImage.innerHTML = `<a>${data.title}</a>`;
      gridContainer.appendChild(gridImage);
    });
  };

  createImage();

  // put in slider on mobile
  const slider = () => {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', (data, textStatus, jqxhr) => {
      jQuery(`.${ID}-gridImages`).slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
        mobileFirst: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 767,
            settings: 'unslick',
          },
        ],
      });
    });
  };

  pollerLite([`.${ID}-gridImages`], () => {
    if (window.innerWidth < 767) {
      slider();
    }
  });


  const categoryScroll = () => {
    const allImages = document.querySelectorAll(`.${ID}-grid_image`);
    for (let index = 0; index < allImages.length; index += 1) {
      const element = allImages[index];
      const sectionLink = element.getAttribute('cat-target');
      element.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement(document.querySelector(`.${sectionLink}`));
      });
    }
  };
  categoryScroll();
};
