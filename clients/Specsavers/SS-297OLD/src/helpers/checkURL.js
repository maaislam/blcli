let gender;
export function checkURL(){
    if(window.location.href.includes("womens")){
        //fireEvent("Click Book Now - women")
        gender = "womens";
    }else if(window.location.href.includes("men")){
        //fireEvent("Click Book Now - men")
        gender = "men";
    }else if(window.location.href.includes("childrens-glasses")){
        //fireEvent("Click Book Now - children")
        gender = "childrens-glasses";
    }
    return gender;
}