export default () => {
  // Email
  const emailBtn = document.querySelector('div.buttons a.sml-blue-btn[href*="mailto:"]');
  const emailIcon = document.querySelector('.UKB006-action #UKB006-email');

  emailIcon.addEventListener('click', () => {
    emailBtn.click();
  });

  // Shortlist
  const shortlistBtn = document.querySelector('.buttons a.sml-blue-btn.shortlist');
  const shortlistIcon = document.querySelector('.UKB006-action #UKB006-shortlist');

  shortlistIcon.addEventListener('click', () => {
    shortlistBtn.click();

    setTimeout(() => {
      if (shortlistBtn.classList.contains('active')) {
        shortlistIcon.classList.add('active');
      } else {
        shortlistIcon.classList.remove('active');
      }
    }, 1500);
  });

  shortlistBtn.addEventListener('click', () => {
    setTimeout(() => {
      if (shortlistBtn.classList.contains('active')) {
        shortlistIcon.classList.add('active');
      } else {
        shortlistIcon.classList.remove('active');
      }
    }, 1500);
  });
};