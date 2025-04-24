
const data = () => {
  let catData;

  const categoryData = {
    engagement: {
      // heroProduct: {
        
      //   // name: 'Le Vian 14ct Rose Gold Morganite & 0.29ct Diamond Ring',
      //   // image: 'https://d34qiagx43sg99.cloudfront.net/9107096-200.jpg',
      //   // nowPrice: '£1,125.00',
      //   // wasPrice: '£1499.00',
      //   // financePrice : '£21.09',
      //   // link: 'https://www.ernestjones.co.uk/webstore/d/9107096/Le+Vian+14ct+Rose+Gold+Morganite+%26+0.29ct+Diamond+Ring/',
      // },
      inGrid: {
        "There's a smarter way to pay": {
          position: 2,
          innerGridHTML: `
          <h3>Interest Free Credit!*</h3>
            <ul>
              <li><span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c07d9cea-98cb-11ed-93f1-426bfb17d2b6)"></span>Equal monthly payments</li>
              <li><span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c0ffd142-98cb-11ed-90b7-ea9d1197e315)"></span><u>No</u> interest charges</li>
              <li><span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/bf8962a6-98cb-11ed-ab8b-d2311725e92c)"></span><u>No</u> early settlement charges</li>
              <li><span style="background-image:url(https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c0061b66-98cb-11ed-ad19-eacd7272b9f0)"></span>Simply pay a small deposit upfront</li>
            </ul>
          <a class="sg-cta secondary" href="#">Find out more</a>`,
      },
      "Valentines day": {
        position: 7,
        image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/663c252c-03ed-11ec-9a02-6e996ea492b4',
        innerGridHTML: `
        <p>Make memories for less</p>
        <a class="sg-cta secondary" href="#">Find out more</a>`,
    },
      }
    },
  }

  if(window.location.href.indexOf('/engagement-rings/') > -1) {
    catData = categoryData['engagement'];
  }

  return catData;
}

export default data;

