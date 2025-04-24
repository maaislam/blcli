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
import { Fragment, h, render } from 'preact';
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';
import { getUrlParameter, addUrlParameter } from '../../../../../lib/utils';

// Components

// Utils
import { generateBulletsAndMountGlide } from '../../../../../lib/utils/Glide/glideInitialisation';
import { waitUntilElementExists } from '../../../../../lib/utils/waitUntilElementExists';

let images = [
  {
    name: 'All Products',
    id: 'all',
    url: 'https://ucds.ams3.digitaloceanspaces.com/AG299/All%20products.png',
  },
  {
    name: 'Make-up',
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
        const activeBrochure = document.querySelector('.glide__slide--active');
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

const glideConfigBrochure = {
  type: 'slider',
  startAt: 0,
  perView: 1,
	gap: 20,
	bound: true,
  peek: {
    before: 60,
    after: 60,
  },
  classes: {
    bullets: 'glide__bullets',
    bullet: 'glide__bullet',
  },
};

const glideConfigCategories = {
  type: 'slider',
  startAt: 0,
  perView: 3,
  gap: 20,
  peek: {
    before: 20,
    after: 60,
  },
  classes: {
    bullets: 'glide__bullets',
    bullet: 'glide__bullet',
  },
};

const GlideElementBrochure = () => (
  <Fragment>
    <div id="slider_brochure">
      <div className="brochure_heading">Shop Brochure</div>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {[...getBrochures].map((element, index) => (
              <li
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
                className="glide__slide"
                dangerouslySetInnerHTML={{ __html: element.outerHTML }}
              />
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
  });
};

const runChanges = () => {
  /** ******************************
   ***** App Start *****
   ****************************** */
  const App = () => (
    <Fragment>
      <GlideElementBrochure />
    </Fragment>
  );

  /** ******************************
   ***** App End *****
   ****************************** */

  /** ******************************
   ***** Placement On Page Start *****
   ****************************** */

  const idOrNameOfPlacementOnPage = '#main_container';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  document.querySelector(idOrNameOfPlacementOnPage).innerHTML = '';
  placementonPage.insertAdjacentHTML(
    'afterend',
    "<div class='variation1' id='root'></div>"
  );

  render(<App />, document.getElementById('root'));
};

const mountSecondElement = (data) => {
  const GlideElement = () => (
    <div className="full_width_bar">
      <hr className="border_full" />
      <GlideElementCategories {...data} />
    </div>
  );
  const idOrNameOfPlacementOnPage = '#root';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementonPage.insertAdjacentHTML('beforeend', "<div id='root2'></div>");
  render(<GlideElement />, document.getElementById('root2'));
};

const fireFunctions = () => {
  runChanges();
  generateBulletsAndMountGlide('#slider_brochure', glideConfigBrochure);

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
    var slider_brochure = document.querySelector('#slider_brochure').lastChild;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.target.classList.contains('glide__slide--active') &&
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
