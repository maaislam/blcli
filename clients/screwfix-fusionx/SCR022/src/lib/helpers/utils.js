export const getParentCategory = () => {
  const breadcrumbs = document.querySelectorAll('[data-qaid="breadcrumb-qa"] li');
  const pageTypeConfig = {
    c: 'plp',
    p: 'pdp',
  };
  const domainEnd = location.href.indexOf('.com') + 5;
  const pageType = pageTypeConfig[location.href.charAt(domainEnd)];
  //console.log(pageType);
  const parentCategories = [];
  breadcrumbs.forEach((item) => {
    const href = item.querySelector('a')?.href;
    //console.log(href);
    if (href && href !== location.origin && href !== location.origin + '/' && item.querySelector('a').title) {
      parentCategories.push(item.querySelector('a').title);
    }
  });
  const data = {
    pageType,
    parentCategories,
  };

  console.log('data', data);
  return data;
};
