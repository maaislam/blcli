import shared from "../../../../../core-files/shared";

const { ID } = shared;

const category = (name,image,url,
) => {
  const cat = document.createElement("a");
  cat.href = url;
  cat.classList.add(`${ID}-category`);
  cat.innerHTML = `
    <div class="${ID}-category-image">
      <img src="${image}" alt="${name}" />
    </div>
    <p>${name}</p>`;

  return cat;
};

export default category;