import settings from '../../settings';
import { countdown } from '../../../../../../../lib/uc-lib';
import { getLayoutName } from '../../services';

const { ID } = settings;

export default class DeliveryMessaging {
  constructor() {
    this.name = `${ID}_DeliveryMessaging`;

    // Needs to be adjusted as we move in and out of British Summer Time
    // As there is no way of getting Avon's server time
    this.isBST = false;
    this.before1pm = this.isBefore1pm.call(this);

    this.create();
    this.render();
    this.initCountdown();

    return {
      isBST: this.isBST,
      before1pm: this.before1pm,
      render: this.render,
      component: this.component,
    };
  }

  create() {
    const { name, before1pm } = this;
    const component = document.createElement('div');
    component.classList.add(name);

    // If before 1pm, show a countdown
    // else show static free delivery message
    component.innerHTML = before1pm ? `
      <em>You can get this tomorrow</em> if you order in the next <span id="${name}_countdown"></span>
    ` : `
      <em>Get <span style="color:#dfc1f3;">FREE</span> delivery when you spend over £20</em>
    `;

    this.component = component;
  }

  render() {
    const { component } = this;

    switch (getLayoutName()) {
      case 'Phone':
        document.querySelector('.AddToWishList').insertAdjacentElement('afterend', component);
        break;

      case 'Tablet':
        document.querySelector('.ProductActions').insertAdjacentElement('beforebegin', component);
        break;

      case 'Desktop':
        document.querySelector('#ProductDetails .Prices').insertAdjacentElement('afterend', component);
        break;

      default:
        break;
    }
  }

  initCountdown() {
    const { name, component, isBST } = this;
    const countdownEl = component.querySelector(`#${name}_countdown`);
    if (countdownEl) {
      // Create cutoff date and convert to unix timestamp
      let cutoff = new Date();
      cutoff.setUTCHours(13 - (isBST ? 1 : 0), 0, 0);
      cutoff = cutoff.getTime();

      // Init
      countdown({
        cutoff,
        element: `#${name}_countdown`,
        labels: {
          h: 'hours',
          m: 'mins',
          s: '',
        },
      });
    }
  }

  /**
   * Check if current time is before 1pm (UTC)
   */
  isBefore1pm() {
    const { isBST } = this;

    /**
     * Returns the current hour as a number, accounting for BST (UTC +1)
     * @returns {number}
     */
    const getCurrentHour = () => {
      let hour = new Date().getUTCHours();
      if (isBST) {
        if (hour === 23) {
          hour = 0;
        } else {
          hour += 1;
        }
      }
      return hour;
    };

    const isBefore = getCurrentHour() < 13;
    return isBefore;
  }
}
