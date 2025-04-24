import settings from '../../lib/settings';

const { ID } = settings;
const NAME = 'USP';

export default class USP {
  constructor() {
    this.USPs = [
      {
        title: 'Redeem',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5c3366f70ac1a1546872567.png',
        desc: 'Order online like you normally do.',
      },
      {
        title: 'Eat',
        img: 'https://www.papajohns.co.uk/images/pr-changes/papa-rewards--eat-01.jpg',
        desc: 'Order online like you normally do.',
      },
      {
        title: 'Repeat',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5c33670605a731546872582.png',
        desc: 'Order online like you normally do.',
      },
      {
        title: 'Order',
        img: 'https://www.papajohns.co.uk/images/pr-changes/papa-rewards--order-01.jpg',
        desc: 'Order online like you normally do.',
      },
      {
        title: 'Earn',
        img: 'https://www.papajohns.co.uk/images/pr-changes/papa-rewards--earn-01.jpg',
        desc: 'Order online like you normally do.',
      },
    ];
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_${NAME}`);
    element.classList.add('prIconsContainer');
    element.classList.add('clearfix');
    element.innerHTML = `
      ${this.USPs.map((usp, i) => `
        <div class="iconBox">
          <p class="icon"><img src="${usp.img}" alt="" title="" width="" height=""></p>
          <h3>${i + 1}. ${usp.title}</h3>
          <p>${usp.desc}</p>
        </div>
      `).join('')}
    `;

    this.component = element;
  }

  render() {
    const oldUsp = document.querySelector('.prIconsContainer');
    oldUsp.insertAdjacentElement('afterend', this.component);
    oldUsp.parentElement.removeChild(oldUsp);
  }
}
