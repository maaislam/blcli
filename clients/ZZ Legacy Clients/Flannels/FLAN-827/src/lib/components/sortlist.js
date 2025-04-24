import sortlistItem from './sortlistItem';

const sortList = (id) => {
  const sortListItemsData = [
    {
      name: 'Rank',
      controlEquivalent: 'MobSortOptions_rank',
    },
    {
      name: 'Recent',
      controlEquivalent: 'MobSortOptions_recent',
    },
    {
      name: 'Discount (High To Low)',
      controlEquivalent: 'MobSortOptions_discountvalue_desc',
    },
    {
      name: 'Discount % (High To Low)',
      controlEquivalent: 'MobSortOptions_discountpercent_desc',
    },
    {
      name: 'Price (Low To High)',
      controlEquivalent: 'MobSortOptions_price_asc',
    },
    {
      name: 'Price (High To Low)',
      controlEquivalent: 'MobSortOptions_price_desc',
    },
    {
      name: 'Brand (A To Z)',
      controlEquivalent: 'MobSortOptions_brand_asc',
    },
    {
      name: 'Brand (Z To A)',
      controlEquivalent: 'MobSortOptions_brand_desc',
    },
  ];
  const sortLists = sortListItemsData
    .map((item) => {
      return sortlistItem(id, item);
    })
    .join('\n');

  const htmlStr = `<li class="${id}__sortlist">
        <div class="${id}__sortlist--row1">
            <h3 class="title">SORT BY</h3>
            <div class="icon-block">
                <span class="plus-icon"></span>
                <span class="minus-icon ${id}__hide"></span>
            </div>
        </div>
        <div class="${id}__sortlist--row2 ${id}__hid closed">
            ${sortLists}
        </div>
    </li>`;

  return htmlStr.trim();
};

export default sortList;
