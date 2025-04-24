export function isLoggedInDesktop() {
   var $ = window.jQuery;

   return !!$('.your-acc-wrapper').length; 
}

export function isLoggedInMobile() {
    return !!$('.your-account').length; 
}
