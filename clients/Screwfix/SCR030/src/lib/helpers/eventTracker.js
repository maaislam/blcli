import { fireEvent } from "../../../../../../core-files/services";
import { obsIntersection } from "./observerIntersection";

export const fireEventTraker = (selector, isMobile, id) =>{
    
    const titleIntersection = (entry) => {
        //console.log('2', entry);
        const { isIntersecting, target, boundingClientRect } = entry;
        if (!isIntersecting && !document.querySelector(`.${id}__seen-title`) && boundingClientRect.top < 0) {
          target.classList.add(`${id}__seen-title`);

            fireEvent('Conditions Met');
            //console.log('Conditions Met');

          if(isMobile){
            fireEvent('Customer scrolls below the product title');
            //console.log('Customer scrolls below the product title');
          }
          
        }
      };
  
      const titleIntersectionPoint = selector;
      const titleIntersectRatio = 0.3;
      obsIntersection(titleIntersectionPoint, titleIntersectRatio, titleIntersection);
}