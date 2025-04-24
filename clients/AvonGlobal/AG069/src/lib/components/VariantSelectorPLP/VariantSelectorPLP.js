import { fireEvent } from "../../../../../../../core-files/services";
import shared from "../../../../../../../core-files/shared";
import { angularCompile } from "../../../../../../../lib/utils/avon";

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
    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    // Init
    this.create();
    this.render();
    this.bindEvents();
    angularCompile(this.$component, $, this.productScope);
  }

  /**
   * Return SKU from a variant in list
   * @param {jQuery} $variant
   */
  getSku($variant) {
    return $variant.attr("data-sku");
  }

  /**
   * Get qty from qty selector
   * @param {jQuery} $variant
   */
  getQty($variant) {
    return $variant.closest(".ProductListItem").find(".Quantity input")[0]
      .value;
  }

  /**
   * Set the selected variant state from element
   * @param {jQuery} $variant
   */
  setSelectedVariant($variant) {
    const { state, $component, componentName, $product } = this;

    state.$selectedVariant = $variant;

    $component
      .find("li.Selected")
      .removeClass("Selected")
      .removeClass(`${componentName}--VariantSelected`);
    $variant.addClass("Selected").addClass(`${componentName}--VariantSelected`);

    $product
      .find(`.${componentName}selectedVariantLabel span`)
      .text($variant.data("label"));
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
    const { state, $product, getSku } = this;
    const sku = getSku(state.$selectedVariant);
    return { ...$product.scope().product, Id: sku, SingleVariantSku: sku };
  }

  /**
   * Add selected variant to cart
   */
  addToCart(e) {
    const { state, productScope, getQty, getProductObject } = this;
    const { $selectedVariant } = state;
    if (!$selectedVariant) {
      throw Error("Must select a variant before adding to cart");
    } else {
      const qty = getQty($selectedVariant);
      const productObject = getProductObject();
      productScope.addProductToCart(productObject, qty);
      fireEvent("Click - Add to bag");
    }
  }

  /**
   * Create the component element
   */
  create() {
    const { componentName, variants, $product } = this;
    const { ID } = shared;

    /* eslint-disable indent */
    const $component = $(`
    <ul>
      ${variants
        .map((variant) => {
          return variant.IsAvailable && variant.Type === "Shade"
            ? `
          <li data-label="${variant.Name}" data-sku=${variant.Sku}>
            <div class="Border">
                <div class="Cropper" style="background-image:url('${variant.Image}')"></div>
            </div>
          </li>
        `
            : "";
        })
        .join("")}
      </ul>
    `);

    // Adjust layout
    const $qty = $product.find(".ProductAction");
    $product.find(`.${ID}_ctaWrapper`).empty().append($qty)
      .append(`<a class="${componentName}AddToCart Button">
            <span>${"В корзину"}</span>
          </a>`);

    // Add variant label.
    if (variants.length > 0) {
      $product.find(".ProductDetailsTop").append(`
      <p class="${componentName}selectedVariantLabel">Выбранный оттенок: <span>${variants[0].Name}</span></p>
      `);
    }

    if (variants.length < 5) {
      $product.find(`.Arrow`).remove();
    }

    /* eslint-enable indent */

    this.$component = $component;
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const {
      $product,
      $component,
      componentName,
      setSelectedVariant,
      addToCart,
    } = this;

    // Variant select
    const $variants = $component.find("li");
    $variants.each((index, element) => {
      const $variant = $(element);
      $variant.on("click", () => {
        fireEvent("Swatch selected");
        setSelectedVariant($variant);
      });
    });

    // Add to cart
    const $addToCart = $product.find(`.${componentName}AddToCart`);
    $addToCart.on("click", addToCart);

    // Scroll buttons.
    const $shadeList = $product.find("ul");
    $product.find(`.${componentName}arrowLeft`).click((e) => {
      $shadeList.animate(
        {
          scrollLeft: $shadeList.scrollLeft() - $shadeList.width(),
        },
        250
      );
    });
    $product.find(`.${componentName}arrowRight`).click((e) => {
      console.log($shadeList);
      $shadeList.animate(
        {
          scrollLeft: $shadeList.scrollLeft() + $shadeList.width(),
        },
        250
      );
    });

    // Swipe action
    const slider = $shadeList[0];
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  /**
   * Render component
   */
  render() {
    const { $product, $component, setSelectedVariant } = this;

    // Add Shades
    $product.find("ul").after($component).remove();

    const $cta = $product.find('[ng-click="viewProduct(product)"]');
    $cta.hide();

    // Set default variant
    setSelectedVariant($product.find("ul li").first());
  }
}
