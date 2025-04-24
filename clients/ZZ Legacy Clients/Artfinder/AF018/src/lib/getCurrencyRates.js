async function getRates() {
    const response = await fetch(`https://www.artfinder.com/api/product/currency-rates/`);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
    return data;
};

export default () => {
    return new Promise((res, rej) => {
        getRates().then(response => {
            res(response);
        });
    });
};