const quickLink = (id, linkData) => {
  const { title, link } = linkData;
  const htmlStr = `
    <div class="${id}__quicklink swiper-slide">
        <a class="${id}__quicklink--link" href="${link}">${title}</a>
    </div>
  `;
  return htmlStr;
};

export default quickLink;
