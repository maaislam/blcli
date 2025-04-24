export default () => {
  const mainContainerWrapper = document.querySelector('#wrapper main');
  if (mainContainerWrapper) {
    mainContainerWrapper.classList.add('RC052-successDesktop');
  }
  const mainContainerSuccessPage = document.querySelector('.main-container#content');
  const mainContent = mainContainerSuccessPage.querySelector('.two-col-right .main-content');
  if (mainContent) {
    mainContent.classList.add('RC052-mainContent');
  }
  const sidebarRight = document.querySelector('.sidebar-last');
  const successPageSidebar = `<div class="RC052-sidebarDonationSuccessPage__wrapper">
    <div class="RC052-sidebarDonation__container">
      <div class="RC052-sidebarDonation__text">Why not make a donation to the British Red Cross today?</div>
      <div class="RC052-sidebarDonation__image"></div>
      <div class="RC052-sidebarDonation__btn">Donate</div>
    </div>
  </div>`;
  sidebarRight.insertAdjacentHTML('afterbegin', successPageSidebar);
};