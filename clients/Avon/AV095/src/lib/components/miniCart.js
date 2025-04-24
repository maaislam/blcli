import { renderDelBtn } from './delItem';

const miniCart = (items, id) => {
  const cartContainer = document.createElement('div');
  cartContainer.classList.add(`${id}__cart`);

  normalizeData(items).forEach((item) => {
    const variants = item.groupedItems;
    const cartRow = document.createElement('div');
    cartRow.classList.add(`${id}-cart__row`);

    const variantsContainer = document.createElement('ul');

    const prodItem = document.createElement('div');
    prodItem.classList.add(`${id}__prod--detail`);

    if (variants.length >= 1 && variants.some((item) => item['variant_title'])) {
      const title = document.createElement('span');
      title.innerHTML = `<span>${variants[0]['product_title']}</span>`;
      variants.forEach((item) => {
        const variantRow = `
        <li>
            <div class="${id}__var--detail">
            <span style="background-image: url(${item.image})"><img src=" ${item.image}" alt="${item['variant_title']}" /></span>
            <span>${item['variant_title']}</span>
            ${renderDelBtn(item.id)}
            </div>
        </li>
        `;
        variantsContainer.innerHTML += variantRow;
      });
      variantsContainer.prepend(title);
      cartContainer.append(variantsContainer);
    } else {
      const content = `
        <span>${item.groupedItems[0].title}</span>
      ${renderDelBtn(item.groupedItems[0].id)}
        `;
      prodItem.innerHTML += content;
      cartContainer.prepend(prodItem);
    }
  });
  const temp = document.createElement('div');
  temp.appendChild(cartContainer);
  return temp.innerHTML;
};

const normalizeData = (items) => {
  const samplesList = items.filter((item) => item.title.split(' ').includes('Sample'));

  const data = samplesList.reduce((sortedData, currentItem, itemIndex, items) => {
    const groupedItems = items.filter((item) => {
      return item['product_id'] === currentItem['product_id'] && !sortedData.some((el) => el.productId === item['product_id']);
    });

    const obj = {
      productId: currentItem['product_id'],
      groupedItems,
    };
    sortedData[itemIndex] = obj;
    return sortedData.filter((item) => item.groupedItems.length > 0);
  }, []);

  return data;
};

export default miniCart;
