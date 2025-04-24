import data from './data';

const getCurrentData = () => {
    const url = window.location.href;
    let currentData = data.filter((layer) => {
        let isCurrentPage = layer.pages.some((pageURL) => {
            return pageURL == url;
        });
        return isCurrentPage;
    })[0];
    return currentData;
};

export default getCurrentData;