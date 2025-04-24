const deliveryMsg = document.querySelectorAll('[data-test-id="delivery-availability-message"]');


export function colourize(nodeCollection){
    const collection = document.querySelectorAll(nodeCollection);

    [...collection].forEach((message, cb)=>{
        // if Delivery is available make it green & put icon before it
        //else text is red and put a x icon
        setTimeout(()=>{
          if(message.children[0].innerText.startsWith("Available")){
            message.children[0].classList.add("TP234-brand");
          }else if(message.children[0].innerText.startsWith("Unavailable")){
            message.children[0].classList.add("TP234-brand__red");
          }
          // if collection item number is more than 20 make it green & put icon before it
             //get number from the text
            //  console.log(message.children[0].innerText)
        }, 5000)
          //add event listner to each
          message.addEventListener("click",()=>{
          cb()
          })
        })
}