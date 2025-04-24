
export default function herobannercontent () {
  /**
   * @desc Hero Banner Content
   */
  const banners = {
    parasols : {
      imageUrl: ['https://dd6zx4ibq538k.cloudfront.net/static/images/4068/1137f425782862d67ccfe045204db355_4847_1456.jpeg'],
      title: ['Parasols & Raincovers'],
      text: 'Keep little ones shaded, warm and dry with our range of pushchair and buggy accessories. Our attachable parasols are great for UPF sun protection, while our raincovers protect baby from wind and rain.',
    },
    bouncers : {
      imageUrl: ['https://dd6zx4ibq538k.cloudfront.net/static/images/4068/b41e8606e47bae8ba65da913995305b5_2000_1104.jpeg'],
      title: ['Rockers, Bouncers & Swings'],
      text: 'From seats that soothe to cradles that keep baby quiet, our Rockers, Bouncers & Swings are suitable from birth. Cradles include a range of features like swaying and vibrating motions, as well as lullaby sounds and stimulating hanging toys.',
    },
    blankets : {
      imageUrl: ['https://i1.adis.ws/i/mamasandpapas/756035000_Musical_Mobile_WTTW_Detail?qlt=40&amp;w=3000'],
      title: ['Blankets'],
      text: 'Blankets are a key parenting accessory; keep little ones warm in their pushchair or wrap them up for cuddles at home. We have a lots of stunningly designed knitted, cellular and 100% cotton blankets that are incredibly soft and comforting.',
    },
    cots : {
      imageUrl: ['https://dd6zx4ibq538k.cloudfront.net/static/images/4068/18af07a1040f6684de8a0c3ddb307b61_2000_1104.jpeg'],
      title: ['Cots, Cotbeds & Cribs'],
      text: 'Whether baby’s sleeping in your room or the nursery, we have a range of beds suitable for babies and toddlers. Choose cribs, cots and bedside cribs if you’re short on space, or a cotbed that converts into a toddler bed to take you up to 4 years.',
    },
  }

  let productsObj
  URL = window.location.href;

  const pageMatch = [
    {
      matchString: '/en-gb/c/parasols-raincovers',
      result: [
        banners.parasols.imageUrl,
        banners.parasols.title,
        banners.parasols.text,
      ]
    },
    {
      matchString: '/en-gb/c/rockers-bouncers-swings',
      result: [
        banners.bouncers.imageUrl,
        banners.bouncers.title,
        banners.bouncers.text,
      ]
    },
    {
      matchString: '/en-gb/c/blankets',
      result: [
        banners.blankets.imageUrl,
        banners.blankets.title,
        banners.blankets.text,
      ]
    },
    {
      matchString: '/en-gb/c/cots-cribs-cotbeds',
      result: [
        banners.cots.imageUrl,
        banners.cots.title,
        banners.cots.text,
      ]
    },
  ];
  
  let content = null;
  pageMatch.forEach((item) => {
    if(URL.indexOf(item.matchString) > -1) {
      content = item.result;
      console.log(content[0]);
      
      if (document.querySelector('.container-fluid.header #category-banner-title')) {
        document.querySelector('#category-banner-title').textContent = content[1];
        document.querySelector('#category-banner-txt').textContent = content[2];
      } else {
        const heroBannerContainer = `<div class="yCmsComponent content-plp">
        <div class="content"><style type="text/css">
             .plp-heading{display:none;}
             .header {background-size: cover;}
             .banner_title {font-weight:400;}
            .header-bg-white {background-color: rgba(255, 255, 255, 0.95);}
            .content-plp .content {max-width: 100%;}
            .banner_container {width:100%;}
            .subCategoryContainer {width: 100%; border-top: 1px solid #efefef; float:left; border-bottom: 1px solid #efefef; margin-bottom: 50px; overflow-x: scroll;}
            .breadcrumb{display:none;}
            ul.subCategoryList {margin: 0 auto;padding: 30px 0;text-align: center;width: max-content;}
            li.subCategoryList-item {margin:0 17px;display: inline-block;position: relative;}
            li.subCategoryList-item a {color: #828282;text-decoration: none;display: inline-block;position: relative; font-size: 16px;}
            li.subCategoryList-item a:after {content: '';display: block;margin: auto;height: 2px;width: 0px;background: transparent;transition: width .5s ease, background-color .5s ease;}
            li.subCategoryList-item a:hover:after {width: 100%;background: #E47562;}
            li.subCategoryList-item a:active {color: #E47562}
            li.subCategoryList-item:not(:first-child):before {content: '';position: absolute;left: -20px;top: calc(50% - 2px);width: 4px;height: 4px;border-radius: 2px;background-color: #90A3B7;}
            #category-banner-txt a {display: inline-block; text-decoration: underline; margin: 0 auto; font-weight: 400; cursor: pointer; padding: 20px 10px;}
        
        @media (max-width: 640px) {
        .container-fluid {display: none;}
            li.subCategoryList-item {margin:12px}
            ul.subCategoryList {padding: 12px 0}
            li.subCategoryList-item:not(:first-child):before {left: -15px}
        }
        </style>
        <div class="container-fluid header" style="background-image: url('${content[0]}'); display: block;">
        <div class="row px-md-6 py-5 px-3">
        <div class="banner d-flex align-content-center mx-auto header-bg-white text-black">
        <div class="text-center px-4 py-5 banner_container">
        <div class="banner_title" id="category-banner-title">${content[1]}</div>
        <hr class="banner_hr my-4">
        <p class="banner_content font-weight-light" id="category-banner-txt">${content[2]}</p>
        </div>
        </div>
        </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 subCategoryContainer">
        <ul class="subCategoryList">
        </ul>
        </div>
        </div></div>`;
  
        document.querySelector('header').insertAdjacentHTML('afterend', heroBannerContainer); 
      }
    }
  });
  // return imageUrl;
}