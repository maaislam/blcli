import settings from '../../lib/settings';

const { ID } = settings;

export default class Search {
  constructor() {
    this.create();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_HeroBanner--acc`);

    const USPs = [
      {
        title: 'Get personalised quotes',
        img: 'https://ab-test-sandbox.userconversion.com/experiments/DS003-2-USP_quotes.png',
      },
      {
        title: 'Upload a bill of materials',
        img: 'https://ab-test-sandbox.userconversion.com/experiments/DS003-2-USP_upload.png',
      },
      {
        title: 'Easily track shipments',
        img: 'https://ab-test-sandbox.userconversion.com/experiments/DS003-2-USP_shipments.png',
      },
    ];

    element.innerHTML = `
      <div class="container">
        <div class="col col-xs-12">
          <div class="${ID}_HeroBanner__left">
            <div class="${ID}_HeroBanner__USP">
              <p>Do more with an account...</p>
              <ul>
              ${USPs.map((usp, i) => `
                <li class="${ID}_HeroBanner__USP__item ${i === 0 ? `${ID}_active` : ''}">
                  <div class="${ID}_HeroBanner__USP__img"><img src="${usp.img}" /></div>
                  <div class="${ID}_HeroBanner__USP__title">${usp.title}</div>
                </li>
              `).join('')}
              </ul>
            </div>

            <div class="${ID}_HeroBanner__secondaryUSP">
              <p>You can also...</p>
              <ul>
                <li>Admin users & control budgets</li>
                <li>Manage delivery addresses</li>
                <li>Easily track shipments</li>
                <li>Access our best prices</li>
              </ul>
            </div>
          </div>

          <div class="${ID}_HeroBanner__right">
            <a class="${ID}_HeroBanner__CTA" href="/register/b2b">
              <span class="${ID}_HeroBanner__CTA__small">Create your new</span>
              <span>Business Account Now</span>
            </a>

            <p><em>Already a customer?</em></p>
            <p><a href="/login">Login</a> or <a href="/register/existing">Register with customer number</a></p>
          </div>
        </div>
      </div>
    `;

    // Animation to loop through USPs
    const $ = window.jQuery;
    const els = element.querySelectorAll(`.${ID}_HeroBanner__USP__item`);
    const DELAY = 3000;
    let activeIndex = 0;
    const loop = () => {
      setTimeout(() => {
        // Set next visible USP to next element or first element if at the end
        const nextIndex = (activeIndex + 1) >= USPs.length ? 0 : activeIndex + 1;

        $(els[activeIndex]).fadeOut(300, () => {
          $(els[nextIndex]).fadeIn(500, () => {
            activeIndex = nextIndex; // Change active index
            loop(); // Animate next USP
          });
        });
      }, DELAY);
    };
    loop(); // Init

    this.component = element;
  }
}
