import swapUrl from './swapUrl';

export const cloneThumb = (thumbEl, imgUrl) => {
  if (thumbEl && imgUrl) {
    const thumbParent = thumbEl.parentElement;
    const thumbImgTag = thumbEl.querySelector('img');
    const thumbClone = thumbEl.cloneNode(true);

    if (thumbClone) {
      // Remove and edit attributes
      const thumbCloneImg = thumbClone.querySelector('img');
      const thumbCloneAnchor = thumbClone.querySelector('a');
      swapUrl(thumbCloneImg, imgUrl);
      thumbParent.insertAdjacentHTML('afterbegin', thumbClone.outerHTML);
    }
  }
}