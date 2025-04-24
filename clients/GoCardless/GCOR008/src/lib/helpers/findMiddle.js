const articleMiddle = () => {
  const main = document.querySelector('main');
  const heading2 = main.querySelectorAll('h2');
  const heading3 = main.querySelectorAll('h3');
  const paragraph = main.querySelector('[data-module-name="articleContent"] .css-h94nr3').getElementsByTagName('p');
  const notListItemParagraphs = [...paragraph].filter(
    (item) => !item.closest('ul') && !item.closest('blockquote') && !item.closest('div[style="display: none;"]')
  );

  if (heading3.length > heading2.length || (heading2.length <= 0 && heading3.length > 0)) {
    const indexToUse = Math.round(heading3.length / 2) - 1;

    return heading3[indexToUse] || heading3[0];
  } else if (heading2.length <= 0 && heading3.length <= 0) {
    const indexToUse = notListItemParagraphs.length - 3;
    return notListItemParagraphs[indexToUse] || notListItemParagraphs[0];
  } else {
    return heading2[Math.round(heading2.length / 2) - 1] || heading2[0];
  }
};

export default articleMiddle;
