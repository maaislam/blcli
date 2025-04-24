/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const getBrandInfo = () => {

    const brandData = document.querySelector('meta[property="og:brand"]');
    let brandButtons;
    const brands = {
      'Star Wars': {
        link: '/brand/star-wars',
      },
      'Marvel': {
        link: '/brand/marvel',
      },
      'Spider-Man': {
        link: '/brand/spiderman',
        parentName: 'Marvel',
        parentLink: '/brand/marvel',
      },
      'Captain America': {
        link: '/brand/captain-america',
        parentName: 'Marvel',
        parentLink: '/brand/marvel',
      },
      'Black Panther': {
        link: '/brand/black-panther',
        parentName: 'Marvel',
        parentLink: '/brand/marvel',
      },
      'Thor': {
        link: '/brand/thor',
        parentName: 'Marvel',
        parentLink: '/brand/marvel',
      },
      'Venom': {
        link: '/brand/spiderman',
        parentName: 'Marvel',
        parentLink: '/brand/marvel',
      },
      'Captain Marvel': {
        link: '/brand/marvel',
       },
      'Avengers': {
        link: '/brand/the-avengers',
        parentName: 'Marvel',
        parentLink: '/brand/marvel',
      },
      'Deadpool': {
        link: '/brand/deadpool',
        parentName: 'Marvel',
        parentLink: '/brand/marvel',
      },
      'DC Comics': {
        link: '/brand/dc-comics',
      },
      'Superman': {
        link: '/brand/dc-comics-superman',
        parentName: 'DC Comics',
        parentLink: '/brand/dc-comics',
      },
      'Batman': {
        link: '/brand/dc-comics-batman',
        parentName: 'DC Comics',
        parentLink: '/brand/dc-comics',
      },
      'The Flash': {
        link: '/brand/the-flash',
        parentName: 'DC Comics',
        parentLink: '/brand/dc-comics',
      },
      'Wonder Woman': {
        link: '/brand/dc-comics-wonder-woman',
        parentName: 'DC Comics',
        parentLink: '/brand/dc-comics',
      },
      'Aquaman': {
        link: '/brand/aquaman',
        parentName: 'DC Comics',
        parentLink: '/brand/dc-comics',
      },
      'Harley Quinn': {
        link: '/brand/harley-quinn',
        parentName: 'DC Comics',
        parentLink: '/brand/dc-comics',
      },
      'Joker': {
        link: '/brand/joker',
        parentName: 'DC Comics',
        parentLink: '/brand/dc-comics',
      },
      'Game of Thrones': {
        link: '/brand/game-of-thrones',
      },
      
      'Harry Potter': {
        link: '/brand/harry-potter',
      },
      'Disney': {
        link: '/brand/disney',
      },
      'Warhammer 40': {
        name: 'Warhammer 40,000',
        link: '/brand/warhammer-40000',
      },
      'Xbox': {
        link: '/brand/xbox',
      },
      'Pac Man': {
        link: '/brand/pac-man',
      },
      'Legend of Zelda': {
        link: '/brand/nintendo-legend-of-zelda',
        parentName: 'Nintendo',
        parentLink: '/brand/nintendo-original',
      },
      'Friends': {
        link: '/brand/friends',
      },
      'Rick and Morty': {
        link: '/brand/rick-and-morty',
      },
      'Jurassic Park': {
        link: '/brand/jurassic-park',
      },
    }

    if(brandData) {
      Object.keys(brands).forEach((i) => {
        const data = brands[i];
        if(document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/)[0] === [i][0]) {
          brandButtons = `
          <a class="${ID}-similiarButton" href="${data.link}"><span>All ${data.name ? data.name : [i][0]}</span></a>
          ${data.parentName ? ` <a class="${ID}-similiarButton" href="${data.parentLink}"><span>All ${data.parentName}</span></a>` : ''}
          `
        }
      });
      return brandButtons;
    }
  }


  const createSimiliarSection = () => {

    const categoryLinks = {
      'T-Shirts and Tops': '/t-shirts-and-tops/',
      'Hoodies and Sweatshirts': '/hoodies-and-sweatshirts/',
      'Hoodies, Sweatshirts & Jumpers': '/hoodies-and-sweatshirts/',
      'Accessories': '/accessories/',
      'Bags': '/bags/',
      'Hats': '/hats/',
      'Jackets and Outerwear': '/jackets-and-outerwear/',
      'Nightwear and Pyjamas': '/nightwear-and-pyjamas/',
      'Trousers and Bottoms': '/trousers-and-bottoms/',
      'Home and Office': '/home-and-office/',
      'Toys, Figures and Plushies': '/toys-figures-and-plushies/',
      'Gadgets': '/gadgets/'
    }

    const getCategory = () => {
      const category = window.dataLayer[0].google_tag_params["ecomm_category"];
      if(category) {
        let catName;
        
        if(category.match(/[^(\/)]*/) && category.match(/[^(\/)]*/)[0]) {
          catName = category.match(/[^(\/)]*/)[0]
        
        } else {
          catName = category;
        }
  
        
        return catName;
      }
    }
  
    const getCategoryLink = () => {
      let catLink;
      if(categoryLinks[getCategory()]) {
        catLink = categoryLinks[getCategory()];
        return catLink;
      }
    }
  
    // get category
    /*let category;
    let categoryLink;
    if(document.querySelector('.breadcrumbs .item:nth-child(3)')) {
      category = document.querySelector('.breadcrumbs .item:nth-child(3)').textContent.trim();
      categoryLink = document.querySelector('.breadcrumbs .item:nth-child(3) a').getAttribute('href');
    }

    // get parent category
    let parentCategory;
    let parentCategoryLink;
    if(document.querySelector('.breadcrumbs .item:nth-child(2)')) {
      parentCategory = document.querySelector('.breadcrumbs .item:nth-child(2)').textContent.trim();
      parentCategoryLink = document.querySelector('.breadcrumbs .item:nth-child(2) a').getAttribute('href');
    }*/

    //${parentCategory !== '' && parentCategoryLink !== '' ? `<a class="${ID}-similiarButton" href="${parentCategoryLink}"><span>All ${parentCategory}</span></a>` : ''}
    const similiarBlock = document.createElement('div');
    similiarBlock.classList.add(`${ID}-similiarBlock`);
    similiarBlock.innerHTML = `<div class="${ID}-wrap">
    <h3>See similar...</h3>
      <div class="${ID}-similiarItems">
        ${getBrandInfo()}        
        ${getCategory() !== '' && getCategoryLink() !== ''? `<a class="${ID}-similiarButton" href="${getCategoryLink()}"><span>All ${getCategory()}</span></a>` : ''}
        <a class="${ID}-similiarButton" href="/all-products?ucgender=6095"><span>All products for him</span></a>
        <a class="${ID}-similiarButton" href="/all-products?ucgender=6096"><span>All products for her</span></a>
      </div>
    </div>`;

    document.querySelector('#maincontent').insertAdjacentElement('afterend', similiarBlock);
  }


  const tracking = () => {
    const allButtons = document.querySelectorAll(`.${ID}-similiarButton`);
    if(allButtons) {
      for (let index = 0; index < allButtons.length; index += 1) {
        const element = allButtons[index]; 
        
        element.addEventListener('click', (e) => {
          const name = e.currentTarget.querySelector('span').textContent.trim();
          events.send(`${ID} variation: ${VARIATION}`, 'click', `See similiar: ${name}`);
        });
      }
    }
  }
  createSimiliarSection();
  tracking();
};
