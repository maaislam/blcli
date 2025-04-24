import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import MenuParser from './lib/menuparser.js';
import newMenu from './lib/config/new-menu.js';

// ----------------------------------------------------------------
// Entry point for test
// ----------------------------------------------------------------
const run = () => {
    var $ = JQSG;
    document.body.classList.add('bi003');

    // Flag
    let didInteractWithMenu = false;

    // Full Story
    utils.fullStory('BI003', 'Variation 1');

    // Event sending
    const eventSender = utils.events.setDefaultCategory('BI003---Navigation Design');

    // Append menu to page, replacing existing
    const parser = new MenuParser();
    const parsedMenu = parser.parseMenu(newMenu);
    const menuHtml = parser.menuJsonToHtml(parsedMenu);

    document.querySelector('.page-header .meganav').parentNode.innerHTML = menuHtml;

    // Map menu to view all 
    const viewAlls = {
        'biscuits': [
            '/biscuits',
            'View all Biscuits'
        ],
        'sendagift': [
            '/send-a-gift',
            'View all Gifts'
        ],
        'christmas': [
            '/christmas-gifts-by-biscuiteers',
            'View all Christmas'
        ],
        'chocolates': [
            '/chocolates',
            'View all Chocolates'
        ],
        'cakes': [
            '/cakes-and-cupcakes',
            'View all Cakes'
        ],
        'blog': [
            '/blog',
            'View Blog'
        ]
    };

    // Level 1 links
    const topLevelLinks = document.querySelectorAll('.bi3_level1-link');
    [].forEach.call(topLevelLinks, (item) => {
        // Bind event listeners to first level links
        item.addEventListener('mouseover', () => {
            item.querySelector('.bi3_menu-list__level2').classList.add('bi3_menu-list--active');
            item.querySelector('.bi3_level2').classList.add('bi3_level2--active');

            if(!didInteractWithMenu) {
                eventSender.send(null, 'did-interact-with-menu');
                didInteractWithMenu = true;
            }
        });
        item.addEventListener('mouseout', () => {
            JQSG(item.querySelector('.bi3_menu-list__level2')).removeClass('bi3_menu-list--active');
            JQSG(item.querySelector('.bi3_level2')).removeClass('bi3_level2--active');
        });

        const level3List = item.querySelector('.bi3_menu-list__level3'),
            level2 = item.querySelector('.bi3_level2');

        // Append a 'view all' link to those lists that have it
        const identifier = item.dataset['bi3ident'];
        if(identifier && viewAlls[identifier]) {
            level2.insertAdjacentHTML('beforeend', `
                <li class="bi3_level2-link bi3_level2-link--view-all">
                    <a href="${viewAlls[identifier][0]}">${viewAlls[identifier][1].toLowerCase()}</a>
                </li>
            `);
        }

        // Ensure equal heights (owing to markup we use pos absolute hence fix)
        const level3ListHeight = getComputedStyle(level3List)['height'],
            level2Height = getComputedStyle(level2)['height'];

        if(parseInt(level2Height) < parseInt(level3ListHeight)) {
            level2.style['height'] = level3ListHeight;
        }
    });

    // Level 2 links change menu
    [].forEach.call(document.querySelectorAll('.bi3_level2-link'), (item) => {
        if(item.classList.contains('bi3_level2-link--view-all')) {
            return;
        }

        item.addEventListener('mouseover', (e) => {
            const allNodes = e.currentTarget.parentNode.children;
            [].forEach.call(allNodes, (child) => {
                if(child && child.classList) {
                    JQSG(child).removeClass('bi3_level2-link--active');
                }
            });
            e.currentTarget.classList.add('bi3_level2-link--active');
        });
    });

    eventSender.send(null, 'menu-did-load'); 

    // Hide menu when link clicked (asynchronous page views)
    $('.bi3_level3-link a, .bi3_level2-link--view-all a').on('click', function() {
        $('.bi3_menu-list__level2').removeClass('bi3_menu-list--active');
        $('.bi3_level2').removeClass('bi3_level2--active');
    });

    // Checkout hide menu
    // Async request so we poll
    setInterval(function() {
        if(window.location.pathname.match(/checkout/)) {
            $('html').addClass('bi3-checkout');
        } else {
            $('html').removeClass('bi3-checkout');
        }
    }, 1000);
};

// ----------------------------------------------------------------
// Poll required elements
// ----------------------------------------------------------------
UC.poller([
    '.page-header .meganav',
    function() {
        return !!window.JQSG;
    }
], run);
