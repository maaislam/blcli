const landingImage = (id, imageSrc) => {
  const htmlStr = `
        <div class="${id}__landing-image">
            <img src="${imageSrc}" alt="" />
        </div>
    `;

  return htmlStr.trim();
};

export default landingImage;
