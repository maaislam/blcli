import { events } from '../../../../../../lib/utils';

export default (element, page) => {
  const donateSidebarBtn = document.querySelector(`${element}`);
  donateSidebarBtn.addEventListener('click', () => {
    const url = window.location.pathname;
    switch(element) {
      case '.RC052-donateSidebar__button':
        events.send('RC052', 'Variation 1', `Clicked - Donate on '${url}'`, { sendOnce: true });
        break;
      case '.RC052-sidebarDonation__btn':
        events.send('RC052', 'Variation 1', `Clicked - Donate on '${url}'`, { sendOnce: true });
        break;
    }
    if (page === 'News and legislation page') {
      window.location.href = 'https://donate.redcross.org.uk/appeal/general-fund-appeal?c_name=General%20Fund%20Appeal&c_source=Red%20Cross%20Training&c_medium=Internal&c_creative=Donate%20now%20banner&adg=News_After&utm_campaign=General%20Fund%20Appeal&utm_source=redcrossfirstaidtraining.co.uk&utm_medium=referral&utm_content=Donate%20now%20banner&utm_term=News_After';
    } else if (page === 'Purchase Success page') {
      window.location.href = 'https://donate.redcross.org.uk/appeal/general-fund-appeal?c_name=General%20Fund%20Appeal&c_source=Red%20Cross%20Training&c_medium=Internal&c_creative=Donate%20now%20banner&adg=Purchase%20Success_After&utm_campaign=General%20Fund%20Appeal&utm_source=redcrossfirstaidtraining.co.uk&utm_medium=referral&utm_content=Donate%20now%20banner&utm_term=Purchase%20Success_After';
    }
  });
};