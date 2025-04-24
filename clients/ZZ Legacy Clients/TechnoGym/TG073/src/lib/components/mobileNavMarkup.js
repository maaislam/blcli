import settings from '../settings';
import mobileNavFunctionality from './mobileNavFunctionality';
// import categoryContent from './innerCategories';
// import businessFunctionality from './businessFunctionality';

export default () => {
  const id = settings.ID;
  const mobileBusinessNav =
    `<li class="${id}-nav_link ${id}-collapsable"> 
      <a class="${id}-level1_link" href="#">For your business</a>
        <div class="${id}_mobile_Navigation-level2">
          <div class="${id}-business_categories ${id}_level2">
            <h3>Fitness Facilities</h3>
            <ul class="${id}-level3">
              <li><a href="/fitness-facilities-premium-solution/">Premium Solution</a></li>
              <li><a href="/fitness-facilities-prestige-solution/">Prestige Solution</a></li>
            </ul>
          </div>
          
          <div class="${id}-business_categories ${id}_level2">
            <h3>Hospitality</h3>
            <ul class="${id}-level3">
              <li><a href="/hotel-business-solution/">Hotel</a></li>
              <li><a href="/business-solution/hotels-cruise-liners/">Cruises</a></li>
            </ul>
          </div>

          <div class="${id}-business_categories ${id}_level2">
            <h3>Residential</h3>
            <ul class="${id}-level3">
              <li><a href="/wellness-facilities/">Wellness Facilities</a></li>
              <li><a href="/wellness-spaces/">Wellness Spaces</a></li>
              <li><a href="/home-wellness-solutions/">In-Home Wellness</a></li>
            </ul>
          </div>

          <div class="${id}-business_categories ${id}_level2">
            <h3>Health</h3>
            <ul class="${id}-level3">
              <li><a href="/prevention/">Prevention</a></li>
              <li><a href="/rehabilitation/">Rehabilitation</a></li>
            </ul>
          </div>

          <div class="${id}-business_categories ${id}_level2">
            <h3>Workplace</h3>
            <ul class="${id}-level3">
              <li><a href="/corporate-wellness-programmes/">Corporate Wellness</a></li>
            </ul>
          </div>

          <div class="${id}-business_categories ${id}_level2">
            <h3>Performance</h3>
            <ul class="${id}-level3">
              <li><a href="/sports-associations/">Sports Associations</a></li>
              <li><a href="/fitness-solutions-school-university/">Schools and Universities</a></li>
              <li><a href="/uniformed-services/">Uniformed Services</a></li>
            </ul>
          </div>

        </div>
    </li>`;


  const TG058MobileNav = document.querySelector('.TG058-nav_link.TG058-collapsable:not(.first)');
  TG058MobileNav.insertAdjacentHTML('afterend', mobileBusinessNav);

  mobileNavFunctionality();

  // add the inner categories
  /* Object.keys(categoryContent).forEach((i) => {
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
  }); */

  // functionality
  // businessFunctionality();
};

