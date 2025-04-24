import { fireEvent } from "../../../../../core-files/services";

export const clickHandler = (target) => {
    
    if (target.closest(`.lii__btm--r`)) {
        // console.log("Interaction clicks the filter button");
        fireEvent(`Interaction clicks the filter button`);
    }else if (target.closest(`.SCR011_v2__brand_wrapper`)) {
      
      const brand = target.textContent?.trim();
      //console.log(brand, "brand");
      if (brand) {
         console.log(`Interaction with category quicklinks : ${brand}`);
        fireEvent(`Interaction with category quicklinks : ${brand}`);
      }
    }else if(target.closest(`.SCR011_v2__view_brands`)){
        //console.log(`Interaction clicks view all brand filter`);
        fireEvent(`Interaction clicks view all brand filter`);
    }else if(target.closest("a.fh_facet_click")){
      //console.log("Interaction clicks the brand filter in the filter list")
      fireEvent(`Interaction clicks the brand filter in the filter list`);
    }
   
    
  };