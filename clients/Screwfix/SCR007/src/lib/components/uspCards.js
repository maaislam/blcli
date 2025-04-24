import uspCard from './uspCard';
import viewAllSpec from './viewAll';

const uspCards = (id, contents) => {
  const htmlStr = `
    <div class="${id}__specscontainer">
        <div class="${id}__specs">
            ${contents.map((content) => uspCard(id, content)).join('\n')}
        </div>
        ${viewAllSpec(id, '#product_additional_details_container')}
        
    </div>`;

  return htmlStr.trim();
};
export default uspCards;
