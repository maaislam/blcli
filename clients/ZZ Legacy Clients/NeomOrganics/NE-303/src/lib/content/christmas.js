import shared from '../../../../../../core-files/shared';

const ref = 'https://blcro.fra1.digitaloceanspaces.com/ne303/';

const html = `
  <div class="${shared.ID}-col">

    <ul class="${shared.ID}-linklist ${shared.ID}-linklist--noimages">
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/christmas-wish1">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Christmas Wish</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/perfect-peace">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Perfect Peace</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/limited-edition-real-luxury">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Limited Edition Real Luxury</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/products/12-days-of-wellbeing">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">12 Days of Wellbeing</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/ultimate-gifts">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Ready Made Gift Collections</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/stocking-fillers">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Stocking Fillers</span>
          </div>
        </a>
      </li>
    </ul>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-imgcta" href="/products/12-days-of-wellbeing">
      <img class="${shared.ID}-imgcta__img" src="${ref}a-advent.jpg">
      <span class="${shared.ID}-imgcta__text ${shared.ID}-imgcta__text--white">12 Days of Wellbeing</span>
    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-imgcta" href="/collections/gift-a-moment-of-wellbeing">
      <img class="${shared.ID}-imgcta__img" src="${ref}a-gifta.jpg">
      <span class="${shared.ID}-imgcta__text ${shared.ID}-imgcta__text--white">Gift a Moment of Wellbeing</span>
    </a>
  </div>
`;

export default html;
