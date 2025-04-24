/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/utils';
import settings from './shared';

const { ID, VARIATION } = settings;

const classes = {
  linkParent: 'af-card',
  link: 'a.af-place'
};

const getLink = (productLink) => {
  const productSlug = productLink.split("#/quick-view/")[1];
  const location = `/product/${productSlug}/#/`;
  return location;
};

const getItemElements = ($item) => {
  return {
    $link: $item.find(`${classes.link}`),
    linkHref: $item.find(`${classes.link}`).attr('href')
  };
};

const isInitialProductElement = ($item) => {
  const itemElements = getItemElements($item);
  if (itemElements.hasOwnProperty('linkHref') && itemElements.linkHref && itemElements.linkHref) {
    return (itemElements.linkHref.includes('quick-view'));
  }
  return false;
};

const isNewProductElement = ($item) => {
  const itemElements = getItemElements($item);
  if (itemElements.hasOwnProperty('linkHref') && itemElements.linkHref && itemElements.linkHref) {
    return (itemElements.linkHref.includes('product'));
  }
  return false;
};

export default () => {
  setup();

  // Update links (runs on requestAnimationFrame because of AJAX and React)
  const updateLinks = () => {
    // Get all items
    let $items = $(`.${classes.linkParent}`);
    // Get all product items
    let $productItems = $items.filter(function() {
      return isInitialProductElement($(this));
    });
    // Set variable of all items that do not have their links updated
    let $linksNotUpdated = $productItems.filter(function(index) {
      const itemElements = getItemElements($(this));
      const link = getLink(itemElements.linkHref);
      return itemElements.linkHref !== link;
    });

    // Loop through items and change the HREF
    $linksNotUpdated.each(function() {
      const itemElements = getItemElements($(this));
      const link = getLink(itemElements.linkHref);
      itemElements.$link.attr('href', link);
      // Add target blank on variant 2
      if (VARIATION == '2') {
        itemElements.$link.attr('target', '_blank');
      }
    });

    requestAnimationFrame(updateLinks);
  };

  requestAnimationFrame(updateLinks);
  
  const runIt = () => {
      // Add on click and redirect user (HREF will already have been changed by this point)
      $('body').on('click', `${classes.link}`, function(e) {
        const parent = $(this).closest(`.${classes.linkParent}`);
        if (isNewProductElement(parent)) {
          e.preventDefault();
          const itemElements = getItemElements(parent);
          // Open in new tab if is variant 2
          if (VARIATION == '2') {
            window.open(itemElements.$link.attr('href'));
          } else {
            window.location.href = itemElements.$link.attr('href');
          }
        }
      });

      // Add body class to hide popups.
      document.body.classList.add('AF-hidequickViews');
  }

  runIt();
};