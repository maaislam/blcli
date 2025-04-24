import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  const searchBoxContent = document.querySelector('.course-search-form.form-lrg');
  searchBoxContent.classList.add('RC052-newsPageSearchBox');
  const searchBoxPosition = document.querySelector('.sidebar-last');
  searchBoxPosition.classList.add('RC052-newsSidebarPosition');
  const donateSidebarWrapper = `<div class='RC052-donateSidebar__wrapper'>
    <div class='RC052-donateSidebar'>
      <div class='RC052-donateSidebar__text'>Why not make a donation to  the British Red Cross today?</div>
      <div class='RC052-donateSidebar__subtext'>This will take you to our main website</div>
      <div class='RC052-donateSidebar__button'>Donate</div>
    </div>
  </div>`;

  document.querySelector('.main-container .sidebar-first').insertAdjacentHTML('afterbegin', donateSidebarWrapper);

  // Sidebar Latest News
  if (window.location.pathname === '/News-and-legislation.aspx') {
    document.querySelector('nav.subnav i.icon-arrow-right').click();
  } else if (window.location.pathname === '/News-and-legislation/latest-news.aspx') {
    // Change width of main content
    document.querySelector('.main-content-wrap .main-content').classList.add('RC052-newsPageContent');
  }

  // Show/Hide Search Box
  const searchBoxShowArrowWrapper = `<div class='RC052-arrow'><div class='down-arrow'></div></div>`;
  pollerLite(['.component .course-search-internal h2.course-search-header'], () => {
    document.querySelector('.component .course-search-internal h2.course-search-header').insertAdjacentHTML('afterend', searchBoxShowArrowWrapper);
  });
  const searchBoxArrow = document.querySelector('.RC052-arrow div');
  searchBoxArrow.addEventListener('click', () => {
    if (!searchBoxArrow.classList.contains('shown')) {
      searchBoxArrow.classList.add('shown');
      document.querySelector('.course-search-form.form-lrg').classList.add('show');
    } else {
      searchBoxArrow.classList.remove('shown');
      document.querySelector('.course-search-form.form-lrg').classList.remove('show');
    }
  });
};