export const modalContent = (id, mainText, buttonText, link, tag) => {
  const html = `  
            <p>${mainText}</p>
            ${
              buttonText === 'REMOVE ALL'
                ? `
                <div class="${id}__buttonWrapper">
                  <button class="${id}__yesBtn ${id}__btn" type="button">Yes</button>
                  <button class="${id}__noBtn ${id}__btn" type="button">No</button>
                </div>
              `
                : `
              <a href="${link}" class="${id}__${tag} ${id}__btn">${buttonText}</a>    
              `
            }
    `;

  return html.trim();
};
