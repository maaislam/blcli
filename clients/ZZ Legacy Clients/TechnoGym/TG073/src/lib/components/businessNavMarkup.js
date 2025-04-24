import settings from '../settings';
import categoryContent from './innerCategories';
import businessFunctionality from './businessFunctionality';

export default () => {
  const id = settings.ID;
  const businessNav =
    `<div class="${id}-topnav_link"> 
      <a href="#"><span>For your business</span></a>
        <div class="${id}-level1 ${id}-business">
          <div class="children">
          <div class="${id}-business_categories_wrapper">
            <div class="${id}-business_category ${id}-fitness-cat" cat-target="${id}-fitness">
              <span>Fitness Facilites</span>
            </div>
            <div class="${id}-business_category ${id}-hospitality-cat" cat-target="${id}-hospitality">
              <span>Hospitality</span>
            </div>
            <div class="${id}-business_category ${id}-residential-cat" cat-target="${id}-residential">
              <span>Residential</span>
            </div>
            <div class="${id}-business_category ${id}-health-cat" cat-target="${id}-health">
              <span>Health</span>
            </div>
            <div class="${id}-business_category ${id}-workplace-cat" cat-target="${id}-workplace">
              <span>Workplace</span>
            </div>
            <div class="${id}-business_category ${id}-performance-cat" cat-target="${id}-performance">
              <span>Performance</span>
            </div>
          </div>
          <div class="${id}-business_categories_inner"></div>
          </div>
        </div>
      </div>`;


  const TG058Nav = document.querySelector('.TG058-new_nav');
  TG058Nav.insertAdjacentHTML('beforeend', businessNav);

  // add the inner categories
  Object.keys(categoryContent).forEach((i) => {
    const data = categoryContent[i];
    const innerCategory = document.createElement('div');
    innerCategory.classList.add(`${id}-business_level2`);
    innerCategory.classList.add(`${id}-${[i]}`);

    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const innerItem = document.createElement('div');
      innerItem.classList.add(`${id}-business_content-section`);
      innerItem.innerHTML = `
      <a href="${element.link}">
        <div class="${id}-category_image" style="background-image:url('${element.image}')"></div>
        <div class="${id}-category_text">
          <h3>${element.title}</h3>
          <p>${element.innerText}</p>
        </div>
      </a>
      `;
      innerCategory.appendChild(innerItem);
    }
    document.querySelector(`.${id}-business_categories_inner`).appendChild(innerCategory);
  });

  // functionality
  businessFunctionality();
};

