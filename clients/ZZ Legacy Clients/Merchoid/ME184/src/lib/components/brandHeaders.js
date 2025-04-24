import { cacheDom } from './../../../../../../lib/cache-dom';

export default () => {
  const brands = {
    'Marvel Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/5684d13cac69424282503d483736bf5f.png',
    'Star Wars Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/fdc0a218d0d440218260bd2a368cb8fc.png',
    'DC Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/c4c8e4261a934c72b7deff2b0414c632.png',
    'Fortnite Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/9c378be0b6084e58829a1a9ef161a106.png',
    'Disney Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/7774477c39124296a5b8c44da8b84aaa.png',
    'TV and Movie Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/d744e69ff23b4795961734fcbdc49ee4.png',
    'Harry Potter Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/49264e279efd4f7a8c7a921216057913.png',
    'Gaming Christmas Sweaters/Jumpers': '//cdn.optimizely.com/img/6087172626/771bd2a398c347c38b6648850c43aca3.png',
  };

  const brandHeaders = cacheDom.getAll('.entry-content h3');
  Object.keys(brands).forEach((i) => {
    const brandName = brands[i];
    for (let index = 0; index < brandHeaders.length; index += 1) {
      const element = brandHeaders[index];
      if (element.childNodes[0].textContent === [i][0]) {
        const brandImage = document.createElement('div');
        brandImage.classList.add('ME178-brand_image');
        element.classList.add('ME178-brand');
        brandImage.style = `background-image: url('${brandName}')`;
        element.insertAdjacentElement('beforebegin', brandImage);
      }
    }
  });
};
