import shared from '../../shared';
import { events } from '../../../../../../../lib/utils';

/**
 * Add variant selectors to a product on the category page
 *
 * @class Banner
 */
export default class Banner {
  constructor(props) {
    const requiredProps = {
      desktop: true,
      mobile: false,
      link: true,
      render: true,
    };

    // Check for required properties
    Object.keys(requiredProps).forEach((propKey) => {
      if (requiredProps[propKey] && !Object.prototype.hasOwnProperty.call(props, propKey)) {
        throw Error(`${propKey} is a required property for creating a Banner`);
      }
    });

    const { ID, $ } = shared;
    this.$ = $;
    this.ID = ID;
    this.props = props;
    this.componentName = `${ID}_Banner`;

    this.handleClick = this.handleClick.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = props.render.bind(this);

    this.create();
    this.bindEvents();
    this.render(this.$component);
  }

  handleClick() {
    const { ID } = this;
    events.send(ID, 'Click', 'Banner');
  }

  bindEvents() {
    const { $component, handleClick, ID } = this;
    $component.click(handleClick);
  }

  create() {
    const {
      $,
      props,
      componentName,
    } = this;

    /* eslint-disable indent */
    const $component = $(`
      <div class="${componentName}">
        <a href="${props.link}">
          <div class="${componentName}Desktop">
            <img src="${props.desktop}"/>
          </div>
          <div class="${componentName}Mobile">
            <img src="${props.mobile}"/>
          </div>
        </a>
      </div>
    `);
    /* eslint-enable indent */

    this.$component = $component;
  }
}
