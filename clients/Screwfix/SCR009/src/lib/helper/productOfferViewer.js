const getOfferInfo = (table) => {
  let offerInfo = [];
  const allRows = table.querySelectorAll("tr");
  allRows.length > 0 &&
    allRows.forEach((row) => {
      let qty, price, offer;
      qty = row.children[0]?.textContent.trim();
      price = row.children[1]?.textContent.trim();
      offer = row.children[2]?.textContent.trim();
      offerInfo.push({
        quantity: qty ? qty : "",
        price: price ? price : "",
        offer: offer ? offer : "",
      });
    });
  return offerInfo;
};

export const productOfferViewer = (info) => {
  if (!info.error) {
    const { table } = info;
    // console.log(table);
    const productOfferInfo = getOfferInfo(table);
    return productOfferInfo;
  }
  return [];
};
