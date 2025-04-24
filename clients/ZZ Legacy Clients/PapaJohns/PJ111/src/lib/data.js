import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
const { ID } = shared;

const spinnerElement = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 rotating"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" class=""></path></svg>`;

const upsellProducts = [
  {
    id: 9,
    name: 'Cookie Dough Ice Cream',
    imgUrl: '/images/desserts/ben-jerrys-cookie-dough.jpg',
    url: '/services/speediorder.aspx?dvpromo=COOKIEDOUGHUP&dvproducts=0565C38F-B8C9-48BA-B636-6A87D114967C',
    before: '£5.99',
    now: '£3.99'
  },
  {
    id: 1,
    name: 'Giant Double Chocolate Brownie',
    imgUrl: '/images/desserts/doublechocolatebrownie.jpg',
    url: '/services/speediorder.aspx?dvpromo=BROWNIEUP&dvproducts=B28163DD-B087-47FD-9D2F-4E2FC556E011',
    before: '£5.49',
    now: '£3.49',
  },
  {
    id: 4,
    name: 'Cheesy Jalapeno Bites',
    imgUrl: '/images/sides/cheesy-jalapeno-bites.jpg',
    url: '/services/speediorder.aspx?dvpromo=JALABITESUP&dvproducts=C2E4B23B-04CC-475C-BDDB-BCC3E338B540',
    before: '£5.49',
    now: '£3.49',
  },
  {
    id: 5,
    name: 'Medium C&T Original Crust Pizza',
    imgUrl: '/images/pizzas/cheese-and-tomato.jpg',
    url: '/services/speediorder.aspx?dvpromo=MEDPIZZAUP&dvproducts=49E12B46-77FB-4ECE-94AD-CEC13B565361',
    before: '£12.99',
    now: '£5.99',
  },
  {
    id: 7,
    name: 'Garlic Sticks with Four Cheese',
    imgUrl: '/images/sides/6-cheese-sticks.jpg',
    url: '/services/speediorder.aspx?dvpromo=CHSTICKSUP&dvproducts=4F64BA90-4765-4A4D-AB26-99F3FBEDF344',
    before: '£6.49',
    now: '£3.49',
  },
];

if (shared.VARIATION == 2) {
  upsellProducts.push({
    id: 8,
    name: 'Large Pepsi Max (1.5l bottle)',
    imgUrl: '/images/drinks/max_taste_logo.jpg',
    url: '/services/speediorder.aspx?dvpromo=PEPSIMAXUP&dvproducts=C3731D9A-DCB8-4B19-B0A4-DE4EE4531EBB',
    before: '£2.49',
    now: '£1.50'
  });
  // upsellProducts.push({
  //   id: 9,
  //   name: 'Cookie Dough Ice Cream',
  //   imgUrl: '/images/desserts/ben-jerrys-cookie-dough.jpg',
  //   url: '/services/speediorder.aspx?dvpromo=COOKIEDOUGHUP&dvproducts=0565C38F-B8C9-48BA-B636-6A87D114967C',
  //   before: '£5.99',
  //   now: '£3.99'
  // });
  upsellProducts.push({
    id: 10,
    name: 'Chocolate Scrolls',
    imgUrl: '/images/desserts/Dairy-Milk-Scrolls_Thumbnail.jpg',
    url: '/services/speediorder.aspx?dvpromo=CHOCSCROLLSUP&dvproducts=D4893773-9B7C-42F2-A564-707A38770B37',
    before: '£5.99',
    now: '£3.49'
  });
}

/**
 * Transform array of products to object
 * @returns {{[key: number]: {id: number, name: string, imgUrl: string, url: string}}}
 */
const getUpsellPoductsObj = (products) =>
  products.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: curr,
    }),
    {}
  );

/**
 * All products as an object
 * @type {{[key: number]: {id: number, name: string, imgUrl: string, url: string}}}
 */
const upsellPoductsObj = getUpsellPoductsObj(upsellProducts);

/**
 * Check is mobile
 * @returns {boolean}
 */
export const isMobile = () => document.querySelector('#fancyBasketMobile');

/**
 * Check is desktop
 * @returns {boolean}
 */
export const isDesktop = () =>
  !!window.location.pathname.match(/basket-confirmation/) && !!document.querySelector('#ctl00_cphBody_divBasket');

/**
 * Get already added products from the basket (mobile)
 */
export const getBasketItemsMobile = () => {
  const itemsInBasket = [];

  for (const element of document.querySelectorAll(
    '#fancyBasketMobile .pic img'
  )) {
    const find = upsellProducts.find((upsellProduct) =>
      element.src.includes(upsellProduct.imgUrl)
    );
    if (find) itemsInBasket.push(find);
  }

  return itemsInBasket;
};

/**
 * Get already added products from the basket (desktop)
 */
export const getBasketItemsDesktop = () => {
  const itemsInBasket = [];

  for (const element of document.querySelectorAll('.intBasket .pic img')) {
    const find = upsellProducts.find((upsellProduct) =>
      element.src.includes(upsellProduct.imgUrl)
    );
    if (find) itemsInBasket.push(find);
  }

  return itemsInBasket;
};

export const getTotalAmountMobile = () => {
  const basketPrice = document
    .querySelector('#ctl00__objHeader_trBasketTotalMobile > td:nth-child(2)')
    ?.innerText?.split?.('£')?.[1];
  return basketPrice ? Number(basketPrice) : 0;
};

export const getTotalAmountDesktop = () => {
  const basketPrice = document
    .querySelector(
      '#ctl00_cphBody_divBasket > table > tbody > tr > td:nth-child(2) > strong'
    )
    ?.innerText?.split?.('£')?.[1];
  return basketPrice ? Number(basketPrice) : 0;
};

/**
 * Get available items to use. Function will filter the array
 * and remove all items that are already used.
 */
const getAvailableItems = () => {
  const itemsInTheBasket = isMobile()
    ? getBasketItemsMobile()
    : getBasketItemsDesktop();

  const excludedProducts =
    document.querySelector('#hdnUpsellData')?.value?.split(',') || [];

  let newUpsells = upsellProducts
    .filter(
      (upselProduct) =>
        !itemsInTheBasket.find(
          (itemInTheBasket) => itemInTheBasket.id === upselProduct.id
        )
    );
  if (excludedProducts.length > 0) {
    newUpsells.filter(
      (upselProduct) =>
        !excludedProducts.some(
          (excludedProd) => upselProduct.url.indexOf(excludedProd) > -1
        )
    );
  }


  return newUpsells;
};

/**
 * Get random items
 */
const getRandomItems = (isAbove20) => {
  const availableItems = isAbove20
    ? getAvailableItems()
    : getAvailableItems().filter(({ id }) => String(id) !== '5');


  const items = Object.keys(getUpsellPoductsObj(availableItems));

  // --- Prioritise Cookie Dough ice cream - id: 9
  if (items.indexOf('9') > -1) {
    const first = '9';
    items.sort(function (x, y) { return x == first ? -1 : y == first ? 1 : 0; });
  }

  let randomItem;
  if (items.indexOf('9') > -1) {
    randomItem = '9';
  } else {
    randomItem =
      isAbove20 && items.find((id) => String(id) === '5')
        ? '5'
        : items[Math.floor(Math.random() * items.length)];
  }


  const items2 = items.filter((item) => item !== randomItem);

  const randomItem2 = items2[Math.floor(Math.random() * items2.length)];

  return [upsellPoductsObj[randomItem], upsellPoductsObj[randomItem2]];
};

/**
 * Get upsell items for above 20 basket (should include pizza and 1 random item)
 */
const getUpsellItemsAbove20 = () => {
  const availableItems = getAvailableItems();

  const items = Object.keys(getUpsellPoductsObj(availableItems));

  const item1 = items.find((id) => String(id) === '5')
    ? '5'
    : items[Math.floor(Math.random() * items.length)];

  const items2 = items.filter((item) => item !== item1);

  const item2 = items2[Math.floor(Math.random() * items2.length)];



  return [upsellPoductsObj[item1], upsellPoductsObj[item2]];
};

/**
 * Only two upsells should show. Upsells should be picked randomly, saved for the exceptions below.
 * If the basket value is above £20 then the pizza should feature as one of the two upsell items.
 * If the basket contains a vegan product then the “vegan cheese choc tots” and the “b&k non-dairy Cookie Dough ice cream” need to feature in the upsells.
 * The two potato tot versions and the two icecreams (vegan & non vegan) should not show at the same time, if the vegan one needs to be showing, as per point 2, then then non-vegan should be removed.
 * If the user has one of the upsells (including a different portion size)  in the basket then they should not be shown that item.
 * If an upsell is added this item should then be added to the basket and affect the price.
 * If an upsell is added in V1 then this item should be replaced by another upsell which doesn’t feature in the basket already.
 * If an upsell is added in V2 then that item should then be frozen, the button change to say “added”,  and not be able to add again. No item will replace this item either.
 */
export const getUpsellItems = () => {
  if (isMobile()) {
    const basketAmount = getTotalAmountMobile();

    if (basketAmount === 0) {
      return [];
    }

    if (basketAmount <= 20) {
      return getRandomItems(basketAmount >= 20);
    }

    return getUpsellItemsAbove20();
  }

  if (isDesktop()) {

    const basketAmount = getTotalAmountDesktop();

    if (basketAmount === 0) {
      return [];
    }

    if (basketAmount <= 20) {
      return getRandomItems(basketAmount >= 20);
    }

    return getUpsellItemsAbove20();
  }

  return [];
};

const renderElementsMobile = () => {

  const upselItems = getUpsellItems().filter((upsell) => !!upsell);

  if (upselItems?.length === 0) {
    if (document.querySelector(`.${ID}-mobile-container`)) {
      document.querySelector(`.${ID}-mobile-container`).remove();
    }

    const rightCol = document.querySelector('#ctl00_cphBody_updDonation .rightColumn');
    if (rightCol) {
      rightCol.classList.add('xshow-donations');
    }

    return;
  } else {
    const rightCol = document.querySelector('#ctl00_cphBody_updDonation .rightColumn');
    if (rightCol) {
      rightCol.classList.remove('xshow-donations');
    }
  }

  if (!document.querySelector(`.${ID}-mobile-container`)) {
    document
      .querySelector('#ctl00_cphBody_pnlButtonsMobile')
      ?.insertAdjacentHTML(
        'beforebegin',
        `
      <div class="${ID}-mobile-container">
        <div class="${ID}-mobile-container__overlay ${ID}-hidden">${spinnerElement}</div>
        <p class="${ID}-mobile-container__title">ROOM FOR MORE?</p>
        <div class="${ID}-mobile-container__item-wrapper">
          ${upselItems.reduce(
          (acc, curr) =>
            acc +
            `
            <div class="${ID}-mobile-container__single-item">
              <img src="${curr.imgUrl}" class="${ID}-mobile-container__single-item__img"></img>
              <p class="${ID}-mobile-container__single-item__name">${curr.name}</p>
              <p class="${ID}-mobile-container__single-item__price">
                <span class="${ID}-mobile-container__single-item__price--now">${curr.now}</span>
                <span class="${ID}-mobile-container__single-item__price--before">${curr.before}</span>
              </p>
              <div data-url="${curr.url}" data-productname="${curr.name}" class="${ID}-mobile-container__single-item__button">Add</div>
            </div>
          `,
          ``
        )}
        </div>
      </div>
    `
      );

    document
      .querySelectorAll(`.${ID}-mobile-container__single-item__button`)
      .forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault;
          fireEvent(
            `${ID} - User added ${element.dataset.productname} to the basket.`
          );
          document
            .querySelector(`.${ID}-mobile-container__overlay`)
            .classList.remove(`${ID}-hidden`);
          window.location = element.dataset.url;
        });
      });
  }
};

const renderElementsDesktop = () => {

  const upselItems = getUpsellItems().filter((upsell) => !!upsell);
  const rightCol = document.querySelector('#ctl00_cphBody_updDonation .rightColumn');

  if (upselItems?.length === 0) {

    if (document.querySelector(`.${ID}-desktop-container`)) {
      document.querySelector(`.${ID}-desktop-container`).remove();
    }


    
    if (rightCol) {
      rightCol.classList.add('xshow-donations');
    }

    return;
  } else {
    
    if (rightCol) {
      rightCol.classList.remove('xshow-donations');
    }
  }

  if (!document.querySelector(`.${ID}-mobile-container`)) {
    document.querySelector('#ctl00_cphBody_divBasket')?.insertAdjacentHTML(
      'beforebegin',
      `
      <div class="${ID}-mobile-container">
       <div class="${ID}-mobile-container__overlay ${ID}-hidden">${spinnerElement}</div>
        <p class="${ID}-mobile-container__title">ROOM FOR MORE?</p>
        <div class="${ID}-mobile-container__item-wrapper">
          ${upselItems.reduce(
        (acc, curr) =>
          acc +
          `
            <div class="${ID}-mobile-container__single-item">
              <img src="${curr.imgUrl}" class="${ID}-mobile-container__single-item__img"></img>
              <p class="${ID}-mobile-container__single-item__name">${curr.name}</p>
              <p class="${ID}-mobile-container__single-item__price">
                <span class="${ID}-mobile-container__single-item__price--now">${curr.now}</span>
                <span class="${ID}-mobile-container__single-item__price--before">${curr.before}</span>
              </p>
              <div data-url="${curr.url}" data-productname="${curr.name}" class="${ID}-mobile-container__single-item__button">Add</div>
            </div>
          `,
        ``
      )}
        </div>
      </div>
    `
    );

    document
      .querySelectorAll(`.${ID}-mobile-container__single-item__button`)
      .forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault;
          fireEvent(
            `${ID} - User added ${element.dataset.productname} to the basket.`
          );
          document
            .querySelector(`.${ID}-mobile-container__overlay`)
            .classList.remove(`${ID}-hidden`);
          window.location = element.dataset.url;
        });
      });
  }

  if (!document.querySelector(`.${ID}-desktop-container`)) {
    document
      .querySelector('#ctl00_cphBody_pnlDonationsHolder')
      .insertAdjacentHTML(
        'afterend',
        `
      <div class="${ID}-desktop-container">
        <div class='${ID}-desktop-container__overlay ${ID}-hidden'>${spinnerElement}</div>
        <div class="${ID}-desktop-container__header">
          <p class="${ID}-desktop-container__title">ROOM FOR MORE?</p>
          <p class="${ID}-desktop-container__subtitle">Why not add one of these</p>
        </div>
        <div class="${ID}-desktop-container__item-wrapper">
          ${upselItems.reduce(
          (acc, curr) =>
            acc +
            `
            <div class="${ID}-desktop-container__single-item">
              <img src="${curr.imgUrl}" class="${ID}-desktop-container__single-item__img"></img>
              <p class="${ID}-desktop-container__single-item__name">${curr.name}</p>
              <p class="${ID}-desktop-container__single-item__price">
                <span class="${ID}-desktop-container__single-item__price--now">${curr.now}</span>
                <span class="${ID}-desktop-container__single-item__price--before">${curr.before}</span>
              </p>
              <div data-url="${curr.url}" data-productname="${curr.name}" class="${ID}-desktop-container__single-item__button">Add</div>
            </div>
          `,
          ``
        )}
        </div>
      </div>
    `
      );

    document
      .querySelectorAll(`.${ID}-desktop-container__single-item__button`)
      .forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault;
          fireEvent(
            `${ID} - User added ${element.dataset.productname} to the basket.`
          );
          document
            .querySelector(`.${ID}-desktop-container__overlay`)
            .classList.remove(`${ID}-hidden`);
          window.location = element.dataset.url;
        });
      });
  }
};

export const renderElements = () => {


  setInterval(() => {
    if (isMobile()) {
      const storage = localStorage.getItem(ID);
      const basketAmount = getTotalAmountMobile();
      if (Number(storage) !== Number(basketAmount))
        return localStorage.setItem(ID, basketAmount);

      // basketAmount <= 20 &&
      //   document.querySelectorAll('td.pizzaName').forEach((element) => {
      //     if (element.innerText.trim().includes('Medium pizza £5.99'))
      //       element?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.children?.[0]?.click?.();
      //   });

      basketAmount <= 20 &&
        document
          .querySelectorAll('.intBasket td .pizza-title-b')
          .forEach((element) => {
            if (element.innerText.trim().includes('Medium pizza £5.99'))
              element?.parentElement?.parentElement?.nextSibling?.nextSibling?.children?.[2].click?.();
          });

      renderElementsMobile();
    }

    if (isDesktop()) {
      const storage = localStorage.getItem(ID);
      const basketAmount = getTotalAmountDesktop();
      if (Number(storage) !== Number(basketAmount))
        return localStorage.setItem(ID, basketAmount);

      basketAmount <= 20 &&
        document.querySelectorAll('td.pizzaName').forEach((element) => {
          if (element.innerText.trim().includes('Medium pizza £5.99'))
            element?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.children?.[0]?.click?.();
        });

      renderElementsDesktop();
    }
  }, 500);
};
