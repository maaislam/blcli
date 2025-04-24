const renderInitial = (mainElem) => {
  document.querySelectorAll('.WB044__buttons--transparent').forEach((elem) => {
    elem.closest('.WB044__initialstage')?.remove();
  });

  const htmlStr = `
        <div class="WB044__initialstage--img inline-block w-full lazy-load-image-background opacity lazy-load-image-loaded" style="background-image:url('https://res.cloudinary.com/wolfandbadger/image/upload/f_auto,q_auto:best,c_fill,w_1250,h_550/categories/gooj79zjp4oiscyspnzu')">
            
        </div>
        
        <div class="WB044__initialstage--content">
            <span>need help finding the perfect Gift?</span>
            <div class="WB044__buttons--next flex justify-center items-center">
                <button class="WB044__buttons--transparent" data-nextstep="genderselector">Yes please</button>
            </div>
        </div>`;

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('WB044__initialstage', 'relative', 'container');
  imgWrapper.innerHTML = htmlStr;

  mainElem.insertAdjacentElement('afterbegin', imgWrapper);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export default renderInitial;
