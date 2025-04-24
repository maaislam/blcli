const navChild = (id, data) => {
  const { title, link } = data;
  const html = `
        <li class="categoryMenuListItem globalNavLiSingleLineHeight"> 
            <a
                href="${link}"
                class="menuLink categoryLinkItem anchorDataToggle"
                role="menuitem"
                tabindex="25"
                data-toggle="subcategoryMenu">
                <p class="categoryLinkOutput">
                    <span class="menuItemLabel lowerLevelMenuListItem">${title}</span>
                </p>
            </a> 
        </li>
    
    `;
  return html.trim();
};

export default navChild;
