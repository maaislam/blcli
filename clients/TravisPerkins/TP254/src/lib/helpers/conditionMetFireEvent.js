import { fireEvent } from "../../../../../../core-files/services";

export const conditionMetFireEvent = (selector, id) => {
  if ( selector && sessionStorage.getItem(`${id}__seen-once`) !== 'true') {         
    fireEvent('Conditions Met');
    //console.log("Conditions Met")          
    sessionStorage.setItem(`${id}__seen-once`, 'true');
  }
}