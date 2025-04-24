import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { translate } from '../../services';

/** An component showing the selected shade in more detail */
export default class SelectedShade {
  constructor() {
    const { ID, $ } = shared;
    this.ID = ID;
    this.$ = $;
    this.componentName = `${ID}_SelectedShade`;
    this.variantsScope = $('.Shades').scope();
    this.expandByDefault = true; // Set true to show all shades by default

    // Check if it already exists to prevent duplication
    const componentAlreadyExists = !!$(`.${this.componentName}`).length;

    if (!componentAlreadyExists && this.variantsScope) {
      this.create = this.create.bind(this);
      this.render = this.render.bind(this);

      this.create();
      this.render();
      angularCompile(this.$component, $, this.variantsScope);

      if (this.expandByDefault) {
        this.variantsScope.isSectionExpanded = true;
        this.variantsScope.$apply();
      }
    }
  }

  /**
   * Create the component
   * @returns {jQuery} component
   */
  create() {
    const { $, componentName } = this;

    const $component = $(`
      <div class="${componentName}">
        <div class="${componentName}Text">
          <div class="${componentName}Label">${translate('Selected shade')}:</div>
          <div class="${componentName}Name" ng-bind="selectedShadeVariant.Name"></div>
        </div>

        <div class="${componentName}Image">
          <div class="${componentName}ImageInner" style="background-image:url('{{selectedShadeVariant.Image}}');"></div>
        </div>
      </div>
    `);

    this.$component = $component;
    return $component;
  }

  /** Render component to page */
  render() {
    const { $, $component, componentName } = this;

    // Remove any existing component first to prevent duplication
    $(`.${componentName}`).remove();

    $('.Shades > .Group > .GroupHeader').before($component);
  }
}
