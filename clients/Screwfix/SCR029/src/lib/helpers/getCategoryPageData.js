export const getCategory = (()=>{
    let category = window.dataLayer[0].categoryName;
    //console.log(category, "catrgory");
    return category;
})