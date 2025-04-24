/**
 * This experiment brings TG013 onto the newsroom page
 * The tg013 experiment has been brought into this test and modified
 */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import TG013 from './lib/tg013';
import * as categoriesHtml from './lib/html/categories';

let $ = null;

// Event sender
const eventSender = utils.events.setDefaultCategory('TG033--Navigation-Newsroom');

/**
 * Helper detect language
 */
const getLanguage = () => {
    return window.location.pathname.match(/it|gb/);
};

/**
 * Entry point for experiment
 */
const run = () => {
    const lang = getLanguage();
    if(!lang) {
        throw "TG033 Should only run for given languages.";
    }

    TG013();  

    // We have to manually add categories in, as they don't exist on the newsroom
    const catTable = $('#TG033_categories_table'),
        catTableRows = catTable.find('tr');

    if(catTable.length > 0 && catTableRows.length == 0) {
        catTable.html(categoriesHtml[lang]);
    }
};

// -----------------------------------------------------------
// Poll elements required for *all* tests
// -----------------------------------------------------------
const poller = UC.poller([
    () => !!window.jQuery,
    '.header-container',
    '#navbar-top'
], () => {
    utils.fullStory('TG033---Navigation-on-Newsroom', 'Variant 1');

    $ = window.jQuery;

    run();
}); 
