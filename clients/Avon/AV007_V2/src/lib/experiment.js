/**
 * AV007 - Prioritised categories on PLP
 * @author User Conversion
 */
import { setup } from './services';
import CategoryBar from './components/CategoryBar/CategoryBar';
import settings from './settings';
import { throttle } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();
  const { ID } = settings;
  const rootScope = window.AppModule.RootScope;
  const $ = window.angular.element;

  // Category bar component
  const categoryBar = new CategoryBar();

  /** Make header sticky on scroll */
  const stickyHeader = () => {
    let isSticky = false;
    const $body = $('body');
    const $header = $('header');
    const $nav = $('#HamburgerMenuNew');

    // Create sticky container
    const $container = $(`<div class="${ID}_stickyContainer"></div>`);
    $header.prepend($container);

    // All elements to be included in the sticky container
    const stickyElements = [
      'nav#LogoBar',
      `.${ID}_CategoryBar`,
    ];

    /** Make header sticky */
    const attachSticky = () => {
      isSticky = true;

      // Move all sticky elements to sticky container and leave
      // behind a reference element so we can place it back in
      // the original position if needed
      // eslint-disable-next-line
      $(stickyElements).each(function(i) {
        const $el = $header.find(this);

        // Create reference tag
        $el.before(`<div data-position-reference="${i}"></div>`);

        // Move element
        $container.append($el);
      });

      // Add a placeholder div to occupy the same height as the elements
      // This will prevent the page from "jumping" as the document height
      // will remain the same
      $container.before(`<div id="${ID}_stickyPlaceholder" style="height:${$container.height()}px;"></div>`);

      // Add sticky classes
      $body.addClass(`${ID}_headerStuck`);
      $container.addClass(`${ID}_stickyContainer--stuck`);

      // Change nav styling to account for header height and screen height
      const headerHeight = $container.height();
      const screenHeight = $(window).height();
      $nav.css({
        top: `${headerHeight}px`,
        maxHeight: `${screenHeight - headerHeight}px`,
      });
    };

    /** Remove sticky header */
    const detachSticky = () => {
      isSticky = false;

      // Remove sticky classes
      $body.removeClass(`${ID}_headerStuck`);
      $container.removeClass(`${ID}_stickyContainer--stuck`);

      // Move any elements in sticky container back to their original positions
      // eslint-disable-next-line
      $(stickyElements).each(function(i) {
        const $el = $header.find(this);

        // Find position reference tag
        const $reference = $(`[data-position-reference="${i}"]`);

        // Move element back
        $reference.after($el);

        // Remove position reference
        $reference.remove();
      });

      // Remove nav styling
      $nav.removeAttr('style');

      // Remove placeholder element
      $(`#${ID}_stickyPlaceholder`).remove();
    };

    /** Evaluate whether the header should be sticky or not */
    const evaluateSticky = () => {
      const waypoint = $header.offset().top;
      const scrollTop = $(document).scrollTop();

      if (scrollTop >= waypoint) {
        // Stick header
        if (!isSticky) {
          attachSticky();
        }
      } else {
        if (isSticky) {
          detachSticky();
        }
      }
    };

    // Scroll event handler
    $(window).on('scroll', throttle(evaluateSticky, 100));

    rootScope.$on('App_WindowSizeChanged', () => {
      // On layout change, re-evaulate sticky state to calculate correct nav dimensions
      detachSticky();
      evaluateSticky();
    });
  };

  stickyHeader();
};

export default activate;
