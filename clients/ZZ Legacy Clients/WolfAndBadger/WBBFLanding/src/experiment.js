import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import wbslider from './lib/wb-slider.js';

window.WBBFLanding = (function() {
    function run() {
        // --------------------------------------------------------
        // TEST TYPE: 'vip' or 'normal'
        // --------------------------------------------------------
        let _testType = 'normal';
        if(window.location.pathname.match(/black-friday-vip/)) {
            _testType = 'vip';
        }
        
        // --------------------------------------------------------
        // SETUP
        // --------------------------------------------------------
        utils.fullStory('WBBFLanding', 'Variation 1');

        document.body.classList.add('wbbfl');

        const content = $('#content');
        content.addClass('wbbfl-content');
        
        // --------------------------------------------------------
        // Confetti
        // --------------------------------------------------------
        if(_testType == 'vip') {
            $('#global > .container:first').wrap('<div class="wbbfl-container-wrap">');
            $('.wbbfl-container-wrap').append('<img class="wbbfl-confetti" src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/3cb7a0b9fe510f6547b0fa3c623552fe_1805_813.png">');
        }

        // --------------------------------------------------------
        // MAIN BANNER
        // --------------------------------------------------------
        if(_testType === 'vip') {
            content.append(`
                <div class="wbbfl-banner wbbfl-section">
                    <img class="wbbfl-hide-mobile" src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/3baca013a2093f55cf88a74e8f877df1_1169_487.jpeg" />
                    <img class="wbbfl-hide-desktop" src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/8b9e45557c4ee486a25cbeecc65da6ce_800_744.jpeg" />

                    <div class="wbbfl-banner__txt">
                        <span class="wbbfl-banner__txt1">
                            10% off everything with the code:
                        </span>
                        <span class="wbbfl-banner__txt2">
                            VIPBLACKFRIDAY
                        </span>
                    </div>
                </div>
            `);
        } else if(_testType === 'normal') {
            content.append(`
                <div class="wbbfl-banner wbbfl-section">
                    <img class="wbbfl-hide-mobile" src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/3baca013a2093f55cf88a74e8f877df1_1169_487.jpeg" />
                    <img class="wbbfl-hide-desktop" src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/8b9e45557c4ee486a25cbeecc65da6ce_800_744.jpeg" />

                    <div class="wbbfl-banner__txt">
                        <span class="wbbfl-banner__txt1">
                            10% off everything with the code:
                        </span>
                        <span class="wbbfl-banner__txt2">
                            BLACKFRIDAY17
                        </span>
                    </div>
                </div>
            `);
        }
        
        // --------------------------------------------------------
        // TEXT OVERVIEW
        // --------------------------------------------------------
        const vipText = `<p>Black Friday has come early for Wolf & Badger VIPs! Enjoy exclusive discounts from your favourite brands with up to 50% off, plus take an extra 10% off everything with the code <strong>VIPBLACKFRIDAY</strong></p> 
        <p>With over 500 independent designers on our website, there are thousands of curated and unique products for you to choose from. Whether you’re getting ahead on your Christmas shopping, or treating yourself to something new, now is the time to shop.</p>
        `;

        const normalText = `<p>Black Friday is here! For this weekend only enjoy exclusive discounts from your favourite brands with up to 50% off, plus take an extra 10% off everything with the code <strong>BLACKFRIDAY17</strong>

        <p>With over 500 independent designers on our website, there are thousands of curated and unique products for you to choose from. Whether you’re getting ahead on your Christmas shopping, or treating yourself to something new, now is the time to shop.</p>
        `;

        content.append(`
            <div class="wbbfl-overview wbbfl-section text-center wbbfl-max-width-700">
                ${_testType == 'vip' ? vipText : normalText}
            </div>
        `);

        // --------------------------------------------------------
        // Main Category Links
        // --------------------------------------------------------
        content.append(`
            <div class="wbbfl-catboxes wbbfl-section">
                <div class="row-fluid">
                    <div class="wbbfl-catbox span6">
                        <a href="/category/women/?onsale=true">
                            <div class="wbbfl-hide-mobile">
                                <div class="wbbfl-cat-under">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/0b6f580279bf4bf94252cc467a3cc0a3_558_570.jpeg" />
                                </div>
                                <div class="wbbfl-cat-over">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/74822acbc12b0c3f2d85d2006e21bad7_558_570.jpeg" />
                                </div>
                            </div>
                            <div class="wbbfl-hide-desktop">
                                <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/c9dade0eba26b902ccbc341b79edd4e9_800_595.jpeg" />
                            </div>
                            <span class="wbbfl-catbox__text">Women</span>
                        </a>
                    </div>
                    <div class="wbbfl-catbox span6">
                        <a href="/category/men/?onsale=true">
                            <div class="wbbfl-hide-mobile">
                                <div class="wbbfl-cat-under">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/7201fb02066a72f1d0f69d69aaad3eda_558_570.jpeg" />
                                </div>
                                <div class="wbbfl-cat-over">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/6967966751d454fcf49be7fe6b53d372_558_570.jpeg" />
                                </div>
                            </div>
                            <div class="wbbfl-hide-desktop">
                                <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/4cc0b98b36d9df686cca8da92aac9beb_800_595.jpeg" />
                            </div>
                            <span class="wbbfl-catbox__text">Men</span>
                        </a>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="wbbfl-catbox span6">
                        <a href="/category/homewares/?onsale=true">
                            <div class="wbbfl-hide-mobile">
                                <div class="wbbfl-cat-under">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/4fc2b3b33fcd11be42a61f2d1113f9e5_558_570.jpeg" />
                                </div>
                                <div class="wbbfl-cat-over">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/a182d41d6b8085c8cd76b71614bb15b7_558_570.jpeg" />
                                </div>
                            </div>
                            <div class="wbbfl-hide-desktop">
                                <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/7ca3a63d4b72729e4f0a7002514b218e_800_595.jpeg" />
                            </div>
                            <span class="wbbfl-catbox__text">Home</span>
                        </a>
                    </div>
                    <div class="wbbfl-catbox span6">
                        <a href="/category/kids/?onsale=true">
                            <div class="wbbfl-hide-mobile">
                                <div class="wbbfl-cat-under">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/db37d592a0c20bea996e289643aa5812_558_570.jpeg" />
                                </div>
                                <div class="wbbfl-cat-over">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/e96eee506def808f5f3a41602014417d_558_570.jpeg" />
                                </div>
                            </div>
                            <div class="wbbfl-hide-desktop">
                                <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/e82c24a3e647cebac7def6b6c8175ee0_800_595.jpeg" />
                            </div>
                            <span class="wbbfl-catbox__text">Kids</span>
                        </a>
                    </div>
                </div>
            </div>    
        `);
        
        // --------------------------------------------------------
        // Editors Picks
        // --------------------------------------------------------
        content.append(`
            <div class="wbbfl-editorspicks wbbfl-section">
                <div id="homepage-boxes"></div>
            </div>
        `);
        wbslider();

        // --------------------------------------------------------
        // Additional links
        // --------------------------------------------------------
        content.append(`
            <div class="wbbfl-extra-catboxes wbbfl-section">
                <div class="row-fluid">
                    <div class="wbbfl-catbox span12">
                        <a href="/category/women/jewellery/">
                            <div class="wbbfl-hide-mobile">
                                <div class="wbbfl-cat-under">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/9d55390e3c5b545fdbdb47683727bc2e_1169_261.jpeg" />
                                </div>
                                <div class="wbbfl-cat-over">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/892d05506b9b4e2d26e3d5c16614ddf8_1169_261.jpeg" />
                                </div>
                            </div>
                            <div class="wbbfl-hide-desktop">
                                <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/3efb84d2ae71cc3defaa16ba9581cae7_800_417.jpeg" />
                            </div>
                            <span class="wbbfl-catbox__text">Jewellery</span>
                        </a>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="wbbfl-catbox span12">
                        <a href="/category/women/clothing/new-designers/">
                            <div class="wbbfl-hide-mobile">
                                <div class="wbbfl-cat-under">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/e4dd496c09cb9df776173bbe7677b7a0_1169_261.jpeg" />
                                </div>
                                <div class="wbbfl-cat-over">
                                    <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/a90f9fda8ab277c14297d7b391b2e22c_1169_261.jpeg" />
                                </div>
                            </div>
                            <div class="wbbfl-hide-desktop">
                                <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4347/64c84c4e8e13bc91e1c2f544782ca57b_800_417.jpeg" />
                            </div>
                            <span class="wbbfl-catbox__text">New Designers</span>
                        </a>
                    </div>
                </div>
            </div>    
        `);
    }

    UC.poller([
        '#header',
        '#global .container #content',
        function() {
            return !!window.jQuery;
        }
    ], run);
})();
