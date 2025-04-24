/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-stock', '.product-name', '#basketForm', '.email-sign-up',
    () => {
        return !!window.digitalData.product[0].price.currentPrice;
    },
    () => {
        if(window.digitalData.product[0].price.currentPrice > 99.99) {
            return true;
        }
    },
    () => {
        return !!window.digitalData.product[0].productInfo.brand
    },
    () => {
        const brands = ['BOSS', 'Casio', 'Citizen', 'Coach', 'Daniel Wellington', 'DKNY', 'Dreyfuss & Co', 'Emporio Armani', 'Eterna', 'Folli Folli', 'Fossil', 'Gc', 'Jean Pierre', 'Kate Spade New York', 'Links of London', 'Marc Jacob', 'Michael Kors', 'Michael Kors Access', 'Movado', 'MVMT', 'Olivia Burton', 'Paul Smith', 'Rebecca Minkoff', 'Roame', 'Rotary', 'Seiko', 'Shinola', 'Skagen', 'Swarovski', 'Thomas Sabo', 'Timex', 'Tissot', 'Tommy Hilfiger', 'Tory Burch', 'TW Steel', 'Versace', 'Vivienne Westwood', 'William L', 'Wittnauer'];
        const brandData = window.digitalData.product[0].productInfo.brand;
    
        if(brands.indexOf(brandData) > -1) {
            return true
        }
    },
], 
activate);
