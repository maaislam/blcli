import { events } from '../../../../../../lib/utils';

export default (donateCtaBtnWrapper) => {
  document.querySelector('.main-content .rich-text h2').insertAdjacentHTML('beforebegin', donateCtaBtnWrapper);
  const donateCtaBtn = document.querySelector('.RC052-donateCta');
  donateCtaBtn.addEventListener('click', () => {
    events.send('RC052', 'Variation 1', 'Clicked - Donate on "What We Do"', { sendOnce: true });
    window.location.href = 'https://donate.redcross.org.uk/appeal/general-fund-appeal?c_name=General%20Fund%20Appeal&c_source=Red%20Cross%20Training&c_medium=Internal&c_creative=Donate%20now%20banner&adg=What%20We%20Do_Before&utm_campaign=General%20Fund%20Appeal&utm_source=redcrossfirstaidtraining.co.uk&utm_medium=referral&utm_content=Donate%20now%20banner&utm_term=What%20We%20Do_Before';
  });
};