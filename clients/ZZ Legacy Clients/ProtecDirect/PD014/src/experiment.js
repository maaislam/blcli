import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as helpers from './lib/helpers.js';
import menuAim from './lib/menuaim.js';
import categoriesJson from './lib/config/categories.js';
import azJson from './lib/config/a-z.js';
import brandsJson from './lib/config/brands.js';

// ---------------------------------------------------------------------
// Set up
// ---------------------------------------------------------------------
let $ = null;
const eventSender = utils.events.setDefaultCategory('PD014---Navigation Redesign');

const run = () => {
    // ---------------------------------------------------------------------
    // Init
    // ---------------------------------------------------------------------
    $ = window.jQuery;

    if(utils.isTouchDevice() || document.body.classList.contains('pd014')) {
        // Bail out as per TP011
        return;
    }

    document.body.classList.add('pd014');

    // ---------------------------------------------------------------------
    // Set up plugins
    // ---------------------------------------------------------------------
    menuAim($);

    $.fn.filterVisible = function() {
        return this.filter(function() {
            return $(this).css('display') !== 'none' && $(this).children().length > 0;
        });
    };

    // ---------------------------------------------------------------------
    // Build navs
    // ---------------------------------------------------------------------
    const nav = helpers.buildNav(categoriesJson);
    if(nav) {
        // Main Nav (and overall structure)
        $('<div class="pd14_overlay"></div>').prependTo('body');
        $('#nav_main').hide().before(nav);

        // A-Z Nav
        var aToZNav = helpers.buildAtoZNav(azJson);
        if(aToZNav) {
            nav.find('#pd14_az-listing').append(aToZNav);

            // A-Z nav search
            helpers.buildAtoZSearch();
        }

        // Build brands
        helpers.buildBrandsMenu(brandsJson);
    }
    
    // ---------------------------------------------------------------------
    // Move search bar into the nav region
    // ---------------------------------------------------------------------
    $('.manage_users.search').appendTo($('.pd14_nav'));
    $('#nav_secondary').hide();
    
    // ---------------------------------------------------------------------
    // Events
    // ---------------------------------------------------------------------
    sendEvents();
};

/**
 * Send events
 */
const sendEvents = () => {
    $('.pd14_az-all-groups a').on('click', () => eventSender.send(null, 'clicked-a-z-page-link'));
    $('.pd14_level1 > li > a').on('click', () => eventSender.send(null, 'clicked-categories-page-link', 'level1'));
    $('.pd14_level2-link').on('click', () => eventSender.send(null, 'clicked-categories-page-link', 'level2'));
    $('.pd14_level3 > li > a').on('click', () => eventSender.send(null, 'clicked-categories-page-link', 'level3'));
    $('#pd14_brands .pd14_megamenu a').on('click', () => eventSender.send(null, 'clicked-brands-page-link'));
    $('.pd14_az-quick-link').on('click', () => eventSender.send(null, 'clicked-a-z-quick-link'));
};

// ---------------------------------------------------------------------
// Poll required elements
//
// Test relies on redesigned header PD005 / PD006 existing
// ---------------------------------------------------------------------
let poller = UC.poller([
    () => {
        return document.querySelector('.PD006 #nav_main') || document.querySelector('.PD005 #nav_main');
    },
    () => !!window.jQuery
], () => {
    utils.fullStory('PD014---Navigation Redesign', 'Variant 1');

    run();
}); 
