const getSearchParam = (paramName) => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramValue = queryParams.get(paramName);
    return paramValue;
};
export default getSearchParam;