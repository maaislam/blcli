import shared from "../../../../../core-files/shared";

const { ID } = shared;

const breadCrumb = (
 linkName,
 linkURL,
) => {
  const breadcrumb = document.createElement("a");
  breadcrumb.href = linkURL;
  breadcrumb.classList.add(`${ID}-breadcrumb`);
  breadcrumb.innerHTML = `<span>${linkName}</span>`;
    
  return breadcrumb;
};

export default breadCrumb;