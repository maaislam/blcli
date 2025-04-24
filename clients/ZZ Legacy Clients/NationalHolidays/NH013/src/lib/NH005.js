const NH005 = () => {
  (function() {
    'use strict';
  
  
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
    var createPollingElement = function createPollingElement(_ref) {
        var elm = _ref.elm,
            maxDuration = _ref.maxDuration;
        return {
            elm: elm,
            maxDuration: maxDuration,
  
            expressionValidator: function expressionValidator(expr) {
                if (!expr) {
                    throw Error('Invalid poller expression');
                }
  
                var type = typeof expr === 'undefined' ? 'undefined' : _typeof(expr);
  
                switch (type) {
                    case 'function':
                        return !!expr.call();
                    case 'string':
                        return !!document.querySelector(expr);
                }
  
                return true;
            },
  
  
            destroy: function destroy() {
                if (this.winTimeout) {
                    clearTimeout(this.winTimeout);
                }
            },
  
  
            poll: function poll(delay, multiplier, successCallback, timeoutCallback) {
                var _this = this;
  
                if (!this.startedAt) {
                    this.startedAt = new Date().getTime();
                }
  
                var exceedsMaxDuration = this.maxDuration ? this.startedAt + this.maxDuration < new Date().getTime() : false;
  
                if (exceedsMaxDuration) {
                    if (typeof timeoutCallback === 'function') {
                        timeoutCallback(this.elm);
                    }
                    this.destroy();
  
                    return false;
                }
  
                this.winTimeout = setTimeout(function () {
                    if (_this.expressionValidator(_this.elm)) {
                        return successCallback(_this);
                    } else {
                        _this.poll(delay * multiplier, multiplier, successCallback, timeoutCallback);
                    }
                }, delay);
            }
        };
    };
  
    var poller = function poller(elements, cb, options) {
        var settings = {
            wait: 50,
            multiplier: 1.1,
            timeout: 0,
            timeoutCallback: function timeoutCallback() {}
        };
  
        if (options) {
            for (var option in options) {
                settings[option] = options[option];
            }
        }
  
        var pollingElements = [],
            successfullyPolledElements = [];
  
        for (var i = 0; i < elements.length; i++) {
            var pollingElement = createPollingElement({
                elm: elements[i],
                maxDuration: settings.timeout
            });
  
            pollingElements.push(pollingElement);
  
            pollingElement.poll(settings.wait, settings.multiplier, function (pollingElement) {
                successfullyPolledElements.push(pollingElement);
  
                if (successfullyPolledElements.length === elements.length) {
                    cb();
                }
            }, settings.timeoutCallback);
        }
  
        return {
            destroy: function destroy() {
                pollingElements.forEach(function (item) {
                    return item.destroy();
                });
            }
        };
    };
  
  
    var observer = {
        active: [],
  
        connect: function connect(elements, cb, options) {
            var settings = {
                throttle: 1000,
                config: {
                    attributes: true,
                    childList: true,
                    subTree: false
                }
            };
  
            if (options) {
                for (var option in options) {
                    settings[option] = options[option];
                }
            } else {
                options = settings;
            }
  
            var blockCb;
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (!blockCb) {
                        blockCb = true;
                        cb(elements, mutation);
                        setTimeout(function () {
                            blockCb = false;
                        }, settings.throttle);
                    }
                });
            });
  
            if (elements.length) {
                for (var i = 0; i < elements.length; i++) {
                    observer.observe(elements[i], settings.config);
                    this.active.push([elements[i], observer]);
                }
            } else {
                observer.observe(elements, settings.config);
                this.active.push([elements, observer]);
            }
        },
  
        disconnect: function disconnect(elements) {
            var isActive = [];
            var active = this.active;
  
            function removeObservers(element) {
                for (var j = 0; j < active.length; j++) {
                    if (element === active[j][0]) {
                        active[j][1].disconnect();
                    }
                }
            }
  
            if (elements.length) {
                for (var i = 0; i < elements.length; i++) {
                    removeObservers(elements[i]);
                }
            } else {
                removeObservers(elements);
            }
        }
    };
  
  
  
    var fullStory = function fullStory(experiment_str, variation_str) {
        poller([function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }], function () {
            window.FS.setUserVars({
                experiment_str: experiment_str,
                variation_str: variation_str
            });
        }, { multiplier: 1.2, timeout: 0 });
    };
  
    var events = {
        trackerName: false,
        setDefaultCategory: function setDefaultCategory(category) {
            this.category = category;
  
            return this;
        },
        setTrackerName: function setTrackerName(trackerName) {
            this.trackerName = trackerName;
        },
        eventCache: [],
        send: function send(category, action, label, options) {
            options = options || {};
            category = category || this.category;
  
            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
                var eventID = category + action + label;
                if (this.eventCache.indexOf(eventID) > -1) {
                    return false;
                } else {
                    this.eventCache.push(eventID);
                }
            }
  
            var self = this;
            var fire = function fire(tracker) {
                window.ga(tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
            };
  
            if (self.trackerName) {
                fire(self.trackerName);
            } else {
                poller([function () {
                    try {
                        return !!window.ga.getAll();
                    } catch (err) {}
                }], function () {
                    self.trackerName = window.ga.getAll()[0].get('name');
                    fire(self.trackerName);
                });
            }
        }
    };
  
  
  
    var generateRemainingPaxText = function generateRemainingPaxText(remainingPassengers) {
        if (remainingPassengers > 0) {
            $('.nh5-remaining-pax-wrap').html('\n            <p class="nh5-remaining-pax">\n                Please select \n                <strong>\n                    <span class="nh5-remaining-pax__value">' + remainingPassengers + '</span> passengers\n                </strong>\n                by clicking on an available seat below\n            </p>\n        ');
  
            $('.seat-area').removeClass('nh5-all-seats-selected');
        } else {
            $('.nh5-remaining-pax-wrap').html('\n            <p class="nh5-remaining-pax nh5-remaining-pax--complete">\n                Great! You\'ve reserved all your seats.\n            </p>\n        ');
  
            $('.seat-area').addClass('nh5-all-seats-selected');
        }
    };
  
    var getRemainingPassengers = function getRemainingPassengers(remainingPax) {
        return remainingPax.text().trim();
    };
  
    var transposeSeats = function transposeSeats(coachSideElement) {
        var numSeatsPerRow = 13,
            seats = coachSideElement.find('.seat'),
            row1Seats = seats.slice(0, 13),
            row2Seats = seats.slice(13, 26);
  
        coachSideElement.find('.seat').each(function (idx, item) {
            return item.dataset.nh5origorder = idx;
        });
  
        var results = [];
        for (var i = numSeatsPerRow - 1; i >= 0; i--) {
            if (row1Seats[i]) {
                $(row1Seats[i]).prependTo(coachSideElement);
            }
            if (row2Seats[i]) {
                $(row2Seats[i]).prependTo(coachSideElement);
            }
        }
    };
  
    var reviewsHtml = '\n    <div class="nh5-reviews">\n        <div class="nh5-review text-center">\n            <p class="nh5-review__stars">\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n            </p>\n            <div class="nh5-review__text">\n                National Holidays are really good value for money. Coaches are clean and comfortable and the drivers are all friendly and helpful. I have been on a number of National Holidays over the years and cannot fault them.\n            </div>\n            <p class="text-center nh5-review__author">\n                <strong>Janet Dean Solway</strong>\n                via Facebook\n            </p>\n        </div>\n        <div class="nh5-review text-center">\n            <p class="nh5-review__stars">\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n            </p>\n            <div class="nh5-review__text">\n                This was our first coach trip and I cant lie I was dreading the bus side of the trip... however once we met our driver Jason I couldn\'t have been any more wrong..such a lovely funny man. He really went the extra mile to make kids laugh. He\'s definitley what you need on a long journey.\n            </div>\n            <p class="text-center nh5-review__author">\n                <strong>Kayla Harvey</strong>\n                via Facebook\n            </p>\n        </div>\n        <div class="nh5-review text-center">\n            <p class="nh5-review__stars">\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n            </p>\n            <div class="nh5-review__text">\n                I would like to thank the driver called Colin who picked us up at Darlington dolphin centre at 7 20 on Saturday morning and took us to London he made us laugh from start to finish hope the guy gets a good word past on I will definitely use the company again for future holiday.\n            </div>\n            <p class="text-center nh5-review__author">\n                <strong>Sean Brown</strong>\n                via Facebook\n            </p>\n        </div>\n        <div class="nh5-review text-center">\n            <p class="nh5-review__stars">\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n            </p>\n            <div class="nh5-review__text">\n                Just got back from a 3 day Edinburgh trip. Couldn\'t fault the trip, lovely hotel. Plenty of time to have a good look around the city. Drivers Paul and Chris were very friendly and funny and very informative about the area. Always great value for money with National.\n            </div>\n            <p class="text-center nh5-review__author">\n                <strong>Wendy Featherstone</strong>\n                via Facebook\n            </p>\n        </div>\n        <div class="nh5-review text-center">\n            <p class="nh5-review__stars">\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n            </p>\n            <div class="nh5-review__text">\n                Returned Saturday from Donegal, tour was great and we had a lovely driver Steve who was very helpful and knowledgeable about places we visited. All the hotels we stayed at were first class and I hope to do the same holiday next year.\n            </div>\n            <p class="text-center nh5-review__author">\n                <strong>Catherine Simpson</strong>\n                via Facebook\n            </p>\n        </div>\n        <div class="nh5-review text-center">\n            <p class="nh5-review__stars">\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n            </p>\n            <div class="nh5-review__text">\n                Just on way back from 5 day break at The Sun Hotel in Skegness. Had a brilliant time. Hotel was spot on and our Driver John was fantastic. Cant wait for our next trip.\n            </div>\n            <p class="text-center nh5-review__author">\n                <strong>Pat Cook</strong>\n                via Facebook\n            </p>\n        </div>\n        <div class="nh5-review text-center">\n            <p class="nh5-review__stars">\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n                <i class="fa fa-star"></i>\n            </p>\n            <div class="nh5-review__text">\n                Very nice coach, lovely and comfortable. I managed to get the last 3 letters of registration YMH I hope I get this one again as I am a regular traveller with you guys!\n            </div>\n            <p class="text-center nh5-review__author">\n                <strong>Anonymous</strong>\n                via Facebook\n            </p>\n        </div>\n    </div>\n';
  
    var additionalInfo = '\n    <div class="nh5-additional-info">\n        <h3>Do you have any additional questions about our coaches?</h3>\n        <ul>\n            <li>Modern Mercedes Benz coaches - the most fuel efficient in Europe!</li>\n            <li>The largest coach fleet in the UK: spacious, air-conditioned and well lit.</li>\n            <li>Travel in style and comfort - all coaches featuring reclining seats and great facilities.</li>\n        </ul>\n\n        <div class="nh5-contact">\n            <img width="50" height="50" class="nh5-contact__image" src="data:image/png;base64,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">\n            <div class="nh5-contact__info">\n                <span>\n                    Speak to our friendly team on \n                </span>\n\n                <span>\n                    <strong>0844 477 9990</strong>\n                    Open 8am-8pm 7 days a week\n                </span>\n\n                <span>\n                    or <a class="nh5-init-live-chat">Chat to us live now</a>\n                </span>\n            </div>\n        </div>\n\n        <p class="nh5-disclaimer">\n            Please note that at busy periods we will utilise coaches and drivers from our trusted partners. The facilities on these coaches may vary from the features above.\n        </p>\n    </div>\n';
  
    window._NH005 = function () {
        var $ = null;
  
        var eventSender = events.setDefaultCategory('NH005---Seating Plan Improvements');
  
        events.setTrackerName('tracker2');
  
        var run = function run() {
            document.body.classList.add('nh005');
  
            eventSender.send(null, 'did-redesign-page');
  
            $('.main-content .inner-content h1 span').text('Reserve your seat');
  
            $('.content > .left > .box-with-border:first').removeClass('box-with-border').addClass('nh5-left-box');
  
            $('.content > .left').prepend(reviewsHtml);
  
            $('.nh5-reviews').slick({});
  
            $('.nh5-left-box h2:first').text('1. Seat preference');
            $('.nh5-left-box p:first').text('Choose your preferred seats now.');
            $('.nh5-left-box hr:first').remove();
  
            $('.nh5-left-box p:first').after('\n            <span class="nh5-pax-placeholder nh5-hide""></span>\n            <div class="nh5-remaining-pax-wrap"></div>\n        ');
  
            var remainingPax = $('#remainingPax');
  
            remainingPax.parent().addClass('nh5-hide');
  
            generateRemainingPaxText(getRemainingPassengers(remainingPax));
  
            observer.connect(remainingPax, function () {
                generateRemainingPaxText(getRemainingPassengers(remainingPax));
            }, {
                config: { attributes: true, childList: true, subtree: false },
                throttle: 20
            });
  
            $('.nh5-left-box').after(additionalInfo);
  
            $('.nh5-init-live-chat').on('click', function () {
                return $('.header-left img:first')[0].click();
            });
  
            if (window.innerWidth <= 1025) {
                transposeSeats($('.right-side-coach'));
                transposeSeats($('.left-side-coach'));
  
                eventSender.send(null, 'did-show-vertical-seat-selector');
            } else {
                eventSender.send(null, 'did-show-horizontal-seat-selector');
            }
  
            $('.seat-block').wrap('<div class="nh5-seating-wrapper">');
  
            $('.nh5-seating-wrapper').prepend('\n            <div class="nh5-seating-front">\n                <img class="nh5-seating-wheel" width="31" height="44" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/f2783c1aa93fc001c781ed1a38abee77_seat-wheel-mobile.png" />\n            </div>\n        ');
  
            $('.nh5-seating-wrapper').prepend('\n            <span class="nh5-seating-wrapper__text nh5-seating-wrapper__front-text">Front</span>\n        ');
  
            $('.nh5-seating-wrapper').append('\n            <span class="nh5-seating-wrapper__text nh5-seating-wrapper__back-text">Back</span>\n        ');
  
            $('.nh5-seating-wrapper').prepend('\n            <div class="nh5-availability-key nh5-availability-key--vertical">\n                <span class="nh5-key nh5-key--available"></span>\n                <span class="nh5-availability-text">Seat available</span>\n                <span class="nh5-key nh5-key--reserved"></span>\n                <span class="nh5-availability-text">Your reserved seat</span>\n                <span class="nh5-key nh5-key--taken"></span>\n                <span class="nh5-availability-text">Seat taken</span>\n            </div>\n        ');
  
            $('.nh5-seating-wrapper').after('\n            <div class="nh5-availability-key nh5-availability-key--horizontal">\n                <div class="nh5-key-wrap">\n                    <span class="nh5-key nh5-key--available"></span>\n                    <span class="nh5-availability-text">Seat available</span>\n                </div>\n                <div class="nh5-key-wrap">\n                    <span class="nh5-key nh5-key--reserved"></span>\n                    <span class="nh5-availability-text">Your reserved seat</span>\n                </div>\n                <div class="nh5-key-wrap">\n                    <span class="nh5-key nh5-key--taken"></span>\n                    <span class="nh5-availability-text">Seat taken</span>\n                </div>\n            </div>\n        ');
  
            $('.nh5-seating-wrapper').on('click', '.seat', function (e) {
                var thisSeat = $(e.currentTarget);
                if (!thisSeat.hasClass('selected')) {
                    thisSeat.removeAttr('data-nh5seatnum');
                } else {
                    if (!thisSeat.attr('data-nh5seatnum')) {
                        thisSeat.attr('data-nh5seatnum', '');
                    }
  
                    var numberedSeats = $('.nh5-seating-wrapper .seat[data-nh5seatnum]');
  
                    var numbersAllocated = [];
                    numberedSeats.each(function (idx, item) {
                        var $item = $(item),
                            seatNum = $item.attr('data-nh5seatnum');
  
                        if (seatNum) {
                            numbersAllocated.push(parseInt(seatNum, 10));
                        }
                    });
  
                    numberedSeats.each(function (idx, item) {
                        var tIndex = idx + 1;
                        if (numbersAllocated.indexOf(tIndex) == -1) {
                            thisSeat.attr('data-nh5seatnum', tIndex);
                        }
                    });
                }
  
                setSeatNums();
            });
  
            var setSeatNums = function setSeatNums() {
                var seats = $('.nh5-seating-wrapper .seat');
                seats.each(function (idx, item) {
                    var $item = $(item),
                        seatNum = $item.attr('data-nh5seatnum');
                    if (seatNum) {
                        $item.html('<span class="nh5seatnum">' + seatNum + '</span>');
                    } else {
                        $item.html('');
                    }
                });
            };
  
            var remainingPaxMsg = $('.nh5-remaining-pax-wrap'),
                seatArea = $('.choose-seat'),
                paxMsgTop = remainingPaxMsg.offset().top,
                seatAreaBottom = seatArea.offset().top + seatArea.outerHeight() - 200;
  
            $(window).on('scroll', function () {
                if (window.innerWidth < 1025) {
                    var st = $(window).scrollTop();
  
                    if (st >= paxMsgTop && st < seatAreaBottom) {
                        remainingPaxMsg.addClass('nh5-remaining-pax-wrap--sticky');
                        $('.nh5-pax-placeholder').removeClass('nh5-hide');
                    } else {
                        remainingPaxMsg.removeClass('nh5-remaining-pax-wrap--sticky');
                        $('.nh5-pax-placeholder').addClass('nh5-hide');
                    }
                }
            });
  
            window.addEventListener('orientationchange', function (e) {
                eventSender.send(null, 'did-change-device-orientation');
                window.location.reload();
            });
        };
  
        poller(['.inner-content h1', '#seatIds', '.main-content .content .left', '.main-content .content .right', '#Booking .content .choose-seat .seat-area .seat-block .seat', '.choose-seat', function () {
            return !!window.jQuery;
        }, function () {
            return !!window.ga;
        }], function () {
            $ = window.jQuery;
  
            fullStory('NH005', 'Variation 1');
  
            run();
        });
    }();
  })();
};

export default NH005;