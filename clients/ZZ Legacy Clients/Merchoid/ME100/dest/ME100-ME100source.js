var _ME100 = (function($) {

    var $loader = $('<div id="ME100_page-overlay"><div class="ME100_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div></div>');
    $('body').prepend($loader);
    setTimeout(function() { 
        $loader.hide();
    }, 4000);

    var _runExperiment = function() {
        var ME100 = {
            data: {
                _brandName: (function() {
                    return $('meta[property="og:title"]').attr('content').match(/[\w\s']+(?=:)/)[0];
                }()),
                _productName: (function() {
                    return $('meta[property="og:title"]').attr('content').match(/\w[\w\s-\/']+(?= - Merchoid)/)[0];
                }()),
                _productImg: (function() {
                    return $('.product-gallery .product-gallery-slider .slide img').attr('src');
                }()),
                _productInStock: (function() {
                    var $el = $('meta[property="og:price:availability"]');
                    var stock = $el.length > 0 ? ($el.attr('content') === 'instock' ? true : false) : false;
                    return stock;
                }()),
                _isGB: (function() {
                    var o = window.optimizely;
                    var countryCode = o && o.data && o.data.visitor && o.data.visitor && o.data.visitor.location && o.data.visitor.location.country && o.data.visitor.location.country ? o.data.visitor.location.country : false;
                    
                    return countryCode === 'GB';
                }()),
                settings: {
                    // DEFAULT IMAGERY
                    defaults: {
                        icons: [
                            '//cdn.optimizely.com/img/6087172626/bb4a5427ec9b41acb932fb97998c4587.png',
                            '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                        ],
                        bullet: '//cdn.optimizely.com/img/6087172626/4c2ced6b9b5441f1aa825d5d8c0e874a.png'
                    },
                    
                    // ABOUT MERCHOID TAB
                    aboutMerchoid: [
                        {
                            title: 'We Search the Universe for the Best Merch',
                            img: '//cdn.optimizely.com/img/3320600494/2cb826b61d7d4e48ab8dc5ee51503a4d.png',
                            desc: 'We don\'t settle for Jakku junk and we don\'t think you should have to either. It\'s our job to dig up the best merch possible and your job to lose your mind over it! All our products are either made by us or handpicked by the Merchoid team; it\'s all officially licensed and full of awesome.'
                        },
                        {
                            title: 'We\'re Fans of the Brands',
                            img: '//cdn.optimizely.com/img/3320600494/f3463f6c756c41bd82592dd7d67f834c.png',
                            desc: 'Merchoid was born out of personal obsessions. Whether it\'s Doctor Who, Doctor Freeman or Doctor Doom, we\'re huge fans of everything geeky. Because we\'re real fans, you can trust us to come up with the most amazing merchandise you\'ve ever seen.'
                        },
                        {
                            title: 'This is Your Place',
                            img: '//cdn.optimizely.com/img/3320600494/9a38214aa5e44b45996ffafdc15b93df.png',
                            desc: 'Sometimes binge watching your favourite TV show on Netflix just isn\'t enough! When you want to really indulge in your favourite universe, browse our site for the coolest, quirkiest, most entertaining products around.'
                        }
                    ],

                    // ACCORDION
                    accordion: [
                        {
                            nav: 'Delivery and returns',
                            content: [
                                '<h3>Delivery</h3>',
                                '<p>Free. Nada. Zip. Anything you order on the site is totally free to ship, no matter where you are in the world. Typically, First Class Royal Mail arrives the next working day, but this is not a guaranteed service and may take longer. Special Delivery or courier services will be delivered next working day. International shipments are estimated at taking 10-15 working days to arrive, but can take longer (for example, if your package is delayed by your country’s customs).</p>',

                                '<h3>Returns</h3>',
                                '<p>At Merchoid we source the highest quality merch to ensure our customers are always happy. If you\'re not happy with the quality of our products you can return the product up to 100 days for a full refund. UK return shipping is free; international orders are not.</p>'
                            ].join('')
                        },
                        {
                            nav: 'FAQ',
                            content: [
                                '<h3>Is Merchoid legit</h3>',
                                '<p>Yes! Merchoid is an award-winning company with seven years\' internet retail experience. It\'s also full of real, live, (friendly!) humans. You can find out more on our About Us page.</p>',

                                '<h3>When will my item ship?</h3>',
                                '<p>If you order an in stock item by 1pm (UK time), your order will ship the same day from Monday to Friday.</p>',

                                '<h3>How long will my order take to arrive?</h3>',
                                '<ul>',
                                    '<li><p><strong>UK orders</strong> ship by Royal Mail, which should arrive in two to five working days after despatch (but occasionally can take longer).</p></li>',
                                    '<li><p><strong>Non-UK orders</strong> ship by Royal Mail International Airmail, which usually takes 10-15 working days after despatch, but may take up to 30 days if the item is held by your country\'s customs officers.</p></li>',
                                '</ul>',

                                '<h3>How much does shipping cost?</h3>',
                                '<p>Zero. Free. Nada. Nil. We ship for FREE to every country we support. The price you see is the price you pay, no matter where you are in the world.</p>',

                                '<h3>Do I get a tracking number with my order?</h3>',
                                '<p>Currently, all orders ship without a tracking number, but we will soon be offering the ability to upgrade to a tracked delivery service.</p>',

                                '<h3>Will I be charged any shipping, customs or duties fees?</h3>',
                                '<p>Within the UK, USA and EU, the price you see is the price you pay - you won\'t be charged any extra fees.</p>',
                                '<p>If you are outside the UK/USA/EU you may have to pay customs/duties if your country charges for importing packages. Please check with your local authorities for more information.</p>',

                                '<h3>How do preorders work?</h3>',
                                '<p>When you place a preorder, your payment will be taken immediately and you will receive email confirmation of your order.</p>',
                                '<p>When the item arrives in stock, your preorder will ship and you will receive a shipping notification. Please note, supplier dates can change; check the product listing for the most up to date information.</p>',

                                '<h3>When will my preorder ship?</h3>',
                                '<p>Look on the listing page for the shipping date of a preorder product. The date is listed next to the \'Add to Cart\' button and at the top of the listing description. Please be away that pre-order dates occassionally can change due to manufacturing delays.</p>',

                                '<h3>What currency will I be charged in?</h3>',
                                '<p>We charge orders in British Pounds, US dollars or Euros depending on your location. </p>',

                                '<h3>What is your returns policy?</h3>',
                                '<p>We offer a 100 day no-hassle, returns policy from the purchase date.</p>',
                                '<p>In addition, UK returns will be supplied a Freepost address to send the item back free of charge.</p>',
                                '<p>International customers will be required to pay for returns postage.</p>',
                                '<p>Returns can be made for any reason: faulty goods, incorrect sizing or the item is just not as expected. We will offer refund or replacement on receipt of the original item.</p>'
                            ].join('')
                        }
                        /* {
                            nav: 'Reviews',
                            content: [
                                '<p>????</p>'
                            ].join('')
                        }*/
                    ]
                },

                /* 
                * BRAND SPECIFIC ELEMENTS
                */
                branding: function (brand) {
                    var data = this;
                    switch (brand) {
                    case 'Star Wars':
                        return {
                            name: 'Star Wars',
                            licensor: 'Lucasfilm',
                            description: [
                                'The most awesome merchandise in the galaxy',
                                'Officially licensed Star Wars merchandise',
                                'This is the merch you\'re looking for!',
                                'The Force is strong in this one',
                                'Perfect for any aspiring Jedi'
                            ],
                            logo: '//cdn.optimizely.com/img/3320600494/70a7e0e28fe948ce834430bb791ad785.png',
                            icons: [
                                '//cdn.optimizely.com/img/3320600494/23fa00d32c7f4f3aa62043867a18d359.png',
                                '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                            ],
                            bullet: [
                                '//cdn.optimizely.com/img/3320600494/0fb5a7be531c4e6d9a0087f20ac606a9.png'
                            ],
                            /*background: '//cdn.optimizely.com/img/3320600494/7e1b9c4b874c47798517444335d72f30.jpg',*/
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/3320600494/70a7e0e28fe948ce834430bb791ad785.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Star Wars merchandise, approved by Lucasfilm. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/6087172626/eb192cb8819b4ddc8bf1f3ef980e76f9.png',
                                    desc: 'Show your love for the Star Wars franchise by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                                /*$('body').addClass('ME100-StarWars');*/
                                $('.ME100_feature__img:first').css({
                                    'background': '#252525',
                                    'padding': '50px 20px'
                                });
                            }
                        };
                            case 'Star Wars Rogue One':
                        return {
                            name: 'Star Wars',
                            licensor: 'Lucasfilm',
                            description: [
                                'The most awesome merchandise in the galaxy',
                                'Officially licensed Star Wars merchandise',
                                'This is the merch you\'re looking for!',
                                'The Force is strong in this one',
                                'Perfect for any aspiring Jedi'
                            ],
                            logo: '//cdn.optimizely.com/img/3320600494/70a7e0e28fe948ce834430bb791ad785.png',
                            icons: [
                                '//cdn.optimizely.com/img/3320600494/23fa00d32c7f4f3aa62043867a18d359.png',
                                '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                            ],
                            bullet: [
                                '//cdn.optimizely.com/img/3320600494/0fb5a7be531c4e6d9a0087f20ac606a9.png'
                            ],
                            /*background: '//cdn.optimizely.com/img/3320600494/7e1b9c4b874c47798517444335d72f30.jpg',*/
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/3320600494/70a7e0e28fe948ce834430bb791ad785.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Star Wars merchandise, approved by Lucasfilm. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/6087172626/eb192cb8819b4ddc8bf1f3ef980e76f9.png',
                                    desc: 'Show your love for the Star Wars franchise by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                                /*$('body').addClass('ME100-StarWars');*/
                                $('.ME100_feature__img:first').css({
                                    'background': '#252525',
                                    'padding': '50px 20px'
                                });
                            }
                        };
                    case 'Assassin\'s Creed Rogue':
                        return {
                            name: 'Assassin\'s Creed',
                            licensor: 'Ubisoft',
                            description: [
                                'Join the Brotherhood',
                                'Officially Licensed Assassins Creed Merchandise',
                                'Merchandise fit for the greatest assassins in history',
                                'The best. May it never change.',
                                'Not suitable for Templars'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/e2b1b3b44f0948a0b292d569aad5cd5a.png',
                            icons: [
                                '//cdn.optimizely.com/img/6087172626/425c7dd4b40448e1a30ebfed53480aab.png',
                                '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                            ],
                            bullet: [
                                '//cdn.optimizely.com/img/6087172626/440b5419460b46cabdae7933b2f10fff.png'
                            ],
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/320891d63d3242eb82dda39dc66b75cc.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Assassins Creed merchandise, approved by Ubisoft. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/bba036a181004e7685da56228920ee11.png',
                                    desc: 'Show your love for the Assassins Creed franchise by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            /*background: '//cdn.optimizely.com/img/3320600494/7e1b9c4b874c47798517444335d72f30.jpg',*/
                            brandSpecificChanges: function () {
                            /* $('body').addClass('ME100-AssassinsCreed');*/
                            }
                        };
                    case 'Suicide Squad':
                        return {
                            name: 'Suicide Squad',
                            licensor: 'DC Comics',
                            description: [
                                'You don\'t have to be crazy to buy this, but it helps',
                                'Officially Licensed DC Product',
                                'Impress your Puddin\'',
                                'Who says the good guys should have all the fun?',
                                'Even a Lil Monster deserves awesome merch'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/d4e149f7daa24fe0be4dc10c5fc8029b.png',

                            bullet: [
                                '//cdn.optimizely.com/img/6087172626/4c2ced6b9b5441f1aa825d5d8c0e874a.png'
                            ],
                            /*background: '//cdn.optimizely.com/img/6087172626/009f2dea147a4f259899095a200d4053.jpg',*/
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/cf54bdc82041463fad6f85d1a4b3be5f.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Suicide Squad merchandise, approved by DC Entertainment. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators..'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/826cad75017843daba02c119d531c5f5.png',
                                    desc: 'Show your love for Sucide Squad by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                            /* $('body').addClass('ME100-SuicideSquad');*/
                            }
                        };
                    case 'Harley Quinn':
                        return {
                            name: 'Harley Quinn',
                            licensor: 'DC Comics',
                            description: [
                                'You don\'t have to be crazy to buy this, but it helps',
                                'Officially Licensed DC Product',
                                'Impress your Puddin\'',
                                'Who says the good guys should have all the fun?',
                                'Even a Lil Monster deserves awesome merch'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/d4e149f7daa24fe0be4dc10c5fc8029b.png',

                            /*background: '//cdn.optimizely.com/img/6087172626/009f2dea147a4f259899095a200d4053.jpg',*/
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/cf54bdc82041463fad6f85d1a4b3be5f.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Suicide Squad merchandise, approved by DC Entertainment. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/aeff7a00d5014e1c854db7cb8a584717.png',
                                    desc: 'Show your love for Harley Quinn by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data. _productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                            /*  $('body').addClass('ME100-SuicideSquad');
                                var $title = $('h1.entry-title');
                                $title
                                    .clone()
                                    .addClass('ME100_cloned-title')
                                    .insertAfter($title);*/
                            }
                        };
                    case 'Resident Evil VII':
                        return {
                            name: 'Resident Evil',
                            licensor: 'Capcom',
                            description: [
                                'Stay stylish in the zombie apocalypse',
                                'Officially Licensed Resident Evil Product',
                                'Merchandise good enough for S.T.A.R.S.',
                                'Perfect gear for your zombie plan (we know you have one)',
                                'Meeeerrchhh.....I mean Braiiiiinnnnnsss'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/92d96b22e3b544449df1636b45e45c61.png',
                            icons: [
                                '//cdn.optimizely.com/img/6087172626/2d8c8e3637ad41f5be73f4789835052d.png',
                                '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                            ],
                            bullet: [
                                '//cdn.optimizely.com/img/6087172626/69bb76ebb3e449e195f6de732056ead2.png'
                            ],
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/06e1dcc43f2744159b8b0a16a9780c01.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Resident Evil merchandise, approved by Capcom. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/465637382d094c8daac0adf01399b553.png',
                                    desc: 'Show your love for the Resdient Evil franchise by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                            /*  $('body').addClass('ME100-ResidentEvil'); */
                            }
                        };
                    case 'Zelda':
                        return {
                            name: 'Zelda',
                            licensor: 'Nintendo',
                            description: [
                                'It\'s dangerous to go alone, take this!',
                                'Officially Licensed Zelda Product',
                                'Zelda merchandise - the missing \'link\' in your life',
                                'Hey! Listen! Get this awesome merchandise!',
                                'Buy it to keep it away from Ganondorf'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/6122ff6e94814052a90ee3c0cb97dc79.png',
                            icons: [
                                '//cdn.optimizely.com/img/6087172626/01ab387497a141a0af7a715326401250.png',
                                '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                            ],
                            bullet: [
                                '//cdn.optimizely.com/img/6087172626/54c6144cf29c49a7a6fed65f8ef956f5.png'
                            ],
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/1b963250bb584a978211452e01508513.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Zelda merchandise, approved by Nintendo. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/ceb50265aaa24de18313abe083deaff9.png',
                                    desc: 'Show your love for Zelda by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                            /*  $('body').addClass('ME100-Zelda'); */
                            }
                        };
                    case 'Spiderman':
                        return {
                            name: 'Spiderman',
                            licensor: 'Marvel',
                            description: [
                                'With great merchandise, comes great responsibility',
                                'Officially Licensed Spider-man Product',
                                'As amazing as Spider-man himself!',
                                'Spider senses tingling? Better buy this!',
                                'The ultimate in Spidey Style'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/4269caa6a9cb4f62a3058d9f2068722b.png',
                            icons: [
                                '//cdn.optimizely.com/img/6087172626/2cf56f74432b45139de1fb25e2c8d6b4.png',
                                '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                            ],
                            bullet: [
                                '//cdn.optimizely.com/img/6087172626/66660f97dcb245a4a6aeb86c61a6b1f6.png'
                            ],
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/58ea3693caa641168dccd92609918c13.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Spider-Man merchandise, approved by Marvel Studios. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/45b8a69d5f9544fcbd322e1d40d89419.png',
                                    desc: 'Show your love for Spider-Man and join the Marvel Universe by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                            /* $('body').addClass('ME100-Spiderman'); */
                            }
                        };
                    case 'Super Mario Bros':
                        return {
                            name: 'Super Mario',
                            licensor: 'Nintendo',
                            description: [
                                'It\'s-a me, awesome Mario merchandise!',
                                'Officially Licensed Nintendo Product',
                                'Get a life with Super Mario merchandise',
                                'Don\'t worry, your merch isn\'t in another castle',
                                'Perfect for all your adventures'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/9d0dad59f71f4ed09fd1df63fbc55aba.png',
                            icons: [
                                '//cdn.optimizely.com/img/6087172626/528f9b2d3d234a13b23905bcc4ece960.png',
                                '//cdn.optimizely.com/img/3320600494/06a9362604b54a708ada09805246e97f.png'
                            ],
                            bullet: [
                                '//cdn.optimizely.com/img/6087172626/0a7675d8197a4f528b79a36fcdb09062.png'
                            ],
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/675e0828cd344052853408c741769ee4.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Super Mario merchandise, approved by Nintendo. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/79e10ad29ea0421fa80880cb02042521.png',
                                    desc: 'Show your love for Super Mario by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                            /* $('body').addClass('ME100-SuperMario');*/
                            }
                        };
                    case 'Destiny':
                        return {
                            name: 'Destiny',
                            licensor: 'Bungie',
                            description: [
                                'Usually only available from Xur',
                                'Officially Licensed Destiny Product',
                                'Max out your gear',
                                'You won’t find anything like this at the Guardian Outfitter’s',
                                'Unboxing this is more exciting than an exotic engram dropping'
                            ],
                            logo: '//cdn.optimizely.com/img/6087172626/1d165eb0659845dbb9b81f6174c99cbc.png',
                            /*background: '//cdn.optimizely.com/img/6087172626/4afabb2074884ff1a79b506b1e125be4.jpg',*/
                            features: [
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/5c78d207a37843b4a8e4be21ca024966.png',
                                    desc: 'The ' + data._productName + ' is officially licensed Destiny merchandise, approved by Bungie. You can be confident it will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.'
                                },
                                {
                                    image: '//cdn.optimizely.com/img/4304152100/191da6f53c644b3ca41a85332df6141b.png',
                                    desc: 'Show your love for Destiny by getting your hands on the ' + data._productName + '. You know you want to.'
                                },
                                {
                                    image: data._productImg,
                                    desc: 'The ' + data._productName + ' has been hand selected by the Merchoid team, to bring you the highest quality merchandise. We\'re sure you\'ll love it, that\'s why we give you 100 days to return your item.'
                                }
                            ],
                            brandSpecificChanges: function () {
                            /* $('body').addClass('ME100-Destiny');*/
                            }
                        };
                    default:
                        return this.settings.defaults;
                    }
                },

                /* 
                * PRODUCT SPECIFIC ELEMENTS
                */
                product: function (product) {
                    switch (product) {
                    case 'Luxury 19 inch Chewbacca Christmas Stocking':
                        return {
                            description: [
                                '"So Chewie, what do you want for Christmas?"<br>"Rrrrrrr-ghghghghgh!"',
                                'No Wookiees were harmed in the making of this product',
                                'Includes a bandolier so you you can tell it\'s definitely Chewie and not some other Wookier imposter!',
                                'We would not blame you one bit if you bought two and wore these as big socks',
                                'Expecting a puppy on Xmas Day? You can just sit and stroke this until they arrive'
                            ],
                            product_imgs: ['//cdn.optimizely.com/img/3320600494/e1e67136c35f479183600cb425382b67.png']
                        };
                    case 'Daddy\'s Lil Monster Official Replica Shirt':
                        return {
                            product_imgs: ['http://ab-test-sandbox.userconversion.com/experiments/MRC-ME100-Product_page_redesign_HQtshirt.png']
                        };
                    }
                }
            },
            
            variation: function(data) {
                $('body').addClass('ME100');
            
                // Full Story Integration
                window.UC.poller([
                    function() {
                        if (window.FS) return true;
                    }
                ], function() {
                    FS.setUserVars({
                        experiment_str: 'ME100',
                        variation_str: 'Product Page Redesign (Desktop)'
                    });
                }, { multiplier: 1.2, timeout: 0 });

                data = this.data;
                var settings = data.settings;
                var branding = data.branding(data._brandName);
                var product = data.product(data._productName);

                // Product
                var $productGallery = $('.product-gallery');
                var $productImg = $productGallery.find('.images .product-image');

                // branded background
                var $title = $('.product-title-wrapper');
                var $productWrap = $('<div class="ME100_product-wrap"></div>');

                $productGallery.children('.images').appendTo($productWrap);
                $productWrap.prependTo($productGallery);
                $productGallery.find('.product-thumbnails').insertAfter($productWrap);

                if (branding && branding.background) {
                    $productWrap.prepend('<div class="ME100_product-bg" style="background-image: url(' + branding.background + ')"></div>');
                }
                
                // brand logo
                if (branding && branding.logo) {
                    var $brandLogo = $('<div class="ME100_brand-logo"><img src="' + branding.logo + '"/></div>');
                    $brandLogo.insertAfter($productImg);
                }

                // price and add to cart
                var $productInfo = $('.product-info');
                $productInfo.hide();

                var $newProductInfo = $([
                    '<div class="ME100_product-info product-info">',
                        '<div class="ME100_title-row columns small-12 large-6"></div>',
                        '<div class="ME100_cart columns small-12 large-6"></div>',
                        '<div class="ME100_scarcity columns small-12 large-6"></div>',
                        '<div class="ME100_description columns small-12 large-6"></div>',
                        '<div class="ME100_story columns small-12"></div>',
                        '<div class="ME100_shop-with-merchoid columns small-12"></div>',
                        '<div class="ME100_accordion"></div>',
                        '<div class="ME100_similar-products"></div>',
                        '<div class="ME100_newsletter"></div>',
                    '</div>'
                ].join(''));
                
                // title row
                var $titleRow = $newProductInfo.find('.ME100_title-row');
                $titleRow.append('<h1>' + data._brandName + ': ' + data._productName + '</h1>');
                // check for sale
                var $promoStamp = $('.callout.large');
                if ($promoStamp.length > 0) {
                    /* 
                    * Mobile
                    $promoStamp.appendTo($productWrap);
                    */
                    
                    $promoStamp.appendTo($titleRow);
                    $promoStamp.wrap('<div class="ME100_promo"></div>');
                }
                
                // cart section
                var $newCart = $newProductInfo.find('.ME100_cart');
                $productInfo
                    .find('.price.large')
                    .appendTo($newCart)
                    .find('.price-extra-info')
                    .text('Includes taxes and shipping');
                
                var $addToCartForm = $('form.cart');
                $addToCartForm.appendTo($newCart);
                
                var $brs = $addToCartForm.find('.radical-variations-wrapper > br');
                if ($brs.length > 0) $brs.remove();
                
                // USP
                var USPReturnTxt;
                    
                if (data._isGB) {
                    USPReturnTxt = 'Free and easy returns';
                } else {
                    USPReturnTxt = '100 day returns';
                }

                var $usp = $([
                    '<ul class="ME100_cart-usp">',
                        '<li><span class="ME100_icon"></span><span>Free delivery</span></li>',
                        '<li><span class="ME100_icon"></span><span>' + USPReturnTxt + '</span></li>',
                    '</ul>'
                ].join(''));

                var uspIcons = branding && branding.icons ? branding.icons : settings.defaults.icons;
                $usp.find('.ME100_icon').each(function (i) {
                    $(this).append('<img src="' + uspIcons[i] + '"/>');
                });
                $usp.appendTo($newCart); 
    
                // if in stock, hide stock info message by default and show on change
                var $stockInfo = $('.woocommerce-variation.single_variation');
                if ($stockInfo.find('.woocommerce-variation-availability .stock').text().trim().toLowerCase() === 'in stock') {
                    $stockInfo.hide();
                }

                // If delivery message exists move it after add to cart btn to keep them on one line
                window.UC.poller(['#shippingDateP'], function() {
                    $('#shippingDateP').appendTo('.radical-variations-wrapper');
                }, { timeout: '8000' });

                // Countdown / Scarcity message
                /*
                var $scarcity = $('#merchoid-scarcity-message');
                if ($scarcity.length > 0) {
                    $scarcity.clone().addClass('ME100_scarcity').appendTo($newProductInfo.find('.ME100_scarcity'));
                    $scarcity.prependTo($productGallery.find('.images'));
                    
                    // if scarcity is about stock level, hide the stock level under add to cart button
                    window.UC.poller([
                        function() {
                            if ($scarcity.has('strong:contains("Limited Stock!")')) return true
                        }
                    ], function() {
                        window.UC.poller([
                            '.stockinfo'
                        ], function () {
                            $('.stockinfo').hide();
                        });
                    }, {
                        timeout: 10000,
                        multiplier: 1.1,
                        wait: 100
                    });
                    
                    
                    if ($scarcity.find('.timer').length > 0) {
                        var $newCountdown = $('<div></div>');
                        var $newTimer = $newProductInfo.find('#merchoid-scarcity-message.ME100_scarcity .timer');
                        var $timer = $scarcity.find('.timer');
                        var deadline = new Date();

                        deadline.setHours(deadline.getUTCHours() + parseInt($timer.children('.hours').text()));
                        deadline.setMinutes(deadline.getUTCMinutes() + parseInt($timer.children('.minutes').text()));
                        deadline.setSeconds(deadline.getUTCSeconds() + parseInt($timer.children('.seconds').text()));

                        var now = new Date(),
                            d = new Date();

                        d.setHours(d.getUTCHours());

                        var secondsUntilCutoff = Math.floor((deadline.getTime() - d.getTime()) / 1000);

                        function timer() {
                            var days = Math.floor(secondsUntilCutoff / 24 / 60 / 60);
                            var hoursLeft = Math.floor((secondsUntilCutoff) - (days * 86400));
                            var hours = Math.floor(hoursLeft / 3600);
                            var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
                            var minutes = Math.floor(minutesLeft / 60);
                            var remainingSeconds = secondsUntilCutoff % 60;
                            if (remainingSeconds < 10) {
                                remainingSeconds = "0" + remainingSeconds;
                            }

                            $newCountdown[0].innerHTML = [
                            '<span class="hours">' + hours + '</span> hours ',
                            '<span class="minutes">' + minutes + '</span> minutes ',
                            '<span class="seconds">' + remainingSeconds + '</span> seconds ',
                            ].join('');

                            if (secondsUntilCutoff == 0) {
                                clearInterval(countdownTimer);
                            } else {
                                secondsUntilCutoff--;
                            }
                        }

                        var countdownTimer = setInterval(timer, 1000);
                        $newTimer.html($newCountdown);
                    }
                }
                */
        
                // Tabs
                var $descriptionBlock = $newProductInfo.find('.ME100_description');

                var $tabsBlock = $([
                    '<ul class="ME100_tabs">',
                    '</ul>',
                    '<div class="ME100_tabs-content">',
                    '</div>'
                ].join(''));
                var $tabs = $tabsBlock.filter('.ME100_tabs');
                var $tabsContent = $tabsBlock.filter('.ME100_tabs-content');
                
                var tabsContent = []; // [ ['tab name', 'content'] ]
                
                // Description tab
                var descriptionArr = (product && product.description ? product.description : (branding && branding.description ? branding.description : false));

                if (descriptionArr) {
                    var $descriptionList = $('<ul class="ME100_description-list"></ul>');
                    $.each(descriptionArr, function () {
                        var $li = $('<li><span>' + this + '</span></li>');
                        var bulletImg = branding && branding.bullet ? branding.bullet : settings.defaults.bullet;
                        $li.prepend('<span class="ME100_bullet"><img src="' + bulletImg + '"/></span>');
                        $li.appendTo($descriptionList);
                    });
                    tabsContent.push(['Description', $descriptionList]);
                } else {
                    // If no description specified in data
                    // fallback to the default description on the page
                    var $defaultDesc = $('#tab-description');
                    if ($defaultDesc.length) {
                        if ($defaultDesc.children('p').length) {
                            $defaultDesc.children('p').each(function () {
                                var txt = $(this).html();
                                if (txt === '&nbsp;') $(this).remove();
                            });
                        }
                        tabsContent.push(['Description', $defaultDesc.contents()]);
                    }
                }
                
                // More info tab
                var $defaultMoreInfo = $('#tab-additional_information');
                if ($defaultMoreInfo.length) {
                    tabsContent.push(['More Info', $defaultMoreInfo.contents()]);
                }
                
                // Delivery and FAQs tab
                $.each(data.settings.accordion, function() {
                    tabsContent.push([this.nav, this.content]);
                });
            
                
                // Create tabs
                for (var i = 0; i < tabsContent.length; i++) {
                    (function() {
                        var tab = tabsContent[i];
                        var tabName = tab[0];
                        var tabContent = tab[1];
                        
                        var $tab = $('<li>' + tabName + '</li>');
                        var $tabContent = $('<div class="ME100_tab-content"></div>');
                        $tabContent.append($(tabContent));
                        
                        $tab.click(function() {
                            if ($(this).hasClass('ME100_tab--active')) {
                                return false;
                            } else {
                                // remove current active tab
                                $('.ME100_tab--active').removeClass('ME100_tab--active');
                                // set this to active
                                $tab.add($tabContent).addClass('ME100_tab--active');
                            }
                        });
                        
                        // show first tab by default
                        if (i === 0) {
                            $tab.add($tabContent).addClass('ME100_tab--active');
                        }
                        
                        $tab.appendTo($tabs);
                        $tabContent.appendTo($tabsContent);
                    }());
                }

                $tabsBlock.appendTo($descriptionBlock);

                // Out of stock message
                if (!data._productInStock) {
                    $descriptionBlock.before('<div class="ME100_out-of-stock columns small-12 large-6"><span>Sorry, this product is out of stock</span></div>');
                    $usp.hide();
                }

                // Resize max-height based on height of image block
                var getImagesHeight = function() {
                    return $productGallery.height();
                };
                
                var getCartHeight = function() {
                    var titleHeight = $('.ME100_title-row').outerHeight();
                    var cartHeight = $newCart.outerHeight();
                    var descriptionPush = parseFloat($descriptionBlock.css('margin-top')) + parseFloat($descriptionBlock.css('padding-top'));
                    var tabHeight = $tabs.outerHeight();

                    if (typeof descriptionPush !== 'number') descriptionPush = 0;

                    return titleHeight + cartHeight + descriptionPush + tabHeight;
                }

                var setDescHeight = function() {
                    var imageHeight = getImagesHeight();
                    var cartHeight = getCartHeight();
                    var heightDiff = imageHeight - cartHeight;

                    if (heightDiff > 230) {
                        $tabsContent.css('max-height', heightDiff);
                    } else {
                        $tabsContent.css('max-height', '230px');
                    }
                };

                // set initial max-height
                $(function() {
                    setDescHeight();
                    setTimeout(setDescHeight, 500);
                });

                // trigger resize on mutation
                var $imgSlider = $('.product-gallery-slider');
                window.UC.observer.connect($imgSlider, function() {
                    setTimeout(setDescHeight, 300);
                }, {
                    config: { attributes: true, childList: false, subtree: false },
                    throttle: 500
                });

                // wrapped in IIFE because variable names are already used
                // to fix when going live on site
                var initStoryBlock = (function(){
                    var $story = $newProductInfo.find('.ME100_story');

                    var $tabsHTML = $([
                        '<ul class="ME100_story__tabs">',
                            '<li data-content="#ME100_product-features" class="ME100_story-tab--active">Product Features</li>',
                            '<li data-content="#ME100_merchoid-story">About Merchoid</li>',
                        '</ul>',
                        '<div class="ME100_story__content">',
                            '<div id="ME100_merchoid-story"></div>',
                            '<div id="ME100_product-features" class="ME100_story-content--active"></div>',
                        '</div>'
                    ].join(''));

                    var $tabs = $tabsHTML.filter('.ME100_story__tabs').children('li');
                    var $tabsContent = $tabsHTML.filter('.ME100_story__content').children();

                    $tabs.each(function () {
                        var $thisTab = $(this),
                            content = $thisTab.data('content'),
                            $thisContent = $tabsContent.filter(content);

                        $thisTab.click(function () {
                            $tabs.filter('.ME100_story-tab--active').removeClass('ME100_story-tab--active');
                            $tabsContent.filter('.ME100_story-content--active').hide();

                            $thisTab.addClass('ME100_story-tab--active');
                            $thisContent.addClass('ME100_story-content--active').show();
                        });
                    });

                    // Above the fold content complete - hide loader
                    $loader.hide();

                    // Merchoid Story
                    var merchoidStory = settings.aboutMerchoid;
                    var $merchoidStory = $tabsHTML.find('#ME100_merchoid-story');
                    $.each(merchoidStory, function () {
                        $([
                            '<div class="ME100_merchoid-story columns small-12 large-4">',
                                '<div class="ME100_merchoid-story__img"><img src="' + this.img + '"/></div>',
                                '<h3>' + this.title + '</h3>',
                                '<p>' + this.desc + '</p>',
                            '</div>'
                        ].join('')).appendTo($merchoidStory);
                    });
                    $merchoidStory.append('<div class="clearfix"></div>');

                    // Features
                    var features = [(branding && branding.features ? branding.features : false), (product && product.features ? product.features : false)];

                    $.each(features, function () {
                        var $features = $tabsHTML.find('#ME100_product-features');
                        $.each(this, function (i) {
                            var $html;
                            if (i % 2 === 0) {
                                $html = $([
                                    '<div class="ME100_feature">',
                                        '<div class="ME100_feature__text">',
                                            '<p>' + this.desc + '</p>',
                                        '</div>',
                                        '<div class="ME100_feature__img">',
                                            '<img src="' + this.image + '">',
                                        '</div>',
                                    '</div>'
                                ].join(''));
                            } else {
                                $html = $([
                                    '<div class="ME100_feature">',
                                        '<div class="ME100_feature__img">',
                                            '<img src="' + this.image + '">',
                                        '</div>',
                                        '<div class="ME100_feature__text">',
                                            '<p>' + this.desc + '</p>',
                                        '</div>',
                                    '</div>'
                                ].join(''));
                            }

                            if (this.heading) {
                                $html.find('.ME100_feature__text').prepend('<h3>' + this.heading + '</h3>');
                            }

                            $html.appendTo($features);
                        });
                    });

                    if (features.every(function(val) {
                            return val === false;
                        })) {
                        $story.addClass('ME100_story--single');
                        $tabsHTML.find('[data-content="#ME100_product-features"]').hide();
                        $tabsHTML.find('[data-content="#ME100_merchoid-story"]')
                            .addClass('ME100_story-tab--active')
                            .click(function(e) {
                                e.preventDefault();
                            });
                        $tabsHTML.find('#ME100_product-features').hide();
                        $tabsHTML.find('#ME100_merchoid-story').show();
                    }

                    $story.append($tabsHTML);
                }());
                
                // Shop with Merchoid
                var o = window.optimizely;
                $([
                    '<h2>Shop with Merchoid</h2>',
                    '<div class="ME100_grid columns small-12">',
                        '<div class="ME100_grid-row">',
                            '<div class="ME100_block">',
                                '<div class="ME100_block__img"><img src="//cdn.optimizely.com/img/3320600494/5352bcd6b5de4e7fb07637d12cacfdc1.png" /></div>',
                                '<h3>Free worldwide delivery</h3>',
                                '<p>We pay for your shipping so you don\'t have to.</p>',
                            '</div>',
                            '<div class="ME100_block">',
                                '<div class="ME100_block__img"><img src="//cdn.optimizely.com/img/3320600494/fc1658cbb7f74254b6530b352061c8ee.png" /></div>',
                                '<h3>',
                                    data._isGB ? 'Free 100 day returns' : '100 day returns',
                                '</h3>',
                                '<p>Easy, no hassle returns policy for 100 days from the purchase data.</p>',
                            '</div>',
                        '</div>',
                        '<div class="ME100_grid-row">',
                            '<div class="ME100_block">',
                                '<div class="ME100_block__img"><img src="//cdn.optimizely.com/img/3320600494/bf203cd8153f4b27a0fd11b4f83a9b62.png" /></div>',
                                '<h3>100% official merch</h3>',
                                '<p>Approved by ' + branding.licensor + ', so you can be confident anything you buy will be of the highest quality</p>',
                            '</div>',
                            '<div class="ME100_block">',
                                '<div class="ME100_block__img"><img src="//cdn.optimizely.com/img/3320600494/8e3b9ca3389e4c4cbd7ed02baae2a804.png" /></div>',
                                '<h3>Money back guarantee</h3>',
                                '<p>If for some reason you\'re not happy with your order, you can return for a full refund</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="clearfix"></div>'
                ].join('')).appendTo($newProductInfo.find('.ME100_shop-with-merchoid'));
                
                // Newsletter
                window.UC.poller([
                    function() {
                        if ($('.chimpy-reset.chimpy_shortcode_content:has(header:contains("Get the latest merchandise, coupons and offers..."))').length) return true;
                    }
                ], function() {
                    var $newsletter = $('.chimpy-reset.chimpy_shortcode_content:has(header:contains("Get the latest merchandise, coupons and offers..."))');
                    
                    $newsletter.appendTo($newProductInfo.find('.ME100_newsletter'));
                }, { multiplier: 1.2 });
                

                $newProductInfo.insertBefore($productInfo);

                
                // Add section backgrounds
                $newProductInfo.find('.ME100_shop-with-merchoid').prepend('<div class="ME100_section-bg"></div>');
                
                
                // Recommended Products
                $(function() {
                    var $relatedProducts = $('#radical-related-products:first');
                    var $relatedProductsWrap = $newProductInfo.find('.ME100_similar-products');
                    $relatedProductsWrap.append('<h2>You might also like:</h2>');
                    $relatedProducts.removeAttr('id').appendTo($relatedProductsWrap);
                    
                    if ($relatedProducts.children('li').length) {
                        if ($relatedProducts.children('li').length > 4) {
                            window.UC.poller([
                                function () {
                                    if (jQuery().flickity) return true;
                                }
                            ], function () {
                                $relatedProducts.flickity({
                                    pageDots: false,
                                    resize: true,
                                    cellAlign: 'left'
                                });
                            }, { timeout: 10000 });
                        }
                    } else {
                        $relatedProductsWrap.hide();
                    }

                    if (branding && branding.brandSpecificChanges) {
                        branding.brandSpecificChanges();
                    }
                });
            }
        };

        ME100.variation.call(ME100);
    };
    
    var trigger = (function() {
        window.UC.poller([
            '.product-gallery .images .product-image',
            '.product-info',
            '.price.large .price-extra-info',
           	'form.cart'
        ], _runExperiment, { timeout: 7000, multiplier: 0 });
    }());
    

}(window.jQuery));