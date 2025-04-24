import { getCategory } from "../helpers";
import shared from "../shared";

const { ID } = shared;

// create the top 3 filters

export const filterCategories = {
  'Watches': {
    'Gender': {
      filterTarget: '#refinement-recipient',
    },
    'Brand': {
      filterTarget: '#refinement-brand',
    },
    'Price': {},
  },
  'Rings' : {
    'Stone Shape': {
      filterTarget: '#refinement-stone-shape',
    },
    'Metal': {
      filterTarget: '#refinement-material',
    },
    'Price': {},
  },
  'Jewellery' : {
    'Gender': {
      filterTarget: '#refinement-recipient',
    },
    'Category': {
      filterTarget: '#refinement-category_jewellery',
    },
    'Price': {},
  }
}


// add classes to filters - from EJ021
export const addLogos = () => {
    const recipient = {
        'Her': {
          iconwatch: 'https://service.maxymiser.net/cm/images-us/1/1/2/BAD4E625821095BF15B6C58618B6516A1EB3943970093FB7C6CFCE43ACB64615/ernestjones-co-uk/EJ072---Headline-Filters/noun_Watch_212039.png',
          iconJewellery: 'https://service.maxymiser.net/cm/images-us/1/1/2/932C69ACF0D911FE52AD82A874B208B82648D4929BE93FBF80C6F196A2A956C0/ernestjones-co-uk/EJ072---Headline-Filters/woman.png',
          title: 'For Her',
        },
        'Him': {
          iconwatch: 'https://service.maxymiser.net/cm/images-us/1/1/2/603AF4ADDBDEAB212377A5446B21E0217342E002B7792D62AF7A5218B2A08D85/ernestjones-co-uk/EJ072---Headline-Filters/noun_Watch_2663308.png',
          iconJewellery: 'https://service.maxymiser.net/cm/images-us/1/1/2/EFEA4146BF1969389FEFF8B097A8A771698B55904809A49CEC49C00DAB82924A/ernestjones-co-uk/EJ072---Headline-Filters/man.png',
          title: 'For Him',
        },
        'Children': {
          iconwatch: 'https://service.maxymiser.net/cm/images-us/1/1/2/468FA639CCC6C3068F3F9E65E1FBEF2C66171BAFAA3420F02CADE63D9A15D4E0/ernestjones-co-uk/EJ072---Headline-Filters/noun_watchtime_3208558.png',
          iconJewellery: 'https://service.maxymiser.net/cm/images-us/1/1/2/A5E1A0CEAAFF2CE3E84082C6EBDBD385C08857D4EF09B8A638D53D29D8F71DF3/ernestjones-co-uk/EJ072---Headline-Filters/children.png',
          title: 'For Children',
        },
        'Rings': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/68EE467EACB75FC849C56642BFEC38184651303664970D4470DF042822E8CD3C/ernestjones-co-uk/EJ072---Headline-Filters/noun_Ring_2231491.png',
        },
        'Necklaces': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/410578AF41DF7D1F69373DA3D97D9C0F6B289D95D6BF436FE69E9034187AB1EE/ernestjones-co-uk/EJ072---Headline-Filters/noun_necklace_1271116.png',
        },
        'Earrings': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/179B4932D343BDC7FCA0EB3C70DE8993D00F8C068B2502CCC846000ACA7295BE/ernestjones-co-uk/EJ072---Headline-Filters/noun_Earrings_3270320.png',
        },
        'Bracelets': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/E0B5929DAD6D9125A62362F0E4080AEF07CD9585ECA36EE13C9756188B8CD3A9/ernestjones-co-uk/EJ072---Headline-Filters/noun_Jewellery_1125053.png',
        },
        'Bangles': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/9252217C9537DA37B3C0BE4BA3A222724C1C8827533E46B2C1C6F14C93253C14/ernestjones-co-uk/EJ072---Headline-Filters/noun_bangle_2175521.png',
        },
        'Beads & Charms': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/B297B05D2E7A9864E099EE8925132D10A75E0F544CD3EC82051945C49F6EF435/ernestjones-co-uk/EJ072---Headline-Filters/noun_necklace_2266669.png',
        },
        'Jewellery Sets': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/424ECBE4F91FE398550C3DA2B488665E7AAA5C2048566F8913DD123429E67CBC/ernestjones-co-uk/EJ072---Headline-Filters/noun_jewelryset_715633.png',
        },
        'Jewellery Boxes': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/113B9FD2849BF1611553196FC264E3F578E4B2C145A99906EA3EFB7306C2CE08/ernestjones-co-uk/EJ072---Headline-Filters/noun_Jewellerybox_1848389.png',
        },
        'Cleaning': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/E548DED502FAF5D7F0123B78E1019686DA71B7C743C54E1C72DD768350E328DC/ernestjones-co-uk/EJ072---Headline-Filters/noun_Clean_2549029.png',
        },
        'Body Jewellery': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/C97A7EF53C318D8C2329FF35C2E48DA60B4C6DEA43D65CEB27892D522128DB7C/ernestjones-co-uk/EJ072---Headline-Filters/noun_BellyPeircing_1848388.png',
        },
        'Brooches': {
          iconCat: 'https://service.maxymiser.net/cm/images-us/1/1/2/EC29BDBDDD5AD94E75B34C48C53DCCB83A27875B708496B6C3764012FBFBEA78/ernestjones-co-uk/EJ072---Headline-Filters/noun_brooch_2625935.png',
        },
    };

    const allFilters = document.querySelectorAll('.styled-checkbox.filters-panel__refinement-selector');
    for (let index = 0; index < allFilters.length; index += 1) {
        const element = allFilters[index];
        const elTitle = element.textContent.trim().replace(/\s(\()[\d]+(\))/gi, '');
        
        if (recipient[elTitle]) {
          
          const elementTitle = element.querySelector('.filters-panel__refinement-title');
          if(elementTitle) {
            if(recipient[elTitle].title) {
              elementTitle.textContent = recipient[elTitle].title;
            }
           
             // Add icons based on category
            const filterIcon = document.createElement('span');
            filterIcon.classList.add('filters-panel__swatch');

            if(recipient[elTitle].iconwatch && getCategory() === 'Watches') {
              filterIcon.innerHTML = `<div class="${ID}-icon" style="background-image:url('${recipient[elTitle].iconwatch}')"</div>`;
            } 
            if(recipient[elTitle].iconJewellery && getCategory() === 'Jewellery') {
              filterIcon.innerHTML = `<div class="${ID}-icon" style="background-image:url('${recipient[elTitle].iconJewellery}')"</div>`;
            }
            if(recipient[elTitle].iconCat && getCategory() === 'Jewellery') {
              filterIcon.innerHTML = `<div class="${ID}-icon" style="background-image:url('${recipient[elTitle].iconCat}')"</div>`;
            }

            elementTitle.insertAdjacentElement('afterend', filterIcon);
          }
        }
    }
};


