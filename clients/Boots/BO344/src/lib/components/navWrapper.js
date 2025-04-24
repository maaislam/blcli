import navItem from './navItem';

const navWrapper = (id, data) => {
  const html = `
        <li class="topLevelMenuListItem ${id}__topLevelMenuListItem">
            <a
                name="Supermenu:chrismas"
                title="chrismas"
                aria-label="chrismas link, collapsed content"
                class="departmentButton anchorDataToggle selected"
                role="menuitem"
                aria-haspopup="true"
                > 
                <span class="menuItemLabel ${id}__colorChange">Christmas</span> 
            </a>
            <span data-icon="5" aria-hidden="true" class="globalNavArrow topLevelMenuMobileArrow"></span>
            <div class="departmentMenu topLevelMenu"
                style="width: 350px;">
                <ul id="departmentMenu"
                    role="menu"
                    data-parent="topLevelMenu">
                    <li class="mobileNavBackButtons ${id}__first-back-button">
                        <span data-icon="4"
                            aria-hidden="true"
                            class="mobileBackArrow"></span> <a id="departmentLink_backButtons"
                        class="mobileBackLink"
                        tabindex="28"> <span class="menuItemLabel lowerLevelMenuListItem">Christmas</span> </a>
                    </li>
                    ${data.map((item) => navItem(id, item)).join('\n')}    
                </ul>
            </div>
        </li>
    `;
  return html.trim();
};

export default navWrapper;
