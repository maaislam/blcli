const banner = (id) => {
  const html = `
        <div class="${id}__banner" aria-labelledby="${id}__bannerTitle" aria-describedby="${id}__bannerSubtext">
            <h2 class="${id}__bannerTitle" id="${id}__bannerTitle">
                Let’s help you find what you’re looking&nbsp;for
            </h2>
            <div class="${id}__bannerContent">
                <p id="${id}__bannerSubtext" class="${id}__bannerSubtext">
                    We’ll get you to the right tools and supplies for the&nbsp;job.
                </p>
                <button class="${id}__bannerButton" aria-label="Shop for a job, find the right tools and supplies">
                    Shop for a job
                </button>
            </div>
        </div>

    `;
  return html.trim();
};

export default banner;
