const secondaryNav = (id) => {
  const htmlStr = `<div class="${id}__secondaynav">
        <div class="${id}__secondarynav--item">Overview</div>
        <div class="${id}__secondarynav--item">Tech Specs</div>
        <div class="${id}__secondarynav--item">Reviews</div>
    </div>`;

  return htmlStr.trim();
};
export default secondaryNav;
