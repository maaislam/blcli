import { category_quickline_data } from '../categoryData';

const categoryQuicklines = (id) => {
  console.log(category_quickline_data, 'category_quickline_data');

  const categoryContents = () => {
    let r_string = '';

    category_quickline_data?.forEach((data) => {
      r_string =
        r_string +
        `               
            <div class="${id}__category_quickline" data_identifier="${data.identifier}" data-selected="${data.selected}">${data.category}</div>          
            `;
    });

    return r_string;
  };

  const htmlStr = `
    <div class="${id}__category_quicklines_container">
        <div class="${id}__category_quickline_wrapper">
            ${categoryContents()}
        </div>
           
    </div>
    `;

  return htmlStr.trim();
};

export default categoryQuicklines;
