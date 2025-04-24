export default () => {
  const mainContainerSuccessPage = document.querySelector('.main-container#content');
  const successPageSidebar = `<div class="RC052-sidebarDonationSuccessPage__wrapper">
    <div class="RC052-sidebarDonation__container">
      <div class="RC052-sidebarDonation__btn">Donate</div>
      <div class="RC052-sidebarDonation__image"></div>
      <div class="RC052-sidebarDonation__text">Why not make a donation to the British Red Cross today?</div>
    </div>
  </div>`;
  if (mainContainerSuccessPage) {
    mainContainerSuccessPage.insertAdjacentHTML('beforeend', successPageSidebar);
  }
};