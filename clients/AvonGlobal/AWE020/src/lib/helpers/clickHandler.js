const clickHandler = (ID, fireEvent) => {
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

    if (targetMatched('.see-more')) {
      fireEvent('User interacts with “Read more” CTA');
    } else if (targetMatched(`.${ID}__slide-1`)) {
      fireEvent('User tries to click first USP');
    } else if (targetMatched(`.${ID}__slide-2`)) {
      fireEvent('User tries to click second USP');
    } else if (targetMatched(`.${ID}__slide-3`)) {
      fireEvent('User tries to click third USP');
    }
  });
};

export default clickHandler;
