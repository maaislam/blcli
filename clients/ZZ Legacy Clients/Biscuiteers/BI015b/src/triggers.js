import Experiment from './lib/experiment';

// Destroy previously created event listeners and pollers on page load
Experiment.setup();
Experiment.destroyPollers();
Experiment.killAllEventListeners();

/* Init experiment */
Experiment.addPoller([
  'body',
  () => !!window.JQSG,
  () => !!angular,
  () => {
      // -------------------------------------------------------
      // Don't show if product already in basket
      // -------------------------------------------------------
      const prods = document.querySelectorAll('[basket-list-item]');

      const prodsToIgnore = [
        "table football biscuit tin",
				"the bike race biscuit tin",
				"cheese and wine biscuit box",
				"world's best dad jolly ginger",
				"dad's DIY kit luxe biscuit tin",
				"boy racer biscuit box",
				"dad's big breakfast luxe biscuit tin",
				"classic car luxe biscuit tin",
				"I love you dad biscuit card",
				"golf biscuit box",
				"cricket biscuit box",
				"personalised beer glass biscuit card",
				"little box of tool chocolates",
				"toolbox chocolates medium tin",
				"giant tn personalised toolbox chocolates",
      ];

      let productInBasket = false;
      [].forEach.call(prods, (item, idx) => {
          const itemText = item.querySelector('a.block p').textContent.trim();
          if(prodsToIgnore.indexOf(itemText) > -1) {
              productInBasket = true;
          }
      });

      return prods.length > 0 && productInBasket === false;
  },
  'main [ng-controller=LocalBasketController] > ng-include'
], Experiment.init);
