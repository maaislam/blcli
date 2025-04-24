import { fireEvent } from "../../../../../../core-files/services";
import obsIntersection from "./observeIntersection";

export const conditionMetFireEvent = (selector, id) => {
    if (sessionStorage.getItem(`${id}__seen-once`) !== 'true') {
        const intersectionCallBack = ((entry, observer)=>{
          //console.log(entry)
          if(entry.isIntersecting){
            fireEvent('Conditions Met');
            console.log("Conditions Met")
            observer.disconnect();
          }
        })
        obsIntersection( selector, .5, intersectionCallBack);  
        sessionStorage.setItem(`${id}__seen-once`, 'true');
      }
}