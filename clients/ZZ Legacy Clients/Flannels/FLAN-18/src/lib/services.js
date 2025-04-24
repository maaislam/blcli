import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const categoryJSON = () => {

	let catJSON = [
		{
			"brand": "Gucci",
			"category_1": "Trainers",
			"url_1": "/gucci#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_2": "Belts",
			"url_2": "https://www.flannels.com/gucci/accessories/belts",
			"category_3": "Bags",
			"url_3": "https://www.flannels.com/gucci#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls",
			"category_4": "T-Shirts",
			"url_4": "https://www.flannels.com/gucci#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts"
		},
		{
			"brand": "Balenciaga",
			"category_1": "Trainers",
			"url_1": "https://www.flannels.com/balenciaga#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_2": "Sweatshirts",
			"url_2": "https://www.flannels.com/balenciaga#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_3": "Bags",
			"url_3": "https://www.flannels.com/balenciaga#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls",
			"category_4": "T-Shirts",
			"url_4": "https://www.flannels.com/balenciaga#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts"
		},
		{
			"brand": "Canada goose",
			"category_1": "Jackets",
			"url_1": "https://www.flannels.com/canada-goose#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJackets",
			"category_2": "Hats",
			"url_2": "https://www.flannels.com/canada-goose#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHeadwear",
			"category_3": "Sweatshirts",
			"url_3": "https://www.flannels.com/canada-goose#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_4": "Knitwear",
			"url_4": "https://www.flannels.com/canada-goose#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EKnitwear"
		},
		{
			"brand": "Alexander McQueen",
			"category_1": "Trainers",
			"url_1": "https://www.flannels.com/alexander-mcqueen#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_2": "Boots",
			"url_2": "https://www.flannels.com/alexander-mcqueen#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBoots",
			"category_3": "Bags",
			"url_3": "https://www.flannels.com/alexander-mcqueen#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls",
			"category_4": "Scarves",
			"url_4": "https://www.flannels.com/alexander-mcqueen#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EScarves"
		},
		{
			"brand": "Valentino",
			"category_1": "Trainers",
			"url_1": "https://www.flannels.com/valentino#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_2": "Bags",
			"url_2": "https://www.flannels.com/valentino#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls",
			"category_3": "Shoes",
			"url_3": "https://www.flannels.com/valentino#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EShoes",
			"category_4": "Sweatshirts",
			"url_4": "https://www.flannels.com/valentino#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops"
		},
		{
			"brand": "Stone Island",
			"category_1": "Sweatshirts",
			"url_1": "https://www.flannels.com/stone-island#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_2": "Jackets",
			"url_2": "https://www.flannels.com/stone-island#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJackets",
			"category_3": "T-Shirts",
			"url_3": "https://www.flannels.com/stone-island#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts",
			"category_4": "Trousers",
			"url_4": "https://www.flannels.com/stone-island#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrousers"
		},
		{
			"brand": "Moncler",
			"category_1": "Jackets",
			"url_1": "https://www.flannels.com/moncler#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJackets",
			"category_2": "Sweatshirts",
			"url_2": "https://www.flannels.com/moncler#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_3": "Trainers",
			"url_3": "https://www.flannels.com/moncler#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_4": "Polo Shirts",
			"url_4": "https://www.flannels.com/moncler#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EPolos"
		},
		{
			"brand": "Burberry",
			"category_1": "Jackets",
			"url_1": "https://www.flannels.com/burberry#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJackets",
			"category_2": "Bags",
			"url_2": "https://www.flannels.com/burberry#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls",
			"category_3": "Trainers",
			"url_3": "https://www.flannels.com/burberry#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_4": "Sweatshirts",
			"url_4": "https://www.flannels.com/burberry#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops"
		},
		{
			"brand": "DSquared2",
			"category_1": "T-Shirts",
			"url_1": "https://www.flannels.com/dsquared2#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts",
			"category_2": "Sweatshirts",
			"url_2": "https://www.flannels.com/dsquared2#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_3": "Jeans",
			"url_3": "https://www.flannels.com/dsquared2#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJeans",
			"category_4": "Hats",
			"url_4": "https://www.flannels.com/dsquared2#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHeadwear"
		},
		{
			"brand": "C.P. Company",
			"category_1": "Sweatshirts",
			"url_1": "https://www.flannels.com/cp-company#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_2": "Jackets",
			"url_2": "https://www.flannels.com/cp-company#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJackets",
			"category_3": "Jogging Bottoms",
			"url_3": "https://www.flannels.com/cp-company#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJogging%20Bottoms",
			"category_4": "T-Shirts",
			"url_4": "https://www.flannels.com/cp-company#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts"
		},
		{
			"brand": "Off-White",
			"category_1": "T-Shirts",
			"url_1": "https://www.flannels.com/off-white#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts",
			"category_2": "Trainers",
			"url_2": "https://www.flannels.com/off-white#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_3": "Sweatshirts",
			"url_3": "https://www.flannels.com/off-white#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_4": "Bags",
			"url_4": "https://www.flannels.com/off-white#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls"
		},
		{
			"brand": "Kenzo",
			"category_1": "Sweatshirts",
			"url_1": "https://www.flannels.com/kenzo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_2": "T-Shirts",
			"url_2": "https://www.flannels.com/kenzo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts",
			"category_3": "Jackets",
			"url_3": "https://www.flannels.com/kenzo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJackets",
			"category_4": "Knitwear",
			"url_4": "https://www.flannels.com/kenzo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EKnitwear"
		},
		{
			"brand": "Palm Angels",
			"category_1": "Sweatshirts",
			"url_1": "https://www.flannels.com/palm-angels#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_2": "T-Shirts",
			"url_2": "https://www.flannels.com/palm-angels#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts",
			"category_3": "Tracksuit Tops",
			"url_3": "https://www.flannels.com/palm-angels#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETracksuit%20Tops",
			"category_4": "Jackets",
			"url_4": "https://www.flannels.com/palm-angels#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EJackets"
		},
		{
			"brand": "Jimmy Choo",
			"category_1": "Shoes",
			"url_1": "https://www.flannels.com/jimmy-choo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EShoes",
			"category_2": "Trainers",
			"url_2": "https://www.flannels.com/jimmy-choo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_3": "Bags",
			"url_3": "https://www.flannels.com/jimmy-choo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls",
			"category_4": "Boots",
			"url_4": "https://www.flannels.com/jimmy-choo#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBoots"
		},
		{
			"brand": "Balmain",
			"category_1": "T-Shirts",
			"url_1": "https://www.flannels.com/balmain#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts",
			"category_2": "Sweatshirts",
			"url_2": "https://www.flannels.com/balmain#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_3": "Trainers",
			"url_3": "https://www.flannels.com/balmain#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_4": "Bags",
			"url_4": "https://www.flannels.com/balmain#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls"
		},
		{
			"brand": "Versace",
			"category_1": "Trainers",
			"url_1": "https://www.flannels.com/versace#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ETrainers",
			"category_2": "Sweatshirts",
			"url_2": "https://www.flannels.com/versace#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops",
			"category_3": "Bags",
			"url_3": "https://www.flannels.com/versace#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EBags%20and%20Holdalls",
			"category_4": "T-Shirts",
			"url_4": "https://www.flannels.com/versace#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5ET-Shirts"
		}
	];

	return catJSON;

}
