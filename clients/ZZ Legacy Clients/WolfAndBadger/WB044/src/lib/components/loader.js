const renderLoader = (progressbar, stageWrapper, setLocally, incomingData, fireEvent) => {
  console.log(incomingData);
  document.querySelectorAll('.WB044__stage-wrapper--content').forEach((elem) => {
    elem.closest('.WB044__loader')?.remove();
  });

  const spinner = `
  
        <div class="WB044__spinner"></div>
  
    `;

  const htmlStr = `<div class="WB044__loader w-full my-12 absolute">
                  ${progressbar('static-full')}
                  <div class="WB044__optionswrapper container relative">
                      ${stageWrapper('Calculating your results', spinner)}
                    </div>             
              </div> `;

  //place in DOM
  const main = document.querySelector('.WB044__main');
  main.setAttribute('data-laststagename', 'priceselector');
  main.insertAdjacentHTML('afterbegin', htmlStr);

  setLocally('userFromGiftfinder', true);
  //setCookie('userFromGiftfinder', 'true', 1);
  setTimeout(() => {
    location.href = location.origin + incomingData;
    fireEvent('User has seen the results page', false);
  }, 2000);
};

export default renderLoader;
