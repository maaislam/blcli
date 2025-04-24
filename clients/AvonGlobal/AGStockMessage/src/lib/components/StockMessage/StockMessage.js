import shared from '../../shared';
import { translate } from '../../services';
import { pollerLite } from '../../../../../../../lib/utils';

export default class StockMessage {
  constructor() {
    const { ID, $ } = shared;
    this.$ = $;
    this.componentName = `${ID}_StockMessage`;

    // Check if it already exists to prevent duplication
    const componentAlreadyExists = !!$(`.${this.componentName}`).length;

    if (!componentAlreadyExists) {
      this.create = this.create.bind(this);
      this.render = this.render.bind(this);

      this.create();
      this.render();
    }
  }

  create() {
    const { $, componentName } = this;

    const $component = $(`
      <div class="${componentName}">
        <i class="${componentName}_icon"></i><span>${translate('More than 10 items in stock')}</span>
      </div>
    `);

    this.$component = $component;
  }

  render() {
    const { $, $component } = this;
    const isNewPDP = /\/productdetail\//.test(window.location.href);

    if (isNewPDP) {
      pollerLite(['.Details'], () => {
        const $details = $('.Details');
        $details.after($component);
      });
    } else {
      pollerLite(['#ProductDetails .Prices'], () => {
        const $price = $('#ProductDetails .Prices');
        $price.after($component);
      });
    }
  }
}
