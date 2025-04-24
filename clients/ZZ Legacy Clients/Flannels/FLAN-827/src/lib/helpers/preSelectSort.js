const preSelectSortItem = () => {
  if (!window.location.hash) return;
  const urlHash = window.location.hash.substr(1);
  const urlHashObj = urlHash.split('&').reduce((res, item) => {
    const parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
  }, {});
  const sortedBy = urlHashObj.OrderBy;
  if (sortedBy) {
    document.querySelector(`[data-controlid="MobSortOptions_${sortedBy}"] label`)?.click();
  }
};
export default preSelectSortItem;
