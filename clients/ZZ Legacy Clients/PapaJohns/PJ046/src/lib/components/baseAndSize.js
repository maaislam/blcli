import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';
import updateOrderSummary, { updateBaseInSummary, updateSizeInSummary } from './updateOrderSummary';
import state from '../state';

export default () => {
  /* Create the sections */
  const createSections = () => {
    const ingredientsPrice = document.querySelector('#ctl00_cphBody__objCustomise_upToppingsToAdd h1 span').innerText.trim().toLowerCase().replace('(single', 'Single').replace('double', 'Double').replace(' )', '');
    const sections = document.createElement('div');
    sections.classList.add('PJ046-option_section');
    sections.innerHTML = `
    <div class="PJ046-base_section">
      <h3 class="PJ046-tab_active">Base <span>(all of our bases come with cheese and tomato as standard)</span></h3>
      <div class="PJ046-bases PJ046-content_showing"></div>
    </div>
    <div class="PJ046-size_section">
      <h3>Size</h3>
      <div class="PJ046-sizes"></div>
    </div>
    <div class="PJ046-cheese_section">
      <h3>Cheese <span>${ingredientsPrice}</span></h3>
      <div class="PJ046-cheese"></div>
    </div>
    <div class="PJ046-toppings_section">
      <h3>Toppings <span>${ingredientsPrice}</span></h3>
      <div class="PJ046-toppings_categories hidden">
      
      <div class="PJ046-topping_category">
        <h3>Meat</h3>
        <div class="PJ046-titleIcon inactive"></div>
        <div class="PJ046-toppings" id='meat'>
        </div>
      </div>
      <div class="PJ046-topping_category">
        <h3>Fish</h3>
        <div class="PJ046-titleIcon inactive"></div>
        <div class="PJ046-toppings" id='fish'></div>
      </div>
      <div class="PJ046-topping_category">
        <h3>Vegetables</h3>
        <div class="PJ046-titleIcon inactive"></div>
        <div class="PJ046-toppings" id='vegetables'></div>
      </div>
      <div class="PJ046-topping_category">
        <h3>Other</h3>
        <div class="PJ046-titleIcon inactive"></div>
        <div class="PJ046-toppings" id='other'></div>
      </div>
      
      </div>
    </div>`;
    document.querySelector('.customisePizza').insertAdjacentElement('afterend', sections);
  };

  /* add the bases */
  const addBases = () => {
    const base = {
      original: {
        id: 'originalCrust',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5bb37e034cb211538489859.jpg',
        name: 'Original Crust',
      },
      authentic: {
        id: 'authenticThin',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5bb37df276f181538489842.jpg',
        name: 'Authentic Thin Crust',
      },
      stuffed: {
        id: 'stuffedCrust',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5bb37ddbb06021538489819.jpg',
        name: 'Stuffed Crust',
      },
    };

    Object.keys(base).forEach((i) => {
      const data = base[i];
      const baseOption = document.createElement('div');
      baseOption.classList.add('PJ046-option');
      baseOption.id = `PJ046-${data.id}`;
      baseOption.style = `background-image: url('${data.img}')`;
      baseOption.innerHTML = `<div class="PJ046-base_name">${data.name}</div>`;

      if (data.id === 'stuffedCrust') {
        baseOption.innerHTML = `<span class="PJ046-extra">+£2.50</span><div class="PJ046-base_name">${data.name}</div>`;
      } else {
        baseOption.innerHTML = `<div class="PJ046-base_name">${data.name}</div>`;
      }

      document.querySelector('.PJ046-bases').appendChild(baseOption);
    });
  };
  const addSizes = () => {
    /* Add the sizes */
    const sizes = {
      small: {
        id: 'S',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5bb384c7bd02a1538491591.png',
        name: 'Small',
      },
      medium: {
        id: 'M',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5bb384b9662ee1538491577.png',
        name: 'Medium',
      },
      large: {
        id: 'L',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5bb384998a3111538491545.png',
        name: 'Large',
      },
      XXL: {
        id: 'XXL',
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5c504c57939a81548766295.png',
        name: 'XXL',
      },
    };

    Object.keys(sizes).forEach((i) => {
      const sizeData = sizes[i];
      const sizeBlock = document.createElement('div');
      sizeBlock.classList.add('PJ046-size_option');
      sizeBlock.id = `PJ046-${sizeData.id}`;
      sizeBlock.style = `background-image: url('${sizeData.img}')`;
      sizeBlock.innerHTML = `<div class="PJ046-size_name">${sizeData.name}</div>`;

      document.querySelector('.PJ046-sizes').appendChild(sizeBlock);
    });
  };

  createSections();
  addBases();
  addSizes();

  /* On click of base option */
  const selectBase = () => {
    const baseMap = {
      'PJ046-originalCrust': ['PJ046-S', 'PJ046-M', 'PJ046-L', 'PJ046-XXL'],
      'PJ046-authenticThin': ['PJ046-M', 'PJ046-L', 'PJ046-XXL'],
      'PJ046-stuffedCrust': ['PJ046-M', 'PJ046-L', 'PJ046-XXL'],
    };

    const allBases = document.querySelectorAll('.PJ046-bases .PJ046-option');
    const sizeHeading = document.querySelector('.PJ046-size_section h3');
    const sizeOptions = document.querySelector('.PJ046-sizes');

    const orderSummaryBase = document.querySelectorAll('.PJ046-base');

    for (let index = 0; index < allBases.length; index += 1) {
      const element = allBases[index];
      element.addEventListener('click', (e) => {
        events.send('PJ046', 'did-click-base-option');

        // remove active if any are
        [].forEach.call(allBases, (item) => {
          item.classList.remove('PJ046-base_active');
        });
        // make current active
        e.currentTarget.classList.add('PJ046-base_active');
        const chosenBase = e.currentTarget.querySelector('.PJ046-base_name').textContent;
        // add the chose base text to the order summary
        for (let i = 0; i < orderSummaryBase.length; i += 1) {
          const baseText = orderSummaryBase[i];
          baseText.querySelector('span').textContent = chosenBase;
        }

        updateBaseInSummary(chosenBase);

        // loop through map, add class to invalid sizes
        Object.keys(baseMap).forEach((i) => {
          const data = baseMap[i];
          if ([i][0] === e.currentTarget.id) {
            const validSizes = data;
            [].forEach.call(document.querySelectorAll('.PJ046-size_option'), (item) => {
              if (validSizes.indexOf(item.id) === -1) {
                item.classList.add('PJ046-size_invalid');

                updateSizeInSummary('');

                if (item.classList.contains('PJ046-size_active')) {
                  item.classList.remove('PJ046-size_active');
                }
              } else {
                item.classList.remove('PJ046-size_invalid');
              }
            });
          }
        });
        // events.send('PJ047', 'clicked', `Base section: ${chosenBase}`);

        sizeHeading.classList.add('PJ046-tab_active');
        sizeOptions.classList.add('PJ046-content_showing');
        const sizeHeadingOnPage = sizeHeading.getBoundingClientRect().y + window.scrollY;
        scrollTo(sizeHeadingOnPage);
        // Update - User chose base
        state.baseChosen = true;
      });
    }
  };

  /* On click of base option */
  const selectSize = () => {
    const openSecond = () => {
      /* eslint-disable */
      setTimeout(()=> {
        javascript:__doPostBack('ctl00$cphBody$_objHalfAndHalf$lbHalf2Header','');
      },500);
      /* eslint-enable */
    };

    const allSizes = document.querySelectorAll('.PJ046-size_option');
    const sizeTextSummary = document.querySelectorAll('.PJ046-size');

    for (let i = 0; i < allSizes.length; i += 1) {
      const element = allSizes[i];
      element.addEventListener('click', (e) => {
        if(e.currentTarget.classList.contains('PJ046-size_invalid')) {
          // Invalid sizes are greyed out and we don't want to allow their
          // selection - returning here locks them to that step
          return;
        }

        events.send('PJ046', 'did-click-size-option');
        // remove active if any are
        [].forEach.call(allSizes, (item) => {
          item.classList.remove('PJ046-size_active');
        });
        // make current active
        if (!e.currentTarget.classList.contains('PJ046-size_invalid')) {
          e.currentTarget.classList.add('PJ046-size_active');
          const activeSizeText = e.currentTarget.querySelector('.PJ046-size_name').textContent;
          // get the active size/base click
          const activeSize = document.querySelector('.PJ046-size_active').id.replace('PJ046-', '');
          const activeBase = document.querySelector('.PJ046-base_active .PJ046-base_name').textContent;

          const pizzasHeading = document.querySelector('.PJ046-pizzas h3');
          const pizzaOptions = document.querySelector('.PJ046-pizza_section');
          // Click the hidden size/base that matches the new ones
          const hiddenSizes = document.querySelectorAll('.menuItems .selectCrust .crustSize .greenButton');
          [].forEach.call(hiddenSizes, (item) => {
            const itemName = item.parentNode.querySelector('.crustName').textContent.trim();
            const itemSize = item.textContent.trim();
            if (itemName === activeBase) {
              // get the item that matches the active size text and click
              if (itemSize === activeSize) {
                item.click();
                openSecond();

                pizzasHeading.classList.add('PJ046-pizzas_heading_active');
                pizzaOptions.classList.add('PJ046-pizzas_showing');
                // add the active size text in the summary box
                for (let j = 0; j < sizeTextSummary.length; j += 1) {
                  const summarySizeText = sizeTextSummary[j];
                  summarySizeText.querySelector('span').textContent = activeSizeText;
                }
              }
            }
          });

          const selectedSize = e.currentTarget.querySelector('.PJ046-size_name').textContent;
          let baseSelected = '';
          let stuffedCrust = false;

          switch(activeBase) {
            case 'Original Crust':
              baseSelected = 'Original';
              break;
            case 'Authentic Thin Crust':
              baseSelected = 'Thin Crust';
              break;
            case 'Stuffed Crust':
              baseSelected = 'Original';
              stuffedCrust = true;  
              break;
          }
          const selectedPizza = `${baseSelected}, ${selectedSize}`;
          const sel = document.querySelector('select#ctl00_cphBody__objCustomise_ddlVariations');
          const pizzaSelectOptions = sel.options;
          // const stuffedCrustCheckbox = document.querySelector('.characteristics span.stuffedCrust span.cssCheckbox');
          let stuffedCrustCheckbox = null;

          // Select Pizza Option in the background
          [].forEach.call(pizzaSelectOptions, (pizza) => {
            let selectedPizzaIndex = '';
            if (pizza.textContent.trim().indexOf(`${selectedPizza}`) > -1 && !stuffedCrust) {
              selectedPizzaIndex = pizza.index;
              // Select the new pizza
              sel.selectedIndex = selectedPizzaIndex;
              sel.dispatchEvent(new Event('change'));
              // If Stuffed Crust checked, uncheck
              pollerLite(['.characteristics span.stuffedCrust span.cssCheckbox input'], () => {
                stuffedCrustCheckbox = document.querySelector('.characteristics span.stuffedCrust span.cssCheckbox');
                if (stuffedCrustCheckbox.querySelector('input').checked && baseSelected === 'Original') {
                  document.querySelector('.characteristics span.stuffedCrust span.cssCheckbox input').checked = false;
                }
              });
            } else if (pizza.textContent.trim().indexOf(`${selectedPizza}`) > -1 && stuffedCrust) {
              selectedPizzaIndex = pizza.index;
              // Force Select for the new pizza
              sel.selectedIndex = selectedPizzaIndex;
              sel.dispatchEvent(new Event('change'));
              // Check Stuffed Crust
              pollerLite(['.characteristics span.stuffedCrust span.cssCheckbox input'], () => {
                stuffedCrustCheckbox = document.querySelector('.characteristics span.stuffedCrust span.cssCheckbox');
                if (stuffedCrustCheckbox) {
                  const stuffedCrustCheckboxInput = stuffedCrustCheckbox.querySelector('input');
                  if (stuffedCrustCheckboxInput) {
                    if (stuffedCrustCheckboxInput.checked) {
                      document.querySelector('.characteristics span.stuffedCrust span.cssCheckbox input').checked = true;
                    } else if (!stuffedCrustCheckboxInput.checked) {
                      pollerLite(['.characteristics span.stuffedCrust span.cssCheckbox input'], () => {
                        document.querySelector('.characteristics span.stuffedCrust span.cssCheckbox input').checked = true;
                      });
                    }
                    
                  }
                }
              });
            }
          });
        }

        const cheeseSection = document.querySelector('.PJ046-cheese_section');
        const cheeseHeading = cheeseSection.querySelector('h3');
        const cheeseHeadingOnPage = cheeseHeading.getBoundingClientRect().y + window.scrollY;
        // Show Cheese Options
        cheeseHeading.classList.add('PJ046-tab_active');
        cheeseSection.querySelector('.PJ046-extraCheese.extraCheese').classList.add('PJ046-content_showing');
        cheeseSection.querySelector('.PJ046-extraCheese.noCheese').classList.add('PJ046-content_showing');
        // Show Toppings
        const toppingsCategories = document.querySelector('.PJ046-toppings_categories');
        if (toppingsCategories) {
          toppingsCategories.classList.remove('hidden');
        }
        scrollTo(cheeseHeadingOnPage);

        // Update - User chose size
        state.sizeChosen = true;
      });
    }
  };

  selectBase();
  selectSize();

  observer.connect([document.querySelector('#ctl00_cphBody__objCustomise_upToppingsToAdd'), document.querySelector('select#ctl00_cphBody__objCustomise_ddlVariations')], () => {
    // Update Topping Price 
    const ingredientsPrice = document.querySelector('#ctl00_cphBody__objCustomise_upToppingsToAdd h1 span').innerText.trim().toLowerCase().replace('(single', 'Single').replace('double', 'Double').replace(' )', '');
    const cheeseSectionPrice = document.querySelector('.PJ046-cheese_section h3 span');
    if (cheeseSectionPrice) {
      cheeseSectionPrice.innerText = ingredientsPrice;
    }
    const toppingsSectionPrice = document.querySelector('.PJ046-toppings_section h3 span');
    if (toppingsSectionPrice) {
      toppingsSectionPrice.innerText = ingredientsPrice;
    }
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
    },
  });
};

