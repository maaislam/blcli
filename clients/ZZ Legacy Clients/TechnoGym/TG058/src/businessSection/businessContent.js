import { businessCopy, businessCopyIT } from './businessMarkup';

export default () => {
  let content;
  if (window.location.href.indexOf('/it/') > -1) {
    content = businessCopyIT;
  } else {
    content = businessCopy;
  }
  /* const yourBusinessSection = document.querySelectorAll('.TG058-business_categories_content');
  for (let index = 0; index < yourBusinessSection.length; index += 1) {
    const element = yourBusinessSection[index];
    console.log(element);
  } */

  Object.keys(content).forEach((i) => {
    const data = content[i];
    // loop through the content match the title to the loop key

    const yourBusinessSection = document.querySelectorAll('.TG058-business_categories_content .business_subsection_COLUMN');
    for (let index = 0; index < yourBusinessSection.length; index += 1) {
      const element = yourBusinessSection[index];
      const categoryHeading = element.querySelector('.business_textWrapper .business_text_Header');
      const categoryText = element.querySelector('.business_textWrapper .business_text_Content');
      const categoryImage = element.querySelector('.business_imgWrapper');
      if ([i][0].toLowerCase() === categoryHeading.querySelector('span').textContent.toLowerCase()) {
        if (categoryText) {
          categoryText.textContent = data.text;
        } else {
          const newCategoryText = document.createElement('div');
          newCategoryText.classList.add('business_text_Content');
          newCategoryText.innerHTML = data.text;
          categoryHeading.parentNode.appendChild(newCategoryText);
        }
        if (categoryImage) {
          categoryImage.style = `background-image: url(${data.image})`;
        }
      }
    }
  });
  // AMEND

  const hotelLink = document.querySelector('#hospitality .children .business_subsection_COLUMN a');
  if (window.location.href.indexOf('/it/') > -1) {
    hotelLink.setAttribute('href', 'https://www.technogym.com/it/hotel-business-solution/');
  } else {
    hotelLink.setAttribute('href', 'https://www.technogym.com/gb/hotel-business-solution/');
  }
};
