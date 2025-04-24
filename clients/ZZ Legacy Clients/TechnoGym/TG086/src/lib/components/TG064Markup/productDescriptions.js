import { pollerLite } from "../../../../../../../lib/uc-lib";

export default () => {
  const products = document.querySelectorAll('.category-products .item-product');

  for (let index = 0; index < products.length; index += 1) {
    const element = products[index];

    const readMoreLink = element.querySelector('.TG086-read_more');
       // remove read more from other ones on click
    readMoreLink.addEventListener('click', (e) => {
      const hiddenText = e.currentTarget.parentNode.querySelector('.TG086-hidden_text');
      const description = e.currentTarget.parentNode;

      if (hiddenText.classList.contains('TG086-text_show')) {
        e.currentTarget.parentNode.querySelector('.TG086-hidden_text').classList.remove('TG086-text_show');
        description.classList.remove('TG086-show_all');
      } else {
         [].forEach.call(document.querySelectorAll('.item-product'), (item) => {
          if (item.querySelector('.TG086-text_show')) {
            item.querySelector('.TG086-text_show').classList.remove('TG086-text_show');
          }
          if (item.querySelector('.TG086-show_all')) {
             item.querySelector('.TG086-show_all').classList.remove('TG086-show_all');
          }
        }); 
        hiddenText.classList.add('TG086-text_show');
        description.classList.add('TG086-show_all');
      }
    });
  }
};
