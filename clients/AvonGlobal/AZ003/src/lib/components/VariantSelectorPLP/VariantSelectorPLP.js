import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { translate } from '../../services';
import increasinglyModalPr from '../../helpers';

/**
 * Add variant selectors to a product on the category page
 *
 * @class VariantSelectorPLP
 */
export default class VariantSelectorPLP {
  /**
   * @param {jQuery} $product Product element
   * @param {Array} productVariants
   */
  constructor($product, productVariants) {
    // Scope variables
    const { ID, $ } = shared;
    this.$ = $;
    this.$product = $product;
    this.variants = productVariants;
    this.productScope = $product.scope();
    this.componentName = `${ID}_VariantSelectorPLP`;

    // Set initial state
    this.state = {
      $selectedVariant: null,
      closed: true,
    };

    // Bind class context
    this.getSku = this.getSku.bind(this);
    this.getQty = this.getQty.bind(this);
    this.setSelectedVariant = this.setSelectedVariant.bind(this);
    this.getSelectedVariant = this.getSelectedVariant.bind(this);
    this.getProductObject = this.getProductObject.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.showVariants = this.showVariants.bind(this);
    this.hideVariants = this.hideVariants.bind(this);
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
   * Return SKU from a variant in list
   * @param {jQuery} $variant
   */
  getSku($variant) {
    return $variant.attr('data-sku');
  }

  /**
   * Get qty from qty selector
   * @param {jQuery} $variant
   */
  getQty($variant) {
    return $variant
      .closest('.ProductListItem')
      .find('.Quantity input')[0]
      .value;
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
    } = this;

    state.$selectedVariant = $variant;
    $component.addClass(`${componentName}--VariantSelected`);
    $component
      .find('li.Selected')
      .removeClass('Selected');
    $variant.addClass('Selected');
  }

  /**
   * Get the currently selected variant element
   * @returns {jQuery}
   */
  getSelectedVariant() {
    return this.state.$selectedVariant;
  }

  /**
   * Get the product scope object with the selected variant SKU
   * This is necessary to send as the first param when calling
   * addProductToCart()
   * @returns {Object}
   */
  getProductObject() {
    const {
      state,
      $product,
      getSku,
    } = this;
    const sku = getSku(state.$selectedVariant);
    return { ...$product.scope().product, Id: sku, SingleVariantSku: sku };
  }

  /**
   * Add selected variant to cart
   */
  addToCart(e) {
    const {
      state,
      productScope,
      getQty,
      getProductObject,
    } = this;
    const { $selectedVariant } = state;
    if (!$selectedVariant) {
      throw Error('Must select a variant before adding to cart');
    } else {
      const qty = getQty($selectedVariant);
      const productObject = getProductObject();
      productScope.addProductToCart(productObject, qty);

      // Show increasingly popup
      increasinglyModalPr(e.currentTarget.parentNode.parentNode.parentNode);
    }
  }

  /**
   * Show variants component
   */
  showVariants() {
    const {
      state,
      componentName,
      $component,
      $toggle,
    } = this;

    state.closed = false;
    $component
      .removeClass(`${componentName}--Hidden`)
      .addClass(`${componentName}--Visible`);
    $toggle
      .addClass(`${componentName}Toggle--Open`)
      .find(`.${componentName}Toggle-Text`)
      .text(translate('Collapse Colours'));
  }

  /**
   * Hide variants component
   */
  hideVariants() {
    const {
      state,
      componentName,
      $component,
      $toggle,
    } = this;

    state.closed = true;
    $component
      .removeClass(`${componentName}--Visible`)
      .addClass(`${componentName}--Hidden`);
    $toggle
      .removeClass(`${componentName}Toggle--Open`)
      .find(`.${componentName}Toggle-Text`)
      .text(translate('Expand Colours'));
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
      <div class="${componentName} ${state.closed ? `${componentName}--Hidden` : ''}">
        <a class="${componentName}AddToCart Button">
          <span>${translate('Add to Cart')}</span>
        </a>
        <div class="${componentName}Variants">
          <ul>
            ${variants.map((variant) => {
              return variant.IsAvailable && variant.Type === 'Shade' ? `
                <li data-sku=${variant.Sku}>
                  <div class="Border">
                      <div class="Cropper" style="background-image:url('${variant.Image}')"></div>
                  </div>
                  <div class="${componentName}Hover">
                    <div class="Border">
                      <div class="${componentName}HoverImage Cropper" style="background-image:url('${variant.Image}')"></div>
                    </div>
                    <div class="${componentName}HoverName">${variant.Name}</div>
                    <div class="${componentName}HoverTriangle"></div>
                  </div>
                </li>
              ` : '';
            }).join('')}
          </ul>
        </div>
      </div>
    `);

    const $toggle = $(`
      <div class="${componentName}Toggle">
        <a class="Button">
          <span class="${componentName}Toggle-Text">${translate('Expand Colours')}</span>
          <svg class="${componentName}Toggle-Icon" viewBox="-0.5 -0.5 22 22">
            <path d="M9,15.5c-0.1,0-0.3,0-0.4-0.1c-0.2-0.2-0.2-0.5,0-0.7l4.2-4.2L8.6,6.3c-0.2-0.2-0.2-0.5,0-0.7   s0.5-0.2,0.7,0l4.6,4.6c0.2,0.2,0.2,0.5,0,0.7l-4.5,4.5C9.2,15.5,9.1,15.5,9,15.5z"></path>
          </svg>
        </a>
      </div>
    `);
    /* eslint-enable indent */

    this.$component = $component;
    this.$toggle = $toggle;
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const {
      state,
      $,
      $component,
      $toggle,
      showVariants,
      hideVariants,
      componentName,
      setSelectedVariant,
      addToCart,
    } = this;

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

    $variantsContainer[0].addEventListener('animationstart', (e) => {
      if (e.animationName === 'fade-in') {
        e.target.classList.add('did-fade-in');
      }
    });
    $variantsContainer[0].addEventListener('animationend', (e) => {
      if (e.animationName === 'fade-out') {
        e.target.classList.remove('did-fade-in');
      }
    });

    // Variant select
    const $variants = $component.find('li');
    $variants.each((index, element) => {
      const $variant = $(element);
      $variant.on('click', () => {
        setSelectedVariant($variant);
      });
    });

    // Add to cart
    const $addToCart = $component.find(`.${componentName}AddToCart`);
    $addToCart.on('click', addToCart);

    // Toggle component
    $toggle.on('click', () => {
      if (state.closed) {
        showVariants();
      } else {
        hideVariants();
      }
    });
  }

  /**
   * Render component
   */
  render() {
    const {
      $product,
      $component,
      $toggle,
    } = this;

    const $productDetails = $product.find('.ProductDetails');
    const $cta = $product.find('[ng-click="viewProduct(product)"]');
    $productDetails.after($component, $toggle);
    $cta.hide();
  }
}
