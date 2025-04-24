const tab = (title, id, onClick) => {
  const tab = document.createElement("li");
  const tabButton = document.createElement("button");
  tab.append(tabButton);
  tabButton.setAttribute("data-id", id);
  tabButton.textContent = title;
  tabButton.addEventListener("click", onClick);

  return tab;
};

export default tab;
