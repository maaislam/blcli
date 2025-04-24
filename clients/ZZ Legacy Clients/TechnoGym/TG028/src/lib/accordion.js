import {cacheDom} from '../../../../../lib/cache-dom';

class Accordion {
    /**
     * @param {NodeList} accordion
     */
    constructor(accordionItems) {
        this.accordionItems = accordionItems;
    }

    /**
     * Add event callback
     */
    addEventCallback(event, fn) {
        this[event] = fn;
    }

    /**
     * Init
     */
    init() {
        [].forEach.call(this.accordionItems, (item) => {
            const heading = item.querySelector('.tg28-accordion__heading');
            if(heading) {
                heading.addEventListener('click', (e) => {
                    if(e.currentTarget.parentNode.classList.contains('tg28-accordion-item--active')) {
                        e.currentTarget.parentNode.classList.remove('tg28-accordion-item--active');
                    } else {
                        [].forEach.call(this.accordionItems, (jtem) => {
                            jtem.classList.remove('tg28-accordion-item--active');
                        });

                        if(typeof this.willShow == 'function') {
                            this.willShow(item);
                        }

                        e.currentTarget.parentNode.classList.add('tg28-accordion-item--active');
                    }
                });
            }
        });
    }
}

export default Accordion;
