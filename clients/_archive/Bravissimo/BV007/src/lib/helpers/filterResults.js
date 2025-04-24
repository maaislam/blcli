const filterResults = (results) => {
  return results.map((result) => {
    // We have products?
    return result.map((res) => {
      if (res.despatchedLines && res.despatchedLines.length > 0) {
        // Loop over array, check for 'CANCELLED' or 'RETURNED'
        const prodIds = [];
        res.despatchedLines.map((subRes) => {
          if (subRes.cancelled === 0 && subRes.returned === 0) {
            prodIds.push({ // Here you could add the whole product.
              id: subRes.styleCode,
              size: subRes.size.size,
            });
          }
        });
        return prodIds;
      }
    });
  })
};

export default filterResults;
