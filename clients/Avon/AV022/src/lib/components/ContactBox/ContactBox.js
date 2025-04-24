import shared from '../../shared';
import { angularCompile } from '../../../../../../../lib/utils/avon';
import { events } from '../../../../../../../lib/utils';

export default class ContactBox {
  /**
   * @param {Object} productData
   * @param {number} index
   */
  constructor() {
    const { ID, VARIATION, $ } = shared;

    this.ID = ID;
    this.VARIATION = VARIATION;
    this.$ = $;
    this.rootScope = shared.rootScope;
    this.pageType = shared.pageType;
    this.componentName = `${ID}_ContactBox`;

    if ($(`.${this.componentName}`).length) {
      return false;
    }

    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    this.create();
    this.bindEvents();
    this.render();

    this.formScope = $('#CheckoutDirectDelivery_Delivery').scope();
    angularCompile(this.$component, $, this.formScope);
  }

  /**
   * Create the box component
   * @returns {jQuery}
   */
  create() {
    const { componentName, pageType } = this;

    const $component = $(`
      <div class="${componentName}">
        <h3>Stay in the loop</h3>

        <p>Select a box below for a more personal experience, included marketing information about new Avon products and promotions</p>
        <p>I would be interested in being contact by an Avon Beauty Advisor:</p>

        <ul class="${componentName}_options">
          <li>
            <input ng-change="MarketingOptInClick(RegistrationModel.ContactPreferences.ContactBySms)" type="checkbox" name="${componentName}_smsOption" ng-model="RegistrationModel.ContactPreferences.ContactBySms">
            <div data-contact-type="sms" class="${componentName}_option" ng-class="RegistrationModel.ContactPreferences.ContactBySms ? '${componentName}_option--active' : ''">
              <div class="${componentName}_optionImg ${componentName}_optionImg--sms"></div>
              <span>Via Text Message</span>
            </div>
          </li>
          <li>
            <input ng-change="MarketingOptInClick(RegistrationModel.ContactPreferences.ContactByEmail)" type="checkbox" name="${componentName}_emailOption" ng-model="RegistrationModel.ContactPreferences.ContactByEmail">
            <div data-contact-type="email" class="${componentName}_option" ng-class="RegistrationModel.ContactPreferences.ContactByEmail ? '${componentName}_option--active' : ''">
              <div class="${componentName}_optionImg ${componentName}_optionImg--email"></div>
              <span>Via Email</span>
            </div>
          </li>
        </ul>

        ${pageType === 'confirmation' ? `
          <div class="${componentName}_signUp">Sign up</div>
        ` : ''}
      </div>
    `);

    this.$component = $component;
    return $component;
  }

  /** Bind event handlers */
  bindEvents() {
    const { ID, componentName, $component } = this;

    // Toggle checkbox on click of option
    const $options = $component.find(`.${componentName}_option`);
    $options.each((index, element) => {
      const $option = $(element);
      const $input = $option.prev('input');
      $option.click(() => {
        $input.click();
        const contactType = $option.attr('data-contact-type');
        events.send(ID, 'Click', `Contact by ${contactType}`);
      });
    });

    const $signUp = $component.find(`.${componentName}_signUp`);
    if ($signUp.length) {
      $signUp.click(() => {
        $component.slideUp();
        events.send(ID, 'Click', 'Sign up on order confirmation');
      });
    }
  }

  /** Render component */
  render() {
    const {
      VARIATION,
      $,
      $component,
      pageType,
    } = this;

    if (pageType === 'deliveryDetails') {
      const $form = $('#GuestRegistrationForm');

      if (VARIATION === '1') {
        $form.find('.Button').before($component);
      }

      // Hide original fields
      const $ogSms = $('.TermsCheck[ng-change="MarketingOptInClick(RegistrationModel.ContactPreferences.ContactBySms)"]');
      $ogSms
        .parent()
        .hide();

      const $ogEmail = $('.TermsCheck[ng-change="MarketingOptInClick(RegistrationModel.ContactPreferences.ContactByEmail)"]');
      $ogEmail
        .parent()
        .hide()
        .prev('p')
        .hide();
    } else if (pageType === 'confirmation') {
      if (VARIATION === '2') {
        $('#ThankYouForShoppingPanel').after($component);
      }
    }
  }
}
