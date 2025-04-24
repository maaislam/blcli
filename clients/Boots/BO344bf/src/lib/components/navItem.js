import navChild from './navChild';

const navItem = (id, item) => {
  const { title, link, hasChildren } = item;
  const html = `
        <li class="departmentMenuListItem globalNavLiSingleLineHeight ${id}__departmentMenuListItem ${
    hasChildren && hasChildren.length ? `${id}__hasChild` : ''
  }">
            <a  
                href="${link ? `${link}` : 'javascript:;'}"
                class="link menuLink departmentLinkItem anchorDataToggle selected"
                role="menuitem"
                tabindex="28"
                aria-label="link, collapsed content">
                    <p class="departmentLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">${title}</span></p>
                </a>
                ${
                  hasChildren && hasChildren.length
                    ? `
                    <span data-icon="5"
                        aria-hidden="true"
                        class="globalNavArrow"
                        id="departmenrGlobalNavArrow">
                    </span>
                    
                    `
                    : ''
                }

                ${
                  hasChildren && hasChildren.length
                    ? `
                    <div
                        class="departmentMenu departmentList"
                        role="menu"
                        data-parent="departmentMenu"
                        style="top: 65px; width: 350px; left: 351px;"
                        >
                        <ul id="catergoryList"
                            class="categoryList"
                            data-parent="departmentMenu"
                            style="top: -65px; width: 350px;">
                            <li class="mobileNavBackButtons">
                                <span data-icon="4"
                                    aria-hidden="true"
                                    class="mobileBackArrow"></span> <a class="mobileBackLink"
                                tabindex="25"> <span class="menuItemLabel lowerLevelMenuListItem">${title}</span> </a>
                            </li>
                            ${hasChildren.map((child) => navChild(id, child)).join('\n')}
                        </ul>
                    </div>
                    `
                    : ''
                }
        </li>
    
    `;
  return html.trim();
};

export default navItem;
