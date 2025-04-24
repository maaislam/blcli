const minusQty = (id) => {
  const htmlStr = `
    <div class="${id}__quantity-minuscontainer">
        <div class="${id}__quantity-minus">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                viewBox="0 0 55 55"
                class="Qty">
                <g fill="none"
                fill-rule="evenodd">
                    <path stroke-linecap="square"
                        stroke-width="2"
                        d="M20 27.5h15"></path>
                </g>
            </svg>
        </div>
    </div>`;

  return htmlStr;
};
export default minusQty;
