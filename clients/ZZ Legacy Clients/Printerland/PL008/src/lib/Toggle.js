import Component from './Component';
import Experiment from '../experiment';
import PublishSubscribe from './PublishSubscribe';
import { getToggled, markDidSeePopup, getDidSeePopup } from './Storage';

class Toggle extends Component {
  /**
   * @constructor
   */
  constructor(updater) {
    super(updater);

    // Defaults
    this.toggled = 0;
    this.shouldShowPopup = 1;

    // Init
    this.init();

    // Will render..
    this.update();
  }

  /**
   * After rendering the markup
   */
  afterRender() {
    if(this.shouldShowPopup) {
      // Hide the popup from future updates
      this.hidePopup();

      // Update after X seconds without the popup visible
      setTimeout(() => {
        this.update();
      }, Experiment.settings.POPUP_DISPLAY_TIME);
    }
  }

  /**
   * Will hide popup on next render, markDidSeePopup saves in local storage
   */
  hidePopup() {
    this.shouldShowPopup = 0;
    markDidSeePopup();
  }

  /**
   * Hide popup immediately
   */
  hidePopupImmediately() {
    this.hidePopup();

    PublishSubscribe.publish('user-did-close-popup');

    this.update(); // Re-render..
  }

  /**
   * Initialise pricing based on saved state
   */
  init() {
    this.toggled = getToggled();

    const userHasSeenPopup = getDidSeePopup();
    if(userHasSeenPopup) {
      this.shouldShowPopup = 0;
    }
  }

  /**
   * Change toggled state
   */
  toggle() {
    this.toggled = !this.toggled;

    PublishSubscribe.publish('did-toggle', {
      toggled: this.toggled
    });
  }

  /**
   * Handle on toggle
   */
  onToggle() {
    this.toggle();

    this.update();
  }

  /**
   * Render markup
   */
  render() {
    const popupMarkup = `
      <div class="pl8-toggler-popup pl8-toggler-popup--animated">
        <span 
          onclick="${this.register('hidePopupImmediately()')}"
          class="pl8-toggler-popup__close">Hide &times;</span>

        <p class="pl8-toggler-popup__title">
          ${!this.toggled ? "We're showing you trade prices which exclude VAT"
            : "We're showing you personal prices which include VAT"}
        </p>
        <p class="pl8-toggler-popup__switch">
          <a 
            onclick="${this.register('onToggle()')}"
            class="pl8-toggler-popup__switch-btn">
            ${!this.toggled ? "Not a business customer? Click here for VAT inclusive prices"
              : "Are you a business customer? Click here for ex. VAT prices"}
          </a>
        </p>
      </div>
    `;

    return `
      <div class="pl8-toggler-container">
        <div class="pl8-toggler ${this.toggled ? 'pl8-toggler--active' : ''}" 
          onmousedown="${this.register('onToggle()')}"
        >
          <div class="pl8-toggle-button ${this.toggled ? 'pl8-toggle-button--active' : ''}"></div>
        </div>
        <span class="pl8-toggler-text">
          ${!this.toggled ? 'Showing trade pricing (ex VAT)' : 'Showing personal pricing (inc VAT)'}
        </span>

        ${this.shouldShowPopup ? popupMarkup : ''}
      </div>
    `;
  }
}

export default Toggle;
