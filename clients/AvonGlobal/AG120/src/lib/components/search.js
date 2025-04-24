import giftData from "../data/giftData";

const search = (ID) => {
    const htmlStr = `<div class="${ID}__container">
        <p class='${ID}__suggestionHeader'>Search Suggestions</p>
        <ul>
            ${giftData.map((item) => {
                return `<li>
                    <a href="${item.href}">${item.title}</a>
                </li>`;
            }).join("")}
        </ul>
    </div>`
    return htmlStr;
  };
  
export default search;