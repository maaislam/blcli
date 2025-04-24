export const addCssToPage = (href, id, classes) => {
    if (document.querySelector(`#${id}`)) {
      return;
    }
  
    const c = document.createElement('link');
    c.setAttribute('id', id);
    c.setAttribute('rel', 'stylesheet');
  
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
  
    const s = document.createElement('script');
    if (typeof cb === 'function') {
      s.onload = cb;
    }
  
    if (classes) {
      s.className = classes;
    }
  
    s.src = src;
    s.setAttribute('id', id);
    document.head.appendChild(s);
  };
  
  export const removeCategoryHeighlit = (id) =>{
    //console.log(document.querySelectorAll(`.${id}__category_quickline.active_category`), "itemss")
    document.querySelectorAll(`.${id}__category_quickline.active_category`).length > 0 && document.querySelectorAll(`.${id}__category_quickline.active_category`).forEach((item)=>{
      item.classList.remove("active_category")
    })
  }