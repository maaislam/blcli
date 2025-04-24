// -------------------------------------------------
// Filters to display
// -------------------------------------------------
export const filters = [
    {
        name: 'back-size',
        values: ['28', '30', '32', '34', '36', '38', '40'],
    },
    {
        name: 'cup-size',
        values: ['D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H', 'HH', 'J', 'JJ', 'K', 'KK', 'L'],
    },
    {
        name: 'clothing-size',
        values: ['08', '10', '12', '14', '16', '18'],
    },
    {
        name: 'curvy-size',
        values: ['Curvy', 'Really Curvy', 'Super Curvy'],
    },
];

// -------------------------------------------------
// Identify filters to use
// -------------------------------------------------
export const filterChildren = [
    {
        name: 'lingerie',
        values: ['back-size', 'cup-size'],
    },
    {
        name: 'clothing',
        values: ['clothing-size', 'curvy-size'],
    },
    {
        name: 'swimwear',
        values: ['back-size', 'cup-size', 'clothing-size', 'curvy-size'],
    },
    {
        name: 'nightwear',
        values: ['back-size', 'cup-size', 'clothing-size', 'curvy-size'],
    },
    {
        name: 'sportswear',
        values: ['back-size', 'cup-size', 'clothing-size', 'curvy-size'],
    },
];

// -------------------------------------------------
// Categories to run on
// -------------------------------------------------
export const categories = [{
    categoryUrl: 'all-lingerie',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'sale-lingerie',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'new-in-lingerie',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'seasonal-sets',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'black-white-and-nude-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 't-shirt-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'non-wired-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'strapless-and-multiway-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'bralettes',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'sports-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'nursing-and-maternity-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'sleep-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'vest-tops-with-built-in-bra',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'bra-accessories-and-shapewear',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'all-clothing',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'sale-clothing',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'sale',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'new-in-clothing',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'dresses',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'shirts-and-tops',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'knitwear',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'coats-and-jackets',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'sportswear',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'vest-tops-with-built-in-bra',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'all-swimwear',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'sale-swimwear',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'new-in-swimwear',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'bikinis',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'swimsuits',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'tankinis',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'sports-swimsuits',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'maternity-swimsuits',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'beachwear-and-accessories',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'holiday-shop',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'all-nightwear',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'sale-nightwear',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'new-in-nightwear',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'sleep-bras',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'pyjama-tops',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'nightdresses',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'pyjama-bottoms',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'sportswear',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'new-in-sportswear',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-tops',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-bottoms',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-swimsuits',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-bras',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'wired-sports-bras',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'non-wired-sports-bras',
    categoryParent: 'sportswear'
  },
];

// -------------------------------------------------
// Define dual size bras to include
//
// This works around the issue of defining specific
// bra + back size combinations
// e.g. chosen 'd' => also include 'ddd'
// -------------------------------------------------
export const mapDualSizes = {
  'd': 'ddd',
  'dd': 'ddd',
  'e': 'ef',
  'f': 'ef',
  'ff': 'ffg',
  'g': 'ffg',
  'gg': 'ggh',
  'h': 'ggh',
  'hh': 'hhj',
  'j': 'hhj',
  'jj': 'jjk',
  'k': 'jjk',
  'kk': 'kkl',
  'l': 'kkl'
};
