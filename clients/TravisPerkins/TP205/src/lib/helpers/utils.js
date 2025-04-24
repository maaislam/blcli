import { pollerLite } from "../../../../../../lib/utils";

export  function toggleClasses(node, index){
    for(let i = 0; i <= node.length - 1 ;i++){
      if( i<= index){
        node[i].classList.add("TP205-products");
      }else{
        node[i].classList.add("TP205-toggle");
      }
    }
  }
  export function checkForChanges(){
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
         if (mutation.target.style.display === "none") {
                mutation.target.style.display = "block"
         }  
      })
    })
    const config = {
      childList: true,
      subtree: true,
      //attributes: true
    };

  observer.observe(document.querySelector('[data-test-id="plp-list"] + div'), config);
  }
  let plpList
  let mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  let count;
  let productCount;
  export function changesInFilter(){
      const observer = new MutationObserver((mutations)=>{
        //mutations.forEach((mutation)=>{
          if(mutations.addedNodes[0] || mutations.removedNodes[0] ){
            if(document.querySelector("[data-test-id='listing-header-count']")){
              count = document.querySelector("[data-test-id='listing-header-count']").innerText;
              //** Strip out all the text and get the number */
              productCount = count.replace(/\D/g, "");
              pollerLite(['[data-test-id="product"]'], ()=>{
                if (mobileDevices){
                  plpList = document.querySelectorAll('[class^="ProductListMobile__"]');
                  toggleClasses(plpList,productCount)
                }else{
                  console.log(mutations[0])
                  plpList= document.querySelectorAll('[data-test-id="product"]');
                  console.log("plp",plpList)
                  plpList.forEach((product)=>{
                    if(product.classList.contains("TP205-toggle")){
                      product.classList.remove("TP205-toggle")
                    }
                  })
                }
              })
            }
          }
        //})
        // Pages doesn't always load full number of 
    })
    const config = {
      childList: true,
      subtree: true,
    }
    observer.observe(document.querySelector('[data-test-id="plp-wrapper"]'), config)
  }
