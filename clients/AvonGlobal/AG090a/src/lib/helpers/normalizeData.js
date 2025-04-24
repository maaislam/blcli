const reStructuredData = (data) => {
  const catData = (categoryName, data) => {
    return data.reduce((acc, curr) => {
      const x = curr.item.categories.indexOf(categoryName) !== -1;
      if (x) {
        acc.push({ categoryName: curr.item });
      }
      return acc;
    }, []);
  };

  window.dyVariables.reduce((acc, curr) => {
    const catName = curr.strategyName;
    const finalData = catData(catName, data);
    console.log(finalData);
    return { ...acc, ...finalData };
  }, {});
};

export default reStructuredData;

const arr = ['Make-Up', 'Eyes', 'Lips', 'Haircare'];
