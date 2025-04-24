export const getLastCategory = () => {

    const previousPages = localStorage.getItem('previousPagePaths');
    const lastVisited = JSON.parse(previousPages);

    let lastViewedCategory;

    // if not homepage
    if(lastVisited.slice(-1)[0] === '/') {
        // if last page did not have a department
        if(lastVisited.slice(-2)[0].split("/")[2] === '') {
            lastViewedCategory = lastVisited.slice(-2)[0];
        } else {
            lastViewedCategory = lastVisited.slice(-2)[0].split("/")[1];
        }
    } else {
        lastViewedCategory = lastVisited.slice(-1)[0].split("/")[1];
    }
   
    const allCategories = ['christmas', 'health-pharmacy', 'beauty', 'fragrance', 'baby-child', 'toiletries', 'electrical', 'mens', 'gift'];

    if(lastViewedCategory  && lastViewedCategory !== '' && allCategories.indexOf(lastViewedCategory) > -1) {
        return lastViewedCategory;
    }
}

export const getLastDepartment = () => {

    const previousPages = localStorage.getItem('previousPagePaths');
    const lastVisited = JSON.parse(previousPages);

    let lastViewedDepartment;

    // if not homepage
    if(lastVisited.slice(-1)[0] === '/') {

        // if last page did not have a department
        if(lastVisited.slice(-2)[0].split("/")[2] !== '') {
            lastViewedDepartment = lastVisited.slice(-2)[0].split("/")[2];

        } 
    } 
   
    const allCategories = ['christmas', 'health-pharmacy', 'beauty', 'fragrance', 'baby-child', 'toiletries', 'electrical', 'mens'];

    if(lastViewedDepartment  && lastViewedDepartment !== '' && allCategories.indexOf(lastVisited.slice(-2)[0].split("/")[1]) > -1) {
        return lastViewedDepartment;
    }
}

