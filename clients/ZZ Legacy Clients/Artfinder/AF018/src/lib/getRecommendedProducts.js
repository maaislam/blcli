import settings from './settings';

async function getProducts() {
    const variables = encodeURIComponent(JSON.stringify({
        '$userType': settings.userType
    }));
    const response = await fetch(`https://api.early-birds.io/widget/${settings.widgetID}/recommendations?variables=${variables}`);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const recommendations = await response.json();
    return recommendations;
};

export default () => {
    return new Promise((res, rej) => {
        getProducts().then(response => {
            res(response.recommendations);
        });
    });
};