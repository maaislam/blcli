// TG023
const test = () => {
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
    
    var poller$1 = function poller$1(elements, cb, options) {
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
                            var trackers = window[self.analyticsReference].getAll();
                            if (trackers && trackers.length) {
                                return true;
                            } else {
                                return false;
                            }
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var config = {
        strings: {
            '/gb/contacts': {
                it: '/it/contacts',
                es: '/es/contacts',
                de: '',
                fr: '/fr/contacts',
                us: '/gb/contacts',
                ru: ''
            },
            '/gb/mywellness': {
                it: '/it/mywellness',
                es: '/es/mywellness',
                de: '',
                fr: '/fr/mywellness',
                us: '/gb/mywellness',
                ru: ''
            },
            'A fraction of a second, one more rep.  Details make the difference. Details make athletes.': {
                it: 'Ogni dettaglio atletico è importante, così come ogni ripetizione conta o una frazione di secondo può fare la differenza.',
                es: 'Cada detalle atlético cuenta tanto como cada repetición o la más mínima fracción de segundo, que marca la diferencia.',
                de: '',
                fr: "En effet, chaque détail de l'athlétisme compte autant que chaque répétition, une fraction de seconde, aussi infime soit-elle, peut faire la différence.",
                us: 'A fraction of a second, one more rep.  Details make the difference. Details make athletes.',
                ru: ''
            },
            'A perfect synthesis of style, cutting-edge technology, exclusive materials and extraordinary craftsmanship.': {
                it: "Una sintesi perfetta di dettagli e di stile, l'esperienza multisensoriale di un allenamento completo.",
                es: 'Una síntesis perfecta entre estilo, tecnología a la última y materiales exclusivos de calidad artesanal extraordinaria.',
                de: '',
                fr: 'Une synthèse parfaite avec des détails, du style pour une expérience multi sensorielle et un entraînement complet.',
                us: 'A perfect synthesis of style, cutting-edge technology, exclusive materials and extraordinary craftsmanship.',
                ru: ''
            },
            'ARKE': {
                it: 'ARKE',
                es: 'ARKE',
                de: 'ARKE',
                fr: 'ARKE',
                us: 'ARKE',
                ru: ''
            },
            'ARTIS': {
                it: 'ARTIS',
                es: 'ARTIS',
                de: 'ARTIS',
                fr: 'ARTIS',
                us: 'ARTIS',
                ru: ''
            },
            'Accessories': {
                it: 'Accessori',
                es: 'Accesorios',
                de: '',
                fr: 'Accessoires',
                us: 'Accessories',
                ru: ''
            },
            'Benches &amp; Racks': {
                it: 'Panche e Rastrelliere',
                es: 'Bancos de pesas y musculación',
                de: '',
                fr: 'Bancs & Râteliers',
                us: 'Benches &amp; Racks',
                ru: ''
            },
            'Biocircuit': {
                it: 'Biocircuit',
                es: 'Biocircuit',
                de: 'Biocircuit',
                fr: 'Biocircuit',
                us: 'Biocircuit',
                ru: ''
            },
            'Browse the Kit': {
                it: 'Scopri il Kit',
                es: 'Explora el Kit',
                de: '',
                fr: 'Parcourez les produits du Kit',
                us: 'Browse the Kit',
                ru: ''
            },
            'Cable Stations': {
                it: 'Cable Stations',
                es: 'Cable Stations',
                de: 'Cable Stations',
                fr: 'Cable Stations',
                us: 'Cable Stations',
                ru: ''
            },
            'Cardio': {
                it: 'Cardio',
                es: 'Cardio',
                de: 'Cardio',
                fr: 'Cardio',
                us: 'Cardio',
                ru: ''
            },
            'Contact us': {
                it: 'Contattaci',
                es: 'Contáctanos',
                de: '',
                fr: 'Contactez-nous',
                us: 'Contact us',
                ru: ''
            },
            'Discover How': {
                it: 'Scopri come',
                es: 'Descubre como',
                de: '',
                fr: 'En savoir plus',
                us: 'Discover How',
                ru: ''
            },
            'Discover The Line': {
                it: 'Scopri la linea di prodotto',
                es: 'Descubre la Línea',
                de: '',
                fr: 'Découvrez la ligne de produits',
                us: 'Discover The Line',
                ru: ''
            },
            'Element+': {
                it: 'Element+',
                es: 'Element+',
                de: 'Element+',
                fr: 'Element+',
                us: 'Element+',
                ru: ''
            },
            'Elliptical Cross Trainers': {
                it: 'Cross Trainer ellittici',
                es: 'Elípticas',
                de: '',
                fr: 'Elliptiques Cross Trainers',
                us: 'Elliptical Cross Trainers',
                ru: ''
            },
            'Excite': {
                it: 'EXCITE',
                es: 'EXCITE',
                de: 'EXCITE',
                fr: 'EXCITE',
                us: 'Excite',
                ru: ''
            },
            'Exercise bikes': {
                it: 'Bike',
                es: 'Bicicletas estáticas',
                de: '',
                fr: "Vélos d'entraînement",
                us: 'Exercise bikes',
                ru: ''
            },
            'FLEXability': {
                it: 'FLEXability',
                es: 'FLEXability',
                de: 'FLEXability',
                fr: 'FLEXability',
                us: 'FLEXability',
                ru: ''
            },
            'For Your Business': {
                it: 'Per il tuo business',
                es: 'Para tu negocio',
                de: '',
                fr: 'Pour votre entreprise',
                us: 'For Your Business',
                ru: ''
            },
            'For Your Home': {
                it: 'Per la tua casa',
                es: 'Para tu casa',
                de: '',
                fr: 'Pour votre maison',
                us: 'For Your Home',
                ru: ''
            },
            'Forma': {
                it: 'FORMA',
                es: 'FORMA',
                de: 'FORMA',
                fr: 'FORMA',
                us: 'Forma',
                ru: ''
            },
            'Free Weights': {
                it: 'Pesi liberi',
                es: 'Pesos libres',
                de: '',
                fr: 'Poids Libres',
                us: 'Free Weights',
                ru: ''
            },
            'Functional / Flexibility': {
                it: "FUNZIONALE E FLESSIBILITA'",
                es: 'MOVIMIENTO FUNCIONAL',
                de: '',
                fr: 'ENTRAÎNEMENT FONCTIONNEL',
                us: 'Functional / Flexibility',
                ru: ''
            },
            'Functional training equipment': {
                it: "Attrezzi per l'allenamento funzionale",
                es: 'Equipo de entrenamiento funcional',
                de: '',
                fr: 'Equipements Entraînement Fonctionnel',
                us: 'Functional training equipment',
                ru: ''
            },
            'Group Cycle': {
                it: 'Group Cycle',
                es: 'Group Cycle',
                de: 'Group Cycle',
                fr: 'Group Cycle',
                us: 'Group Cycle',
                ru: ''
            },
            'Group Cycling': {
                it: 'Group Cycling',
                es: 'Group Cycling',
                de: 'Group Cycling',
                fr: 'Group Cycling',
                us: 'Group Cycling',
                ru: ''
            },
            'Kinesis': {
                it: 'Kinesis',
                es: 'Kinesis',
                de: 'Kinesis',
                fr: 'Kinesis',
                us: 'Kinesis',
                ru: ''
            },
            'Multigyms and cable stations': {
                it: 'Multigym e Cable Stations',
                es: 'Equipos de gimnasio multifunción y Cable Stations',
                de: '',
                fr: 'Multifonction et station à câbles',
                us: 'Multigyms and cable stations',
                ru: ''
            },
            'My Wellness': {
                it: 'My Wellness',
                es: 'My Wellness',
                de: 'My Wellness',
                fr: 'My Wellness',
                us: 'My Wellness',
                ru: ''
            },
            'Need advice choosing the perfect fitness equipment? Contact us': {
                it: 'Hai bisogno di aiuto per scegliere il prodotto che fa per te? Contattaci',
                es: '¿Necesitas asesoramiento para elegir el perfecto equipo de fitness? Contáctanos',
                de: '',
                fr: 'Vous avez besoin de conseils pour choisir le meilleur équipement fitness ? Contactez-nous',
                us: 'Need advice choosing the perfect fitness equipment? Contact us',
                ru: ''
            },
            'Need help': {
                it: 'Bisogno di aiuto',
                es: 'Necesitas ayuda',
                de: '',
                fr: 'Aide',
                us: 'Need help',
                ru: ''
            },
            'Newsroom': {
                it: 'Newsroom',
                es: 'Newsroom',
                de: 'Newsroom',
                fr: 'Newsroom',
                us: 'Newsroom',
                ru: ''
            },
            'OMNIA': {
                it: 'OMNIA',
                es: 'OMNIA',
                de: 'OMNIA',
                fr: 'OMNIA',
                us: 'OMNIA',
                ru: ''
            },
            'Our Most Popular Products': {
                it: 'I nostri prodotti più visti',
                es: 'Nuestros productos más vistos',
                de: '',
                fr: 'Nos produits les plus regardés',
                us: 'Our Most Popular Products',
                ru: ''
            },
            'Personal': {
                it: 'Personal',
                es: 'Personal',
                de: 'Personal',
                fr: 'Personal',
                us: 'Personal',
                ru: ''
            },
            'Personal Line': {
                it: 'Personal Line',
                es: 'Personal Line',
                de: 'Personal Line',
                fr: 'La ligne Personal',
                us: 'Personal Line',
                ru: ''
            },
            'Plate Loaded': {
                it: 'Attrezzi a carico libero',
                es: 'Pesos libres',
                de: '',
                fr: 'Poids Libres',
                us: 'Plate Loaded',
                ru: ''
            },
            'Plurima': {
                it: 'Plurima',
                es: 'Plurima',
                de: 'Plurima',
                fr: 'Plurima',
                us: 'Plurima',
                ru: ''
            },
            'Product Categories': {
                it: 'Categorie di prodotto',
                es: 'Categorías de productos',
                de: '',
                fr: 'Catégories de produits',
                us: 'Product Categories',
                ru: ''
            },
            'Product Ranges': {
                it: 'Linee di prodotto',
                es: 'Líneas de producto',
                de: '',
                fr: 'Lignes de produits',
                us: 'Product Ranges',
                ru: ''
            },
            'Pure Strength': {
                it: 'Pure Strength',
                es: 'Pure Strength',
                de: 'Pure Strength',
                fr: 'Pure Strength',
                us: 'Pure Strength',
                ru: ''
            },
            'Read more': {
                it: 'Scopri di più',
                es: 'Descubre más',
                de: '',
                fr: 'En savoir plus',
                us: 'Read more',
                ru: ''
            },
            'Rowers': {
                it: 'Rowers',
                es: 'Rowers',
                de: 'Rowers',
                fr: 'Rowers',
                us: 'Rowers',
                ru: ''
            },
            'Selection Pro': {
                it: 'Selection Pro',
                es: 'Selection Pro',
                de: 'Selection Pro',
                fr: 'Selection Pro',
                us: 'Selection Pro',
                ru: ''
            },
            'Selectorised': {
                it: 'Attrezzi isotonici',
                es: 'Selectorizados',
                de: '',
                fr: 'Charges Guidées',
                us: 'Selectorised',
                ru: ''
            },
            'Skilltools': {
                it: 'Skilltools',
                es: 'Skilltools',
                de: 'Skilltools',
                fr: 'Skilltools',
                us: 'Skilltools',
                ru: ''
            },
            'Stair Climbers': {
                it: 'Stair Climbers',
                es: 'Stair Climbers',
                de: 'Stair Climbers',
                fr: 'Stair Climbers',
                us: 'Stair Climbers',
                ru: ''
            },
            'Strength': {
                it: 'Forza',
                es: 'Fuerza',
                de: '',
                fr: 'Musculation',
                us: 'Strength',
                ru: ''
            },
            'Stretching': {
                it: 'Stretching',
                es: 'Stretching',
                de: 'Stretching',
                fr: 'Stretching',
                us: 'Stretching',
                ru: ''
            },
            'The ground-breaking workout that adapts to your own body, fitness goals and time.': {
                it: 'Il rivoluzionario allenamento che si adatta al tuo corpo, ai tuoi obiettivi di fitness e al tuo tempo.',
                es: "L'entraînement révolutionnaire qui s'adapte à votre corps, à vos objectifs de fitness et à votre temps.",
                de: '',
                fr: 'El entrenamiento innovador que se adapta a tu propio cuerpo, objetivos de ejercicio y tiempo.',
                us: 'The ground-breaking workout that adapts to your own body, fitness goals and time.',
                ru: ''
            },
            'Treadmills': {
                it: 'Tapis roulant',
                es: 'Cintas de correr',
                de: '',
                fr: 'Tapis de course',
                us: 'Treadmills',
                ru: ''
            },
            'Upper Body trainers': {
                it: 'Attrezzi per la parte superiore',
                es: 'Entrenamiento del tren superior',
                de: '',
                fr: 'Membres Supérieurs',
                us: 'Upper Body trainers',
                ru: ''
            },
            'View all products': {
                it: 'Tutti i Prodotti',
                es: 'Todos los productos',
                de: '',
                fr: 'Tous les produits',
                us: 'View all products',
                ru: ''
            },
            'Wellness Tools': {
                it: 'Wellness Tools',
                es: 'Wellness Tools',
                de: 'Wellness Tools',
                fr: 'Wellness Tools',
                us: 'Wellness Tools',
                ru: ''
            },
            'here': {
                it: 'qui',
                es: 'aquí',
                de: '',
                fr: 'ici',
                us: 'here',
                ru: ''
            },
            'https://www.technogym.com/gb/biocircuit/': {
                it: 'https://www.technogym.com/it/biocircuit/',
                es: 'https://www.technogym.com/es/biocircuit/',
                de: '',
                fr: 'https://www.technogym.com/fr/biocircuit/',
                us: 'https://www.technogym.com/gb/biocircuit/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/artis/': {
                it: 'https://www.technogym.com/it/line/linea-artis/',
                es: 'https://www.technogym.com/es/line/la-gama-artis/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-artis/',
                us: 'https://www.technogym.com/gb/line/artis/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/cable-stations-range/': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-multigym_e_cable_stations.html',
                es: 'https://www.technogym.com/es/line/la-gama-cable-stations/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-cable-stations/',
                us: 'https://www.technogym.com/gb/line/cable-stations-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/excite-range/': {
                it: 'https://www.technogym.com/it/line/excite-range/',
                es: 'https://www.technogym.com/es/line/excite-range/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/excite-range/',
                us: 'https://www.technogym.com/gb/line/excite-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/formanew-release/': {
                it: 'https://www.technogym.com/it/line/formanew-release/',
                es: 'https://www.technogym.com/es/line/formanew-release/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/formanew-release/',
                us: 'https://www.technogym.com/gb/line/formanew-release/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/selection-pro/': {
                it: 'https://www.technogym.com/it/line/selection/',
                es: 'https://www.technogym.com/es/line/selection/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/selection',
                us: 'https://www.technogym.com/gb/line/selection-pro/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-arke-range/': {
                it: 'https://www.technogym.com/it/line/linea-arke/',
                es: 'https://www.technogym.com/es/line/la-gama-arke/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-arke/',
                us: 'https://www.technogym.com/gb/line/the-arke-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-element-range/': {
                it: 'https://www.technogym.com/it/line/linea-element/',
                es: 'https://www.technogym.com/es/line/la-gama-element/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-element/',
                us: 'https://www.technogym.com/gb/line/the-element-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-flexability-range/': {
                it: 'https://www.technogym.com/it/line/linea-flexability/',
                es: 'https://www.technogym.com/es/line/la-gama-flexability/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-flexability/',
                us: 'https://www.technogym.com/gb/line/the-flexability-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-group-cycle-range/': {
                it: 'https://www.technogym.com/it/line/linea-group-cycle/',
                es: 'https://www.technogym.com/es/line/la-gama-group-cycle/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-group-cycle/',
                us: 'https://www.technogym.com/gb/line/the-group-cycle-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-kinesis-stations-range/': {
                it: 'https://www.technogym.com/it/line/linea-kinesis/',
                es: 'https://www.technogym.com/es/line/la-gama-kinesis/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-kinesis/',
                us: 'https://www.technogym.com/gb/line/the-kinesis-stations-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-omnia-range/': {
                it: 'https://www.technogym.com/it/line/linea-omnia/',
                es: 'https://www.technogym.com/es/line/la-gama-omnia/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-omnia/',
                us: 'https://www.technogym.com/gb/line/the-omnia-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-personal-range/': {
                it: 'https://www.technogym.com/it/line/linea-personal/',
                es: 'https://www.technogym.com/es/line/la-gama-personal/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-personal/',
                us: 'https://www.technogym.com/gb/line/the-personal-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-plurima-range/': {
                it: 'https://www.technogym.com/it/line/linea-plurima/',
                es: 'https://www.technogym.com/es/line/la-gama-plurima',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-plurima/',
                us: 'https://www.technogym.com/gb/line/the-plurima-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-pure-strength-range/': {
                it: 'https://www.technogym.com/it/line/linea-pure/',
                es: 'https://www.technogym.com/es/line/la-gama-pure/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-pure/',
                us: 'https://www.technogym.com/gb/line/the-pure-strength-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/line/the-wellness-tools-range/': {
                it: 'https://www.technogym.com/it/line/linea-wellness-tools/',
                es: 'https://www.technogym.com/es/line/la-gama-wellness-tools/',
                de: '',
                fr: 'https://www.technogym.com/fr/line/la-gamme-wellness-tools/',
                us: 'https://www.technogym.com/gb/line/the-wellness-tools-range/',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-accessories.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-accessori.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-accesorios.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-accessoires.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-accessories.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-benches_racks.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-panche_e_rastrelliere.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-bancos_de_pesas_y_musculacion.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-bancs_rateliers.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-benches_racks.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-elliptical_cross_trainers.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-cross_trainer_ellittici.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-elipticas.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-elliptiques_cross_trainers.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-elliptical_cross_trainers.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-bike.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-bicicletas_estaticas.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-velos_d_entrainement.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-free_weights.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-pesi_liberi.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-pesos_libres.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-poids_libres.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-free_weights.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-functional_training_equipment.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-attrezzi_per_l_allenamento_funzionale.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-equipo_de_entrenamiento_funcional.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-equipements_entrainement_fonctionnel.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-functional_training_equipment.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-group_cycling.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-group_cycling.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-group_cycling.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-group_cycling.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-group_cycling.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-multigyms_and_cable_stations.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-multigym_e_cable_stations.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-equipos_de_gimnasio_multifuncion_y_cable_stations.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-multifonction_et_station_a_cables.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-multigyms_and_cable_stations.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-plate_loaded.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-attrezzi_a_carico_libero.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-palanca.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-charges_libres.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-plate_loaded.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-rowers.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-rowers.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-rowers.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-rowers.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-rowers.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-selectorised.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-attrezzi_isotonici.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-selectorizados.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-charges_guidees.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-selectorised.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-stair_climbers.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-stair_climbers.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-stair_climbers.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-stair_climbers.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-stair_climbers.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-stretching.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-stretching.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-estiramiento.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-stretching.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-stretching.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-treadmills.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-tapis_roulant.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-cintas_de_correr.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-tapis_de_course.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-treadmills.html',
                ru: ''
            },
            'https://www.technogym.com/gb/products/shopby/product_type-upper_body_trainers.html': {
                it: 'https://www.technogym.com/it/products/shopby/product_type-attrezzi_per_la_parte_superiore.html',
                es: 'https://www.technogym.com/es/products/shopby/product_type-entrenamiento_del_tren_superior.html',
                de: '',
                fr: 'https://www.technogym.com/fr/products/shopby/product_type-membres_superieurs.html',
                us: 'https://www.technogym.com/gb/products/shopby/product_type-upper_body_trainers.html',
                ru: ''
            },
            'https://www.technogym.com/gb/skilltools-kit.html': {
                it: 'https://www.technogym.com/it/skilltools-kit.html',
                es: 'https://www.technogym.com/es/skilltools-kit.html',
                de: '',
                fr: 'https://www.technogym.com/fr/skilltools-kit.html',
                us: 'https://www.technogym.com/gb/skilltools-kit.html',
                ru: ''
            },
            'or advice?': {
                it: 'o di consiglio?',
                es: 'o asesoramiento?',
                de: '',
                fr: 'Conseils/Assistance?',
                us: 'or advice?',
                ru: ''
            }
        },
        popular: {
            'home': {
                'gb': [{
                    title: 'MYRUN',
                    link: 'https://www.technogym.com/gb/treadmill-myrun.html',
                    price: '£3,250.00',
                    img: '//cdn.optimizely.com/img/8355110909/b3874915f219488691e101d5c9c491b0.jpg'
                }, {
                    title: 'RUN PERSONAL',
                    link: 'https://www.technogym.com/gb/run-personal.html',
                    img: '//cdn.optimizely.com/img/8355110909/10730fc3d9d9486f98df868674865eb8.jpg',
                    price: '£13,000.00'
                }, {
                    title: 'MYCYCLING',
                    link: 'https://www.technogym.com/gb/mycycling.html',
                    img: "//cdn.optimizely.com/img/8355110909/e0da501678674e87b36774a0125d0037.jpg",
                    price: '£1,590.00'
                }, {
                    title: 'RECLINE PERSONAL',
                    img: "//cdn.optimizely.com/img/8355110909/4b203e12892b4fc38848b5a79454c0ca.jpg",
                    link: 'https://www.technogym.com/gb/recline-personal.html',
                    price: '£9,250.00'
                }, {
                    title: 'CROSS PERSONAL',
                    img: '//cdn.optimizely.com/img/8355110909/533ce87b30f445588d1819e0a0300a9c.jpg',
                    link: 'https://www.technogym.com/gb/cross-personal.html',
                    price: '£12,000.00'
                }, {
                    title: 'SKILLROW™',
                    img: "//cdn.optimizely.com/img/8355110909/631e94aebef04844a81ca73f693ae000.jpg",
                    link: 'https://www.technogym.com/gb/skillrow.html',
                    price: '£3,490.00'
                }],
                'it': [{
                    title: 'MYRUN',
                    link: 'https://www.technogym.com/it/tapis-roulant-myrun.html',
                    price: '€ 3.250,00',
                    img: '//cdn.optimizely.com/img/8355110909/b3874915f219488691e101d5c9c491b0.jpg'
                }, {
                    title: 'RUN PERSONAL',
                    link: 'https://www.technogym.com/it/run-personal.html',
                    img: '//cdn.optimizely.com/img/8355110909/10730fc3d9d9486f98df868674865eb8.jpg',
                    price: '€ 13.500,00'
                }, {
                    title: 'MYCYCLING',
                    link: 'https://www.technogym.com/it/mycycling.html',
                    img: "//cdn.optimizely.com/img/8355110909/e0da501678674e87b36774a0125d0037.jpg",
                    price: '€ 1.790,00'
                }, {
                    title: 'RECLINE PERSONAL',
                    img: "//cdn.optimizely.com/img/8355110909/4b203e12892b4fc38848b5a79454c0ca.jpg",
                    link: 'https://www.technogym.com/it/recline-personal.html',
                    price: '€ 9.750,00'
                }, {
                    title: 'CROSS PERSONAL',
                    img: '//cdn.optimizely.com/img/8355110909/533ce87b30f445588d1819e0a0300a9c.jpg',
                    link: 'https://www.technogym.com/it/cross-personal.html',
                    price: '€ 12.500,00'
                }, {
                    title: 'SKILLROW™',
                    img: "//cdn.optimizely.com/img/8355110909/631e94aebef04844a81ca73f693ae000.jpg",
                    link: 'https://www.technogym.com/it/skillrow.html',
                    price: '€ 3.490,00'
                }],
                'es': [{
                    title: 'MYRUN',
                    link: 'https://www.technogym.com/es/cinta-de-correr-myrun.html',
                    price: '€ 3.250,00',
                    img: '//cdn.optimizely.com/img/8355110909/b3874915f219488691e101d5c9c491b0.jpg'
                }, {
                    title: 'RUN PERSONAL',
                    link: 'https://www.technogym.com/es/run-personal.html',
                    img: '//cdn.optimizely.com/img/8355110909/10730fc3d9d9486f98df868674865eb8.jpg',
                    price: '€ 13.500,00'
                }, {
                    title: 'MYCYCLING',
                    link: 'https://www.technogym.com/es/mycycling.html',
                    img: "//cdn.optimizely.com/img/8355110909/e0da501678674e87b36774a0125d0037.jpg",
                    price: '€ 1.790,00'
                }, {
                    title: 'RECLINE PERSONAL',
                    img: "//cdn.optimizely.com/img/8355110909/4b203e12892b4fc38848b5a79454c0ca.jpg",
                    link: 'https://www.technogym.com/es/recline-personal.html',
                    price: '€ 9.750,00'
                }, {
                    title: 'CROSS PERSONAL',
                    img: '//cdn.optimizely.com/img/8355110909/533ce87b30f445588d1819e0a0300a9c.jpg',
                    link: 'https://www.technogym.com/es/cross-personal.html',
                    price: '€ 12.500,00'
                }, {
                    title: 'SKILLROW™',
                    img: "//cdn.optimizely.com/img/8355110909/631e94aebef04844a81ca73f693ae000.jpg",
                    link: 'https://www.technogym.com/es/skillrow.html',
                    price: '€ 3.490,00'
                }],
                'fr': [{
                    title: 'MYRUN',
                    link: 'https://www.technogym.com/fr/treadmill-myrun.html',
                    price: '3 250,00 €',
                    img: '//cdn.optimizely.com/img/8355110909/b3874915f219488691e101d5c9c491b0.jpg'
                }, {
                    title: 'RUN PERSONAL',
                    link: 'https://www.technogym.com/fr/run-personal.html',
                    img: '//cdn.optimizely.com/img/8355110909/10730fc3d9d9486f98df868674865eb8.jpg',
                    price: '13 500,00 €'
                }, {
                    title: 'MYCYCLING',
                    link: 'https://www.technogym.com/fr/mycycling.html',
                    img: "//cdn.optimizely.com/img/8355110909/e0da501678674e87b36774a0125d0037.jpg",
                    price: '1 790,00 €'
                }, {
                    title: 'RECLINE PERSONAL',
                    img: "//cdn.optimizely.com/img/8355110909/4b203e12892b4fc38848b5a79454c0ca.jpg",
                    link: 'https://www.technogym.com/fr/recline-personal.html',
                    price: '9 750,00 €'
                }, {
                    title: 'CROSS PERSONAL',
                    img: '//cdn.optimizely.com/img/8355110909/533ce87b30f445588d1819e0a0300a9c.jpg',
                    link: 'https://www.technogym.com/fr/cross-personal.html',
                    price: '12 500,00 €'
                }, {
                    title: 'SKILLROW™',
                    img: "//cdn.optimizely.com/img/8355110909/631e94aebef04844a81ca73f693ae000.jpg",
                    link: 'https://www.technogym.com/fr/skillrow.html',
                    price: '3 490,00 €'
                }]
            },
            'business': {
                'gb': [{
                    title: 'SKILLRUN',
                    img: '//cdn.optimizely.com/img/8355110909/0b54260e2fad4080add5dc4bb50548e5.jpg',
                    link: 'https://www.technogym.com/gb/skillrun.html',
                    price: ''
                }, {
                    title: 'SKILLTOOLS',
                    img: '//cdn.optimizely.com/img/8355110909/4b078625736e4aa98a0d0f515645aa1d.jpg',
                    link: 'https://www.technogym.com/gb/skilltools-kit.html',
                    price: ''
                }, {
                    title: 'SKILLMILL CONNECT',
                    img: '//cdn.optimizely.com/img/8355110909/f6bae37f21a64c74aeb2ee0cf88a0267.jpg',
                    link: 'https://www.technogym.com/gb/skillmill-connect.html',
                    price: ''
                }, {
                    title: 'ARTIS RUN',
                    img: '//cdn.optimizely.com/img/8355110909/0f7721f793af4ad88a044075c565e490.jpg',
                    link: 'https://www.technogym.com/gb/treadmill-artis-run-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS RECLINE',
                    img: '//cdn.optimizely.com/img/8355110909/05e12788b9694250a32f24a724cf1d6b.jpg',
                    link: 'https://www.technogym.com/gb/artis-recline-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS SYNCHRO',
                    img: '//cdn.optimizely.com/img/8355110909/a0f8d4d7cc424d0c89c212fe7e8334dc.jpg',
                    link: 'https://www.technogym.com/gb/artis-synchro-standard.html',
                    price: ''
                }],
                'it': [{
                    title: 'SKILLRUN',
                    img: '//cdn.optimizely.com/img/8355110909/0b54260e2fad4080add5dc4bb50548e5.jpg',
                    link: 'https://www.technogym.com/it/skillrun.html',
                    price: ''
                }, {
                    title: 'SKILLTOOLS',
                    img: '//cdn.optimizely.com/img/8355110909/4b078625736e4aa98a0d0f515645aa1d.jpg',
                    link: 'https://www.technogym.com/it/skilltools-kit.html',
                    price: ''
                }, {
                    title: 'SKILLMILL CONNECT',
                    img: '//cdn.optimizely.com/img/8355110909/f6bae37f21a64c74aeb2ee0cf88a0267.jpg',
                    link: 'https://www.technogym.com/it/skillmill-connect-technogym.html',
                    price: ''
                }, {
                    title: 'ARTIS RUN',
                    img: '//cdn.optimizely.com/img/8355110909/0f7721f793af4ad88a044075c565e490.jpg',
                    link: 'https://www.technogym.com/it/treadmill-artis-run-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS RECLINE',
                    img: '//cdn.optimizely.com/img/8355110909/05e12788b9694250a32f24a724cf1d6b.jpg',
                    link: 'https://www.technogym.com/it/artis-recline-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS SYNCHRO',
                    img: '//cdn.optimizely.com/img/8355110909/a0f8d4d7cc424d0c89c212fe7e8334dc.jpg',
                    link: 'https://www.technogym.com/it/artis-synchro-standard.html',
                    price: ''
                }],
                'es': [{
                    title: 'SKILLRUN',
                    img: '//cdn.optimizely.com/img/8355110909/0b54260e2fad4080add5dc4bb50548e5.jpg',
                    link: 'https://www.technogym.com/es/skillrun.html',
                    price: ''
                }, {
                    title: 'SKILLTOOLS',
                    img: '//cdn.optimizely.com/img/8355110909/4b078625736e4aa98a0d0f515645aa1d.jpg',
                    link: 'https://www.technogym.com/es/skilltools-kit.html',
                    price: ''
                }, {
                    title: 'SKILLMILL CONNECT',
                    img: '//cdn.optimizely.com/img/8355110909/f6bae37f21a64c74aeb2ee0cf88a0267.jpg',
                    link: 'https://www.technogym.com/es/skillmill-connect-technogym.html',
                    price: ''
                }, {
                    title: 'ARTIS RUN',
                    img: '//cdn.optimizely.com/img/8355110909/0f7721f793af4ad88a044075c565e490.jpg',
                    link: 'https://www.technogym.com/es/treadmill-artis-run-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS RECLINE',
                    img: '//cdn.optimizely.com/img/8355110909/05e12788b9694250a32f24a724cf1d6b.jpg',
                    link: 'https://www.technogym.com/es/artis-recline-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS SYNCHRO',
                    img: '//cdn.optimizely.com/img/8355110909/a0f8d4d7cc424d0c89c212fe7e8334dc.jpg',
                    link: 'https://www.technogym.com/es/artis-synchro-standard.html',
                    price: ''
                }],
                'fr': [{
                    title: 'SKILLRUN',
                    img: '//cdn.optimizely.com/img/8355110909/0b54260e2fad4080add5dc4bb50548e5.jpg',
                    link: 'https://www.technogym.com/fr/skillrun.html',
                    price: ''
                }, {
                    title: 'SKILLTOOLS',
                    img: '//cdn.optimizely.com/img/8355110909/4b078625736e4aa98a0d0f515645aa1d.jpg',
                    link: 'https://www.technogym.com/fr/skilltools-kit.html',
                    price: ''
                }, {
                    title: 'SKILLMILL CONNECT',
                    img: '//cdn.optimizely.com/img/8355110909/f6bae37f21a64c74aeb2ee0cf88a0267.jpg',
                    link: 'https://www.technogym.com/fr/skillmill-connect-technogym.html',
                    price: ''
                }, {
                    title: 'ARTIS RUN',
                    img: '//cdn.optimizely.com/img/8355110909/0f7721f793af4ad88a044075c565e490.jpg',
                    link: 'https://www.technogym.com/fr/treadmill-artis-run-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS RECLINE',
                    img: '//cdn.optimizely.com/img/8355110909/05e12788b9694250a32f24a724cf1d6b.jpg',
                    link: 'https://www.technogym.com/fr/artis-recline-standard.html',
                    price: ''
                }, {
                    title: 'ARTIS SYNCHRO',
                    img: '//cdn.optimizely.com/img/8355110909/a0f8d4d7cc424d0c89c212fe7e8334dc.jpg',
                    link: 'https://www.technogym.com/fr/artis-synchro-standard.html',
                    price: ''
                }]
            }
        }
    };
    
    var translationsMap = [];
    
    var getLanguage = function getLanguage() {
        var result = 'gb';
        if (!!window.location.hostname.match(/technogym.ru/)) {
            result = 'ru';
        } else {
            result = window.location.pathname.substring(1).match(/^it|gb|fr|de|es|us/) + '';
        }
    
        return result;
    };
    
    var __ = function __(str) {
        if (translationsMap.indexOf(str) == -1) {
            translationsMap.push(str);
        }
    
        var lang = getLanguage();
        return (config.strings[str] || {})[lang] || str;
    };
    
    window.TG023_translations_list = function () {
        translationsMap.sort();
        console.log(translationsMap.join('\n'));
    };
    
    window.TG023_translations_object = function () {
        translationsMap.sort();
        var modifiedMap = translationsMap.map(function (item) {
    
            return '\'' + item + '\': {\n  it: \'\',\n  es: \'\',\n  de: \'\',\n  fr: \'\',\n  us: \'' + item + '\',\n  ru: \'\',\n},';
        });
    
        console.log(modifiedMap.join('\n'));
    };
    
    var $$2 = window.jQuery;
    
    var allProductsSlider = $$2('\n    <div class="tg23-all-products-slider">\n        <div class="tg23-all-products-toggle">\n          <span class="tg23-toggle tg23-toggle--cats tg23-toggle--active">\n            ' + __('Product Categories') + '\n          </span>\n          <span class="tg23-toggle tg23-toggle--ranges">\n            ' + __('Product Ranges') + '\n          </span>\n        </div>\n\n        <div class="tg23-all-products-slider__inner">\n          <ul class="tg23-all-products-slider__categories">\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-accessories.html') + '">\n                                  <span class="icon-Shape_wellness_tools"></span>\n                                  <span>' + __('Accessories') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-benches_racks.html') + '">\n                                  <span class="icon-Shape_Benches-n-Racks"></span>\n                                  <span>' + __('Benches &amp; Racks') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-elliptical_cross_trainers.html') + '">\n                                  <span class="icon-Shape_Elliptical-Cross-Trainers"></span>\n                                  <span>' + __('Elliptical Cross Trainers') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html') + '">\n                                  <span class="icon-Shape_Exercise-bikes"></span>\n                                  <span>' + __('Exercise bikes') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-free_weights.html') + '">\n                                  <span class="icon-Shape_Free-Weights"></span>\n                                  <span>' + __('Free Weights') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-functional_training_equipment.html') + '">\n                                  <span class="icon-Shape_Functional-training-equipment"></span>\n                                  <span>' + __('Functional training equipment') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-group_cycling.html') + '">\n                                  <span class="icon-Shape_Group-Cycling"></span>\n                                  <span>' + __('Group Cycling') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-multigyms_and_cable_stations.html') + '">\n                                  <span class="icon-Shape_Multigyms-and-cable-stations"></span>\n                                  <span>' + __('Multigyms and cable stations') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-plate_loaded.html') + '">\n                                  <span class="icon-Shape_Plate-Loaded"></span>\n                                  <span>' + __('Plate Loaded') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-rowers.html') + '">\n                                  <span class="icon-Shape_Rowers"></span>\n                                  <span>' + __('Rowers') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-selectorised.html') + '">\n                                  <span class="icon-Shape_Selectorised"></span>\n                                  <span>' + __('Selectorised') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-stair_climbers.html') + '">\n                                  <span class="icon-Shape_Stair-Climbers"></span>\n                                  <span>' + __('Stair Climbers') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-stretching.html') + '">\n                                  <span class="icon-Shape_Stretching"></span>\n                                  <span>' + __('Stretching') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-treadmills.html') + '">\n                                  <span class="icon-Shape_Treadmills"></span>\n                                  <span>' + __('Treadmills') + '</span>\n                              </a>\n                          </li>\n              <li class="">\n                              <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-upper_body_trainers.html') + '">\n                                  <span class="icon-Shape_Upper-Body-trainers"></span>\n                                  <span>' + __('Upper Body trainers') + '</span>\n                              </a>\n                          </li>\n          </ul>\n\n          <ul class="tg23-all-products-slider__ranges tg23-hide">\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-arke-range/') + '">' + __('ARKE') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/artis/') + '">' + __('ARTIS') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/cable-stations-range/') + '">' + __('Cable Stations') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-element-range/') + '">' + __('Element+') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/excite-range/') + '">' + __('Excite') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-flexability-range/') + '">' + __('FLEXability') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/formanew-release/') + '">' + __('Forma') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-group-cycle-range/') + '">' + __('Group Cycle') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-kinesis-stations-range/') + '">' + __('Kinesis') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-omnia-range/') + '">' + __('OMNIA') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-personal-range/') + '">' + __('Personal') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-plurima-range/') + '">' + __('Plurima') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-pure-strength-range/') + '">' + __('Pure Strength') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/selection-pro/') + '">' + __('Selection Pro') + '</a></span>\n              <span><a href="' + __('https://www.technogym.com/gb/line/the-wellness-tools-range/') + '">' + __('Wellness Tools') + '</a></span>\n          </ul>\n        </div>\n\n        <p class="tg23-all-products-slider__view-all">\n            <a class="button btn-default" href="/products.html">\n                ' + __('View all products') + '\n                &gt;\n            </a>\n        </p>\n    </div>\n');
    
    var $$3 = window.jQuery;
    
    var allProductsColumnar = $$3('\n    <div class="tg23-all-products-columnar row">\n        <div class="col-xs-4 tg23-strength">\n            <h2>' + __('Strength') + '</h2>\n            <ul>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-plate_loaded.html') + '">\n                        <span class="icon-Shape_Plate-Loaded"></span>\n                        <span>' + __('Plate Loaded') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-multigyms_and_cable_stations.html') + '">\n                        <span class="icon-Shape_Multigyms-and-cable-stations"></span>\n                        <span>' + __('Multigyms and cable stations') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-benches_racks.html') + '">\n                        <span class="icon-Shape_Benches-n-Racks"></span>\n                        <span>' + __('Benches &amp; Racks') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-upper_body_trainers.html') + '">\n                        <span class="icon-Shape_Upper-Body-trainers"></span>\n                        <span>' + __('Upper Body trainers') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-selectorised.html') + '">\n                        <span class="icon-Shape_Selectorised"></span>\n                        <span>' + __('Selectorised') + '</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <div class="col-xs-4 tg23-cardio">\n            <h2>' + __('Cardio') + '</h2>\n            <ul>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-treadmills.html') + '">\n                        <span class="icon-Shape_Treadmills"></span>\n                        <span>' + __('Treadmills') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html') + '">\n                        <span class="icon-Shape_Exercise-bikes"></span>\n                        <span>' + __('Exercise bikes') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-elliptical_cross_trainers.html') + '">\n                        <span class="icon-Shape_Elliptical-Cross-Trainers"></span>\n                        <span>' + __('Elliptical Cross Trainers') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-stair_climbers.html') + '">\n                        <span class="icon-Shape_Stair-Climbers"></span>\n                        <span>' + __('Stair Climbers') + '</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <div class="col-xs-4 tg23-functional">\n            <h2>' + __('Functional / Flexibility') + '</h2>\n            <ul>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-rowers.html') + '">\n                        <span class="icon-Shape_Rowers"></span>\n                        <span>' + __('Rowers') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-free_weights.html') + '">\n                        <span class="icon-Shape_Free-Weights"></span>\n                        <span>' + __('Free Weights') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-stretching.html') + '">\n                        <span class="icon-Shape_Stretching"></span>\n                        <span>' + __('Stretching') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-accessories.html') + '">\n                        <span class="icon-Shape_wellness_tools"></span>\n                        <span>' + __('Accessories') + '</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="' + __('https://www.technogym.com/gb/products/shopby/product_type-functional_training_equipment.html') + '">\n                        <span class="icon-Shape_Functional-training-equipment"></span>\n                        <span>' + __('Functional training equipment') + '</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n');
    
    var slides = {
        'default': [{
            title: __('Recline Personal'),
            text: __("Integrating performance through innovative technology and style with sophisticated design. Workout in the highest comfort."),
            link: __('https://www.technogym.com/gb/recline-personal.html'),
            buttonText: __('Buy Online'),
            background: __('//cdn.optimizely.com/img/8355110909/194fb472d90e480a90d9787fd91dee8e.jpg')
        }, {
            title: __('Cross Personal'),
            text: __("A perfect synthesis of expert detailing and style for a complete total body workout. Enjoy a multi-sensory experience."),
            link: __('https://www.technogym.com/gb/cross-personal.html'),
            buttonText: __('Buy Online'),
            background: __('//cdn.optimizely.com/img/8355110909/46db2749f0a14507ab8b8b17d1bb6870.jpg')
        }, {
            title: __('Run Personal'),
            text: __("A perfect mix of exclusive materials, extraordinary craftsmanship and engaging multimedia experiences for the ultimate home workout."),
            link: __('https://www.technogym.com/gb/run-personal.html'),
            buttonText: __('Buy Online'),
            background: __('//cdn.optimizely.com/img/8355110909/eeab47462818485f9263d19fb35ccc17.jpg')
        }],
        'it': [{
            title: 'Recline Personal',
            text: "Il risultato migliore di tecnologia all'avanguardia e design ricercato.",
            link: 'https://www.technogym.com/it/recline-personal.html',
            buttonText: 'Acquista Online',
            background: '//cdn.optimizely.com/img/8355110909/194fb472d90e480a90d9787fd91dee8e.jpg'
        }, {
            title: 'Cross Personal',
            text: "Una sintesi perfetta di dettagli e di stile, l'esperienza multisensoriale di un allenamento completo.",
            link: 'https://www.technogym.com/it/cross-personal.html',
            buttonText: 'Acquista Online',
            background: '//cdn.optimizely.com/img/8355110909/46db2749f0a14507ab8b8b17d1bb6870.jpg'
        }, {
            title: 'Run Personal',
            text: "Un perfetto mix di materiali esclusivi, straordinaria artigianalità, un capolavoro dal design unico e senza tempo.",
            link: 'https://www.technogym.com/it/run-personal.html',
            buttonText: 'Acquista Online',
            background: '//cdn.optimizely.com/img/8355110909/eeab47462818485f9263d19fb35ccc17.jpg'
        }]
    };
    
    var ddslider = function () {
    
        var autoplayDelay = 4000;
    
        var animDuration = 300;
    
        var animFrames = 60 * animDuration / 1000;
    
        var mainSlidesAnimationId = null;
    
        var autoplayInterval = null;
    
        var curSlide = 0;
    
        var activeSlide = 1;
    
        var initBackgrounds = function initBackgrounds(bgSlides) {
            var slides = bgSlides.children;
            [].forEach.call(slides, function (slide, idx) {
                slide.dataset['tg23idx'] = idx + 1;
                bgSlides.insertAdjacentElement('afterbegin', slide);
            });
        };
    
        var initSlides = function initSlides(mainSlides) {
            var slides = mainSlides.children;
            var slideClone = slides[slides.length - 1].cloneNode(true);
    
            mainSlides.insertAdjacentElement('afterbegin', slideClone);
    
            slideClone.style['margin-left'] = '-100%';
        };
    
        var animateBackground = function animateBackground(bgSlides, slideToShow) {
            var slides = bgSlides.children;
            var numSlides = slides.length;
    
            var whichSlideNext = slideToShow;
            if (whichSlideNext == 0) {
                whichSlideNext = numSlides;
            } else if (whichSlideNext > numSlides) {
                whichSlideNext = 1;
            }
    
            var lastSlide = slides[numSlides - 1];
            var lastSlideIndex = parseInt(lastSlide.dataset['tg23idx'], 10);
            if (lastSlideIndex == whichSlideNext) {
                return;
            }
    
            var nextSlide = bgSlides.querySelector('[data-tg23idx="' + whichSlideNext + '"]');
            lastSlide.insertAdjacentElement('beforebegin', nextSlide);
    
            lastSlide.classList.add('tg23-slider__slide--goingout');
            nextSlide.classList.add('tg23-slider__slide--comingin');
    
            var animEnd = function animEnd(e) {
                var slides = bgSlides.children;
                var lastSlide = slides[slides.length - 1];
                var nextSlide = slides[slides.length - 2];
    
                if (lastSlide.classList.contains('tg23-slider__slide--goingout')) {
                    lastSlide.classList.remove('tg23-slider__slide--goingout');
                    nextSlide.classList.remove('tg23-slider__slide--comingin');
    
                    bgSlides.insertAdjacentElement('afterbegin', lastSlide);
                }
            };
    
            [].forEach.call(slides, function (slide) {
                if (!slide.classList.contains('tg23-slider__slide--attached')) {
                    slide.classList.add('tg23-slider__slide--attached');
    
                    slide.addEventListener('webkitAnimationEnd', animEnd);
                    slide.addEventListener('animationEnd', animEnd);
                }
            });
        };
    
        var animateSlide = function animateSlide(mainSlides, to, direction) {
            if (mainSlidesAnimationId) {
                return;
            }
    
            var kids = mainSlides.children;
            var realNumSlides = kids.length - 1;
    
            if (to == realNumSlides) {
                to = 0;
            }
    
            if (to < -1) {
                to = Math.max(0, kids.length - 3);
            }
    
            var firstSlide = kids[0];
            var maxMargin = 100 * (kids.length - 1);
            var toMargin = 100 * (to + 1);
            var curMargin = Math.abs(parseInt(firstSlide.style['margin-left'], 10));
    
            if (curMargin == 0 && direction == -1) {
                curMargin = maxMargin;
    
                firstSlide.style['margin-left'] = -curMargin + '%';
            } else if (curMargin == maxMargin && direction == 1) {
                curMargin = 0;
    
                firstSlide.style['margin-left'] = curMargin + '%';
            }
    
            if (curMargin == toMargin) {
                return;
            }
    
            var marginPerStep = (toMargin - curMargin) / animFrames;
    
            var step = function step() {
                var newMargin = -curMargin - marginPerStep;
                if (marginPerStep > 0 && newMargin < -toMargin || marginPerStep < 0 && newMargin > -toMargin) {
                    newMargin = -toMargin;
                }
    
                firstSlide.style['margin-left'] = newMargin + '%';
                curMargin = Math.abs(newMargin);
    
                if (newMargin == -toMargin) {
                    mainSlidesAnimationId = null;
    
                    curSlide = to; 
    
                    activeSlide = newMargin == 0 ? realNumSlides : Math.abs(newMargin) / 100;
    
                    return;
                } else {
                    mainSlidesAnimationId = requestAnimationFrame(step);
                }
            };
    
            requestAnimationFrame(step);
        };
    
        var stop = function stop() {
            clearInterval(autoplayInterval);
        };
    
        var init = function init(bgSlides, mainSlides, prevElm, nextElm) {
            var autoplay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    
            initBackgrounds(bgSlides);
            initSlides(mainSlides);
    
            if (autoplay) {
                autoplayInterval = setInterval(function () {
                    animateSlide(mainSlides, curSlide + 1, 1);
                    animateBackground(bgSlides, activeSlide + 1);
                }, autoplayDelay);
            }
    
            if (prevElm && nextElm) {
                prevElm.addEventListener('click', function () {
                    stop();
    
                    animateSlide(mainSlides, curSlide - 1, -1);
                    animateBackground(bgSlides, activeSlide - 1);
                });
    
                nextElm.addEventListener('click', function () {
                    stop();
    
                    animateSlide(mainSlides, curSlide + 1, 1);
                    animateBackground(bgSlides, activeSlide + 1);
                });
            }
        };
    
        return {
            init: init
        };
    }();
    
    var $$1 = null;
    
    var VARIATION = null;
    if (typeof TG23VARIATION != 'undefined') {
        VARIATION = TG23VARIATION;
    } else {
        VARIATION = 1;
    }
    
    var eventSender = events.setDefaultCategory('TG023---Homepage Redesign---V' + VARIATION);
    
    var rebuildHeader = function rebuildHeader() {
        var navbarBottom = $$1('#navbar-bottom'),
            navTopRight = $$1('#navtop-right'),
            navTopMenuUl = $$1('#navtop-menu ul'),
            menuUl = navbarBottom.find('.inside ul:first'),
            headerContainer = $$1('.header-container'),
            toolSearch = $$1('.navbar-header .tool-search');
    
    
    
        var slidesToUse = slides[getLanguage()] ? slides[getLanguage()] : slides['default'];
    
        $$1('.header-container').prepend('\n      <div class="tg23-slider">\n      </div>\n    ');
        slidesToUse.forEach(function (slide) {
            $$1('.tg23-slider').append('\n          <div class="tg23-slider__slide" \n            style="background-image: url(\'' + slide.background + '\')"></div>\n        ');
        });
    
    
    
        headerContainer.append('\n        <div class="tg23-splash">\n          <a class="tg23-splash-button tg23-splash-button--prev"></a>\n\n          <div class="tg23-splash-slides">\n          </div>\n\n          <a class="tg23-splash-button tg23-splash-button--next"></a>\n        </div>\n    ');
    
        slidesToUse.forEach(function (slide) {
            $$1('.tg23-splash-slides').append('\n            <div class="tg23-splash__slide">\n              <h1 class="' + (slide.smallerTitle ? 'tg23-smaller' : '') + '">' + slide.title + '</h1>\n              <p class="tg23-subtitle">\n                ' + slide.text + '\n              </p>\n              <p class="tg23-btnwrap">\n                  <a href="' + slide.link + '"\n                    class="button btn-default tg23-btn tg23-btn-splash">' + slide.buttonText + '</a>\n              </p>\n            </div>\n        ');
        });
    
        var tel = $$1('.call-us p:last').text().trim();
        headerContainer.append('\n        <div class="tg23-callout">\n            <div class="tg23-callout__inner">\n                <p class="tg23-callout__icon"><span class="icon-Callus"></span>\n                <p class="tg23-callout__msg">' + __('Need help') + '<br>' + __('or advice?') + '</p>\n                <p class="tg23-callout__tel">' + tel + '<?p>\n            </div>\n        </div>\n    ');
    };
    
    var buildContentRegion = function buildContentRegion() {
        $$1('.content-container').before('\n        <div class="tg23-content clearfix">\n        </div>\n    ');
    
        var content = $$1('.tg23-content');
    
        content.append(allProductsSlider);
        var sliderCats = allProductsSlider.find('.tg23-all-products-slider__categories');
        sliderCats.slick({
            dots: false,
            slidesToShow: 7
        });
    
        $$1('.tg23-toggle').on('click', function (e) {
            if (e.currentTarget.classList.contains('tg23-toggle--ranges')) {
                $$1('.tg23-toggle--cats').removeClass('tg23-toggle--active');
                $$1('.tg23-toggle--ranges').addClass('tg23-toggle--active');
    
                $$1('.tg23-all-products-slider__categories').addClass('tg23-hide');
                $$1('.tg23-all-products-slider__ranges').removeClass('tg23-hide');
            } else {
                $$1('.tg23-toggle--cats').addClass('tg23-toggle--active');
                $$1('.tg23-toggle--ranges').removeClass('tg23-toggle--active');
    
                $$1('.tg23-all-products-slider__categories').removeClass('tg23-hide');
                $$1('.tg23-all-products-slider__ranges').addClass('tg23-hide');
    
                sliderCats.slick('reInit');
            }
        });
    
        content.append('\n      <div class="tg23-need-help">\n        ' + __('Need advice choosing the perfect fitness equipment? Contact us') + '\n        <a href="/contacts">\n          ' + __('here') + '\n        </a>\n      </div>\n    ');
    
        content.append('\n        <div class="tg23-popular-products">\n            <h2>' + __('Our Most Popular Products') + '</h2>\n\n            <div class="tg23-most-popular-toggle-wrap">\n              <span class="tg23-most-popular-toggle tg23-most-popular-toggle--home tg23-most-popular-toggle--active">\n                ' + __('For Your Home') + '\n              </span>\n              <span class="tg23-most-popular-toggle tg23-most-popular-toggle--business">\n                ' + __('For Your Business') + '\n              </span>\n            </div>\n\n            <div class="tg23-popular-products__content tg23-popular-products__content--home">\n            </div>\n            <div class="tg23-popular-products__content tg23-popular-products__content--business tg23-hide">\n            </div>\n        </div>\n    ');
    
        var popularContentHome = $$1('.tg23-popular-products__content--home');
        var popularContentBusiness = $$1('.tg23-popular-products__content--business');
    
        $$1.each(config.popular['home'][getLanguage()], function (idx, item) {
            popularContentHome.append('\n            <div class="col-xs-4 tg23-popular-product">\n                <a href="' + item.link + '">\n                    <img src="' + item.img + '">\n                    <p class="tg23-popular-product__title">' + item.title + '</p>\n                    <p class="tg23-popular-product__price">' + item.price + '</p>\n                </a>\n            </div>\n        ');
        });
    
        $$1.each(config.popular['business'][getLanguage()], function (idx, item) {
            popularContentBusiness.append('\n            <div class="col-xs-4 tg23-popular-product">\n                <a href="' + item.link + '">\n                    <img src="' + item.img + '">\n                    <p class="tg23-popular-product__title">' + item.title + '</p>\n                    <p class="tg23-popular-product__price">' + item.price + '</p>\n                </a>\n            </div>\n        ');
        });
    
        $$1('.tg23-most-popular-toggle').on('click', function (e) {
            if (e.currentTarget.classList.contains('tg23-most-popular-toggle--business')) {
                $$1('.tg23-most-popular-toggle--home').removeClass('tg23-most-popular-toggle--active');
                $$1('.tg23-most-popular-toggle--business').addClass('tg23-most-popular-toggle--active');
    
                $$1('.tg23-popular-products__content--business').removeClass('tg23-hide');
                $$1('.tg23-popular-products__content--home').addClass('tg23-hide');
            } else {
                $$1('.tg23-most-popular-toggle--home').addClass('tg23-most-popular-toggle--active');
                $$1('.tg23-most-popular-toggle--business').removeClass('tg23-most-popular-toggle--active');
    
                $$1('.tg23-popular-products__content--business').addClass('tg23-hide');
                $$1('.tg23-popular-products__content--home').removeClass('tg23-hide');
            }
        });
    
        content.append('\n        <div class="tg23-newsroom-feature">\n          <h2>' + __('Newsroom') + '</h2>\n\n          <div class="col-sm-6 tg23-newsroom-feature__item">\n          </div>\n          <div class="col-sm-6 tg23-newsroom-feature__item">\n          </div>\n        </div>\n    ');
    
        var link1 = $$1('.featured_post_wrapper:first .text_featured_post:first p:last a').attr('href');
    
        $$1('.tg23-newsroom-feature__item:first').append($$1('.featured_post_wrapper:first .featured_post_image:first'));
        $$1('.tg23-newsroom-feature__item:first .featured_post_image').wrap('<a href="' + link1 + '"></a>');
    
        $$1('.tg23-newsroom-feature__item:first').append('\n      <div class="tg23-newsroom-feature__title">\n        <a href="' + link1 + '">\n          ' + $$1('.featured_post_wrapper:first .text_featured_post:first h2').text().trim() + '\n        </a>\n      </div>\n      <div class="tg23-newsroom-feature__text">\n        ' + $$1('.featured_post_wrapper:first .text_featured_post:first p:first').text().trim() + '\n      </div>\n      <div class="tg23-newsroom-feature__btnwrap">\n        <a class="button btn-default" href="' + link1 + '">\n          ' + __('Read more') + '\n        </a>\n      </div>\n    ');
    
        var link2 = $$1('.featured_post_wrapper:eq(1) .text_featured_post:first p:last a').attr('href');
    
        $$1('.tg23-newsroom-feature__item:last').append($$1('.featured_post_wrapper:eq(1) .featured_post_image:first'));
        $$1('.tg23-newsroom-feature__item:last .featured_post_image').wrap('<a href="' + link2 + '"></a>');
    
        $$1('.tg23-newsroom-feature__item:last').append('\n      <div class="tg23-newsroom-feature__title">\n        <a href="' + link2 + '">\n          ' + $$1('.featured_post_wrapper:eq(1) .text_featured_post:first h2').text().trim() + '\n        </a>\n      </div>\n      <div class="tg23-newsroom-feature__text">\n        ' + $$1('.featured_post_wrapper:eq(1) .text_featured_post:first p:first').text().trim() + '\n      </div>\n      <div class="tg23-newsroom-feature__btnwrap">\n        <a class="button btn-default" href="' + link2 + '">\n          ' + __('Read more') + '\n        </a>\n      </div>\n    ');
    
        var containers = $$1('.post-container .wrapper_container').filter(function (idx) {
            var wrapper = this;
    
            var shortcodeText = $$1(wrapper).find('.column-content .shortcode-text');
    
            var conditions = [$$1(wrapper).find('a[href*=skillrun]').length > 0, !!(shortcodeText && shortcodeText.text() && shortcodeText.text().trim().match(/skillrun/i))];
    
            var result = conditions.every(function (c) {
                return c === true;
            });
    
            return result;
        });
    
        containers.addClass('tg23-skillrun').appendTo(content);
    
        var features2 = $$1('\n      <div class="tg23-newsroom-feature tg23-newsroom-feature--additional">\n      </div>\n    ');
    
        content.append(features2);
    
        var additionalFeatures = $$1('.featured_post_wrapper:eq(2)');
        additionalFeatures = additionalFeatures.add('.featured_post_wrapper:eq(3)');
        additionalFeatures = additionalFeatures.add('.featured_post_wrapper:eq(4)');
        additionalFeatures = additionalFeatures.add('.featured_post_wrapper:eq(5)');
    
        additionalFeatures.each(function (idx, item) {
            var link = $$1(item).find('.text_featured_post:first p:last a').attr('href');
            var title = $$1(item).find('.text_featured_post:first h2').text().trim();
            var text = $$1(item).find('.text_featured_post:first p:first').text().trim();
    
            if (!link || !title) {
                return;
            }
    
            var feature = $$1('\n        <div class="tg23-newsroom-feature__item col-sm-6">\n          <div class="tg23-newsroom-feature__title">\n            <a href="' + link + '">\n              ' + title + '\n            </a>\n          </div>\n          <div class="tg23-newsroom-feature__text">\n            ' + text + '\n          </div>\n          <div class="tg23-newsroom-feature__btnwrap">\n            <a class="button btn-default" href="' + link + '">\n              ' + __('Read more') + '\n            </a>\n          </div>\n        </div>\n      ');
    
            features2.append(feature);
    
            var featureImage = $$1(item).find('.featured_post_image:first');
            feature.prepend(featureImage);
            featureImage.wrap('<a href="' + link + '"></a>');
        });
    
        $$1('.featured_post_image.lazybg').each(function (idx, item) {
            var styleAttribute = $$1(item).attr('style');
            if (!styleAttribute) {
                var dataSrc = $$1(item).attr('data-src');
                $$1(item).attr('style', 'background-repeat: no-repeat; background-image:url(\'' + dataSrc + '\')');
            }
        });
    
        $$1(document).ready(function () {
            poller$1(['.footer-bottom', '.text_seo'], function () {
                var seoText = $$1('.text_seo');
                seoText.removeClass('row');
                seoText.addClass('tg23-seo');
    
                seoText.insertBefore('.footer-bottom');
            });
        });
    };
    
    var bindAdditionalEvents = function bindAdditionalEvents() {
        var didSendHover = false;
        $$1('#navbar-bottom ul li').on('mouseover.tg23', function (e) {
            if (!didSendHover) {
                didSendHover = true;
                eventSender.send(null, 'did-interact-with-main-menu');
            } else {
                $$1(e.currentTarget).off('mouseover.tg23');
            }
        });
    
        $$1('.tg23-all-products-slider__view-all').on('click.tg23', function (e) {
            eventSender.send(null, 'did-click-view-all-products');
        });
    
        $$1('.tg23-popular-product a').on('click.tg23', function (e) {
            eventSender.send(null, 'did-click-a-popular-product');
        });
    
        $$1('.tg23-all-products-slider').on('click.tg23', '.slick-slide a', function (e) {
            eventSender.send(null, 'did-click-category-v1-slider');
        });
    
        $$1('.tg23-all-products-slider').on('click.tg23', '.slick-arrow', function (e) {
            eventSender.send(null, 'did-click-arrow-v1-slider');
        });
    
        $$1('.tg23-all-products-columnar').on('click.tg23', 'ul li a', function (e) {
            eventSender.send(null, 'did-click-v2-category');
        });
    };
    
    var run = function run() {
        $$1('body').addClass('tg23 tg23-v' + VARIATION);
    
        eventSender.send(null, 'Page View', 'TG023 - Homepage Redesign');
    
        rebuildHeader();
    
        buildContentRegion();
    
        var bgSlides = $$1('.tg23-slider')[0];
        var mainSlides = $$1('.tg23-splash-slides')[0];
        var prevBtn = $$1('.tg23-splash-button--prev')[0];
        var nextBtn = $$1('.tg23-splash-button--next')[0];
    
        ddslider.init(bgSlides, mainSlides, prevBtn, nextBtn);
    
        bindAdditionalEvents();
    };
    
    var poller$$1 = poller$1([function () {
        return !!window.jQuery && !!window.jQuery.fn.slick;
    }, function () {
        return !!window.requestAnimationFrame;
    }, '.featured_post_wrapper', '.wrapper > .content-container', '.content-container .wordpress-page-view .page-container', '#main'], function () {
        fullStory('TG023---Homepage-Redesign', 'Variant 1');
    
        $$1 = window.jQuery;
    
        run();
    });
  })();
};
export default test;
