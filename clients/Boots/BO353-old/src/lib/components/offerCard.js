import { formatExpiryDate } from '../helpers/utils';

const offerCard = (id, item) => {
  const html = `
      <div class="oct-tile__content ${id}__card" data-attr="${item.status === 'applied' ? 'applied' : 'missing'}">
        <div class="oct-advantage-card-offer__wrapper"
             data-element="Basket - Your advantage card offer"
             data-promoid="${item.code}"
             data-promo-status="${item.status}">
            <div class="oct-advantage-card-offer__savings">
                <p class="oct-text oct-text--standard oct-text--size_s oct-advantage-card-offer__text"
                   data-testid="text">${item.description}</p>
                <div class="oct-advantage-card-offer__savings-cta">
                    <p class="oct-text oct-text--bold oct-text--size_xxs ${
                      item.status === 'applied'
                        ? 'oct-advantage-card-offer__type--applied'
                        : 'oct-advantage-card-offer__type--missed'
                    }"
                       data-testid="text">${item.status}</p>
                    <a href="${item.promotionURL ? item.promotionURL : '/'}"
                       class="oct-link oct-link--theme-text oct-color--boots-blue oct-advantage-card-offer__link"><svg
                             width="16"
                             height="16"
                             xmlns="http://www.w3.org/2000/svg"
                             role="img"
                             class="oct-icon oct-advantage-card-offer__icon"
                             aria-hidden="true"
                             aria-label=""
                             style="height: 20px; width: 20px; fill: black;">
                            <path d="M4.724 1 12 8l-7.276 7L4 14.303 10.552 8 4 1.697z"
                                  fill="unset"
                                  fill-rule="evenodd"></path>
                        </svg></a>
                </div>
            </div>
            <div class="oct-advantage-card-offer__expiry">
                ${
                  item.numberOfUsesLeft
                    ? `
                    <p class="oct-text oct-text--light oct-text--size_xs oct-advantage-card-offer__expiry-text"
                        data-testid="text">You can use this offer ${
                          item.numberOfUsesLeft
                        } more time after this use. This offer expires ${formatExpiryDate(item.expiryDate)}
                    </p>
                    `
                    : ''
                }
                
            </div>
        </div>
    </div>
  `;

  return html.trim();
};

export default offerCard;
