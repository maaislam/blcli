import { h } from "preact";
import shared from "../../../../../../core-files/shared";

const { VARIATION } = shared;

// data for all except v5
const allVariationData = () => {
  return [
    // makeup
    {
      name: 'Makeup',
      link: 'https://www.boots.com/beauty/makeup',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/makeup/face">Face</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/makeup/face/all-face">Shop all Face</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/face/foundation">Foundation</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/face/blusher">Blusher</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/face/bronzer">Bronzer</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/face/powder">Powder</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/face/primer">Primer</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/face/tinted-moisturisers">Tinted Moisturisers</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/makeup/eyes">Eyes</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/makeup/eyes/all-eyes">Shop all Eyes</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/eyes/eyebrows">Brows</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/eyes/eye-liner">Eye Liner</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/eyes/eye-shadow">Eye Shadow</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/eyes/mascara">Mascara</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/eyes/eye-primers-base">Eye Primers & Base</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/eyes/eye-palettes">Eye Palettes</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/makeup/lips">Lips</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/makeup/lips/all-lips">All Lips</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/lips/lipsticks">Lipsticks</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/lips/lip-balms-creams">Lip Balms & Creams</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/lips/liquid-lipsticks">Liquid Lipsticks</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/lips/lip-gloss-plumpers">Lip Gloss & Plumpers</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/lips/lip-cheek-tints">Lip & Cheek Tints</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/lips/lipstick-sealers">Lipstick Sealers</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/makeup/vegan-makeup-products">Vegan Makeup</a></li>
                  <li><a href="https://www.boots.com/beauty/makeup/make-up-gift-sets">Beauty Gift Sets</a></li>
                  <li><a href="https://www.boots.com/beauty/makeup/palettes">Palettes</a></li>
                  <li><a href="https://www.boots.com/beauty/trending-products">Trending on Social</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Nails</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/makeup/nails">Visit Nails</a></li>
                  <li><a href="https://www.boots.com/beauty/makeup/nails/nail-polish">Nail Polish</a></li>
                  <li><a href="https://www.boots.com/beauty/makeup/nails/gel-nails">Gel Nails</a></li>
                  <li><a href="https://www.boots.com/beauty/makeup/nails/false-nails">False Nails</a></li>
                  <li><a href="https://www.boots.com/beauty/makeup/nails/nail-sets">Nail Sets</a></li>
                </ul>
              </div>
              <div class="inner">
                <span class="title">Premium</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup">Premium Makeup</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools">Premium Makeup Tools</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift">Premium Beauty Gifts</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },

    // skincare
    {
      name: 'Skincare',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Explore Skincare</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/skincare">Visit Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/skincare/skincare-all-skincare">All Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/skincare/vegan-skincare-products">Vegan Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare">Premium Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/skincare/skincare-female-hair-removal">Female Hair Removal</a></li>
                  <li><a href="https://www.boots.com/beauty/skincare/skincare-body">Men's skincare & Body</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/skincare/facial-skincare">Facial Skincare</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare/moisturiser">Moisturiser</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare/cleanser-toner">Cleansers</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare/serum-and-treatments">Serums</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare/masks">Face Masks</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare/eye-cream">Eye Cream</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare/make-up-remover-">Makeup Remover</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare/skincare-tools">Skincare Tools</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/skincare/body-skincare">Body Skincare</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/skincare/body-skincare/skincare-all-body-skincare">All Body Skincare</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/body-skincare/body-moisturiser">Body Moisturiser</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/body-skincare/neck-chest-cream">Neck & Chest Cream</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/body-skincare/body-scrub-exfoliator">Body Scrub & Exfoliator</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/body-skincare/foot-creams-lotions">Foot Creams & Lotions</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/body-skincare/hand-cream-lotions">Hand Cream & Lotion</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/body-skincare/body-butter">Body Butter</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/skincare/expert-skincare-">Expert Skincare & Treatments</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-shop-all">Shop Expert Skincare</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-expert-suncare">Expert Suncare</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/expert-skincare-/acne-prone-skin">Acne Prone Skin</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/expert-skincare-/anti-redness">Anti-Redness</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/expert-skincare-/pigmentation">Pigmentation</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/expert-skincare-/dry-skin-">Dry Skin</a></li>
                    <li><a href="https://www.boots.com/toiletries/skincare/expert-skincare-/eczema-prone-skin">Eczema Prone Skin</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Be Inspired</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/skincare-beauty-advice/skincare-advice">Skincare Advice</a></li>
                  <li><a href="https://www.boots.com/skincare-beauty-advice/skincare-advice/anti-ageing-advice">Anti-ageing Advice</a></li>
                  <li><a href="https://www.boots.com/skincare-beauty-advice/skincare-advice/face-masks-advice">Face Masks Advice</a></li>
                  <li><a href="https://www.boots.com/skincare-beauty-advice/skincare-advice/skin-concerns">Skin Concerns</a></li>
                  <li><a href="https://www.boots.com/skincare-beauty-advice/skincare-advice/skincare-basics">Skincare Basics</a></li>
                  <li><a href="https://www.boots.com/skincare-beauty-advice/skincare-advice/skincare-routines">Skincare Routines</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },

    // Hair
    {
      name: 'Hair',
      link: 'https://www.boots.com/beauty/hair',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/hair">Shop Hair</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/hair/all-hair">All Hair</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/hair-styling">Hair Styling</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/shampoo">Shampoo</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/conditioner">Conditioner</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/hair-treatments-and-masks">Hair Treatments & Masks</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/hair/hair-accessories">Hair Accessories</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/hair/brushes-and-combs">Brushes & Combs</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/textured-hair">Curls, Kinks & Coils</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/hair-health-vitamins">Hair Health Vitamins</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/thinning-hair">Thinning Hair</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/mens-hair">Men's Hair</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/electrical/hair-styling-tools">Hair Styling Tools</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools">All Hair Styling Tools</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-curlers">Hair Curlers</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-dryers">Hair Dryers</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-straighteners">Hair Straighteners</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers">Hot Brushes & Air Stylers</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares">Accessories & Spares</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/hair/new-in-hair">New in Hair</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-value-packs-and-bundles">Hair Value Packs & Bundles</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/luxury-beauty-hair">Premium Hair</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Hair Dye</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye">Visit Hair Dye</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye/all-hair-dye-at-home-for-men-women">All Hair Dye</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye/hair-dye-permanent">Permanent</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye/semi-permanent">Semi Permanent</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye/temporary-hair-dye">Temporary Hair Dye</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye/root-touch-up">Root Touch Up</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye/hair-highlighters">Hair Highlighters</a></li>
                  <li><a href="https://www.boots.com/beauty/hair/hair-dye/hair-colour-remover">Hair Colour Remover</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },

    // Toiletries
    {
      name: 'Toiletries',
      link: 'https://www.boots.com/toiletries',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & New In</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/toiletries/new-in-toiletries">New In Toietries</a></li>
                  <li><a href="https://www.boots.com/toiletries/toiletries-offers">Toiletries Offers</a></li>
                  <li><a href="https://www.boots.com/toiletries/toiletries-value-packs-and-bundles">Toiletries Value Packs & Bundles</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Bathroom Essentials</span>
              <div class="inner">
                <div class="col1">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/washing-bathing">Visit Bathroom Essentials</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/shower-gel">Shower Gels & Scrubs</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/soap-hand-wash">Soap & Hand Wash</a></li>
                    <li><a href="https://www.boots.com/toiletries/deodorants-antiperspirants">Deodorants & Antiperspirants</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/body-scrub">Body Scrub</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/face-wash">Face Wash</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers">Tissues, Wipes & Sanitisers</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries">Baby & Child Toiletries</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/toiletries-bath-sets">Bath Sets</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/natural-toiletries">Natural Toiletries</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/bath-accessories">Bath Accessories</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/wash-bags">Wash Bags & Organisers</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/talcum-powder">Talcum Powder</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool">Cotton Wool</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/toiletries/bootsdental">Dental</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/bootsdental/at-home-dentistry">At Home Dentistry</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/mouthwash">Mouthwash</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/kids-dental">Kids Dental</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/oral-health">Oral Health</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/toothpaste">Toothpaste</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/electrical-dental">Electrical Dental</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/toothbrushes">Toothbrushes</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Men's Toiletries</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries">Visit Men's Toiletries</a></li>
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries/mens-value-packs-and-bundles">Men's Value Packs</a></li>
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries/mens-washing-bathing">Washing & Bathing</a></li>
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries/male-incontinence">Male Incontinence</a></li>
                </ul>
              </div>
              <div class="inner">
                <span class="title">Feminine hygiene</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene">Visit Feminine Hygiene</a></li>
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene/sanitary-towels">Sanitary Towels</a></li>
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene/feminine-wash-wipes">Feminine Wash & Wipes</a></li>
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene/tampons">Tampons</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },

    // Baby
    {
      name: 'Baby & Child',
      link: 'https://www.boots.com/baby-child',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/baby-child/baby-event">Baby Event</a></li>
                  <li><a href="https://www.boots.com/baby-child/parenting-club">Boots Parenting Club</a></li>
                  <li><a href="https://www.boots.com/baby-child/baby-child-offers">Baby & Child Offers</a></li>
                  <li><a href="https://www.boots.com/baby-child/baby-value-packs-and-bundles">Baby Value Packs & Bundles</a></li>
                  <li><a href="https://www.boots.com/baby-child/toys">Toys</a></li>
                  <li><a href="https://www.boots.com/baby-child/new-in-baby-child">New In</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/baby-child/babyfeeding">Feeding</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-milk-formula">Baby Milk & Formula</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-food-weaning">Baby Food & Weaning</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps">Breastfeeding</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/toddler-food-drink">Toddler Food & Drink</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats">Bottle Feeding</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-cups">Cups</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/soothers-teethers">Soothers & Teethers</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/baby-child/mothercare-clothing">Clothing</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing">Shop All Clothing</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/new-clothing-collection">New In Clothing</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months">Baby Clothes 0-24 Months</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years">Girls Clothes 9 onths - 6 years</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years">Boys Clothes 9 months - 6 years</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear">Nightwear & Underwear</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range">Premature Baby Range</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/baby-child/bathing-changing">Bathing & Changing</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials">Changing Bag Essentials</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/nappies">Nappies</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories">Baby Baths & Accessories</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-wipes">Baby Wipes</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/changing-bags-mats">Changing Bags & Mats</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/potty-training">Potty Training</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries">Baby & Child Toiletries</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Pregnancy & maternity</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity">Visit pregnancy & Maternity</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/all-premature-baby">All Premature Baby</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/hospital-bag-essentials">Hospital Bag Essentials</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/new-mum-toiletries">New Mum Toiletries</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/maternity-nursing-clothing">Maternity & Nursing Clothes</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-tests">Pregnancy Tests</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancysupplements">Supplements</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/maternity-tens-machine">TENS Machines</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-maternity-pillows">Pillows</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/ovulation-fertility-tests">Ovulation & Fertility Tests</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/gift-baby-shower">Baby Shower Gifts</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },

    // Fragrance
    {
      name: 'Fragrance',
      link: 'https://www.boots.com/fragrance',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/fragrance/fragrance-offers">Fragrance Offers</a></li>
                  <li><a href="https://www.boots.com/fragrance/fragrance-exclusives">Fragrance Exclusives</a></li>
                  <li><a href="https://www.boots.com/fragrance/recommended-fragrances">Recommended</a></li>
                  <li><a href="https://www.boots.com/fragrance/vegan-fragrances">Vegan Fragrance</a></li>
                  <li><a href="https://www.boots.com/fragrance/luxury-fragrance">Luxury Fragrance</a></li>
                  <li><a href="https://www.boots.com/fragrance/new-in-fragrance">New in Fragrance</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/fragrance/perfume">Perfume</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/fragrance/perfume">Visit Perfume</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/all-perfume">All Perfume</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/perfume-gift-sets">Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/body-mists-">Body Mists</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/scented-bath-shower">Scented Bath & Shower</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/fragrance/aftershave">Aftershave</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/fragrance/aftershave">Visit Aftershave</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/mens-aftershave">All Aftershave</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/aftershave-gift-sets">Aftershave Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/cologne">Cologne</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/fragrance-bath-shower">Fragrance Bath & Shower</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/fragrance/fragrance-gift-sets">Fragrance Gift Sets</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets">Fragrance Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets/gift-wrapped-sets">Gift Wrapped Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets/perfume-gift-sets">Perfume Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets/aftershave-gift-sets">Aftershave Gift Sets</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Be Inspired</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/fragrance-advice/how-to-buy-fragrance-online-advice">Fragrance Advice</a></li>
                  <li><a href="https://www.boots.com/fragrance-advice/how-to-buy-fragrance">How to buy fragrance</a></li>
                  <li><a href="https://www.boots.com/fragrance-advice/best-mens-aftershave">Top 8 men's aftershave</a></li>
                  <li><a href="https://www.boots.com/fragrance-advice/best-womens-perfume">8 Perfect perfumes</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    
    // Health & Pharmacy
    {
      name: 'Health & Pharmacy',
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Services</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/health-offers">Health Offers</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/new-in-health">New in Health</a></li>
                  <li><a href="https://www.boots.com/online/pharmacy/">Online Pharmacy</a></li>
                  <li><a href="https://www.boots.com/healthhub">Health Hub</a></li>
                  <li><a href="https://onlinedoctor.boots.com/?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_Online_Doctor">Boots Online Doctor</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/health-pharmacy">Shop Health</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth">Visit Women's Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/familyplanning">Planning for a Baby</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/intimate-dryness--1">Intimate Dryness</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/vaginitis">Bacterial Vaginosis</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/female-incontinence">Female Incontinence</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes">Feminine Wash & Wipes</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/thrush">Thrush</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/menopause-support">Menopause</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements">Women's Health Supplements</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/morning-after-pill">Morning After Pill</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/period-delay-clinic">Period Delay Online Clinic</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections">Cystitis & Urinary Tract Infections</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss">Hair Loss</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/period-pain">Period Pain</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/cervicalcancer">Cervical Cancer Vaccination Service</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womens-alternative-therapy">Alternative Therapy</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/health-pharmacy/menshealth">Men's Health</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth">Visit Men's Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/mens-sexual-health">Men's Sexual Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/male-incontinence">Male Incontinence</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/mens-hair-loss">Hair Loss</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/menshealth-supplements">Men's Health Supplements</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/jock-rash">Jock Rash</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/health-pharmacy/medicines-treatments">Medicines & Treatments</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/painrelief">Pain</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/eye-care">Eyecare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/digestion">Stomach & Bowel</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-">Heartburn & Indigestion</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/footcare">Footcare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/allergy-hayfever">Allergy & Hayfever</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems">Specialist Skincare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/first-aid">First Aid</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication">Cough, Cold & Flu</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care">Mouth & Oral Care</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/sleep">Sleep</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/ear-care">Earcare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss">Hair Loss</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/diabetes">Diabetes</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart">Heart Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/pharmacy-medicines">Pharmacy Medicines</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Vitamins</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool">Vitamin Selector</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins">Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth">Immune Health</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins">Baby & Child Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins">Hair Health Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins">Vegan Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins">50+ Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements">Pregnancy Dupplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil">CBD</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements">Beauty Supplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements">Men's Health Supplements</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Wellness
    {
      name: 'Wellness',
      link: 'https://www.boots.com/wellness',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/wellness/new-in-wellness">New In Wellness</a></li>
                  <li><a href="https://www.boots.com/wellness/immunity-protection">Immunity Protection</a></li>
                  <li><a href="https://www.boots.com/wellness/condoms-sexual-health">Sexual Wellness</a></li>
                  <li><a href="https://www.boots.com/wellness/sleep">Sleep</a></li>
                  <li><a href="https://www.boots.com/wellness/digestive-health">Digestive Health</a></li>
                  <li><a href="https://www.boots.com/wellness/everyday-stress">Everyday Stress</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Wellness</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing">Visit Lifestyle & Wellbeing</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/wellness-supplements">Alternative Therapies</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/weightloss">Diet & Weight Management</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/bootsdental">Dental</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/stopsmoking">Smoking Control</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/health-food">Health Food</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/fitness">Fitness Equipment & Activity Trackers</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/familyplanning">Planning for a Baby</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/sports-nutrition">Sports Nutrition</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/home-pet-care">Home & Pet Care</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Vitamins</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool">Vitamin Selector</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins">Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth">Immune Health</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins">Baby & Child Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins">Hair Health Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins">Vegan Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins">50+ Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements">Pregnancy Dupplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil">CBD</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements">Beauty Supplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements">Men's Health Supplements</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Electrical
    {
      name: 'Electrical',
      link: 'https://www.boots.com/electrical',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/electrical/electrical-offers">Electrial Offers</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-shop-all">All Electrial</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-dental/all-electrical-dental-">Electrial Dental</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-wellbeing">Electrial Wellbeing</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics">Electrial Health & Diagnostics</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/electrical/hair-styling-tools">Hair Styling Tools</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-curlers">Hair Curlers</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-dryers">Hair Dryers</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-straighteners">Hair Straighteners</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers">Hot Brushes</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares">Accessories & Spares</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools">Beauty Tools</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/electrical/beauty-tools/anti-ageing">Anti Ageing</a></li>
                    <li><a href="https://www.boots.com/electrical/beauty-tools/facial-beauty-tools">Facial Beauty</a></li>
                    <li><a href="https://www.boots.com/electrical/beauty-tools/facial-cleansing-brush">Facial Cleansing</a></li>
                    <li><a href="https://www.boots.com/electrical/beauty-tools/manicure-pedicure-tools">Manicure & Pedicure Tools</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-">Female Hair Removal</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/epilators">Epilators</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/ipl-hair-removal">IPL Hair Removal</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/lady-shavers">Lady Shavers</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/body-face-trimmers">Body & Face Trimmers</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/hair-removal-accessories-spares">Accessories & Spares</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Male Grooming</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/shavers">Shavers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/beard-stubble-trimmers">Beard & Stubble Trimmers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/mens-hair-clippers">Hair Clippers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/body-groomers">Body Groomers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/nose-ear-trimmers">Nose & Ear Trimmers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/male-grooming-accessories-spares">Accessories & Spares</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/all-electrical-male-grooming">All Male Grooming</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Services
    {
      name: 'Services',
      link: 'https://www.boots.com/healthhub',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Pharmacy Services</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/online/pharmacy/">Boots Online Pharmacy</a></li>
                  <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                  <li><a href="https://www.boots.com/appointment-booking">Appointment Booking</a></li>
                  <li><a href="https://www.boots.com/covid-19-testing">COVID-19 Testing</a></li>
                  <li><a href="https://www.boots.com/flujab">Winter Flu Jab Service</a></li>
                  <li><a href="https://www.boots.com/opticians">Opticians</a></li>
                  <li><a href="https://www.boots.com/healthhub">Health &amp; Pharmacy</a></li>
                  <li><a href="https://www.boots.com/hearingcare">Hearingcare</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Top Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://onlinedoctor.boots.com/">Online Doctor</a></li>
                  <ul class="subList">
                    <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                    <li><a href="https://onlinedoctor.boots.com/mens-health">Mens Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/womens-health">Womens Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/general-health">General Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/acne-skin-conditions">Acne & Skin Conditions</a></li>
                    <li><a href="https://onlinedoctor.boots.com/sexual-health">Sexual Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/home-testing-kits">Testing Services</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/photo">Photo</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/photo">Visit Photo Services</a></li>
                    <li><a href="https://www.boots.com/photo/photo-offers">Photo Offers</a></li>
                    <li><a href="https://www.boots.com/photo/photo-printing">Photo Printing</a></li>
                    <li><a href="https://www.boots.com/photo/photo-albums-frames">Albums & Frames</a></li>
                    <li><a href="https://www.boots.com/photo/headphones-cameras-accessories">Audio & Visual Tech</a></li>
                    <li><a href="https://www.boots.com/photo/novelty-photo-gifts">Novelty Photo Gifts</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/opticians">Opticians</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/opticians/eyetest">Book an Eye Test</a></li>
                    <li><a href="https://www.boots.com/opticians/opticians-offers">Opticians Offers</a></li>
                    <li><a href="https://www.boots.com/opticians/glasses">Glasses Frames</a></li>
                    <li><a href="https://www.boots.com/opticians/prescription-lenses">Glasses Lenses</a></li>
                    <li><a href="https://www.boots.com/opticians/contactlenses">Contact Lenses</a></li>
                    <li><a href="https://www.boots.com/opticians/hearingcare">Hearingcare</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    // Offers
    {
      name: 'Offers',
      link: 'https://www.boots.com/offers',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Top Offers</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/offers">All Offers</a></li>
                  <li><a href="https://www.boots.com/all-clearance">Clearance</a></li>
                  <li><a href="https://www.boots.com/value-packs-and-bundles">Value Packs & Bundles</a></li>
                  <li><a href="https://www.boots.com/great-new-price">Great New Price</a></li>
                  <li><a href="https://www.boots.com/tuesday-offer">£10 Tuesday</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Sale</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/sale">Visit Sale</a></li>
                  <li><a href="https://www.boots.com/sale/christmas-gift-sale">Gift Sale</a></li>
                  <li><a href="https://www.boots.com/sale/fragrance-sale">Fragrance Sale</a></li>
                  <li><a href="https://www.boots.com/sale/luxury-beauty-sale">Luxury Beauty Sale</a></li>
                  <li><a href="https://www.boots.com/sale/baby-child-sale">Baby Sale</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Savings</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/savings">All Savings</a></li>
                  <li><a href="https://www.boots.com/savings/beauty-savings">Beauty Savings</a></li>
                  <li><a href="https://www.boots.com/savings/electrical-beauty-savings">Electrial Savings</a></li>
                  <li><a href="https://www.boots.com/savings/fragrance-savings">Fragrance Savings</a></li>
                  <li><a href="https://www.boots.com/savings/no7-savings">No7 Savings</a></li>
                  <li><a href="https://www.boots.com/savings/baby-and-child-savings">Baby & Child Savings</a></li>
                  <li><a href="https://www.boots.com/savings/healthcare-savings">Healthcare Savings</a></li>
                  <li><a href="https://www.boots.com/savings/skincare-savings">Skincare Savings</a></li>
                  <li><a href="https://www.boots.com/savings/toiletries-and-haircare-savings">Toiletries Savings</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },

    // Mens
    {
      name: 'Men\'s',
      link: 'https://www.boots.com/mens',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/mens/shaving-grooming">Shaving</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/mens/shaving-grooming">Shaving & Grooming</a></li>
                    <li><a href="https://www.boots.com/mens/shaving-grooming/beardcare">Beard Care</a></li>
                    <li><a href="https://www.boots.com/mens/shaving-grooming/post-shave">Post Shave</a></li>
                    <li><a href="https://www.boots.com/mens/shaving-grooming/mens-razor-blades">Razor Blades</a></li>
                    <li><a href="https://www.boots.com/mens/shaving-grooming/mens-razors">Razors</a></li>
                    <li><a href="https://www.boots.com/mens/shaving-grooming/shaving-brushes">Shaving Brushes</a></li>
                    <li><a href="https://www.boots.com/mens/shaving-grooming/shaving-foams-pre-shave">Shaving Foams & Pre-shaves</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/mens/aftershave">Aftershave</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/mens/aftershave">Aftershave</a></li>
                    <li><a href="https://www.boots.com/mens/aftershave/mens-aftershave">Visit Aftershave</a></li>
                    <li><a href="https://www.boots.com/mens/aftershave/aftershave-gift-sets">Aftershave Gift Sets</a></li>
                    <li><a href="https://www.boots.com/mens/aftershave/cologne">Cologne</a></li>
                    <li><a href="https://www.boots.com/mens/aftershave/fragrance-bath-shower">Fragrance Bath & Shower</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/mens/mens-toiletries">Toiletries</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/mens/mens-toiletries">Men's Toiletries</a></li>
                    <li><a href="https://www.boots.com/mens/mens-toiletries">Visit Men's Toiletries</a></li>
                    <li><a href="https://www.boots.com/mens/mens-toiletries/skincare-body">Men's Skincare & Body</a></li>
                    <li><a href="https://www.boots.com/mens/mens-toiletries/mens-washing-bathing">Washing & Bathing</a></li>
                    <li><a href="https://www.boots.com/mens/mens-toiletries/mens-hair">Men's Hair</a></li>
                    <li><a href="https://www.boots.com/mens/mens-toiletries/male-incontinence">Male Incontinence</a></li>
                    <li><a href="https://www.boots.com/mens/mens-toiletries/mens-hair-loss">Hair Loss</a></li>
                    <li><a href="https://www.boots.com/mens/mens-toiletries/mens-gift-sets">Men's Gift Sets</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Gifts and Savings</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/mens/mens-value-packs-and-bundles">Value Packs and Bundles</a></li>
                  <li><a href="https://www.boots.com/mens/mens-gift-sets">Gift Sets</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
  ];
}

// adds on to all varation data
const v1Data = () => {
  return [
    // Brands
    {
      name: 'Brand A-Z',
      regex: '/brands',
      link: 'https://www.boots.com/brands',
      hasSubmenu: false,
      allBrands: true,
    },
    //Gift
    {
      name: 'Gifts',
      link: 'https://www.boots.com/gift',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column two-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/gift">Visit Gifts</a></li>
                    <li><a href="https://www.boots.com/gift/her">Gifts for Her</a></li>
                    <li><a href="https://www.boots.com/gift/him">Gifts for Him</a></li>
                    <li><a href="https://www.boots.com/gift/candles-home-fragrance-for-her">Candles & Home Fragrance</a></li>
                    <li><a href="https://www.boots.com/gift/experience-days">Gift Experience</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <ul class="subList">
                    <li><a href="https://www.bootsphoto.com/"></a>Personalised Photo</li>
                    <li><a href="https://www.boots.com/gift/personalised-gifts"></a>Personalised Gifts</li>
                    <li><a href="https://www.boots.com/gift/birthday-gifts"></a>Birthday Gifts</li>
                    <li><a href="https://www.boots.com/gift/gift-cards"></a>Gift Cards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    //No7
    {
      name: 'No7',
      link: 'https://www.boots.com/no7',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/no7/no7-bestsellers">Best Sellers</a></li>
                  <li><a href="https://www.boots.com/no7/no7-new">New In</a></li>
                  <li><a href="https://www.boots.com/no7/no7-shop-all">Shop All</a></li>
                  <li><a href="https://www.boots.com/no7-make-up-accessories">Accessories</a></li>
                  <li><a href="https://www.boots.com/no7-gifts">Gifts</a></li>
                  <li><a href="https://www.boots.com/no7-clearance-range">Clearance</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/no7-skincare">Skincare</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/no7-skincare">All Skincare</a></li>
                    <li><a href="https://www.boots.com/no7-skincare/no7-personalised-skin">Personalised Skin Analysis</a></li>
                    <li><a href="https://www.boots.com/no7-skincare/no7-skincare-protect-perfect">Protect & Perfect</a></li>
                    <li><a href="https://www.boots.com/no7-skincare/no7-skincare-lift-luminate">Lift & Luminate</a></li>
                    <li><a href="https://www.boots.com/no7-skincare/no7-skincare-restore-renew">Restore & Renew</a></li>
                    <li><a href="https://www.boots.com/no7-skincare/no7-laboratories">Laboratories</a></li>
                    <li><a href="https://www.boots.com/no7-skincare/no7-retinol-range">Retinol</a></li>
                    <li><a href="https://www.boots.com/no7-skincare/no7-skincare-serums">Anti-Ageing</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/no7-make-up">Makeup</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/no7-make-up/no7-shop-all-make-up">Shop All</a></li>
                    <li><a href="https://www.boots.com/no7-make-up/no7-foundation-range">Foundation</a></li>
                    <li><a href="https://www.boots.com/no7-make-up/no7-make-up-face">Face</a></li>
                    <li><a href="https://www.boots.com/no7-make-up/no7-make-up-eyes">Eyes</a></li>
                    <li><a href="https://www.boots.com/no7-make-up/no7-make-up-lips">Lips</a></li>
                    <li><a href="https://www.boots.com/no7-make-up/no7-make-up-nails">Nails</a></li>
                    <li><a href="https://www.boots.com/no7-make-up/no7-mascaras">Mascara</a></li>
                    <li><a href="https://www.boots.com/no7-make-up/no7-make-up-brows">Brows</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/no7-mens">Mens</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/no7-mens">Shop All</a></li>
                    <li><a href="https://www.boots.com/no7-mens/no7-mens-anti-ageing">Anti-Ageing</a></li>
                    <li><a href="https://www.boots.com/no7-mens/no7-mens-wash">Men's Wash</a></li>
                    <li><a href="https://www.boots.com/no7-mens/no7-mens-shave">Shave</a></li>
                    <li><a href="https://www.boots.com/no7-mens/no7-mens-moisturise">Moisturiser</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    //Vegan
    {
      name: 'Vegan',
      link: 'https://www.boots.com/vegan-hub',
      hasSubmenu: false,
      allBrands: false,
    },
    //Sun & Holiday
    {
      name: 'Sun & Holiday',
      link: 'https://www.boots.com/holidays',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/holidays/love-island">Love Island</a></li>
                  <li><a href="https://www.boots.com/holidays/holiday-value-packs-and-bundles">Value Packs & Bundles</a></li>
                  <li><a href="https://www.boots.com/holidays/travel-toiletries">Travel Toiletries</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/holidays/suncare">Suncare</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/holidays/suncare">All Suncare</a></li>
                    <li><a href="https://www.boots.com/holidays/suncare/sunprotection">Sun Cream</a></li>
                    <li><a href="https://www.boots.com/holidays/suncare/kids-sun-protection">Kids Sun Protection</a></li>
                    <li><a href="https://www.boots.com/holidays/suncare/face-sun-protection">Face Sun Protection</a></li>
                    <li><a href="https://www.boots.com/holidays/suncare/expert-skin-sun-protection">Expert Sun Protection</a></li>
                    <li><a href="https://www.boots.com/holidays/suncare/after-sun">After Sun</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/holidays/fake-gradual-tan">Fake & Gradual Tan</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan">Shop All</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/fake-and-gradual-tan-all">Fake & Gradual Tan</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-bronzer">Bronzer</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-gradual-tan">Gradual Tan</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-instant-tan">Instant Tan</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-prep-and-maintain">Prep & Maintain</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-lotions">Self Tan</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/holidays/travel-toiletries">Travel</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/holidays/travel-toiletries">Travel Toiletries</a></li>
                    <li><a href="https://www.boots.com/holidays/travel-health">Travel Health</a></li>
                    <li><a href="https://www.boots.com/holidays/travel-essentials">Travel Essentails</a></li>
                    <li><a href="https://www.boots.com/holidays/kids-travel">Kids Travel</a></li>
                    <li><a href="https://www.boots.com/holidays/sunglasses">Sunglasses</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    //Photo
    {
      name: 'Photos',
      link: 'https://www.boots.com/photo',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/photo-offers">Photo Offers</a></li>
                  <li><a href="https://www.boots.com/photo/new-in-photo">New In</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/photo/photo-printing">Photo Printing</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/photo/photo-printing">Photo Printing</a></li>
                    <li><a href="https://www.bootsphoto.com/photo-books.html">Photo Books</a></li>
                    <li><a href="https://www.bootsphoto.com/wall-art/canvas-prints.html">Canvas Prints</a></li>
                    <li><a href="https://www.bootsphoto.com/photo-gifts/premium-cushion.html">Photo Cushions</a></li>
                    <li><a href="https://www.bootsphoto.com/photo-gifts.html">Photo Gifts</a></li>
                    <li><a href="https://www.bootsphoto.com/greeting-cards.html">Greeting Cards</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/photo/photo-albums-frames">Albums & Frames</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/photo/photo-albums-frames">Albums & Frames</a></li>
                    <li><a href="https://www.boots.com/photo/photo-albums-frames/frames-photo">All Frames</a></li>
                    <li><a href="https://www.boots.com/photo/photo-albums-frames/photo-albums-range">All Albums</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-gradual-tan">Gradual Tan</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-instant-tan">Instant Tan</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-prep-and-maintain">Prep & Maintain</a></li>
                    <li><a href="https://www.boots.com/holidays/fake-gradual-tan/self-tan-lotions">Self Tan</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/photo/headphones-cameras-accessories">Audio & Visual</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/photo/headphones-cameras-accessories">Audio & Visual</a></li>
                    <li><a href="https://www.boots.com/photo/headphones-cameras-accessories/cameras">Cameras</a></li>
                    <li><a href="https://www.boots.com/photo/headphones-cameras-accessories/headphones-earphones-speakers">Headphones</a></li>
                    <li><a href="https://www.boots.com/photo/headphones-cameras-accessories/batteries">Batteries</a></li>
                    <li><a href="https://www.boots.com/photo/headphones-cameras-accessories/phone-tablet-accessories">Phone & Tablet Accessories</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    //Opticians
    {
      name: 'Opticians',
      link: 'https://www.boots.com/opticians',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/opticians/opticians-offers">Offers</a></li>
                  <li><a href="https://www.boots.com/opticians/eyetest">Book an Eye Test</a></li>
                  <li><a href="https://www.boots.com/opticians/prescription-lenses">Lenses</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/opticians/glasses">Glasses Frames</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/opticians/glasses/all-frames-boots-opticians">All Frames</a></li>
                    <li><a href="https://www.boots.com/opticians/glasses/opticians-glasses-womens">Womens</a></li>
                    <li><a href="https://www.boots.com/opticians/glasses/mens-glasses">Mens</a></li>
                    <li><a href="https://www.boots.com/opticians/glasses/kids-teens-glasses">Kids & Teens</a></li>
                    <li><a href="https://www.boots.com/opticians/glasses/ready-readers">Ready Readers</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/opticians/contactlenses">Contact Lenses</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/opticians/contactlenses/buying-contact-lenses-">Buying Contact Lenses</a></li>
                    <li><a href="https://www.boots.com/opticians/contactlenses/contact-lens-rewards-plan">Rewards Plan</a></li>
                    <li><a href="https://www.boots.com/opticians/contactlenses/contact-lenses-opticians-boots">Boots Contact Lenses</a></li>
                    <li><a href="https://www.boots.com/acuvue-contact-lenses">Acuvue Lenses</a></li>
                    <li><a href="https://www.boots.com/opticians/contactlenses/lens-cleaning-solutions">Cleaning Solution</a></li>
                    <li><a href="https://www.boots.com/opticians/prescription-lenses">Prescription Lenses</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/opticians/prescription-sunglasses">Prescription Sunglasses</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/opticians/prescription-sunglasses/all-sunglasses-boots-opticians">All Sunglasses</a></li>
                    <li><a href="https://www.boots.com/opticians/prescription-sunglasses/womens-prescription-sunglasses">Womens</a></li>
                    <li><a href="https://www.boots.com/opticians/prescription-sunglasses/mens-prescription-sunglasses">Men's</a></li>
                    <li><a href="https://www.boots.com/opticians/prescription-sunglasses/kids-teens-prescription-sunglasses">Kids & Teens</a></li>
                    <li><a href="https://www.boots.com/opticians/prescription-sunglasses/polaroid-sunglasses-">Polaroid Sunglasses</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    //New In
    {
      name: 'New In',
      link: 'https://www.boots.com/new-to-boots',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column two-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/new-to-boots">Visit New In</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-beauty-skincare">Beauty & Skincare</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-fragrance">Fragrance</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-luxury--1">Premium Beauty & Skincare</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-baby-child">Baby & Child</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-clothing-collection">Baby & Kids Clothes</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/no7-new">No7</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-hair">Hair</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/new-to-boots/new-in-wellness">Wellness</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-electrical">Electrial</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-health">Health</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-footcare">Footcare</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-luxury-bath-body">Luxury Bath & Body</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-toiletries">Toiletries</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-diet-and-weight-management">Diet & Weight Management</a></li>
                    <li><a href="https://www.boots.com/new-to-boots/new-in-photo">Photo</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    // Inspire
    {
      name: 'Inspire Me',
      link: 'https://www.boots.com/health-and-beauty',
      hasSubmenu: false,
      allBrands: false,
    },
  ]
}

// more nav
const v2Data = () => {
  return [
    {
      name: 'More...',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Shop Categories</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/brands">Brand A-Z</a></li>
                  <li><a href="https://www.boots.com/vegan-hub">Vegan</a></li>
                  <li><a href="https://www.boots.com/new-to-boots">New In</a></li>
                  <li><a href="https://www.boots.com/health-and-beauty">Inspiration</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">No7</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/no7/no7-bestsellers">Best Sellers</a></li>
                  <li><a href="https://www.boots.com/no7/no7-new">New In</a></li>
                  <li><a href="https://www.boots.com/no7/no7-shop-all">Shop All</a></li>
                  <li><a href="https://www.boots.com/no7-make-up-accessories">Accessories</a></li>
                  <li><a href="https://www.boots.com/no7-gifts">Gifts</a></li>
                  <li><a href="https://www.boots.com/no7-clearance-range">Clearance</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Gifts</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/gift">Visit Gifts</a></li>
                  <li><a href="https://www.boots.com/gift/her">Gifts for Her</a></li>
                  <li><a href="https://www.boots.com/gift/him">Gifts for Him</a></li>
                  <li><a href="https://www.boots.com/gift/candles-home-fragrance-for-her">Candles & Home Fragrance</a></li>
                  <li><a href="https://www.boots.com/gift/experience-days">Gift Experience</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Sun & Holiday</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/holidays/suncare">All Suncare</a></li>
                  <li><a href="https://www.boots.com/holidays/fake-gradual-tan">Fake & Gradual Tan</a></li>
                  <li><a href="https://www.boots.com/holidays/travel-toiletries">Travel Toiletries</a></li>
                  <li><a href="https://www.boots.com/holidays/holiday-value-packs-and-bundles">Value Packs & Bundles</a></li>
                  <li><a href="https://www.boots.com/holidays/travel-toiletries">Travel Toiletries</a></li>
                  <li><a href="https://www.boots.com/opticians/prescription-sunglasses/all-sunglasses-boots-opticians">All Sunglasses</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Photo</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/photo">All Photo</a></li>
                  <li><a href="https://www.boots.com/photo-offers">Photo Offers</a></li>
                  <li><a href="https://www.boots.com/photo/new-in-photo">New In</a></li>
                  <li><a href="https://www.boots.com/photo/photo-printing">Photo Printing</a></li>
                  <li><a href="https://www.boots.com/photo/photo-albums-frames">Albums & Frames</a></li>
                  <li><a href="https://www.boots.com/photo/headphones-cameras-accessories">Audio & Visual</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Opticians</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/octicians">All Opticians</a></li>
                  <li><a href="https://www.boots.com/opticians/opticians-offers">Offers</a></li>
                  <li><a href="https://www.boots.com/opticians/glasses/all-frames-boots-opticians">Glasses Frames</a></li>
                  <li><a href="https://www.boots.com/opticians/contactlenses">Contact Lenses</a></li>
                  <li><a href="https://www.boots.com/opticians/prescription-sunglasses/all-sunglasses-boots-opticians">All Sunglasses</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },
  ]
}

// all v5 data goes here
const v5Data = () => {
  return [
    // Valentines
    {
      name: 'Valentines',
      link: 'https://www.boots.com/valentines',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Shop Valentines</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/valentines">Shop All Valentines</a></li>
                  <li><a href="https://www.boots.com/valentines/valentines-day-gifts-for-him">For Him</a></li>
                  <li><a href="https://www.boots.com/valentines/valentines-day-gifts-for-her">For Her</a></li>
                </ul>
              </div>
            </div>
            <div class="column two-columns">
              <span class="title">Shop by Category</span>
              <div class="inner">
                <div class="col1">

                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift">Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/all-perfume">Perfume</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/mens-aftershave">Aftershave</a></li>
                    <li><a href="https://www.boots.com/toiletries/luxury-bath-body">Luxury Bath</a></li>
                    <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare">Beauty</a></li>
                    <li><a href="https://www.boots.com/wellness/condoms-sexual-health/sexual-pleasure-shop-all">Sexual Wellness</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/photo">Photo</a></li>
                    <li><a href="https://www.boots.com/gift/personalised-gifts/all-personalised-gifts">Personalised Gifts</a></li>
                    <li><a href="https://www.boots.com/gift/candles-home-fragrance-for-her">Candles</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools">Electrial Styling</a></li>
                    <li><a href="https://www.boots.com/mens/male-grooming-tools/all-electrical-male-grooming">Male Grooming</a></li>
                    <li><a href="https://www.boots.com/no7/no7-shop-all">No7</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div class="column oneColumn stacked">
                    <div class="inner">
                      <span class="title">Must haves</span>
                        <ul class="subList">
                            <li><a href="https://www.boots.com/christmas/advent-calendars">Advent calendars</a></li>
                            <li><a href="https://www.boots.com/christmas/advent-calendars/shop-all-advent-calendars">Shop all advent calenders</a></li>
                            <li><a href="https://www.boots.com/christmas/christmas-weekly-offers">Star gifts</a></li>
                            <li><a href="https://www.boots.com/christmas/stocking-fillers">Stocking fillers</a></li>
                        </ul>
                    </div>
                    <div class="inner">
                      <span class="title">Don't miss</span>
                      <ul class="subList">
                          <li><a href="https://www.boots.com/christmas/best-christmas-gifts">100 Best Christmas gift ideas 2021</a></li>
                          <li><a href="https://www.boots.com/christmas/secret-santa">Secret Santa</a></li>
                          <li><a href="https://www.boots.com/christmas-gift-guide/gift-finder">Gift finder</a></li>
                        </ul>
                    </div>
                  </div> */}
          </div>]
      }]
    },
    // Beauty & Skincare
    {
      name: 'Beauty & Skincare',
      link: 'https://www.boots.com/beauty',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/makeup">Makeup</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/makeup">All Makeup</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/vegan-makeup-products">Vegan Makeup</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/face">Face</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/eyes">Eyes</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/lips">Lips</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/nails">Nails</a></li>
                    <li><a href="https://www.boots.com/beauty/makeup/make-up-gift-sets">Makeup Gift Sets</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/skincare">Skincare</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/skincare/skincare-all-skincare">All Skincare</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/vegan-skincare-products">Vegan Skincare</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/new-in-skincare">New In Skincare</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/facial-skincare">Facial Skincare</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/body-skincare">Body Skincare</a></li>
                    <li><a href="https://www.boots.com/beauty/skincare/fake-gradual-tan">Fake & Gradual Tan</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/beauty/hair/all-hair">Hair</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/beauty/hair/all-hair">All Hair</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/new-in-hair">New In Hair</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/hair-dye">Hair Dye</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/hair-styling">Hair Styling</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/shampoo">Shampoo</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/conditioner">Conditioner</a></li>
                    <li><a href="https://www.boots.com/beauty/hair/hair-treatments-and-masks">Treatments & Masks</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/new-in-beauty-skincare">New In Beauty & Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/beauty-skincare-offers">Offers</a></li>
                  <li><a href="https://www.boots.com/beauty/beauty-value-packs-and-bundles">Value Packs & Bundles</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare">Luxury Beauty & Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/beauty-accessories">Beauty Accessories</a></li>
                  <li><a href="https://www.boots.com/beauty/travel-beauty-minis">Beauty Minis</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Premium Beauty</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare">Premium Beauty & Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift">Premium Beauty Gifts</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-offers">Premium Beauty Offers</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-offers">Premium Beauty Offers</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare">Premium Skincare</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-men">Premium Mens</a></li>
                  <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup">Premium Makeup</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Health & Pharmacy
    {
      name: 'Health & Pharmacy',
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Services</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/health-offers">Health Offers</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/new-in-health">New in Health</a></li>
                  <li><a href="https://www.boots.com/online/pharmacy/">Online Pharmacy</a></li>
                  <li><a href="https://www.boots.com/healthhub">Health Hub</a></li>
                  <li><a href="https://onlinedoctor.boots.com/?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_Online_Doctor">Boots Online Doctor</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/health-pharmacy">Shop Health</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth">Visit Women's Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/familyplanning">Planning for a Baby</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/intimate-dryness--1">Intimate Dryness</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/vaginitis">Bacterial Vaginosis</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/female-incontinence">Female Incontinence</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes">Feminine Wash & Wipes</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/thrush">Thrush</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/menopause-support">Menopause</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements">Women's Health Supplements</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/morning-after-pill">Morning After Pill</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/period-delay-clinic">Period Delay Online Clinic</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections">Cystitis & Urinary Tract Infections</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss">Hair Loss</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/period-pain">Period Pain</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/cervicalcancer">Cervical Cancer Vaccination Service</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womens-alternative-therapy">Alternative Therapy</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/health-pharmacy/menshealth">Men's Health</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth">Visit Men's Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/mens-sexual-health">Men's Sexual Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/male-incontinence">Male Incontinence</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/mens-hair-loss">Hair Loss</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/menshealth-supplements">Men's Health Supplements</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/menshealth/jock-rash">Jock Rash</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/health-pharmacy/medicines-treatments">Medicines & Treatments</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/painrelief">Pain</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/eye-care">Eyecare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/digestion">Stomach & Bowel</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-">Heartburn & Indigestion</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/footcare">Footcare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/allergy-hayfever">Allergy & Hayfever</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems">Specialist Skincare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/first-aid">First Aid</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication">Cough, Cold & Flu</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care">Mouth & Oral Care</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/sleep">Sleep</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/ear-care">Earcare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss">Hair Loss</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/diabetes">Diabetes</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart">Heart Health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/pharmacy-medicines">Pharmacy Medicines</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Vitamins</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool">Vitamin Selector</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins">Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth">Immune Health</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins">Baby & Child Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins">Hair Health Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins">Vegan Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins">50+ Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements">Pregnancy Supplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil">CBD</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements">Beauty Supplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements">Men's Health Supplements</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Toiletries
    {
      name: 'Toiletries',
      link: 'https://www.boots.com/toiletries',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & New In</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/toiletries/new-in-toiletries">New In Toietries</a></li>
                  <li><a href="https://www.boots.com/toiletries/toiletries-offers">Toiletries Offers</a></li>
                  <li><a href="https://www.boots.com/toiletries/toiletries-value-packs-and-bundles">Toiletries Value Packs & Bundles</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Bathroom Essentials</span>
              <div class="inner">
                <div class="col1">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/washing-bathing">Visit Bathroom Essentials</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/shower-gel">Shower Gels & Scrubs</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/soap-hand-wash">Soap & Hand Wash</a></li>
                    <li><a href="https://www.boots.com/toiletries/deodorants-antiperspirants">Deodorants & Antiperspirants</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/body-scrub">Body Scrub</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/face-wash">Face Wash</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers">Tissues, Wipes & Sanitisers</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries">Baby & Child Toiletries</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/toiletries-bath-sets">Bath Sets</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/natural-toiletries">Natural Toiletries</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/bath-accessories">Bath Accessories</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/wash-bags">Wash Bags & Organisers</a></li>
                    <li><a href="https://www.boots.com/toiletries/washing-bathing/talcum-powder">Talcum Powder</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool">Cotton Wool</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/toiletries/bootsdental">Dental</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/bootsdental/at-home-dentistry">At Home Dentistry</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/mouthwash">Mouthwash</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/kids-dental">Kids Dental</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/oral-health">Oral Health</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/toothpaste">Toothpaste</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/electrical-dental">Electrical Dental</a></li>
                    <li><a href="https://www.boots.com/toiletries/bootsdental/toothbrushes">Toothbrushes</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Men's Toiletries</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries">Visit Men's Toiletries</a></li>
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries/mens-value-packs-and-bundles">Men's Value Packs</a></li>
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries/mens-washing-bathing">Washing & Bathing</a></li>
                  <li><a href="https://www.boots.com/toiletries/mens-toiletries/male-incontinence">Male Incontinence</a></li>
                </ul>
              </div>
              <div class="inner">
                <span class="title">Feminine hygiene</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene">Visit Feminine Hygiene</a></li>
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene/sanitary-towels">Sanitary Towels</a></li>
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene/feminine-wash-wipes">Feminine Wash & Wipes</a></li>
                  <li><a href="https://www.boots.com/toiletries/feminine-hygiene/tampons">Tampons</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Baby
    {
      name: 'Baby & Child',
      link: 'https://www.boots.com/baby-child',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/baby-child/baby-event">Baby Event</a></li>
                  <li><a href="https://www.boots.com/baby-child/parenting-club">Boots Parenting Club</a></li>
                  <li><a href="https://www.boots.com/baby-child/baby-child-offers">Baby & Child Offers</a></li>
                  <li><a href="https://www.boots.com/baby-child/baby-value-packs-and-bundles">Baby Value Packs & Bundles</a></li>
                  <li><a href="https://www.boots.com/baby-child/toys">Toys</a></li>
                  <li><a href="https://www.boots.com/baby-child/new-in-baby-child">New In</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/baby-child/babyfeeding">Feeding</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-milk-formula">Baby Milk & Formula</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-food-weaning">Baby Food & Weaning</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps">Breastfeeding</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/toddler-food-drink">Toddler Food & Drink</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats">Bottle Feeding</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-cups">Cups</a></li>
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/soothers-teethers">Soothers & Teethers</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/baby-child/mothercare-clothing">Clothing</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing">Shop All Clothing</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/new-clothing-collection">New In Clothing</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months">Baby Clothes 0-24 Months</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years">Girls Clothes 9 onths - 6 years</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years">Boys Clothes 9 months - 6 years</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear">Nightwear & Underwear</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range">Premature Baby Range</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/baby-child/bathing-changing">Bathing & Changing</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials">Changing Bag Essentials</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/nappies">Nappies</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories">Baby Baths & Accessories</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-wipes">Baby Wipes</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/changing-bags-mats">Changing Bags & Mats</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/potty-training">Potty Training</a></li>
                    <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries">Baby & Child Toiletries</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Pregnancy & maternity</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity">Visit pregnancy & Maternity</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/all-premature-baby">All Premature Baby</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/hospital-bag-essentials">Hospital Bag Essentials</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/new-mum-toiletries">New Mum Toiletries</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/maternity-nursing-clothing">Maternity & Nursing Clothes</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-tests">Pregnancy Tests</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancysupplements">Supplements</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/maternity-tens-machine">TENS Machines</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-maternity-pillows">Pillows</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/ovulation-fertility-tests">Ovulation & Fertility Tests</a></li>
                  <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/gift-baby-shower">Baby Shower Gifts</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },
    // Fragrance
    {
      name: 'Fragrance',
      link: 'https://www.boots.com/fragrance',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/fragrance/fragrance-offers">Fragrance Offers</a></li>
                  <li><a href="https://www.boots.com/fragrance/fragrance-exclusives">Fragrance Exclusives</a></li>
                  <li><a href="https://www.boots.com/fragrance/recommended-fragrances">Recommended</a></li>
                  <li><a href="https://www.boots.com/fragrance/vegan-fragrances">Vegan Fragrance</a></li>
                  <li><a href="https://www.boots.com/fragrance/luxury-fragrance">Luxury Fragrance</a></li>
                  <li><a href="https://www.boots.com/fragrance/new-in-fragrance">New in Fragrance</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/fragrance/perfume">Perfume</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/fragrance/perfume">Visit Perfume</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/all-perfume">All Perfume</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/perfume-gift-sets">Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/body-mists-">Body Mists</a></li>
                    <li><a href="https://www.boots.com/fragrance/perfume/scented-bath-shower">Scented Bath & Shower</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/fragrance/aftershave">Aftershave</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/fragrance/aftershave">Visit Aftershave</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/mens-aftershave">All Aftershave</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/aftershave-gift-sets">Aftershave Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/cologne">Cologne</a></li>
                    <li><a href="https://www.boots.com/fragrance/aftershave/fragrance-bath-shower">Fragrance Bath & Shower</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/fragrance/fragrance-gift-sets">Fragrance Gift Sets</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets">Fragrance Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets/gift-wrapped-sets">Gift Wrapped Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets/perfume-gift-sets">Perfume Gift Sets</a></li>
                    <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets/aftershave-gift-sets">Aftershave Gift Sets</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Be Inspired</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/fragrance-advice/how-to-buy-fragrance-online-advice">Fragrance Advice</a></li>
                  <li><a href="https://www.boots.com/fragrance-advice/how-to-buy-fragrance">How to buy fragrance</a></li>
                  <li><a href="https://www.boots.com/fragrance-advice/best-mens-aftershave">Top 8 men's aftershave</a></li>
                  <li><a href="https://www.boots.com/fragrance-advice/best-womens-perfume">8 Perfect perfumes</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Wellness
    {
      name: 'Wellness',
      link: 'https://www.boots.com/wellness',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/wellness/new-in-wellness">New In Wellness</a></li>
                  <li><a href="https://www.boots.com/wellness/immunity-protection">Immunity Protection</a></li>
                  <li><a href="https://www.boots.com/wellness/condoms-sexual-health">Sexual Wellness</a></li>
                  <li><a href="https://www.boots.com/wellness/sleep">Sleep</a></li>
                  <li><a href="https://www.boots.com/wellness/digestive-health">Digestive Health</a></li>
                  <li><a href="https://www.boots.com/wellness/everyday-stress">Everyday Stress</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Wellness</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing">Visit Lifestyle & Wellbeing</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/wellness-supplements">Alternative Therapies</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/weightloss">Diet & Weight Management</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/bootsdental">Dental</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/stopsmoking">Smoking Control</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/health-food">Health Food</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/fitness">Fitness Equipment & Activity Trackers</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/familyplanning">Planning for a Baby</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/sports-nutrition">Sports Nutrition</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/home-pet-care">Home & Pet Care</a></li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Vitamins</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool">Vitamin Selector</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins">Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth">Immune Health</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins">Baby & Child Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins">Hair Health Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins">Vegan Vitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins">50+ Multivitamins</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements">Pregnancy Dupplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil">CBD</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements">Beauty Supplements</a></li>
                  <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements">Men's Health Supplements</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    // Electrical
    {
      name: 'Electrical',
      link: 'https://www.boots.com/electrical',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Offers & Trending</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/electrical/electrical-offers">Electrial Offers</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-shop-all">All Electrial</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-dental/all-electrical-dental-">Electrial Dental</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-wellbeing">Electrial Wellbeing</a></li>
                  <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics">Electrial Health & Diagnostics</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://www.boots.com/electrical/hair-styling-tools">Hair Styling Tools</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-curlers">Hair Curlers</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-dryers">Hair Dryers</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-straighteners">Hair Straighteners</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers">Hot Brushes</a></li>
                    <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares">Accessories & Spares</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools">Beauty Tools</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/electrical/beauty-tools/anti-ageing">Anti Ageing</a></li>
                    <li><a href="https://www.boots.com/electrical/beauty-tools/facial-beauty-tools">Facial Beauty</a></li>
                    <li><a href="https://www.boots.com/electrical/beauty-tools/facial-cleansing-brush">Facial Cleansing</a></li>
                    <li><a href="https://www.boots.com/electrical/beauty-tools/manicure-pedicure-tools">Manicure & Pedicure Tools</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-">Female Hair Removal</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/epilators">Epilators</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/ipl-hair-removal">IPL Hair Removal</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/lady-shavers">Lady Shavers</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/body-face-trimmers">Body & Face Trimmers</a></li>
                    <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/hair-removal-accessories-spares">Accessories & Spares</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Male Grooming</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/shavers">Shavers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/beard-stubble-trimmers">Beard & Stubble Trimmers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/mens-hair-clippers">Hair Clippers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/body-groomers">Body Groomers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/nose-ear-trimmers">Nose & Ear Trimmers</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/male-grooming-accessories-spares">Accessories & Spares</a></li>
                  <li><a href="https://www.boots.com/electrical/male-grooming-tools/all-electrical-male-grooming">All Male Grooming</a></li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
    //Gift
    {
      name: 'Gifts',
      link: 'https://www.boots.com/gift',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column two-columns">
              <span class="title">Shop Categories</span>
              <div class="inner">
                <div class="col1">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/gift">Visit Gifts</a></li>
                    <li><a href="https://www.boots.com/gift/her"></a>Gifts for Her</li>
                    <li><a href="https://www.boots.com/gift/him"></a>Gifts for Him</li>
                    <li><a href="https://www.boots.com/gift/candles-home-fragrance-for-her"></a>Candles & Home Fragrance</li>
                    <li><a href="https://www.boots.com/gift/experience-days"></a>Gift Experience</li>
                  </ul>
                </div>
                <div class="col2">
                  <ul class="subList">
                    <li><a href="https://www.bootsphoto.com/"></a>Personalised Photo</li>
                    <li><a href="https://www.boots.com/gift/personalised-gifts"></a>Personalised Gifts</li>
                    <li><a href="https://www.boots.com/gift/birthday-gifts"></a>Birthday Gifts</li>
                    <li><a href="https://www.boots.com/gift/gift-cards"></a>Gift Cards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    //Toys
    {
      name: 'Toys',
      regex: '/toys',
      link: 'https://www.boots.com/toys',
      hasSubmenu: false,
      allBrands: false,
    },
    // Services
    {
      name: 'Services',
      link: 'https://www.boots.com/healthhub',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Pharmacy Services</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/online/pharmacy/">Boots Online Pharmacy</a></li>
                  <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                  <li><a href="https://www.boots.com/appointment-booking">Appointment Booking</a></li>
                  <li><a href="https://www.boots.com/covid-19-testing">COVID-19 Testing</a></li>
                  <li><a href="https://www.boots.com/flujab">Winter Flu Jab Service</a></li>
                  <li><a href="https://www.boots.com/opticians">Opticians</a></li>
                  <li><a href="https://www.boots.com/healthhub">Health &amp; Pharmacy</a></li>
                  <li><a href="https://www.boots.com/hearingcare">Hearingcare</a></li>
                </ul>
              </div>
            </div>
            <div class="column three-columns">
              <span class="title">Top Categories</span>
              <div class="inner">
                <div class="col1">
                  <li class="categoryLink"><a href="https://onlinedoctor.boots.com/">Online Doctor</a></li>
                  <ul class="subList">
                    <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                    <li><a href="https://onlinedoctor.boots.com/mens-health">Mens Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/womens-health">Womens Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/general-health">General Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/acne-skin-conditions">Acne & Skin Conditions</a></li>
                    <li><a href="https://onlinedoctor.boots.com/sexual-health">Sexual Health</a></li>
                    <li><a href="https://onlinedoctor.boots.com/home-testing-kits">Testing Services</a></li>
                  </ul>
                </div>
                <div class="col2">
                  <li class="categoryLink"><a href="https://www.boots.com/photo">Photo</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/photo">Visit Photo Services</a></li>
                    <li><a href="https://www.boots.com/photo/photo-offers">Photo Offers</a></li>
                    <li><a href="https://www.boots.com/photo/photo-printing">Photo Printing</a></li>
                    <li><a href="https://www.boots.com/photo/photo-albums-frames">Albums & Frames</a></li>
                    <li><a href="https://www.boots.com/photo/headphones-cameras-accessories">Audio & Visual Tech</a></li>
                    <li><a href="https://www.boots.com/photo/novelty-photo-gifts">Novelty Photo Gifts</a></li>
                  </ul>
                </div>
                <div class="col3">
                  <li class="categoryLink"><a href="https://www.boots.com/opticians">Opticians</a></li>
                  <ul class="subList">
                    <li><a href="https://www.boots.com/opticians/eyetest">Book an Eye Test</a></li>
                    <li><a href="https://www.boots.com/opticians/opticians-offers">Opticians Offers</a></li>
                    <li><a href="https://www.boots.com/opticians/glasses">Glasses Frames</a></li>
                    <li><a href="https://www.boots.com/opticians/prescription-lenses">Glasses Lenses</a></li>
                    <li><a href="https://www.boots.com/opticians/contactlenses">Contact Lenses</a></li>
                    <li><a href="https://www.boots.com/opticians/hearingcare">Hearingcare</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>]
      }]
    },
    // Brands
    {
      name: 'Brand A-Z',
      regex: '/brands',
      link: 'https://www.boots.com/brands',
      hasSubmenu: false,
      allBrands: true,
    },
    // Deals
    {
      name: 'Deals',
      link: 'https://www.boots.com/offers',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Top Offers</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/offers">All Offers</a></li>
                  <li><a href="https://www.boots.com/all-clearance"></a>Clearance</li>
                  <li><a href="https://www.boots.com/value-packs-and-bundles"></a>Value Packs & Bundles</li>
                  <li><a href="https://www.boots.com/great-new-price"></a>Great New Price</li>
                  <li><a href="https://www.boots.com/tuesday-offer"></a>£10 Tuesday</li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Sale</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/sale"></a>Visit Sale</li>
                  <li><a href="https://www.boots.com/sale/christmas-gift-sale"></a>Gift Sale</li>
                  <li><a href="https://www.boots.com/sale/fragrance-sale"></a>Fragrance Sale</li>
                  <li><a href="https://www.boots.com/sale/luxury-beauty-sale"></a>Luxury Beauty Sale</li>
                  <li><a href="https://www.boots.com/sale/baby-child-sale"></a>Baby Sale</li>
                </ul>
              </div>
            </div>
            <div class="column oneColumn stacked">
              <div class="inner">
                <span class="title">Savings</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/savings"></a>All Savings</li>
                  <li><a href="https://www.boots.com/savings/beauty-savings"></a>Beauty Savings</li>
                  <li><a href="https://www.boots.com/savings/electrical-beauty-savings"></a>Electrial Savings</li>
                  <li><a href="https://www.boots.com/savings/fragrance-savings"></a>Fragrance Savings</li>
                  <li><a href="https://www.boots.com/savings/no7-savings"></a>No7 Savings</li>
                  <li><a href="https://www.boots.com/savings/baby-and-child-savings"></a>Baby & Child Savings</li>
                  <li><a href="https://www.boots.com/savings/healthcare-savings"></a>Healthcare Savings</li>
                  <li><a href="https://www.boots.com/savings/skincare-savings"></a>Skincare Savings</li>
                  <li><a href="https://www.boots.com/savings/toiletries-and-haircare-savings"></a>Toiletries Savings</li>
                </ul>
              </div>
            </div>
          </div>]
      }]
    },
  ]
}

// pharmacy nav data
export const pharmacyData = () => {
  return [
    {
      name: 'Prescriptions',
      link: 'https://www.boots.com/prescription-support',
      hasSubmenu: false,
      allBrands: false,
  },
  {
    name: 'Online Doctor',
    link: 'https://onlinedoctor.boots.com/',
    hasSubmenu: true,
    children: [{
      content:
        [<div class="container">
          <div class="column oneColumn">
            <div class="inner">
              <span class="title">Online Doctor</span>
              <ul class="subList">
                <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                <li><a href="https://onlinedoctor.boots.com/mens-health">Mens Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/womens-health">Womens Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/general-health">General Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/acne-skin-conditions">Acne & Skin Conditions</a></li>
                <li><a href="https://onlinedoctor.boots.com/sexual-health">Sexual Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/home-testing-kits">Testing Services</a></li>
              </ul>
            </div>
          </div>
        </div>
        ]
    }]
  },
  {
      name: 'Health Hub',
      link: 'https://www.boots.com/online/pharmacy/',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Pharmacy Services</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/healthhub">Health Hub</a></li>
                  <li><a href="https://www.boots.com/appointment-booking">Appointment Booking</a></li>
                  <li><a href="https://www.boots.com/online/pharmacy/">Boots Online Pharmacy</a></li>
                  <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                  <li><a href="https://www.boots.com/covid-19-testing">COVID-19 Testing</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },
    {
      name: 'NHS Services',
      link: 'https://www.boots.com/nhs-services',
      hasSubmenu: false,
      allBrands: false,
    },
    {
      name: 'Vaccinations',
      link: 'https://www.boots.com/health-pharmacy-advice/vaccinations',
      hasSubmenu: false,
      allBrands: false,
  },
  {
    name: 'Managing Your Conditions',
    link: 'https://www.boots.com/managing-your-condition',
    hasSubmenu: false,
    allBrands: false,
  },
    {
      name: 'COVID-19 Testing',
      link: 'https://www.boots.com/covid-19-testing',
      hasSubmenu: false,
      allBrands: false,
    },
    {
      name: 'Opticians',
      link: 'https://www.boots.com/opticians',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Opticians</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/opticians/eyetest">Book an Eye Test</a></li>
                  <li><a href="https://www.boots.com/opticians/opticians-offers">Opticians Offers</a></li>
                  <li><a href="https://www.boots.com/opticians/glasses">Glasses Frames</a></li>
                  <li><a href="https://www.boots.com/opticians/prescription-lenses">Glasses Lenses</a></li>
                  <li><a href="https://www.boots.com/opticians/contactlenses">Contact Lenses</a></li>
                  <li><a href="https://www.boots.com/opticians/hearingcare">Hearingcare</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },
    {
      name: 'Hearingcare',
      link: 'https://www.boots.com/hearingcare',
      hasSubmenu: false,
      allBrands: false,
    },
  ]
}

// services nav data
export const servicesData = () => {
  return [
    {
      name: 'Health Hub',
      link: 'https://www.boots.com/online/pharmacy/',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Pharmacy Services</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/healthhub">Health Hub</a></li>
                  <li><a href="https://www.boots.com/appointment-booking">Appointment Booking</a></li>
                  <li><a href="https://www.boots.com/online/pharmacy/">Boots Online Pharmacy</a></li>
                  <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                  <li><a href="https://www.boots.com/covid-19-testing">COVID-19 Testing</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },
    {
      name: 'Prescriptions',
      link: 'https://www.boots.com/prescription-support',
      hasSubmenu: false,
      allBrands: false,
  },
  {
    name: 'Online Doctor',
    link: 'https://onlinedoctor.boots.com/',
    hasSubmenu: true,
    children: [{
      content:
        [<div class="container">
          <div class="column oneColumn">
            <div class="inner">
              <span class="title">Online Doctor</span>
              <ul class="subList">
                <li><a href="https://onlinedoctor.boots.com/">Boots Online Doctor</a></li>
                <li><a href="https://onlinedoctor.boots.com/mens-health">Mens Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/womens-health">Womens Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/general-health">General Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/acne-skin-conditions">Acne & Skin Conditions</a></li>
                <li><a href="https://onlinedoctor.boots.com/sexual-health">Sexual Health</a></li>
                <li><a href="https://onlinedoctor.boots.com/home-testing-kits">Testing Services</a></li>
              </ul>
            </div>
          </div>
        </div>
        ]
    }]
  },
    {
      name: 'NHS Repeat Prescriptions',
      link: 'https://www.boots.com/online/pharmacy',
      hasSubmenu: false,
      allBrands: false,
  },
    {
      name: 'Vaccinations',
      link: 'https://www.boots.com/health-pharmacy-advice/vaccinations',
      hasSubmenu: false,
      allBrands: false,
  },
    {
      name: 'Photo',
      link: 'https://www.boots.com/photo',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Photo</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/photo">Visit Photo Services</a></li>
                  <li><a href="https://www.boots.com/photo/photo-offers">Photo Offers</a></li>
                  <li><a href="https://www.boots.com/photo/photo-printing">Photo Printing</a></li>
                  <li><a href="https://www.boots.com/photo/photo-albums-frames">Albums & Frames</a></li>
                  <li><a href="https://www.boots.com/photo/headphones-cameras-accessories">Audio & Visual Tech</a></li>
                  <li><a href="https://www.boots.com/photo/novelty-photo-gifts">Novelty Photo Gifts</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },
    {
      name: 'Opticians',
      link: 'https://www.boots.com/opticians',
      hasSubmenu: true,
      children: [{
        content:
          [<div class="container">
            <div class="column oneColumn">
              <div class="inner">
                <span class="title">Opticians</span>
                <ul class="subList">
                  <li><a href="https://www.boots.com/opticians/eyetest">Book an Eye Test</a></li>
                  <li><a href="https://www.boots.com/opticians/opticians-offers">Opticians Offers</a></li>
                  <li><a href="https://www.boots.com/opticians/glasses">Glasses Frames</a></li>
                  <li><a href="https://www.boots.com/opticians/prescription-lenses">Glasses Lenses</a></li>
                  <li><a href="https://www.boots.com/opticians/contactlenses">Contact Lenses</a></li>
                  <li><a href="https://www.boots.com/opticians/hearingcare">Hearingcare</a></li>
                </ul>
              </div>
            </div>
          </div>
          ]
      }]
    },
    {
      name: 'Hearingcare',
      link: 'https://www.boots.com/hearingcare',
      hasSubmenu: false,
      allBrands: false,
    },
    {
      name: 'COVID-19 Testing',
      link: 'https://www.boots.com/covid-19-testing',
      hasSubmenu: false,
      allBrands: false,
    },
  ]
}

let DesktopData;

if(VARIATION === 'control' || VARIATION === '3' || VARIATION === '4') {
  DesktopData = allVariationData();
}

if(VARIATION === '1') {
  DesktopData = allVariationData().concat(v1Data());
}

if(VARIATION === '2') {
  DesktopData = allVariationData().concat(v2Data());
}

if(VARIATION === '5') {
  DesktopData = v5Data();
}

export { DesktopData };


