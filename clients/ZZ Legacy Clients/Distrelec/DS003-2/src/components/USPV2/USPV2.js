import settings from '../../lib/settings';

const { ID } = settings;

export default class USP {
  constructor() {
    this.USPs = [
      {
        img: 'https://ab-test-sandbox.userconversion.com/experiments/DS003-2-USPV2_1.png',
        title: 'No Minimum Order',
        desc: 'First-class service with all order sizes',
      },
      {
        img: 'https://ab-test-sandbox.userconversion.com/experiments/DS003-2-USPV2_2.png',
        title: 'Expert Support',
        desc: 'Experienced support when you need it',
      },
      {
        img: 'https://ab-test-sandbox.userconversion.com/experiments/DS003-2-USPV2_3.png',
        title: 'Next day delivery',
        desc: 'On all orders placed before 5pm',
      },
      {
        img: 'https://ab-test-sandbox.userconversion.com/experiments/DS003-2-USPV2_4.png',
        title: 'Latest Products',
        desc: 'Thousands of new products in-stock',
      },
    ];
    this.create();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_USPV2`);
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
                  <p class="${ID}_USPV2__title">${usp.title}</p>
                  <p class="${ID}_USPV2__desc">${usp.desc}</p>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    this.component = element;
  }
}
