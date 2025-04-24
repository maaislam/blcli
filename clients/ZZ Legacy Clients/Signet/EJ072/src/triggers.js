/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(document.location.href.indexOf('https://www.ernestjones.co.uk/webstore/l/') > -1) {
    pollerLite([
        'body',
        '.browse__header-section',
        '.js-modal-trigger',
        '.filters-panel__refinement-link',
        '.page-heading',
        () => {
            return !!window.digitalData.page.category.primaryCategory
        },
        () => {
            return !!window.jQuery;
        }, 
        () => {
            if(window.digitalData.page.category.subCategory1 === 'Rings')  {
                return true;
            } else if(window.digitalData.page.category.primaryCategory === 'Jewellery')  {
                return true;
            } else if(window.digitalData.page.category.primaryCategory === 'Watches')  {
                return true;
            }
        }
    ], () =>{
        activate();
    });
}

pollerLite([
    'body',
    '.browse__header-section',
    '.js-modal-trigger',
    '.filters-panel__refinement-link',
    '.page-heading',
], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('EJ027');
                    if(document.querySelector('.EJ072-filters-inner')) {
                        document.querySelector('.EJ072-filters-inner').remove();
                    }
                    if(document.location.href.indexOf('https://www.ernestjones.co.uk/webstore/l/') > -1) {
                        pollerLite([
                            'body',
                            '.browse__header-section',
                            '.js-modal-trigger',
                            '.filters-panel__refinement-link',
                            '.page-heading',
                            () => {
                                return !!window.digitalData.page.category.primaryCategory
                            },
                            () => {
                                return !!window.jQuery;
                            }, 
                            () => {
                                if(window.digitalData.page.category.primaryCategory === 'Jewellery')  {
              
                                    return true;
                                }
                                else if(window.digitalData.page.category.subCategory1 === 'Rings')  {
                        
                                    return true;
                                } else if(window.digitalData.page.category.primaryCategory === 'Watches')  {
               
                                    return true;
                                }
                            }
                        ], activate);
                    }
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(bodyList, config);
});






