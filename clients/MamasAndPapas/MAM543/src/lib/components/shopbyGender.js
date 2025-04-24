import clothingData from '../data/data';
import gender from './gender';
import mainProduct from './mainProduct';
import productCards from './productCards';

const shopbyGender = (id) => {
  const initialData = clothingData['girls'];

  const htmlStr = `<section class="${id}__shopbyGender">
        <p class='${id}__headerTitle'>Shop for Your Little Girl</p>
        <div class='${id}__genderDropdown'>
            ${gender(id, initialData)}
        </div>
        <div class='${id}__categoryDetails'>
            ${mainProduct(id, initialData)}
            ${productCards(id, initialData)}
        </div>
    </section>`;
  return htmlStr;
};
export default shopbyGender;
