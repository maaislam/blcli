import shared from './shared';
const { ID, VARIATION } = shared;

const accountLink = () => {
    return `
    <div class="w-1/2 mb-2 md:w-1/3 order-8">
        <div class="iconBox ${ID}-dropdown">
            <div class="iconBox__link">
                <div class="iconBox__container">
                <div class="iconBox__icon">
                    <img src="/img/account.e5e67b1f.svg" alt="Your profile" class="iconBox__image iconBox__image--svg">
                </div>
                <p class="iconBox__label">Your profile</p>
                </div>
            </div>
            <div class="${ID}-dropdown__options">
                <div class="iconBox ${ID}-dropdown__option" data-event-label="Your Addresses"><a href="/account/addresses" class="iconBox__link mb-1" target="_self"><div class="iconBox__container"><div class="iconBox__icon"><img src="/img/address.e30c5185.png" alt="Addresses" class="iconBox__image"></div><p class="iconBox__label">Your addresses</p><!----><!----></div></a></div>
                <div class="iconBox ${ID}-dropdown__option" data-event-label="Account details"><a href="/account/manage-account" class="iconBox__link" target="_self"><div class="iconBox__container"><div class="iconBox__icon"><img src="/img/manage-account.287ca97f.png" alt="Account details" class="iconBox__image"></div><p class="iconBox__label">Account details</p><!----><!----></div></a></div>
            </div>
        </div>
    </div>
    `;
};

export default () => {
    return `
    ${accountLink()}
    `;
};