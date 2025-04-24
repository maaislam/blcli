// ------------------------------------------------------------------------
// TG005 - Product page redesign V2
// ------------------------------------------------------------------------
var TG005 = (function() {
    // ------------------------------------------------------------------------
    // Configuration options
    //
    // - product-options: attribute and option IDs matching those in markup
    // with custom images and titles against each option ID
    // - gallery slider identify thumbs and associated elements
    // ------------------------------------------------------------------------
    var _strings = {
        'technogym_presents': {
            'en': 'Technogym&reg; Presents',
            'it': 'Technogym&reg;'
        },
        'read_more': {
            'en': 'read more',
            'it': 'leggi tutto'
        },
        'add_to_basket': {
            'en': 'Add to Basket',
            'it': 'Aggiungi al carrello'
        },
        'learn_more': {
            'en': 'Learn More &gt;',
            'it': 'per saperne di più &gt;'
        },
        'successfully_add_to_cart': {
            'en': 'Product Successfully Added to Cart',
            'it': 'Prodotto aggiunto al carrello'
        },
        'no_thanks': {
            'en': 'No thanks &gt;',
            'it': 'No grazie &gt;'
        },
        'enhance_recommended': {
            'en': 'Enhance your purchase with our recommended product(s)',
            'it': 'Ti proponiamo di aggiungere'
        },
        'contact_us': {
            'en': 'Contact Us',
            'it': 'Contattaci'
        },
        'ensure_option_chosen': {
            'en': 'Please ensure you have chosen an option:',
            'it': 'Scegliere la versione di prodotto:'
        },
        'related_products': {
            'en': 'Related Products',
            'it': 'Prodotti correlati'
        },
        'speak_to_team': {
            'en': 'or speak to our team &gt;',
            'it': 'o parla con il nostro team'
        }
    };
    var _defaults = {
        // +=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#
        // MY RUN
        // +=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#+=-~#
        'treadmill-myrun.html': {
            'lang': 'en',
            'product-options': {
                944: {
                    'label': 'Available Colours:',
                    swatches: {
                        1605: {
                            'name': 'Stone Grey',
                            'image-url': '//cdn.optimizely.com/img/8355110909/57340c3cc0d54bb4a1082ec74d68c4b2.jpg'
                        },
                        1598: {
                            'name': 'Cosmo Black',
                            'image-url': '//cdn.optimizely.com/img/8355110909/b481af58431f4e17838d3a5237b387f4.jpg'
                        }
                    }
                }
            },
            'description': {
                'short': 'MYRUN TECHNOGYM is more than a treadmill. It is the first solution for running that seamlessly integrates a treadmill and a native app',
                'full': 'MYRUN TECHNOGYM is more than a treadmill. It is the first solution for running that seamlessly integrates a treadmill and a native app that syncs to your tablet, and is designed to offer you the ultimate running experience, with personalised training programmes and instant running feedback. This will improve the way you run. Forever.'
            },
            'brochure': {
                'thumb': '//cdn.optimizely.com/img/8355110909/8d6a74eb37c44d428d3ee0b64e00aa1a.png',
                'text': 'Download free brochure &gt;',
                'url': 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=MYRUN-CONFIGURABLE-EUROPE&type=conf'
            },
            'bullet-points': [
                'Delivered on a day and time that suits you',
                'Includes high quality white glove delivery service on a day and time that suits you'
            ],
            'gallery': [
                {
                    type: 'image',
                    thumb: false,
                    target: '//cdn.optimizely.com/img/8355110909/f2564423cbbf488e82affa6e1c85075e.jpg'
                },
                {
                    type: 'video',
                    thumb: '//cdn.optimizely.com/img/8355110909/41d84a17794d4dbf8862ef1661bee4fa.jpg',
                    target: '#vjs_video_297_vimeo_api'
                },
                {
                    type: 'image',
                    thumb: '//cdn.optimizely.com/img/8355110909/57340c3cc0d54bb4a1082ec74d68c4b2.jpg',
                    target: '//cdn.optimizely.com/img/8355110909/f2564423cbbf488e82affa6e1c85075e.jpg'
                },
                {
                    type: 'image',
                    thumb: '//cdn.optimizely.com/img/8355110909/b481af58431f4e17838d3a5237b387f4.jpg',
                    target: '//cdn.optimizely.com/img/8355110909/bfce019f4ca242daaadf651d83612a8e.jpg'
                },
                {
                    type: '360',
                    thumb: '//cdn.optimizely.com/img/8355110909/6a52819c754c44adbf0d5d31cf608028.jpg',
                    target: '.product-essential .product-gallery .swiper-slide-360'
                }
            ],
            cta1: {
                title: 'Technogym MYRUN for your home',
                boxes: [
                    {
                        image: '//cdn.optimizely.com/img/8355110909/53e4b068577a44e7ad7012da909f95e2.jpg',
                        text: 'The <strong>RUNNING RATE</strong> indexed developed by Technogym&reg; will help you run better and reduce the risk of injury.',
                        extra: '<p><a class="video-modal-trigger--custom" data-toggle="modal" data-target="#videoModal-1">Watch the video about RUNNING RATE</a></p>',
                        link: 'https://www.technogym.com/gb/wellness/myrun-app/'
                    },
                    {
                        image: '//cdn.optimizely.com/img/8355110909/6a477ff33ae84817bf61daa755271634.jpg',
                        text: '<strong>RUNNING MUSIC</strong> chooses the songs from your playlist that are best suited to match the rhythm of your run.',
                        link: 'https://www.technogym.com/gb/wellness/myrun-app/'
                    },
                    {
                        image: '//cdn.optimizely.com/img/8355110909/44c8a1ef0a094930a247e5542ed19846.jpg',
                        text: 'Track your outdoor sessions using the Technogym&reg; App in order to repeat each performance when you want and where you want.',
                        link: 'https://www.technogym.com/gb/wellness/myrun-app/'
                    }
                ]
            },
            contact: {
                title: 'Ready to speak with our team?'
            },
            cta2: {
                title: 'Ready to run in 5 minutes',
                image: '//cdn.optimizely.com/img/8355110909/b1f5104d948c438f9849c35b746751d2.jpg',
                text: [
                    '<p>Custom design and packaging make the DIY assembly process unbelievably simple and fast. Thanks to this patent pending fast installation, you only need 5 minutes to set up.</p>',
                    '<p><a target="_blank" href="//www.technogym.com/wpress/wp-content/uploads/2016/06/2015-07-30-Quote_DisimballomyRun.pdf">Download the PDF <em>Space required for unpacking the MYRUN TECHNOGYM&reg;</em> &gt;</a></p>'
                ].join('')
            },
            cta3: {
                title: 'More reasons to love the TECHNOGYM&reg; MYRUN',
                boxes: [
                    {
                        title: 'Train smarter with the MyRUN App',
                        image: '//cdn.optimizely.com/img/8355110909/f88d7d21c5ce429d8e2df165528c7a78.jpg',
                        text: '<p>With MYRUN TECHNOGYM&reg; your training becomes even more fun and effective. You can plan exercises and training sessions shaped around your personal needs or goals. A number of innovative training programmes are available as one of the exclusive features of the MYRUN app.</p>'
                    },
                    {
                        title: 'A Running Experience Like No Other',
                        image: '//cdn.optimizely.com/img/8355110909/8c01cd73f6a04e0fa26bb59c483168af.jpg',
                        text: '<p>The minimalist design combined with the simplicity of timeless technology, gives you a running experience like no other. And with the Single Switch function (patent pending), you are just one tap away from running. The MYRUN TECHNOGYM&reg; has received some of the most prestigious design awards in the world for its inimitable style.</p>'
                    },
                    {
                        title: "The smoothest run you'll have",
                        image: '//cdn.optimizely.com/img/8355110909/2f51a360fe7a4256a19ba9ad9823a06a.jpg',
                        text: '<p>With MYRUN TECHNOGYM&reg;, enjoy the perfect balance of cushioning and responsiveness. The innovative running surface adapts to the way you run and absorbs impact to reduce the risk of injuries without sapping power from your run, offering a smooth, quiet ride even at speeds of 20km/h.</p><p><a class="video-modal-trigger--custom" data-toggle="modal" data-target="#videoModal-0">Watch the video about MYRUN running surface</a></p>'
                    },
                    {
                        title: "Environmentally friendly",
                        image: '//cdn.optimizely.com/img/8355110909/64e60ed95b9e4499b69910f3ff326493.jpg',
                        text: '<p>Thanks to the Wake Up Sensor, the MYRUN TECHNOGYM&reg; senses your presence as soon as you step onto the machine, starting up automatically. It is the only treadmill in its category which can boast minimal environmental impact, with extremely low energy consutmpion on stand-by of less than 0.5 Watts.</p>'
                    }
                ]
            }, 
            faqs: {
                title: 'MYRUN FAQs',
                text: [
                    '<img src="//cdn.optimizely.com/img/8355110909/c21cde4cd98042ea8fb6a91687c45b1d.jpg">',
                    '<p><strong>How do I connect my tablet to MYRUN?</strong></p>',
                    '<p>All you need to do is enable Bluetooth on your tablet, place it on the MYRUN display and open the MYRUN App. A window will pop up, asking you whether you want to connect MYRUN to your tablet. Follow the video instructions.</p>',
                    '<p><a href="//www.technogym.com/gb/myrun-faqs/">Read all the FAQs &gt;</a></p>'
                ].join(''),
            },
            newsroom: {
                link: 'https://www.technogym.com/gb/newsroom-home',
                image: '//cdn.optimizely.com/img/8355110909/6f19a4cf1e564d00b0ef28458314510d.jpg'
            }
        },
      
        'tapis-roulant-myrun.html': {
            'lang': 'it',
            'product-options': {
                944: {
                    'label': 'Colori disponibili:',
                    swatches: {
                        1605: {
                            'name': 'Stone Grey',
                            'image-url': '//cdn.optimizely.com/img/8355110909/57340c3cc0d54bb4a1082ec74d68c4b2.jpg'
                        },
                        1598: {
                            'name': 'Cosmo Black',
                            'image-url': '//cdn.optimizely.com/img/8355110909/b481af58431f4e17838d3a5237b387f4.jpg'
                        }
                    }
                }
            },
            'description': {
                'short': 'MYRUN TECHNOGYM è la prima soluzione per la corsa che integra un tapis roulant, una app nativa e il tuo tablet',
                'full': 'MYRUN TECHNOGYM è la prima soluzione per la corsa che integra un tapis roulant, una app nativa e il tuo tablet per offrirti puro piacere di correre, personalizzazione dei programmi e feedback immediato sulla tua tecnica di corsa. Migliorerà il tuo modo di correre. Per sempre.'
            },
            'brochure': {
                'thumb': '//cdn.optimizely.com/img/8355110909/8d6a74eb37c44d428d3ee0b64e00aa1a.png',
                'text': 'Scarica catalogo &gt;',
                'url': 'https://www.technogym.com/it/contacts/?reason=catalogue&sku=MYRUN-CONFIGURABLE-EUROPE&type=conf'
            },
            'bullet-points': [
                'Consegna nel giorno e nell’orario preferiti',
                'Incluso un servizio di installazione premium in guanti bianchi',
                'TUO DA 85€ AL MESE*'
            ],
            'gallery': [
                {
                    type: 'image',
                    thumb: false,
                    target: '//cdn.optimizely.com/img/8355110909/f2564423cbbf488e82affa6e1c85075e.jpg'
                },
                {
                    type: 'video',
                    thumb: '//cdn.optimizely.com/img/8355110909/41d84a17794d4dbf8862ef1661bee4fa.jpg',
                    target: '#vjs_video_297_vimeo_api'
                },
                {
                    type: 'image',
                    thumb: '//cdn.optimizely.com/img/8355110909/57340c3cc0d54bb4a1082ec74d68c4b2.jpg',
                    target: '//cdn.optimizely.com/img/8355110909/f2564423cbbf488e82affa6e1c85075e.jpg'
                },
                {
                    type: 'image',
                    thumb: '//cdn.optimizely.com/img/8355110909/b481af58431f4e17838d3a5237b387f4.jpg',
                    target: '//cdn.optimizely.com/img/8355110909/bfce019f4ca242daaadf651d83612a8e.jpg'
                },
                {
                    type: '360',
                    thumb: '//cdn.optimizely.com/img/8355110909/6a52819c754c44adbf0d5d31cf608028.jpg',
                    target: '.product-essential .product-gallery .swiper-slide-360'
                }
            ],
            cta1: {
                title: 'Technogym MYRUN per casa tua',
                boxes: [
                    {
                        image: '//cdn.optimizely.com/img/8355110909/53e4b068577a44e7ad7012da909f95e2.jpg',
                        text: 'Con l’indice <strong>RUNNING RATE</strong> ideato da Technogym&reg; puoi migliorare la qualità della tua corsa e ridurre il rischio di infortuni.',
                        extra: '<p><a class="video-modal-trigger--custom" data-toggle="modal" data-target="#videoModal-1">Guarda il video su RUNNING RATE</a></p>',
                        link: 'https://www.technogym.com/it/wellness/myrun-app/'
                    },
                    {
                        image: '//cdn.optimizely.com/img/8355110909/6a477ff33ae84817bf61daa755271634.jpg',
                        text: '<strong>RUNNING MUSIC</strong> seleziona dalla tua libreria musicale i brani che si adattano meglio al ritmo della tua corsa.',
                        link: 'https://www.technogym.com/it/wellness/myrun-app/'
                    },
                    {
                        image: '//cdn.optimizely.com/img/8355110909/44c8a1ef0a094930a247e5542ed19846.jpg',
                        text: 'Traccia le tue prestazioni outdoor utilizzando la Technogym&reg; per poterle replicare quando vuoi e dove vuoi.',
                        link: 'https://www.technogym.com/it/wellness/myrun-app/'
                    }
                ]
            },
            contact: {
                title: 'Entra in contatto con il nostro team'
            },
            cta2: {
                title: 'Pronto a correre in 5 minuti',
                image: '//cdn.optimizely.com/img/8355110909/b1f5104d948c438f9849c35b746751d2.jpg',
                text: [
                    '<p>La progettazione personalizzata e il packaging di questo attrezzo rendono il processo di montaggio fai-da-te incredibilmente semplice e rapido. Grazie alla soluzione Fast Installation (brevetto depositato), il montaggio richiede soltanto 5 minuti.</p>',
                    '<p><a target="_blank" href="//www.technogym.com/wpress/wp-content/uploads/2016/06/2015-07-30-Quote_DisimballomyRun.pdf">Scarica il PDF <em>"Ingombri necessari per il disimballaggio di MYRUN TECHNOGYM&reg;"</em> &gt;</a></p>'
                ].join('')
            },
            cta3: {
                title: 'Altri motivi per amare TECHNOGYM&reg; MYRUN',
                boxes: [
                    {
                        title: 'Migliora la tua corsa con MyRUN App',
                        image: '//cdn.optimizely.com/img/8355110909/f88d7d21c5ce429d8e2df165528c7a78.jpg',
                        text: '<p>Con MYRUN TECHNOGYM™ il tuo allenamento diventa ancora più divertente ed efficace. Puoi pianificare esercizi e sessioni di allenamento in base alle tue esigenze o ai tuoi obiettivi personali. I programmi di allenamento sono una delle funzionalità disponibili con MYRUN app.</p>'
                    },
                    {
                        title: 'Disegnato dai runner per chi ama correre',
                        image: '//cdn.optimizely.com/img/8355110909/8c01cd73f6a04e0fa26bb59c483168af.jpg',
                        text: '<p>Il design minimale, unito alla semplicità di una tecnologia senza tempo, regala un’esperienza di corsa senza eguali. E con Tasto Unico (brevetto depositato), basta un solo tocco per iniziare a correre. Per il suo stile, MYRUN TECHNOGYM®  è stato premiato con alcuni dei più prestigiosi riconoscimenti di design a livello mondiale.</p>'
                    },
                    {
                        title: "Superficie di allenamento adattivo",
                        image: '//cdn.optimizely.com/img/8355110909/2f51a360fe7a4256a19ba9ad9823a06a.jpg',
                        text: '<p>Con MYRUN TECHNOGYM® puoi avere ammortizzazione e reattività nel giusto mix. L’innovativa superficie di corsa si adatta al tuo modo di correre e assorbe gli impatti per ridurre il rischio di traumatismi senza rubare energia alla tua corsa, con massima fluidità e silenziosità anche a 20 km/h.</p><p><a class="video-modal-trigger--custom" data-toggle="modal" data-target="#videoModal-0">Guarda il video sulla superficie di corsa adattiva MYRUN</a></p>'
                    },
                    {
                        title: "Intelligente e amico dell’ambiente",
                        image: '//cdn.optimizely.com/img/8355110909/64e60ed95b9e4499b69910f3ff326493.jpg',
                        text: '<p>Grazie al Wake Up Sensor, MYRUN TECHNOGYM® percepisce la presenza dell’utente quando sale sull’attrezzo accendendosi automaticamente. E’ l’unico tapis roulant della sua categoria a basso impatto ambientale grazie al consumo in stand-by estremamente ridotto, inferiore a 0,5 W.</p>'
                    }
                ]
            }, 
            faqs: {
                title: 'FAQ MYRUN',
                text: [
                    '<img src="//cdn.optimizely.com/img/8355110909/c21cde4cd98042ea8fb6a91687c45b1d.jpg">',
                    '<p><strong>Come si collega il tablet al MYRUN?</strong></p>',
                    '<p>E’ sufficiente abilitare la connessione Bluetooth sul tablet, posizionare il tablet sul display del MYRUN ed avviare la MYRUN App, comparirà una maschera in cui è richiesto di collegare MYRUN al tablet, basta seguire le indicazioni a video.</p>',
                    '<p><a href="https://www.technogym.com/it/faq-myrun/">Leggi tutte le FAQ &gt;</a></p>'
                ].join(''),
            },
            newsroom: {
                link: 'https://www.technogym.com/newsroom/?lang=it',
                image: '//cdn.optimizely.com/img/8355110909/6f19a4cf1e564d00b0ef28458314510d.jpg'
            }
        }
    };
  

    var pathMatch = window.location.pathname.match(/[^\/]+.html$/ig);
    if(!pathMatch) {
        return;
    }

    var _settings = _defaults[pathMatch[0]];

    if(!_settings) {
        return;
    }

    var _language = _settings['lang'];
    

    // UC Poller
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Helper send events
    var trackerName;
    function sendEvent(action, label, dimensionValue, dimensionName) {

        var category = 'TG005---ProductPage';
        var nonInteractionValue = true;

        var fire = function (tracker) {
            var options = {};
            options.nonInteraction = nonInteractionValue;
            if(dimensionValue && dimensionName){
                options['dimension' + dimensionValue] = dimensionName;
            }
            window.ga(tracker + '.send', 'event', category, action, label, options);
        };

        if (trackerName) {
            fire(trackerName);
        } else {
            UC.poller([
                function () {
                    return window.ga.getAll;
                }
            ], function () {
                trackerName = window.ga.getAll()[0].get('name');
                fire(trackerName);
            });
        }
    }

    // Assign to jQuery in scope
    var $ = null;

    // ------------------------------------------------------------------------
    // Poll main
    // ------------------------------------------------------------------------
    UC.poller([
        'body',
        '#collateral-tabs li',
        '#feature-primary .swiper-container .swiper-slide',
        '.footer-top',
        '.product-shop',
        '#product-info',
        function() {
            // Test for gallery existing on pages where it ought to
            if(/skillrow.html/.test(window.location.href)) {
                return true;
            }

            var test = 
                document.querySelector('.product-essential .product-gallery .swiper-slide') !== null
                && document.querySelector('.product-essential .product-gallery .swiper-slide img.gallery-image') !== null;

            return test;
        },
        function () {
            if (window.jQuery) {
                return true;
            }
        }
    ], function() {
       $ = window.jQuery;
       
       // ------------------------------------------------------------------------
       // Full Story Integration
       // ------------------------------------------------------------------------
       UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
       ], function () {
        window.FS.setUserVars({
            experiment_str: 'TG005',
            variation_str: 'Variation 1'
        });
       }, { multiplier: 1.2, timeout: 0 });

       run();
    });
    
    // ------------------------------------------------------------------------
    // Entry point for running test
    // ------------------------------------------------------------------------
    function run() {
        setup();
        updateProductInfo();
        updateProductImageBox();
        createCTARegion1();
        createCTARegion2();
        createContactForm();
        createCTARegion3();
        createSpecsSection();
        layoutOtherSections();
        initialiseContactsPopout();
        redesignUpsellLightbox();
    }

    // ------------------------------------------------------------------------
    // Setup
    // ------------------------------------------------------------------------
    function setup() {
       $('body').addClass('tg005');

       var pathIdentifier = (window.location.pathname.match(/[^\/]+$/g) || [])[0];
       $('body').addClass('tg005-page--' + pathIdentifier.replace('.html', ''));
    }
    
    // ------------------------------------------------------------------------
    // Update product info area
    // ------------------------------------------------------------------------
    function updateProductInfo() {
        var container = $('.product-shop');

        // Title
        container.find('.product-name').prepend([
            '<p class="tg5-ps-prefix">',
                _strings['technogym_presents'][_language],
            '</p>'
        ].join(''));

        // Create custom product selection swatches corresponding to options
        // if the product is a configurable product
        if(_settings['product-options']) {
            createCustomAddToCart(_settings['product-options']);
        
            // Move price
            container.find('.price-box:first').insertBefore('.tg5-addtocart');
        } else {
            // Handle Simple product
            // @!todo - future test iteration if necessary
        }

        // Download free brochure
        if(_settings.brochure) {
            $('.tg5-ps-addtocart').append([
                '<div class="tg5-brochure">',
                    '<img src="' + _settings.brochure.thumb + '" />',
                    '<a class="tg5-brochure-link" target="_blank" href="' + _settings.brochure.url + '">',
                        '<span>' + _settings.brochure.text + '</span>',
                    '</a>',
                '</div>'
            ].join(''));
        }

        // Add speak to our team link
        container.find('.tg5-brochure').append([
            '<a class="tg5-init-contacts-popout">' + _strings['speak_to_team'][_language] + '</a>',
        ].join(''));

        // Replace description
        $('#collateral-tabs-content').replaceWith([
            '<div class="tg5-product-description">',
                _settings['description']['short'],
                ' <a class="tg5-product-description-readmore">(' + _strings['read_more'][_language] + ')</a>',
            '</div>'
        ].join(''));
        $('.tg5-product-description-readmore').on('click', function() {
            $('.tg5-product-description').html(_settings['description']['full']);
        });

        // Amend text 'flexible payment plans' and other info below CTA
        $('.tg5-ps-addtocart').append([
            '<div class="tg5-extra-info">',
            '</div>'
        ].join(''));

        var paymentPlanText = $('#collateral-tabs-content .tab-content:first .std > span > strong');
        paymentPlanText.clone().appendTo('.tg5-extra-info').wrap('<p>');
        paymentPlanText.parent('span').remove();

        // After main copy bullet points
        container.find('.tg5-extra-info').append([
            '<ul class="tg5-ps-list">',
            '</ul>'
        ].join(''));

        if(_settings['bullet-points']) {
            $.each(_settings['bullet-points'], function(idx, item) {
                $('.tg5-ps-list').append([
                    '<li>' + item + '</li>'
                ].join(''));
            });
        }

    }
    
    // ------------------------------------------------------------------------
    // Create custom add to cart for variant products
    // ------------------------------------------------------------------------
    function createCustomAddToCart(productOptions) {
        // Create add to cart container
        $('.product-shop #collateral-tabs-content').after($([
            '<div class="tg5-ps-addtocart">',
                '<button title="Add to Basket" class="button tg5-addtocart btn-block">',
                    _strings['add_to_basket'][_language],
                '</button>',
            '</div>'
        ].join('')));
        
        // Create product optoins swatches
        $.each(productOptions, function(attributeId, item) {
            var label = item.label,
                swatches = item.swatches;

            // Add label and swatches to add to cart
            $('.tg5-ps-addtocart').prepend([
                '<div class="tg5-ps-addtocart__label">',
                    label,
                '</div>',
                '<div class="tg5-ps-addtocart__options">',
                '</div>'
            ].join(''));

            $.each(swatches, function(optionId, item) {
                var name = item.name,
                    imageUrl = item['image-url'];

                var swatchObject = $([
                    '<div class="tg5-ps-addtocart__option" data-optionid="' + optionId + '">',
                        '<img src="' + imageUrl + '" />',
                    '</div>'
                ].join(''));

                $('.tg5-ps-addtocart__options').append(swatchObject);

                // Update super attribute on swatch click
                swatchObject.on('click', function() {
                    $('.tg5-ps-addtocart__option').removeClass('tg5-ps-addtocart__option--selected');
                    $(this).addClass('tg5-ps-addtocart__option--selected');

                    var superAttributeSelect = $('[name="super_attribute[' + attributeId + ']"]');
                    superAttributeSelect.val($(this).attr('data-optionid'));
                });
            });
        });

        // Handle add to basket when button copy clicked
        $('.tg5-ps-addtocart .tg5-addtocart').on('click', function() {
            $('.tg5-ps-addtocart__invalid').remove();

            var valid = true;
            $.each(productOptions, function(attributeId, item) {
                var superAttributeSelect = $('[name="super_attribute[' + attributeId + ']"]');
                if(!superAttributeSelect.val()) {
                    valid = false;

                    return false;
                }
            });

            if(!valid) {
                $('.tg5-ps-addtocart__options').prepend([
                    '<div class="tg5-ps-addtocart__invalid">',
                        _strings['ensure_option_chosen'][_language],
                    '</div>'
                ].join(''));
            } else {
                productAddtocartForm.submit();
            }

            return false;
        });
    }

    // ------------------------------------------------------------------------
    // Helper create slide
    // ------------------------------------------------------------------------
    function createSlide(data) {
        var slide = $([
            '<div class="tg5-gallery__slide">',
            '</div>'
        ].join(''));

        var identifier = 'tg5-id-' + (new Date()).getTime() + parseInt((Math.random() * 1000000));

        slide.attr('id', identifier);

        switch(data.type) {
            case 'video':
                var videoSlide = $('<div class="tg5-embed-container">');
                videoSlide.append($(data.target));
                slide.append(videoSlide);
                break;
            case '360':
                var slideElm = $(data.target);

                slide.append([
                    '<a class="Magic360" data-magic360-options="' + slideElm.find('.Magic360').attr('data-magic360-options') + '">',
                        slideElm.find('.Magic360').html(),
                    '</a>',
                ].join(''));

                slide.addClass('tg5-is-360');

                slideElm.remove();
            case 'image':
                slide.append('<img src="' + data.target + '" />');
                break;
        }

        $('.tg5-gallery__slides').append(slide);

        // Add a thumb to thumbs area
        if(data.thumb) {
            var thumb = $([
                '<div class="tg5-gallery__thumb">',
                    '<img src="' + data.thumb + '" />',
                '</div>'
            ].join(''));

            thumb.attr('target-id', identifier);

            thumb.appendTo('.tg5-gallery__thumbs');
        }
    }
    
    // ------------------------------------------------------------------------
    // Update product image box area
    // ------------------------------------------------------------------------
    function updateProductImageBox() {
        // show loader until our plugins are ready
        $('.product-essential .product-img-box').append([
            '<div class="tg5-imgbox-loader">',
                '<img src="https://www.technogym.com/skin/frontend/technogym/default/images/loading.gif" />',
            '</div>'
        ].join(''));

        // Load slick and then build the slidser
        $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function() {
            // Build main images
            $('.tg5-imgbox-loader').remove();

            var tgGallery = $([
                '<div class="tg5-gallery clearfix">',
                    '<div class="tg5-gallery__thumbs">',
                    '</div>',
                    '<div class="tg5-gallery__slides">',
                    '</div>',
                '</div>'
            ].join(''));
            $('.product-essential .product-img-box').prepend(tgGallery);

            $.each(_settings.gallery, function(idx, item) {
                createSlide(item);
            });

            // Initialise Slick slider
            $(".tg5-gallery__slides").slick({
                dots: false,
                slidesToShow: 1,
                swipe: false,
                arrows: false,
                slidesToScroll: 1,
                autoplay: false
            });

            var didFireUsedSliderEvent = false;
            var didStartMagic360 = false;
            $(".tg5-gallery").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                if(!didFireUsedSliderEvent) {
                    sendEvent('did-use-main-slider');

                    didFireUsedSliderEvent = true;
                }

                var nextSlide = $('[data-slick-index=' + nextSlide + ']');

                if(!didStartMagic360 && nextSlide.hasClass('tg5-is-360')) {
                    window.Magic360.start();
                    didStartMagic360 = true;

                    // Once m360 loader hits 100%, remove all other loaders
                    UC.poller([
                        function() {
                            var numComplete = $('.m360-loader[data-progress="100%"]').length;
                            if(numComplete) {
                                return true;
                            }
                            return false;
                        }
                    ], function() {
                        $('.m360-loader').removeClass('shown');    
                    });
                }

                var targetThumb = $('.tg5-gallery__thumb[target-id=' + nextSlide.attr('id') + ']');

                $('.tg5-gallery__thumb').removeClass('tg5-gallery__thumb--active');
                targetThumb.addClass('tg5-gallery__thumb--active');
            });

            // Handle thumb click change slide
            $('.tg5-gallery__thumb').on('click', function() {
                var targetId = $(this).attr('target-id');
                var targetSlide = $('#' + targetId);
                var slickIndex = targetSlide.attr('data-slick-index');

                $('.tg5-gallery__slides').slick('slickGoTo', slickIndex);
            });
        });
    }
    
    // ------------------------------------------------------------------------
    // Create CTA region 1
    // - Selection of CTAs based on current 'features' area
    // - Uses custom copy
    // ------------------------------------------------------------------------
    function createCTARegion1() {
        var section = $([
            '<div class="tg5-cta1 tg5-section">',
                '<div class="tg5-inner">',
                    '<h2></h2>',
                    '<div class="tg5-row clearfix">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.find('h2').html(_settings.cta1.title);

        $.each(_settings.cta1.boxes, function(idx, item) {
            var row = section.find('.tg5-row');
            row.append([
                '<div class="tg5-cta1__box">',
                    '<img src="' + item.image + '" />',
                    '<p>',
                        item.text,
                        ' <a href="' + item.link + '">' + _strings['learn_more'][_language] + '</a>',
                    '</p>',
                    typeof item.extra != 'undefined' ? item.extra : '',
                '</div>'
            ].join(''));
        });

        section.insertAfter('#product-info');
    }
    
    // ------------------------------------------------------------------------
    // Create CTA region 2
    // - Additional video and copy
    // - For MyRun, this video is taken from Vimeo (shown on page via link) or Youtube
    // (https://www.youtube.com/watch?v=JRhUsYFqI78)
    // ------------------------------------------------------------------------
    function createCTARegion2() {
        var section = $([
            '<div class="tg5-cta2 tg5-section clearfix">',
                '<div class="tg5-inner">',
                    '<div class="tg5-cta2__col1">',
                        '<h2>' + _settings.cta2.title + '</h2>',
                        _settings.cta2.text,
                    '</div>',
                    '<div class="tg5-cta2__col2">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.insertAfter('.tg5-cta1');

        UC.poller([
            '#videoModal-2'
        ], function() {
            $('#videoModal-2').appendTo('.tg5-cta2');

            var videoInitLink = $('[data-target="#videoModal-2"]').appendTo('.tg5-cta2__col2');
            videoInitLink.html('<img src="' + _settings.cta2.image + '" />');
        }, {
            timeout: 10000000
        });
    }

    // ------------------------------------------------------------------------
    // Create contact form 
    // - Shortened version of current contact form
    // - Hardcode pre-select the 'your profile'
    // ------------------------------------------------------------------------
    function createContactForm() {
        var section = $([
            '<div class="tg5-contact-form tg5-section">',
                '<div class="tg5-inner">',
                    '<h2>' + _settings.contact.title + '</h2>',
                    '<div class="tg5-contact-form__form-container">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.insertAfter('.tg5-cta2');

        var pageTitle = $('.product-view .product-shop .product-name h1').text();

        var contactUrl = 'https://www.technogym.com/gb/contacts/?reason=call&sku=DBE03UT#contact-form';
        if(_language == 'it') {
            contactUrl = 'https://www.technogym.com/it/contacts/?reason=call&sku=DBE03UT#contact-form';
        }

        $.ajax({
            url: contactUrl,
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                var $data = $(data);
                var $contactForm = $data.find('#contactForm');

                if ($contactForm.length) {
                    $contactForm.appendTo($('.tg5-contact-form__form-container'));
                    $('.tg5-contact-form__form-container').find('.buttons-set .button').text('Send');
                    $('#product-name, #product').val(pageTitle);

                    $contactForm.find('.form-list li.fields:first').addClass('tg5-first');

                    setTimeout(function() {
                        $contactForm.find('.select-profile .option:first input[type=radio]').trigger('click');
                        $contactForm.find('.select-need select').val('tone_body');
                    }, 500);
                } else {
                    return;
                }

                // Select profile functionality...
                (function() {
                    var requiredNeeds = $('select.validate-select', '.select-need').clone();
                    $('input.input-radio', '.select-profile').click(function() {
                        var company, currentSelect, currentSelectId, id;
                        id = $(this).attr("id");
                        $('.select-need').find('.validation-advice').fadeOut();
                        company = $('.field.company');
                        if (id === "business") {
                            if (!company.find('input').hasClass("required-entry")) {
                                company.find('input').addClass("required-entry");
                            }
                            if (company.hasClass("hidden")) {
                                company.removeClass("hidden");
                            }
                            if ($('.store-it_it').length > 0 && $('li.privacy').find('div:nth-child(2)').length > 0) {
                                $('li.privacy').find('div:nth-child(2)').fadeOut();
                            }
                        } else {
                            if (!company.hasClass("hidden")) {
                                company.addClass("hidden");
                            }
                            if (company.find('input').hasClass("required-entry")) {
                                company.find('input').removeClass("required-entry");
                            }
                            if (id === 'private') {
                                if ($('.store-it_it').length > 0 && $('li.privacy').find('div:nth-child(2)').length > 0) {
                                    $('li.privacy').find('div:nth-child(2)').fadeIn();
                                }
                            } else {
                                if ($('.store-it_it').length > 0 && $('li.privacy').find('div:nth-child(2)').length > 0) {
                                    $('li.privacy').find('div:nth-child(2)').fadeOut();
                                }
                            }
                        }
                        if ($('.select-need').hasClass("hidden")) {
                            $('.select-need').removeClass("hidden");
                        }
                        $('.select-need .show-hide').each(function() {
                            if ($(this).hasClass(id)) {
                                if ($(this).hasClass("hidden")) {
                                    return $(this).removeClass("hidden");
                                }
                            } else {
                                if (!$(this).hasClass("hidden")) {
                                    return $(this).addClass("hidden");
                                }
                            }
                        });
                        currentSelectId = $(this).attr('id');
                        currentSelect = $('select.' + currentSelectId);
                        return requiredNeeds.each(function() {
                            var className, otherSelect, otherSelectName;
                            className = this.className;
                            if (className.indexOf(currentSelectId) >= 0) {
                                if (className.indexOf('validate-select') >= 0) {
                                    if (!currentSelect.hasClass('validate-select')) {
                                        return currentSelect.addClass('validate-select');
                                    }
                                }
                            } else {
                                otherSelectName = this.name.replace('need-', '');
                                otherSelect = $('select.' + otherSelectName);
                                if (otherSelect.hasClass('validate-select')) {
                                    return otherSelect.removeClass('validate-select');
                                }
                            }
                        });
                    });
                    $('input[type="checkbox"]', '.private').click(function() {
                        if (!$('.warn', '.private').is(':visible')) {
                            return $('.warn', '.private').fadeIn();
                        }
                    });
                    $('#contactForm button[type="submit"]').click(function(e) {
                        var id, select;
                        id = $('#contactForm').find('.input-radio.validation-passed').attr("id");
                        select = $('.select-need').find('.' + id);
                        if (select.val() === "") {
                            if (!select.hasClass("validation-failed")) {
                                return select.addClass("validation-failed");
                            }
                        }
                    });
                    $('input', '#contact-form').mouseout(function() {
                        if ($(this).val() !== "") {
                            return $(this).parent().find('.validation-advice:not(#advice-validate-email-email)').fadeOut();
                        }
                    });
                })();

                // Force validation of checkbox i agree to terms and conditions
                $('#contactForm').find('.terms-privacy input[type=checkbox]').addClass('validate-one-required');

                // Form initialisation / covers validation
                new VarienForm('contactForm', false);
            }
        });
    }

    // ------------------------------------------------------------------------
    // Create CTA region 3
    // - more reasons to love 
    // ------------------------------------------------------------------------
    function createCTARegion3() {
        var section = $([
            '<div class="tg5-cta3 tg5-section">',
                '<div class="tg5-inner">',
                    '<h2>' + _settings.cta3.title + '</h2>',
                    '<div class="tg5-row">',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        $.each(_settings.cta3.boxes, function(idx, item) {
            var row = section.find('.tg5-row');
            if(idx % 2 === 0) {
                row.append([
                    '<div class="tg5-cta3__box clearfix tg5-cta3__box--right">',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--text">',
                            '<h3>',
                                item.title,
                            '</h3>',
                            '<div>',
                                item.text,
                            '</div>',
                        '</div>',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--imaged">',
                            '<img src="' + item.image + '" />',
                        '</div>',
                    '</div>'
                ].join(''));
            } else {
                row.append([
                    '<div class="tg5-cta3__box clearfix tg5-cta3__box--left">',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--imaged">',
                            '<img src="' + item.image + '" />',
                        '</div>',
                        '<div class="tg5-cta3__box-col tg5-cta3__box-col--text">',
                            '<h3>',
                                item.title,
                            '</h3>',
                            '<div>',
                                item.text,
                            '</div>',
                        '</div>',
                    '</div>'
                ].join(''));
            }
        });

        section.insertAfter('.tg5-contact-form');
    }

    // ------------------------------------------------------------------------
    // Update specs
    // - minor amends and relayout of specifications / FAQs and additional
    // ------------------------------------------------------------------------
    function createSpecsSection() {
        var section = $([
            '<div class="tg5-specs tg5-section">',
                '<div class="tg5-inner">',
                    '<div class="tg5-specs__col tg5-specs__col1">',
                    '</div>',
                    '<div class="tg5-specs__col tg5-specs__col2">',
                        '<h2>',
                            _settings.faqs.title,
                        '</h2>',
                        '<div>',
                            _settings.faqs.text,
                        '</div>',
                        '<a class="tg5-newsroom" href="' + _settings.newsroom.link + '">',
                            '<img src="' + _settings.newsroom.image + '" />',
                        '</a>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        section.insertAfter('.tg5-cta3');

        // Add specs
        $('.post-type-specification').appendTo('.tg5-specs__col1');
        $('.post-type-specification .container').removeClass('container');
        $('.post-type-specification .col-xs-3').removeClass('col-xs-3').addClass('col-sm-4 col-xs-6');
    }
    
    // ------------------------------------------------------------------------
    // Layout other sections
    // - other sections relayout and considerations, mainly bottom sections
    // ------------------------------------------------------------------------
    function layoutOtherSections() {
        $('.product-recommendations').addClass('tg5-section');
        $('.product-recommendations h2').removeClass('block-title').text(_strings['related_products'][_language]);
        $('.product-recommendations h3').hide();

        $('.footer-top').addClass('tg5-section tg5-contacts');
        $('.footer-top h4:first').replaceWith('<h2>' + _strings['contact_us'][_language] + '</h2>');

        if($('.product-recommendations').length) {
            $('.tg5-contacts').insertBefore($('.product-recommendations')).wrap('<div class="footer-container">');
        }

        if(_language == 'it') {
            $('<div class="tg5-section container"><p class="tg5-disclaimer">*Esempio rappresentativo di finanziamento: Prezzo €3.250, anticipo €300; importo totale del credito €2.950, da restituire in 36 rate mensili ognuna di €84,41 importo totale dovuto dal consumatore €3.110,36. TAN 0,01% (tasso fisso) – TAEG 3,45% (tasso fisso). Spese comprese nel costo totale del credito: interessi €0,26, istruttoria €88,50, incasso rata €1,5 cad. a mezzo SDD, produzione e invio lettera conferma contratto € 1; comunicazione periodica annuale €1 cad.; imposta sostitutiva: €7,60. Eventuali contratti relativi a uno o più servizi accessori (es. polizza assicurativa) sono facoltativi. Offerta valida dal 01/02/2017 al 31/12/2017. Condizioni contrattuali ed economiche nelle “Informazioni europee di base sul credito ai consumatori” presso i concessionari. Salvo approvazione di Santander Consumer Bank</p></div>').insertBefore('.footer-container:last');
        }

        // Videos
        UC.poller([
            '#videoModal-1',
            '.tg5-cta1'
        ], function() {
            $('a[data-target="#videoModal-1"]').addClass('video-modal-trigger--custom-loaded'); 
            $('#videoModal-1').appendTo('.tg5-cta1');
        }, {
            timeout: 10000000
        });

        UC.poller([
            '#videoModal-0',
            '.tg5-cta3'
        ], function() {
            $('a[data-target="#videoModal-0"]').addClass('video-modal-trigger--custom-loaded'); 
            $('#videoModal-0').appendTo('.tg5-cta3');
        }, {
            timeout: 10000000
        });

        $('.video-modal-trigger--custom').on('click', function() {
            var target = $(this).attr('data-target');
            var sameLinkAlreadyInPage = $('a[data-target="' + target + '"]');
            sameLinkAlreadyInPage.trigger('click');
            return false;
        });
    }
    
    // ------------------------------------------------------------------------
    // Helper initialise contact us popout on given elements
    // ------------------------------------------------------------------------
    function initialiseContactsPopout() {
        $('.tg5-init-contacts-popout').on('click', function() {
            $('#contacts-us-fixed').trigger('click');
        });
    }
    
    // ------------------------------------------------------------------------
    // Redesign upsell popup
    // ------------------------------------------------------------------------
    function redesignUpsellLightbox() {
        UC.poller([
            function() {
                var visible = $('#aw-afptc-popup').is(':visible');
                return visible;
            }
        ], function() {
            $('#aw-afptc-popup form').prepend([
              '<div class="tg5-upsell-container">',
              '<h2>' + _strings['successfully_add_to_cart'][_language] + '</h2>',
              '<p class="tg5-upsell-heading">',
                _strings['enhance_recommended'][_language],
              '</p>',
              '<div class="tg5-upsell-cols clearfix;">',
                '<div class="tg5-upsell-col1">',
                '</div>',
                '<div class="tg5-upsell-col2">',
                '</div>',
              '</div>',
              '</div>'
            ].join(''));

            $('#aw-afptc-popup .product-image').appendTo('.tg5-upsell-col1');
            $('#aw-afptc-popup .product-details').appendTo('.tg5-upsell-col2');
            $('#aw-afptc-popup button').appendTo('.tg5-upsell-col2');
            $('#aw-afptc-popup label[for=aw-afptc-decline-rule]').hide();
            $('#aw-afptc-popup #aw-afptc-decline-rule').hide();
            $('#aw-afptc-popup .block-title').hide();

            $('#aw-afptc-popup #aw-afptc-decline-rule').click();

            $('#aw-afptc-decline span span').html(_strings['no_thanks'][_language]);
            $('button[title=Accept] span span').html(_strings['add_to_basket'][_language]);
        }, {
            timeout: 10000000
        });
    }
})();
