import settings from '../settings';

export default () => {
  const id = settings.ID;

  const overlay = document.querySelector('.TG058-overlay');
  const businessNav = document.querySelector(`.${id}-topnav_link`);
  const businessDropdown = document.querySelector(`.${id}-level1`);
  const otherLinks = document.querySelectorAll('.TG058-topnav_link');
  const otherDropdowns = document.querySelectorAll('.TG058-level1');

  // show the nav, remove others
  const showBusinessNav = () => {
    businessNav.classList.add(`${id}-link_active`);
    businessDropdown.classList.add(`${id}-nav_active`);
    overlay.classList.add('TG058-overlay_active');
    // remove active from other nav elements
    for (let index = 0; index < otherLinks.length; index += 1) {
      const element = otherLinks[index];
      element.classList.remove('TG058-link_active');
    }
    for (let index = 0; index < otherDropdowns.length; index += 1) {
      const element = otherDropdowns[index];
      element.classList.remove('TG058-nav_active');
    }
  };
  const hideBusinessNav = () => {
    businessNav.classList.remove(`${id}-link_active`);
    businessDropdown.classList.remove(`${id}-nav_active`);
    overlay.classList.remove('TG058-overlay_active');
  };

  // run nav show on mouseenter
  businessNav.addEventListener('mouseenter', () => {
    showBusinessNav();
  });
  businessNav.addEventListener('mouseleave', () => {
    hideBusinessNav();
  });


  // show the inner categories on hover of the main categories
  const mainCats = document.querySelectorAll(`.${id}-business_category`);

  for (let i = 0; i < mainCats.length; i += 1) {
    // on hover of nav
    mainCats[i].addEventListener('mouseenter', (e) => {
      for (let j = 0; j < mainCats.length; j += 1) {
        mainCats[j].classList.remove(`${id}-main-cat_active`);
      }
      e.currentTarget.classList.add(`${id}-main-cat_active`);

      // loop through the inner categories
      // remove the active class
      [].forEach.call(document.querySelectorAll(`.${id}-business_level2`), (item) => {
        item.classList.remove(`${id}-content_active`);
      });

      const matchingContent = e.currentTarget.getAttribute('cat-target');
      document.querySelector(`.${matchingContent}`).classList.add(`${id}-content_active`);
    });

    // fix so that it doesnt get removed on the inner category
    mainCats[i].addEventListener('mouseleave', () => {
      for (let j = 0; j < mainCats.length; j += 1) {
        mainCats[j].classList.remove(`${id}-main-cat_active`);
      }
      [].forEach.call(document.querySelectorAll(`${id}-business_level2`), (item) => {
        item.classList.remove(`${id}-content_active`);
      });
    });
  }

  const innerCats = document.querySelectorAll(`.${id}-business_level2`);
  for (let index = 0; index < innerCats.length; index += 1) {
    const element = innerCats[index];
    element.addEventListener('mouseenter', (e) => {
      const elementClass = e.currentTarget.classList[1];
      const matchingParent = document.querySelector(`[cat-target="${elementClass}"]`);
      matchingParent.classList.add(`${id}-main-cat_active`);
    });
  }

  // on mouse leave of the business nav
  const businessNavWrapper = document.querySelector(`.${id}-business`);
  businessNavWrapper.addEventListener('mouseleave', () => {
    businessNavWrapper.classList.remove(`${id}-nav_active`);
    const businessLink = document.querySelector(`.${id}-link_active`);
    const level2Active = document.querySelector(`.${id}-content_active`);
    const activeCategory = document.querySelector(`.${id}-main-cat_active`);
    if (level2Active) {
      level2Active.classList.remove(`${id}-content_active`);
    }
    if (businessLink) {
      businessLink.classList.remove(`${id}-link_active`);
    }
    if (activeCategory) {
      activeCategory.classList.remove(`${id}-main-cat_active`);
    }
  });
};
