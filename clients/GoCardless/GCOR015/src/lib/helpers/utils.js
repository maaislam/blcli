export const addCssToPage = (href, id, classes) => {
  if (document.querySelector(`#${id}`)) {
    return;
  }

  const c = document.createElement("link");
  c.setAttribute("id", id);
  c.setAttribute("rel", "stylesheet");

  if (classes) {
    c.className = classes;
  }

  c.href = href;
  document.head.appendChild(c);
};

/**
 * Helper append JS to page
 */
export const addJsToPage = (src, id, cb, classes) => {
  if (document.querySelector(`#${id}`)) {
    return;
  }

  const s = document.createElement("script");
  if (typeof cb === "function") {
    s.onload = cb;
  }

  if (classes) {
    s.className = classes;
  }

  s.src = src;
  s.setAttribute("id", id);
  document.head.appendChild(s);
};

// export const appendDom = (html) => {
//   const contentBodyMain = document.querySelector(`#we-can-help`)?.closest(`div[class^="css-"]`);
//   const childNodes = contentBodyMain?.childNodes;
//   let pNode;
//   let findFlag = false;
//   if (childNodes.length > 0) {
//     for (let i = 0; i < childNodes.length; i++) {
//       if (childNodes[i].nodeName && childNodes[i].closest(`#we-can-help`)) {
//         findFlag = true;
//       } else if (findFlag && childNodes[i].nodeName && childNodes[i].closest(`p`)) {
//         pNode = childNodes[i];
//       }
//     }
//   }
//   console.log(pNode);
// };
