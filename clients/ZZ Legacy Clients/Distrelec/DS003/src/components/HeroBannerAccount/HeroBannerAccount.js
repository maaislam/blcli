import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID, VARIATION } = settings;

export default class Search {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    const element = document.createElement('div');
    element.classList.add(`${ID}_HeroBanner--acc`);

    const USPs = [
      {
        titleGB: 'Get personalised quotes',
        titleDE: 'Bekommen Sie personalisierte Angebote',
        titleFR: 'Obtenir des devis personnalisés',
        titleSE: 'Få personliga offerter',
        img: 'https://cdn.dynamicyield.com/api/8770250/images/db6a584b9e10__USP_quotes.png',
      },
      {
        titleGB: 'Upload a bill of materials',
        titleDE: 'Laden Sie Materiallisten hoch',
        titleFR: 'Télécharger les listes de matériel',
        titleSE: 'Ladda upp materialspecifikationer',
        img: 'https://cdn.dynamicyield.com/api/8770250/images/96ee83da5d7f__USP_upload.png',
      },
      {
        titleGB: 'Easily track shipments',
        titleDE: 'Verfolgen Sie mühelos Ihre Lieferungen',
        titleFR: 'Suivre vos commandes en toute facilité',
        titleSE: 'Spåra leveranser enkelt',
        img: 'https://cdn.dynamicyield.com/api/8770250/images/17a18118999a9__USP_shipments.png',
      },
    ];
    switch (countryCode) {
      case 'EN':
        element.innerHTML = `
          <div class="container">
            <div class="col col-xs-12">
              <div class="${ID}_HeroBanner__left">
                <div class="${ID}_HeroBanner__USP">
                  <p>Do more with an account...</p>
                  <ul>
                  ${USPs.map((usp, i) => `
                    <li class="${ID}_HeroBanner__USP__item ${i === 0 ? `${ID}_active` : ''}">
                      <div class="${ID}_HeroBanner__USP__img"><img src="${usp.img}" /></div>
                      <div class="${ID}_HeroBanner__USP__title">${usp.titleGB}</div>
                    </li>
                  `).join('')}
                  </ul>
                </div>

                <div class="${ID}_HeroBanner__secondaryUSP">
                  <p>You can also...</p>
                  <ul>
                    <li>Admin users & control budgets</li>
                    <li>Manage delivery addresses</li>
                    <li>Easily track shipments</li>
                    <li>Access our best prices</li>
                  </ul>
                </div>
              </div>

              <div class="${ID}_HeroBanner__right">
                <a class="${ID}_HeroBanner__CTA" href="/register">
                  <span class="${ID}_HeroBanner__CTA__small">Create your new</span>
                  <span>Business Account Now</span>
                </a>

                <p><em>Already a customer?</em></p>
                <p><a href="/login">Login</a> or <a href="/register">Register with customer number</a></p>
              </div>
            </div>
          </div>
        `;
        break;
      case 'DE':
        element.innerHTML = `
          <div class="container">
            <div class="col col-xs-12">
              <div class="${ID}_HeroBanner__left">
                <div class="${ID}_HeroBanner__USP">
                  <p>Mehr Funktionen mit einem Account...</p>
                  <ul>
                  ${USPs.map((usp, i) => `
                    <li class="${ID}_HeroBanner__USP__item ${i === 0 ? `${ID}_active` : ''}">
                      <div class="${ID}_HeroBanner__USP__img"><img src="${usp.img}" /></div>
                      <div class="${ID}_HeroBanner__USP__title">${usp.titleDE}</div>
                    </li>
                  `).join('')}
                  </ul>
                </div>

                <div class="${ID}_HeroBanner__secondaryUSP">
                  <p>Sie können auch...</p>
                  <ul>
                    <li>Nutzer & Budgets einrichten</li>
                    <li>Lieferadressen verwalten</li>
                    <li>Mühelos Lieferungen verfolgen</li>
                    <li>Auf unsere besten Preise zugreifen</li>
                  </ul>
                </div>
              </div>

              <div class="${ID}_HeroBanner__right">
                <a class="${ID}_HeroBanner__CTA" href="/register">
                  <span class="${ID}_HeroBanner__CTA__small">Erstellen Sie jetzt Ihren neuen</span>
                  <span>Geschäftsaccount</span>
                </a>

                <p><em>Sie sind bereits Kunde?</em></p>
                <p><a href="/login">Einloggen</a> oder <a href="/register">mit Kundennummer registrieren</a></p>
              </div>
            </div>
          </div>
        `;
        break;
      case 'CH':
        element.innerHTML = `
          <div class="container">
            <div class="col col-xs-12">
              <div class="${ID}_HeroBanner__left">
                <div class="${ID}_HeroBanner__USP">
                  <p>Mehr Funktionen mit einem Account...</p>
                  <ul>
                  ${USPs.map((usp, i) => `
                    <li class="${ID}_HeroBanner__USP__item ${i === 0 ? `${ID}_active` : ''}">
                      <div class="${ID}_HeroBanner__USP__img"><img src="${usp.img}" /></div>
                      <div class="${ID}_HeroBanner__USP__title">${usp.titleDE}</div>
                    </li>
                  `).join('')}
                  </ul>
                </div>

                <div class="${ID}_HeroBanner__secondaryUSP">
                  <p>Sie können auch...</p>
                  <ul>
                    <li>Nutzer & Budgets einrichten</li>
                    <li>Lieferadressen verwalten</li>
                    <li>Mühelos Lieferungen verfolgen</li>
                    <li>Auf unsere besten Preise zugreifen</li>
                  </ul>
                </div>
              </div>

              <div class="${ID}_HeroBanner__right">
                <a class="${ID}_HeroBanner__CTA" href="/register">
                  <span class="${ID}_HeroBanner__CTA__small">Erstellen Sie jetzt Ihren neuen</span>
                  <span>Geschäftsaccount</span>
                </a>

                <p><em>Sie sind bereits Kunde?</em></p>
                <p><a href="/login">Einloggen</a> oder <a href="/register">mit Kundennummer registrieren</a></p>
              </div>
            </div>
          </div>
        `;
        break;
      case 'FR':
        element.innerHTML = `
          <div class="container">
            <div class="col col-xs-12">
              <div class="${ID}_HeroBanner__left">
                <div class="${ID}_HeroBanner__USP">
                  <p>En créant un compte, vous pouvez…</p>
                  <ul>
                  ${USPs.map((usp, i) => `
                    <li class="${ID}_HeroBanner__USP__item ${i === 0 ? `${ID}_active` : ''}">
                      <div class="${ID}_HeroBanner__USP__img"><img src="${usp.img}" /></div>
                      <div class="${ID}_HeroBanner__USP__title">${usp.titleFR}</div>
                    </li>
                  `).join('')}
                  </ul>
                </div>

                <div class="${ID}_HeroBanner__secondaryUSP">
                  <p>Mais aussi…</p>
                  <ul>
                    <li>Administrer les utilisateurs et contrôler les budgets</li>
                    <li>Gérer vos adresses de livraison</li>
                    <li>Suivre vos commandes en toute facilité</li>
                    <li>Accédez à nos meilleurs prix</li>
                  </ul>
                </div>
              </div>

              <div class="${ID}_HeroBanner__right">
                <a class="${ID}_HeroBanner__CTA" href="/register">
                  <span class="${ID}_HeroBanner__CTA__small">Créez votre nouveau</span>
                  <span>compte professionnel maintenant</span>
                </a>

                <p><em>Déjà client?</em></p>
                <p><a href="/login">Connectez-vous</a> ou <a href="/register">inscrivez-vous avec votre numéro de client</a></p>
              </div>
            </div>
          </div>
        `;
        break;
      case 'SV':
        element.innerHTML = `
          <div class="container">
            <div class="col col-xs-12">
              <div class="${ID}_HeroBanner__left">
                <div class="${ID}_HeroBanner__USP">
                  <p>Gör mer med kontot…</p>
                  <ul>
                  ${USPs.map((usp, i) => `
                    <li class="${ID}_HeroBanner__USP__item ${i === 0 ? `${ID}_active` : ''}">
                      <div class="${ID}_HeroBanner__USP__img"><img src="${usp.img}" /></div>
                      <div class="${ID}_HeroBanner__USP__title">${usp.titleSE}</div>
                    </li>
                  `).join('')}
                  </ul>
                </div>

                <div class="${ID}_HeroBanner__secondaryUSP">
                  <p>Du kan även…</p>
                  <ul>
                    <li>Administrera användare och kontrollera budgetar</li>
                    <li>Hantera leveransadresser</li>
                    <li>Spåra leveranser enkelt</li>
                    <li>Få tillgång till våra bästa priser</li>
                  </ul>
                </div>
              </div>

              <div class="${ID}_HeroBanner__right">
                <a class="${ID}_HeroBanner__CTA" href="/register">
                  <span class="${ID}_HeroBanner__CTA__small">Skapa ditt nya</span>
                  <span>företagskonto nu</span>
                </a>

                <p><em>Är du redan kund?</em></p>
                <p><a href="/login">Logga in</a> eller <a href="/register">registrera dig med kundnummer</a></p>
              </div>
            </div>
          </div>
        `;
        break;
      default:
        break;
    }

    // Animation to loop through USPs
    const $ = window.jQuery;
    const els = element.querySelectorAll(`.${ID}_HeroBanner__USP__item`);
    const DELAY = 3000;
    let activeIndex = 0;
    const loop = () => {
      setTimeout(() => {
        // Set next visible USP to next element or first element if at the end
        const nextIndex = (activeIndex + 1) >= USPs.length ? 0 : activeIndex + 1;

        $(els[activeIndex]).fadeOut(300, () => {
          $(els[nextIndex]).fadeIn(500, () => {
            activeIndex = nextIndex; // Change active index
            loop(); // Animate next USP
          });
        });
      }, DELAY);
    };
    loop(); // Init

    this.component = element;
  }

  bindEvents() {
    const accountRegButton = this.component.querySelector(`.${ID}_HeroBanner__CTA`);
    accountRegButton.addEventListener('click', () => {
      events.send(ID, 'User clicked', `create-account - Variation ${VARIATION}`);
    });
  }
}
