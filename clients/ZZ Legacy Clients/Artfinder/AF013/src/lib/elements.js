const basketCountElement = document.querySelector('._js-update-basket-count');
const basketCountElementReact = document.querySelector('#navbar-basket-dropdown');

const basketViewElement = document.querySelector('.js-basket-dropdown ul');
const basketViewElementReact = document.querySelector('.nav-item.basket .dropdown-menu');

export default {
    basketButtonMobile: document.querySelector('.top-bar-section .title-bar-right.hide-for-large-up li.basket'),
    basketView: {
        desktop: basketViewElement ? basketViewElement : basketViewElementReact ? basketViewElementReact : null,
    },
    basketMain: {
        orderSummary: document.querySelector('.af-box.mt0.mcb'),
        sidebarBox: document.querySelector('.medium-7.small-12.medium-pull-5.column .af-box.mt0.mcb')
    },
    basketCount: basketCountElement ? basketCountElement : basketCountElementReact ? basketCountElementReact : null 
}