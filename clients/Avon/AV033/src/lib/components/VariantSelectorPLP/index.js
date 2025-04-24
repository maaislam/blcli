/* eslint-disable class-methods-use-this */
import shared from '../../shared';

/**
 * Add variant selectors to a product on the category page
 *
 * @class VariantSelectorPLP
 */
export default class VariantSelectorPLP {
  /**
   * @param {Object} product Product scope object
   * @param {Array<Object>} productVariants
   * @param {Function} addProductToCart Passed from product parent scope
   */
  constructor(product, productVariants, addProductToCart) {
    // Scope variables
    const { ID, $ } = shared;
    this.$ = $;
    this.addProductToCart = addProductToCart;
    this.variants = productVariants;
    this.productScope = product;
    this.componentName = `${ID}_VariantSelectorPLP`;

    // Set initial state
    this.state = {
      $selectedVariant: null,
    };

    // Bind class context
    this.getSku = this.getSku.bind(this);
    this.getQty = this.getQty.bind(this);
    this.setSelectedVariant = this.setSelectedVariant.bind(this);
    this.getSelectedVariant = this.getSelectedVariant.bind(this);
    this.getProductObject = this.getProductObject.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);

    // Init
    this.create();
    this.bindEvents();

    return this.$component;
  }

  /**
   * Return SKU from a variant in list
   * @param {jQuery} $variant
   */
  getSku($variant) {
    return $variant.attr('data-sku');
  }

  /**
   * Return 1 as only one sample can be added at a time
   * @returns {Number}
   */
  getQty() {
    return 1;
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
      productScope,
      getSku,
    } = this;
    const sku = getSku(state.$selectedVariant);
    return { productScope, Id: sku, SingleVariantSku: sku };
  }

  /**
   * Add selected variant to cart
   */
  addToCart() {
    const {
      state,
      addProductToCart,
      getQty,
      getProductObject,
    } = this;
    const { $selectedVariant } = state;
    if (!$selectedVariant) {
      throw Error('Must select a variant before adding to cart');
    } else {
      const qty = getQty($selectedVariant);
      const productObject = getProductObject();
      addProductToCart(productObject, qty);

      // Close Lightbox
      shared.variantLightbox.close();
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
      <div class="${componentName} ${state.closed ? `${componentName}--Hidden` : ''}">
        <div class="${componentName}Variants">
          <ul>
            ${variants.map((variant) => {
              return variant.IsAvailable && variant.Type === 'Shade' ? `
                <li data-sku=${variant.Sku}>
                  <div class="Border">
                      <div class="Cropper" style="background-image:url('${variant.Image}')"></div>
                  </div>
                  <div class="${componentName}Name">${variant.Name}</div>
                </li>
              ` : '';
            }).join('')}
          </ul>
        </div>
        <a class="${componentName}AddToCart Button">
          <span>Confirm</span>
        </a>
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
  }
}
