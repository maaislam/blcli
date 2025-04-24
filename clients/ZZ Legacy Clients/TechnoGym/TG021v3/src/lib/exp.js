const test = () => {
  (function() {
    'use strict';
    console.log('in test');
    
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
    
    var pollerLite = function pollerLite(elements, cb, options) {
        var settings = {
            wait: 50,
            multiplier: 1.1,
            timeout: 0
        };
    
        var now = Date.now || function () {
            return new Date().getTime();
        };
    
        if (options) {
            for (var option in options) {
                settings[option] = options[option];
            }
        } else {
            options = settings;
        }
    
        var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
        var wait = settings.wait;
        var multiplier = settings.multiplier;
    
        var successful = [];
        var time;
        var pollForElement = function pollForElement(condition, time) {
            if (timeout && now() > timeout) {
                return false;
            }
            time = time || wait;
    
            var conditionIsTrue = function () {
                var type = typeof condition === 'undefined' ? 'undefined' : _typeof(condition);
                var toReturn;
    
                if (type === 'function') {
                    toReturn = condition();
                } else if (type === 'string') {
                    toReturn = document.querySelector(condition);
                } else {
                    toReturn = true;
                }
    
                return toReturn;
            }();
    
            if (conditionIsTrue) {
                successful.push(true);
                if (successful.length === elements.length) cb();
            } else {
                setTimeout(function () {
                    pollForElement(condition, time * multiplier);
                }, time);
            }
        };
    
        for (var i = 0; i < elements.length; i++) {
            pollForElement(elements[i]);
        }
    };
    
    
    
    
    
    
    
    var fullStory = function fullStory(experiment_str, variation_str) {
        pollerLite([function () {
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
        analyticsReference: 'ga',
        setDefaultCategory: function setDefaultCategory(category) {
            this.category = category;
    
            return this;
        },
        setTrackerName: function setTrackerName(trackerName) {
            this.trackerName = trackerName;
        },
        useLegacyTracker: function useLegacyTracker() {
            this.analyticsReference = '_gaq';
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
                if (self.analyticsReference == '_gaq') {
                    _gaq.push(['_trackEvent', category, action, label, null, typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true]);
                } else {
                    window[self.analyticsReference](tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
                }
            };
    
            if (self.trackerName) {
                fire(self.trackerName);
            } else {
                pollerLite([function () {
                    try {
                        if (self.analyticsReference == '_gaq') {
                            return !!window._gaq;
                        } else {
                            return !!window[self.analyticsReference].getAll();
                        }
                    } catch (err) {}
                }], function () {
                    if (window[self.analyticsReference].getAll) {
                        self.trackerName = window[self.analyticsReference].getAll()[0].get('name');
                    }
                    fire(self.trackerName);
                });
            }
        }
    };
    
    var textContent = {
        "/gb/climb-excite-unity.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/step-excite-1000.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/climb-excite-led.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/climb-excite-tv.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/treadmill-excite-1000.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/vario-excite-1000.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/treadmill-excite-600.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/synchro-excite-1000.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/recline-excite-1000.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/top-excite-1000.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/bike-excite-1000.html": 'The Excite range is trusted by 20 million users everyday in 10, 000 facilities worldwide. We\u2019ve updated the range based on the latest research, bringing users engaging training workouts and smarter consoles, presented in our signature sleek design.',
        "/gb/excite-top-med.html": 'The Excite MED line offers truly accessible cardiovascular training equipment, suitable for gyms, hospitals or rehabilitation centres. Excite MED equipment can be used safely and effectively by people with permanent or temporary disabilities.',
        "/gb/excite-vario-med.html": 'The Excite MED line offers truly accessible cardiovascular training equipment, suitable for gyms, hospitals or rehabilitation centres. Excite MED equipment can be used safely and effectively by people with permanent or temporary disabilities.',
        "/gb/excite-treadmill-run-600-med.html": 'The Excite MED line offers truly accessible cardiovascular training equipment, suitable for gyms, hospitals or rehabilitation centres. Excite MED equipment can be used safely and effectively by people with permanent or temporary disabilities.',
        "/gb/excite-recline-med.html": 'The Excite MED line offers truly accessible cardiovascular training equipment, suitable for gyms, hospitals or rehabilitation centres. Excite MED equipment can be used safely and effectively by people with permanent or temporary disabilities.',
        "/gb/excite-bike-med.html": 'The Excite MED line offers truly accessible cardiovascular training equipment, suitable for gyms, hospitals or rehabilitation centres. Excite MED equipment can be used safely and effectively by people with permanent or temporary disabilities.',
        "/gb/excite-synchro-med.html": 'The Excite MED line offers truly accessible cardiovascular training equipment, suitable for gyms, hospitals or rehabilitation centres. Excite MED equipment can be used safely and effectively by people with permanent or temporary disabilities.',
        "/gb/excite-treadmill-run-1000-med.html": 'The Excite MED line offers truly accessible cardiovascular training equipment, suitable for gyms, hospitals or rehabilitation centres. Excite MED equipment can be used safely and effectively by people with permanent or temporary disabilities.',
        "/gb/skillrun.html": 'Designed in collaboration with athletes, trainers and academic research institutes, the SKILL LINE improves performance using the SKILLATHLETIC TRAINING method, which develops work capacity and enhances abilities in total safety.',
        "/gb/skillmill-connect.html": 'Designed in collaboration with athletes, trainers and academic research institutes, the SKILL LINE improves performance using the SKILLATHLETIC TRAINING method, which develops work capacity and enhances abilities in total safety.',
        "/gb/skillmill-console-1.html": 'Designed in collaboration with athletes, trainers and academic research institutes, the SKILL LINE improves performance using the SKILLATHLETIC TRAINING method, which develops work capacity and enhances abilities in total safety.',
        "/gb/unity-self-skillmill.html": 'Designed in collaboration with athletes, trainers and academic research institutes, the SKILL LINE improves performance using the SKILLATHLETIC TRAINING method, which develops work capacity and enhances abilities in total safety.',
        "/gb/skillmill-go-1.html": 'Designed in collaboration with athletes, trainers and academic research institutes, the SKILL LINE improves performance using the SKILLATHLETIC TRAINING method, which develops work capacity and enhances abilities in total safety.',
        "/gb/skillrow.html": 'Designed in collaboration with athletes, trainers and academic research institutes, the SKILL LINE improves performance using the SKILLATHLETIC TRAINING method, which develops work capacity and enhances abilities in total safety.',
        "/gb/skillrow-professional-app.html": 'Designed in collaboration with athletes, trainers and academic research institutes, the SKILL LINE improves performance using the SKILLATHLETIC TRAINING method, which develops work capacity and enhances abilities in total safety.',
        "/gb/climb-artis.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/treadmill-artis-run-standard.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-vario-standard.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-bike-standard.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-recline-standard.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-low-row.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-total-abdominal.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-leg-curl.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-leg-extension.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-vertical.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-chest.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-leg-press.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-lower-back.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-multi-hip.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-shoulder.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-arm-curl.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-rotary-torso.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-rear-delt-row.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-squat.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-adductor.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-abductor.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-arm-extension.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-pectoral-machine.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/artis-lat-machine.html": 'Move seamlessly between Strength, Cardio and Functional training with the ARTIS Line. Combining beautiful design with rigorous biomechanical research, ARTIS offers you state-of-the-art equipment which boasts a seamless look, advanced connectivity, sustainability and unique movement.',
        "/gb/cable-stations-dual-adjustable-pulley.html": 'With varying configurations, our Cable Station line provides several total body workout opportunities in just one product. Cable Stations are the ideal solution for facilities requiring space-efficient equipment, designed to be used by more than one person at a time.',
        "/gb/cable-stations-ercolina.html": 'With varying configurations, our Cable Station line provides several total body workout opportunities in just one product. Cable Stations are the ideal solution for facilities requiring space-efficient equipment, designed to be used by more than one person at a time.',
        "/gb/cable-stations-ercolina-rehab.html": 'With varying configurations, our Cable Station line provides several total body workout opportunities in just one product. Cable Stations are the ideal solution for facilities requiring space-efficient equipment, designed to be used by more than one person at a time.',
        "/gb/leg-raise-dip.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/lower-back-bench-benches-2.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/abdominal-crunch-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/vertical-traction-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/glute-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/lower-back-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/vertical-bench-benches-4.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/scott-bench-benches-5.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/horizontal-bench-benches-4.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/adjustable-bench-benches-6.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/incline-bench-benches-4.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/abdominal-bench-benches-2.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/low-row-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/leg-extension-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/adductor-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/abductor-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/pectoral-machine-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/leg-press-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/arm-curl-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/leg-curl-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/shoulder-press-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/chest-press-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/arm-extension-element.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/lat-machine-element-19.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/multipower-element-1.html": 'Make Strength training intuitive and simple with the Element+ line. With compact designs that give users incredible comfort whilst saving you space, Element+ offers you a sleek, timeless and affordable training solution.',
        "/gb/leg-curl-element-inclusive.html": 'Make Strength training intuitive and simple with the Element+ Inclusive line. This line is specifically developed for accessibility, and is perfect for sensorial, cognitive or physical disabilities.',
        "/gb/chest-press-element-inclusive.html": 'Make Strength training intuitive and simple with the Element+ Inclusive line. This line is specifically developed for accessibility, and is perfect for sensorial, cognitive or physical disabilities.',
        "/gb/leg-press-element-inclusive.html": 'Make Strength training intuitive and simple with the Element+ Inclusive line. This line is specifically developed for accessibility, and is perfect for sensorial, cognitive or physical disabilities.',
        "/gb/low-row-element-inclusive.html": 'Make Strength training intuitive and simple with the Element+ Inclusive line. This line is specifically developed for accessibility, and is perfect for sensorial, cognitive or physical disabilities.',
        "/gb/shoulder-press-element-inclusive.html": 'Make Strength training intuitive and simple with the Element+ Inclusive line. This line is specifically developed for accessibility, and is perfect for sensorial, cognitive or physical disabilities.',
        "/gb/posterior-flexability.html": 'FLEXability offers accessible, effective stretching solutions to all types of users. Work on your lower body, trunk and lower back, whilst effortlessly measuring the progress of joint flexibility through the integrated feedback system. The FLEXability line makes stretching measurable, accessible and easy for all.',
        "/gb/anterior-flexability.html": 'FLEXability offers accessible, effective stretching solutions to all types of users. Work on your lower body, trunk and lower back, whilst effortlessly measuring the progress of joint flexibility through the integrated feedback system. The FLEXability line makes stretching measurable, accessible and easy for all.',
        "/gb/core-station-kinesis-station-89.html": 'The KINESIS line achieves 360 degree, unlimited functional training with Technogym\'s patented "FullGravity" technology. KINESIS offers beautiful, adaptable training solution for a single user or small groups. Discover the true range of possible training programs and exercise with our Functional training app or join the WeKinesis community.',
        "/gb/step-squat-kinesis-station-11.html": 'The KINESIS line achieves 360 degree, unlimited functional training with Technogym\'s patented "FullGravity" technology. KINESIS offers beautiful, adaptable training solution for a single user or small groups. Discover the true range of possible training programs and exercise with our Functional training app or join the WeKinesis community.',
        "/gb/press-kinesis-station-12.html": 'The KINESIS line achieves 360 degree, unlimited functional training with Technogym\'s patented "FullGravity" technology. KINESIS offers beautiful, adaptable training solution for a single user or small groups. Discover the true range of possible training programs and exercise with our Functional training app or join the WeKinesis community.',
        "/gb/low-pull-kinesis-station-26.html": 'The KINESIS line achieves 360 degree, unlimited functional training with Technogym\'s patented "FullGravity" technology. KINESIS offers beautiful, adaptable training solution for a single user or small groups. Discover the true range of possible training programs and exercise with our Functional training app or join the WeKinesis community.',
        "/gb/one-kinesis.html": 'The KINESIS line achieves 360 degree, unlimited functional training with Technogym\'s patented "FullGravity" technology. KINESIS offers beautiful, adaptable training solution for a single user or small groups. Discover the true range of possible training programs and exercise with our Functional training app or join the WeKinesis community.',
        "/gb/kinesis-class.html": 'The KINESIS line achieves 360 degree, unlimited functional training with Technogym\'s patented "FullGravity" technology. KINESIS offers beautiful, adaptable training solution for a single user or small groups. Discover the true range of possible training programs and exercise with our Functional training app or join the WeKinesis community.',
        "/gb/omnia-8-omnia-1.html": 'Ranging from simple tools to more specific accessories, The OMNIA line will appeal to all types of users and is perfect for group training activities. With its modular nature and efficient designs, the OMNIA line will fit into any wellness space, and offer an open and inviting functional training area.',
        "/gb/omnia-3-straight-pull-up-bar-omnia.html": 'Ranging from simple tools to more specific accessories, The OMNIA line will appeal to all types of users and is perfect for group training activities. With its modular nature and efficient designs, the OMNIA line will fit into any wellness space, and offer an open and inviting functional training area.',
        "/gb/omnia-3-dual-lift-omnia-1.html": 'Ranging from simple tools to more specific accessories, The OMNIA line will appeal to all types of users and is perfect for group training activities. With its modular nature and efficient designs, the OMNIA line will fit into any wellness space, and offer an open and inviting functional training area.',
        "/gb/omnia-3-multiangle-pull-up-bar-omnia.html": 'Ranging from simple tools to more specific accessories, The OMNIA line will appeal to all types of users and is perfect for group training activities. With its modular nature and efficient designs, the OMNIA line will fit into any wellness space, and offer an open and inviting functional training area.',
        "/gb/wall-plurima.html": 'With its modular and efficient design, Plurima is the only commercially available multiple training station enabling a large number of exercises to be performed in a limited space. Each and every aspect is designed to meet users goals and expectations in comfort, and is the ideal solution for the Hospitality, Residential and Corporate sectors.',
        "/gb/solo-leg-press-calf-plurima.html": 'With its modular and efficient design, Plurima is the only commercially available multiple training station enabling a large number of exercises to be performed in a limited space. Each and every aspect is designed to meet users goals and expectations in comfort, and is the ideal solution for the Hospitality, Residential and Corporate sectors.',
        "/gb/tower-plurima.html": 'With its modular and efficient design, Plurima is the only commercially available multiple training station enabling a large number of exercises to be performed in a limited space. Each and every aspect is designed to meet users goals and expectations in comfort, and is the ideal solution for the Hospitality, Residential and Corporate sectors.',
        "/gb/twin-press-overhead-core-plurima.html": 'With its modular and efficient design, Plurima is the only commercially available multiple training station enabling a large number of exercises to be performed in a limited space. Each and every aspect is designed to meet users goals and expectations in comfort, and is the ideal solution for the Hospitality, Residential and Corporate sectors.',
        "/gb/twin-high-low-pull-leg-press-plurima.html": 'With its modular and efficient design, Plurima is the only commercially available multiple training station enabling a large number of exercises to be performed in a limited space. Each and every aspect is designed to meet users goals and expectations in comfort, and is the ideal solution for the Hospitality, Residential and Corporate sectors.',
        "/gb/standing-leg-curl-purestrength-13.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/leg-extension-purestrength-11.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/rear-kick-purestrength-7.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/leg-press-purestrength-9.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/chest-press-purestrength.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/chest-press-incline-purestrength-8.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/adjustable-bench-pure-benches-2.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/scott-bench-pure-benches-1.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/biceps-purestrength-11.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/flat-bench-pure-benches-2.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/lower-back-bench-pure-benches-1.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/adjust-decline-abdominal-crunch-pure-benches-1.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/calf-purestrength-9.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/pulldown-purestrength-9.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/row-purestrength-5.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/olympic-incline-bench-pure-benches-1.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/olympic-half-rack-pure-benches.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/olympic-decline-bench-pure-benches-2.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/wide-chest-press-purestrength-5.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/shoulder-press-purestrength-11.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/olympic-military-bench-pure-benches-1.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/low-row-purestrength-4.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/olympic-flat-bench-pure-benches.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/linear-leg-press-purestrength-1.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/seated-dip-purestrength-12.html": 'Our Pure line originated from Technogym\u2019s 20 years of experience as official fitness equipment supplier to the Olympics. We developed this line with professional athletes in mind, maximising comfort and muscle activation. The Pure line offers a truly comprehensive range of specialised machines built to the highest standards in biomechanics, ergonomics, durability and safety to maximise sport performance.',
        "/gb/low-row-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/total-abdominal-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/prone-leg-curl-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/reverse-fly-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/arm-curl-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/delts-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/leg-extension-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/leg-curl-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/adductor-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/pulley-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/pulldown-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/abductor-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/pectoral-machine-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/lat-machine-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/multipower-selection-1.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/rotary-torso-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/lower-back-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/abdominal-crunch-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/leg-press-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/multi-hip-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/chest-press-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/shoulder-press-selection-pro.html": 'Created with the experience of 7 Olympic Games the SELECTION Line offers superior strength training performance - perfect for all types of user, especially sports professionals.',
        "/gb/leg-press-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/leg-extension-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/leg-curl-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/upper-back-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/lat-machine-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/abductor-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/low-row-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/multi-hip-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/rotary-torso-selection-med-1.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/adductor-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/lower-back-selection-med-1.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/gb/abdominal-crunch-selection-med.html": 'The Selection MED line is the largest line of certified medical fitness equipment. The Selection line guarantees the highest standards of quality and reliability, and allows accessible, superior strength training for facilties such as hospitals or rehabilitation centres.',
        "/it/climb-excite-unity.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/step-excite-1000.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/climb-excite-led.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/climb-excite-tv.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/treadmill-excite-1000.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/vario-excite-1000.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/treadmill-excite-600.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/synchro-excite-1000.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/recline-excite-1000.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/top-excite-1000.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/bike-excite-1000.html": 'Nata dall\'esperienza di 6 Olimpiadi, 20 milioni di utenti ogni giorno in 10.000 Centri e 20 miliardi di sessioni di allenamento, la pi\xF9 ampia gamma di attrezzature cardio al mondo \xE8 oggi ancora pi\xF9 irresistibile con nuove opzioni di connettivit\xE0, nuovi coinvolgenti allenamenti, nuove funzionalit\xE0 e un nuovo look.',
        "/it/excite-top-med.html": 'La linea Excite Med si compone di prodotti cardiovascolari professionali adatti per club, ospedali o centri di riabilitazione. Persone affette da disabilit\xE0 temporanee o permanenti possono utilizzare Excite MED in modo sicuro ed efficace.',
        "/it/excite-vario-med.html": 'La linea Excite Med si compone di prodotti cardiovascolari professionali adatti per club, ospedali o centri di riabilitazione. Persone affette da disabilit\xE0 temporanee o permanenti possono utilizzare Excite MED in modo sicuro ed efficace.',
        "/it/excite-treadmill-run-600-med.html": 'La linea Excite Med si compone di prodotti cardiovascolari professionali adatti per club, ospedali o centri di riabilitazione. Persone affette da disabilit\xE0 temporanee o permanenti possono utilizzare Excite MED in modo sicuro ed efficace.',
        "/it/excite-recline-med.html": 'La linea Excite Med si compone di prodotti cardiovascolari professionali adatti per club, ospedali o centri di riabilitazione. Persone affette da disabilit\xE0 temporanee o permanenti possono utilizzare Excite MED in modo sicuro ed efficace.',
        "/it/excite-bike-med.html": 'La linea Excite Med si compone di prodotti cardiovascolari professionali adatti per club, ospedali o centri di riabilitazione. Persone affette da disabilit\xE0 temporanee o permanenti possono utilizzare Excite MED in modo sicuro ed efficace.',
        "/it/excite-synchro-med.html": 'La linea Excite Med si compone di prodotti cardiovascolari professionali adatti per club, ospedali o centri di riabilitazione. Persone affette da disabilit\xE0 temporanee o permanenti possono utilizzare Excite MED in modo sicuro ed efficace.',
        "/it/excite-treadmill-run-1000-med.html": 'La linea Excite Med si compone di prodotti cardiovascolari professionali adatti per club, ospedali o centri di riabilitazione. Persone affette da disabilit\xE0 temporanee o permanenti possono utilizzare Excite MED in modo sicuro ed efficace.',
        "/it/skillrun.html": 'Progettata in collaborazione con atleti, allenatori e istituti di ricerca universitari, la SKILL LINE migliora le prestazioni atletiche grazie al metodo SKILLATHLETIC TRAINING, che sviluppa la capacit\xE0 di lavoro e migliora  le abilit\xE0 in completa sicurezza.',
        "/it/skillmill-connect.html": 'Progettata in collaborazione con atleti, allenatori e istituti di ricerca universitari, la SKILL LINE migliora le prestazioni atletiche grazie al metodo SKILLATHLETIC TRAINING, che sviluppa la capacit\xE0 di lavoro e migliora  le abilit\xE0 in completa sicurezza.',
        "/it/skillmill-console-1.html": 'Progettata in collaborazione con atleti, allenatori e istituti di ricerca universitari, la SKILL LINE migliora le prestazioni atletiche grazie al metodo SKILLATHLETIC TRAINING, che sviluppa la capacit\xE0 di lavoro e migliora  le abilit\xE0 in completa sicurezza.',
        "/it/unity-self-skillmill.html": 'Progettata in collaborazione con atleti, allenatori e istituti di ricerca universitari, la SKILL LINE migliora le prestazioni atletiche grazie al metodo SKILLATHLETIC TRAINING, che sviluppa la capacit\xE0 di lavoro e migliora  le abilit\xE0 in completa sicurezza.',
        "/it/skillmill-go-1.html": 'Progettata in collaborazione con atleti, allenatori e istituti di ricerca universitari, la SKILL LINE migliora le prestazioni atletiche grazie al metodo SKILLATHLETIC TRAINING, che sviluppa la capacit\xE0 di lavoro e migliora  le abilit\xE0 in completa sicurezza.',
        "/it/skillrow.html": 'Progettata in collaborazione con atleti, allenatori e istituti di ricerca universitari, la SKILL LINE migliora le prestazioni atletiche grazie al metodo SKILLATHLETIC TRAINING, che sviluppa la capacit\xE0 di lavoro e migliora  le abilit\xE0 in completa sicurezza.',
        "/it/skillrow-professional-app.html": 'Progettata in collaborazione con atleti, allenatori e istituti di ricerca universitari, la SKILL LINE migliora le prestazioni atletiche grazie al metodo SKILLATHLETIC TRAINING, che sviluppa la capacit\xE0 di lavoro e migliora  le abilit\xE0 in completa sicurezza.',
        "/it/climb-artis.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/treadmill-artis-run-standard.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-vario-standard.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-bike-standard.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-recline-standard.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-synchro-standard.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-low-row.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-total-abdominal.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-leg-curl.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-leg-extension.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-vertical.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-chest.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-leg-press.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-lower-back.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-multi-hip.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-shoulder.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-arm-curl.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-rotary-torso.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-rear-delt-row.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-squat.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-adductor.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-abductor.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-arm-extension.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-pectoral-machine.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/artis-lat-machine.html": 'ARTIS \xE8 la linea completamente integrata di prodotti cardio, forza e functional. ARTIS riunisce in s\xE9 connettivit\xE0, sostenibilit\xE0, design lineare e piacevolezza di movimento.',
        "/it/cable-stations-dual-adjustable-pulley.html": 'Grazie alle sue configurazioni multiple, la linea Cable Station offre numerose possibilit\xE0 di allenamento. Cable Stations si adatta a ogni tipologia di centro, ottimizzando lo spazio a disposizione poich\xE9 pi\xF9 utenti possono allenarsi contemporaneamente.',
        "/it/cable-stations-ercolina.html": 'Grazie alle sue configurazioni multiple, la linea Cable Station offre numerose possibilit\xE0 di allenamento. Cable Stations si adatta a ogni tipologia di centro, ottimizzando lo spazio a disposizione poich\xE9 pi\xF9 utenti possono allenarsi contemporaneamente.',
        "/it/cable-stations-ercolina-rehab.html": 'Grazie alle sue configurazioni multiple, la linea Cable Station offre numerose possibilit\xE0 di allenamento. Cable Stations si adatta a ogni tipologia di centro, ottimizzando lo spazio a disposizione poich\xE9 pi\xF9 utenti possono allenarsi contemporaneamente.',
        "/it/leg-raise-dip.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/lower-back-bench-benches-2.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/abdominal-crunch-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/vertical-traction-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/glute-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/lower-back-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/vertical-bench-benches-4.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/scott-bench-benches-5.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/horizontal-bench-benches-4.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/adjustable-bench-benches-6.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/incline-bench-benches-4.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/abdominal-bench-benches-2.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/low-row-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/leg-extension-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/adductor-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/pectoral-machine-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/leg-press-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/arm-curl-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/leg-curl-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/shoulder-press-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/chest-press-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/arm-extension-element.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/lat-machine-element-19.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/multipower-element-1.html": 'ELEMENT+ rende l\'allenamento forza un\'esperienza piacevole e intuitiva.ELEMENT+ coniuga comfort e design in una soluzione elegante e senza tempo, adatta a qualsiasi spazio.',
        "/it/leg-curl-element-inclusive.html": 'Element +Inclusive rende l\'allenamento forza un\'esperienza piacevole e intuitiva.La gamma comprende prodotti appositamente progettati per utenti con limitazioni funzionali o sensoriali.',
        "/it/chest-press-element-inclusive.html": 'Element +Inclusive rende l\'allenamento forza un\'esperienza piacevole e intuitiva.La gamma comprende prodotti appositamente progettati per utenti con limitazioni funzionali o sensoriali.',
        "/it/leg-press-element-inclusive.html": 'Element +Inclusive rende l\'allenamento forza un\'esperienza piacevole e intuitiva.La gamma comprende prodotti appositamente progettati per utenti con limitazioni funzionali o sensoriali.',
        "/it/low-row-element-inclusive.html": 'Element +Inclusive rende l\'allenamento forza un\'esperienza piacevole e intuitiva.La gamma comprende prodotti appositamente progettati per utenti con limitazioni funzionali o sensoriali.',
        "/it/shoulder-press-element-inclusive.html": 'Element +Inclusive rende l\'allenamento forza un\'esperienza piacevole e intuitiva.La gamma comprende prodotti appositamente progettati per utenti con limitazioni funzionali o sensoriali.',
        "/it/posterior-flexability.html": 'FLEXability offre efficaci soluzioni che trasformano lo stretching in un\'esperienza accessibile, intuitiva e misurabile, adatta a tutti. Grazie al sistema di feedback visivo ogni utente pu\xF2 anche eseguire da solo sessioni di stretching sicure ed efficaci in qualsiasi momento.',
        "/it/anterior-flexability.html": 'FLEXability offre efficaci soluzioni che trasformano lo stretching in un\'esperienza accessibile, intuitiva e misurabile, adatta a tutti. Grazie al sistema di feedback visivo ogni utente pu\xF2 anche eseguire da solo sessioni di stretching sicure ed efficaci in qualsiasi momento.',
        "/it/core-station-kinesis-station-89.html": 'Con Kinesis l\'allenamento funzionale diventa tridimensionale grazie alla tecnologia FullGravity. Adatto a singoli utenti o piccoli gruppi,offre numerosi esercizi e programmi di allenamento: scoprili sulla Functional Training app o su Wekinesis.',
        "/it/step-squat-kinesis-station-11.html": 'Con Kinesis l\'allenamento funzionale diventa tridimensionale grazie alla tecnologia FullGravity. Adatto a singoli utenti o piccoli gruppi,offre numerosi esercizi e programmi di allenamento: scoprili sulla Functional Training app o su Wekinesis.',
        "/it/press-kinesis-station-12.html": 'Con Kinesis l\'allenamento funzionale diventa tridimensionale grazie alla tecnologia FullGravity. Adatto a singoli utenti o piccoli gruppi,offre numerosi esercizi e programmi di allenamento: scoprili sulla Functional Training app o su Wekinesis.',
        "/it/low-pull-kinesis-station-26.html": 'Con Kinesis l\'allenamento funzionale diventa tridimensionale grazie alla tecnologia FullGravity. Adatto a singoli utenti o piccoli gruppi,offre numerosi esercizi e programmi di allenamento: scoprili sulla Functional Training app o su Wekinesis.',
        "/it/one-kinesis.html": 'Con Kinesis l\'allenamento funzionale diventa tridimensionale grazie alla tecnologia FullGravity. Adatto a singoli utenti o piccoli gruppi,offre numerosi esercizi e programmi di allenamento: scoprili sulla Functional Training app o su Wekinesis.',
        "/it/kinesis-class.html": 'Con Kinesis l\'allenamento funzionale diventa tridimensionale grazie alla tecnologia FullGravity. Adatto a singoli utenti o piccoli gruppi,offre numerosi esercizi e programmi di allenamento: scoprili sulla Functional Training app o su Wekinesis.',
        "/it/omnia-8-omnia-1.html": 'La Linea OMNIA comprende una grande variet\xE0 di accessori, dai pi\xF9 semplici ai pi\xF9 specifici.Adatta a tutti i tipi di utenti, \xE8 perfetta per attivit\xE0 di gruppo. Il design e il carattere modulare fanno di OMNIA un\'area funzionale coinvolgente, perfetta in ogni spazio.',
        "/it/omnia-3-straight-pull-up-bar-omnia.html": 'La Linea OMNIA comprende una grande variet\xE0 di accessori, dai pi\xF9 semplici ai pi\xF9 specifici.Adatta a tutti i tipi di utenti, \xE8 perfetta per attivit\xE0 di gruppo. Il design e il carattere modulare fanno di OMNIA un\'area funzionale coinvolgente, perfetta in ogni spazio.',
        "/it/omnia-3-dual-lift-omnia-1.html": 'La Linea OMNIA comprende una grande variet\xE0 di accessori, dai pi\xF9 semplici ai pi\xF9 specifici.Adatta a tutti i tipi di utenti, \xE8 perfetta per attivit\xE0 di gruppo. Il design e il carattere modulare fanno di OMNIA un\'area funzionale coinvolgente, perfetta in ogni spazio.',
        "/it/omnia-3-multiangle-pull-up-bar-omnia.html": 'La Linea OMNIA comprende una grande variet\xE0 di accessori, dai pi\xF9 semplici ai pi\xF9 specifici.Adatta a tutti i tipi di utenti, \xE8 perfetta per attivit\xE0 di gruppo. Il design e il carattere modulare fanno di OMNIA un\'area funzionale coinvolgente, perfetta in ogni spazio.',
        "/it/wall-plurima.html": 'Grazie alla sua compattezza e modularit\xE0, Plurima \xE8 l\'unica multi-stazione che consente di eseguire un numero considerevole di esercizi in uno spazio ristretto.Ogni dettaglio \xE8 stato studiato per consentire agli utenti di ottenere ottimi risultati in tutta comodit\xE0. E\' la soluzione ideale per i settori hospitality, residenziale e corporate.',
        "/it/solo-leg-press-calf-plurima.html": 'Grazie alla sua compattezza e modularit\xE0, Plurima \xE8 l\'unica multi-stazione che consente di eseguire un numero considerevole di esercizi in uno spazio ristretto.Ogni dettaglio \xE8 stato studiato per consentire agli utenti di ottenere ottimi risultati in tutta comodit\xE0. E\' la soluzione ideale per i settori hospitality, residenziale e corporate.',
        "/it/tower-plurima.html": 'Grazie alla sua compattezza e modularit\xE0, Plurima \xE8 l\'unica multi-stazione che consente di eseguire un numero considerevole di esercizi in uno spazio ristretto.Ogni dettaglio \xE8 stato studiato per consentire agli utenti di ottenere ottimi risultati in tutta comodit\xE0. E\' la soluzione ideale per i settori hospitality, residenziale e corporate.',
        "/it/twin-press-overhead-core-plurima.html": 'Grazie alla sua compattezza e modularit\xE0, Plurima \xE8 l\'unica multi-stazione che consente di eseguire un numero considerevole di esercizi in uno spazio ristretto.Ogni dettaglio \xE8 stato studiato per consentire agli utenti di ottenere ottimi risultati in tutta comodit\xE0. E\' la soluzione ideale per i settori hospitality, residenziale e corporate.',
        "/it/twin-high-low-pull-leg-press-plurima.html": 'Grazie alla sua compattezza e modularit\xE0, Plurima \xE8 l\'unica multi-stazione che consente di eseguire un numero considerevole di esercizi in uno spazio ristretto.Ogni dettaglio \xE8 stato studiato per consentire agli utenti di ottenere ottimi risultati in tutta comodit\xE0. E\' la soluzione ideale per i settori hospitality, residenziale e corporate.',
        "/it/standing-leg-curl-purestrength-13.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/leg-extension-purestrength-11.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/rear-kick-purestrength-7.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/leg-press-purestrength-9.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/chest-press-purestrength.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/chest-press-incline-purestrength-8.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/adjustable-bench-pure-benches-2.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/scott-bench-pure-benches-1.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/biceps-purestrength-11.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/flat-bench-pure-benches-2.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/lower-back-bench-pure-benches-1.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/adjust-decline-abdominal-crunch-pure-benches-1.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/calf-purestrength-9.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/pulldown-purestrength-9.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/row-purestrength-5.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/olympic-incline-bench-pure-benches-1.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/olympic-half-rack-pure-benches.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/olympic-decline-bench-pure-benches-2.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/wide-chest-press-purestrength-5.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/shoulder-press-purestrength-11.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/olympic-military-bench-pure-benches-1.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/low-row-purestrength-4.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/olympic-flat-bench-pure-benches.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/linear-leg-press-purestrength-1.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/seated-dip-purestrength-12.html": 'La linea Pure \xE8 nata dall\'esperienza ventennale di Technogym come fornitore dei Giochi Olimpici.Realizzata secondo gli standard pi\xF9 elevati in termini di biomeccanica, ergonomia, resistenza e sicurezza, Pure \xE8 la scelta ideale per massimizzare le prestazioni sportive.',
        "/it/low-row-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/total-abdominal-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/prone-leg-curl-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/reverse-fly-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/arm-curl-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/delts-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/leg-extension-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/leg-curl-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/adductor-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/pulley-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/pulldown-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/abductor-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/pectoral-machine-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/lat-machine-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/multipower-selection-1.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/rotary-torso-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/lower-back-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/abdominal-crunch-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/leg-press-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/multi-hip-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/chest-press-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/shoulder-press-selection-pro.html": 'Nata dall\'esperienza di 7 Olimpiadi la linea Selection consente allenamenti forza per prestazioni e risultati di qualit\xE0 superiore. Adatta a tutti gli utenti e agli sportivi.',
        "/it/leg-press-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/leg-extension-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/leg-curl-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/upper-back-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/lat-machine-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/abductor-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/low-row-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/multi-hip-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/rotary-torso-selection-med-1.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/adductor-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/lower-back-selection-med-1.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.',
        "/it/abdominal-crunch-selection-med.html": 'Selection MED \xE8 la pi\xF9 ampia gamma di attrezzi certificati per uso medico. Selection MED garantisce i massimi standard di qualit\xE0 e affidabilit\xE0 e consente un allenamento forza professionale negli ambiti medicali come ospedali o centri di riabilitazione.'
    };
    
    var eventSender = events.setDefaultCategory('TG021-V2');
    
    var _TG021 = function () {
        console.log('in 21');
        var _activate = function _activate() {
          console.log('in active');
            var $ = jQuery;
            var $body = $('body');
            $body.addClass('TG021v2');
    
            var pathName = window.location.pathname,
                description,
                rangePrice,
                productLine = $('.line-page-link a').text();
    
            var testContent = textContent;
    
            var textProduct = testContent[pathName];
    
            if (textProduct) {
    
                var $wrapper = $('<div class="TG21_wrap"/>');
                $wrapper.insertAfter('.product-collateral');
    
                var pricereassurance, callBack, rangeCopy;
    
                if (pathName.indexOf('/it/') > -1) {
                    pricereassurance = 'Ogni prodotto è una esperienza unica. Prezzo su richiesta.';
                    callBack = 'Un nostro Wellness Consultant risponderà entro un giorno lavorativo. Ti offriremo il miglior supporto per fornirti i consigli più utili e tutte le informazioni commerciali.';
                    rangeCopy = 'Linea di prodotto';
                } else {
                    pricereassurance = 'Each product is a unique piece. Price on request';
                    callBack = 'A Wellness Consultant will follow up within 1 working day. Whether you just want a price or need more advice, we’ll guide you through';
                    rangeCopy = 'Range';
                }
    
                var textBox = $(['<div class="TG21_textBlock">', '<h4>' + productLine + ' ' + rangeCopy + '</h4>', '<p class="TG21_description">' + textProduct + '</p>', '<p class="TG21_price">' + pricereassurance + '</p>', '</div>'].join(''));
                textBox.appendTo($wrapper);
    
                var requestCatalogLink = $('.product-main-info .addition-info figcaption div a');
                var requestCatalogLinkHref = requestCatalogLink.attr('href');
    
                if (pathName.indexOf('/it/') > -1) {
                    var socialButton = $('<div class="product-other-social"><a class="button tg21-request-cat btn-default" href="' + requestCatalogLinkHref + '">Richiedi catalogo</a></div>');
                } else {
                    var socialButton = $('<div class="product-other-social"><a class="button tg21-request-cat btn-default" href="' + requestCatalogLinkHref + '">Request a catalogue</a></div>');
                }
    
                var requestButton = $('.request-quote');
    
                if (pathName.indexOf('/it/') > -1) {
                    var orText = $('<div class="TG21_or">o</div>');
                } else {
                    var orText = $('<div class="TG21_or">or</div>');
                }
                $wrapper.append(requestButton).append(socialButton);
                orText.insertAfter(requestButton);
    
                $wrapper.append('<p class="TG21_bottomText">' + callBack + '</p>');
    
                $('.TG21_wrap .request-quote a').on('click', function (e) {
                    eventSender.send(null, 'did-click-request-quote');
                });
                $('.tg21-request-cat').on('click', function (e) {
                    eventSender.send(null, 'did-click-request-catalog');
                });
            }
        };
    
        var _triggers = function _triggers(options) {
            fullStory('TG021', 'Variation 2');
    
            poller(['.product-collateral', function () {
    
                var cartBtn = document.querySelector('.add-to-cart');
                if (cartBtn) {
                    return false;
                } else if (cartBtn === null) {
                    return true;
                }
            }], _activate);
        };
        _triggers();
        // document.addEventListener('DOMContentLoaded', function () {
        //   console.log('call triggers');
        //     _triggers();
        // });
    }();
  })();
};

export default test;
