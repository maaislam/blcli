import { hardcodedNavData } from './hardcoded-nav-data';

/**
 * Get all the category data from the navigation and put in object 
 **/
export const getData = (functionThatParsesData) => {
    return functionThatParsesData();
}

export const getDataFromNavDynamically = () => {
    const navigationResults = {};

    const firstMenuItem = document.querySelector('.topLevelMenuListItem');
    const listItems = firstMenuItem.querySelectorAll('.departmentMenuListItem');
    listItems.forEach((listItem) => {
        const link1 = listItem.querySelector('[id^=departmentLink_]');
        const categoryList = listItem.querySelector('#catergoryList');
        if (categoryList) {
            const catItems = categoryList.querySelectorAll('.categoryMenuListItem')
            catItems.forEach((catItem) => {
                const link2 = catItem.querySelector('[id^=categoryLink_]');
                const subcategoryList = catItem.querySelector('.subcategoryList');
                if (subcategoryList) {
                    const subcatItems = subcategoryList.querySelectorAll('li');
           
                    subcatItems.forEach((subcatItem) => {

                     
                        //const link3 = subcatItem.querySelector('[id^=subcategoryLink_]');
                        const link3 = subcatItem.querySelector('[id^= categoryLink_]');
           

                        if (link3) {
                            const finalLink = link3.getAttribute('href');
                            if (finalLink) {
                                const department = link1.innerText.trim();
                                const departmentCat = link2.innerText.trim();
                                const subCat = link3.innerText.trim();


                     
                                if (!navigationResults[department]) {
                                    navigationResults[department] = {};
                                }
                                if (!navigationResults[department][departmentCat]) {
                                    navigationResults[department][departmentCat] = {};
                                }
                                if (!navigationResults[department][departmentCat][subCat]) {
                                    navigationResults[department][departmentCat][subCat] = {};
                                }
                                navigationResults[department][departmentCat][subCat] = finalLink;

                            }
                        }
                    });
                }
            });
        }
    });
    return navigationResults;
};

export const getDataFromNav = () => {
  return JSON.parse(hardcodedNavData);
};

export const getOffersData = () => {
    const navigationResults = {};

    const offersLink = document.querySelector('[name="Supermenu:Offers"]');
    if(offersLink) {
      const firstMenuItem = offersLink.parentElement;
      const listItems = firstMenuItem.querySelectorAll('.departmentMenuListItem');

      listItems.forEach((listItem) => {
          const link1 = listItem.querySelector('[id^=departmentLink_]');
          if(link1.innerText.trim().toLowerCase() == 'offers') {
            return;
          }

          const categoryList = listItem.querySelector('#catergoryList');

          if (categoryList) {
              const catItems = categoryList.querySelectorAll('.categoryMenuListItem')
              catItems.forEach((catItem) => {
                  const link2 = catItem.querySelector('[id^=categoryLink_]');
                  if(link2) {
                    const subcategoryList = catItem.querySelector('.subcategoryList');

                    // Now decide whether we have a 3rd level
                    const department = 'Offers';
                    const departmentCat = link1.innerText.trim();
                    let subCat = link2.innerText.trim();
                    let finalLink = link2.getAttribute('href');

                    if (subcategoryList) {
                        const link3 = subcategoryList.querySelector('[id^=categoryLink_]'); // the first one

                        subCat = link3.innerText.trim().replace('visit', '').trim();
                        finalLink = link3.getAttribute('href');
                    }

                    if (!navigationResults[department]) {
                        navigationResults[department] = {};
                    }
                    if (!navigationResults[department][departmentCat]) {
                        navigationResults[department][departmentCat] = {};
                    }
                    if (!navigationResults[department][departmentCat][subCat]) {
                        navigationResults[department][departmentCat][subCat] = {};
                    }
                    navigationResults[department][departmentCat][subCat] = finalLink;
                  }
              });
          }
      });
    }

    return navigationResults;
};

export const getPremiumBeautyData = () => {
  return {
    'premium beauty': {
      'stay-home and gifts': {
        'stay-home saviours': '/beauty/luxury-beauty-skincare/luxury-stay-home-saviours',
        'premium beauty gifts': '/beauty/luxury-beauty-skincare/luxury-beauty-gift',
        'new in': '/beauty/luxury-beauty-skincare/new-in-luxury--1',
      },
      'skincare': {
        'premium skincare': '/beauty/luxury-beauty-skincare/all-luxury-skincare',
      },
      'makeup': {
        'premium makeup': '/beauty/luxury-beauty-skincare/luxury-beauty-makeup',
        'premium makeup tools': '/beauty/luxury-beauty-skincare/luxury-makeup-tools',
      },
      'hair': {
        'premium hair': '/beauty/luxury-beauty-skincare/luxury-beauty-hair',
      },
      'for men': {
        "men's premium beauty": '/beauty/luxury-beauty-skincare/luxury-beauty-men',
      },
    }
  };
}
