import specItem from './specItem';
import viewAllSpec from './viewAll';

const specItems = (id, contents) => {
  const htmlStr = `
    <div class="${id}__specitemscontainer">
        <ul class="${id}__specitems">
            ${contents.map((content) => specItem(id, content)).join('\n')}
        </ul>
        ${viewAllSpec(id, '#product_additional_details_container')}
        
    </div>`;

  return htmlStr.trim();
};

export default specItems;
