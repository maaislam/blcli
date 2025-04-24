export default () => {
  const products = document.querySelectorAll('.category-products .item-product');

  for (let index = 0; index < products.length; index += 1) {
    const element = products[index];
    const readMoreLink = element.querySelector('.TG064-read_more');


    // remove read more from other ones on click
    readMoreLink.addEventListener('click', (e) => {
      const hiddenText = e.currentTarget.parentNode.querySelector('.TG064-hidden_text');
      const description = e.currentTarget.parentNode;

      if (hiddenText.classList.contains('TG064-text_show')) {
        e.currentTarget.parentNode.querySelector('.TG064-hidden_text').classList.remove('TG064-text_show');
        description.classList.remove('TG064-show_all');
      } else {
        /* [].forEach.call(document.querySelectorAll('.item-product'), (item) => {
          if (item.querySelector('.TG064-text_show')) {
            // item.querySelector('.TG064-text_show').classList.remove('TG064-text_show');
          }
          // if (item.querySelector('.TG064-show_all')) {
            // item.querySelector('.TG064-show_all').classList.remove('TG064-show_all');
          //}
        }); */
        hiddenText.classList.add('TG064-text_show');
        description.classList.add('TG064-show_all');
      }
    });
  }
};
