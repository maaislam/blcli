import shared from "../../../../../core-files/shared";
import { getSiteFromHostname } from "./experiment";

const { ID } = shared;


export const sessionCount = () => {
   
    if (localStorage.getItem("SGcount") === null) {
      sessionStorage.setItem("SGcount", 's');
      localStorage.setItem("SGcount", 's');
    }
    else if (sessionStorage.getItem("SGcount") === null) {
      var lsCount = localStorage.getItem("SGcount");
      sessionStorage.setItem("SGcount", lsCount + 's');
      localStorage.setItem("SGcount", lsCount + 's');
    }
    
    var sessionRetrieve = sessionStorage.getItem("SGcount");
    return sessionRetrieve.length;
}

 // load in jQuery
 export const loadScript = (source, beforeEl, async = true, defer = true) => {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      const prior = beforeEl || document.getElementsByTagName('script')[0];
  
      script.async = async;
      script.defer = defer;
  
      function onloadHander(_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = null;
          script.onreadystatechange = null;
          script = undefined;
  
          if (isAbort) { reject(); } else { resolve(); }
        }
      }
  
      script.onload = onloadHander;
      script.onreadystatechange = onloadHander;
  
      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    });
}

export const dateLessThanWeek = () => {

    let productDataStr;

    if (getSiteFromHostname() === 'ernestjones') {
        productDataStr = window.localStorage.EJ138recommended_prods_1;
    } else {
        productDataStr = window.localStorage.HS138recommended_prods_1;
    }

    const storedProducts = JSON.parse(productDataStr);
   

    if(storedProducts) {
        const lastDate = storedProducts[storedProducts.length - 1].date;
        const now = (new Date()).getTime();

        if (now - lastDate < 604800000) { 
            return true;
        }
    }
}

export const slickProducts = () => {


        window.jQuery.getScript( "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js" )
        .done(function( s, Status ) {
            jQuery(`.${ID}-productsInner`).slick({
                slidesToShow: 3,
                arrows: true,
                infinite: true,
                rows: 0,
                mobileFirst: true,
                responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                    breakpoint: 300,
                    settings: "unslick",
                    },
                ]

            });
        })
        .fail(function( jqxhr, settings, exception ) {
        });
    
}