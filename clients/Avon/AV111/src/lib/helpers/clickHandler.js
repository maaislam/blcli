const clickHandler = (id, anchor, fireEvent) => {
  anchor.addEventListener('click', (e) => {
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    //console.log(target);
    if (targetMatched(`.${id}__product`)) {
      fireEvent('Interactions with a sample suggestion');
    } else if (targetMatched(`.${id}__view-all`)) {
      fireEvent('Interactions with view samples CTA');
    }
  });
};
export default clickHandler;
