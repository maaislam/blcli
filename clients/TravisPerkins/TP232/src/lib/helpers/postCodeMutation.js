
  
  export function postCodeMutation(VARIATION){
    if(VARIATION == 'control') {
      //1 working fine
      let deliveryBtns = document.querySelector('[data-test-id="add-to-delivery-btn"]');
      attachTriggers(deliveryBtns, ()=>{
        fireEvent('User interacts with Delivery CTA')
      })
      //2 working fine
      let collectionBtns = document.querySelector('[data-test-id="add-to-collection-btn"]');
      attachTriggers(collectionBtns, ()=>{
        fireEvent('User interacts with Collection CTA')
      })
      //3 working fine
      let qtyCounter = document.querySelector('[data-test-id="qty-input"]');
      attachTriggers(qtyCounter, ()=>{
        fireEvent('User interacts with quantity selector')
      })
      //4 working fine
      pollerLite(['[data-test-id="nearest-branch-wrapper"]'], ()=>{
       let unavailableDelivery = document.querySelector('[data-test-id="delivery-availability-message"]');
       if(unavailableDelivery.firstChild.innerText.includes("Unavailable")){
         fireEvent("User receives a “unavailable” delivery message");
       }
      });
       //5 working fine
       pollerLite(['[data-test-id="nearest-branch-wrapper"]'], ()=>{
        let unavailableCollection = document.querySelector('[data-test-id="collection-availability-message"]');
        if(unavailableCollection.firstChild.innerText.includes("Unavailable")){
          fireEvent("User receives a “unavailable” collection message");
        }   
      })
    }
  
    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...
    const message = document.querySelector('[data-test-id="collection-availability-message"]');
    if(VARIATION == 1){
      debugger;
      //1 working fine
      let deliveryBtns = document.querySelector('[data-test-id="add-to-delivery-btn"]');
      attachTriggers(deliveryBtns, ()=>{
        fireEvent('User interacts with Delivery CTA')
      });
      //2 working fine
      let collectionBtns = document.querySelector('[data-test-id="add-to-collection-btn"]');
      attachTriggers(collectionBtns, ()=>{
        fireEvent('User interacts with Collection CTA')
      });
      //3 working fine on desktop
       //but on mobile it break the below
       //because qty is in a input modal
       // no reference found it figma so leaving it for mobile
       if(!mobileDevices){
        let qtyCounter = document.querySelector('[data-test-id="qty-input"]');
        attachTriggers(qtyCounter, ()=>{
          fireEvent('User interacts with quantity selector')
        });
       }
      //4 working fine
      pollerLite(['[data-test-id="nearest-branch-wrapper"]'], ()=>{
       let unavailableDelivery = document.querySelector('[data-test-id="delivery-availability-message"]');
       if(unavailableDelivery.firstChild.innerText.includes("Unavailable")){
         fireEvent("User receives a “unavailable” delivery message");
       }
      });
       //5 working fine (double check with address and change poller)
       pollerLite(['[data-test-id="nearest-branch-wrapper"]'], ()=>{
        let unavailableCollection = document.querySelector('[data-test-id="collection-availability-message"]');
        if(unavailableCollection.firstChild.innerText.includes("Unavailable")){
          fireEvent("User receives a “unavailable” collection message");
        }   
      })
      //6 working fine
    pollerLite(['[data-test-id="pdp-wrapper"]'], ()=>{
        setTimeout(()=>{
          const captions = message.children[0].innerText;
          const itemCaptionsCount = captions.replace(/\D/g, "");
          if(itemCaptionsCount > 0 && itemCaptionsCount< 20){
            //D - If the item has less than 20 in stock and is available for collection , i expect to see a orange exclamation point icon and orange text saying “ xx Available for Collection” - working 
            message.classList.add("TP232-brand__amber");
            fireEvent("User receives a low stock collection message")
            }else if(itemCaptionsCount > 20){
              //C - If the item has more  than 20 in stock and is available for collection , i expect to see a green tick icon and green text saying “ xx Available for Collection” - Working
                message.classList.add("TP232-brand");
            }
            //F - If collection of the item is unavailable, i expect to see a red cross icon and red text saying “Collection Unavailable” - Working
            if(message.innerText.includes("Unavailable")){
              message.classList.add("TP232-brand__red");
            }
            // dnu
              const deliveryStatus = document.querySelector('[data-test-id="delivery-availability-message"]');
              //C - If delivery of the item is unavailable, i expect to see a red cross icon and red text saying “Delivery Unavailable” - Working
                if(deliveryStatus.innerText.includes("Unavailable")){
                  deliveryStatus.classList.add("TP232-brand__red");
              } else if(deliveryStatus.innerText.includes("Delivery")){
                //A  - When i view a PDP, i expect to see stock information under the delivery and collection ctas - Working
                //B - If delivery of the item available, i expect to see a green tick icon and green text saying “Delivery Available” - Working
                deliveryStatus.classList.add("TP232-brand");
              }
              }, 5000);
       })
      //7 working fine
      let deliveryMsg = document.querySelector('[data-test-id="delivery-availability-message"');
      attachTriggers(deliveryMsg, ()=>{
        fireEvent('User tries to interact with delivery badge')
      });
      //8 
      let collectionMsg = document.querySelector('[data-test-id="collection-availability-message"');
      attachTriggers(collectionMsg, ()=>{
        fireEvent('User tries to interact with collection badge')
      });
      // data-test-id="collection-availability-message"
      /**
       * Mutation when qty counter changes
       */
        const qtyMutation = new MutationObserver((mutations)=>{
            mutations.forEach((mutation)=>{
              if(mutation.type === 'characterData' && mutation.oldValue !== mutation.target.nodeValue){
                if(message.innerText.includes("Unavailable")){
                  message.classList.remove("TP232-brand__amber")
                  message.classList.add("TP232-brand__red");
                }else if(message.innerText.includes("available")){
                  message.classList.remove("TP232-brand__red");
                  message.classList.add("TP232-brand");
                }
              }
            })
          })
            const options = {
              subtree: true,
              attributes: true,
              characterData: true,
              characterDataOldValue : true,
            }
            qtyMutation.observe(document.querySelector('[class^="styled__ButtonsRow"]'), options);
  
       /**
       * Mutation when postcode changes
       */
      debugger;
      pollerLite(['[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]'], ()=>{
        const Mutation = new MutationObserver((mutations)=>{
          
      })
      const config = {
        characterData: true,
        characterOldValue : true
      }
      Mutation.observe(document.querySelector('[class^="CompactDeliveryAndBranchSelectorstyled__AddressValue"] [color="text-on-primary"]').firstChild, config);
      })
    }
  }