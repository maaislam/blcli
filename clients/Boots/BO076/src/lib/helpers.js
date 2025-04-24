export const getName = () => {
    const heading = document.querySelector('#estore_category_heading h1');

    if(heading) {
        const pageName = heading.textContent.trim().toLowerCase().replace(/\s/g, '').replace('&','');
        return pageName;
    }
}