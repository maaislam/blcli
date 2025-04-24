/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, getPageName, setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { throttle } from '../../../../../lib/uc-lib';

export default () => {
  const { ID, VARIATION } = shared;
  const $window = $(window);

  const updateMenu = () => {
    if ($(`.${ID}_menuItem`).length > 0) return;
    const $menu = $('#site-navigation');

    // $menu.find(".first-level").append(`
    //   <li class="first-level-listing ${ID}_menuItem">
    //     <a href="/pages/store">Find My Rep <svg class="icon icon-chevron-right" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20339 10L0 8.74558L3.60169 5L0 1.25442L1.20339 0L6 5L1.20339 10Z"></path></svg></a>
    //   </li>
    // `);

    // $menu.find(".second-level-listing a[href*='/pages/store']").text('Find My Rep');

    //$(".footer-links-listing a[href*='/pages/store']").text('Find My Rep');
  };

  const makeHref = () => {
    const firstName = $(`.${ID}_first_name`).val().trim();
    const lastName = $(`.${ID}_last_name`).val().trim();
    return `https://shopwithmyrep.co.uk/representative/?first_name=${firstName}&last_name=${lastName}`;
  };

  const updateFindRepPage = () => {
    if ($(`.${ID}_banner`).length > 0) return;

    $('#shopify-section-page-store h1').text('Find My Rep');

    $('.page-header').after(`
      <div class="${ID}_banner">
        <p>Your Rep’s Online Avon Store Has Moved!</p>
      </div>
    `);

    $('.content_image').first().find('.content').html(`
      <div class="${ID}_content">
        <h3>Let’s help you find your rep...</h3>
        <p>What is your rep’s name?</p>

        <div>
          <input class="${ID}_first_name" type="text" name="first_name" placeholder="First name..." />
          <input class="${ID}_last_name" type="text" name="last_name" placeholder="Last name..." />
        </div>

        <div class="${ID}_js-cta">
          <p>
            Thanks! To get to <strong><span class="${ID}_js-name"></span>’s store</strong>, just follow the link below and then click “Shop with me” under the name of your rep.
          </p>

          <a target="_blank" class="${ID}_js-link" href="https://shopwithmyrep.co.uk/representative/?first_name=&last_name=">
            Go to <span class="${ID}_js-name"></span>'s store
          </a>
        </div>
        <span class="${ID}_no-rep-button">I don’t have a rep</span>
      </div>
    `);

    $('.content_image').last().html(`
      <div class="${ID}_no-rep-overlay">
      </div>
      <div class="${ID}_no-rep">
        <div class="${ID}_no-rep-close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="black" stroke-width="2"/>
          <path d="M13 13L7 7L13 1" stroke="black" stroke-width="2"/>
          </svg>
        </div>
        <h3>Don’t have a Rep yet? </h3>
        <p>No problem, you don’t need a rep to shop with Avon but we’ve got thousands of amazing Reps just waiting to help.</p>
        <p>If you would like to shop with a rep, simply click on the link below, type in your postcode and check out the Reps that are nearest to you!</p>
        <a target="_blank" style="color: #6F2682;" href="https://shopwithmyrep.co.uk/representative/">Find a rep</a> or <a href="/">continue on this site</a>
      </div>
    `);

    // Form
    $(`.${ID}_first_name`).on('input paste', function (e) {
      const firstName = $(this).val().trim();

      if (firstName.length > 1) {
        $(`.${ID}_js-name`).html(firstName);
        $(`.${ID}_js-cta`).show();
        $(`.${ID}_js-link`).attr('href', makeHref());
      } else {
        $(`.${ID}_js-cta`).hide();
      }
    });
    $(`.${ID}_last_name`).on('input paste', function (e) {
      $(`.${ID}_js-link`).attr('href', makeHref());
    });

    // No rep
    $(`.${ID}_no-rep-button`).click(function (e) {
      $(`.${ID}_no-rep`).show();
      $(`.${ID}_no-rep-overlay`).addClass(`${ID}_no-rep-overlay-active`);
    });
    $(`.${ID}_no-rep-close`).click(function (e) {
      $(`.${ID}_no-rep`).hide();
      $(`.${ID}_no-rep-overlay`).removeClass(`${ID}_no-rep-overlay-active`);
    });
    $(`.${ID}_no-rep-overlay`).click(() => {
      $(`.${ID}_no-rep`).hide();
      $(`.${ID}_no-rep-overlay`).removeClass(`${ID}_no-rep-overlay-active`);
    });

    // Tracking
    $(`.${ID}_js-link`).click(() => {
      localStorage.setItem(`${ID}_masClicked`, true);
      fireEvent('Click - MAS');
    });
  };

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    updateMenu();

    if (window.location.href.indexOf('/pages/store') !== -1) {
      updateFindRepPage();
    }
  };

  init();
};
