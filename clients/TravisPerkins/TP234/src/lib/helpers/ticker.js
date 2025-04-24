export function ticker(){
    setInterval((selectNode, loopNode )=>{
        console.log('working')
        if(document.querySelector(selectNode)){
                pollerLite([selectNode], ()=>{
                let msgNode = document.querySelectorAll(loopNode);
                [...msgNode].forEach((delivery)=>{
                 setTimeout(()=>{
                  if(delivery.children[0].innerText.startsWith("Available")){
                    delivery.children[0].classList.add("TP234-brand")
                  }
                  if(delivery.children[0].innerText.startsWith("Unavailable")){
                    delivery.children[0].classList.add("TP234-brand__red")
                  }
                 },200)
                })
              })
              //clearInterval(checkModal)
        }
      }, 2000)
}