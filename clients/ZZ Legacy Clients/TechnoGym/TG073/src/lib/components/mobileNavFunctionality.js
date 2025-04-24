import settings from '../settings';


export default () => {
  const showHideInnerNav = () => {
    const otherNavLinks = document.querySelectorAll('.TG058-level1_link');
    const navLink = document.querySelector(`.${settings.ID}-collapsable .${settings.ID}-level1_link`);
    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // remove active from the other nav links
      for (let j = 0; j < otherNavLinks.length; j += 1) {
        otherNavLinks[j].classList.remove('TG058-level1link_active');
      }

      if (e.currentTarget.classList.contains(`${settings.ID}-level1link_active`)) {
        e.currentTarget.classList.remove(`${settings.ID}-level1link_active`);
      } else {
        e.currentTarget.classList.add(`${settings.ID}-level1link_active`);

        // const level1Name = e.currentTarget.textContent;
      }

      if (document.querySelector(`.${settings.ID}-level2link_active`)) {
        document.querySelector(`.${settings.ID}-level2link_active`).classList.remove(`${settings.ID}-level2link_active`);
        document.querySelector(`.${settings.ID}-level3.${settings.ID}-level3link_active`).classList.remove(`${settings.ID}-level3link_active`);
      }

      const level2Categories = e.currentTarget.parentNode.querySelector(`.${settings.ID}_mobile_Navigation-level2`);
      // click the level 3 section
      [].forEach.call(document.querySelectorAll('.TG058_mobile_Navigation-level2'), (item) => {
        item.classList.remove('TG058-level2Head_active');
      });

      if (level2Categories) {
        if (level2Categories.classList.contains(`${settings.ID}-level2Head_active`)) {
          e.currentTarget.parentNode.querySelector(`.${settings.ID}_mobile_Navigation-level2`).classList.remove(`${settings.ID}-level2Head_active`);
        } else {
          level2Categories.classList.add(`${settings.ID}-level2Head_active`);
        }
      }
    });

    // show the third level
    const secondLevelLinks = document.querySelectorAll(`.${settings.ID}_level2 h3`);
    for (let i = 0; i < secondLevelLinks.length; i += 1) {
      secondLevelLinks[i].addEventListener('click', (e) => {
        e.stopPropagation();
        // click the h3
        for (let j = 0; j < secondLevelLinks.length; j += 1) {
          if (secondLevelLinks[j] !== e.currentTarget) {
            secondLevelLinks[j].classList.remove(`${settings.ID}-level2link_active`);
          }
        }
        if (e.currentTarget.classList.contains(`${settings.ID}-level2link_active`)) {
          e.currentTarget.classList.remove(`${settings.ID}-level2link_active`);
        } else {
          e.currentTarget.classList.add(`${settings.ID}-level2link_active`);
        }

        const level3Items = e.currentTarget.parentNode.querySelector(`.${settings.ID}-level3`);

        // click the level 3 section
        [].forEach.call(document.querySelectorAll(`.${settings.ID}-level3`), (item) => {
          if (item !== level3Items) {
            item.classList.remove(`${settings.ID}-level3link_active`);
          }
        });

        if (level3Items.classList.contains(`${settings.ID}-level3link_active`)) {
          level3Items.classList.remove(`${settings.ID}-level3link_active`);
        } else {
          level3Items.classList.add(`${settings.ID}-level3link_active`);
        }
      });
    }

    // if any of the other nav links are clicked, remove all active classes from the mobile nav
    for (let index = 0; index < otherNavLinks.length; index += 1) {
      const element = otherNavLinks[index];
      element.addEventListener('click', () => {
        if (navLink.classList.contains(`${settings.ID}-level1link_active`)) {
          navLink.classList.remove(`${settings.ID}-level1link_active`);
        }
        // remove level 2 active
        if (document.querySelector(`.${settings.ID}-level2Head_active`)) {
          document.querySelector(`.${settings.ID}-level2Head_active`).classList.remove(`${settings.ID}-level2Head_active`);
        }
        // remove level 3 active
        if (document.querySelector(`.${settings.ID}-level2link_active`)) {
          document.querySelector(`.${settings.ID}-level2link_active`).classList.remove(`${settings.ID}-level2link_active`);
        }
        // remove level 3 active
        if (document.querySelector(`.${settings.ID}-level3link_active`)) {
          document.querySelector(`.${settings.ID}-level3link_active`).classList.remove(`${settings.ID}-level3link_active`);
        }
      });
    }
  };
  showHideInnerNav();
};
