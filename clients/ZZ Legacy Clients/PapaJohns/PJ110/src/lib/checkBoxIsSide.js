export default (box) => {
    const image = box.querySelector('img');
    const imageURL = image.getAttribute('src'); 
    const isSide = imageURL.includes('sides');
    return isSide;
}