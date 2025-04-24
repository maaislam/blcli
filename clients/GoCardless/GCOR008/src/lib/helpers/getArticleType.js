export const getArticleType = () => {
  const isArticlePage = () => {
    const publicationSection = document.querySelector('#latestPublications');
    const urlContains = ['/guides/', '/posts/'];
    return !!(urlContains.some((item) => location.pathname.indexOf(item) !== -1) || publicationSection);
  };
  if (!isArticlePage()) {
    return;
  }

  const options = {
    dd: ['/direct-debit/', 'bacs-payment', 'direct-debit', 'bacs-'],
    ach: ['/ach', '-ach'],
    sepa: ['/sepa', '-sepa'],
    online: ['online-payment', 'standing-order', 'payment-gateway'],
  };
  const checkLocation = (option) => option.some((item) => location.pathname.indexOf(item) !== -1);
  if (checkLocation(options['dd'])) {
    return 'directDebit';
  } else if (checkLocation(options['ach'])) {
    return 'achDebit';
  } else if (checkLocation(options['sepa'])) {
    return 'sepa';
  } else if (checkLocation(options['online'])) {
    return 'online';
  }
};

const getPosition = (el) => {
  const rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

const heading2 = document.querySelectorAll('h2')[0];
const heading3 = document.querySelectorAll('h3')[0];
const heading4 = document.querySelectorAll('h4')[0];
const headings = [heading2, heading3, heading4];
const yPos = headings.map((item) => (item ? getPosition(item) : document.body.offsetHeight));

const min = Math.min(...yPos);
const firstHeading = headings[yPos.indexOf(min)];
