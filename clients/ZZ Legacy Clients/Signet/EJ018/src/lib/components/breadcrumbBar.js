import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class BreadcrumbBar {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_breadcrumbBar`);
    const category = window.digitalData.page.category.subCategory1;

    const brand = document.querySelector('.brand-stock .brand-stock__brand');

    if (category === 'Rings') {
      // rings breadcrumb
      element.innerHTML = `
      <div class="${ID}_breadcrumbBar-inner u-container">
        <a class="${ID}-breadcrumbLink" href="/"><span>Home</span></a>
        <a class="${ID}-breadcrumbLink" href="/webstore/jewellery.do?icid=ej-tn-jewellery"><span>Jewellery</span></a>
        ${brand ? `<a class="${ID}-breadcrumbLink ${ID}-brand" href="${brand.parentNode.getAttribute('href')}"><span>${brand.getAttribute('alt')}</span></a>` : ''}
        <a class="${ID}-breadcrumbLink" href="/webstore/l/jewellery/category%7crings/"><span>Rings</span></a>
      </div>`;
    } else if (category === 'Watches') {
      element.innerHTML = `
      <div class="${ID}_breadcrumbBar-inner u-container">
        <a class="${ID}-breadcrumbLink" href="/"><span>Home</span></a>
        <a class="${ID}-breadcrumbLink" href="/webstore/watches.do?icid=ej-tn-watches-coll-all"><span>All Watches</span></a>
        ${brand ? `<a class="${ID}-breadcrumbLink ${ID}-brand" href="${brand.parentNode.getAttribute('href')}"><span>${brand.getAttribute('alt')}</span></a>` : ''}
      </div>`;
    }


    // watches breadcrumb
    this.component = element;
  }


  render() {
    const { component } = this;
    const headerWrap = document.querySelector('.main-site-header');
    headerWrap.appendChild(component);

    // event
    const allBreadcrumbs = document.querySelectorAll(`.${ID}_breadcrumbBar .${ID}-breadcrumbLink`);
    for (let index = 0; index < allBreadcrumbs.length; index += 1) {
      const element = allBreadcrumbs[index];
      element.addEventListener('click', () => {
        events.send(`${ID} - v${settings.VARIATION}`, 'click', 'Clicked Breadcrumb Link');
      });
    }
  }
}
