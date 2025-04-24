import { fireEvent } from "../../../../../core-files/services";

export const clickHandler = (target, id, variation) => {
  //console.log(target.closest(`[trackaid="header-request-appointment-cta"]`), "click-target")
    
    if (target.closest(".dev-section")) {
        //console.log("User clicks the “Book your appointment” CTA");
        fireEvent(`User clicks the “Book your appointment” CTA`);
    }else if (target.closest(`.${id}__browse_online_btn`)) {
        //console.log("User clicks “Browse glass online” CTA");
        fireEvent(`User clicks “Browse glass onlin” CTA`);      
    }else if(target.closest(`.${id}__appointment_btn`)){
      //console.log("User clicks the “Book your buy & fit appointment” CTA");
      fireEvent(`User clicks the “Book your buy & fit appointment” CTA`);
        
    }else if(target.closest(`.${id}__see_full_range_btn`)){
      //console.log("User clicks the “see the full range” CTA");
      fireEvent(`User clicks the “see the full range” CTA`);
    }else if(target.textContent == 'Browse glasses online' && variation == 'control'){
      //console.log("User clicks the “Browse glasses online” CTA");
      fireEvent(`User clicks the “Browse glasses online” CTA`);
    }else if(target.textContent == 'Book a buy and fit appointment' && variation == 'control'){
      //console.log("User clicks the “Book your buy & fit appointment” CTA");
      fireEvent(`User clicks the “Book your buy & fit appointment” CTA`);
    }else if(target.textContent == 'Book a buy and fit appointment'){
      //console.log("User clicks the “Book a buy and fit appointment” CTA");
      fireEvent(`User clicks the “Book a buy and fit appointment” CTA`);
    }else if(target.closest(`[trackaid="header-request-appointment-cta"]`)){
      //console.log("User clicks the “Book appointment” CTA");
      fireEvent(`User clicks the “Book appointment” CTA`);
    }else if(target.closest(".reorder-button")){
      //console.log("User clicks the “Re-Order contact lenses” CTA");
      fireEvent(`User clicks the “Re-Order contact lenses” CTA`);
    }
   
    
  };