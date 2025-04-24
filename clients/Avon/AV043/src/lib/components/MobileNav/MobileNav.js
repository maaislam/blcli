import shared from '../../shared';
import navData from './NavData';
import { angularCompile } from '../../../../../../../lib/utils/avon';

export default class MobileNav {
  constructor() {
    const {
      ID,
      $,
      rootScope,
    } = shared;
    this.ID = ID;
    this.$ = $;
    this.rootScope = rootScope;
    this.headerScope = $('header').scope();
    this.componentName = `${ID}_MobileNav`;

    this.create = this.create.bind(this);
    this.resetNav = this.resetNav.bind(this);
    this.navIsOpen = this.navIsOpen.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.getSubNav = this.getSubNav.bind(this);
    this.openSubNav = this.openSubNav.bind(this);
    this.closeSubNav = this.closeSubNav.bind(this);
    this.getActiveSubNav = this.getActiveSubNav.bind(this);
    this.goBack = this.goBack.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.getHeaderBottomOffset = this.getHeaderBottomOffset.bind(this);
    this.render = this.render.bind(this);
    this.refresh = this.refresh.bind(this);

    this.create();
    this.bindEvents();
    this.render();

    // Run digest cycle to apply directives
    angularCompile(this.$component, $, rootScope);
    angularCompile(this.$overlay, $, this.headerScope);
  }

