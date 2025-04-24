const hover = (tdArr) => {
  // Attach hover event to each TD
  // Get current TD data-row & data-col
  // If e.g TD data = 3rd row and 4th column
  // Add class to current TD
  // Loop backwards from 3 to 0. Highlighting each TD
  // Repeat for column.
  // On mouse leave repeat above process and remove classes.

  const addClass = (el) => {
    if (el) {
      el.classList.add('FL056-highlight');
    }
  }

  const removeClass = (el) => {
    if (el) {
      el.classList.remove('FL056-highlight');
    }
  }

  // Get previous TD elements.
  const getPreviousSiblings = (elem, filter) => {
    const sibs = [];
      while (elem = elem.previousSibling) {
          if (elem.nodeType === 3) continue; // text node
          if (!filter || filter(elem)) sibs.push(elem);
      }
      return sibs;
  }

  const getPreviousRowEls = (elem, colNum, rowNum, filter) => {
    const prevRows = [];
    let base = 0;
    let el = elem;
    const topRowTh = document.querySelector(`th[data-col="${colNum}"]`);
    while (rowNum >= base) {
      if (el) {
        const rowEl = el.parentElement;
        const previousRow = rowEl.previousElementSibling;
        const upperRowTd = previousRow.querySelector(`td[data-col="${colNum}"]`);
        if (upperRowTd) {
          if (!filter || filter(upperRowTd)) prevRows.push(upperRowTd);
        }
        if (topRowTh) {
          setTimeout(() => {
            filter(topRowTh);
          }, 50);
        }
        el = upperRowTd;
      }
      base += 1;
    }
  }

  const tdHover = function() {
    const TD = this;
    const row = TD.getAttribute('data-row');
    const col = TD.getAttribute('data-col');
    
    addClass(TD);
    TD.classList.add('FL056-highlighted-x');

    getPreviousSiblings(TD, addClass);
    getPreviousRowEls(TD, col, row, addClass);
  }

  const tdExit = function() {
    const TD = this;
    const row = TD.getAttribute('data-row');
    const col = TD.getAttribute('data-col');
    
    removeClass(TD);
    TD.classList.remove('FL056-highlighted-x');

    getPreviousSiblings(TD, removeClass);
    getPreviousRowEls(TD, col, row, removeClass);
  }

  // console.log(tdArr);
  const attachEvents = () => {
    for (let i = 0; tdArr.length > i; i += 1) {
      tdArr[i].addEventListener('mouseenter', tdHover);
      tdArr[i].addEventListener('mouseleave', tdExit);
    }
  }

  attachEvents();
}
export default hover;
