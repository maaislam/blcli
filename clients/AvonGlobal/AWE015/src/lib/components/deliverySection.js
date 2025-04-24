import { fireEvent } from '../../../../../../core-files/services';
import { pollerLite, elementIsInView } from '../../../../../../lib/utils';
export function deliverySection() {
  pollerLite(['.add-to-cart-container'], () => {
    const addAfterCartCTA = document.querySelector('.add-to-cart-container');

    const deliverySection = document.createElement('section');
    deliverySection.className = 'AWE015-delivery AWE015-mb-10';
    if (window.innerWidth > 820) {
      deliverySection.innerHTML = `
        <div class="AWE015-delivery-head">
        <h5>Spedizione</h5>
        </div>
        <div class="AWE015-content-variation1">
                <div class="AWE015-el">
                    <h5> Standard (spedizione)</h5>
                    <p>4 - 5 giorni lavorativi</p>
                </div>
                <div class="AWE015-el second">
                    <p style="text-align: left; font-weight: 600;">€ 3.90 <span>(Gratis per ordini a partire da €29)</p></span>
                    <p></p>
                </div>

                <div class="AWE015-el">
                   <h5>Express (spedizione)</h5>
                    <p>2 - 3 giorni lavorativi</p>
                </div>

                <div class="AW015-el">
                    <p style="text-align: left; margin-top:0; font-weight: 600;">€ 4.90</p>
                </div>
                <div id="delivery-tracking" class="AW015-el AWE015-sp">
                    <p>Per ulteriori informazioni guarda la <a href="https://www.avon.it/modalita-tempi-e-costi-di-consegna" target="_blank">pagina di consegna</a>
                </div>
        </div>
        `;
    }
    if (window.innerWidth <= 820) {
      deliverySection.innerHTML = `
        <div class="AWE015-delivery-head">
        <h5>Spedizione</h5>
        </div>
        <div class="AWE015-content-variation1">
                <div class="AWE015-el">
                    <h5> Standard (spedizione)</h5>
                    <p>4 - 5 giorni lavorativi</p>
                </div>
                <div style="text-align: right; padding-bottom: 10px;" class="AWE015-el second">
                    <p style=" font-weight: 600;">€ 3.90</p>
										<span>(Gratis per ordini a partire da €29)</span>
                </div>

                <div class="AWE015-el">
                   <h5>Express (spedizione)</h5>
                    <p>2 - 3 giorni lavorativi</p>
                </div>

                <div class="AW015-el">
                    <p style="text-align: right; margin-top:0; font-weight: 600;">€ 4.90</p>
                </div>
                <div id="delivery-tracking" class="AW015-el AWE015-sp">
                    <p>Per ulteriori informazioni guarda la <a href="https://www.avon.it/modalita-tempi-e-costi-di-consegna" target="_blank">pagina di consegna</a>
                </div>
        </div>
        `;
    }
    addAfterCartCTA.insertAdjacentElement('afterend', deliverySection);

    //check if it is in the focus
    const deliveryComponent = document.querySelector('.AWE015-delivery');

    document
      .querySelector('#delivery-tracking')
      .addEventListener('click', () => {
        fireEvent('Users view the delivery page');
      });

    if (
      document
        .querySelector('body')
        .classList.contains('Action_ProductDetailPage')
    ) {
      window.addEventListener(
        'scroll',
        () => {
          if (elementIsInView(deliveryComponent, false)) {
            fireEvent('Conditions Met', true);
          }
        },
        true
      );
    }
  });
}
