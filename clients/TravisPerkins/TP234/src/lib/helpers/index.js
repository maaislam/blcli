import { fireEvent } from "../../../../../../core-files/services";
import { pollerLite } from "../../../../../../lib/utils";

export function getLocalStorageItem(item) {
  if (localStorage.getItem(item) !== "") {
    let processd = JSON.parse(localStorage.getItem(item));
    console.log(processd);
    return processd;
  }
}
// Delivery, Next Day and Unavailable (dnu)
/*
nodeList - a node list to loop over
bool - if true, it will add a event listener
cb - if bool is set to true this callback will be called when nodeList each message will be clicked.
*/
export function dnu(nodeList, bool, cb){
  setTimeout(()=>{
    //debugger
    [...nodeList].forEach((message)=>{
      if(message.children[0].innerText.includes("Delivery") || 
          message.children[0].innerText.includes("Next day")){
            message.children[0].classList.add("TP234-brand");
      }else if(message.children[0].innerText.includes("Unavailable")){
          message.children[0].classList.add("TP234-brand__red");
      }
        if(bool === true){

          message.addEventListener("click",()=>{
            cb()
            })
        }else{
          const captions = message.children[0].innerText;
          const itemCaptionsCount = captions.replace(/\D/g, "");
          const count = parseInt(itemCaptionsCount)
          if(count > 0 && count<= 20){
            message.children[0].classList.add("TP234-brand__amber");
            }else if(count >= 20){
                message.children[0].classList.add("TP234-brand");
            }
        }
    })
  },4000)
}
export function attachTriggers(nodeList, cb){
  setTimeout(()=>{
    nodeList.forEach((button)=>{
      button.addEventListener("click", ()=>{
        cb()
      })
    })
  },4000) 
}
let mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//check for loaded modal
/**
 * nodeToObs - Node to Onserve on, takes a node which is visible on the page
 * bool - if true it will set the modal Delivery/Collection text colours based on availablity - Only set true in variation, NOT IN CONTROL
 */
export function modalMutationObs(nodeToObs, bool){
  const Obs = new MutationObserver((mutations)=>{
   mutations.forEach((mutation)=>{
       Array.from(mutation.addedNodes).filter(el => el.nodeType != Node.TEXT_NODE).find(el => el.matches('[class*=Popup__OverlayWrapper]'))
   })
   pollerLite(['[data-test-id="variant-row"]'], ()=>{
    let modalEl 
    if(mobileDevices){
      modalEl =  document.querySelectorAll('[data-test-id="variant-row"] [data-test-id="qty-selector"]');
    }else{
      modalEl = document.querySelectorAll('[data-test-id="variant-row"]');
    }
    if(bool){
      [...document.querySelectorAll('[data-test-id="variant-row"]  [class^="AvailabilityMessagesstyled__MessageText"]')].forEach((el)=>{
        el.previousSibling.remove()
      })
      setTimeout(()=>{
        [...document.querySelectorAll('[data-test-id="variant-row"]  [class^="AvailabilityMessagesstyled__MessageText"]')].forEach(message => {
          if(message.innerText.includes("Unavailable")){
            message.firstElementChild.classList.add("TP234-brand__red");
        } else if(message.innerText.includes("Delivery") || message.innerText.includes("Next day") || message.innerText.includes("available")){
            message.classList.add("TP234-brand");
        }
        });
      },1000);
    }
   });
  });

  const config = {
    childList: true,
  }
  Obs.observe(document.querySelector(nodeToObs), config)
}