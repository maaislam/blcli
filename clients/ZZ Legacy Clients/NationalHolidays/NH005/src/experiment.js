import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as helpers from './lib/helpers';
import reviewsHtml from './lib/html/reviews';
import additionalInfo from './lib/html/additional-info';

window._NH005 = (function () {
    let $ = null;

    const eventSender = utils.events.setDefaultCategory('NH005---Seating Plan Improvements');

    utils.events.setTrackerName('tracker2');

    /**
     * Entry point for test 
     */
    const run = () => {
        document.body.classList.add('nh005');

        eventSender.send(null, 'did-redesign-page');

        // -----------------------------------------------------------
        // Page Title
        // -----------------------------------------------------------
        $('.main-content .inner-content h1 span').text('Reserve your seat');
        
        // -----------------------------------------------------------
        // Page layout / restructure
        // -----------------------------------------------------------
        $('.content > .left > .box-with-border:first').removeClass('box-with-border').addClass('nh5-left-box');
        
        // -----------------------------------------------------------
        // Reviews
        // -----------------------------------------------------------
        $('.content > .left').prepend(reviewsHtml);

        $('.nh5-reviews').slick({ });
        
        // -----------------------------------------------------------
        // Overview
        // -----------------------------------------------------------
        $('.nh5-left-box h2:first').text('1. Seat preference');
        $('.nh5-left-box p:first').text('Choose your preferred seats now.');
        $('.nh5-left-box hr:first').remove();

        // -----------------------------------------------------------
        // Update Remaining pax
        // -----------------------------------------------------------
        $('.nh5-left-box p:first').after(`
            <span class="nh5-pax-placeholder nh5-hide""></span>
            <div class="nh5-remaining-pax-wrap"></div>
        `);

        const remainingPax = $('#remainingPax');

        remainingPax.parent().addClass('nh5-hide');

        helpers.generateRemainingPaxText(helpers.getRemainingPassengers(remainingPax));

        // Connect observer which listens for changes to remaining passengers value
        UC.observer.connect(remainingPax, function() {
            helpers.generateRemainingPaxText(helpers.getRemainingPassengers(remainingPax));
        }, {
            config: {attributes: true, childList: true, subtree: false},
            throttle: 20
        });
        
        // -----------------------------------------------------------
        // Additional info box
        // -----------------------------------------------------------
        $('.nh5-left-box').after(additionalInfo);
        
        // -----------------------------------------------------------
        // Live chat
        // -----------------------------------------------------------
        $('.nh5-init-live-chat').on('click', () => $('.header-left img:first')[0].click());
        
        // -----------------------------------------------------------
        // Modify the coach seating
        // -----------------------------------------------------------
        if(window.innerWidth <= 1025) {
            // Tranpose seats for smaller devices, we create vertical seat selector
            helpers.transposeSeats($('.right-side-coach'));
            helpers.transposeSeats($('.left-side-coach'));

            eventSender.send(null, 'did-show-vertical-seat-selector');
        } else {
            eventSender.send(null, 'did-show-horizontal-seat-selector');
        }

        $('.seat-block').wrap('<div class="nh5-seating-wrapper">');

        $('.nh5-seating-wrapper').prepend(`
            <div class="nh5-seating-front">
                <img class="nh5-seating-wheel" width="31" height="44" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/f2783c1aa93fc001c781ed1a38abee77_seat-wheel-mobile.png" />
            </div>
        `);

        $('.nh5-seating-wrapper').prepend(`
            <span class="nh5-seating-wrapper__text nh5-seating-wrapper__front-text">Front</span>
        `);

        $('.nh5-seating-wrapper').append(`
            <span class="nh5-seating-wrapper__text nh5-seating-wrapper__back-text">Back</span>
        `);

        $('.nh5-seating-wrapper').prepend(`
            <div class="nh5-availability-key nh5-availability-key--vertical">
                <span class="nh5-key nh5-key--available"></span>
                <span class="nh5-availability-text">Seat available</span>
                <span class="nh5-key nh5-key--reserved"></span>
                <span class="nh5-availability-text">Your reserved seat</span>
                <span class="nh5-key nh5-key--taken"></span>
                <span class="nh5-availability-text">Seat taken</span>
            </div>
        `);

        $('.nh5-seating-wrapper').after(`
            <div class="nh5-availability-key nh5-availability-key--horizontal">
                <div class="nh5-key-wrap">
                    <span class="nh5-key nh5-key--available"></span>
                    <span class="nh5-availability-text">Seat available</span>
                </div>
                <div class="nh5-key-wrap">
                    <span class="nh5-key nh5-key--reserved"></span>
                    <span class="nh5-availability-text">Your reserved seat</span>
                </div>
                <div class="nh5-key-wrap">
                    <span class="nh5-key nh5-key--taken"></span>
                    <span class="nh5-availability-text">Seat taken</span>
                </div>
            </div>
        `);
        
        // ---------------------------------------------------------------------
        // On seat selection, show numbers
        // ---------------------------------------------------------------------
        $('.nh5-seating-wrapper').on('click', '.seat', (e) => {
            // Bind order of click to seats
            const thisSeat = $(e.currentTarget);
            if(!thisSeat.hasClass('selected')) {
                thisSeat.removeAttr('data-nh5seatnum');
            } else {
                if(!thisSeat.attr('data-nh5seatnum')) {
                    thisSeat.attr('data-nh5seatnum', '');
                }

                const numberedSeats = $('.nh5-seating-wrapper .seat[data-nh5seatnum]');

                const numbersAllocated = [];
                numberedSeats.each((idx, item) => {
                    const $item = $(item),
                        seatNum = $item.attr('data-nh5seatnum');

                    if(seatNum) {
                        numbersAllocated.push(parseInt(seatNum,10));
                    }
                });

                numberedSeats.each((idx, item) => {
                    const tIndex = idx + 1;
                    if(numbersAllocated.indexOf(tIndex) == -1) {
                        thisSeat.attr('data-nh5seatnum', tIndex);
                    }
                });
            }

            setSeatNums();
        });

        /**
         * Helper set content based on seat num
         */
        const setSeatNums = () => {
            const seats = $('.nh5-seating-wrapper .seat');
            seats.each((idx, item) => {
                const $item = $(item),
                    seatNum = $item.attr('data-nh5seatnum');
                if(seatNum) {
                    $item.html('<span class="nh5seatnum">' + seatNum + '</span>');
                } else {
                    $item.html('');
                }
            });
        };

        // ---------------------------------------------------------------------
        // Scroll on remaining pax - sticky message
        // ---------------------------------------------------------------------
        const remainingPaxMsg = $('.nh5-remaining-pax-wrap'),
            seatArea = $('.choose-seat'),
            paxMsgTop = remainingPaxMsg.offset().top,
            seatAreaBottom = seatArea.offset().top + seatArea.outerHeight() - 200;

        $(window).on('scroll', () => {
            if(window.innerWidth < 1025) {
                const st = $(window).scrollTop();

                if(st >= paxMsgTop && st < seatAreaBottom) {
                    remainingPaxMsg.addClass('nh5-remaining-pax-wrap--sticky');
                    $('.nh5-pax-placeholder').removeClass('nh5-hide');
                } else {
                    remainingPaxMsg.removeClass('nh5-remaining-pax-wrap--sticky');
                    $('.nh5-pax-placeholder').addClass('nh5-hide');
                }
            }
        });
        
        // ---------------------------------------------------------------------
        // On orientation change reload to force rebuild of test
        // ---------------------------------------------------------------------
        window.addEventListener('orientationchange', (e) => {
            eventSender.send(null, 'did-change-device-orientation');
            window.location.reload();
        });

    };

    // -----------------------------------------------------------
    // Poll conditions for running test
    // -----------------------------------------------------------
    UC.poller([
        '.inner-content h1',
        '#seatIds',
        '.main-content .content .left',
        '.main-content .content .right',
        '#Booking .content .choose-seat .seat-area .seat-block .seat',
        '.choose-seat',
        () => {
            return !!window.jQuery;
        },
        () => {
            return !!window.ga;
        }
    ], () => {
        $ = window.jQuery;

        utils.fullStory('NH005', 'Variation 1');

        run();
    });
})();
