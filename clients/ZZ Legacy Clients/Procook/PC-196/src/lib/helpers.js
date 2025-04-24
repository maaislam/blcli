import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const productClickEvents = (productRow, prodUrl, prodName) => {
  const allColumns = productRow.querySelectorAll('td');
  [].forEach.call(allColumns, (col) => {
    if (col.classList.contains('colImage') || col.classList.contains('colTitle')) {
      
      col.addEventListener('click', (e) => {
        // window.location.href = prodUrl;
        window.open(
          `${prodUrl}`,
          '_blank' // <- This is what makes it open in a new window.
        );

        fireEvent(`Clicked - Basket Product - ${prodName}`);
      });
        
    } else {
      col.addEventListener('click', (e) => {
        
        fireEvent(`Clicked - Basket Product - dead click`);
      });
    }
  });
}
