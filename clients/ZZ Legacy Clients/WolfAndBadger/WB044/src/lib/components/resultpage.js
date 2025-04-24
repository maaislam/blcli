const renderResultPage = (deleteFromStorage, progressbar, localStorageSave) => {
  //check cookie to find where user is coming from

  const htmlStr = `
        <div class="WB044__resultpage--progressbar my-12">${progressbar('full')}</div>
        <div class="WB044__resultpage--wrapper container ">
            <div class="WB044__fake-filler col-span-1"></div>
            <div class="WB044__resultpage--content col-span-3 flex flex-col items-center">

                <div class="WB044__resultpage--title mb-4">HERE ARE YOUR RESULTS</div>
            
                <div class="WB044__resultpage--btns-block w-full flex justify-between">
                    <div class="WB044__resultpage--goback cursor-pointer hover:underline"><a href="/uk/gift-shop/">Back to gift shop</a></div>
                    <div class="WB044__resultpage--retakequiz cursor-pointer hover:underline" >Retake quiz</div>
                </div> 
            </div>
        </div>`;

  // design updates

  (function pollForElem() {
    const searchPage = document.querySelector('main>div:first-of-type');
    if (document.querySelector('[data-testid="product-card"]') && document.querySelector('.ais-QueryRuleCustomData')) {
      setTimeout(() => {
        searchPage.insertAdjacentHTML('afterend', htmlStr);
        deleteFromStorage('userFromGiftfinder');
        document.querySelector('.WB044__resultpage--retakequiz').addEventListener('click', (e) => {
          localStorageSave('retakeTest', true);
          location.href = '/uk/gift-shop/';
        });
      }, 2000);
    } else {
      setTimeout(pollForElem, 25);
    }
  })();

  // clear cookies
};
export default renderResultPage;
