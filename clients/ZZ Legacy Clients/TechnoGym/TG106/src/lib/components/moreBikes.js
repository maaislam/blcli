import shared from '../shared';

export default () => {
    const { ID } = shared;

    const morebikes = {
        'Recline': {
            name: 'Recline Personal',
            link: 'https://www.technogym.com/gb/recline-personal.html',
            image: '//cdn.optimizely.com/img/8355110909/7060e773fc014a188358d3ff9c1793df.png',
        },
        'Forma': {
            name: 'Recline Forma',
            link: 'https://www.technogym.com/gb/recline-excite-forma.html',
            image: '//cdn.optimizely.com/img/8355110909/e94f8bc82f384ae5a740bb9b748304c1.png',
        },
        'Group': {
            name: 'Group Cycle',
            link: 'https://www.technogym.com/gb/products/shopby/product_type-group_cycling.html',
            image: '//cdn.optimizely.com/img/8355110909/47084cefc389465eb7d84a971cae9ca0.png',
        },
    }

    // create the more bikes image wrapper

    const element = document.createElement('div');
    element.classList.add(`${ID}_moreBikesProduct`);
    element.classList.add(`${ID}-product_images`);
    document.querySelector(`.${ID}-moreProducts`).appendChild(element);

    // add the images
    Object.keys(morebikes).forEach((i) => {
        const data = morebikes[i];
        const moreBikesImage = document.createElement('div');
        moreBikesImage.classList.add(`${ID}-bikeImage`);
        moreBikesImage.innerHTML = `
        <a href="${data.link}">
            <div class="${ID}-main_text">
                <img src="${data.image}">
                <h4>${data.name}</h4>
            </div>
        </a>
        `;
        document.querySelector(`.${ID}_moreBikesProduct`).appendChild(moreBikesImage)
    });
}
