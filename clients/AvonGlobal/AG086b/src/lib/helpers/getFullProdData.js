const getFullProductDetails = (showAll) => {
  const facetsArr = _ShopContext.CategoryPageSummary?.Ids;
  const facets = facetsArr && `&facets=0:${facetsArr[facetsArr.length - 1]}`;
  const hashes = location.hash.split('#')[1]?.split('&');
  const hasSort = location.hash.split('sort=');

  const facetsForSearch =
    hashes &&
    hashes
      .map((item) => {
        const itemContents = item.split('=');
        const hashVilid = Object.keys(window.FacetTypes).indexOf(itemContents[0]) !== -1;
        if (!hashVilid) return false;
        const facetId = window.FacetTypes[itemContents[0]];
        const facetVal = itemContents[1];
        const facetsString = `&facets=${facetId}:${facetVal}`;
        return facetsString;
      })
      .filter(Boolean)
      .join('');
  const pageNum = location.hash?.split('page=')[1];
  const startIndex = pageNum ? (parseInt(pageNum) - 1) * 20 + 1 : 1;
  const sessionSearchHash = JSON.parse(sessionStorage.getItem('SessionContext_ZA')).Hash.ProductSearch;
  const showPagination = !showAll ? `&from=${startIndex}&to=${startIndex + 19}` : '';
  const searchQuery = location.pathname == '/search/results/' ? location.search.split('?q=')[1].split('&')[0] : '';

  const searchURL = `/Api/SearchApi/SearchProducts?q=${searchQuery}&getVariants=true&isDesktop=true${showPagination}${
    facets || ''
  }${facetsForSearch || ''}${hasSort && hasSort.length > 1 ? `&sortOrder=${hasSort[1]}` : ''}&forceDatabase=${
    location.pathname !== '/search/results/'
  }&cb=${sessionSearchHash}`;
  console.log(searchURL);

  const response = fetch(searchURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
  return response;
};

export default getFullProductDetails;
