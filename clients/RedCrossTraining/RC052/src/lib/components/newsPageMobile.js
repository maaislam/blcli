export default () => {
  const donateSidebarWrapper = `<div class='RC052-donateSidebar__wrapper'>
    <div class='RC052-donateSidebar'>
      <div class='RC052-donateSidebar__button'>Donate</div>
      <div class='RC052-donateSidebar__text'>Why not make a donation to the British Red Cross today?</div>
      <div class='RC052-donateSidebar__subtext'>This will take you to our main website</div>
    </div>
  </div>`;

  document.querySelector('.sidebar-last').insertAdjacentHTML('afterbegin', donateSidebarWrapper);
};