import settings from '../../lib/settings';

const { ID } = settings;

export default class USP {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.USPs = [
      {
        img: 'https://cdn.dynamicyield.com/api/8770250/images/ff64892a2608__USPV2_1.png',
        titleGB: 'Small Quantities Available',
        titleDE: 'Nur noch wenige auf Lager',
        titleFR: 'Petites quantités disponibles',
        titleSE: 'Mindre kvantiteter finns tillgängligt ',
        descGB: 'Only order what your need',
        descDE: 'Bestellen Sie nur, was Sie brauchen',
        descFR: 'Commandez uniquement ce dont vous avez besoin',
        descSE: 'Beställ bara det du behöver',
      },
      {
        img: 'https://cdn.dynamicyield.com/api/8770250/images/11953e2edbc50__USPV2_2.png',
        titleGB: 'Local Language',
        titleDE: 'Landessprache',
        titleFR: 'Langue locale',
        titleSE: 'Lokalt språk',
        descGB: 'Experienced support when you need it',
        descDE: 'Kompetente Unterstützung von Fachleuten',
        descFR: 'Un soutien expérimenté quand vous en avez besoin',
        descSE: 'Erfaren support när du behöver den',
      },
      {
        img: 'https://cdn.dynamicyield.com/api/8770250/images/3200ac354148b__USPV2_3.png',
        titleGB: 'Same Day Dispatch',
        titleDE: 'Versand am gleichen Tag',
        titleFR: 'Expédition le jour même',
        titleSE: 'Skickas samma dag',
        descGB: 'On all orders placed before 5pm',
        descDE: 'Bei Bestellung bis 17 Uhr',
        descFR: 'Pour toutes les commandes passées avant 17 h',
        descSE: 'Gäller alla beställningar som gjorts före 17.00',
      },
      {
        img: 'https://cdn.dynamicyield.com/api/8770250/images/1175c7ffabbcc__USPV2_4.png',
        titleGB: 'Latest Technology',
        titleDE: 'Modernste Technik',
        titleFR: 'Dernières technologies',
        titleSE: 'Den senaste tekniken',
        descGB: 'Thousands of new products in-stock',
        descDE: 'Tausende von neuen Produkten auf Lager',
        descFR: 'Des milliers de nouveaux produits en stock',
        descSE: 'Tusentals nya produkter i lager',
      },
    ];
    this.create();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    const element = document.createElement('div');
    element.classList.add(`${ID}_USPV2`);
    switch (countryCode) {
      case 'EN':
        element.innerHTML = `
          <div class="container">
            <div class="row">
              <div class="col-12">
                <ul>
                  ${this.USPs.map(usp => `
                    <li class="${ID}_USPV2__element">
                      <div class="${ID}_USPV2__img">
                        <img src="${usp.img}" />
                      </div>
                      <p class="${ID}_USPV2__title">${usp.titleGB}</p>
                      <p class="${ID}_USPV2__desc">${usp.descGB}</p>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
        break;
      case 'DE':
        element.innerHTML = `
          <div class="container">
            <div class="row">
              <div class="col-12">
                <ul>
                  ${this.USPs.map(usp => `
                    <li class="${ID}_USPV2__element">
                      <div class="${ID}_USPV2__img">
                        <img src="${usp.img}" />
                      </div>
                      <p class="${ID}_USPV2__title">${usp.titleDE}</p>
                      <p class="${ID}_USPV2__desc">${usp.descDE}</p>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
        break;
      case 'CH':
        element.innerHTML = `
          <div class="container">
            <div class="row">
              <div class="col-12">
                <ul>
                  ${this.USPs.map(usp => `
                    <li class="${ID}_USPV2__element">
                      <div class="${ID}_USPV2__img">
                        <img src="${usp.img}" />
                      </div>
                      <p class="${ID}_USPV2__title">${usp.titleDE}</p>
                      <p class="${ID}_USPV2__desc">${usp.descDE}</p>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
        break;
      case 'FR':
        element.innerHTML = `
          <div class="container">
            <div class="row">
              <div class="col-12">
                <ul>
                  ${this.USPs.map(usp => `
                    <li class="${ID}_USPV2__element">
                      <div class="${ID}_USPV2__img">
                        <img src="${usp.img}" />
                      </div>
                      <p class="${ID}_USPV2__title">${usp.titleFR}</p>
                      <p class="${ID}_USPV2__desc">${usp.descFR}</p>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
        break;
      case 'SV':
        element.innerHTML = `
          <div class="container">
            <div class="row">
              <div class="col-12">
                <ul>
                  ${this.USPs.map(usp => `
                    <li class="${ID}_USPV2__element">
                      <div class="${ID}_USPV2__img">
                        <img src="${usp.img}" />
                      </div>
                      <p class="${ID}_USPV2__title">${usp.titleSE}</p>
                      <p class="${ID}_USPV2__desc">${usp.descSE}</p>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
        break;
      default:
        break;
    }
    this.component = element;
  }
}
