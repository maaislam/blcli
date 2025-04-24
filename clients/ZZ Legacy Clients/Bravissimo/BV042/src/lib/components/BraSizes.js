import { h, render, Component } from 'preact';
import settings from '../settings';
import { events } from '../../../../../../lib/utils';
import { getProductDataFromDataLayer } from '../helpers';

/**
 * Bra Sizes Component
 */
class BraSizes extends Component {
  constructor() {
    super();

    const data = getProductDataFromDataLayer();
    const availableSizes = data.sizes.variants.map(v => v.value);

    this.data = data;
    this.availableSizes = availableSizes;

    this.state = {
      availableVariants: [],
      chosenBack: null,
      chosenCup: null,
      stockStatus: '',
      showError: false
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * Helper update real site state
   *
   * Piggyback onto core site functionality for setting size
   *
   * => Selenium-style trigger-event and await to update internal state for add to bag
   * (we can't access this state directly).
   */
  updateRealSiteState() {
    const back = this.state.chosenBack;
    const cup = this.state.chosenCup;

    if(back && cup) {
      const sizeSelector = document.querySelector('.c-product-details__sizes .c-field-brasize__button');
      if(sizeSelector) {
        sizeSelector.click();

        setTimeout(() => {
          const braSizeContainer = document.querySelector('.c-field-brasize__parent-container');
          if(braSizeContainer) {
            const sizeTarget = braSizeContainer.querySelector(`li[data-value="${back}"]`);
            if(sizeTarget) {
              sizeTarget.click();

              setTimeout(() => {
                const cupLabel = document.querySelector(`[for="field-brasize.modal-${cup}"]`);
                cupLabel.click();
              }, 200);
            }
          }
        }, 200);
      }
    }
  }

  /**
   * Update by clicking hidden grid
   */
  updateGrid() {
    const back = this.state.chosenBack;
    const cup = this.state.chosenCup;

    if(back && cup) {
      const gridLabel = document.querySelector(`.c-product-details label[for=${cup}]`);
      if(gridLabel) {
        gridLabel.click();
      }
    }
  }

  /**
   * Get variants for given size
   */
  getVariantsForSize(size) {
    let result = [];

    if(size) {
      result = this.data?.sizes?.variants?.filter(v => v.value == size)?.[0]?.sizes?.variants;
    }

    return result;
  }

  /**
   * Handle selects change
   */
  onChange(e) {
    if(e.target.dataset.type == 'back') {
      events.send(settings.ID + '-' + settings.VARIATION, `Changed Back`, e.target.value);

      this.setState({
        showError: false,
        chosenBack: e.target.value || '',
        chosenCup: '',
        stockStatus: '',
        availableVariants: this.getVariantsForSize(e.target.value)
      });
    } else if(e.target.dataset.type == 'cup') {
      events.send(settings.ID + '-' + settings.VARIATION, `Changed Cup`, e.target.value);

      const currentStockStatus = e.target.options[e.target.selectedIndex].dataset.status;

      this.setState({
        showError: false,
        chosenCup: e.target.value,
        stockStatus: currentStockStatus || '',
      }, () => {
        const c = document.querySelector('.c-product-details__size-grid');
        if(c) {
          this.updateGrid();
        } else {
          this.updateRealSiteState();
        }
      });
    }
  }

  /**
   * Attach event listeners to core add to bag, to check state
   * and show custom error messaging
   */
  componentDidMount() {
    setTimeout(() => {
      const btn = document.querySelector('.c-product-details__add-to-bag .c-button');
      if(btn && !btn.classList.contains('xlistener-added')) {
        btn.classList.add('xlistener-added');

        btn.addEventListener('click', (e) => {
          if(!this.state.chosenCup || !this.state.chosenBack) {
            e.preventDefault();
            e.stopPropagation();

            events.send(settings.ID + '-' + settings.VARIATION, `Added To Bag Error`);

            this.setState({
              showError: true
            });
          } else {
            events.send(settings.ID + '-' + settings.VARIATION, `Added To Basket`);
          }
        });
      }
    }, 1500);
  }

  /**
   * Render
   */
  render() {
    const ID = settings.ID;

    const disabled = !this.state.chosenBack ? {'disabled': 'disabled'} : {};

    return (
      <div>
        <div class={ID + '-sizes__wrap'}>
          <div class={ID + '-sizes__back'}>
            <label>Back Size</label>
            <select 
              value={this.state.chosenBack} 
              onChange={this.onChange} 
              data-type="back" 
              class={ID + '__select'}
            >
              <option value="">Select back...</option>
              {this.availableSizes.map((size) => {
                return <option value={size}>{size}</option>
              })}
            </select>
          </div>

          <div class={ID + '-sizes__cup'}>
            <label>Cup Size</label>
            <select 
              value={this.state.chosenCup} 
              {...disabled} 
              onChange={this.onChange} 
              data-type="cup" 
              class={ID + '__select'}
            >
              <option value="">Select cup...</option>
              {this.state.availableVariants.map((variant) => {
                const status = variant.stockStatusKey == 'Unavailable' ? {'disabled' : 'disabled'} : {};

                return <option {...status} data-status={variant.stockStatus} value={variant.skuCode}
                  >{variant.value}{variant.stockStatusKey == 'Unavailable' ? ' (Sold out)' : ''}</option>
              })}
            </select>
          </div>
        </div>

        {!this.state.stockStatus || (
          <div class={ID + '-stock-status'}>
            <img width={'21'} height={'21'} 
              src={'https://editor-assets.abtasty.com/46808/5fff71da4ee8c1610576346.jpg'} />
            {this.state.stockStatus}
          </div>
        )}

        {!this.state.showError || (
          <div class={ID + '-error__wrap'}>
            <div class="c-message-container">
              <aside class="c-message c-message--warn c-message--banner" role="note">
                <h4 class="c-message__title">Error</h4>

                <div class="c-message__main">
                  <div class="c-markdown">
                    <p>Please select a back and cup size</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BraSizes;
