import shared from '../../shared';
import { angularCompile, angularContextWrap } from '../../../../../../../lib/utils/avon';
import { events } from '../../../../../../../lib/utils';
import { translate } from '../../services';

/**
 * Add variant selectors to a product on the category page
 *
 * @class VariantSelectorPLP
 */
export default class VariantSelectorPLP {
  /**
   * @param {jQuery} $productForm Product form element
   */
  constructor($productForm) {
    // Scope variables
    const { ID, $, VARIATION } = shared;
    this.$ = $;
    this.$productForm = $productForm;
    this.productFormScope = $productForm.scope();
    this.productScope = this.productFormScope.ProductDetail.Product;
    this.componentName = `${ID}_VariantSelector`;


    // Only run for shade variants
    if (!this.productScope.IsShadeVariant) {
     
      return false;
    } else {

    }
    events.send(`${ID}-${VARIATION}`, 'new-shades-selection-shown');

    /*
     * Reduce VariantGroups to a single array then flatten for an array of all variants
     */
    this.variants = this.productScope.VariantGroups
      .reduce((acc, val) => acc.concat(val.Variants), [])
      .flat();

    // Set initial state
    this.state = {
      $selectedVariant: null,
    };

    // Bind class context
    this.getQty = this.getQty.bind(this);
    this.setSelectedVariant = this.setSelectedVariant.bind(this);
    this.getSelectedVariant = this.getSelectedVariant.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    // Init
    this.create();
    this.bindEvents();
    this.render();
    angularCompile(this.$component, $, this.productScope);
  }

  /**
   * Get qty from qty selector
   * @returns {number}
   */
  getQty() {
    const { $productForm } = this;
    return $productForm.find('.AddToCart.FormField .Quantity input')[0].value;
  }

  /**
   * Set the selected variant state from element
   * @param {jQuery} $variant
   */
  setSelectedVariant($variant) {
    const {
      state,
      $component,
      componentName,
      variants,
    } = this;

    state.$selectedVariant = $variant;
    $component.addClass(`${componentName}--VariantSelected`);
    $component.find('li.Selected').removeClass('Selected');
    $variant.addClass('Selected');

    const selectedIndex = $variant.attr('data-index');
    const selectedVariantData = variants[selectedIndex];

    const $selectedShade = $component.find(`.${componentName}SelectedShade`);
    $selectedShade.addClass(`${componentName}SelectedShade--show`);
    $selectedShade.find(`.${componentName}SelectedShadeName`).text(selectedVariantData.Name);

    const $error = $component.find(`.${componentName}Error`);
    $error.hide();
  }

  /**
   * Get the currently selected variant element
   * @returns {jQuery}
   */
  getSelectedVariant() {
    return this.state.$selectedVariant;
  }

  /**
   * Add selected variant to cart
   */
  addToCart(e) {
    const {
      state,
      $productForm,
      productFormScope,
      getQty,
      variants,
    } = this;
    const { $selectedVariant } = state;
    if (!$selectedVariant) {
      throw Error('Must select a variant before adding to cart');
    } else {
      // Add selected variant to payload
      const selectedIndex = $selectedVariant.attr('data-index');
      productFormScope.AddSelectedVariant(variants[selectedIndex]);

      // Run this function to force the page to update
      angularContextWrap();

      angularContextWrap(() => {
        // Set quantity
        const variantQtyScope = $productForm.find('#Shades .Quantity input').scope();
        variantQtyScope.$apply(() => {
          variantQtyScope.quantity = getQty();

          angularContextWrap(() => {
            // Confirm add to bag
            productFormScope.AddToBagSubmit();
          });
        });
      });
    }
  }

  /**
   * Create the component element
   */
  
  create() {
    const {
      state,
      $,
      componentName,
      variants,
    } = this;

    /* eslint-disable indent */
    const $component = $(`
      <div class="${componentName}">
        <div class="${componentName}SelectedShade">
          <div class="${componentName}SelectedShadeText">
            <div class="${componentName}SelectedShadeLabel">${translate('Selected shade')}:</div>
            <div class="${componentName}SelectedShadeName"></div>
          </div>
        </div>

        <div class="${componentName}Variants">
          <ul>
            ${variants.map((variant, idx) => {
              return variant.IsAvailable && variant.Type === 'Shade' ? `
                <li data-index=${idx}>
                  <div class="Border">
                      <div class="Cropper" style="background-image:url('${variant.Image}')"></div>
                  </div>
                  <div class="${componentName}Hover">
                    <div class="Border">
                      <div class="${componentName}HoverImage Cropper" style="background-image:url('${variant.Image}')"></div>
                    </div>
                    <div class="${componentName}HoverName">${variant.Name}</div>
                    <div class="${componentName}HoverNumber">${variant.DisplayLineNumber}</div>
                    <div class="${componentName}HoverTriangle"></div>
                  </div>
                </li>
              ` : '';
            }).join('')}
          </ul>
        </div>

        <div class="${componentName}Error">
            <span>${translate('Shade selection required')}</span>
        </div>
      </div>
    `);
    /* eslint-enable indent */

    this.$component = $component;
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const {
      $,
      $component,
      componentName,
      $productForm,
      setSelectedVariant,
      addToCart,
    } = this;

    const $error = $component.find(`.${componentName}Error`);

    // Variant hover
    const hoverClass = `${componentName}Variant--Hover`;
    const addHover = (e) => {
      $(e.target)
        .closest('li')
        .addClass(hoverClass);
    };
    const removeHover = (e) => {
      $(e.target)
        .closest('li')
        .removeClass(hoverClass);
    };
    const $variantsContainer = $component.find(`.${componentName}Variants`);
    $variantsContainer
      .on('mouseenter', 'li', addHover)
      .on('mouseleave', 'li', removeHover);

    // Variant select
    const $variants = $component.find('li');
    $variants.each((index, element) => {
      const $variant = $(element);
      $variant.on('click', () => {
        setSelectedVariant($variant);
      });
    });

    // Add to cart
    const $addToCart = $productForm.find('.AddToCart.FormField > a.Button');
    $addToCart.removeAttr('submit-click');
    $addToCart.on('click', (e) => {
      e.preventDefault();
      try {
        $error.hide();
        addToCart();
      } catch (err) {
        $error.show();
      }
    });
  }

  /**
   * Render component
   */
  render() {
    const { $component, $productForm } = this;

    const $shades = $productForm.find('#Shades');
    $shades.after($component);
  }

}
