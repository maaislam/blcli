/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here

  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...
  var flan631SA = {
    init: function () {
      this.mainCss();
      this.mainJs();
    },
    staticData: function () {
      var chrismasDayData = [
        {
          outfits: '0',
          outfitsData: [
            {
              id: '67240512',
              url: 'https://www.flannels.com/off-white-crepe-flare-pants-672405#colcode=67240512',
              imageUrl: 'https://images.flannels.com/images/products/67240512_l.jpg',
              productBrand: 'OFF WHITE',
              productName: 'Crepe Flare Pants',
              productPrice: '£565',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=67240512&selectedCurrency=GBP',
            },
            {
              id: '66626812',
              url: 'https://www.flannels.com/off-white-tomboy-jacket-666268#colcode=66626812',
              ImgUrl: 'https://images.flannels.com/images/products/66626812_l.jpg',
              productBrand: 'OFF WHITE',
              productName: 'Tomboy Jacket',
              productPrice: '£1,075',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=66626812&selectedCurrency=GBP',
            },
            {
              id: '75498510',
              url: 'https://www.flannels.com/palm-angels-pa-chain-necklace-754985#colcode=75498510',
              ImgUrl: 'https://images.flannels.com/images/products/75498510_l.jpg',
              productBrand: 'PALM ANGELS',
              productName: 'Pa Chain Necklace',
              productPrice: '£429',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=75498510&selectedCurrency=GBP',
            },
            {
              id: '23100203',
              url: 'https://www.flannels.com/tom-ford-padlock-heels-231002#colcode=23100203',
              ImgUrl: 'https://images.flannels.com/images/products/23100203_l.jpg',
              productBrand: 'TOM FORD',
              productName: 'Padlock Heels',
              productPrice: '£890',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23100203&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '1',
          outfitsData: [
            {
              id: '32065969',
              url: 'https://www.flannels.com/givenchy-lace-sweater-320659#colcode=32065969',
              productBrand: 'GIVENCHY',
              productName: 'Lace Sweater',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=32065969&selectedCurrency=GBP',
            },
            {
              id: '67839903',
              url: 'https://www.flannels.com/versace-tailored-trousers-678399#colcode=67839903',
              ImgUrl: 'https://images.flannels.com/images/products/67839903_l.jpg',
              productBrand: 'VERSACE',
              productName: 'Tailored Trousers',
              productPrice: '£689',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=67839903&selectedCurrency=GBP',
            },
            {
              id: '23345603',
              url: 'https://www.flannels.com/givenchy-givenchy-mule-block-heels-233456#colcode=23345603',
              ImgUrl: 'https://images.flannels.com/images/products/23345603_l.jpg',
              productBrand: 'GIVENCHY',
              productName: 'Givenchy Mule Block Heels',
              productPrice: '£655',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23345603&selectedCurrency=GBP',
            },
            {
              id: '70095103',
              url: 'https://www.flannels.com/balenciaga-hour-glass-chain-wallet-700951#colcode=70095103',
              ImgUrl: 'https://images.flannels.com/images/products/70095103_l.jpg',
              productBrand: 'BALENCIAGA',
              productName: 'Hour Glass Chain Wallet',
              productPrice: '£950',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=70095103&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '2',
          outfitsData: [
            {
              id: '23215403',
              url: 'https://www.flannels.com/gucci-marmont-leather-ankle-boots-232154#colcode=23215403',
              imageUrl: 'https://images.flannels.com/images/products/23215403_l.jpg',
              productBrand: 'GUCCI',
              productName: 'Marmont Leather Ankle Boots',
              productPrice: '£805',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23215403&selectedCurrency=GBP',
            },
            {
              id: '32135603',
              url: 'https://www.flannels.com/16-arlington-mel-wool-cardigan-321356#colcode=32135603',
              imageUrl: 'https://images.flannels.com/images/products/32135603_l.jpg',
              productBrand: '16 ARLINGTON',
              productName: 'Mel Wool Cardigan',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=32135603&selectedCurrency=GBP',
            },
            {
              id: '57505003',
              url: 'https://www.flannels.com/gucci-gg-skirt-575050#colcode=57505003',
              productBrand: 'GUCCI',
              productName: 'Gg Skirt',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=57505003&selectedCurrency=GBP',
            },

            {
              id: '71612118',
              url: 'https://www.flannels.com/balenciaga-hourglass-small-top-handle-bag-716121#colcode=71612118',
              productBrand: 'BALENCIAGA',
              productName: 'Hourglass Small Top Handle Bag',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=71612118&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '3',
          outfitsData: [
            {
              id: '57528599',
              url: 'https://www.flannels.com/versace-versace-monogram-mini-skirt-575285#colcode=57528599',
              productBrand: 'VERSACE',
              productName: 'Versace Monogram Mini Skirt',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=57528599&selectedCurrency=GBP',
            },
            {
              id: '57528703',
              url: 'https://www.flannels.com/versace-versace-natte-zip-cr-ld14-575287#colcode=57528703',
              productBrand: 'VERSACE',
              productName: 'Versace Natte Zip Cr Ld14',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=57528703&selectedCurrency=GBP',
            },
            {
              id: '23386415',
              url: 'https://www.flannels.com/versace-versace-mngrm-kh-bt-ld14-233864#colcode=23386415',
              productBrand: 'VERSACE',
              productName: 'Versace Mngrm KH Bt Ld14',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23386415&selectedCurrency=GBP',
            },
            {
              id: '98631110',
              url: 'https://www.flannels.com/versace-versace-greca-logo-mini-27mm-watch-986311#colcode=98631110',
              productBrand: 'VERSACE',
              productName: 'Versace Greca Logo Mini 27mm Watch',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=98631110&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '4',
          outfitsData: [
            {
              id: '70033416',
              url: 'https://www.flannels.com/bottega-veneta-cassette-chain-bag-700334#colcode=70033416',
              productBrand: 'BOTTEGA VENETA',
              productName: 'Cassette Chain Bag',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=70033416&selectedCurrency=GBP',
            },
            {
              id: '32079215',
              url: 'https://www.flannels.com/kitri-kara-trousers-320792#colcode=32079215',
              productBrand: 'KITRI',
              productName: 'Kara Trousers',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=32079215&selectedCurrency=GBP',
            },
            {
              id: '32141615',
              url: 'https://www.flannels.com/kitri-talulla-cardigan-321416#colcode=32141615',
              productBrand: 'KITRI',
              productName: 'Talulla Cardigan',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=32141615&selectedCurrency=GBP',
            },
            {
              id: '23021905',
              url: 'https://www.flannels.com/prada-95mm-brushed-leather-loafers-230219#colcode=23021905',
              productBrand: 'PRADA',
              productName: '95mm Brushed Leather Loafers',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23021905&selectedCurrency=GBP',
            },
          ],
        },
      ];

      var nyeData = [
        {
          outfits: '0',
          outfitsData: [
            {
              id: '64858211',
              url: 'https://www.flannels.com/16-arlington-michelle-dress-648582#colcode=64858211',
              productBrand: '16 ARLINGTON',
              productName: 'Michelle Dress',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=64858211&selectedCurrency=GBP',
            },
            {
              id: '99116810',
              url: 'https://www.flannels.com/paco-rabanne-xl-link-double-hoop-earrings-991168#colcode=99116810',
              productBrand: 'PACO RABANNE',
              productName: 'Xl Link Double Hoop Earrings',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=99116810&selectedCurrency=GBP',
            },
            {
              id: '75278601',
              url: 'https://www.flannels.com/shrimps-antonia-headband-752786#colcode=75278601',
              productBrand: 'SHRIMPS',
              productName: 'Antonia Headband',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=75278601&selectedCurrency=GBP',
            },
            {
              id: '23375406',
              url: 'https://www.flannels.com/christian-louboutin-hot-chick-patent-100-233754#colcode=23375418',
              productBrand: 'CHRISTIAN LOUBOUTIN',
              productName: 'Hot Chick Patent 100',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23375418&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '1',
          outfitsData: [
            {
              id: '64869203',
              url: 'https://www.flannels.com/roberta-einer-ali-mini-dress-648692#colcode=64869203',
              productBrand: 'ROBERTA EINER',
              productName: 'Ali Mini Dress',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=64869203&selectedCurrency=GBP',
            },
            {
              id: '70774916',
              url: 'https://www.flannels.com/bottega-veneta-mini-woven-jodie-bag-707749#colcode=70774916',
              productBrand: 'BOTTEGA VENETA',
              productName: 'Mini Woven Jodie Bag',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=70774916&selectedCurrency=GBP',
            },
            {
              id: '23324903',
              url: 'https://www.flannels.com/saint-laurent-opyum-heeled-sandals-233249#colcode=23324903',
              productBrand: 'SAINT LAURENT',
              productName: 'Opyum Heeled Sandals',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23324903&selectedCurrency=GBP',
            },
            {
              id: '91438216',
              url: 'https://www.flannels.com/pia-hallstrom-7mm-single-pyramid-necklace-914382#colcode=91438216',
              productBrand: 'PIA HALLSTROM',
              productName: '7mm Single Pyramid Necklace',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=91438216&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '2',
          outfitsData: [
            {
              id: '64662203',
              url: 'https://www.flannels.com/1017-alyx-9sm-alyx-tailoring-dress-ld14-646622#colcode=64662203',
              productBrand: '1017 ALYX 9SM',
              productName: 'ALYX Tailoring Dress Ld14',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=64662203&selectedCurrency=GBP',
            },
            {
              id: '23297401',
              url: 'https://www.flannels.com/prada-triangle-logo-platform-boot-232974#colcode=23297401',
              productBrand: 'PRADA',
              productName: 'Triangle Logo Platform Boot',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23297401&selectedCurrency=GBP',
            },
            {
              id: '70887203',
              url: 'https://www.flannels.com/valentino-garavani-valentino-mini-hobo-bag-708872#colcode=70887201',
              productBrand: 'VALENTINO GARAVANI',
              productName: 'Valentino Mini Hobo Bag',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=70887201&selectedCurrency=GBP',
            },
            {
              id: '67074701',
              url: 'https://www.flannels.com/max-mara-madame-overcoat-670747#colcode=67074701',
              productBrand: 'MAX MARA',
              productName: 'Madame Overcoat',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=67074701&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '3',
          outfitsData: [
            {
              id: '65111215',
              url: 'https://www.flannels.com/christopher-esber-triquetra-dress-651112#colcode=65111215',
              productBrand: 'CHRISTOPHER ESBER ',
              productName: 'Triquetra Dress',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=65111215&selectedCurrency=GBP',
            },
            {
              id: '23324965',
              url: 'https://www.flannels.com/saint-laurent-opyum-heeled-sandals-233249#colcode=23324965',
              productBrand: 'SAINT LAURENT',
              productName: 'Opyum Heeled Sandals',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23324965&selectedCurrency=GBP',
            },
            {
              id: '70774940',
              url: 'https://www.flannels.com/bottega-veneta-mini-woven-jodie-bag-707749#colcode=70774940',
              productBrand: 'BOTTEGA VENETA',
              productName: 'Mini Woven Jodie Bag',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=70774940&selectedCurrency=GBP',
            },
            {
              id: '75004999',
              url: 'https://www.flannels.com/prada-crystal-logo-jewels-zirconia-earrings-750049#colcode=75004999',
              productBrand: 'PRADA',
              productName: 'Crystal Logo Jewels Zirconia Earrings',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=75004999&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '4',
          outfitsData: [
            // PROBLEM
            {
              id: '70600803',
              url: 'https://www.flannels.com/prada-sequin-triangle-bag-706008#colcode=70600803',
              productBrand: 'PRADA',
              productName: 'Sequin Triangle Bag',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=70600803&selectedCurrency=GBP',
            },
            {
              id: '64815703',
              url: 'https://www.flannels.com/harmur-mini-dress-648157#colcode=64815703',
              productBrand: 'HARMUR',
              productName: 'Mini Dress',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=64815703&selectedCurrency=GBP',
            },
            // PROBLEM
            {
              id: '23297401',
              url: 'https://www.flannels.com/prada-triangle-logo-platform-boot-232974#colcode=23297401',
              productBrand: 'PRADA',
              productName: 'Triangle Logo Platform Boot',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23297401&selectedCurrency=GBP',
            },
            {
              id: '99097811',
              url: 'https://www.flannels.com/balenciaga-bb-drop-earring-990978#colcode=99097811',
              productBrand: 'BALENCIAGA',
              productName: 'Bb Drop Earring',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=99097811&selectedCurrency=GBP',
            },
          ],
        },
      ];

      var boxingDay = [
        {
          outfits: '0',
          outfitsData: [
            {
              id: '66061404',
              url: 'https://www.flannels.com/max-mara-weekend-dama-trench-coat-660614#colcode=66061404',
              productBrand: 'Max Mara Weekend',
              productName: 'Dama Trench Coat',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=66061404&selectedCurrency=GBP',
            },
            {
              id: '70275770',
              url: 'https://www.flannels.com/bottega-veneta-pouch-medium-clutch-702757#colcode=70275770',
              productBrand: 'Bottega Veneta',
              productName: 'Pouch Medium Clutch',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=70275770&selectedCurrency=GBP',
            },
            {
              id: '57508603',
              url: 'https://www.flannels.com/hayley-menzies-forever-portobello-silk-skirt-575086#colcode=57508603',
              productBrand: 'HAYLEY MENZIES',
              productName: 'Forever Portobello Silk Skirt',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=57508603&selectedCurrency=GBP',
            },
            {
              id: '23247503',
              url: 'https://flannels.com/balmain-ranger-boots-232475#colcode=23247503',
              productBrand: 'BALMAIN',
              productName: 'Ranger Boots',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23247503&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '1',
          outfitsData: [
            {
              id: '51082403',
              url: 'https://flannels.com/levete-room-polly-dress-510824#colcode=51082403',
              productBrand: 'Levete Room',
              productName: 'Polly Dress',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=51082403&selectedCurrency=GBP',
            },
            {
              id: '91408610',
              url: 'https://www.flannels.com/versace-greca-and-medusa-drop-earings-914086#colcode=91408610',
              productBrand: 'VERSACE',
              productName: 'Greca And Medusa Drop Earings',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=91408610&selectedCurrency=GBP',
            },
            {
              id: '23184503',
              url: 'https://www.flannels.com/jimmy-choo-bing-100-231845#colcode=23184503',
              productBrand: 'JIMMY CHOO',
              productName: 'Bing 100',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23184503&selectedCurrency=GBP',
            },
            {
              id: '71126918',
              url: 'https://www.flannels.com/bottega-veneta-point-711269#colcode=71126918',
              productBrand: 'Bottega Veneta',
              productName: 'Point',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=71126918&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '2',
          outfitsData: [
            {
              id: '64748013',
              url: 'https://www.flannels.com/dolce-and-gabbana-boyfriend-jeans-647480#colcode=64748013',
              productBrand: 'DOLCE AND GABBANA',
              productName: 'Boyfriend Jeans',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=64748013&selectedCurrency=GBP',
            },
            {
              id: '65064201',
              url: 'https://www.flannels.com/alexander-wang-twist-front-shirt-650642#colcode=65064201',
              productBrand: 'ALEXANDER WANG',
              productName: 'wist Front Shirt',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=65064201&selectedCurrency=GBP',
            },
            {
              id: '23209103',
              url: 'https://flannels.com/burberry-vintage-check-lined-leather-ankle-boots-232091#colcode=23209103',
              productBrand: 'BURBERRY',
              productName: 'Vintage Check Lined Leather Ankle Boots',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23209103&selectedCurrency=GBP',
            },
            {
              id: '76857303',
              url: 'https://www.flannels.com/balenciaga-hourglass-xs-bag-768573#colcode=76857303',
              productBrand: 'BALENCIAGA',
              productName: 'Hourglass Xs Bag',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=76857303&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '3',
          outfitsData: [
            {
              id: '23332603',
              url: 'https://www.flannels.com/alexander-mcqueen-glossy-loafers-233326#colcode=23332603',
              productBrand: 'ALEXANDER MCQUEEN',
              productName: 'Glossy Loafers',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=23332603&selectedCurrency=GBP',
            },
            {
              id: '64697804',
              url: 'https://www.flannels.com/saint-laurent-jumper-dress-646978#colcode=64697804',
              productBrand: 'SAINT LAURENT',
              productName: 'Jumper Dress',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=64697804&selectedCurrency=GBP',
            },
            {
              id: '99097811',
              url: 'https://www.flannels.com/balenciaga-bb-drop-earring-990978#colcode=99097811',
              productBrand: 'BALENCIAGA',
              productName: 'Bb Drop Earring',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=99097811&selectedCurrency=GBP',
            },
            {
              id: '32330903',
              url: 'https://www.flannels.com/alexander-mcqueen-oversize-double-breasted-coat-323309#colcode=32330903',
              productBrand: 'ALEXANDER MCQUEEN',
              productName: 'Oversize Double Breasted Coat',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=32330903&selectedCurrency=GBP',
            },
          ],
        },
        {
          outfits: '4',
          outfitsData: [
            {
              id: '39058803',
              url: 'https://www.flannels.com/prada-shearling-bucket-hat-390588#colcode=39058803',
              productBrand: 'PRADA',
              productName: 'Shearling Bucket Hat',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=39058803&selectedCurrency=GBP',
            },
            {
              id: '27615803',
              url: 'https://www.flannels.com/comme-des-garcons-play-large-heart-chuck-taylor-70-all-star-high-trainers-276158#colcode=27615803',
              productBrand: 'COMME DES GARCONS PLAY',
              productName: 'Large Heart Chuck Taylor 70 All Star High Trainers',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=27615803&selectedCurrency=GBP',
            },
            {
              id: '66037202',
              url: 'https://www.flannels.com/canada-goose-cypress-puffer-jacket-660372#colcode=66037202',
              productBrand: 'CANADA GOOSE',
              productName: 'Cypress Puffer Jacket',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=66037202&selectedCurrency=GBP',
            },
            {
              id: '64617603',
              url: 'https://www.flannels.com/versace-jeans-couture-versace-jeans-couture-logo-skinny-jean-ladies-646176#colcode=64617603',
              productBrand: 'VERSACE JEANS COUTURE',
              productName: 'Versace Jeans Couture Logo Skinny Jean Ladies',
              productDetailsUrl:
                'https://www.flannels.com/productdetail/getcolourvariantsforproduct?productId=64617603&selectedCurrency=GBP',
            },
          ],
        },
      ];
      return { chrismasDayData, nyeData, boxingDay };
    },

    mainCss: function () {
      var styles = document.createElement('style');
      styles.setAttribute('type', 'text/css');
      document.head.appendChild(styles).textContent =
        '' +
        '.flan-631-hidden {' +
        '  display: none !important;' +
        '}' +
        '.flan-631-parent-container {' +
        '  padding: 0px 19px 0 43px;' +
        '  min-height: 520px;' +
        '  margin-top:40px;' +
        '}' +
        '.flan-631-main-container {' +
        '  display: flex;' +
        '  background-color: #e4e4e4;' +
        '  height: 465px;' +
        '  padding-top: 69px;' +
        '}' +
        '.flan-631-dropdown-parent-container {' +
        '  width: 20%;' +
        '  padding: 0 10px;' +
        '}' +
        '.flan-631-bar-background {' +
        '  height: 21px;' +
        '  background-image: url(https://www.flannels.com/Images/Marketing/patterns/pattern-glitter-tile-fade.jpg);' +
        '  background-position: center;' +
        '}' +
        '.flan-631-products-grid-shuffle-container {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  justify-content: space-between;' +
        '  width: 80%;' +
        '  align-items: flex-start;' +
        '}' +
        '.flan-631-products-grid-container {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  width: 99%;' +
        '}' +
        '.flan-631-product-container {' +
        '  min-height: 375px;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  padding: 20px 3%;' +
        '  width: 23%;' +
        '  background-color: white;' +
        '  position: relative;' +
        '}' +
        '.flan-631-product-container:hover {' +
        '  box-shadow: 0px 0px 10px -3px black;' +
        '}' +
        '.flan-631-product-image-container {' +
        '  height: auto;' +
        '  width: 100%;' +
        '  overflow: visible;' +
        '}' +
        'img.flan-631-product-image {' +
        '  height: 100%;' +
        '  width: 100%;' +
        '}' +
        '.flan-631-product-text-container {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  align-items: center;' +
        '}' +
        '.flan-631-product-brand {' +
        '  font-size: 14px;' +
        '  font-weight: 700;' +
        '  line-height: 18px;' +
        '  text-align: center;' +
        '  padding-top: 45px;' +
        '  text-transform: uppercase;' +
        '}' +
        '.flan-631-product-name {' +
        '  font-size: 14px;' +
        '  line-height: 18px;' +
        '  text-align: center;' +
        '  text-transform: uppercase;' +
        '}' +
        '.flan-631-product-price {' +
        '  font-size: 14px;' +
        '  line-height: 15px;' +
        '  text-align: center;' +
        '  padding-top: 20px;' +
        '}' +
        '.flan-631-dropdown-container-text span {' +
        '  font-size: 12px;' +
        '  line-height: 14px;' +
        '  width: 100%;' +
        '}' +
        '.flan-631-dropdown-container-text {' +
        '  width: 100%;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '}' +
        '.flan-631-shop-by-occasion {' +
        '  font-weight: 700;' +
        '  font-size: 12px;' +
        '  line-height: 17px;' +
        '  font-family: "Gotham-Medium", Arial, Helvetica, sans-serif;' +
        '}' +
        '.flan-631-dropdown-button {' +
        '  height: 45px;' +
        '  border: 0.5px solid black;' +
        '  background-color: white;' +
        '  font-size: 12px;' +
        '  line-height: 17px;' +
        '  display: flex;' +
        '  align-items: center;' +
        '  padding-left: 13px;' +
        '  position: relative;' +
        '  font-family: "Gotham-Medium", Arial, Helvetica, sans-serif;' +
        '}' +
        '.flan-631-no-border-bottom {' +
        '  border-bottom: 0 !important;' +
        '}' +
        '.flan-631-up-arrow, .flan-631-down-arrow {' +
        '  width: 12px;' +
        '  right: 10px;' +
        '  position: absolute;' +
        '}' +
        '.flan-631-dropdown-container {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  width: 100%;' +
        '  margin-top:12px;' +
        '  cursor: pointer;' +
        '  position: relative;' +
        '}' +
        '.flan-631-dropdown-content-container {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  border: 0.5px solid #000000;' +
        '  background-color: white;' +
        '  height: max-content;' +
        '  justify-content: space-evenly;' +
        '  padding-left: 13px;' +
        '  position: absolute; ' +
        '  width: 100%; ' +
        '  top: 45px; ' +
        '}' +
        '.dropdown-content {' +
        '  font-size: 12px;' +
        '  line-height: 27px;' +
        '  margin: 5px 0;' +
        '}' +
        '.flan-631-dropdown-main-container {' +
        '  margin: 50px 0;' +
        '}' +
        '.shuffle-outfit-button {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  width: 90%;' +
        '  justify-content: center;' +
        '  height: 45px;' +
        '  background-color: black;' +
        '  text-align: center;' +
        '  padding: 10px 30px;' +
        '  cursor: pointer;' +
        '  margin: 10px 0;' +
        '}' +
        '.shuffle-outfit-button span {' +
        '  font-size: 13px;' +
        '  line-height: 22px;' +
        '  letter-spacing: 0.4px;' +
        '  color: white;' +
        '  font-family: "Gotham-Medium", Arial, Helvetica, sans-serif;' +
        '  font-weight: bold; ' +
        '}' +
        '#hotspotModal .swiper-button-prev {' +
        '  transform: rotate(0deg);' +
        '}' +
        '.flan-631-mobile-main-container {' +
        '  width: 100%;' +
        '}' +
        '.flan-631-mobile-products-grid-container {' +
        '  padding: 12px;' +
        '}' +
        '.flan-631-mobile-style-assistant-text-container {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  align-items: center;' +
        '  padding: 12px;' +
        '}' +
        '.flan-631-mobile-style-assistant-text-container h2::after{' +
        '  width:240px;' +
        '}' +
        'span.flan-631-mobile-style-assistant-text {' +
        '  font-size: 20px;' +
        '  line-height: 24px;' +
        '  text-decoration: underline;' +
        '  margin-bottom: 5px;' +
        '}' +
        'span.flan-631-mobile-get-inspired-text {' +
        '  font-size: 11px;' +
        '  line-height:42px;' +
        '}' +
        '.flan-631-mobile-swiper-occasion-parent {' +
        '  overflow: scroll;' +
        '  height: 42px;' +
        '  -ms-overflow-style: none;' +
        '  scrollbar-width: none;' +
        '  margin-bottom: 12px;' +
        '}' +
        '.flan-631-mobile-swiper-occasion-parent::-webkit-scrollbar {' +
        '  display: none;' +
        '}' +
        '.flan-631-mobile-swiper-occasion-container {' +
        '  display: flex;' +
        '  width: max-content;' +
        '}' +
        '.flan-631-mobile-swiper-occasion {' +
        '  display: flex;' +
        '  justify-content: center;' +
        '  align-items: center;' +
        '  width: 150px;' +
        '  border: 1px solid black;' +
        '  padding: 12px 0;' +
        '  margin-right: 12px;' +
        '  text-transform: uppercase;' +
        '}' +
        '.boxingDay-mobile-selector {' +
        '  margin-left: 12px;' +
        '}' +
        '.flan-631-selected-occasion {' +
        '  background-color: black;' +
        '  color: white;' +
        '}' +
        '.flan-631-mobile-products-grid-container {' +
        '  background-color: #f5f5f5;' +
        '}' +
        '.flan-mobile .flan-631-products-grid-container {' +
        '  display: flex;' +
        '  justify-content: space-between;' +
        '  flex-wrap: wrap;' +
        '}' +
        '.flan-mobile .flan-631-product-container {' +
        '  width: 48%;' +
        '  min-height: max-content !important;' +
        '  padding: 20px 20px;' +
        '  margin-bottom: 12px;' +
        '}' +
        '.flan-mobile .flan-631-product-brand {' +
        '  padding-top: 9px;' +
        '}' +
        '.flan-mobile .flan-631-product-text-container span {' +
        '  font-size: 11px;' +
        '  line-height: 15px;' +
        '}' +
        '.shuffle-outfit-button-container {' +
        '  display: flex;' +
        '  justify-content: center;' +
        '  align-items: center;' +
        '  background-position: 0 80%;' +
        '}' +
        '.flan-631-bar-background-mobile{' +
        '  background-image: url(https://www.flannels.com/Images/Marketing/patterns/pattern-glitter-tile-fade.jpg);' +
        '  background-position: center;' +
        '  height: 21px;' +
        '  width: 100%;' +
        '}' +
        '.flan-mobile .shuffle-outfit-button {' +
        '  padding: 10px 70px;' +
        '}' +
        '.flan-631-parent-container {' +
        '  display: block;' +
        '}' +
        '.flan-631-parent-container-mobile {' +
        '  display: none;' +
        '}' +
        '#flan-631-myBtn {' +
        '  position: absolute;' +
        '  right: 0;' +
        '  top: 0;' +
        '  width: 100%; ' +
        '  height: 100%; ' +
        '}' +
        '#flan-631-myBtn svg {' +
        '  position: absolute;' +
        '  right: 0;' +
        '  top: 0;' +
        '}' +
        '.shuffle-outfit-button-container-desktop {' +
        '  display: flex;' +
        '  justify-content: center;' +
        '  width: 100%;' +
        '  padding-top: 10px;' +
        '}' +
        '.flan-631-text-container {' +
        '  position: relative;' +
        '}' +
        '.flan-631-text-container span {' +
        '  position: absolute;' +
        '  font-size: 30px;' +
        '  line-height: 38px;' +
        "  font-family: 'Gotham HTF', sans-serif;" +
        '  font-weight: 700;' +
        '  left: 2%;' +
        '  top: 10px;' +
        '}' +
        '#flan-631-myBtn {' +
        '  cursor: pointer;' +
        '}' +
        '.flan-631-dropdown-button-label {' +
        '  font-size: 12px;' +
        '  line-height: 17px;' +
        '  font-weight: 700;' +
        '  font-family: "Gotham-Medium", Arial, Helvetica, sans-serif;' +
        '}' +
        '@media only screen and (min-width: 768px) {' +
        '  .flan-631 .swiper-pagination {' +
        '    display: flex !important;' +
        '    justify-content: center;' +
        '    position: relative !important;' +
        '    top: -10px;' +
        '  }' +
        '}' +
        '@media screen and (max-width: 1024px) and (min-width: 769px){' +
        '.flan-631-dropdown-container-text span {' +
        'font-size: 10px;' +
        '}' +
        '}' +
        '@media only screen and (max-width: 768px) {' +
        '  .flan-631-product-container:hover {' +
        '    border-bottom: 0;' +
        '    box-shadow: none;' +
        '  }' +
        '  #hotspotModal .modal-dialog {' +
        '    margin-top: 0 !important;' +
        '    top: 50%;' +
        '    transform: translateY(-50%);' +
        '  }' +
        '  #hotspotModal .swiper-pagination {' +
        '    display: flex;' +
        '    justify-content: center;' +
        '    align-items: center;' +
        '    padding: 5px 0;' +
        '  }' +
        '  .flan-631-parent-container {' +
        '    display: none;' +
        '  }' +
        '  .flan-631-parent-container-mobile {' +
        '    display: flex;' +
        '    flex-direction: column;' +
        '    align-items: center;' +
        '  }' +
        '}' +
        '@media only screen and (max-width: 360px) {' +
        '  span.flan-631-mobile-get-inspired-text{' +
        '     font-size:10px;' +
        '  }' +
        '}' +
        '';
    },
    /* WRITE CODE BELOW THIS LINE */
    mainJs: function () {
      this.createProductGrid();
      this.staticData();
      this.makeProduct();
      this.shuffleOutfit();
      this.shuffleOutfitMobile();
      this.selectOccasion();
      this.selectOccasionMobile();
    },
    basketIcon: function () {
      return '<svg class = "flan-631-basket-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"> <rect width="40" height="40" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M31.1295 13.4437C32.8219 31.5294 32.8219 32 32.8219 32C32.8219 32 31.7642 32 26.1934 32C20.6225 32 9.2693 32 9.2693 32H8L9.83344 13.5781L31.1295 13.4437Z" stroke="black"/> <path d="M26.395 13.5216C26.395 13.5216 26.4656 7 20.5421 7C14.6187 7 14.4072 13.6561 14.4072 13.6561" stroke="black"/> <path d="M36.5 13.5C36.5 16.2614 34.2614 18.5 31.5 18.5C28.7386 18.5 26.5 16.2614 26.5 13.5C26.5 10.7386 28.7386 8.5 31.5 8.5C34.2614 8.5 36.5 10.7386 36.5 13.5Z" fill="black" stroke="black"/> <line x1="31.5" y1="10" x2="31.5" y2="17" stroke="white"/> <line x1="35" y1="13.5" x2="28" y2="13.5" stroke="white"/> </svg>';
    },
    createProductGrid: function () {
      var mainContainer = document.createElement('div');
      mainContainer.classList.add('flan-631-parent-container', 'u-contain');

      mainContainer.innerHTML = `<div class = "flan-631-text-container">
                                        <span>Style Assistant</span>
                                    </div>
                                    <div  class = "flan-631-main-container flan-desktop">
                                        <div class = "flan-631-dropdown-parent-container">
                                            <div class = "flan-631-dropdown-container-text">
                                                <span>Get inspired this holiday season</span>
                                                <span>by shuffling through our pieces.</span>
                                            </div>
                                            <div class = "flan-631-dropdown-main-container">
                                                <span class = "flan-631-shop-by-occasion">Shop By Occasion</span>
                                                <div class = "flan-631-dropdown-container">
                                                    <div class = "flan-631-dropdown-button">
                                                        <span class = "flan-631-dropdown-button-label">Boxing Day</span>
                                                        ${flan631SA.upArrow()}
                                                        ${flan631SA.downArrow()}
                                                    </div>
                                                    <div class = "flan-631-dropdown-content-container flan-631-hidden">
                                                        <span class = "flan-631-dropdown-content-christmas dropdown-content" data-group="chrismasDayData">Christmas Day</span>
                                                        <span class = "flan-631-dropdown-content-boxing dropdown-content" data-group="boxingDay">Boxing Day</span>
                                                        <span class = "flan-631-dropdown-content-newyear dropdown-content" data-group="nyeData">New Year's Eve</span>
                                                    </div>
                                                </div>

                                                <div class = "shuffle-outfit-button-container-desktop">
                                                  <div class = "shuffle-outfit-button">
                                                      <span>SHUFFLE OUTFITS</span>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class = "flan-631-products-grid-shuffle-container">
                                            <div  class = "flan-631-products-grid-container">
                                                <div class = "flan-631-product" parent-group="boxingDay"></div>
                                                <div class = "flan-631-product flan-631-hidden" parent-group="chrismasDayData"></div>
                                                <div class = "flan-631-product flan-631-hidden" parent-group="nyeData"></div>
                                            </div>
                                            
                                        </div>
                                    </div>`;
      if (window.location.pathname != '/christmas') {
        document
          .querySelector('#main-content')
          .querySelectorAll('.ecomContent')[5]
          .insertAdjacentElement('afterend', mainContainer);
      } else {
        document
          .querySelector('#dnn_ContentPane')
          .querySelector('.DnnModule-155158543')
          .insertAdjacentElement('beforebegin', mainContainer);
      }

      var mainContainerMobile = document.createElement('div');
      mainContainerMobile.classList.add('flan-631-parent-container-mobile');

      mainContainerMobile.innerHTML = ` <div class = "flan-631-mobile-main-container flan-mobile">
                                            <div class = "flan-631-mobile-text-container">
                                              <div class = "flan-631-mobile-style-assistant-text-container">
                                                  <h2 class="u-feature__title style-news__title">
											            Style Assistant
											      </h2>
                                                  <span class = "flan-631-mobile-get-inspired-text">Get inspired this holiday season by shuffling through our pieces.</span>
                                              </div>
                                              <div class = "flan-631-mobile-swiper-occasion-parent">
                                                <div class = "flan-631-mobile-swiper-occasion-container">
                                                    <div class = "flan-631-mobile-swiper-occasion boxingDay-mobile-selector" data-group="boxingDay">Boxing Day</div>
                                                    <div class = "flan-631-mobile-swiper-occasion christmas-mobile-selector flan-631-selected-occasion" data-group="chrismasDayData">Christmas Day</div>
                                                    <div class = "flan-631-mobile-swiper-occasion newyear-mobile-selector flan-631-selected-occasion" data-group="nyeData">New Year's Eve</div>
                                                </div>
                                              </div>
                                            </div>
                                            
                                            <div class = "flan-631-mobile-products-grid-container">
                                                <div class = "flan-631-product" parent-group="boxingDay"></div>
                                                <div class = "flan-631-product flan-631-hidden" parent-group="chrismasDayData"></div>
                                                <div class = "flan-631-product flan-631-hidden" parent-group="nyeData"></div>

                                                <div class = "shuffle-outfit-button-container">
                                                    <div class = "shuffle-outfit-button flan-631-mobile-shuffle">
                                                       <span>SHUFFLE OUTFITS</span>
                                                    </div>
                                                </div>

                                                
                                            </div>
                                            
                                        </div>`;
      if (window.location.pathname != '/christmas') {
        document
          .querySelector('#main-content')
          .querySelectorAll('.ecomContent')[5]
          .insertAdjacentElement('afterend', mainContainerMobile);
      } else {
        document
          .querySelector('#dnn_ContentPane')
          .querySelector('.DnnModule-155158543')
          .insertAdjacentElement('beforebegin', mainContainerMobile);
      }

      document.querySelector('.flan-631-dropdown-button').addEventListener('click', function (e) {
        document.querySelector('.flan-631-dropdown-content-container').classList.toggle('flan-631-hidden');
        document.querySelector('.flan-631-down-arrow').classList.toggle('flan-631-hidden');
        document.querySelector('.flan-631-up-arrow').classList.toggle('flan-631-hidden');
        this.classList.toggle('flan-631-no-border-bottom');
      });

      document.querySelector('body').addEventListener('click', function (e) {
        if (e.target != document.querySelector('.flan-631-dropdown-button') && !e.target.closest('.flan-631-dropdown-button')) {
          document.querySelector('.flan-631-dropdown-content-container').classList.add('flan-631-hidden');
          document.querySelector('.flan-631-down-arrow').classList.remove('flan-631-hidden');
          document.querySelector('.flan-631-up-arrow').classList.add('flan-631-hidden');
          document.querySelector('.flan-631-dropdown-button').classList.remove('flan-631-no-border-bottom');
        }
      });
      document.querySelectorAll('.dropdown-content').forEach(function (item, key) {
        item.addEventListener('click', function (e) {
          document.querySelector('.flan-631-dropdown-button span').innerText = this.innerText;
          document.querySelector('.flan-631-dropdown-content-container').classList.toggle('flan-631-hidden');
          document.querySelector('.flan-631-down-arrow').classList.toggle('flan-631-hidden');
          document.querySelector('.flan-631-up-arrow').classList.toggle('flan-631-hidden');
          document.querySelector('.flan-631-dropdown-button').classList.toggle('flan-631-no-border-bottom');
        });
      });
    },
    makeProduct: function () {
      var data = flan631SA.staticData();
      var apiCount = 0;
      Object.entries(data).forEach(function (item, key) {
        item[1].forEach(function (e, index) {
          var productContainer;
          if (index == 0) {
            productContainer = `<div class = "flan-631-product-group-container flan-631-products-grid-container" data-ind="${index}" product-group = "${item[0]}">

                    </div>`;
          } else {
            productContainer = `<div class = "flan-631-product-group-container flan-631-products-grid-container flan-631-hidden" data-ind="${index}" product-group = "${item[0]}">

                    </div>`;
          }

          document.querySelectorAll('.flan-631-product[parent-group="' + item[0] + '"]').forEach(function (x, y) {
            x.insertAdjacentHTML('beforeend', productContainer);
          });

          e.outfitsData.forEach(function (elem, k) {
            fetch(elem.productDetailsUrl)
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                data.variantsData.forEach(function (element, ind) {
                  if (elem.id == element.colVarId) {
                    var imageUrl = element.imageUrl;

                    var sellingPrice = element.prodVarPrices.sellPrice;
                    var product = `<div class = "flan-631-product-container" data-colourvariantid="${elem.id}">
                                                    <div id="flan-631-myBtn" data-colourvarId="${elem.id}">
                                                    ${flan631SA.basketIcon()}
                                                    </div>
                                                    <div class = "flan-631-product-image-container">
                                                        <img class = "flan-631-product-image" src="${imageUrl}">
                                                    </div>
                                                    
                                                    <div class = "flan-631-product-text-container">
                                                        <span class = "flan-631-product-brand">${elem.productBrand}</span>
                                                        <span class = "flan-631-product-name">${elem.productName}</span>
                                                        <span class = "flan-631-product-price">${sellingPrice}</span>
                                                    </div>
                                                </div>
                                                <div class="hotspotbuy hotspotquickbuy" data-colourvariantid="${
                                                  elem.id
                                                }" data-hsshowallcolours="true" data-hshidesinglesize="true" data-iswishlist="false" style="display: none;">
                                                  <span class="QuickLookIcon"></span>
                                                  <span class="QuickLookText">Quick view</span>
                                                </div>`;

                    document
                      .querySelectorAll(
                        '.flan-631-product-group-container[product-group="' + item[0] + '"][data-ind="' + index + '"]'
                      )
                      .forEach(function (a, b) {
                        a.insertAdjacentHTML('beforeend', product);
                      });
                  }
                });
              })
              .finally(() => {
                apiCount++;
                if (apiCount >= 60) {
                  flan631SA.showModal();
                  flan631SA.eventTracking();
                }
              });
          });
        });
      });

      if (
        sessionStorage.getItem('desktopDataIndex') &&
        sessionStorage.getItem('desktopProductGroup') &&
        window.visualViewport.width > 768
      ) {
        this.desktopView();
      } else if (
        sessionStorage.getItem('mobileDataIndex') &&
        sessionStorage.getItem('mobileProductGroup') &&
        window.visualViewport.width <= 768
      ) {
        this.mobileView();
      }
    },
    showModal: function () {
      var btn = document.querySelectorAll('#flan-631-myBtn');
      btn.forEach(function (item, key) {
        item.addEventListener('click', function () {
          fireEvent('Click - add to basket mini icon open modal');
          configureGtmForHotspotQuickBuy(item.getAttribute('data-colourvarId'));
          showHotSpotPurchaseDetails(item.parentNode);
        });
      });
    },
    selectOccasion: function () {
      document.querySelectorAll('.dropdown-content').forEach(function (item, key) {
        item.addEventListener('click', function (e) {
          fireEvent(`Click - Chose Item in Dropdown - ${e.target.innerText}`);
          document
            .querySelectorAll('.flan-desktop .flan-631-product:not([parent-group="' + e.target.getAttribute('data-group') + '"])')
            .forEach(function (element, ind) {
              element.classList.add('flan-631-hidden');
            });
          document
            .querySelector('.flan-desktop .flan-631-product[parent-group="' + e.target.getAttribute('data-group') + '"]')
            .classList.remove('flan-631-hidden');
        });
      });
    },
    selectOccasionMobile: function () {
      document.querySelectorAll('.flan-631-mobile-swiper-occasion').forEach(function (item, key) {
        item.addEventListener('click', function (e) {
          if (key == 2) {
            item.closest('.flan-631-mobile-swiper-occasion-parent').scrollLeft = 200;
          } else if (key == 1) {
            item.closest('.flan-631-mobile-swiper-occasion-parent').scrollLeft = 200;
          } else {
            item.closest('.flan-631-mobile-swiper-occasion-parent').scrollLeft = 0;
          }
          document
            .querySelectorAll('.flan-mobile .flan-631-product:not([parent-group="' + e.target.getAttribute('data-group') + '"])')
            .forEach(function (element, ind) {
              element.classList.add('flan-631-hidden');
            });

          document
            .querySelectorAll(
              '.flan-mobile .flan-631-mobile-swiper-occasion:not([data-group="' + e.target.getAttribute('data-group') + '"])'
            )
            .forEach(function (element, ind) {
              element.classList.add('flan-631-selected-occasion');
            });
          document
            .querySelector('.flan-mobile .flan-631-product[parent-group="' + e.target.getAttribute('data-group') + '"]')
            .classList.remove('flan-631-hidden');
          document
            .querySelector(
              '.flan-mobile .flan-631-mobile-swiper-occasion[data-group="' + e.target.getAttribute('data-group') + '"]'
            )
            .classList.remove('flan-631-selected-occasion');
        });
      });
    },
    shuffleOutfit: function () {
      document.querySelector('.flan-desktop .shuffle-outfit-button').addEventListener('click', function (e) {
        var occasionContainer = document.querySelector('.flan-desktop .flan-631-product:not(.flan-631-hidden)');
        var n = parseInt(
          occasionContainer.querySelector('.flan-631-product-group-container:not(.flan-631-hidden)').getAttribute('data-ind')
        );
        fireEvent(`Click - Click Shuffle Outfits`);
        if (n <= 4) {
          if (n == 4) {
            n = 0;
            occasionContainer
              .querySelector('.flan-631-product-group-container[data-ind="' + 4 + '"]')
              .classList.add('flan-631-hidden');
            occasionContainer
              .querySelector('.flan-631-product-group-container[data-ind="' + n + '"]')
              .classList.remove('flan-631-hidden');
          } else {
            occasionContainer
              .querySelector('.flan-631-product-group-container[data-ind="' + n + '"]')
              .classList.add('flan-631-hidden');
            occasionContainer
              .querySelector('.flan-631-product-group-container[data-ind="' + (n + 1) + '"]')
              .classList.remove('flan-631-hidden');
          }
        }
      });
    },
    shuffleOutfitMobile: function () {
      document.querySelector('.flan-mobile .shuffle-outfit-button').addEventListener('click', function (e) {
        var occasionContainerMobile = document.querySelector('.flan-mobile .flan-631-product:not(.flan-631-hidden)');
        var n = parseInt(
          occasionContainerMobile
            .querySelector('.flan-631-product-group-container:not(.flan-631-hidden)')
            .getAttribute('data-ind')
        );

        fireEvent('Click - Click Shuffle Outfits');
        document.querySelector('.flan-631-parent-container-mobile').scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center',
        });
        if (n <= 4) {
          if (n == 4) {
            n = 0;
            occasionContainerMobile
              .querySelector('.flan-631-product-group-container[data-ind="' + 4 + '"]')
              .classList.add('flan-631-hidden');
            occasionContainerMobile
              .querySelector('.flan-631-product-group-container[data-ind="' + n + '"]')
              .classList.remove('flan-631-hidden');
          } else {
            occasionContainerMobile
              .querySelector('.flan-631-product-group-container[data-ind="' + n + '"]')
              .classList.add('flan-631-hidden');
            occasionContainerMobile
              .querySelector('.flan-631-product-group-container[data-ind="' + (n + 1) + '"]')
              .classList.remove('flan-631-hidden');
          }
        }
      });
    },
    downArrow: function () {
      return '<svg class = "flan-631-down-arrow" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-3x"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg>';
    },
    upArrow: function () {
      return '<svg class = "flan-631-up-arrow flan-631-hidden" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-up fa-w-14 fa-3x"><path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" class=""></path></svg>';
    },
    eventTracking: function () {
      fireEvent(`Visible - experiment has been loaded onto the page, further event tracking now loading`);

      document.body.addEventListener('click', (e) => {
        if (e.target.getAttribute('id') == 'addHotspotToBag' || e.target.classList.contains('innerHotSpotLine')) {
          document.querySelectorAll('#ulHsSizes li').forEach((item) => {
            if (item.classList.contains('hsVariantHighlight')) {
              fireEvent(`Click - Click- Add to Basket from Modal`);
              let dataParent;

              if (window.visualViewport.width > 768) {
                let check = document.querySelector('.flan-631-dropdown-button-label').innerText.trim();
                document.querySelectorAll('.flan-631-dropdown-content-container span').forEach((item) => {
                  if (item.innerText.trim() == check) {
                    dataParent = item.getAttribute('data-group');
                  }
                });

                const mainData = document.querySelector(
                  `.flan-desktop .flan-631-product[parent-group="${dataParent}"] .flan-631-product-group-container.flan-631-products-grid-container:not(.flan-631-hidden)`
                );
                sessionStorage.setItem('desktopDataIndex', mainData.getAttribute('data-ind'));
                sessionStorage.setItem('desktopProductGroup', mainData.getAttribute('product-group'));
              } else {
                let check = document
                  .querySelector(
                    '.flan-631-parent-container-mobile .flan-631-mobile-swiper-occasion:not(.flan-631-selected-occasion)'
                  )
                  .getAttribute('data-group');

                document
                  .querySelectorAll(
                    `.flan-631-parent-container-mobile .flan-631-product[parent-group="${check}"] [product-group="${check}"]`
                  )
                  .forEach((item) => {
                    if (item.classList.contains('flan-631-hidden') == false) {
                      dataParent = item.getAttribute('data-ind');
                    }
                  });

                sessionStorage.setItem('mobileDataIndex', dataParent);
                sessionStorage.setItem('mobileProductGroup', check);
              }
            }
          });
        }
      });

      var allAnchors = document.querySelectorAll('.flan-631-product-container a');
      allAnchors.forEach((item) => {
        item.addEventListener('click', (e) => {
          fireEvent(`Click - Click Product`);
        });
      });
    },
    desktopView: function () {
      let index = sessionStorage.getItem('desktopDataIndex');
      let group = sessionStorage.getItem('desktopProductGroup');
      document
        .querySelectorAll(`.flan-631-parent-container.u-contain .flan-631-products-grid-container .flan-631-product`)
        .forEach((item) => {
          if (item.getAttribute('parent-group') == group) {
            item.classList.contains('flan-631-hidden') && item.classList.remove('flan-631-hidden');
            item.querySelectorAll('.flan-631-product-group-container').forEach((em) => {
              if (em.getAttribute('data-ind') === index) {
                em.classList.contains('flan-631-hidden') && em.classList.remove('flan-631-hidden');
                document
                  .querySelectorAll('.flan-631-parent-container.u-contain .flan-631-dropdown-content-container .dropdown-content')
                  .forEach((dropdown) => {
                    if (dropdown.getAttribute('data-group') === group) {
                      document.querySelector('.flan-631-parent-container.u-contain .flan-631-dropdown-button-label').innerText =
                        dropdown.innerText;
                    }
                  });
              } else {
                em.classList.add('flan-631-hidden');
              }
            });
          } else {
            item.classList.add('flan-631-hidden');
          }
        });
    },
    mobileView: function () {
      let index = sessionStorage.getItem('mobileDataIndex');
      let group = sessionStorage.getItem('mobileProductGroup');
      document
        .querySelectorAll(
          `.flan-631-parent-container-mobile .flan-mobile .flan-631-mobile-products-grid-container .flan-631-product`
        )
        .forEach((item) => {
          if (item.getAttribute('parent-group') == group) {
            item.classList.remove('flan-631-hidden');
            item.querySelectorAll('.flan-631-product-group-container').forEach((em) => {
              if (em.getAttribute('data-ind') === index) {
                em.classList.contains('flan-631-hidden') && em.classList.remove('flan-631-hidden');
                document
                  .querySelectorAll(
                    '.flan-631-parent-container-mobile .flan-mobile .flan-631-mobile-swiper-occasion-container .flan-631-mobile-swiper-occasion'
                  )
                  .forEach((swiperItem) => {
                    if (swiperItem.getAttribute('data-group') === group) {
                      //document.querySelector('.flan-631-parent-container.flan-mobile .flan-631-dropdown-button-label').innerText=dropdown.innerText;
                      swiperItem.classList.contains('flan-631-selected-occasion') &&
                        swiperItem.classList.remove('flan-631-selected-occasion');
                    } else {
                      swiperItem.classList.add('flan-631-selected-occasion');
                    }
                  });
              } else {
                em.classList.add('flan-631-hidden');
              }
            });
          } else {
            item.classList.add('flan-631-hidden');
          }
        });
    },
    waitForEl: function (selector, callback) {
      if (document.querySelectorAll(selector).length == 116) {
        callback();
      } else {
        setTimeout(function () {
          flan631SA.waitForEl(selector, callback);
        }, 100);
      }
    },
  };
  (function pollOnload() {
    if (document.querySelector('body')) {
      try {
        if ($('body.flan-631').length) {
          return;
        }
        document.querySelector('body').classList.add('flan-631');
        flan631SA.init();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    } else {
      setTimeout(pollOnload, 25);
    }
  })();
};
