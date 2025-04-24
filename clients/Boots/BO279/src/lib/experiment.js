/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

const startExperiment = () => {

  let toBeAdded = "hair-makeup";

  if(VARIATION == 1) {
    toBeAdded = "hair";
  } else if(VARIATION == 2) {
    toBeAdded = "makeup";
  }

  pollerLite(['.departmentMenuListItem'], () => {


    if (toBeAdded == "hair" || toBeAdded == "hair-makeup") {

      let clonedHairElement = document.querySelector('.departmentMenuListItem').cloneNode(true);
      let clonedHairElementLink = clonedHairElement.querySelector('.departmentLinkItem');
      let clonedHairElementSubmenu = clonedHairElement.querySelector('.departmentMenu');

      clonedHairElement.classList.add(`${ID}-new-hair-element`);
      clonedHairElementLink.innerHTML = `<p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair</span></p>`;
      clonedHairElementLink.setAttribute('name', 'Supermenu:Shop by department:beauty & skincare:hair');
      clonedHairElementLink.setAttribute('title', 'hair');
      clonedHairElementLink.id = 'departmentLinkItem_159100100_159100100';
      clonedHairElementLink.setAttribute('data-toggle', 'departmentMenu_159100100_159100100')
      clonedHairElementSubmenu.id = 'departmentMenu_159100100_159100100';

      let currentHairElement = document.querySelector('#categoryLink_1590591_1595015_1595040').parentNode;
      currentHairElement.classList.add(`${ID}-hidden`);
    
      let allCurrClonedSecondLevelLinks = clonedHairElement.querySelectorAll('.departmentMenu .categoryList .categoryMenuListItem');
      allCurrClonedSecondLevelLinks.forEach((currClonedSecondLevelLink) => {
          currClonedSecondLevelLink.remove();
      });

      clonedHairElement.querySelector('.departmentMenu .categoryList').innerHTML = `
      
        <li class="mobileNavBackButtons" onclick="toggle(document.getElementById(&quot;departmentMenu_159100100_159100100&quot;)),setUpMobileBurgerMenu(this,&quot;subcategoryLink_1590591_1595015_1595040&quot;)"> <span data-icon="4" aria-hidden="true" class="mobileBackArrow"></span> <a class="mobileBackLink" tabindex="10" personalisation-data="true"> <span class="menuItemLabel lowerLevelMenuListItem">hair</span> </a> </li> <li class="globalNavLiSingleLineHeight"> <a id="categoryLink_1590591_1595015_1595040" name="Supermenu:Shop by department:beauty &amp; skincare:View all hair" onfocus="addBackgroundColourOnFocus(this)" onclick="analyticsJS.headObjectEventGtm(&quot;Shop by department : beauty &amp; skincare : visit hair&quot;)" onblur="removeBackgroundColourOnFocus(this)" href="https://www.boots.com/beauty/hair" tabindex="10" class="viewAllHeader" personalisation-data="true"> <p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">visit&nbsp;hair</span></p> </a> </li> <li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2871695" name="Supermenu:Shop by department:beauty &amp; skincare:hair:vegan shampoo" class="menuLink" href="https://www.boots.com/beauty/hair/vegan-shampoo" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:vegan shampoo')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">vegan shampoo</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2871697" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair gift sets" class="menuLink" href="https://www.boots.com/beauty/hair/hair-care-gift-sets" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair gift sets')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair gift sets</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2875189" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair types &amp; concerns" class="menuLink" href="https://www.boots.com/beauty/hair/shop-by-hair-type" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair types &amp; concerns')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair types &amp; concerns</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1965680" name="Supermenu:Shop by department:beauty &amp; skincare:hair:all hair" class="menuLink" href="https://www.boots.com/beauty/hair/all-hair" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:all hair')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">all hair</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2856693" name="Supermenu:Shop by department:beauty &amp; skincare:hair:shampoo" class="menuLink" href="https://www.boots.com/beauty/hair/shampoo" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:shampoo')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">shampoo</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2847688" name="Supermenu:Shop by department:beauty &amp; skincare:hair:dry shampoo" class="menuLink" href="https://www.boots.com/beauty/hair/dry-shampoo" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:dry shampoo')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">dry shampoo</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1930193" name="Supermenu:Shop by department:beauty &amp; skincare:hair:new in hair" class="menuLink" href="https://www.boots.com/beauty/hair/new-in-hair" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:new in hair')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">new in hair</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1595095" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair dye" class="menuLink" href="https://www.boots.com/beauty/hair/hair-dye" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair dye')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair dye</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1595097" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair styling" class="menuLink" href="https://www.boots.com/beauty/hair/hair-styling" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair styling')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair styling</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1595189" name="Supermenu:Shop by department:beauty &amp; skincare:hair:conditioner" class="menuLink" href="https://www.boots.com/beauty/hair/conditioner" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:conditioner')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">conditioner</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1745184" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair treatments and masks" class="menuLink" href="https://www.boots.com/beauty/hair/hair-treatments-and-masks" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair treatments and masks')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair treatments and masks</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1595093" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair accessories" class="menuLink" href="https://www.boots.com/beauty/hair/hair-accessories" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair accessories')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair accessories</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1595447" name="Supermenu:Shop by department:beauty &amp; skincare:hair:brushes &amp; combs" class="menuLink" href="https://www.boots.com/beauty/hair/brushes-and-combs" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:brushes &amp; combs')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">brushes &amp; combs</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2434182" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair value packs and bundles" class="menuLink" href="https://www.boots.com/beauty/hair/hair-value-packs-and-bundles" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair value packs and bundles')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair value packs and bundles</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2031184" name="Supermenu:Shop by department:beauty &amp; skincare:hair:curls, kinks and coils" class="menuLink" href="https://www.boots.com/beauty/hair/textured-hair" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:curls, kinks and coils')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">curls, kinks and coils</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1787191" name="Supermenu:Shop by department:beauty &amp; skincare:hair:premium hair" class="menuLink" href="https://www.boots.com/beauty/hair/luxury-beauty-hair" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:premium hair')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">premium hair</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1595429" name="Supermenu:Shop by department:beauty &amp; skincare:hair:hair health vitamins" class="menuLink" href="https://www.boots.com/beauty/hair/hair-health-vitamins" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:hair health vitamins')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">hair health vitamins</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_2250683" name="Supermenu:Shop by department:beauty &amp; skincare:hair:thinning hair" class="menuLink" href="https://www.boots.com/beauty/hair/thinning-hair" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:thinning hair')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">thinning hair</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595040_1625617" name="Supermenu:Shop by department:beauty &amp; skincare:hair:men's hair" class="menuLink" href="https://www.boots.com/beauty/hair/mens-hair" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:hair:men's hair')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">men's hair</span></p></a></li>
      
      `;

      let insertionPoint = document.querySelector('.departmentLinkItem[title="beauty & skincare"]');
      insertionPoint.parentNode.insertAdjacentElement('afterend', clonedHairElement);

    } 
    
    if(toBeAdded == "makeup" || toBeAdded == "hair-makeup") {

      let clonedMakeupElement = document.querySelector('.departmentMenuListItem').cloneNode(true);
      let clonedMakeupElementLink = clonedMakeupElement.querySelector('.departmentLinkItem');
      let clonedMakeupElementSubmenu = clonedMakeupElement.querySelector('.departmentMenu');

      let makeupOffersElement = document.querySelector('#categoryLink_1590591_1595015_2921187').parentNode;
      makeupOffersElement.classList.add(`${ID}-hidden`);

      clonedMakeupElement.classList.add(`${ID}-new-hair-element`);
      clonedMakeupElementLink.innerHTML = `<p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">makeup</span></p>`;
      clonedMakeupElementLink.setAttribute('name', 'Supermenu:Shop by department:beauty & skincare:makeup');
      clonedMakeupElementLink.setAttribute('title', 'makeup');
      clonedMakeupElementLink.id = 'departmentLinkItem_159100101_159100101';
      clonedMakeupElementLink.setAttribute('data-toggle', 'departmentMenu_159100101_159100101')
      clonedMakeupElementSubmenu.id = 'departmentMenu_159100101_159100101';

      let currentMakeupElement = document.querySelector('#categoryLink_1590591_1595015_1595036').parentNode;      
      currentMakeupElement.classList.add(`${ID}-hidden`);

      let allCurrClonedSecondLevelLinks = clonedMakeupElement.querySelectorAll('.departmentMenu .categoryList .categoryMenuListItem');
      allCurrClonedSecondLevelLinks.forEach((currClonedSecondLevelLink) => {
        currClonedSecondLevelLink.remove();
      });

      clonedMakeupElement.querySelector('.departmentMenu .categoryList').innerHTML = `
      
        <li class="mobileNavBackButtons" onclick="toggle(document.getElementById(&quot;departmentMenu_159100101_159100101&quot;)),setUpMobileBurgerMenu(this,&quot;subcategoryLink_1590591_1595015_1595036&quot;)"> <span data-icon="4" aria-hidden="true" class="mobileBackArrow"></span> <a class="mobileBackLink" tabindex="10" personalisation-data="true"> <span class="menuItemLabel lowerLevelMenuListItem">makeup</span> </a> </li> <li class="globalNavLiSingleLineHeight"> <a id="categoryLink_1590591_1595015_1595036" name="Supermenu:Shop by department:beauty &amp; skincare:View all makeup" onfocus="addBackgroundColourOnFocus(this)" onclick="analyticsJS.headObjectEventGtm(&quot;Shop by department : beauty &amp; skincare : visit makeup&quot;)" onblur="removeBackgroundColourOnFocus(this)" href="https://www.boots.com/beauty/makeup" tabindex="10" class="viewAllHeader" personalisation-data="true"> <p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">visit&nbsp;makeup</span></p> </a> </li> <li class="categoryMenuListItem globalNavLiSingleLineHeight"> <a id="categoryLink_1590591_1595015_2921187" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" aria-label="link" href="https://www.boots.com/beauty/makeup-offers" name="Supermenu:Shop by department:beauty &amp; skincare:makeup offers" title="makeup offers" class="menuLink categoryLinkItem anchorDataToggle" role="menuitem" data-toggle="subcategoryMenu" onclick="analyticsJS.headObjectEventGtm(&quot;Shop by department:beauty &amp; skincare:makeup offers&quot;)" tabindex="9" personalisation-data="true"> <p class="categoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">makeup offers</span></p> </a> <span data-icon="5" aria-hidden="true" class="globalNavArrow hide"></span> <div id="subcategoryLink_1590591_1595015_2921187" class="subcategoryMenu" data-parent="departmentMenu_1590591_1595015" style="top: 0px; width: 350px; left: 353.5px;"> </div> </li> <li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_2641183" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:vegan makeup" class="menuLink" href="https://www.boots.com/beauty/makeup/vegan-makeup-products" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:vegan makeup')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">vegan makeup</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595098" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:face" class="menuLink" href="https://www.boots.com/beauty/makeup/face" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:face')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">face</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595096" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:eyes" class="menuLink" href="https://www.boots.com/beauty/makeup/eyes" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:eyes')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">eyes</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595099" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:lips" class="menuLink" href="https://www.boots.com/beauty/makeup/lips" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:lips')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">lips</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595037" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:nails" class="menuLink" href="https://www.boots.com/beauty/makeup/nails" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:nails')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">nails</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1604104" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:beauty gift sets" class="menuLink" href="https://www.boots.com/beauty/makeup/make-up-gift-sets" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:beauty gift sets')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">beauty gift sets</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595092" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:brushes &amp; sponges" class="menuLink" href="https://www.boots.com/beauty/makeup/brushes-sponges" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:brushes &amp; sponges')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">brushes &amp; sponges</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1871680" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:glitter and accessories" class="menuLink" href="https://www.boots.com/beauty/makeup/glitter-accessories" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:glitter and accessories')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">glitter and accessories</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595217" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:palettes" class="menuLink" href="https://www.boots.com/beauty/makeup/palettes" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:palettes')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">palettes</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595214" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:makeup remover" class="menuLink" href="https://www.boots.com/beauty/makeup/make-up-remover-" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:makeup remover')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">makeup remover</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1624643" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:mirrors" class="menuLink" href="https://www.boots.com/beauty/makeup/make-up-mirrors" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:mirrors')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">mirrors</span></p></a></li><li class="globalNavLiSingleLineHeight"><a id="subcategoryLink_1590591_1595015_1595036_1595310" name="Supermenu:Shop by department:beauty &amp; skincare:makeup:wash bags &amp; organisers" class="menuLink" href="https://www.boots.com/beauty/makeup/wash-bags" onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)" role="menuitem" onclick="analyticsJS.headObjectEventGtm('Shop by department:beauty &amp; skincare:makeup:wash bags &amp; organisers')" tabindex="10" personalisation-data="true"><p class="subcategoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">wash bags &amp; organisers</span></p></a></li>
      
      `;

      let insertionPoint = document.querySelector('.departmentLinkItem[title="beauty & skincare"]');
      insertionPoint.parentNode.insertAdjacentElement('beforebegin', clonedMakeupElement);



    }
  })


}

const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if (e.target.closest('.categoryLinkItem[title="hair"]')) {
      fireEvent(`Click - user has clicked on hair (in its old position)`);
    }

    if (e.target.closest('.categoryLinkItem[title="makeup"]')) {
      fireEvent(`Click - user has clicked on makeup (in its old position)`);
    }

    if (e.target.closest('.departmentLinkItem')) {
      let title = e.target.closest('.departmentLinkItem').getAttribute('title');
      fireEvent(`Click - user has clicked on ${title}`);
    }

    if (VARIATION == 2 && e.target.closest('#categoryLink_1590591_1595015_2921187')) {
      fireEvent(`Click - user has clicked on makeup offers`);
    }

  });


}

export default () => {
  
  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();

};
