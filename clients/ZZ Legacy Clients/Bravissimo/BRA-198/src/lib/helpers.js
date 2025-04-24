import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { renderNewNavigation } from './render-new-navigation';

const { ID, VARIATION } = shared;

/**
 * @returns { { products: string[], shouldRunTest?: boolean, conditionsMet?: boolean | null } }
 */
export const getLocalStorage = () => {
  if (window.localStorage.getItem(ID))
    return JSON.parse(window.localStorage.getItem(ID));

  window.localStorage.setItem(
    ID,
    JSON.stringify({
      products: [],
      conditionsMet: null,
    })
  );

  return JSON.parse(window.localStorage.getItem(ID));
};

/**
 * Check if URL contains /products/, if added to the LS and if test should run
 */
const onUrlChange = () => {
  if (window.location.pathname.match('/products/')) {
    const storage = getLocalStorage();

    // If URL does not exists in the localstorage -> add new one
    if (
      !storage.products.find((product) => product === window.location.pathname)
    ) {
      // Combine old with new one
      const newProductsUrls = [...storage.products, window.location.pathname];

      // Find if there is a product that is not a bra
      const findProductThatIsNotBra = newProductsUrls.find(
        (product) => !product.match(/bra/)
      );

      // Fire event that conditions met at this point
      if (storage.shouldRunTest === undefined && !findProductThatIsNotBra) {
        if (!storage.conditionsMet) {
          window.localStorage.setItem(
            ID,
            JSON.stringify({
              ...storage,
              conditionsMet: true,
            })
          );
          fireEvent('Conditions Met');
        }
      }

      // Update localstorage
      window.localStorage.setItem(
        ID,
        JSON.stringify({
          ...getLocalStorage(),
          products: newProductsUrls,
          shouldRunTest: !findProductThatIsNotBra,
        })
      );
    }
  }
};

/**
 * @param {ReturnType<getLocalStorage>} storage
 * @param {Element} originalNavigationElement
 */
const hideShowOldNavigation = (storage, originalNavigationElement) => {
  // When true and old element has no hidden class -> add
  if (
    storage.shouldRunTest === true &&
    !originalNavigationElement?.classList.contains(`${ID}-hidden`)
  )
    originalNavigationElement.classList.add(`${ID}-hidden`);

  // When false and old element has hidden class -> remove
  if (
    storage.shouldRunTest === false &&
    originalNavigationElement?.classList.contains(`${ID}-hidden`)
  )
    originalNavigationElement.classList.remove(`${ID}-hidden`);
};

/**
 * Left-align second section of the navbar to fit the design
 * @param {ReturnType<getLocalStorage>} storage
 */
const forceRestOfTheNavigationToLeftAlign = (storage) => {
  const elementsToAlign = document.querySelectorAll(
    '#navigation > div.c-drawer__main > nav:nth-child(2) > ul > li > a'
  );

  if (storage.shouldRunTest === true) {
    for (const element of elementsToAlign) {
      !element?.classList?.contains(`${ID}-force-left-align`) &&
        element.classList.add(`${ID}-force-left-align`);
    }
  }

  if (storage.shouldRunTest === false) {
    for (const element of elementsToAlign) {
      element?.classList?.contains(`${ID}-force-left-align`) &&
        element.classList.remove(`${ID}-force-left-align`);
    }
  }
};

const onOpenNewNav = () => {
  fireEvent(`Click Link - user opened changed navigation bar`);
};

const onCloseNewNav = () => {
  fireEvent(`Click Link - user opened changed navigation bar`);
};

/**
 * Add/remove event listener and fireEvent on the navigation elements
 * @param {ReturnType<getLocalStorage>} storage
 */
const listenOnTheNavigationElements = (storage) => {
  const hamburgerButton = document.querySelector(
    '#app > div > div > div.c-header > div > div.c-header__menu'
  );
  const xNavigationButton = document.querySelector(
    '#navigation > div.c-drawer__header > button'
  );

  if (storage.shouldRunTest === true) {
    // Add class and listener to the hamburger button
    if (!hamburgerButton.classList.contains(`${ID}-hamburger-button`)) {
      hamburgerButton.classList.add(`${ID}-hamburger-button`);

      document
        .querySelector(`.${ID}-hamburger-button`)
        .addEventListener('click', onOpenNewNav);
    }

    // Add class and listener to the navigation x button
    if (!xNavigationButton.classList.contains(`${ID}-navigation-x-button`)) {
      xNavigationButton.classList.add(`${ID}-navigation-x-button`);

      document
        .querySelector(`.${ID}-navigation-x-button`)
        .addEventListener('click', onCloseNewNav);
    }
  }

  if (storage.shouldRunTest === false) {
    if (document.querySelector(`.${ID}-hamburger-button`)) {
      document
        .querySelector(`.${ID}-hamburger-button`)
        .removeEventListener('click', onOpenNewNav);

      document
        .querySelector(`.${ID}-hamburger-button`)
        .classList.remove(`${ID}-hamburger-button`);
    }

    if (document.querySelector(`.${ID}-navigation-x-button`)) {
      document
        .querySelector(`.${ID}-navigation-x-button`)
        .removeEventListener('click', onCloseNewNav);

      document
        .querySelector(`.${ID}-navigation-x-button`)
        .classList.remove(`${ID}-navigation-x-button`);
    }
  }
};

const onNavigationRender = () => {
  const originalNavigationElement = document.querySelector(
    '#navigation > div.c-drawer__main > nav:nth-child(1) > ul'
  );

  setInterval(function () {
    const storage = getLocalStorage();

    hideShowOldNavigation(storage, originalNavigationElement);

    forceRestOfTheNavigationToLeftAlign(storage);

    listenOnTheNavigationElements(storage);

    // When true and no new elements -> add them to the DOM
    if (
      storage.shouldRunTest === true &&
      !document.querySelector(`.${ID}-new-nav-elements`)
    )
      renderNewNavigation(originalNavigationElement);

    // When false and new elements still exists in the DOM -> remove them
    if (
      storage.shouldRunTest === false &&
      document.querySelector(`.${ID}-new-nav-elements`)
    ) {
      document.querySelector(`.${ID}-new-nav-elements`).remove();
    }
  }, 1000);
};

export const init = () => {
  const storage = getLocalStorage();

  /**
   * The event 'did meet conditions' should only fire if
   * - (a) a user has viewed bra products
   * - (b) a user has only viewed bra products
   * This should fire on control and variation.
   */
  if (storage.shouldRunTest === true) {
    if (!storage.conditionsMet) {
      window.localStorage.setItem(
        ID,
        JSON.stringify({
          ...storage,
          conditionsMet: true,
        })
      );
      fireEvent('Conditions Met');
    }
  }

  if (VARIATION == 'control') return;

  onUrlChange();

  onNavigationRender();
};
