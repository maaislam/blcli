const extraInfo = (id, extraCost) => {
  const html = `
        <div class="${id}__infoWrapper">
            <span class="${id}__text">Until noon, or</span>
            <span class="${id}__date">anytime on Sunday +£${Math.round(extraCost)}</span>
           
        </div>
    `;

  return html.trim();
};

export default extraInfo;
