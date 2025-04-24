/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

window.keyFeatures = {
  "https://www.boots.com/mothercare-journey-edit-pram-and-pushchair--midnight-black-10288564": {
    "Key Feature Content":
      "Our special edition, signature pram and pushchair has been finished in premium fabrics with leatherette handles to wrap every journey in luxury. We've included everything your little one will need to stay snug and stylish on their journey from newborn to toddler, including a pram liner and apron, cosytoe with soft lining, a hood for both the carrycot and pushchair, and a full-coverage weathershield that can be used in all modes.",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10288564_2",
    "Key Feature Content 1": "Seat unit is suitable from 6 months to 15kg",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10288564_3",
    "Key Feature Content 2": "Lockable front swivel wheels and full suspension for a smooth ride across all surfaces",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10288564_7",
    "Key Feature Content 3": "Premium leatherette handles are height adjustable",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10288564_10",
    "Key Feature Content 4": "Folded dimensions: H66 x W58 x D95cm",
  },
  "https://www.boots.com/mothercare-4-wheel-journey-travel-system--grey-brushed-silver-10282396": {
    "Key Feature Content":
      "The journey can be used in pram mode from birth to six months (9kg), and comes with its own liner and apron to keep your baby cosy during those first family outings. The reversible seat unit is also suitable from birth, and can be used in the rearward or forward-facing position up to 15kg. The seat unit features a bumper bar to keep your little passenger secure in their seat. We recommend using the lie-flat position in pram mode from birth until six months to support your baby's spinal development, before switching to seat mode.",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10282396_5",
    "Key Feature Content 1": "Group 0+ car seat is suitable from birth to 13kg (12-15 months), and attaches to the journey chassis using included adaptors",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10282396_3",
    "Key Feature Content 2": "Full suspension and lockable front swivel wheels for a smooth ride across all surfaces",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10282396_9",
    "Key Feature Content 3": "Spacious basket to store shopping bags, clothes and changing essentials, and a magnetic pouch for those little extras",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10282396_10",
    "Key Feature Content 4": "Unfolded dimensions: H109 x W58 x D100cm. Folded dimensions: H66 x W58 x D95cm",
  },
  "https://www.boots.com/mothercare-journey-edit-pram-and-pushchair--eclipse-navy-10288566": {
    "Key Feature Content":
      "Our special edition, signature pram and pushchair has been finished in premium fabrics with leatherette handles to wrap every journey in luxury. We've included everything your little one will need to stay snug and stylish on their journey from newborn to toddler, including a pram liner and apron, cosytoe with soft lining, a hood for both the carrycot and pushchair, and a full-coverage weathershield that can be used in all modes.",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10288566_4",
    "Key Feature Content 1": "Includes a pram liner, apron, cosytoe, separate hood for carrycot and pushchair, and a weather shield",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10288566_3",
    "Key Feature Content 2": "Lockable front swivel wheels and full suspension for a smooth ride across all surfaces",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10288566_8",
    "Key Feature Content 3":
      "Compatible with Maxi-Cosi Pebble, Maxi-Cosi Pebble Plus, Maxi-Cosi Pebble Pro, Maxi Cosi cabrioFix, Maxi Cosi Rock, Cybex Aton, Joie Gemm, Joie i-Gemm, Joie i-Level car seats",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10288566_10",
    "Key Feature Content 4": "Folded dimensions: H66 x W58 x D95cm",
  },
  "https://www.boots.com/bugaboo-butterfly-compact-lightweight-city-pushchair-midnight-black-10317451": {
    "Key Feature Content":
      "The Bugaboo Butterfly is the 1 second fold city pushchair for travels near and far. With its first-class comfort, easy air unfold & compact design, you and your growing baby will enjoy total freedom for everyday adventures and beyond. 1 hand, 1 second, 1 action, that’s all.",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10317451_4",
    "Key Feature Content 1":
      "Thanks to its compact design, the Butterfly folds down to the size of a medium bag — which means it goes in the car, under a cafe table or even travel with you on the plane.",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10317451_2",
    "Key Feature Content 2": "Spacious seat with padded seat inlay & an ultra high backrest to support growing toddlers (up to 22 kg/48.50 lbs)",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10317451_1",
    "Key Feature Content 3": "When it's nap time, the seat reclines almost fully flat so your child can enjoy some post-play recharge",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10317451_3",
    "Key Feature Content 4": "1 second fold without adjusting anything & easy air unfold lets gravity do the rest.",
  },
  "https://www.boots.com/bugaboo/bugaboo-pushchairs/bugaboo-bee-6-pushchair--black-fabrics-10291882": {
    "Key Feature Content":
      "Bugaboo Bee 6 – the ultimate urban pushchair. Like its previous versions, it offers the same trusted Bugaboo quality and compact design. Perfect for helping you navigate easily through busy city areas, get in and out of public transport or a taxi. The Bugaboo Bee 6 offers the best of both worlds: true comfort in a compact size.",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10291882_4",
    "Key Feature Content 1": "Ergonomic seat, with adjustable height and length, for added comfort during every stage of your child's growth",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10291882_2",
    "Key Feature Content 2": "New rotating bumper bar for optimal child comfort and protection",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10291882_1",
    "Key Feature Content 3": "Compact and light, perfect for navigating through the city - operate it and fold with one hand",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10291882_3",
    "Key Feature Content 4": "Improved aesthetics for a cleaner and sleek look",
  },
  "https://www.boots.com/bugaboo/bugaboo-pushchairs/bugaboo-cameleon-3-plus-pushchair--black-fabrics-10291878": {
    "Key Feature Content":
      "The Bugaboo Cameleon has been helping families get out and explore the world since 2005 and is a firm favorite thanks to its versatility and ease of use. The Bugaboo Cameleon 3 Plus is our latest version, offering all the practical features parents already know and love in a pushchair, now with a redesigned rotating carry handle.",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10291878_1",
    "Key Feature Content 1": "Larger wheels on the back and small swivel wheels in front to help you seamlessly take on rough terrains",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10291878_2",
    "Key Feature Content 2": "Suitable from birth until toddler age, it includes both carry cot and seat",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10291878_3",
    "Key Feature Content 3": "Height-adjustable handlebar and one-piece fold for more convenience on the go",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10291878",
    "Key Feature Content 4": "Made with premium materials and machine washable fabrics, it is designed to last multiple generations",
  },
  "https://www.boots.com/ickle-bubba-globe-max-pushchair-silver-denim-blue-10302178": {
    "Key Feature Content":
      "Go global with the Ickle Bubba Globe! Designed for anywhere and everywhere, this ultra-compact first-class traveller folds and unfolds like a dream. A luxury urban cruiser weighing just 6.4kg that is perfect for planes, trains and cars",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10302178_3",
    "Key Feature Content 1": "Ultra-compact when folded (45 x 55 x 25cm). Great for small spaces and overhead storage in an airplane ",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10302178_4",
    "Key Feature Content 2": "Includes luxury soft quilted seat liner, footmuff, cup holder & rain cover",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10302178_1",
    "Key Feature Content 3": "Stylish leatherette tan handles - easy to wipe clean",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10302178_2",
    "Key Feature Content 4": "Adjustable leg rest for lie flat and adventure modes",
  },
  "https://www.boots.com/ickle-bubba-globe-pushchair-silver-grey-10302174": {
    "Key Feature Content":
      "Go global with the Ickle Bubba Globe! Designed for anywhere and everywhere, this ultra-compact first-class traveller folds and unfolds like a dream. A luxury urban cruiser weighing just 6.4kg that is perfect for planes, trains and automobiles",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10302174_4",
    "Key Feature Content 1": "Ultra-compact when folded (45 x 55 x 25cm). Great for small spaces and overhead storage in an airplane ",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10302174_2",
    "Key Feature Content 2": "One handed 3 position seat recline feature",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10302174_3",
    "Key Feature Content 3": "Stylish leatherette tan handles - easy to wipe clean - and spacious storage basket",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10302174_1",
    "Key Feature Content 4": "Large extendable UPF 50 hood to protect from harmful sun rays",
  },
  "https://www.boots.com/ickle-bubba-stomp-v3-travel-system-with-galaxy-car-seat-and-isofix-base-silver-colour-black-10302018": {
    "Key Feature Content":
      "The Stomp v3 all in one with Isofix base is the latest addition to the increasingly popular travel system range brought to you by Ickle Bubba. It’s an all singing, all dancing package that includes everything you’ll need from infant to toddler and comes complete with a carrycot to use from birth to 6 months, pushchair seat unit from 6 months to 22kg (approx. 4 years) and an isofix compatible Galaxy group 0+ car seat with isofix base.",
    "Key Feature Image 1": "https://boots.scene7.com/is/image/Boots/10302018_1",
    "Key Feature Content 1": "Comes with a leather handle and bumper bar upgrade, along with a host of accessories",
    "Key Feature Image 2": "https://boots.scene7.com/is/image/Boots/10302018_3",
    "Key Feature Content 2": "Galaxy Isofix compatible car seat maximum weight 13kgs",
    "Key Feature Image 3": "https://boots.scene7.com/is/image/Boots/10302018_4",
    "Key Feature Content 3": "Includes Galaxy Isofix base",
    "Key Feature Image 4": "https://boots.scene7.com/is/image/Boots/10302018_2",
    "Key Feature Content 4": "Suitable from Birth to 22kg (approx. 4 years)",
  },
};

if (!ieChecks) {
  if (!getCookie("Synthetic_Testing")) {
    pollerLite(
      [`#estore_productpage_template_container .template_row_spacer`, () => window.keyFeatures != undefined, () => window.jQuery?.fn?.slick != undefined,
      () => {
          const locationPath = window.location.pathname;
          const keyFeaturesAllData = window.keyFeatures;
          const pageURLs = Object.keys(keyFeaturesAllData);
          const isValidUrl = pageURLs.findIndex((url) => url.includes(locationPath));
          if (isValidUrl !== -1) {
            return true;
          }
        }
      ], activate)
    }
  }
