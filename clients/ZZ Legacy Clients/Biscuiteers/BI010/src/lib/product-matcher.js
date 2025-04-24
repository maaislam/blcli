import * as UC from '../../../../../lib/uc-lib';
import * as utils from '../../../../../lib/utils';
import numBiscuitsJson from './num-biscuits-json';

/**
 * Match product titles against conditions that determine
 * some text to show
 */
const productMatcher = (() => {

    /**
     * Grab the number of products from our json
     *
     * This is the number of specific items against a product that 
     * is more detailed than the generic 'extra' text  below
     */
    const grepNumProducts = (productTitle) => {
        const value = numBiscuitsJson[productTitle.trim().toLowerCase()];

        if(value && !value.match(/chocolates/)) {
            if(value.trim() == '1') {
                return value.trim() + ' biscuit';
            } else {
                return value.trim() + ' biscuits';
            }
        }

        return value || false;
    };

    /**
     * Match products and set corresponding text
     */
    const tests = [
        {
            type: 'size',
            text: 'Biscuit Card Box',

            /**
             * Biscuit boxes have 'biscuit box' in title
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/biscuit box/i);
            }
        },

        {
            type: 'size',
            text: 'Biscuit Card',

            /**
             * Biscuit boxes have 'biscuit box' in title
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/card/i);
            }
        },

        {
            type: 'size',
            text: 'Biscuit Hamper',
            extra: 'Biscuits & bottle of fizz',

            /**
             * Hampers contain 'hamper' in title
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/hamper/i);
            }
        },

        {
            type: 'size',
            text: 'Jolly Gingers',
            extra: '2 biscuits',

            /**
             * Multiple jolly gingers
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/jolly gingers/i);
            }
        },

        {
            type: 'size',
            text: 'Jolly Ginger',
            extra: '1 biscuit',

            /**
             * Single jolly ginger
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/jolly ginger/i);
            }
        },

        {
            type: 'size',
            text: 'Tin',

            /**
             * Biscuit tins contain 'biscuit tin' in title but not
             * 'luxe' biscuit tin in title 
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/^((?!luxe).)+\sbiscuit\stin/i);
            }
        },

        {
            type: 'size',
            text: 'Luxe biscuit tin',

            /**
             * Luxe biscuit tins contain luxe biscuit tin in title
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/luxe biscuit tin/i);
            }
        },

        {
            type: 'size',
            text: 'Chocolates',

            /**
             * Chocolates
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/chocolates|chocs/i);
            }
        },

        {
            type: 'size',
            text: 'Book',

            /**
             * Chocolates
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/book/i);
            }
        },

        {
            type: 'size',
            text: 'Gift Certificate',

            /**
             * Chocolates
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/gift certificate/i);
            }
        },

        {
            type: 'size',
            text: 'Icing Kit',

            /**
             * Chocolates
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/icing kit/i);
            }
        },

        {
            type: 'size',
            text: 'Cake',

            /**
             * Chocolates
             */
            execute(productTitle) {
                return !!productTitle.trim().match(/cake/i);
            }
        },

        {
            type: 'glutenfree',
            text: 'Gluten Free Available',

            /**
             * Match specific products by name known to be Gluten Free
             */
            execute(productTitle) {
                return productTitle.trim().match(/gluten free/i);
            }
        }

    ];

    return {
        /**
         * Test a product title against different matching texts
         */
        matchProduct(productTitle) {
            const results = [], matchingTypes = [];

            tests.forEach((test, idx) => {
                const testDidPass = test.execute(productTitle);

                if(testDidPass && matchingTypes.indexOf(test.type) === -1) {
                    const testData = Object.assign({}, test);

                    if(test.type == 'size') {
                        const numProducts = grepNumProducts(productTitle);
                        if(numProducts) {
                            testData.numProducts = numProducts;
                        }
                    }

                    results.push(testData);
                    matchingTypes.push(test.type);
                }
            });

            return results;
        }
    };
})();

export default productMatcher;

