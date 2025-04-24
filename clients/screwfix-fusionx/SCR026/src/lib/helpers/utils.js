export const getVariantOptions = (options, variant) => {
  return options
    .reduce((prev, curr) => {
      const same = prev.some((item) => item[variant] === curr[variant]);
      //console.log('unique', unique);
      if (!same) {
        prev.push(curr);
      }
      return prev;
    }, [])
    .map((item) => item[variant]);
};

export const renderSelected = (selectedProd) => {
  const possibleVariants = ['finish', 'volume', 'color'];
  possibleVariants.forEach((possibleVariant) => {
    document.querySelector(`[data-variantvalue="${selectedProd[possibleVariant]}"]`)?.classList.add('selected');
  });
};

export const isPdp = () => window.location.href.includes('/p/');

export const isPlp = () => window.location.href.includes('/c/');
