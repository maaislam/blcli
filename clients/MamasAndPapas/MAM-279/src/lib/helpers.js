import { fireEvent } from '../../../../../core-files/services';

/**
 * Localstorage item name to where we store our array of categories
 */
const localStorageItemName = 'MAM-279';

/**
 * Get already existing local storage or an empty array
 * @returns { {title: string, href: string}[] }
 */
const getLocalStorage = () =>
  localStorage.getItem(localStorageItemName)
    ? JSON.parse(localStorage.getItem(localStorageItemName))
    : [];

/**
 * Update local storage
 * @param { {title: string, href: string}[] } newLocalStorage
 * @returns {void}
 */
const updateLocalStorage = (newLocalStorage) =>
  localStorage.setItem(localStorageItemName, JSON.stringify(newLocalStorage));

/**
 * Checks if the page is category/collection
 * @returns {boolean}
 */
export const isCollectionPageUrl = () =>
  window.location.href.includes('/collections/');

/**
 * Checks if the page is homepage
 * @returns {boolean}
 */
export const isHomePageUrl = () => location.pathname === '/';

/**
 * Get collection/category title (top of the page)
 * @returns {string | udefined}
 */
const getCollectionTitle = () =>
  document
    .getElementById('bc-sf-filter-collection-header')
    ?.textContent?.trim();

/**
 * Function to handle collection page functionality.
 * @returns {void}
 */
export const handleCollectionPage = () => {
  const title = getCollectionTitle();
  const href = window.location.href;
  const storage = getLocalStorage();

  // If storage does not contain that href and title is available
  if (!storage.find((collection) => collection.href === href) && !!title) {
    // 2 the same titles -> use unique names
    const localTitle =
      href === 'https://www.mamasandpapas.com/collections/angelcare-baby-safety'
        ? 'Angelcare Baby Safety'
        : href ===
          'https://www.mamasandpapas.com/collections/angelcare-bathing-changing'
        ? 'Angelcare Bathing Changing'
        : title;

    const titleAlreadyExists = storage.find(
      (collection) => collection.title === localTitle
    );

    const hrefArr = href.split('/');
    const hrefTitle = hrefArr?.[hrefArr.length - 1]
      .split?.('-')
      .map?.((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join?.(' ');
    const titleToUse = !titleAlreadyExists ? localTitle : hrefTitle;

    let finalTitle = titleToUse;
    if(finalTitle.indexOf('?') > -1) {
      finalTitle = finalTitle.substring(0, finalTitle.indexOf('?'));
    }

    if (
      !finalTitle ||
      storage.find((collection) => collection.title === finalTitle)
    )
      return;

    /**
     * Push new collection as element [0] to the array.
     * If already 8 -> slice to the length of 7 so the last one is removed.
     */

    

    const newLocalStorage = [
      {
        title: finalTitle,
        href,
      },
      ...storage.slice(0, 7),
    ];

    updateLocalStorage(newLocalStorage);

    fireEvent('Localstorage links changes - added new one');
  }

  // If storage contains that one already, sort it to be first/newest
  if (storage.find((collection) => collection.href === href) && !!title) {
    updateLocalStorage(
      storage.sort((collection) => (collection.href === href ? -1 : 1))
    );

    fireEvent('Localstorage links changes - sorted');
  }
};

/**
 * Function to handle homepage functionality.
 * @returns {void}
 */
export const handleHomePage = (isControl = false) => {
  const storage = getLocalStorage();

  // If storage length is bigger than 3 -> display new elements
  if (storage.length > 3) {
    fireEvent('Homepage links changes - new elements');

    // Bail out - We fire an event for control users, but do not want to modify the UI
    if (isControl) return;

    
    const newButtonsHTML = storage.reduce(
      (acc, collection) =>
        acc +
        `<a href="${collection.href}" class="btn btn--secondary">${collection.title.indexOf('?') > -1 ? collection.title.substring(0, collection.title.indexOf('?')) : collection.title}</a>`,
      ''
    );

    // 2 targets expected = [mobile, desktop]
    const targetElements = document.getElementsByClassName(
      'csc-button-linkblock csc-full-width'
    );

    for (const target of targetElements) {
      // Remove existing elements
      while (target.firstChild) target.removeChild(target.firstChild);

      // Inject new elements
      target.insertAdjacentHTML('afterbegin', newButtonsHTML);
    }

    // Change h1 copy on the HP
    for (const spanElement of document.querySelectorAll('div > h1 > span')) {
      if (
        spanElement.textContent.includes(
          'Discover our pushchairs, baby clothing, nursery furniture and more...'
        )
      ) {
        spanElement.innerHTML = 'Your Recently Viewed';
        spanElement.classList.add('rv-header');
      }
    }
  }
};
