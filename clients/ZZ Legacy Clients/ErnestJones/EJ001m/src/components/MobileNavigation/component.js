import navigationData from './data';
import { events } from '../../../../../../lib/utils';
import { cacheDom } from '../../../../../../lib/cache-dom';
import settings from '../../settings';

const { ID, VARIATION } = settings;

export default () => {
  /**
   * create
   * @returns {HTMLElement} Returns component
   */
  function create() {
    const component = document.createElement('div');
    component.classList.add(`${ID}_MobileNavigation`);

    /**
     * buildMarkup
     * Builds navigation markup with subnavigations by recrusively calling
     * buildLevel. Data param should be an array of objects for each top level
     * link, with a 'sub' property for child levels
     * example:
      {
        "name": "Link name",
        "link": "javascript:void(0)",
        "sub": [{ "name": "Link name", "link": "http://externallink" }],
      }
    * @param {Array.<{name:string, link:string, sub:array}>} data
    */
    function buildMarkup(data) {
      /**
       * Increment and decrement as necessary to keep track of the menu depth
       * Will determine the class that is added to the element
       */
      let level = 1;

      /**
       * buildLevel
       * Generates markup for a level
       * @param {Array.<{name:string, link:string, sub:array}>} levelData
       * @param {String} parentName Name of the parent link (optional)
       */
      const buildLevel = (levelData, parentName) => {
        let html = `<div class="${ID}_MobileNavigation__lContainer ${ID}_MobileNavigation__l${level}Container">`;
        html += `<ul class="${ID}_MobileNavigation__l ${ID}_MobileNavigation_l${level}">`;
        if (parentName) html += `<li class="${ID}_MobileNavigation__link--title"><a href="javascript:void(0)">${parentName}</a></li>`;

        for (let i = 0; i < levelData.length; i += 1) {
          if (typeof (levelData[i].sub) === 'object') {
            html += `<li class="${ID}_MobileNavigation__link--hasSubmenu">`;
            html += `<a href="${levelData[i].url}">${levelData[i].name}</a>`;
            /**
             * Increment the level number
             */
            level += 1;

            // Build next level markup
            html += buildLevel(levelData[i].sub, levelData[i].name);

            // Back to previous level - decrement level number
            level -= 1;
          } else {
            html += '<li>';
            html += `<a href="${levelData[i].url}">${levelData[i].name}</a>`;
          }
          html += '</li>';
        }

        html += '</ul>';
        html += '</div>';
        return html;
      };

      return buildLevel(data);
    }

    component.innerHTML = buildMarkup(navigationData);

    // Add nav actions to level 1
    const nav = cacheDom.get('.siteNavigation');
    const actions = nav.querySelectorAll('.topLevel > .hideOnDesktop.level-1');
    const l1 = component.querySelector(`.${ID}_MobileNavigation_l1`);
    for (let i = 0; i < actions.length; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = actions[i].innerHTML;
      l1.appendChild(li);
    }


    // Set level 1 as active by default
    const l1Container = component.querySelector(`.${ID}_MobileNavigation__l1Container`);
    l1Container.classList.add(`${ID}_MobileNavigation__lContainer--active`);

    return component;
  }

  /** Create component */
  const component = create();

  /**
   * bindEvents
   * @returns {HTMLElement} Returns component
   */
  function bindEvents() {
    /**
     * closeAllSubmenus
     * @desc Closes all active submenus
     */
    function closeAllSubmenus() {
      const active = component.querySelectorAll(`.${ID}_MobileNavigation__link--active`);
      for (let i = 0; i < active.length; i += 1) {
        active[i].classList.remove(`${ID}_MobileNavigation__link--active`);
        active[i].querySelector(`.${ID}_MobileNavigation__lContainer--active`).classList.remove(`${ID}_MobileNavigation__lContainer--active`);
      }
    }

    /**
     * openSubmenu
     * @desc Open a specicific submenu by passing the element
     * @param {HTMLElement} element .EJ001m_MobileNavigation__lContainer element
     */
    function openSubmenu(element) {
      element.parentElement.classList.add(`${ID}_MobileNavigation__link--active`);
      element.classList.add(`${ID}_MobileNavigation__lContainer--active`);
    }

    /**
     * open
     * @desc Opens navigation
     */
    function open() {
      events.send(ID, 'Open', `Opened navigation - Variation ${VARIATION}`);
      component.classList.add(`${ID}_MobileNavigation--open`);
      document.body.classList.add(`${ID}_MobileNavigationOpened`);
      const scrollDepth = (() => {
        let val;
        if (document.body.scrollTop > 0) {
          console.log('is android or ios simulator');
          val = document.body.scrollTop;
        } else if (document.documentElement.scrollTop > 0) {
          console.log('is ios device');
          val = document.documentElement.scrollTop;
        } else {
          val = 0;
        }
        return val;
      })();
      document.body.style.top = `-${scrollDepth}px`;
      document.documentElement.style.top = `-${scrollDepth}px`;
      document.body.style.position = 'fixed';
      document.documentElement.style.position = 'fixed';
    }

    /**
     * close
     * @desc Closes navigation
     */
    function close() {
      events.send(ID, 'Close', `Closed navigation - Variation ${VARIATION}`);
      const animationLength = 300;
      component.classList.remove(`${ID}_MobileNavigation--open`);
      component.classList.add(`${ID}_MobileNavigation--closed`);
      document.body.classList.remove(`${ID}_MobileNavigationOpened`);
      const scrollDepth = document.body.style.top.match(/\d+/)[0];
      document.body.style.top = '';
      document.documentElement.style.top = '';
      document.body.style.position = '';
      document.documentElement.style.position = '';
      document.body.scrollTop = scrollDepth;
      document.documentElement.scrollTop = scrollDepth;

      setTimeout(() => {
        component.classList.remove(`${ID}_MobileNavigation--closed`);
        closeAllSubmenus();
      }, animationLength);
    }

    /**
     * closeSubmenu
     * @desc Close a specicific submenu by passing the element
     * @param {HTMLElement} element .EJ001m_MobileNavigation__lContainer element
     */
    function closeSubmenu(element) {
      element.parentElement.classList.remove(`${ID}_MobileNavigation__link--active`);
      element.classList.remove(`${ID}_MobileNavigation__lContainer--active`);
    }

    // Send event clicks on nav links
    component.addEventListener('click', (e) => {
      let node = e.target;
      let clickedLink = null;

      while (node !== component) {
        if (node && node.nodeName && node.nodeName === 'A') {
          clickedLink = node;
          break;
        }
        if (node.parentNode) {
          node = node.parentNode;
        } else {
          break;
        }
      }

      if (!node) {
        return false;
      }

      const isSubmenu = node.parentElement.classList.contains(`${ID}_MobileNavigation__link--hasSubmenu`);
      const isTitle = node.parentElement.classList.contains(`${ID}_MobileNavigation__link--title`);

      if (clickedLink) {
        if (isSubmenu) {
          // Open submenu
          events.send(ID, 'Clicked Navigation', `Clicked Navigation Submenu ${clickedLink.innerText} - Variation ${VARIATION}`);
          const submenu = [].filter.call(clickedLink.parentElement.children, el => el.classList.contains('EJ001m_MobileNavigation__lContainer'))[0];
          openSubmenu(submenu);
        } else if (isTitle) {
          // Close submenu
          events.send(ID, 'Clicked Navigation', `Clicked Navigation Submenu ${clickedLink.innerText} - Variation ${VARIATION}`);
          let submenu = clickedLink;
          while (!submenu.classList.contains(`${ID}_MobileNavigation__lContainer`)) {
            if (submenu === component) {
              break;
            } else {
              submenu = submenu.parentElement;
            }
          }
          closeSubmenu(submenu);
        } else if (!isTitle) {
          events.send(ID, 'Clicked Navigation', `Clicked Navigation ${clickedLink.innerText} - Variation ${VARIATION}`);
        }
      }
    });

    // Return API to manually trigger events
    return {
      open,
      close,
      closeAllSubmenus,
    };
  }

  /**
   * render
   * @desc Renders component on page
   */
  function render() {
    // Hide original mobile nav
    cacheDom.get('.siteNavigation').style.display = 'none';
    document.body.appendChild(component);
  }

  const controls = bindEvents();

  return {
    component,
    render,
    controls,
  };
};
