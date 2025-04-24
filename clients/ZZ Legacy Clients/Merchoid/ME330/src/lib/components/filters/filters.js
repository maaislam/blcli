import shared from "../../../../../../../core-files/shared";
import svg from "../svg/svg";

const { ID } = shared;

const openFilterButton = (onClick) => {
  const root = document.createElement("button");
  root.classList.add(`${ID}-filters__open-filters-button`);
  root.textContent = "Filter & sort";
  root.insertAdjacentHTML("afterbegin", svg("filter"));
  root.addEventListener("click", onClick);

  return root;
};

const filterTray = (filters, onPriceChange, onCategoryChange, onTrayToggle) => {
  const root = document.createElement("div");
  root.classList.add(`${ID}-filters__tray`);
  root.innerHTML = /* html */ `
		<button class="${ID}-filters__tray-hide" data-close-tray>
			<span>Close filter sidebar</span>
		</button>
		<div class="${ID}-filters__tray-content-wrapper">
			<div class="${ID}-filters__tray-header">
				<h2>
					<span>${svg("filter")}</span>
					Filter
				</h2>
			</div>
			<div class="${ID}-filters__tray-list">
				<fieldset>
					<legend>Price</legend>
					<div>
						<label>
							<input type="radio" name="Price" value="default" checked />
							Default
						</label>
					</div>
					<div>
						<label>
							<input type="radio" name="Price" value="low-to-high" />
							Low to high
						</label>
					</div>
					<div>
						<label>
							<input type="radio" name="Price" value="high-to-low" />
							High to low
						</label>
					</div>
				</fieldset>
			</div>
			<div class="${ID}-filters__tray-list">
				<fieldset>
					<legend>Categories</legend>
					${filters
            .map(
              (f) => /* html */ `
								<div>
									<label>
										<input type="checkbox" name="Category" value="${f}" />
										${f.replaceAll("-", " ")}
									</label>
								</div>
							`
            )
            .join("")}
				</fieldset>
			</div>
		</div>
	`;

  const priceFilters = root.querySelectorAll('input[name="Price"]');
  priceFilters.forEach((p) => p.addEventListener("click", onPriceChange));

  const categoryFilters = root.querySelectorAll('input[name="Category"]');
  categoryFilters.forEach((c) => c.addEventListener("click", onCategoryChange));

  const trayCloseButton = root.querySelector("[data-close-tray]");
  trayCloseButton.addEventListener("click", onTrayToggle);

  return root;
};

const backdrop = (onClick) => {
  const root = document.createElement("div");
  root.classList.add(`${ID}-backdrop`);
  root.addEventListener("click", onClick);

  return root;
};

export default function filters(data, onPriceChange, onCategoryChange) {
  const root = document.createElement("div");
  root.classList.add(`${ID}-filters__wrapper`);

  const productCount = document.querySelectorAll(`.${ID}-product`).length;

  root.innerHTML = /* html */ `
		<div class="${ID}-filters">
			<div class="${ID}-filters__quick-list">
				<fieldset>
					<legend>Categories</legend>
					${data
            .map(
              (f) => /* html */ `
								<div>
									<label>
										<input type="checkbox" name="Category" value="${f}" />
										${f.replaceAll("-", " ")}
									</label>
								</div>
							`
            )
            .join("")}
				</fieldset>
			</div>
			<p>
				<span data-product-count>${productCount}</span> products
			</p>
		</div>
		<div class="${ID}-filters__active-display" data-filters-active-display></div>
	`;

  const toggleTray = () => {
    const tray = document.querySelector(`.${ID}-filters__tray`);
    const backdrop = document.querySelector(`.${ID}-backdrop`);

    if (tray.hasAttribute("open")) {
      tray.removeAttribute("open");
      backdrop.removeAttribute("open");
      document.body.style.overflow = "";
    } else {
      tray.setAttribute("open", "");
      backdrop.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    }
  };

  document.body.append(
    backdrop(() => toggleTray()),
    filterTray(data, onPriceChange, onCategoryChange, toggleTray)
  );

  const filterBar = root.querySelector(`.${ID}-filters`);
  filterBar.append(openFilterButton(() => toggleTray()));

  const quickFilters = root.querySelectorAll('input[name="Category"]');
  quickFilters.forEach((c) => c.addEventListener("click", onCategoryChange));

  return root;
}
