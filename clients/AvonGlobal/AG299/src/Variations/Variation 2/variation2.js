/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import 'preact/debug';
import { Fragment, h, render } from 'preact';
import Swiper from 'swiper';
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';
import { getUrlParameter, addUrlParameter } from '../../../../../lib/utils';

// Components

// Utils
import { generateBulletsAndMountGlide } from '../../../../../lib/utils/Glide/glideInitialisation';
import { pollerLite } from '../../../../../lib/utils';
import { waitUntilElementExists } from '../../../../../lib/utils/waitUntilElementExists';

let images = [
  {
    name: 'All Products',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/All%20products.png',
  },
  {
    name: 'Make-Up',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Make-Up.png',
  },
  {
    name: 'Skincare',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Skincare.png',
  },
  {
    name: 'Toiletries',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Toiletries.png',
  },
  {
    name: 'Fragrance',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Perfume.png',
  },
  {
    name: 'Fashion',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Fashion.png',
  },
  {
    name: 'Sale',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Sale.png',
  },
  {
    name: 'Gifts',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Gifts.png',
  },
  {
    name: 'Christmas',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/Christmas.png',
  },
];

const getBrochures = waitUntilElementExists('#main_container', () => {
  const brochures =
    document.querySelector('#main_container').firstElementChild
      .firstElementChild.firstElementChild.children;
  return [...brochures];
});
const getData = () => {
  return new Promise((resolve, reject) => {
    const stat = [];
    fetch(location.pathname + 'categoriesfeed.json')
      .then((resp) => resp.json())
      .then((data) => {
        let imageLink = '';
        let targetUrl = '';
        let name = '';
        const activeBrochure = document.querySelector('.swiper-slide-active');
        const getBrochureName = activeBrochure.firstChild;
        const regexToFindBrochureName = /(['])(?:(?=(\\?))\2.)*?\1/g;
        const getParent = (data, categoryName) => {
          let parentData = [];
          Object.values(data).forEach((brochure) => {
            brochure.categories.forEach((category, index, brochure) => {
              if (category.url.includes(categoryName)) {
                parentData.push(brochure);
              }
            });
          });
          return parentData[0];
        };
        const brochureName = regexToFindBrochureName
          .exec(getBrochureName.attributes.onclick.value)[0]
          .replace('/index.html', '');
        // remove speech marks and apostrophes from brochure name
        const cleanBrochureName = brochureName.replace(/['"]+/g, '');
        const categories = getParent(data, cleanBrochureName);

        [...categories].forEach((category) => {
          targetUrl = category.url;
          name = category.name;
          imageLink = '';
          images.every((image) => {
            if (image.name === name) {
              imageLink = image.url;
              return false;
            }
            if (image.name != name) {
              imageLink =
                'https://ucds.ams3.digitaloceanspaces.com/AG299/placeholderImage.jpeg';
              return true;
            }
          });
          if (location.search.match(/rep_id/)) {
            // Retain Rep ID
            const rep_id = getUrlParameter('rep_id', location.href);
            data.url = addUrlParameter(targetUrl, 'rep_id', rep_id);
          }
          const extraSegmentsMatch = location.pathname.match(/(avon\/.+)\/.+/);
          if (extraSegmentsMatch && extraSegmentsMatch[1]) {
            // Retain Rep ID when it is in the url segments
            targetUrl = targetUrl.replace(
              location.hostname,
              location.hostname + '/' + extraSegmentsMatch[1]
            );
          }
          stat.push({
            name: name,
            url: imageLink,
            href: targetUrl,
          });
        });

        resolve(stat);
      });
  });
};

const glideConfigCategories = {
  type: 'slider',
  startAt: 0,
  perView: 3,
  gap: 7.5,
  bound: true,
  peek: {
    before: 0,
    after: 20,
  },
  classes: {
    bullets: 'glide__bullets',
    bullet: 'glide__bullet',
  },
};

export const mountSwiper = (parentElement, config) => {
  let newConfig = {};
  if (config) {
    newConfig = config;
  } else {
    newConfig = {
      direction: 'vertical',
      effect: 'slide',
      slidesPerView: 1,
      spaceBetween: 10,
      on: {
        init() {
          console.log('swiper initialized');
        },
      },
    };
  }
  pollerLite(['#slider_brochure'], () => {
    new Swiper(`${parentElement}`, newConfig);
  });
};

const SwiperElementBrochure = () => (
  <Fragment>
    <div className="brochure_heading">Shop Brochure</div>
    <div id="slider_brochure" className="swiper">
      <div className="swiper-wrapper">
        {[...getBrochures].map((element, index) => (
          <div
            key={index}
            onClick={() =>
              fireEvent(
                `Clicked brochure ${
                  /(['])(?:(?=(\\?))\2.)*?\1/g.exec(
                    element.getAttribute('onclick')
                  )[0]
                }`
              )
            }
            className="swiper-slide"
            dangerouslySetInnerHTML={{ __html: element.outerHTML }}
          />
        ))}
      </div>
    </div>
  </Fragment>
);

const GlideElementCategories = (props) => (
  <div id="slider_categories">
    <div className="brochure_heading">Shop Categories</div>
    <div className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {Object.values(props).map(({ name, url, href }, key) => (
            <li
              key={key}
              onClick={() => fireEvent(`Clicked Category ${name}`)}
              className="glide__slide"
            >
              <a href={href}>
                <img key={name} src={url} alt={name} />

                <span className="categories_title">{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{ display: 'none' }}
        className="glide__bullets"
        data-glide-el="controls[nav]"
      />
    </div>
  </div>
);

const removeElements = () => {
  document
    .querySelector('#slider_brochure')
    .querySelectorAll('.relative.flex.mt-12.title.anim-core')
    .forEach((button) => {
      button.remove();
    });
  document.querySelector('#logo_container').remove();
  document.querySelectorAll('.catalogue-cover').forEach((className) => {
    className.classList.remove('px-8');
    className.classList.remove('px-16');
    className.classList.remove('scale_over');
    className.firstElementChild.classList.remove('shadow-sm');
    className
      .querySelector('.my-auto')
      .firstElementChild.classList.remove('shadow-sm');
    document.querySelector(
      '.catalogue-cover'
    ).firstElementChild.style.boxShadow = null;
  });
};

const runChanges = () => {
  /** ******************************
   ***** App Start *****
   ****************************** */
  const App = () => (
    <Fragment>
      <hr className="border_full" />
      <SwiperElementBrochure />
    </Fragment>
  );

  const idOrNameOfPlacementOnPage = '#logo_container';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  document.querySelector('#main_container').innerHTML = '';
  placementonPage.insertAdjacentHTML(
    'afterend',
    "<div class='variation2' id='root'></div>"
  );
  render(<App />, document.getElementById('root'));
};

const mountSecondElement = (data) => {
  const GlideElement = () => (
    <div className="full_width_bar">
      <GlideElementCategories {...data} />
    </div>
  );

  const idOrNameOfPlacementOnPage = '#root';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementonPage.insertAdjacentHTML('afterbegin', "<div id='root2'></div>");
  render(<GlideElement />, document.getElementById('root2'));
};

const fireFunctions = () => {
  runChanges();
  mountSwiper('#slider_brochure');

  getData().then((data) => {
    const gatheredData = data;
    mountSecondElement(gatheredData);
    generateBulletsAndMountGlide('#slider_categories', glideConfigCategories);
    removeElements();
  });
};

export default () => {
  setup();

  fireEvent('Test Code Fired');

  const url = document.location.href;
  const brochureLanding = 'https://online.shopwithmyrep.co.uk/c02_uk_2022/';
  const coverPage = document.location.href.indexOf('page/1') > -1;

  if (shared.VARIATION === 'control') {
    if (url === brochureLanding || coverPage) {
      fireEvent('Conditions Met');
    }
    return;
  }

  // Tracking
  if (url === brochureLanding || coverPage) {
    fireEvent('Conditions Met');
  }

  // observe #slider_brochure for changes to class and console log hello
  waitUntilElementExists('#slider_brochure', () => {
    var slider_brochure = document.querySelector('#slider_brochure').firstChild;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.target.classList.contains('swiper-slide-active') &&
          document.querySelector('#root2')
        ) {
          document.querySelector('#root2').remove();
          getData().then((data) => {
            const gatheredData = data;
            mountSecondElement(gatheredData);
            generateBulletsAndMountGlide(
              '#slider_categories',
              glideConfigCategories
            );
          });
        }
      });
    });

    var config = {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
      attributeFilter: ['style', 'class'],
    };

    observer.observe(slider_brochure, config);
  });

  if (window.matchMedia('(orientation: portrait)').matches) {
    fireFunctions();
  }
  window.addEventListener('orientationchange', () => {
    window.location.reload();
  });
};
