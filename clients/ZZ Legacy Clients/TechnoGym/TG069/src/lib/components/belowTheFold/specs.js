import { __, getLanguage } from '../../helpers';
export default () => {
  const specificationContainer = document.querySelector('.TG069-specification');
  specificationContainer.innerHTML =
  `<h2>${__('Specifications')}</h2> 
  <div class="TG069-sectionTabs"> 
  <div class="TG069-tab TG069-specifications TG069-tab_active" data-target="#TG069-specs"><span>${__('Technical Specifications')}</span></div>
    <div class="TG069-tab TG069-summary" data-target="#TG069-features"><span>${__('MYRUN In Summary')}</span></div>
  </div>
  <div id="TG069-specs" class="TG069-specifications_section TG069-tab_section TG069-tab-section_active">
    <div class="TG069-specifications_content TG069-container">
    </div>
  </div>
  <div id="TG069-features" class="TG069-summary_section TG069-tab_section"></div>
  `;

  const addSpecifications = () => {
    const specifications = {
      [`${__('Length (mm | in)')}`]: '1760 &#124; 69.3',
      [`${__('Running Surface (Length mm | in)')}`]: '1430 &#124; 56.3',
      [`${__('Max Speed (km/h | mph)')}`]: '20 &#124; 12.4',
      [`${__('Width (mm | in)')}`]: '785 &#124; 30.9',
      [`${__('Running Surface (Width) (mm | in)')}`]: '500 &#124; 19.7',
      [`${__('Incline (Min)')}`]: '0%',
      [`${__('Height (mm | in)')}`]: '1260 &#124; 49.6',
      [`${__('Motor power continuous duty')}`]: '220 V-2.5 HP / 110V - 3.0 HP',
      [`${__('Incline (Max)')}`]: 'Inline 12%',
      [`${__('Weight (kg | Ibs)')}`]: '92 &#124; 202.8',
      [`${__('Min Speed (km/h | mph)')}`]: '0.8 &#124; 0.5',
      [`${__('Running surface height above ground (mm | in)')}`]: '170mm &#124; 6.7in',
    };

    const specTab = document.querySelector('.TG069-specifications_content');

    Object.keys(specifications).forEach((i) => {
      const data = specifications[i];
      const spec = document.createElement('div');
      spec.classList.add('TG069-specification_item');
      spec.innerHTML = `<span>${[i][0]}</span><p>${data}</p>`;
      specTab.appendChild(spec);
    });


    // add the text in to the myRun summary
    const seoText = document.querySelector('#seo_cnt');
    document.querySelector('.TG069-summary_section').appendChild(seoText);
  };
  addSpecifications();

  /* tab functionality */
  const toggleTabs = () => {
    const tabHeadings = document.querySelectorAll('.TG069-tab');

    const handleClick = (e) => {
      e.preventDefault();
      const active = document.querySelector('.TG069-tab_active');
      const activeTabSection = document.querySelector('.TG069-tab-section_active');

      if (active) {
        active.classList.remove('TG069-tab_active');
      }
      e.currentTarget.classList.add('TG069-tab_active');

      // show hide active tabs
      if (activeTabSection) {
        activeTabSection.classList.remove('TG069-tab-section_active');
      }

      const matchingElm = e.currentTarget.getAttribute('data-target');
      const matchingSection = document.querySelector(matchingElm);
      matchingSection.classList.add('TG069-tab-section_active');
    };

    // on click of each tab
    tabHeadings.forEach((node) => {
      node.addEventListener('click', handleClick);
    });
  };
  toggleTabs();
};
