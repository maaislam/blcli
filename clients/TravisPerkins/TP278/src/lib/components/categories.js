const categories = (id, menu) => {
  let htmlStr = '';
  for (const [key, value] of Object.entries(menu)) {
    const isViewAll = key.includes('View All');

    htmlStr += `<div class='${id}__categoryCard' data-url='${value.url}'>
            <a href="${value.url}" class='${id}__categoryCard-title ${isViewAll ? `${id}__viewAll` : ''}'>${key}</a>
            <ul data-test-id="nav-table-category-list" class='${id}__categoryCard-lists'>
                ${value?.subCategories
                  ?.map((subCategory, index) => {
                    return `
                    <li class='${id}__category ${index > 5 ? `${id}__hide` : ''}'>
                        <a data-test-id="link" class='${id}__category-link' href="${subCategory?.url}">${subCategory?.name}</a>
                    </li>`;
                  })
                  .join('')}
            </ul>
            <button class="show-more ${id}__showMore">Show more</button>
            <button class="show-less ${id}__showLess" style="display: none;">Show less</button>
        </div>`;
  }
  return htmlStr;
};

export default categories;
