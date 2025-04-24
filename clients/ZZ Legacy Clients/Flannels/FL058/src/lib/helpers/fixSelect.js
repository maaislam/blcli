/**
 * @desc Current select functionality doesn't remove 'Selected'
 * This is the fix.
 * @param {Element} selectEl
 */
export const fixSelect = (selectEl) => {
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      const options = selectEl.querySelectorAll('option');
      for (let i = 0; options.length > i; i += 1) {
        options[i].removeAttribute('selected');
      }
      e.target.setAttribute('selected', 'selected');
    })
  }
}