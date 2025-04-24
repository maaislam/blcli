import * as UC from '../../../../../lib/uc-lib';
import * as utils from '../../../../../lib/utils';

/**
 * Amended from BI002
 */
const SocialButtons = {
    init() {
        // Don't do anything if new buttons still exist
        if (document.querySelector('.bi013_social')) return false;

        UC.poller(['.social-buttons'], function() {
            var socialLinks = document.getElementsByTagName('social-buttons')[0];

            var createSocialComponent = function() {
                var container = document.createElement('div');
                container.className = 'bi013_social';

                var socialContext = document.createElement('div');
                socialContext.className = 'bi013_social__context c-10 m-t-10 m-b-4 fs-12 fs-11-s fs-11-l m-r-0 col-pink';
                socialContext.innerHTML = `
                    Love what you see? <br>
                    Tell a friend, a colleague, tell everyone!
                `;

                var newSocialLinks = document.createElement('div');
                newSocialLinks.className = 'bi013_social__links';
                newSocialLinks.innerHTML = `
                    <social-buttons model="::product" factory-name="product" ng-if="!$root.isS &amp;&amp; !$root.isM"><div class="social-buttons"><ng-transclude></ng-transclude><!----><div ng-include="template"><!----><ul class="m-t-0 m-b fs-25 fs-20-s social-icons" ng-controller="SocialButtonsController" ng-if="factoryName == 'product'"><li class="inline-block m-r cursor-pointer social-icons__item" ng-click="share('facebook')"><span class="icon icon--facebook"></span></li><!----><li class="inline-block m-r cursor-pointer social-icons__item" ng-if="factoryName == 'product'" ng-click="share('twitter')"><span class="icon icon--twitter"></span></li><!----><!----><li class="inline-block m-r cursor-pointer social-icons__item" ng-if="factoryName == 'product'" ng-click="share('pinterest')"><span class="icon icon--pinterest"></span></li><!----><!----><li class="inline-block m-r cursor-pointer social-icons__item" ng-if="factoryName == 'product'" ng-click="shareByEmail()"><span class="icon icon--mail"></span></li><!----></ul><!----><!----></div></div></social-buttons>
                `;

                // Events
                var newSocialIcons = newSocialLinks.querySelectorAll('.social-icons__item');
                var oldSocialIcons = socialLinks.querySelectorAll('.social-icons__item');
                
                for (var i = 0; i < newSocialIcons.length; i++) {
                    (function(newIcon, oldIcon) {
                        utils.addEvent(newIcon, 'click', function() {
                            utils.eventFire(oldIcon, 'click');
                        });
                    }(newSocialIcons[i], oldSocialIcons[i]));
                }

                container.appendChild(socialContext);
                container.appendChild(newSocialLinks);

                return container;
            };

            var productImgs = document.querySelector('#product-carousel').parentElement.parentElement;
            var productContainer = productImgs.parentElement;
            productContainer.className += ' bi013_product';
            productContainer.appendChild(createSocialComponent());
        });
    }
};

export default SocialButtons;
