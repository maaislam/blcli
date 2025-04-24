import shared from '../shared';

const { ID } = shared;

const markup = ` <li class="${ID}-navLink topLevelMenuListItem">
	    <a id="topLevelLink_no7" href="#" class="departmentButton anchorDataToggle" data-toggle="topLevelMenu_no7">
            <span class="menuItemLabel">No7</span>
        </a>
        <span data-icon="5" aria-hidden="true" class="globalNavArrow topLevelMenuMobileArrow"></span>
        <div id="topLevelMenu_no7" class="departmentMenu topLevelMenu">
            <ul id="departmentMenu" role="menu" data-parent="topLevelMenu"">
                <li class="mobileNavBackButtons" onclick="toggle(document.getElementById('departmentMenu'));setUpMobileBurgerMenu(this, 'departmentMenu');deactivate(document.getElementById('topLevelMenu_no7'));">
                    <span data-icon="4" aria-hidden="true" class="mobileBackArrow "></span>
                        <a id="departmentLink_backButtons" class="mobileBackLink">
                            <span class="menuItemLabel lowerLevelMenuListItem">No7</span>
                        </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">shop all</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-skincare" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">skincare</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-make-up" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">make-up</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-bestsellers" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">bestsellers</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-new" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">new</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-online-only" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">online only bundles</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-make-up-accessories" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">tools</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-bath-body" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">bath & body</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-suncare" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">suncare & selftan</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-mens" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">men's</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-3-for-2" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">3 for 2</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-inspiration-and-advice" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">no7 inspiration and advice</span></p>
                    </a>
                </li>
                <li class="departmentMenuListItem globalNavLiSingleLineHeight">
                    <a onfocus="addBackgroundColourOnFocus(this)" onblur="removeBackgroundColourOnFocus(this)"  href="https://www.boots.com/no7/no7-macmillan-partnership" class="link menuLink departmentLinkItem anchorDataToggle" data-toggle="departmentList"  role="menuitem" aria-label="link">
                        <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">no7 Macmillan partnership</span></p>
                    </a>
                </li>
            </ul>
        </div> 
    </li>`;





const markupV2 = `
    <li class="${ID}-navLink topLevelMenuListItem">
        <a id="topLevelLink_no7" href="https://www.boots.com/no7" class="departmentButton anchorDataToggle">
            <span class="menuItemLabel">No7</span>
        </a>
        <div id="topLevelMenu_no7" class="departmentMenu topLevelMenu">
            <ul id="departmentMenu" role="menu" data-parent="topLevelMenu"">
                <li class="mobileNavBackButtons" onclick="toggle(document.getElementById('departmentMenu'));setUpMobileBurgerMenu(this, 'departmentMenu');deactivate(document.getElementById('topLevelMenu_no7'));">
                    <span data-icon="4" aria-hidden="true" class="mobileBackArrow "></span>
                        <a id="departmentLink_backButtons" class="mobileBackLink">
                            <span class="menuItemLabel lowerLevelMenuListItem">No7</span>
                        </a>
                </li>
            </ul>
        </div>
    </li>`;
export { markupV2, markup };
