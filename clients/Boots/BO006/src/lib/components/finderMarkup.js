import shared from '../shared';

const { ID } = shared;

export default class GiftFinder {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_giftFinder-wrapper`);
    element.innerHTML = 
    `
    <div class="${ID}-stars-wrap">
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
    </div>

    <div class="${ID}_finderBottom">
        <div class="${ID}_finderQuestions">
          <div class="${ID}_finderIntro ${ID}-question ${ID}-question--in">
            <div class="${ID}_finderIntro__text">
              <!-- Start treat intro as question -->
              <h2>Gift Finder</h2>
              <p>Struggling to find that perfect gift for your loved ones? We’ll help you narrow it down with our gift finder.</p>

              <p>
                <a class="${ID}_finderStart ${ID}_button button primary">Get started</a>
              </p>
            </div>
          </div>
        </div>
    </div>`;
    this.component = element;
  }

  render() {
    const { component } = this;

    if(document.querySelector('.cm-placement-main .cu-ribbon')) {
      document.querySelector('.cm-placement-main .cu-ribbon').insertAdjacentElement('afterend', component);
    }
    else if(document.querySelector('.cm-placement-main')) {
      document.querySelector('.cm-placement-main').insertAdjacentElement('beforebegin', component);
    } else if(document.querySelector('#estore_category_heading')) {
      document.querySelector('#estore_category_heading').insertAdjacentElement('afterend', component);
    }
  }
}

