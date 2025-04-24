const initSlider = (id, config) => {
    const glide = new Glide(`.${id}__recommendation-glide`, config);

    glide.mount();
};

export default initSlider;
