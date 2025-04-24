import { events, scrollTo } from '../../../../../lib/utils';

export default () => {
  /* Create the sections */
  const createSections = () => {
    const sections = document.createElement('div');
    sections.classList.add('PJ047-option_section');
    sections.innerHTML = `
    <div class="PJ047-base_section">
      <h3 class="PJ047-tab_active">Base <span>(all of our bases come with cheese and tomato as standard)</span></h3>
      <div class="PJ047-bases PJ047-content_showing"></div>
    </div>
    <div class="PJ047-size_section">
      <h3>Size</h3>
      <div class="PJ047-sizes"></div>
    </div>`;
    document.querySelector('.selectBase').insertAdjacentElement('afterend', sections);
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
      baseOption.classList.add('PJ047-option');
      baseOption.id = `PJ047-${data.id}`;
      baseOption.style = `background-image: url('${data.img}')`;
      baseOption.innerHTML = `<div class="PJ047-base_name">${data.name}</div>`;

      if (data.id === 'stuffedCrust') {
        baseOption.innerHTML = `<span class="PJ047-extra">+£2.50</span><div class="PJ047-base_name">${data.name}</div>`;
      } else {
        baseOption.innerHTML = `<div class="PJ047-base_name">${data.name}</div>`;
      }

      document.querySelector('.PJ047-bases').appendChild(baseOption);
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
        img: 'https://dp8v87cz8a7qa.cloudfront.net/43831/5bb384ab3e8601538491563.png',
        name: 'XXL',
      },
    };

    Object.keys(sizes).forEach((i) => {
      const sizeData = sizes[i];
      const sizeBlock = document.createElement('div');
      sizeBlock.classList.add('PJ047-size_option');
      sizeBlock.id = `PJ047-${sizeData.id}`;
      sizeBlock.style = `background-image: url('${sizeData.img}')`;
      sizeBlock.innerHTML = `<div class="PJ047-size_name">${sizeData.name}</div>`;

      document.querySelector('.PJ047-sizes').appendChild(sizeBlock);
    });
  };

  createSections();
  addBases();
  addSizes();

  /* On click of base option */
  const selectBase = () => {
    const baseMap = {
      'PJ047-originalCrust': ['PJ047-S', 'PJ047-M', 'PJ047-L', 'PJ047-XXL'],
      'PJ047-authenticThin': ['PJ047-M', 'PJ047-L', 'PJ047-XXL'],
      'PJ047-stuffedCrust': ['PJ047-M', 'PJ047-L', 'PJ047-XXL'],
    };

    const allBases = document.querySelectorAll('.PJ047-bases .PJ047-option');
    const sizeHeading = document.querySelector('.PJ047-size_section h3');
    const sizeOptions = document.querySelector('.PJ047-sizes');

    const orderSummaryBase = document.querySelectorAll('.PJ047-base');

    for (let index = 0; index < allBases.length; index += 1) {
      const element = allBases[index];
      element.addEventListener('click', (e) => {
        // remove active if any are
        [].forEach.call(allBases, (item) => {
          item.classList.remove('PJ047-base_active');
        });
        // make current active
        e.currentTarget.classList.add('PJ047-base_active');
        const chosenBase = e.currentTarget.querySelector('.PJ047-base_name').textContent;
        // add the chose base text to the order summary
        for (let i = 0; i < orderSummaryBase.length; i += 1) {
          const baseText = orderSummaryBase[i];
          baseText.querySelector('span').textContent = chosenBase;
        }

        // loop through map, add class to invalid sizes
        Object.keys(baseMap).forEach((i) => {
          const data = baseMap[i];
          if ([i][0] === e.currentTarget.id) {
            const validSizes = data;
            [].forEach.call(document.querySelectorAll('.PJ047-size_option'), (item) => {
              if (validSizes.indexOf(item.id) === -1) {
                item.classList.add('PJ047-size_invalid');

                // if base is changed and size is ivalid, remove pizza section
                document.querySelector('.PJ047-pizzas h3').classList.remove('PJ047-pizzas_heading_active');
                document.querySelector('.PJ047-pizza_section').classList.remove('PJ047-pizzas_showing');

                document.querySelector('.PJ047-size span').textContent = '';
                document.querySelector('.PJ047-order_summary:last-of-type .PJ047-size span').textContent = '';
                document.querySelector('.PJ047-addToBag').classList.remove('PJ047_cta_show');
                document.querySelector('.PJ047-order_summary:last-of-type .PJ047-addToBag').classList.remove('PJ047_cta_show');
                if (document.querySelector('.PJ047-size_option.PJ047-size_active')) {
                  document.querySelector('.PJ047-size_option.PJ047-size_active').classList.remove('PJ047-size_active');
                }
                if (item.classList.contains('PJ047-size_active')) {
                  item.classList.remove('PJ047-size_active');
                }
              } else {
                item.classList.remove('PJ047-size_invalid');
              }
            });
          }
        });
        events.send('PJ047', 'clicked', `Base section: ${chosenBase}`);

        sizeHeading.classList.add('PJ047-tab_active');
        sizeOptions.classList.add('PJ047-content_showing');
        const sizeHeadingOnPage = sizeHeading.getBoundingClientRect().y + window.scrollY;
        scrollTo(sizeHeadingOnPage);
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

    const allSizes = document.querySelectorAll('.PJ047-size_option');
    const sizeTextSummary = document.querySelectorAll('.PJ047-size');
    for (let i = 0; i < allSizes.length; i += 1) {
      const element = allSizes[i];
      element.addEventListener('click', (e) => {
        // remove active if any are
        [].forEach.call(allSizes, (item) => {
          item.classList.remove('PJ047-size_active');
        });
        // make current active
        if (!e.currentTarget.classList.contains('PJ047-size_invalid')) {
          e.currentTarget.classList.add('PJ047-size_active');
          const activeSizeText = e.currentTarget.querySelector('.PJ047-size_name').textContent;
          // get the active size/base click
          const activeSize = document.querySelector('.PJ047-size_active').id.replace('PJ047-', '');
          const activeBase = document.querySelector('.PJ047-base_active .PJ047-base_name').textContent;

          const pizzasHeading = document.querySelector('.PJ047-pizzas h3');
          const pizzaOptions = document.querySelector('.PJ047-pizza_section');
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
                pizzasHeading.classList.add('PJ047-pizzas_heading_active');
                pizzaOptions.classList.add('PJ047-pizzas_showing');
                // add the active size text in the summary box
                for (let j = 0; j < sizeTextSummary.length; j += 1) {
                  const summarySizeText = sizeTextSummary[j];
                  summarySizeText.querySelector('span').textContent = activeSizeText;
                }
              }
            }
          });
        }
        const selectedSize = e.currentTarget.querySelector('.PJ047-size_name').textContent;
        events.send('PJ047', 'clicked', `Size section: ${selectedSize}`);
      });
    }
  };

  selectBase();
  selectSize();
};

