export const linkElementsClicked = (whenClicked, getsClicked) => {
  whenClicked.addEventListener('click', () => {
    getsClicked.click();
  });
};
