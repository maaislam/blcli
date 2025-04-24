import { pollerLite } from '../../../../../../lib/utils';
import { fireEvent } from '../../../../../../core-files/services';
export function deliveryTab() {
  pollerLite(['.nav-header'], () => {
    const tabsBorder = document.querySelector('.nav-underline');
    const tabsRef = document.querySelector('.nav-tabs');
    const div = document.createElement('div');
    div.className = 'AWE015-tab';
    div.classList.add('nav-header');
    div.textContent = 'Spedizione';
    div.style.paddingRight = '0';
    if (window.innerWidth >= 768) {
      tabsRef.addEventListener('click', (e) => {
        if (e.target.innerText == 'Spedizione') {
          fireEvent('Conditions Met', true);
          fireEvent('Users interact with the delivery tab');
        }
        const current = e.target.closest('.nav-header');
        if (!current) {
          return;
        }
        const prev = document.querySelector('.nav-header-active');
        if (prev) {
          prev.classList.remove('nav-header-active');
        }
        //e.target.closet.classlist
        if (e.target.innerText == 'Spedizione') {
          current.classList.add('nav-header-active'); //add a border of active
          document.querySelector('.AWE015-dd').classList.add('AWE015-hide');
        } else {
          current.firstElementChild.classList.add('nav-header-active');
        }
        if (!current.classList.contains('AWE015-tab')) {
          document.querySelector('.AWE015-dd').classList.add('AWE015-hide');
          document.querySelector('#AWE015-inner').classList.add('AWE015-hide');
          document.querySelector('.tab-content').style.display = 'block';
        } else {
          document.querySelector('.AWE015-dd').classList.remove('AWE015-hide');
          document
            .querySelector('#AWE015-inner')
            .classList.remove('AWE015-hide');
          document.querySelector('.tab-content').style.display = 'none';
        }
      });
      const Deliverydiv = document.createElement('div');
      Deliverydiv.classList.add(
        'AWE015-dd',
        'ProductDescription',
        'SectionContent',
        'Overlay'
      );
      Deliverydiv.innerHTML = `
            <div id="AWE015-inner" class="Content AWE015-inner AWE015-hide">
                <p>Avon Cosmetics, tramite il Sito di e-commerce, accetta ordini con consegna su tutto il territorio della Repubblica Italiana ad eccezione della Repubblica di San Marino, Livigno e Campione d’Italia.
                </p>
								<p>I tempi di consegna approssimativi sono:</p>
                <div class="AWE015-content AWE015-delivery AWE015-delivery-desktop-v2 AWE015-p0">
                    <div class="AWE015-el">
                        <h5> Standard (spedizione)</h5>
                        <p class="AWE015-mt-0">4 - 5 giorni lavorativi</p>
                    </div>
                    <div style="font-weight: 600;" class="AWE015-el second">
                        <p>€ 3.90 <span>(Gratis per ordini a partire da €29)</p></span>
                    </div>

                    <div class="AWE015-el">
                    <h5>Express (spedizione)</h5>
                        <p class="AWE015-mt-0">2 - 3 giorni lavorativi</p>
                    </div>
                    <div class="AW015-el">
                        <p style="font-weight: 600;" class="AWE015-mt-0">€ 4.90</p>
                    </div>
                </div>
                <p>Ad esclusione degli ordini destinati in Calabria, Sicilia, Sardegna ed Isole minori per le quali località potrebbero essere necessarie 24 ore aggiuntive.</p>
             </div>
            `;
      tabsRef.insertAdjacentElement('beforeend', div);
      tabsBorder.insertAdjacentElement('afterend', Deliverydiv);
    }
  });
  if (window.innerWidth < 767) {
    //mobile version
    pollerLite(['.SectionHeader'], () => {
      //header
      const div = document.createElement('div');
      div.className = 'AWE015-card';
      div.textContent = 'Spedizione';
      const lastItem = document.querySelector('.ProductDescription');
      //+ - div
      //icon mimic for toggle icon when open and closed.
      const toggleDivContainer = document.createElement('div');
      toggleDivContainer.className = 'AWE015-toggle-icon';
      const vertical = document.createElement('div');
      vertical.className = 'AWE015-vertical';
      const horizontal = document.createElement('div');
      horizontal.className = 'AWE015-horizantal';
      //conntent
      const Deliverydiv = document.createElement('div');
      Deliverydiv.className = 'AWE015-hide';
      Deliverydiv.classList.add('SectionContent');
      Deliverydiv.setAttribute('id', 'AWE015-card-content');
      Deliverydiv.innerHTML = `
            <div class="AWE015-content-pullout Content">
            <p>Avon Cosmetics, tramite il Sito di e-commerce, accetta ordini con consegna su tutto il territorio della Repubblica Italiana ad eccezione della Repubblica di San Marino, Livigno e Campione d’Italia.</p>
            <p>I tempi di consegna indicativi sono:</p>
						<div class="container">
							<div class="item" style="font-weight: 600;">Standard (spedizione)</div>
							<div class="item" style="text-align: right; font-weight: 600;">€ 3.90</div>
							<div class="item" style="font-weight: 500;">4 - 5 giorni lavorativi</div>
							<div class="item" style="text-align: right; color: #7436BD; font-weight: 600;">(Gratis per ordini a partire da €29)</div>
						</div>
						<div class="container">
							<div class="item" style="font-weight: 600;">Express (spedizione)</div>
							<div class="item" style="text-align: right; font-weight: 600;">€ 4.90</div>
							<div class="item" style="font-weight: 500;">2 - 3 giorni lavorativi</div>
						</div>
            <p>Ad esclusione degli ordini destinati in Calabria, Sicilia, Sardegna ed Isole minori per le quali località potrebbero essere necessarie 24 ore aggiuntive.</p>
            `;
      lastItem.insertAdjacentElement('beforeend', div);
      //attach toggle icon with div
      pollerLite(['.AWE015-card'], () => {
        const card = document.querySelector('.AWE015-card');
        card.insertAdjacentElement('beforeend', toggleDivContainer);
        toggleDivContainer.insertAdjacentElement('beforeend', vertical);
        toggleDivContainer.insertAdjacentElement('beforeend', horizontal);
      });
      lastItem.insertAdjacentElement('beforeend', Deliverydiv);
      // Add Event Listener
      document.querySelector('.AWE015-card').addEventListener('click', (e) => {
        if (e.target.innerText == 'Spedizione') {
          fireEvent('Conditions Met', true);
          fireEvent('Users interact with the delivery tab');
        }
        const snap = document.querySelector('.AWE015-vertical');
        const cardDescription = document.querySelector('#AWE015-card-content');
        snap.classList.toggle('AWE015-hide');
        cardDescription.classList.toggle('AWE015-hide');
      });
    });
  }
}
