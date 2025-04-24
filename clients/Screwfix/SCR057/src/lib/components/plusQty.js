const plusQty = (id) => {
  const htmlStr = `
    <div class="${id}__quantity-pluscontainer">
        <div class="${id}__quantity-plus">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                viewBox="0 0 55 55"
                class="Qty">
                <g fill="none"
                fill-rule="evenodd">
                    <g stroke-linecap="square"
                    stroke-width="2">
                        <path d="M20 27.5h14.242M27.5 20v14.242"></path>
                    </g>
                </g>
            </svg>
        </div>
    </div>`;

  return htmlStr;
};

export default plusQty;
