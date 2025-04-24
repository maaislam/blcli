/*eslint-disable */
import * as UC from '../../../../../lib/uc-lib';
import * as utils from '../../../../../lib/utils';


export default function mobileNav(){
    var $ = jQuery;

    $('.topheader #nav').remove();
    var navContainer = $('<div class="UC68_mobileWrap"><div class="UC68-MainContent"></div>');
    $('body').prepend(navContainer);

    /*----------------------------------------
            Main Nav Content
    ----------------------------------------*/

    var $mainNav = $('.UC68-MainContent');

    var $navHtml = $([
        '<div class="uc68_logo">',
        '<img src="https://www.currentbody.com/skin/frontend/bootstrap/currentbody/images/logo.png"/>',
        '</div>',
        '<div class="UC68_topBar">',
        '<div class="UC68-exit"><span>❮</span> Back to site</div>',
        '</div>',
        '<div class="UC68-mainLinks"><ul class="uc68-newnavlinks"></ul></div>'
    ].join('')).prependTo($mainNav);


    $('.UC68-exit').click(function () {
        $('body').removeClass('uc68_noScroll');
        var left = '-100%';
        $('.UC68_mobileWrap').animate({
            left: left
        }, function () {
            $(this).removeClass('active');
        });
    });


    /*----------------------------------------
                Slide out function
    ----------------------------------------*/
    $('.nav-container').click(function () {

        $('body').addClass('uc68_noScroll');
        var left = '0';
        if ($('.UC68_mobileWrap').hasClass('active')) {
            left = '-100%';
        }

        $('.UC68_mobileWrap').animate({
            left: left
        }, function () {
            $(this).addClass('active');

        });
    });


    //FACIAL CLEANSING
    var bestSellersFaciallink1 = $('.menu_a_1').attr('data-link'),
        bestSellersFacialimage1 = $('.menu_a_1').attr('data-img'),
        bestSellersFacialname1 = $('.menu_a_1').attr('data-name'),
        bestSellersFacialprice1 = $('.menu_a_1').attr('data-price'),

        bestSellersFaciallink2 = $('.menu_a_2').attr('data-link'),
        bestSellersFacialimage2 = $('.menu_a_2').attr('data-img'),
        bestSellersFacialname2 = $('.menu_a_2').attr('data-name'),
        bestSellersFacialprice2 = $('.menu_a_2').attr('data-price'),
        //HAIR
        bestSellersHairRemovalink1 = $('.menu_b_1').attr('data-link'),
        bestSellersHairRemovalimage1 = $('.menu_b_1').attr('data-img'),
        bestSellersHairRemovalname1 = $('.menu_b_1').attr('data-name'),
        bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price'),

        bestSellersHairRemovalink2 = $('.menu_b_2').attr('data-link'),
        bestSellersHairRemovalimage2 = $('.menu_b_2').attr('data-img'),
        bestSellersHairRemovalname2 = $('.menu_b_2').attr('data-name'),
        bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price'),
        //AGEING
        bestSellersAgeinglink1 = $('.menu_c_1').attr('data-link'),
        bestSellersAgeingimage1 = $('.menu_c_1').attr('data-img'),
        bestSellersAgeingname1 = $('.menu_c_1').attr('data-name'),
        bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price'),

        bestSellersAgeinglink2 = $('.menu_c_2').attr('data-link'),
        bestSellersAgeingimage2 = $('.menu_c_2').attr('data-img'),
        bestSellersAgeingname2 = $('.menu_c_2').attr('data-name'),
        bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price'),
        //ACNE
        bestSellersAcnelink1 = $('.menu_d_1').attr('data-link'),
        bestSellersAcneimage1 = $('.menu_d_1').attr('data-img'),
        bestSellersAcnename1 = $('.menu_d_1').attr('data-name'),
        bestSellersAcneprice1 = $('.menu_d_1').attr('data-price'),

        bestSellersAcnelink2 = $('.menu_d_2').attr('data-link'),
        bestSellersAcneimage2 = $('.menu_d_2').attr('data-img'),
        bestSellersAcnename2 = $('.menu_d_2').attr('data-name'),
        bestSellersAcneprice2 = $('.menu_d_2').attr('data-price');



    var country = $('#currency_chooser')[0].selectedOptions[0].innerText.trim();
    var currency;

    if (country === 'EUR') {
        currency = '€';
    }
    else if (country === 'GBP') {
        currency = '£';
    }
    else if (country === 'USD') {
        currency = '$';
    }



    // JSON
    var nav_item = [

        /****************  
        FACIAL CLEANSING
        ****************/
        {
            title: 'Facial Cleansing',
            content: {
                lvl2: [
                    {
                        title: 'View All Facial Cleansing',
                        url: '/face/skin-cleansers.html'
                    },

                    {
                        title: 'Top Brands',
                        content: {
                            links: [
                                {
                                    title: 'Clarisonic',
                                    url: '/clarisonic'
                                },
                                {
                                    title: 'Foreo',
                                    url: '/foreo'
                                },
                                {
                                    title: 'Panasonic',
                                    url: '/panasonic'
                                },
                                {
                                    title: 'PMD',
                                    url: '/pmd'
                                },
                                {
                                    title: 'View All Brands',
                                    url: '/all-brands'
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Category',
                        content: {
                            links: [
                                {
                                    title: 'Facial Cleansers',
                                    url: '/face/skin-cleansers.html'
                                },
                                {
                                    title: 'Body',
                                    url: '/face/skin-cleansers.html'
                                },
                                {
                                    title: 'For Men',
                                    url: '/face/skin-cleansers.html'
                                },
                                {
                                    title: 'Accessories',
                                    url: '/face/skin-cleansers/accessories.html'
                                },
                                {
                                    title: 'Gels & Creams',
                                    url: '/body/exfoliation-and-skin-care.html'
                                },
                            ]
                        }
                    },
                    {
                        title: 'Best Sellers',
                        content: {
                            products: [
                                {
                                    title: bestSellersFacialname1,
                                    price: 'Now: ' + currency + bestSellersFacialprice1,
                                    img: bestSellersFacialimage1,
                                    url: bestSellersFaciallink1
                                },
                                {
                                    title: bestSellersFacialname2,
                                    price: 'Now: ' + currency + bestSellersFacialprice2,
                                    img: bestSellersFacialimage2,
                                    url: bestSellersFaciallink2
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Concern',
                        content: {
                            links: [
                                {
                                    title: 'Pores/Blackheads',
                                    url: '/face/skin-cleansers.html'
                                },
                                {
                                    title: 'Pigmentation',
                                    url: '/face/skin-cleansers.html'
                                },
                                {
                                    title: 'Lines/Wrinkles',
                                    url: '/face/skin-cleansers.html'
                                },
                                {
                                    title: 'Oily Skin',
                                    url: '/face/skin-cleansers.html'
                                },
                                {
                                    title: 'Dull Skin',
                                    url: '/face/skin-cleansers.html'
                                }
                            ]
                        }
                    }
                ]
            }
        },


        /****************  
        HAIR REMOVAL
        ****************/
        {
            title: 'Hair Removal',
            content: {
                lvl2: [
                    {
                        title: 'View All Hair Removal',
                        url: '/hair-and-nails/hair-removal.html'
                    },

                    {
                        title: 'Top Brands',
                        content: {
                            links: [
                                {
                                    title: 'Tria',
                                    url: '/tria'
                                },
                                {
                                    title: 'Iluminage',
                                    url: '/iluminage'
                                },
                                {
                                    title: 'SmoothSkin',
                                    url: '/smoothskin'
                                },
                                {
                                    title: 'Philips',
                                    url: '/philips'
                                },
                                {
                                    title: 'View All Brands',
                                    url: '/all-brands'
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Category',
                        content: {
                            links: [
                                {
                                    title: 'Permanent Hair Removal',
                                    url: '/hair-and-nails/hair-removal/permanent-hair-removal.html'
                                },
                                {
                                    title: 'IPL & Laser',
                                    url: '/hair-and-nails/hair-removal.html'
                                },
                                {
                                    title: 'For Men',
                                    url: '/hair-and-nails/hair-removal/men-s.html'
                                },
                                {
                                    title: 'Epilators',
                                    url: '/hair-and-nails/hair-removal/epilators.html'
                                },
                                {
                                    title: 'Lady Shavers & Trimmers',
                                    url: '/hair-and-nails/hair-removal/ladyshaves-trimmers.html'
                                },
                            ]
                        }
                    },
                    {
                        title: 'Best Sellers',
                        content: {
                            products: [
                                {
                                    title: bestSellersHairRemovalname1,
                                    price: 'Now: ' + currency + bestSellersHairRemovalprice1,
                                    img: bestSellersHairRemovalimage1,
                                    url: bestSellersHairRemovalink1
                                },
                                {
                                    title: bestSellersHairRemovalname2,
                                    price: 'Now: ' + currency + bestSellersHairRemovalprice2,
                                    img: bestSellersHairRemovalimage2,
                                    url: bestSellersHairRemovalink2
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Concern',
                        content: {
                            links: [
                                {
                                    title: 'Unwanted Facial Hair',
                                    url: '/hair-and-nails/unwanted-hair-removed.html'
                                },
                                {
                                    title: 'Unwanted Bikini Line Hair',
                                    url: '/hair-and-nails/unwanted-hair-removed.html'
                                },
                                {
                                    title: 'Unwanted Body Hair',
                                    url: '/hair-and-nails/unwanted-hair-removed.html'
                                },
                                {
                                    title: 'Light Body Hair',
                                    url: '/hair-and-nails/unwanted-hair-removed.html'
                                },
                                {
                                    title: 'Darker Skin',
                                    url: '/hair-and-nails/unwanted-hair-removed.html'
                                }
                            ]
                        }
                    }
                ]
            }
        },
        /****************  
        Anti -Ageing 
        ****************/
        {
            title: 'Anti-Ageing',
            content: {
                lvl2: [
                    {
                        title: 'View All Anti-Ageing',
                        url: '/face/anti-aging.html'
                    },

                    {
                        title: 'Top Brands',
                        content: {
                            links: [
                                {
                                    title: 'Wellbox',
                                    url: '/wellbox'
                                },
                                {
                                    title: 'NuFace',
                                    url: '/nuface'
                                },
                                {
                                    title: 'Tria',
                                    url: '/tria'
                                },
                                {
                                    title: 'Iluminage',
                                    url: '/iluminage'
                                },
                                {
                                    title: 'View All Brands',
                                    url: '/all-brands'
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Category',
                        content: {
                            links: [
                                {
                                    title: 'Face',
                                    url: '/face/anti-aging.html'
                                },
                                {
                                    title: 'Eyes',
                                    url: '/face/anti-aging.html'
                                },
                                {
                                    title: 'Neck & Body',
                                    url: '/face/anti-aging.html'
                                },
                                {
                                    title: 'Accessories',
                                    url: '/face/anti-aging/accessories.html'
                                },
                                {
                                    title: 'Gels & Creams',
                                    url: '/face/anti-aging/accessories.html'
                                },
                            ]
                        }
                    },
                    {
                        title: 'Best Sellers',
                        content: {
                            products: [
                                {
                                    title: bestSellersAgeingname1,
                                    price: 'Now: ' + currency + bestSellersAgeingprice1,
                                    img: bestSellersAgeingimage1,
                                    url: bestSellersAgeinglink1
                                },
                                {
                                    title: bestSellersHairRemovalname2,
                                    price: 'Now: ' + currency + bestSellersHairRemovalprice2,
                                    img: bestSellersHairRemovalimage2,
                                    url: bestSellersHairRemovalink2
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Concern',
                        content: {
                            links: [
                                {
                                    title: 'Eye Area/Crow\'s Feet',
                                    url: '/face/anti-aging.html'
                                },
                                {
                                    title: 'Fine Lines/Wrinkles',
                                    url: '/face/anti-aging.html'
                                },
                                {
                                    title: 'Sagging Neck',
                                    url: '/face/anti-aging.html'
                                },
                                {
                                    title: 'Untoned Skin',
                                    url: '/face/anti-aging.html'
                                }
                            ]
                        }
                    }
                ]
            }
        },
        /****************  
       Acne
       ****************/
        {
            title: 'Acne',
            content: {
                lvl2: [
                    {
                        title: 'View All Acne',
                        url: '/face/acne-spot-removal.html'
                    },

                    {
                        title: 'Top Brands',
                        content: {
                            links: [
                                {
                                    title: 'Clarisonic',
                                    url: '/clarisonic'
                                },
                                {
                                    title: 'Baby Quasar',
                                    url: '/baby_quasar'
                                },
                                {
                                    title: 'PMD',
                                    url: '/pmd'
                                },
                                {
                                    title: 'Lustre',
                                    url: '/lustre'
                                },
                                {
                                    title: 'mē',
                                    url: '/me_power'
                                },
                                {
                                    title: 'View All Brands',
                                    url: '/all-brands'
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Category',
                        content: {
                            links: [
                                {
                                    title: 'Anti-Acne',
                                    url: '/face/acne-spot-removal.html'
                                },
                                {
                                    title: 'Spot Removal',
                                    url: '/face/acne-spot-removal.html'
                                },
                                {
                                    title: 'For Men',
                                    url: '/face/acne-spot-removal.html'
                                },
                                {
                                    title: 'Accessories',
                                    url: '/face/acne-spot-removal.html'
                                },
                            ]
                        }
                    },
                    {
                        title: 'Best Sellers',
                        content: {
                            products: [
                                {
                                    title: bestSellersAcnename1,
                                    price: 'Now: ' + currency + bestSellersAcneprice1,
                                    img: bestSellersAcneimage1,
                                    url: bestSellersAcnelink1
                                },
                                {
                                    title: bestSellersAcnename2,
                                    price: 'Now: ' + currency + bestSellersAcneprice2,
                                    img: bestSellersAcneimage2,
                                    url: bestSellersAcnelink2
                                }
                            ]
                        }
                    },
                    {
                        title: 'By Concern',
                        content: {
                            links: [
                                {
                                    title: 'Mild Acne',
                                    url: '/face/acne-spot-removal.html'
                                },
                                {
                                    title: 'Moderate Acne',
                                    url: '/face/acne-spot-removal.html'
                                },
                                {
                                    title: 'Blemishes',
                                    url: '/face/acne-spot-removal.html'
                                },
                                {
                                    title: 'Body Acne',
                                    url: '/face/acne-spot-removal.html'
                                }
                            ]
                        }
                    }
                ]
            }
        },

        /****************  
        OUTLET (THIS IS JUST A LINK)
        ****************/
        {
            title: 'Editorial',
            url: '/blog/'
        },
        /****************  
        All Beauty Technology
        ****************/
        {
            title: 'All Beauty Technology',
            content: {
                lvl2: [
                    {
                        title: 'Face',
                        content: {
                            links: [
                                {
                                    title: 'Facial Exfoliation',
                                    url: '/face/exfoliators-and-microdermabrasion.html'
                                },
                                {
                                    title: 'Teeth Whitening',
                                    url: '/face/teeth-whitening.html'
                                },
                                {
                                    title: 'Teeth Cleaning',
                                    url: '/face/teeth-cleaning.html'
                                },
                                {
                                    title: 'Facial Toning',
                                    url: '/face/facial-toning.html'
                                }
                            ]
                        }
                    },
                    {
                        title: 'Body',
                        content: {
                            links: [
                                {
                                    title: 'Toning and Sculpting',
                                    url: '/body/toning-and-sculpting.html'
                                },
                                {
                                    title: 'Body Exfoliation',
                                    url: '/body/exfoliation-and-skin-care.html'
                                },
                                {
                                    title: 'Footcare',
                                    url: '/body/foot-care.html'
                                },
                                {
                                    title: 'Toned Body',
                                    url: '/body/toned-body.html'
                                },
                                {
                                    title: 'Female Health',
                                    url: '/body/female-health.html'
                                }
                            ]
                        }
                    },
                    {
                        title: 'Hair and Nails',
                        content: {
                            links: [
                                {
                                    title: 'Hair Loss',
                                    url: '/hair-and-nails/hair-loss.html'
                                },
                                {
                                    title: 'Hair Removal',
                                    url: '/hair-and-nails/hair-removal.html'
                                },
                                {
                                    title: 'Hair Care',
                                    url: '/hair-and-nails/hair-care.html'
                                },
                                {
                                    title: 'Nail Care',
                                    url: '/hair-and-nails/nail-care.html'
                                }
                            ]
                        }
                    },
                    {
                        title: 'Health & Wellbeing',
                        content: {
                            links: [
                                {
                                    title: 'Body & Shape',
                                    url: '/shop-health/body-and-shape.html'
                                },
                                {
                                    title: 'Pain and Rehab',
                                    url: '/shop-health/pain-and-tension-relief.html'
                                },
                                {
                                    title: 'Health Technology',
                                    url: '/shop-health/health-technology.html'
                                },
                                {
                                    title: 'Sleep Essentials',
                                    url: '/shop-health/sleep-essentials.html'
                                }
                            ]
                        }
                    }
                ]
            }
        },
        /****************  
        All Brands
        ****************/
        {
            title: 'Brands A-Z',
            content: {
                lvl2: [
                    {
                        title: 'All Brands',
                        url: '/all-brands'
                    },
                    {
                        title: 'Clarisonic',
                        url: '/clarisonic'
                    },
                    {
                        title: 'Foreo',
                        url: '/foreo'
                    },
                    {
                        title: 'GloPro',
                        url: '/glopro'
                    },
                    {
                        title: 'HairMax',
                        url: '/hairmax'
                    },
                    {
                        title: 'iluminage',
                        url: '/iluminage'
                    },
                    {
                        title: 'NuFace',
                        url: '/nuface'
                    },
                    {
                        title: 'SmoothSkin',
                        url: '/smoothskin'
                    },
                    {
                        title: 'Tria',
                        url: '/tria'
                    },
                    {
                        title: 'Wellbox',
                        url: '/wellbox'
                    }
                ]
            }
        }
    ];


    var $nav = $('<ul class="nav-lvl1-wrap"></ul>');

    // Loop through level 1 list
    $.each(nav_item, function () {
        var $lvl1_link = $('<li class="uc68-Mainlink"><div class="ucwrapperlvl1 uc68_catnavlink"><span class="nav-title nav-lvl1">' + this.title + '</span><div class="uc68imgmain"></div></div></li>');

        if (this.content) {
            var content = this.content;

            if (content.lvl2) {
                var $lvl2 = $('<ul class="nav-lvl2-wrap"></ul>');


                // Loop through level 2 list
                $.each(content.lvl2, function () {
                    var $lvl2_link = $('<li class="uc68-level2link"><div class="ucwrapperlvl2"><span class="nav-title nav-lvl2 uc68-secondarylinks">' + this.title + '</span><div class="uc68imgmain midlinks"></div></div></li>');

                    if (this.content) {
                        if (this.content.products) {
                            var $products = $('<ul class="nav-links uc68secondlevelLinks bestsellers"></ul>');

                            // Loop through level 2 products
                            $.each(this.content.products, function () {
                                $([
                                    '<li class="nav-product">',
                                    '<a href="' + this.url + '">',
                                    '<img src="' + this.img + '"/>',
                                    '<div class="uc68_producttitle">' + this.title + '</div>',
                                    '<div class="uc68_prodprice">' + this.price + '</div>',
                                    '<a class="uc68-view" href="' + this.url + '">View Product</a>',
                                    '</a>',
                                    '</li>'
                                ].join('')).appendTo($products);
                            });

                            $lvl2_link.children('.ucwrapperlvl2').click(function (e) {
                                e.stopPropagation();
                                var $parentLi = $(this).parent('li');

                                if ($parentLi.hasClass('active')) {
                                    $parentLi.removeClass('active');
                                    $parentLi.find('.ucwrapperlvl2 .uc68imgmain').removeClass('active');
                                    $products.slideUp(500);
                                } else {
                                    $lvl1_link.find('.uc68-level2link.active')
                                        .removeClass('active')
                                        .find('.uc68secondlevelLinks')
                                        .slideUp();

                                    $lvl1_link.find('.uc68-level2link.active .ucwrapperlvl2 img').removeClass('active');
                                    $parentLi.addClass('active');
                                    $parentLi.find('.ucwrapperlvl2 .uc68imgmain').addClass('active');
                                    $products.slideDown(500);
                                }
                            });


                            $products.appendTo($lvl2_link);
                        }

                        if (this.content.links) {
                            var $links = $('<ul class="nav-links uc68secondlevelLinks"></ul>');

                            // Loop through level 2 links
                            $.each(this.content.links, function () {
                                $('<li><a href="' + this.url + '">' + this.title + '</a><img class="uc68-smallestarrow" src="//cdn.optimizely.com/img/3584273092/2b5899e8d0e145f7a40daaa480e13797.png"/></li>').appendTo($links);
                            });

                            $links.appendTo($lvl2_link);


                            $lvl2_link.children('.ucwrapperlvl2').click(function (e) {
                                e.stopPropagation();
                                var $parentLi = $(this).parent('li');

                                if ($parentLi.hasClass('active')) {
                                    $parentLi.removeClass('active');
                                    $parentLi.find('.ucwrapperlvl2 .uc68imgmain').removeClass('active');
                                    $links.slideUp(500);
                                } else {
                                    $lvl1_link.find('.uc68-level2link.active')
                                        .removeClass('active')
                                        .find('.uc68secondlevelLinks')
                                        .slideUp();

                                    $lvl1_link.find('.uc68-level2link.active .ucwrapperlvl2 .uc68imgmain').removeClass('active');
                                    $parentLi.addClass('active');
                                    $parentLi.find('.ucwrapperlvl2 .uc68imgmain').addClass('active');
                                    $links.slideDown(500);
                                }
                            });


                        }


                    } else if (this.url) {
                        $lvl2_link.contents().wrapAll('<a href="' + this.url + '"></a>');
                    }

                    $lvl2_link.appendTo($lvl2);


                });
                $lvl2.appendTo($lvl1_link);


                $lvl1_link.children('.ucwrapperlvl1').click(function (e) {
                    e.stopPropagation();
                    var $parentLi = $(this).parent('li');

                    if ($parentLi.hasClass('active')) {
                        $parentLi.removeClass('active');
                        $parentLi.find('.ucwrapperlvl1 .uc68imgmain').removeClass('active');
                        $lvl2.slideUp(500);
                    } else {
                        var $activeNavs = $nav.find('li.active');
                        $activeNavs.removeClass('active').find('.ucwrapperlvl1 .uc68imgmain').removeClass('active');
                        $activeNavs.find('.nav-lvl2-wrap').slideUp(500);
                        $parentLi.addClass('active');
                        $parentLi.find('.ucwrapperlvl1 .uc68imgmain').addClass('active');
                        $lvl2.slideDown(500);
                    }

                    /*--------------*/
                    $parentLi.find('.nav-lvl2-wrap .uc68-level2link:eq(3) .uc68secondlevelLinks').slideDown(500, function () {
                        $(this).closest('.uc68-level2link').addClass('active');
                        $(this).parent().find('.ucwrapperlvl2 .uc68imgmain').addClass('active');
                    });

                    /*--------------*/
                });
            }

        } else if (this.url) {
            $lvl1_link.contents().wrapAll('<a href="' + this.url + '"></a>');
        }
        $lvl1_link.appendTo($nav);

    });

    $nav.appendTo('.uc68-newnavlinks');

    $('.topheader .nav-container #nav').remove();

    //AMEND - for all
    var allBrandsMobile = $('.nav-lvl1-wrap .uc68-Mainlink:last'),
        topBrandsLink = allBrandsMobile.find('.nav-lvl2-wrap');
    
    $('.uc68-Mainlink:eq(4)').addClass('uc68-blog');
    allBrandsMobile.addClass('active');
    allBrandsMobile.find('.uc68imgmain').addClass('active');
    allBrandsMobile.find('.nav-lvl2-wrap').css({'display':'block'});
    topBrandsLink.find('.uc68-level2link:last .uc68secondlevelLinks').css({'display':'block'});
}