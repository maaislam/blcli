import { events, pollerLite } from "../../../../../lib/utils";
import { getSiteFromHostname } from "./services";
import shared from "./shared";

const { ID, VARIATION } = shared;

// V1: Menu, Search, Logo, Stores, Bag
    //V2: Home, Search, Menu, Live Chat/store , Bag
const menuLinksV1 = {
    'Menu': {
    },
    'Search': {
    },
    'Home': {
        link: '/',
    },
    'Stores': {
        link: 'https://www.ernestjones.co.uk/webstore/secure/storeLocator.sdo?icid=ej-tn-topbar-store',
    },
    'Bag': {
        link: '/webstore/showbasket.sdo',
    },
}

const menuLinksV2 = {
    'Home': {
        link: '/',
    },
    'Search': {
        icon: '',
    },
    'Menu': {
    },
    'Live chat': {
    },
    'Stores': {
        link: 'https://www.ernestjones.co.uk/webstore/secure/storeLocator.sdo?icid=ej-tn-topbar-store',
    },
    'Bag': {
        link: '/webstore/showbasket.sdo',
    },
}

export default class BottomMenu {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }

  
    create() {
        let menuLinks;
        if(VARIATION === '1') {
            menuLinks = menuLinksV1;
        } else if(VARIATION === '2') {
            menuLinks = menuLinksV2;
        }
        
        const element = document.createElement('div');
        element.classList.add(`${ID}_bottomMenu`);
        element.innerHTML = `
        <div class="${ID}-menuInner">
            <div class="${ID}-menuLinks"></div>
        </div>
        `;
        this.component = element;

        // add links
        Object.keys(menuLinks).forEach((i) => {
            const data = menuLinks[i];
            const link = document.createElement('a');
            const linkName = [i][0].replace(/\s/g, '').toLowerCase();

            if(data.link) {
                link.setAttribute('href', data.link);
            }

            link.classList.add(`${ID}-link`);
            link.classList.add(`${ID}-${linkName}`);
            link.innerHTML = `
            <span class="${ID}-icon"></span>
            <p>${[i][0]}</p>`;

            element.querySelector(`.${ID}-menuLinks`).appendChild(link);
        });
      
    }
  
    bindEvents() {
      const { component } = this;

      /* Icon events */

        // menu
        const navigationTrigger = document.querySelector('#js-main-nav-toggle');
        const menuIcon = component.querySelector(`.${ID}-link.${ID}-menu`);

        const promoMessage = document.querySelector('.promotion-messages');
        menuIcon.addEventListener('click', () => {
            navigationTrigger.click();
            promoMessage.style = 'position: absolute';
        });

        // get bag number
        if(getSiteFromHostname() === 'ernestjones') {
            const bagItems = document.querySelector('.header__bag .shopping-bag__count');
            const bagIcon = component.querySelector(`.${ID}-link.${ID}-bag .${ID}-icon`);
            if(bagItems && bagItems.textContent.trim() !== '0') {
                bagIcon.insertAdjacentHTML('afterbegin', `<div class="${ID}-bag-count"><span>${bagItems.textContent.trim()}</span></div>`)
            }
        }


        // show live chat or store on V2
        if(VARIATION === '2') {

            const storeIcon = component.querySelector(`.${ID}-link.${ID}-stores`);
            const chatIcon = component.querySelector(`.${ID}-link.${ID}-livechat`);

            // if live chat is visible
            pollerLite(['.js-live-chat-toggle', '.js-live-chat-toggle.js-live-chat-toggle--visible'] , () => {
                const liveChat = document.querySelector('.js-live-chat-toggle.js-live-chat-toggle--visible');
                storeIcon.style.display = 'none';
                chatIcon.style.display = 'flex';
                    chatIcon.addEventListener('click', () => {
                        liveChat.click();
                    });
            });  
            
            if(!document.querySelector('.js-live-chat-toggle.js-live-chat-toggle--visible')) {
                chatIcon.style.display = 'none';
                storeIcon.style.display = 'flex';
            } 
        }


        const allIcons = component.querySelectorAll(`.${ID}-link`);
        for (let index = 0; index < allIcons.length; index++) {
            const element = allIcons[index];
            const elName = element.querySelector('p').textContent;
            element.addEventListener('click', () => {
                events.send(`${ID} variation: ${VARIATION}`, 'click', `menu item: ${elName}`);
            });
            
        }
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
    }
  }