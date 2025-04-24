export const isShoweringCategory = () => {
  const showeringCategories = [
    'cat820272',
    'cat820336',
    'cat820270',
    'cat820268',
    'cat820294',
    'cat820004',
    'cat2650018',
    'cat820282',
    'cat820280',
    'cat820278',
    'cat820274',
    'cat820276',
    'cat840510',
    'cat11500002',
  ];
  const dataObjs = window.dataLayer.filter((item) => typeof item === 'object')[0];
  return showeringCategories.some((item) => dataObjs['prodCategoryId'] === item);
};

export const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry);
      });
    },
    {
      threshold,
    }
  );
  if (!target) {
    return;
  }

  observer?.observe(target);
};
