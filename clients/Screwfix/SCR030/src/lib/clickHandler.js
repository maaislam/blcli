import { fireEvent } from "../../../../../core-files/services";

export const clickHandler = (target, id, variation) => {
  //console.log(target, "click-target")
    
    if (target.closest(`.${id}__see_full_specification`)) {
        //console.log("Customer clicks the “View all specifications” CTA");
        fireEvent(`Customer clicks the “View all specifications” CTA`);
    }else if (variation === "control" && target.closest(`#product_specification_more`)) {
        //console.log("Customer clicks “More Info” CTA");
        fireEvent(`Customer clicks “More Info” CTA`);      
    }else if(target.closest('[id^="product_add_to_trolley"]')){
        //console.log(`Customer clicks on delivery button`);
        fireEvent(`Customer clicks on delivery button`);
        
    }else if(target.closest(`[id^="add_for_sticky_collection"]`)){
      //console.log(`Customer clicks on click & collect button`);
      fireEvent(`Customer clicks on click & collect button`);
    }
   
    
  };