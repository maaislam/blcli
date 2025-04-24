const badgeWrapper = (id) => {
  const html = `
    <div class="${id}__badgeWrapper">
        <div class="${id}__badgeContainer">
            <div class="${id}__awardsBadge">
                <img src="https://blcro.fra1.digitaloceanspaces.com/KeyGroup/KG-402/awards-1.png"/>
            </div>
            <div class="${id}__trustBadge">
                <img src="https://blcro.fra1.digitaloceanspaces.com/KeyGroup/KG-402/awards-2.png"/>
            </div>
        </div>
    </div>
  `;
  return html.trim();
};

export default badgeWrapper;
