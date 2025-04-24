import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as helpers from './lib/helpers';
import lightboxHtml from './lib/html/lightbox-html';

// dress: //www.sitegainer.com/fu/up/yuyg93y1k4rcje8.png

let $ = null;

const eventSender = utils.events.setDefaultCategory('IT008-V1');

let lightbox = null, slides = null;

let activeCountry = localStorage.getItem('it8-chosen-country');

if(!activeCountry) {
    const path = window.location.pathname;
    const matches = path.match(/^\/(\w+)\//i);
    if(matches && matches[1]) {
        if(matches[1] == 'eu' || matches[1] == 'us' || matches[1] == 'au') {
            activeCountry = matches[1];
        } else {
            activeCountry = 'uk';
        }
    } else {
        activeCountry = 'uk';
    }
}

/**
 * Entry point for experiment
 */
const run = () => {
    // Setup
    document.body.classList.add('IT008');

    // Draw
    addInitButton();
    drawLightbox();

    lightbox = $('.it8-lightbox');
    slides = lightbox.find('.it8-slide');

    // Prevent form submissions
    $('.it8-capture-form').on('submit', () => {
        return false;
    });

    // Lightbox opener clicked
    $('.it8-init-button').on('click', () => {
        eventSender.send(null, 'did-show-lightbox', '', {
            sendOnce: true    
        });
        showLightbox();
    });

    // Lightbox close clicked
    $('.it8-close-button, .it8-lightbox__bg').on('click', () => {
        eventSender.send(null, 'did-close-lightbox', '', {
            sendOnce: true    
        });
        hideLightbox();
    });
    $(document).on('keydown', (e) => {
        const keyCode = e.keyCode;
        if(keyCode == 27) {
            hideLightbox();
        }
    });

    // Country select
    const countrySelect = $('.it8-country-dropdown__select'),
        selectTitle = countrySelect.find('.it8-country-dropdown__select-title'),
        sizeBox = $('.it8-result-box__size'),
        selectOptions = countrySelect.find('.it8-country-dropdown__option');

    // Find my size clicked
    updateCountrySelectFlag(selectTitle, activeCountry);
    convertSizes(sizeBox, activeCountry);
    
    selectTitle.on('click', (e) => {
        eventSender.send(null, 'did-interact-with-country-select', '', {
            sendOnce: true    
        });
        countrySelect.toggleClass('it8-country-dropdown__select--active');
    });

    selectOptions.on('click', (e) => {
        const countryChosen = $(e.currentTarget).attr('data-value');

        if(countryChosen != activeCountry) {
            eventSender.send(null, 'did-change-country-sizes', '', {
                sendOnce: true    
            });
        }

        activeCountry = countryChosen;
        localStorage.setItem('it8-chosen-country', activeCountry);

        convertSizes(sizeBox, countryChosen);
        updateCountrySelectFlag(selectTitle, countryChosen);
        closeCountrySelect(countrySelect);
    });
    
    // Init slide transitions
    $('[data-load-slide]').on('click', (e) => {
        const targetString = $(e.currentTarget).attr('data-load-slide');

        goToSlide(slides, targetString);
    });

    // Calculate 
    $('.it8-find-my-size').on('click', () => {
        // Validate capture fields
        $('.it8-error-message').remove();
        $('.it8-capture-field').removeClass('it8-field-invalid');

        let valid = true;
        $('.it8-capture-field').each((idx, item) => {
            const thisValue = $(item).val();
            if(!thisValue) {
                $(item).addClass('it8-field-invalid');
                valid = false;
            }
        });

        if(!valid) {
            $('.it8-capture-form').prepend(`
                <p class="it8-error-message">Please ensure you have filled in all fields.</p>
            `);

            return false;
        }
        
        // Calculate the new value
        calculateSize(sizeBox);
        
        // Reset flag and convert sizes to currency
        updateCountrySelectFlag(selectTitle, activeCountry);
        convertSizes(sizeBox, activeCountry);

        // Move on
        goToSlide(slides, 'result');
    });

};

/**
 * Helper go to slide
 */
const goToSlide = (slides, targetString) => {
    const target = $(`[data-slide-identifier=${targetString}]`);

    eventSender.send(null, 'did-go-to-slide', targetString, {
        sendOnce: false    
    });

    slides.removeClass('it8-slide--active');
    target.addClass('it8-slide--active');
};

/**
 * Close country select
 */
const closeCountrySelect = (countrySelect) => {
    countrySelect.removeClass('it8-country-dropdown__select--active');
};

/**
 * Update chosen select
 */
const updateCountrySelectFlag = (selectTitle, targetCountry) => {
    const flag = selectTitle.find('.it8-flag-active');
    flag.attr('class', '');
    flag.addClass('it8-flag it8-flag-active it8-flag--' + targetCountry);
};

/**
 * Convert sizes and update UI
 */
const convertSizes = (sizeBox, targetCountry) => {
    const curSize = sizeBox.attr('data-value');
    if(targetCountry == 'uk') {
        sizeBox.text(curSize);
    } else {
        const countrySizes = helpers.ukSizeToCountrySize(curSize);
        if(countrySizes && countrySizes[targetCountry]) {
            sizeBox.text(countrySizes[targetCountry]);
        }
    }
};

/**
 * Calculate Sizes
 */
const calculateSize = (sizeBox) => {
    //! Tmp
    const waistValue = $('[name=it8-waist]').val(),
        hipsValue = $('[name=it8-hips]').val(),
        bustValue = $('[name=it8-bust]').val();

    var sizeCalculated = helpers.calculateSize(bustValue, waistValue, hipsValue);
    sizeBox.text(sizeCalculated);
    sizeBox.attr('data-value', sizeCalculated);

    eventSender.send(null, 'did-calculate-a-size', sizeCalculated, {
        sendOnce: false    
    });
}

/**
 * Helper add init button
 */
const addInitButton = () => {
    $('.product-size-guide').after(`
        <a class="it8-init-button it8-btn">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA/CAYAAABNY/BRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkI5NUU3NzBDQ0UxMUU4OTc0MEExNzAzNTlFNkNCMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkI5NUU3ODBDQ0UxMUU4OTc0MEExNzAzNTlFNkNCMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyQjk1RTc1MENDRTExRTg5NzQwQTE3MDM1OUU2Q0IwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYyQjk1RTc2MENDRTExRTg5NzQwQTE3MDM1OUU2Q0IwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Oo9BAwAAA+ZJREFUeNrsm09IVEEYwGdm1/DPCtlB8aIIQZGSHjwIGngw6iSoUBfpFGRlEFHdvHjoYodAUqMOEXSJIujUP6JD0YId1CwKgqiLsEEJrn9od2f6vsfbfKvbvnlv3sx7K36wu4/3Z+b95vtmvm++maVCCEIpJcXkU++tpkwm+915Du6dOfzm3FmiSfzUiQworFTBPCfqtz9JGohGUamTkR0kuzC7MAYk7uOZjoWeqVFK6FIszmYPvT7zI4gXWTwy0wmjUjMXvM8YjCCiBb4m4ZfwDCcL3VNJQsmLeDx2xyvYh57pISinD4o6meO5OtUGoU4/M999s+BijMU6oZJZ6cIIfRyviF0EP1ESilE2BPXeBpA62XLh3sGt59vfnpf3Mz60NoAODxpnvKa2NrH1OjYOvNg7MKWHsiC6+4w7lBBjayvpNjgcdIJwzp/7hGhUHs2gBbtUtAQamsbjiop4kwIIyoEgNNOqqKERAPqZzeSGVcwKn7X773v/fkaQjiBMzhoB1ctpVnWaWoNKj9ppVIXZUeHM3gi9a70qzHKEYFKqMHORMSHKkmowlCxGBaaypvqzEgy0xpMogGBstrqyklaCQSeFBYVuYoxdC2RyJluQRq0k3Ty/NEzY2oFw6Hqg0+awtINagWD3UaAwYWkHGvGCloQGqPu+Ya18k+0rnmGqEjXPDNuY5/qkYXCcRxs2qJmX2mDsGoyFN5jG0gtDyEdTMG4ZHmUYTPwZMrHfOuYzYcmydhiZqWtAU+QWE5qpN6UaTE/phRGkzRRM0RW0gDXTawxG8H5tMJiE05EfLmEFR7XB+GkpxUGgy2u/YR5KHzY9Pmezuf7AYWwTazENAw14KXAYzvlkGJ4TGxCmHqOBwVirXGC/ocUCHrTjCiOEuBxmXONFO8xldjkaqlY2icZlRjZWMpyAQqIQdaJ/y2ZyN3zD4MNGnaQ70AD2X88wdqcfiNq8AJfbi61i/xcGb4aHJqI4yUFLWUunJ6Rh4OaroThIee2MoBN3hbE8vRBjJOICTvyBK0xYnt6n79k20v7bO4M7leC4LGAc7qMZNx8V7J35evxeIio+xVNUvcX3WDDr6dVjUfIpXnyPpQgnDJxsJ2UqG6trBwtgKKHz5QrjXLi1YDDDj0sI5QaCm7f3Pz2VLoDBE4yxE37ToqGAEJqsTiSuFB2aUXDrOsy7T9uZkYaoRQK29czBwSsAuZvXSn5opqX+C4AjBXYw3B5lp2Zb7a3sHTpAbcv4Ap8le0NFSmaXrhSMmyDsn431fc7sY35fmCMvnb+Wsl94ybZ3688LLEat83sqq3457d9jvLYJs1PkrwADAPa+vqMksh/xAAAAAElFTkSuQmCC" />
            <span>Check the fit</span>
        </a>
    `);
};

/**
 * Helper draw lightbox
 */
const drawLightbox = () => {
    $('body').prepend(lightboxHtml);
};

/**
 * Helper get mid point window
 */
const positionLightboxAbsoluteOffset = () => {
    const lightboxContent = $('.it8-lightbox__content');
    lightboxContent.css({
        'top': (window.pageYOffset + window.innerHeight/2) + 'px'
    });
};

/**
 * Helper show lightbox
 */
const showLightbox = () => {
    lightbox.addClass('it8-lightbox--active');
    positionLightboxAbsoluteOffset();
};

/**
 * Helper hide lightbox
 */
const hideLightbox = () => {
    lightbox.removeClass('it8-lightbox--active');
};

// -----------------------------------------------------------
// Poll elements required
// -----------------------------------------------------------
const poller = UC.poller([
    () => !!window.jQuery
], () => {
    utils.fullStory('IT008-V1', 'Variant 1');

    $ = window.jQuery;

    run();
}); 