  /**
   * Create the component
   * @returns {jQuery}
   */
  create() {
    const { $, componentName } = this;

    // Will increment and decrement to keep track of the menu depth
    let navDepth = 0;

    /**
     * Recursively build sub navigations
     * @param {Array.<{
     *  title: string,
     *  url: string,
     *  children: Array
     * }>} navItems Array of any menu items for this level
     *  Must follow the same structure as the parent item (title, url and optional children)
     * @param {string} backButtonName This will be the text shown in the back button
     */
    const createLevelMarkup = (navItems, backButtonName) => {
      /* eslint-disable indent */
      navDepth += 1;
      const markup = `
        <div class="${componentName}_level ${componentName}_level${navDepth}">
          ${backButtonName ? `
            <div class="${componentName}_back">
              <svg-icon icon="angle-bracket-left"></svg-icon>
              ${backButtonName}
            </div>
          ` : ''}

          <ul>
            ${navItems.map((navItem) => {
              const {
                title,
                url,
                children,
                custom,
              } = navItem;

              return `
                <li class="${children ? `${componentName}_hasSubNav` : ''}">
                  ${custom || `
                    <a ${url ? `href="${url}"` : ''}>${title}</a>

                    ${children ? `
                      <svg-icon icon="angle-bracket-right"></svg-icon>
                      ${createLevelMarkup(children, navDepth === 1 ? 'Main Menu' : title)}
                    ` : ''}
                  `}
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      `;
      navDepth -= 1;
      return markup;
      /* eslint-enable indent */
    };

    const $component = $(`
      <div class="${componentName}">
        ${createLevelMarkup(navData)}
      </div>
    `);

    const $overlay = $(`<div class="${componentName}_overlay ng-scope ng-hide" ng-show="HeaderUI.HamburgerMenuOpen"></div>`);

    this.$component = $component;
    this.$overlay = $overlay;

    return $component;
  }

  /**
   * Remove all active classes from the nav and
   * reset to default state
   */
  resetNav() {
    const { componentName, $component } = this;

    /**
     * Remove all active classes from a sub nav
     * @param {HTMLElement|jQuery} subNav
     */
    const removeActiveClasses = (i, subNav) => {
      $(subNav)
        .removeClass(`${componentName}_level--open`)
        .removeClass(`${componentName}_noScroll`);
    };

    const $openSubNavs = $component.find(`.${componentName}_level--open`);
    $openSubNavs.each(removeActiveClasses);
  }

  /**
   * Returns true if nav is open
   * @returns {boolean}
   */
  navIsOpen() {
    const { componentName } = this;
    return $('body').hasClass(`${componentName}--navOpen`);
  }

  /**
   * Open the navigation
   * Do not call openNav and closeNav nav directly, opt to programatically
   * click the hamburger icon instead to ensure all Angular bindings are accurate
   */
  openNav() {
    const {
      $,
      componentName,
      $component,
      refresh,
      getActiveSubNav,
    } = this;

    // Scroll to top of page
    $('html, body').scrollTop(0);
    $component.stop(true, true);
    $component.addClass(`${componentName}--open`);
    $('body, html').addClass(`${componentName}--navOpen`);
    refresh();
    this.$activeNav = getActiveSubNav();
  }

  /**
   * Close the navigation
   * Do not call openNav and closeNav nav directly, opt to programatically
   * click the hamburger icon instead to ensure all Angular bindings are accurate
   * @param {boolean} noAnimate Set true to stop animation
   */
  closeNav(noAnimate) {
    const {
      componentName,
      $component,
      resetNav,
    } = this;

    const callback = () => {
      $component.css({ left: '', right: '' });
      $component.removeClass(`${componentName}--open`);
      $('body, html').removeClass(`${componentName}--navOpen`);
      resetNav();
    };

    if (!noAnimate) {
      $component.stop(true, true).animate({
        left: '-100%',
        right: '100%',
      }, 350, callback);
    } else {
      $component.stop(true, true);
      callback();
    }
  }

  /**
   * Toggle the navigation open state
   */
  toggleNav() {
    const { navIsOpen, closeNav, openNav } = this;

    if (navIsOpen()) {
      closeNav();
    } else {
      openNav();
    }
  }

  /**
   * Returns the subnav from a provided element
   * @param {HTMLElement} element
   * @returns {jQuery}
   */
  getSubNav(element) {
    const { $, componentName } = this;
    return $(element)
      .closest('li')
      .children(`.${componentName}_level`);
  }

  /**
   * Returns the currently open subnav
   * @returns {jQuery}
   */
  getActiveSubNav() {
    const { componentName, $component } = this;
    return $component.find(`.${componentName}_level--open:last`);
  }

  /**
   * Open a provided subnav
   * @param {HTMLElement} subNav
   */
  openSubNav(subNav) {
    const { $, componentName, $activeNav } = this;
    const $subNav = $(subNav);

    $subNav
      .addClass(`${componentName}_level--open`)
      .parent()
      .closest(`.${componentName}_level--open`)
      .addClass(`${componentName}_noScroll`);
    // Scroll current nav to top after animation to prevent positioning issues
    $activeNav.animate({
      scrollTop: 0,
    }, 200);

    this.$activeNav = $subNav;
  }

  /**
   * Close a provided subnav
   * @param {HTMLElement} subNav
   */
  closeSubNav(subNav) {
    const { $, componentName, getActiveSubNav } = this;
    const $subNav = $(subNav);

    $subNav.animate({
      left: '100%',
      right: '-100%',
    }, 350, () => {
      $subNav
        .removeClass(`${componentName}_level--open`)
        .css({ left: '', right: '' })
        .closest(`.${componentName}_level--open`)
        .removeClass(`${componentName}_noScroll`);

      this.$activeNav = getActiveSubNav();
    });
  }

  /**
   * Go back a level in the navigiation
   */
  goBack() {
    const { closeSubNav, $activeNav } = this;
    closeSubNav($activeNav);
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const {
      $,
      componentName,
      $component,
      $overlay,
      toggleNav,
      closeNav,
      getSubNav,
      openSubNav,
      goBack,
    } = this;

    /**
     * Open the subnav if there is one, otherwise perform
     * default link behaviour
     * @param {Object} event
     */
    const linkClickHandler = (event) => {
      event.stopPropagation();
      const $subNav = getSubNav(event.target);
      const $li = $(event.target).closest('li');

      if ($subNav.length) {
        event.preventDefault();
        openSubNav($subNav);
      } else if (event.target.nodeName !== 'A') {
        // Redirect to link href
        const link = $li.children('a');
        const url = link.attr('href');
        if (url) {
          window.location.href = url;
        }
      }
    };

    // Bind Events
    $('#Hamburger').on('click', toggleNav);

    const $links = $component.find(`.${componentName}_level > ul > li`);
    $links.on('click', linkClickHandler);

    const $backLinks = $component.find(`.${componentName}_back`);
    $backLinks.on('click', (event) => {
      event.stopPropagation();
      setTimeout(() => {
        goBack();
      }, 50);
    });

    $overlay.on('click', () => {
      $('#Hamburger').click();
    });

    // Close nav if login or basket buttons are clicked
    const $headerButtons = $('#SignIn, #Basket');
    $headerButtons.on('click touchend', () => {
      closeNav(true);
    });
  }

  /**
   * Get the position of the bottom of the header
   * @returns {number}
   */
  getHeaderBottomOffset() {
    const { $ } = this;
    // const $header = $('header');
    const $header = $('#LogoBar');
    return $header.offset().top + $header.outerHeight();
  }

  /**
   * Render component
   */
  render() {
    const { $component, $overlay } = this;
    $('body').append($component, $overlay);
  }

  /**
   * Recalculate positioning of navigation
   */
  refresh() {
    const {
      $component,
      $overlay,
      getHeaderBottomOffset,
      getActiveSubNav,
    } = this;

    const offset = `${getHeaderBottomOffset()}px`;

    // Set position from top to under the header
    $component.css('top', offset);
    $overlay.css('marginTop', offset);
    this.$activeNav = getActiveSubNav();
  }
}
