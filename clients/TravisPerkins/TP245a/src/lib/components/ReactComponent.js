import { h, render, Component } from 'preact';
import shared from '../../../../../../core-files/shared';
import { pollerLite } from '../../../../../../lib/uc-lib';
//import { events, getCookie } from '../../../../../../lib/utils';
import { fireEvent } from '../../../../../../core-files/services';

export default class ReactComponent extends Component {
  constructor() {
    super();
    this.state = {
      markup: 15,
      profit: null,
      itemPrice: null,
      expanded: true,
      quantity: 1,
    };

    // Bind methods here
    this.getPrice = this.getPrice.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExpansion = this.handleExpansion.bind(this);
    this.addObservers = this.addObservers.bind(this);
  }

  // Lifecycle methods & others here

  componentDidMount() {
    this.getPrice();
    const vatSwitch = document.querySelector('[class^="VatSwitch__Toggle"]');
    if (vatSwitch) {
      vatSwitch.addEventListener('click', () => {
        setTimeout(() => {
          this.getPrice();
        }, 2000);
      });
    }
    this.addObservers();
    fireEvent('experiment-ran');
  }

  addObservers() {
    // Desktop
    pollerLite(['[class^="ProductDetailDesktop__QuantityWrapper"]'], () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          var desktopQuantityWrapper = document.querySelector('[class^="ProductDetailDesktop__QuantityWrapper"]');
          if (desktopQuantityWrapper) {
            var quantityInput = desktopQuantityWrapper.querySelector('input');
            if (quantityInput) {
              var quantityText = quantityInput.value;
              this.setState(
                {
                  quantity: quantityText,
                },
                () => {
                  this.calculate();
                }
              );
            }
          }
        });
      });
      var desktopQuantityWrapper = document.querySelector('[class^="ProductDetailDesktop__QuantityWrapper"]');
      if (desktopQuantityWrapper) {
        var quantityInput = desktopQuantityWrapper.querySelector('input');
        if (quantityInput) {
          var config = {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
          };
          observer.observe(quantityInput, config);
        }
      }
    });

    //Mobile
    pollerLite(['[class^="ProductQuantity__QuantityWrapper"]'], () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const quantity = document.querySelector('[class^="ProductQuantity__QuantityWrapper"]').innerText;
          if (quantity) {
            this.setState(
              {
                quantity: quantity,
              },
              () => {
                this.calculate();
              }
            );
          }
        });
      });
      var mobileQuantity = document.querySelector('[class^="ProductQuantity__QuantityWrapper"]');
      if (mobileQuantity) {
        var config = {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true,
        };
        observer.observe(mobileQuantity, config);
      }
    });
  }

  getPrice() {
    const mainPrice = document.querySelector(`[data-test-id="main-price"]`);
    if (mainPrice) {
      var price = mainPrice.innerText;
      price = price.replace('£', '').replace('From', '').replace('INC VAT', '').replace('EX VAT', '');
      price = parseFloat(price);
      this.setState(
        {
          itemPrice: price,
        },
        () => {
          this.calculate();
        }
      );
    }
  }

  calculate() {
    var profit = (this.state.itemPrice / 100) * this.state.markup * this.state.quantity;
    profit = profit.toFixed(2);
    this.setState({
      profit: profit,
    });
  }

  handleChange(event) {
    this.setState(
      {
        markup: event.target.value,
      },
      () => {
        this.calculate();
      }
    );
  }

  handleExpansion() {
    if (this.state.expanded === true) {
      fireEvent('closed-calculator');
      this.setState({
        expanded: false,
      });
    } else {
      fireEvent('opened-calculator');
      this.setState({
        expanded: true,
      });
    }
  }

  // Render method
  render() {
    return (
      <div className={`${shared.ID}__calculator`}>
        <div
          className={`${this.state.expanded ? `${shared.ID}__calculator__title` : `${shared.ID}__calculator__title--expanded`}`}
          onClick={this.handleExpansion}
        >
          <span>Markup Calculator</span>
          <svg
            className={`${this.state.expanded ? `${shared.ID}__chevron__down__display` : `${shared.ID}__chevron__down`}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
          >
            <path d='M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z' />
          </svg>
          <svg
            className={`${this.state.expanded ? `${shared.ID}__chevron__up` : `${shared.ID}__chevron__down__display`}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
          >
            <path d='M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z' />
          </svg>
        </div>

        {this.state.expanded ? (
          <div className={`${shared.ID}__calculator__body`}>
            <div className={`${shared.ID}__calculator__headers`}>
              <span>Markup %</span>
              <div className={`${shared.ID}__calculator__main__markup`}>
                <input
                  onClick={() => {
                    fireEvent('clicked-markup-input');
                  }}
                  className={`${shared.ID}__calculator__main__markup__input`}
                  type='number'
                  value={this.state.markup}
                  onInput={this.handleChange}
                ></input>
              </div>
            </div>
            <div className={`${shared.ID}__calculator__main`}>
              <span>Potential Profit*</span>
              <div className={`${shared.ID}__calculator__main__profit`}>£{this.state.profit}</div>
            </div>
            <div className={`${shared.ID}__calculator__bot`}>
              *Potential profit calculated for{' '}
              <span className={`${shared.ID}__calculator__bot__green`}>{this.state.quantity}</span> item
              {this.state.quantity > 1 ? 's' : ''}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
