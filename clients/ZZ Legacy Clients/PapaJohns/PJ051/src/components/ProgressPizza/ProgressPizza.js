import settings from '../../lib/settings';
import svg from './svgMarkup';
import { initPostback } from '../../lib/services';

const { ID } = settings;
const NAME = 'ProgressPizza';

export default class ProgressPizza {
  constructor() {
    this.elements = {
      ogBanner: document.querySelector('.prPromoPoints'),
    };
    this.userPoints = Number(document.querySelector('.prNewPagePoints h3.points').innerText.replace(' POINTS', ''));
    this.markupChanges();
    this.create();
    this.update();
    this.render();

    return {
      update: this.update,
      component: this.component,
      userPoints: this.userPoints,
    };
  }

  /** Create component */
  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_${NAME}`);
    element.innerHTML = svg;

    this.component = element;
  }

  /**
   * Update the status of the progress pizza to reflect the current state
   */
  update() {
    const changeColours = (availablePoints) => {
      const slices = this.component.querySelectorAll('svg > g');

      // For each reward point turn 1 slice of the pizza light red
      // As there are only 24 slices of pizza, count 24 pts as 23
      const adjustedTotalPoints = this.userPoints === 24 ? 23 : this.userPoints;
      for (let i = 1; i <= adjustedTotalPoints; i += 1) {
        slices[i - 1].style.fill = 'rgba(255, 0, 30, 0.39)';
      }

      // For each available reward point turn a slice of the pizza red
      const adjustedAvailablePoints = availablePoints === 24 ? 23 : availablePoints;
      for (let i = 1; i <= adjustedAvailablePoints; i += 1) {
        slices[i - 1].style.fill = 'rgb(255, 0, 30)';
      }
    };

    /**
     * Get available pts from header if available
     * If not, open the minibasket and get them from there
     */
    const availablePointsEl = document.querySelector('.prPoints');
    if (availablePointsEl) {
      const availablePoints = Number(availablePointsEl.innerText);
      changeColours(availablePoints);
    } else {
      ProgressPizza.getAvailablePoints((points) => {
        changeColours(points);
      });
    }
  }

  /**
   * Gets number of points available to the user (total - used)
   * @param {function} callback
   * @returns {number} Number of product in basket
   */
  static getAvailablePoints(callback) {
    /**
     * Opens minibasket in the background
     * @param {function} callback Runs when basket is open
     */
    function silentOpenMiniBasket(callback) {
      const basketID = 'ctl00$_objHeader$lbBasketItem';
      const miniBasketControls = {
        toggleState: () => {
          initPostback(basketID);
        },
        forceHide: () => {
          const omnibar = document.querySelector('#ctl00__objHeader_upOmnibar');
          omnibar.insertAdjacentHTML('afterbegin', '<style type="text/css">.omnibar .obbasket { display: none !important; }</style>');
        },
      };

      // Watch for the minibasket open request to be completed
      const pageLoadedHandler = (sender) => {
        const { asyncTarget } = sender._postBackSettings;
        if (asyncTarget === basketID) {
          // Hide elements
          miniBasketControls.forceHide();

          // Run callback
          callback(miniBasketControls.toggleState);

          // Remove event handler
          window.prm.remove_pageLoaded(pageLoadedHandler);
        }
      };
      window.prm.add_pageLoaded(pageLoadedHandler);

      // Open minibasket if it isn't already opened
      const basketItems = window.IsMobile() ? document.querySelectorAll('.intBasket > table > tbody > tr') : document.querySelectorAll('.itemsCont .itemCont');
      if (!basketItems) {
        miniBasketControls.toggleState();
      } else {
        callback();
      }
    }

    function getData() {
      const getPointsUsed = {
        desktop: () => Number(document.querySelector('.prPoints').innerText),
        mobile: () => {
          let basketItems = document.querySelectorAll('.intBasket > table > tbody > tr');
          if (basketItems) basketItems = Array.from(basketItems).filter(node => !node.id);
          const pointsUsed = (() => {
            let totalCost = 0;
            Array.from(basketItems).forEach((item) => {
              const name = item.querySelector('.pizza-title-b').innerText.trim().replace(/\n/, '');
              const isReward = /for [\d]+ points/.test(name);
              if (isReward) {
                const cost = Number(name.match(/\d+/)[0]);
                totalCost += cost;
              }
            });
            return totalCost;
          })();
          return pointsUsed;
        },
      };

      return window.IsMobile() ? getPointsUsed.mobile() : getPointsUsed.desktop();
    }

    silentOpenMiniBasket((closeMiniBasket) => {
      const data = getData(); // Scrape data whilst basket is open
      if (closeMiniBasket && typeof closeMiniBasket === 'function') closeMiniBasket(); // Close basket
      callback(data);
    });
  }

  markupChanges() {
    const { ogBanner } = this.elements;

    // Remove "earned" from title
    const title = ogBanner.querySelector('.copy > h3');
    title.innerText = title.innerText.replace(' EARNED', '');

    // Add supplementary text
    let message;
    if (this.userPoints) {
      if (this.userPoints === 24) {
        message = 'You only need one more point to get a FREE PIZZA or REDEEM them now on Sides and Desserts';
      } else if (this.userPoints >= 25) {
        message = 'You now have enough points to get a FREE PIZZA from the PIZZA section of our website!';
      } else {
        message = 'Keep collecting points to get a FREE Pizza or REDEEM them now on Sides and Desserts';
      }
    } else {
      message = 'Start collecting points and benefiting from FREE food by making online orders';
    }

    ogBanner.querySelector('.points').insertAdjacentHTML('afterend', `<div class="${ID}_${NAME}-text">${message}</div>`);
  }

  /** Render component */
  render() {
    const banner = document.querySelector('.prPromoPoints');
    banner.insertAdjacentElement('afterbegin', this.component);
  }
}
