/**
 * WW005 - Reducing choice overload on PLP
 * @author User Conversion
 */

/* eslint-disable */
import '../vendor/jquery/plugins/style';
import settings from './settings';
import { setup } from './services';
import StickySidebar from '../vendor/stickySidebar';
import { throttle } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();
  const { ID } = settings;
  const isMobile = () => $(window).width() <= 450;
  const filtersOpenByDefault = true;
  const $filters = $('#filter_bar');
  const $filterLink = $('#filter_link');
  const $products = $('.brok_item');

  /**
   * Make desktop filters collapsable
   */
  $filters
    .find('.filter_list')
    .each(function () {
      const $tab = $(this).children('p');
      const $filterList = $tab.next('ul');

      const openFilter = () => {
        $filterList.style('display', 'block', 'important');
        $tab.addClass('active');
      };

      const closeFilter = () => {
        $filterList.slideUp(() => {
          $tab.removeClass('active');
          $filterList.style('display', '');
        });
      };

      $tab.on('click', () => {
        if (!isMobile()) {
          if ($tab.hasClass('active')) {
            closeFilter();
          } else {
            openFilter();
          }
        }
      });

      if (filtersOpenByDefault && !isMobile()) {
        openFilter();
      }
    });

  /**
   * Add markup
   */
  $filters
    .wrap(`<div class="${ID}_filters"><div class="${ID}_filters__inner"></div></div>`)
    .before(`<div class="${ID}_filter_heading">Filter Options</div><div class="${ID}_filter_close">Close <i>×</i></div>`);

  /**
   * Close button functionality
   */
  $(`.${ID}_filter_close`).on('click', () => {
    $filterLink.click();
  });

  $(function() {
    const $newFilters = $(`.${ID}_filters`);

    /**
     * Stick filters on scroll
     */
    const stickyFilters = {
      filtersStuck: false,
      reference: null,

      /** Stick filters */
      stick: () => {
        if (!stickyFilters.filtersStuck) {
          stickyFilters.reference = new StickySidebar(`.${ID}_filters`, {
            topSpacing: 10,
            bottomSpacing: 30,
            containerSelector: '#site_torso',
            innerWrapperSelector: `.${ID}_filters__inner`,
          });
          stickyFilters.filtersStuck = true;
        }
      },

      /** Unstick filters */
      unstick: () => {
        if (stickyFilters.reference && stickyFilters.reference.destroy) {
          stickyFilters.reference.destroy();
          stickyFilters.filtersStuck = false;
        }
      },

      init: () => {
        // On window resize, stick or unstick filters depending on device
        const resizeHandler = throttle(() => {
          if (!isMobile()) {
            if (!stickyFilters.filtersStuck) {
              stickyFilters.stick();
              $('html, body').removeClass(`${ID}--no-scroll`);
              $newFilters.add($filters).show();
            }
          } else {
            if (stickyFilters.filtersStuck) stickyFilters.unstick();
          }
        }, 500);

        // Bind event
        $(window).on('resize', resizeHandler);

        // Init
        if (!isMobile()) stickyFilters.stick();
      },
    };

    setTimeout(() => {
      stickyFilters.init();
    }, 2000);

    /**
     * Highlight filters when scrolling beyond 16th product
     */
    if ($products.length >= 16) {
      const waypoint = Math.round($products.eq(15).offset().top);

      // Throttled event hanler
      const scrollHandler = throttle(() => {
        const scroll = $(window).scrollTop();
        if (scroll >= waypoint && !$newFilters.hasClass(`${ID}_filters-highlight`)) {
          $newFilters.add($filterLink).addClass(`${ID}_filters-highlight`);
          $(window).off('scroll', scrollHandler);
        }
      }, 200);

      // Bind event
      $(window).on('scroll', scrollHandler);
    }

    /**
     * Mobile filters link functionality
     */
    let scrollDistance;
    $filterLink.on('click', (e) => {
      e.preventDefault();
      if (!$filterLink.hasClass(`${ID}--active`)) {
        scrollDistance = $(window).scrollTop();
        $('html, body').addClass(`${ID}_filters--active`);
        $newFilters.slideDown(() => {
          $filterLink.addClass(`${ID}--active`);
          $newFilters.addClass(`${ID}_filters--open`);
          $('html, body').addClass(`${ID}--no-scroll`);
        });
      } else {
        $newFilters.removeClass(`${ID}_filters--open`);
        $('html, body').removeClass(`${ID}--no-scroll`);
        if (scrollDistance) $('html, body').animate({ scrollTop: scrollDistance }, 0);
        $newFilters.slideUp(() => {
          $filterLink.removeClass(`${ID}--active`);
          $('html, body').removeClass(`${ID}_filters--active`);
        });
      }
    });
  });
};

export default activate;
