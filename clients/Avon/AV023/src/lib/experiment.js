/* eslint-disable no-new */
/**
 * AV023 - Foundation Specific PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, translate } from './services';
import shared from './shared';
import PDPCtas from './components/PDPCtas/PDPCtas';
import { pollerLite } from '../../../../../lib/utils';
import { getTemplate, replaceTemplate, angularCompile, getProductSkuPDP, getLayoutName } from '../../../../../lib/utils/avon';

export default () => {
  setup();
  const { ID, rootScope } = shared;

  /**
   * Modify an Angular template
   * @param {String} templateName
   * @param {String} elementToCompile CSS selector of the directive root element
   * @param {Function} makeChanges A function where the first argument is a jQLite object
   * of the template. Changes on this object will apply to the template in the app
   * @param {Function} cb Callback function to run after the template changes have been made.
   * Root scope is passed as the first argument which allows you to add functions to the scope and
   * use them in the template
   */
  const modifyTemplate = (templateName, elementToCompile, makeChanges, cb) => {
    const template = getTemplate(templateName);
    const $template = $('<div>').html(template);
    makeChanges($template).then(() => {
      replaceTemplate(templateName, $template.html(), () => {
        // Re-compile directive
        const $elementToCompile = $(elementToCompile);
        angularCompile($elementToCompile, $, $elementToCompile.scope(), cb);
      });
    });
  };

  /** Make changes to the shade selector template */
  const shadeSelectorChanges = () => {
    // Change markup of shade selector
    modifyTemplate(
      'shadeSelector.html',
      'pdp-shade-selector',
      ($template) =>
        new Promise((resolve) => {
          $template.find('[ng-repeat="variant in availableShadeVariants"]').replaceWith(`
            <div class="Selector ${ID}_shade" ng-repeat="variant in availableShadeVariants" ng-class="{ 'Selected': selectedShadeVariant == variant, '${ID}_Variants--hover': variant.Hover}">
              <div class="${ID}_shadeWrap" ng-click="selectShade(variant);">
                <div class="${ID}_shadeColour" ng-mouseenter="variant.Hover = true" ng-mouseleave="variant.Hover = false" ng-if="!showShadeColorHexSwatches" ng-style="{ 'background-image': 'url(' + variant.Image + ')'}"></div>
                <div class="${ID}_shadeColour" ng-mouseenter="variant.Hover = true" ng-mouseleave="variant.Hover = false" ng-if="showShadeColorHexSwatches" ng-style="{'background-color': variant.ColorHex}"></div>
                <div class="${ID}_shadeName" ng-bind="variant.Name"></div>
              </div>
              <div class="${ID}_VariantHover">
                <div class="Border">
                  <div class="${ID}_VariantHoverImage Cropper" ng-if="!showShadeColorHexSwatches" ng-style="{ 'background-image': 'url(' + variant.Image + ')'}"></div>
                  <div class="${ID}_VariantHoverImage Cropper" ng-if="showShadeColorHexSwatches" ng-style="{'background-color': variant.ColorHex}"></div>
                </div>
                <div class="${ID}_VariantHoverName" ng-bind="variant.Name"></div>
                <div class="${ID}_VariantHoverTriangle"></div>
              </div>
            </div>
          `);

          // Zoom hover
          $template.find('.Shades > .Group > .GroupHeader').before(`
          <div class="${ID}_SelectedShade">
            <div class="${ID}_SelectedShadeText">
              <div class="${ID}_SelectedShadeLabel">${translate('Selected shade')}:</div>
              <div class="${ID}_SelectedShadeName" ng-bind="selectedShadeVariant.Name"></div>
            </div>

            <div class="${ID}_SelectedShadeImage">
              <div class="${ID}_SelectedShadeImageInner" ng-if="!showShadeColorHexSwatches" ng-style="{ 'background-image': 'url(' + selectedShadeVariant.Image + ')'}"></div>
              <div class="${ID}_SelectedShadeImageInner" ng-if="showShadeColorHexSwatches" ng-style="{'background-color': selectedShadeVariant.ColorHex}"></div>
            </div>
          </div>
        `);

          resolve();
        })
    );

    // Scroll page down when shade is changed on mobile
    if (getLayoutName().toLowerCase() === 'phone') {
      pollerLite([`pdp-shade-selector .${ID}_shadeWrap`], () => {
        const $shadeSelector = $('pdp-shade-selector');
        /*
          Note: Can't use event delegation as the ng-click="selectShade(variant);"
          elements don't propagate events
        */
        const scrollIntoView = () => {
          $('html, body').animate(
            {
              scrollTop: $shadeSelector.offset().top - 30,
            },
            200
          );
        };

        const $shades = $(`.${ID}_shadeWrap`);
        $shades.on('click', scrollIntoView);
      });
    }
  };

  /** Make changes for explicitly defined products */
  const productSpecificChanges = () => {
    // Properties are product SKUs
    const productChanges = {
      sku: () => {
        const changes = () => {
          const sections = [
            {
              name: 'Neutral Undertone',
              shades: [
                'Creamy Natural',
                'Light Beige',
                'Cream Beige',
                'Alabaster',
                'Porcelain',
                'Natural Beige',
                'Medium Beige',
                'Pure Beige',
                'Soft Honey',
                'Warm Light Tan',
                'Light Tan',
                'Warm Deep Tan',
                'Deep Tan',
                'Bronze',
                'Walnut',
                'Amaretto',
                'Dark Cocoa',
                'Maple',
              ],
            },
            {
              name: 'Golden Undertone',
              shades: [
                'True Honey',
                'True Beige',
                'Soft Beige',
                'Light Caramel',
                'Warm Ivory',
                'Light Nude',
                'Nude',
                'Sun Beige',
                'Earth',
                'Light Ochre',
                'Caramel',
              ],
            },
            {
              name: 'Pink Undertone',
              shades: [
                'Espresso',
                'Chocolate',
                'Rich Sienna',
                'Toasted Praline',
                'Spice',
                'Light Ivory',
                'Ivory',
                'Shell',
                'Honey Beige',
                'Ivory Pink',
                'Pale Pink',
              ],
            },
          ];

          const $shades = $('.Shades .Content .Row');
          sections.forEach((section) => {
            const { name, shades } = section;
            const $shadeSection = $(`
              <div class="${ID}_shadeSection">
                <div class="${ID}_shadeSectionHeading">${name}</div>
                <div class="${ID}_shadeSectionShades"></div>
              </div> 
            `);

            shades.forEach((shade) => {
              const $shade = [...document.querySelectorAll(`.${ID}_shade .${ID}_shadeName`)].filter((elm) => {
                let splitCopy = elm.innerText;
                return splitCopy.substring(splitCopy.indexOf(' ') + 1).trim() === shade ? elm : null;


              });

              if ($shade) {
                $shade.forEach((shadeElement) => {
                  $shadeSection.find(`.${ID}_shadeSectionShades`).append(shadeElement.closest(`.${ID}_shade`));
                });
              }
            });

            $shades.append($shadeSection);
          });
        };
        pollerLite([`.${ID}_shade`], changes);
      },
    };

    const thisProductChanges = productChanges['sku'];
    if (thisProductChanges && thisProductChanges instanceof Function) {
      thisProductChanges();
    }
  };

  /** Make all changes */
  const init = () => {
    //new VariantHover();
    //new PDPCtas();
    shadeSelectorChanges();
    productSpecificChanges();
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
