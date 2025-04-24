import shared from '../../shared';

/** Add a zoom hover effect to each shade */
export default class VariantHover {
  constructor() {
    const { ID, $ } = shared;
    this.ID = ID;
    this.$ = $;
    this.componentName = `${ID}_VariantHover`;
    this.$variantsContainer = $('.Shades');
    this.$variants = this.$variantsContainer.find('.Selector');

    // Check if it already exists to prevent duplication
    const componentAlreadyExists = !!$(`.${this.componentName}`).length;
    const hasVariants = !!this.$variants.length;

    if (!componentAlreadyExists && hasVariants) {
      this.create = this.create.bind(this);
      this.bindEvents = this.bindEvents.bind(this);
      this.render = this.render.bind(this);

      // Create and render a hover component for each variant
      this.$variants.each((index, element) => {
        const $variant = $(element);
        const $component = this.create($variant);
        this.render($variant, $component);
      });

      this.bindEvents();
    }
  }

  /**
   * @param {jQuery} $variant Variant element
   * @returns {jQuery} component
   */
  create($variant) {
    const { $, componentName } = this;
    const scope = $variant.scope();
    const { Name, Image } = scope.variant;

    const $component = $(`
      <div class="${componentName}">
        <div class="Border">
          <div class="${componentName}Image Cropper" style="background-image:url('${Image}')"></div>
        </div>
        <div class="${componentName}Name">${Name}</div>
        <div class="${componentName}Triangle"></div>
      </div>
    `);

    return $component;
  }

  /** Bind event handlers */
  bindEvents() {
    const { ID, $variantsContainer } = this;
    const hoverClass = `${ID}_Variants--hover`;
    const addHover = (e) => {
      $(e.target)
        .closest('.Selector')
        .addClass(hoverClass);
    };
    const removeHover = (e) => {
      $(e.target)
        .closest('.Selector')
        .removeClass(hoverClass);
    };

    $variantsContainer
      .on('mouseenter', '.Selector', addHover)
      .on('mouseleave', '.Selector', removeHover);
  }

  /**
   * Render component to page
   * @param {jQuery} $variant Variant element
   * @param {jQuery} $component Hover component
   */
  render($variant, $component) {
    $variant.append($component);
  }
}
