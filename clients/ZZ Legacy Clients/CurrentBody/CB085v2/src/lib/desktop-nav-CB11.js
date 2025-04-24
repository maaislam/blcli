import * as UC from '../../../../../lib/uc-lib';
import * as utils from '../../../../../lib/utils';

export default function desktopNav() {
    var $ = window.jQuery;

    /*FACIAL CLEANSING*/
    var bestSellersFaciallink1 = $('.menu_a_1').attr('data-link'),
        bestSellersFacialimage1 = $('.menu_a_1').attr('data-img'),
        bestSellersFacialname1 = $('.menu_a_1').attr('data-name'),
        bestSellersFacialprice1,

        bestSellersFaciallink2 = $('.menu_a_2').attr('data-link'),
        bestSellersFacialimage2 = $('.menu_a_2').attr('data-img'),
        bestSellersFacialname2 = $('.menu_a_2').attr('data-name'),
        bestSellersFacialprice2,

        bestSellersFaciallink3 = $('.menu_a_3').attr('data-link'),
        bestSellersFacialimage3 = $('.menu_a_3').attr('data-img'),
        bestSellersFacialname3 = $('.menu_a_3').attr('data-name'),
        bestSellersFacialprice3,

        /*HAIR REMOVAL*/
        bestSellersHairRemovalink1 = $('.menu_b_1').attr('data-link'),
        bestSellersHairRemovalimage1 = $('.menu_b_1').attr('data-img'),
        bestSellersHairRemovalname1 = $('.menu_b_1').attr('data-name'),
        bestSellersHairRemovalprice1,

        bestSellersHairRemovalink2 = $('.menu_b_2').attr('data-link'),
        bestSellersHairRemovalimage2 = $('.menu_b_2').attr('data-img'),
        bestSellersHairRemovalname2 = $('.menu_b_2').attr('data-name'),
        bestSellersHairRemovalprice2,

        bestSellersHairRemovalink3 = $('.menu_b_3').attr('data-link'),
        bestSellersHairRemovalimage3 = $('.menu_b_3').attr('data-img'),
        bestSellersHairRemovalname3 = $('.menu_b_3').attr('data-name'),
        bestSellersHairRemovalprice3,

        /*AGEING*/

        bestSellersAgeinglink1 = $('.menu_c_1').attr('data-link'),
        bestSellersAgeingimage1 = $('.menu_c_1').attr('data-img'),
        bestSellersAgeingname1 = $('.menu_c_1').attr('data-name'),
        bestSellersAgeingprice1,

        bestSellersAgeinglink2 = $('.menu_c_2').attr('data-link'),
        bestSellersAgeingimage2 = $('.menu_c_2').attr('data-img'),
        bestSellersAgeingname2 = $('.menu_c_2').attr('data-name'),
        bestSellersAgeingprice2,

        bestSellersAgeinglink3 = $('.menu_c_3').attr('data-link'),
        bestSellersAgeingimage3 = $('.menu_c_3').attr('data-img'),
        bestSellersAgeingname3 = $('.menu_c_3').attr('data-name'),
        bestSellersAgeingprice3,

        /*ACNE*/

        bestSellersAcnelink1 = $('.menu_d_1').attr('data-link'),
        bestSellersAcneimage1 = $('.menu_d_1').attr('data-img'),
        bestSellersAcnename1 = $('.menu_d_1').attr('data-name'),
        bestSellersAcneprice1,

        bestSellersAcnelink2 = $('.menu_d_2').attr('data-link'),
        bestSellersAcneimage2 = $('.menu_d_2').attr('data-img'),
        bestSellersAcnename2 = $('.menu_d_2').attr('data-name'),
        bestSellersAcneprice2,

        bestSellersAcnelink3 = $('.menu_d_3').attr('data-link'),
        bestSellersAcneimage3 = $('.menu_d_3').attr('data-img'),
        bestSellersAcnename3 = $('.menu_d_3').attr('data-name'),
        bestSellersAcneprice3;





    var country = $('.links.list-inline .block-content .sb.selectbox .display .text span');
    var currency;

    if ($(country).hasClass('eur')) {
        currency = '€';
        bestSellersFacialprice1 = $('.menu_a_1').attr('data-price-eu'),
            bestSellersFacialprice2 = $('.menu_a_2').attr('data-price-eu'),
            bestSellersFacialprice3 = $('.menu_a_3').attr('data-price-eu'),
            bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price-eu'),
            bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price-eu'),
            bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price-eu'),
            bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price-eu'),
            bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price-eu'),
            bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price-eu'),
            bestSellersAcneprice1 = $('.menu_d_1').attr('data-price-eu'),
            bestSellersAcneprice2 = $('.menu_d_2').attr('data-price-eu'),
            bestSellersAcneprice3 = $('.menu_d_3').attr('data-price-eu');
    } else if ($(country).hasClass('gbp')) {
        currency = '£';
        bestSellersFacialprice1 = $('.menu_a_1').attr('data-price'),
            bestSellersFacialprice2 = $('.menu_a_2').attr('data-price'),
            bestSellersFacialprice3 = $('.menu_a_3').attr('data-price'),
            bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price'),
            bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price'),
            bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price'),
            bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price'),
            bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price'),
            bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price'),
            bestSellersAcneprice1 = $('.menu_d_1').attr('data-price'),
            bestSellersAcneprice2 = $('.menu_d_2').attr('data-price'),
            bestSellersAcneprice3 = $('.menu_d_3').attr('data-price');
    } else if ($(country).hasClass('usd')) {
        currency = '$';
        bestSellersFacialprice1 = $('.menu_a_1').attr('data-price-us'),
            bestSellersFacialprice2 = $('.menu_a_2').attr('data-price-us'),
            bestSellersFacialprice3 = $('.menu_a_3').attr('data-price-us'),
            bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price-us'),
            bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price-us'),
            bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price-us'),
            bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price-us'),
            bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price-us'),
            bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price-us'),
            bestSellersAcneprice1 = $('.menu_d_1').attr('data-price-us'),
            bestSellersAcneprice2 = $('.menu_d_2').attr('data-price-us'),
            bestSellersAcneprice3 = $('.menu_d_3').attr('data-price-us');
    } else if ($(country).hasClass('aud')) {
        currency = '$';
        bestSellersFacialprice1 = $('.menu_a_1').attr('data-price-aus'),
            bestSellersFacialprice2 = $('.menu_a_2').attr('data-price-aus'),
            bestSellersFacialprice3 = $('.menu_a_3').attr('data-price-aus'),
            bestSellersHairRemovalprice1 = $('.menu_b_1').attr('data-price-aus'),
            bestSellersHairRemovalprice2 = $('.menu_b_2').attr('data-price-aus'),
            bestSellersHairRemovalprice3 = $('.menu_b_3').attr('data-price-aus'),
            bestSellersAgeingprice1 = $('.menu_c_1').attr('data-price-aus'),
            bestSellersAgeingprice2 = $('.menu_c_2').attr('data-price-aus'),
            bestSellersAgeingprice3 = $('.menu_c_3').attr('data-price-aus'),
            bestSellersAcneprice1 = $('.menu_d_1').attr('data-price-aus'),
            bestSellersAcneprice2 = $('.menu_d_2').attr('data-price-aus'),
            bestSellersAcneprice3 = $('.menu_d_3').attr('data-price-aus');
    }



    var cbnewnav = $([
        '<div class="uc-newnav-wrapfullwidth">',
        '<div class="container-fluid">',
        '<div class="uc-newnav-bar container">',
        '<ul class="uc-newnavlinks">',
        '</ul>',
        '</div>',
        '</div>',
        '</div>'
    ].join(''));

    var categories = {

        'Facial Cleansing': {
            'Top Brands': [
                '<div class="ucfacial brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/clarisonic">Clarisonic</a></li>',
                '<li><a href="/foreo">FOREO</a></li>',
                '<li><a href="/panasonic">Panasonic</a></li>',
                '<li><a href="/pmd">PMD</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'By Category': [
                '<div class="ucfacial cat">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/face/skin-cleansers.html">Facial Cleansers</a></li>',
                '<li><a href="/face/skin-cleansers.html">Body</a></li>',
                '<li><a href="/face/skin-cleansers.html">For Men</a></li>',
                '<li><a href="/face/skin-cleansers/accessories.html">Accessories</a></li>',
                '<li><a href="/body/exfoliation-and-skin-care.html">Gels & Creams</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'By Concern': [
                '<div class="ucfacial con">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/face/skin-cleansers.html">Pores/Blackheads</a></li>',
                '<li><a href="/face/skin-cleansers.html">Pigmentation</a></li>',
                '<li><a href="/face/skin-cleansers.html">Lines/Wrinkles</a></li>',
                '<li><a href="/face/skin-cleansers.html">Oily Skin</a></li>',
                '<li><a href="/face/skin-cleansers.html">Dull Skin</a></li>',
                '</ul>',
                '</div>'
            ].join(''),



            '': [
                '<div class="ucfacial bestseller">',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersFaciallink1 + '">',
                '<img src="' + bestSellersFacialimage1 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersFacialname1,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersFacialprice1,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersFaciallink1 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersFaciallink2 + '">',
                '<img src="' + bestSellersFacialimage2 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersFacialname2,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersFacialprice2,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersFaciallink2 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersFaciallink3 + '">',
                '<img src="' + bestSellersFacialimage3 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersFacialname3,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersFacialprice3,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersFaciallink3 + '">View Product</a>',
                '</a>',
                '</div>',
                '</div>'
            ].join(''),

            '#YourCurrentBody': [
                '<div class="ucfacial article">',
                '<div class="uc-article">',
                '7 Things You Didn’t Know About Your Clarisonic',
                '<a href="/blog/7-things-didnt-know-clarisonic/">Read More</a>',
                '</div>',
                '<div class="uc-article">',
                'Can Teenagers Use a Clarisonic?',
                '<a href="/blog/can-teenagers-use-the-clarisonic/">Read More</a>',
                '</div>',
                '<div class="uc-article">',
                'Myth or Reality? Clarisonic Purging Period',
                '<a href="/blog/myth-or-reality-the-clarisonic-purging-period/">Read More</a>',
                '</div>',
                '</div>'
            ].join(''),
        },

        'Hair Removal': {

            'Top Brands': [
                '<div class="uchair brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/tria">Tria</a></li>',
                '<li><a href="/iluminage">Iluminage</a></li>',
                '<li><a href="/smoothskin">SmoothSkin</a></li>',
                '<li><a href="/philips">Philips</a></li>',
                '<li><a href="/silk_n">Silk\'n</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'By Category': [
                '<div class="uchair cat">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/hair-and-nails/hair-removal/permanent-hair-removal.html">Permanent Hair Removal</a></li>',
                '<li><a href="/hair-and-nails/hair-removal.html">IPL & Laser</a></li>',
                '<li><a href="/hair-and-nails/hair-removal/men-s.html">For Men</a></li>',
                '<li><a href="/hair-and-nails/hair-removal/epilators.html">Epilators</a></li>',
                '<li><a href="/hair-and-nails/hair-removal/ladyshaves-trimmers.html">Lady Shavers & Trimmers</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'By Concern': [
                '<div class="uchair con">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/hair-and-nails/unwanted-hair-removed.html">Unwanted Facial Hair</a></li>',
                '<li><a href="/hair-and-nails/unwanted-hair-removed.html">Unwanted Bikini Line Hair</a></li>',
                '<li><a href="/hair-and-nails/unwanted-hair-removed.html">Unwanted Body Hair</a></li>',
                '<li><a href="/hair-and-nails/unwanted-hair-removed.html">Light Body Hair</a></li>',
                '<li><a href="/hair-and-nails/unwanted-hair-removed.html">Darker Skin</a></li>',
                '</ul>',
                '</div>'
            ].join(''),


            '': [
                '<div class="uchair bestseller">',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersHairRemovalink1 + '">',
                '<img src="' + bestSellersHairRemovalimage1 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersHairRemovalname1,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersHairRemovalprice1,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersHairRemovalink1 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersHairRemovalink2 + '">',
                '<img src="' + bestSellersHairRemovalimage2 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersHairRemovalname2,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersHairRemovalprice2,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersHairRemovalink2 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersHairRemovalink3 + '">',
                '<img src="' + bestSellersHairRemovalimage3 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersHairRemovalname3,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersHairRemovalprice3,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersHairRemovalink3 + '">View Product</a>',
                '</a>',
                '</div>',

                '</div>'
            ].join(''),
            '#YourCurrentBody': [
                '<div class="ucfacial article">',
                '<div class="uc-article">',
                '5 Reasons You Should Try IPL',
                '<a href="/blog/5-reasons-try-ipl/">Read More</a>',
                '</div>',
                '<div class="uc-article">',
                '6 Ways to Zap Away Unwanted Facial Hair',
                '<a href="/blog/six-ways-to-zap-unwanted-facial-hair/">Read More</a>',
                '</div>',
                '<div class="uc-article">',
                'Before & After: iluminage Precise Touch',
                '<a href="/blog/before-after-hair-removal-iluminage-precise-touch/">Read More</a>',
                '</div>',

                '</div>'
            ].join(''),
        },
        'Anti-Ageing': {
            'Top Brands': [
                '<div class="ucage brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/nuface">NuFACE</a></li>',
                '<li><a href="/wellbox">Wellbox</a></li>',
                '<li><a href="/glopro">GloPRO</a></li>',
                '<li><a href="/tria">Tria</a></li>',
                '<li><a href="/iluminage">Iluminage</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'By Category': [
                '<div class="ucage cat">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/face/anti-aging.html">Face</a></li>',
                '<li><a href="/face/anti-aging.html">Eyes</a></li>',
                '<li><a href="/face/anti-aging.html">Neck & Body</a></li>',
                '<li><a href="/face/anti-aging/accessories.html">Accessories</a></li>',
                '<li><a href="/face/anti-aging/accessories.html">Gels & Creams</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'By Concern': [
                '<div class="ucage con">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/face/anti-aging.html">Eye Area/Crow\'s Feet</a></li>',
                '<li><a href="/face/anti-aging.html">Fine Lines/Wrinkles</a></li>',
                '<li><a href="/face/anti-aging.html">Sagging Neck</a></li>',
                '<li><a href="/face/anti-aging.html">Untoned Skin</a></li>',

                '</ul>',
                '</div>'
            ].join(''),



            '': [
                '<div class="uchair bestseller">',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersAgeinglink1 + '">',
                '<img src="' + bestSellersAgeingimage1 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersAgeingname1,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersAgeingprice1,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersAgeinglink1 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersAgeinglink2 + '">',
                '<img src="' + bestSellersAgeingimage2 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersAgeingname2,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersAgeingprice2,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersAgeinglink2 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersAgeinglink3 + '">',
                '<img src="' + bestSellersAgeingimage3 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersAgeingname3,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersAgeingprice3,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersAgeinglink3 + '">View Product</a>',
                '</a>',
                '</div>',
                '</div>'
            ].join(''),
            '#YourCurrentBody': [
                '<div class="ucfacial article">',
                '<div class="uc-article">',
                '7 Ways to Get Rid of Wrinkles',
                '<a href="/blog/7-ways-to-get-rid-of-wrinkles/">Read More</a>',
                '</div>',
                '<div class="uc-article">',
                'Before & After: NuFACE Trinity',
                '<a href="/blog/nuface-customer-review/">Read More</a>',
                '</div>',
                '</div>'
            ].join(''),
        },
        'Skincare': {
            'Top Brands': [
                '<div class="ucage brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/baby_quasar">Baby Quasar</a></li>',
                '<li><a href="/clarisonic">Clarisonic</a></li>',
                '<li><a href="/pmd">PMD</a></li>',
                '<li><a href="/lustre">Lustre</a></li>',
                '<li><a href="/me_power">mē</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'By Category': [
                '<div class="ucage cat">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/face/acne-spot-removal.html">Anti-Acne</a></li>',
                '<li><a href="/face/acne-spot-removal.html">Spot Removal</a></li>',
                '<li><a href="/face/acne-spot-removal.html">For Men</a></li>',
                '<li><a href="/face/acne-spot-removal/accessories.html">Accessories</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'By Concern': [
                '<div class="ucage con">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/face/acne-spot-removal.html">Mild Acne</a></li>',
                '<li><a href="/face/acne-spot-removal.html">Moderate Acne</a></li>',
                '<li><a href="/face/acne-spot-removal.html">Blemishes</a></li>',
                '<li><a href="/face/acne-spot-removal.html">Body Acne</a></li>',
                '</ul>',
                '</div>'
            ].join(''),



            '': [
                '<div class="uchair bestseller">',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersAcnelink1 + '">',
                '<img src="' + bestSellersAcneimage1 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersAcnename1,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersAcneprice1,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersAcnelink1 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersAcnelink2 + '">',
                '<img src="' + bestSellersAcneimage2 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersAcnename2,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersAcneprice2,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersAcnelink2 + '">View Product</a>',
                '</a>',
                '</div>',
                '<div class="ucbestselling-wrap">',
                '<a class="ucbestsellinglink" href="' + bestSellersAcnelink3 + '">',
                '<img src="' + bestSellersAcneimage3 + '"/>',
                '<div id ="wrapper" class="ucbestselling-producttitle">',
                bestSellersAcnename3,
                '</div>',
                '<div class="ucbestselling-productprice">',
                'Now: ' + currency + bestSellersAcneprice3,
                '</div>',
                '<a class="ucbestselling-button" href="' + bestSellersAcnelink3 + '">View Product</a>',
                '</a>',
                '</div>',
                '</div>'
            ].join(''),
            '#YourCurrentBody': [
                '<div class="ucfacial article">',
                '<div class="uc-article">',
                'Home Use vs. Salon Microdermabrasion',
                '<a href="/blog/home-use-vs-salon-microdermabrasion/">Read More</a>',
                '</div>',
                '</div>'
            ].join(''),
        },

        //changed to christmas
        '<a class="ucsale" href="/sale"> </a>': {
            'By Category': [
                '<div class="ucbrand cat">',
                '</div>'
            ].join(''),

            'By Concern': [
                '<div class="ucbrand con">',
                '</div>'
            ].join(''),

            'Top Brands': [
                '<div class="ucbrand brands">',
                '</div>'
            ].join(''),

            '': [
                '<div class="ucbrand bestseller">',
                '</div>'
            ].join('')
        },
        'All Beauty Devices': {
            'Face': [
                '<div class="ucbrand cat">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/face/exfoliators-and-microdermabrasion.html">Facial Exfoliation</a></li>',
                '<li><a href="/face/teeth-whitening.html">Teeth Whitening</a></li>',
                '<li><a href="/face/teeth-cleaning.html">Teeth Cleaning</a></li>',
                '<li><a href="/face/facial-toning.html">Facial Toning</a></li>',
                '<li><a href="/face/acne-spot-removal.html">Acne</a></li>',
                '<li><a href="/face/skin-cleansers.html">Facial Cleansing</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'Body': [
                '<div class="ucbrand con">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/body/toning-and-sculpting.html">Toning and Sculpting</a></li>',
                '<li><a href="/body/exfoliation-and-skin-care.html">Body Exfoliation</a></li>',
                '<li><a href="/body/foot-care.html">Footcare</a></li>',
                '<li><a href="/body/female-health.html">Female Health</a></li>',
                '<li><a href="/body/toned-body.html">Toned Body</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'Hair & Nails': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/hair-and-nails/hair-loss.html">Hair Loss</a></li>',
                '<li><a href="/hair-and-nails/hair-removal.html">Hair Removal</a></li>',
                '<li><a href="/hair-and-nails/hair-care.html">Hair Care</a></li>',
                '<li><a href="/hair-and-nails/nail-care.html">Nail Care</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'Health & Wellbeing': [
                '<div class="ucbrand bestseller">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/shop-health/body-and-shape.html">Body & Shape</a></li>',
                '<li><a href="/shop-health/pain-and-tension-relief.html">Pain and Rehab</a></li>',
                '<li><a href="/shop-health/health-technology.html">Health Technology</a></li>',
                '<li><a href="/shop-health/sleep-essentials.html">Sleep Essentials</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'Outlet': [
                '<div class="ucbrand bestseller">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/outlet">Face</a></li>',
                '<li><a href="/outlet">Body</a></li>',
                '<li><a href="/outlet">Hair & Nails</a></li>',
                '<li><a href="/outlet">Teeth</a></li>',
                '<li><a href="/outlet">Health & Wellbeing</a></li>',
                '</ul>',
                '</div>'
            ].join(''),


        },

        '': {
            'By Category': [
                '<div class="ucbrand cat">',
                '</div>'
            ].join(''),

            'By Concern': [
                '<div class="ucbrand con">',
                '</div>'
            ].join(''),

            'Top Brands': [
                '<div class="ucbrand brands">',
                '</div>'
            ].join(''),

            '': [
                '<div class="ucbrand bestseller">',
                '</div>'
            ].join('')
        },
        'Brands A-Z': {
            'A': [
                '<div class="ucbrand cat">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/alpha_stim">Alpha Stim</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'B': [
                '<div class="ucbrand cat">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/bellecore">BelleCore</a></li>',
                '<li><a href="/beurer">Beurer</a></li>',
                '<li><a href="/bkr">Bkr</a></li>',
                '<li><a href="/braun">Braun</a></li>',
                '<li><a href="/baby_quasar">Baby Quasar</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'C': [
                '<div class="ucbrand con">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/caci">CACI</a></li>',
                '<li><a href="/clarisonic">Clarisonic</a></li>',
                '<li><a href="/crystal_clear">Crystal Clear</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'E': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/elegant_touch">Elegant Touch</a></li>',
                '<li><a href="/elvie-personal-trainer.html">Elvie</a></li>',
                '<li><a href="/eylure">Eylure</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'F': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/foreo">FOREO</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'G': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/globus">Globus</a></li>',
                '<li><a href="/glopro">GloPRO</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'H': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/hairmax">HairMax</a></li>',
                '<li><a href="/homedics">Homedics</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'I': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/igrow">iGrow</a></li>',
                '<li><a href="/iluminage">iluminage</a></li>',
                '<li><a href="/instyler">InStyler</a></li>',
                '<li><a href="/intimina">INTIMINA</a></li>',
                '<li><a href="/iwhite">iWhite</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'L': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/l_a_b_life_beauty">L(A)B</a></li>',
                '<li><a href="/lightstim">LightStim</a></li>',
                '<li><a href="/love_my_skin">Love My Skin</a></li>',
                '<li><a href="/luster_premium_white">Luster Premium White</a></li>',
                '<li><a href="/lustre">Lustre Pro</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'M': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/magnitone">Magnitone</a></li>',
                '<li><a href="/me_power">mē</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'N': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/neurotech">Neurotech</a></li>',
                '<li><a href="/newa">NEWA</a>',
                '<li><a href="/nuface">NuFACE</a></li>',
                '<li><a href="/oxyjet_nora_bode">NoraBode</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'P': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/painmaster">PainMaster</a></li>',
                '<li><a href="/philips">Philips</a></li>',
                '<li><a href="/pmd">PMD</a></li>',
                '<li><a href="/prai_beauty">PRAI Beauty</a></li>',
                '<li><a href="/pulsaderm">Pulsaderm</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'R': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/red_carpet_manicure">Red Carpet Manicure</a></li>',
                '<li><a href="/remington">Remington</a></li>',
                '<li><a href="/riiviva">Riiviva</a></li>',
                '<li><a href="/rio">Rio</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'S': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                "<li><a href='/sensica'>Sensica</a></li>",
                "<li><a href='/silk_n'>Silk'n</a></li>",
                '<li><a href="/slendertone">Slendertone</a></li>',
                '<li><a href="/smoothskin">SmoothSkin</a></li>',
                '<li><a href="/sqoom">Sqoom</a></li>',
                '</ul>',
                '</div>'
            ].join(''),
            'T': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/t3">T3</a></li>',
                "<li><a href='/talika'>Talika</a></li>",
                '<li><a href="/tenscare">TensCare</a></li>',
                '<li><a href="/theradome">Theradome</a></li>',
                '<li><a href="/tria">Tria</a></li>',
                '<li><a href="/tripollar">TriPollar</a></li>',
                '<li><a href="/tweezerman">Tweezerman</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

            'V': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/valkee">Valkee</a></li>',
                "<li><a href='/joylux'>vSculpt</a></li>",
                '</ul>',
            ].join(''),
            'W': [
                '<div class="ucbrand brands">',
                '<ul class="ucsmalllinks">',
                '<li><a href="/waterpik">Waterpik</a></li>',
                '<li><a href="/wellbox">Wellbox</a></li>',
                '</ul>',
                '</div>'
            ].join(''),

        },
    };

    var $navContainer = cbnewnav.find('.uc-newnavlinks');
    var isTouchDevice = ('ontouchstart' in window ||  (navigator && navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0));
    var closeNavEvents = [];
    function closeAllNavs() {
        $.each(closeNavEvents, function() {
            this();
        });
    }

    var links = {
        'Facial Cleansing': '/face/skin-cleansers.html',
        'Hair Removal': '/hair-and-nails/hair-removal/permanent-hair-removal.html',
        'Anti-Ageing': '/face/anti-aging.html',
        'Acne': '/face/acne-spot-removal.html',
        'Brands A-Z': '/all-brands'
    };

    $.each(categories, function (categoryName) {
        var link = links[categoryName];
        var $linkHtml = $([
            '<li class="ucnavlink">',
            '<a href="' + (link ? link : 'javascript:void(0)') + '" class="uclinkname">' + categoryName + '</a>',
            '<img class="ucarrow" src="https://www.sitegainer.com/fu/up/ln7jt4rkt8g43gi.png"/>',
            '<div class="ucnavContent">',
            '</div>',
            '</li>'
        ].join(''));

        $.each(this, function (columnName) {
            var columnHTML = $([
                '<div class="ucnavblock">',
                '<h2 class="ucdroptitle">',
                columnName,
                '</h2>',
                this,
                '</div>'
            ].join(''));
            columnHTML.appendTo($linkHtml.find('.ucnavContent'));
        });


        // Open/Close events
        function openNav() {
            $linkHtml.addClass('active');
            $linkHtml.find('.ucnavContent').addClass('visible');
            $('.ucnavlink.active .ucarrow').attr('src', 'https://www.sitegainer.com/fu/up/x783iyioq5m4rg9.png');
        }

        function closeNav() {
            $linkHtml.find('.ucnavContent').removeClass('visible');
            $linkHtml.removeClass('active');
            $('.ucnavlink .ucarrow').attr('src', 'https://www.sitegainer.com/fu/up/ln7jt4rkt8g43gi.png');
        }

        // Push closeNav function to array so we can close them all at once
        closeNavEvents.push(closeNav);

        // Touch events
        if (isTouchDevice) {
            // Open/Close nav on click for touch devices
            $linkHtml.on('touchstart', function() {
                var $el = $(this);
                $el.off('mouseenter');
                $el.off('mouseleave');

                if ($el.hasClass('active')) {
                    closeAllNavs();
                } else {
                    closeAllNavs();
					openNav();
                }
            });

            $linkHtml.children('a').on('click touchstart', function(e) {
                e.preventDefault();
            });
        }
        
        // Hover events
        $linkHtml.mouseenter(function () {
            closeAllNavs();
            openNav();
        }).mouseleave(function () {
            closeAllNavs();
        });

        $linkHtml.appendTo($navContainer);
    });


    $('.fullwidth:first').hide().before(cbnewnav);

    /* 
     * On blog page there's a script on the site that
     * duplicates everything in the header. Set a poller
     * and wait for the duplicate to exist then remove it
     */
    UC.poller([
        function() {
            return $('.uc-newnav-wrapfullwidth').length > 1;
        }
    ], function() {
        $('.uc-newnav-wrapfullwidth:first').remove();
        //$('.CB85-bottomrow:first').remove();
    }, {
        timeout: 1000,
        wait: 25,
        multiplier: 1
    });

    /*other elements */
    if ($('.sb.selectbox div.text > span.gbp').length < 1) {
        $(".ucbestselling-productprice").css("visibility", "hidden");
    }

    /*titles*/
    $(['<div class="uc-toprow facial">',
        '<h2 class="uc-box-title">Facial Cleansing',
        '<a href="/face/skin-cleansers.html">View All  ></a></h2>',
        '<h2 class="uc-bestselling-title">Best Sellers</h2>',
        '</div>'
    ].join('')).prependTo('.uc-newnav-wrapfullwidth:last .ucnavContent:eq(0)');

    $(['<div class="uc-toprow hair">',
        '<h2 class="uc-box-title">Hair Removal',
        '<a href="/hair-and-nails/hair-removal.html">View All  ></a></h2>',
        '<h2 class="uc-bestselling-title">Best Sellers</h2>',
        '</div>'
    ].join('')).prependTo('.uc-newnav-wrapfullwidth:last .ucnavContent:eq(1)');

    $(['<div class="uc-toprow age">',
        '<h2 class="uc-box-title">Anti-Ageing',
        '<a href="/face/anti-aging.html">View All  ></a></h2>',
        '<h2 class="uc-bestselling-title">Best Sellers</h2>',
        '</div>'
    ].join('')).prependTo('.uc-newnav-wrapfullwidth:last .ucnavContent:eq(2)');

    $(['<div class="uc-toprow acne">',
        '<h2 class="uc-box-title">Skincare',
        '<a href="/face/acne-spot-removal.html">View All  ></a></h2>',
        '<h2 class="uc-bestselling-title">Best Sellers</h2>',
        '</div>'
    ].join('')).prependTo('.uc-newnav-wrapfullwidth:last .ucnavContent:eq(3)');

    $(['<div class="uc-toprow acne">',
        '<h2 class="uc-box-title">Brands A-Z',
        '</div>'
    ].join('')).prependTo('.uc-newnav-wrapfullwidth:last .ucnavContent:eq(7)');

    $(['<div class="uc-toprow hair">',
        '<h2 class="uc-box-title">All Beauty Devices',
        '</div>'
    ].join('')).prependTo('.uc-newnav-wrapfullwidth:last .ucnavContent:eq(5)');

    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(0) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(0) .ucnavblock:eq(3)').css({
        'width': '46%',
        'padding-right': '0'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(0) .ucnavblock:eq(4)').addClass('ucarticlesection');

    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(1) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(1) .ucnavblock:eq(3)').css({
        'width': '46%',
        'padding-right': '0'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(1) .ucnavblock:eq(4)').addClass('ucarticlesection');

    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(2) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(2) .ucnavblock:eq(3)').css({
        'width': '46%',
        'padding-right': '0'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(2) .ucnavblock:eq(4)').addClass('ucarticlesection');

    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(3) .ucnavblock:eq(3) .ucdroptitle').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(3) .ucnavblock:eq(3)').css({
        'width': '46%',
        'padding-right': '0'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(3) .ucnavblock:eq(4)').addClass('ucarticlesection');

    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(7)').addClass('ucbrands');
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(7) .ucnavblock').css({
        'width': '11% !important'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(4) .uc-box-title').css({
        'width': '100%'
    });

    //$('.ucnavlink:eq(6) .ucnavblock:eq(4) .ucdroptitle').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(5) .ucnavblock:eq(4)').css({
        'width': '18%'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(5) .ucnavblock:eq(4)').css({
        'border': 'none'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(5) .ucnavblock:eq(4)').css({
        'margin-top': '0px'
    });
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(5) .uc-box-title').css({
        'width': '100%'
    });



    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(4) .ucarrow').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(4) .ucnavContent').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(6) .ucarrow').remove();
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(6) .ucnavContent').remove();

    $('<a href="#"></a>').prependTo('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(5)');

    $('.uc-newnav-wrapfullwidth:last > div > div > ul > li:nth-child(7)').hide();

    $('<a class="ucallbrandslink" href="/all-brands">View All Brands ></a>').appendTo('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(6) .ucnavContent');

    $('<img class="ucarticlelogo" src="https://www.sitegainer.com/fu/up/ck4tasnwg1g1zil.png"/>').insertBefore('.uc-newnav-wrapfullwidth:last .ucarticlesection .ucdroptitle');
    var $fadeBg = $('<div class="ucnewnavempty"></div>');

    //Adds the fade background

    var backgroundTimer;
    $('.uc-newnav-wrapfullwidth:last .uc-newnavlinks').mouseenter(function () {
        var that = this;
        backgroundTimer = setTimeout(function () {
            $fadeBg.addClass('ucnewnav_forceShow');
        }, 500);
    }).mouseleave(function () {
        $fadeBg.removeClass('ucnewnav_forceShow');
        clearTimeout(backgroundTimer);
    });

    $fadeBg.prependTo('body');
    $('.uc-newnav-wrapfullwidth:last .ucnavlink:eq(4)').addClass('ucoutlet');
    $('div.uc-newnav-wrapfullwidth:last > div > div > ul > li.ucnavlink.ucoutlet').insertAfter('div.uc-newnav-wrapfullwidth:last > div > div > ul > li.ucnavlink.ucbrands');


    const saleLink = $('.uc-newnav-wrapfullwidth:last .ucnavlink.ucoutlet');
    saleLink.addClass('CB85-blog');
    saleLink.html('<span class="uclinkname">Editorial</span><a href="/blog"/>');
}
