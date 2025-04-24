import { fireEvent } from "../../../../../core-files/services";
import { elementIsInView, pollerLite } from "../../../../../lib/utils";
import { checkURL } from "../helpers/checkURL";
export function variationOne(){
let count = 0;
let gender = checkURL();
gender = gender.replace(/-/g, ' ');
const url = window.location.href;
pollerLite(['.ss-plp-frames__container--frame'], ()=>{
    document.querySelectorAll(".ss-plp-frames__container--frame").forEach((e)=>{
        e.classList.add(`SS-297-00${count++}`);
    })
    const div = document.createElement("div");
    div.classList.add("SS-297-ingrid");
    /*
    create a img place holder
    */
    const img = document.createElement("img");
    img.classList.add("SS-297-banner");
    /*
    create a placement for text and button
    */
   const container = document.createElement("div");
   container.classList.add("SS-297-container");
   div.appendChild(container);

    const h1 = document.createElement("h1");
    h1.innerHTML = "<h1>Book your appointment today!</h1>";
    container.appendChild(h1);

    const h5 = document.createElement("h5");
    h5.innerHTML = "<h5>With your local opticians</h5>";
    container.appendChild(h5);

    const anchor = document.createElement("a");
    anchor.classList.add("cta-btn");
    anchor.textContent = "Book now";
    anchor.setAttribute("href", "https://www.specsavers.co.uk/book/location");
        
    anchor.addEventListener("click", ()=>{
        fireEvent(`Click Book Now - ${checkURL}`);
    })
    container.appendChild(anchor);
    
    /*
    Check to see if the user on mobile or desktop
    */
    if(window.innerWidth > 768){
        if(url.includes("womens")){
            img.setAttribute("src", 'https://ab-test-sandbox.userconversion.com/experiments/SS-297-women.png');
        }else if(url.includes("men")){
            img.setAttribute("src", 'https://ab-test-sandbox.userconversion.com/experiments/SS-297-male.png');
        }else if(url.includes("childrens")){
            img.setAttribute("src", 'https://ab-test-sandbox.userconversion.com/experiments/SS-297-kids.png');
        }   
    }else{
        if(url.includes("womens")){
            img.setAttribute("src", 'https://ab-test-sandbox.userconversion.com/experiments/SS-297-m-women.png');
        }else if(url.includes("men")){
            img.setAttribute("src", 'https://ab-test-sandbox.userconversion.com/experiments/SS-297-m-male.png');
        }else if(url.includes("childrens")){
            img.setAttribute("src", 'https://ab-test-sandbox.userconversion.com/experiments/SS-297-m-kids.png');
        }         
    }
    div.appendChild(img);
    /*
    if the width is of desktop then insert after 3rd item
    else if it is mobile then insert after 1st
    */
    if(window.innerWidth > 768){
        const thirdEl = document.querySelector(".SS-297-002");
        thirdEl.insertAdjacentElement("afterend", div);
    }else{
        const firstEl = document.querySelector(".SS-297-000");
        firstEl.insertAdjacentElement("afterend", div);
    }
    /*
    get reference to banner for use in elementIsInView later
    */
    const banner = document.querySelector(".SS-297-banner");
    /*
    if the element is in view on load OR
    when it get in viewport fire the event
    Once fired, set the fired to true so it doesn't fire again
    */
    pollerLite([".SS-297-banner"], ()=>{
        let fired = false;
        window.addEventListener("load", 
        function () {
            if (elementIsInView(banner, true) && fired == false) {
                    fireEvent(`In View - ${gender}`);
                    fired = true;
            }
          },
        )
        // }else{
            window.addEventListener("scroll",
            function () {
              if (elementIsInView(banner, true) && fired == false) {
                      fireEvent(`In View - ${gender}`);
                      fired = true;
              }
            },
          );
       // }
    })
})

}