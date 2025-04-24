const clickHandler = (ID, fireEvent, VARIATION) => {
  document.querySelectorAll('button').forEach((item) => {
    if (item.innerText.indexOf('enterprise') === -1) return;
    item.click();
  });
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 500);

  document.body.addEventListener('click', (e) => {
    //setTimeout(init, 1000);

    const target = e.target;
    const targetMatched = (targetToMatchSelector) =>
      target.matches(targetToMatchSelector) || target.closest(targetToMatchSelector);

    if (targetMatched(`.${ID}__calcbanner`) || (targetMatched('.css-sk7pc7') && VARIATION == 'control')) {
      fireEvent('Interacts with calculator CTA');
    } else if (targetMatched('button') && target.innerText.indexOf('enterprise') !== -1) {
      fireEvent('Interacts with for enterprise CTA');
    } else if (targetMatched('button') && target.innerText.indexOf('small business') !== -1) {
      fireEvent('Interacts with for small business CTA ');
    } else if (targetMatched('.css-cwaqg0')) {
      fireEvent('Interacts with video');
    } else if (targetMatched('.css-r76ur8')) {
      fireEvent('Interacts with calculator CTA (secondary)');
    }
  });
};

export default clickHandler;
