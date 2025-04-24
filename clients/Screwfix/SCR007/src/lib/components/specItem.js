const specItem = (id, content) => {
  const htmlStr = `<li class="${id}__specitem">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         viewBox="0 0 20 20"
         fill="none">
        <mask id="mask0_13_464"
              style="mask-type:alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20">
            <circle cx="9.75267"
                    cy="9.75267"
                    r="9.25267"
                    fill="url(#paint0_radial_13_464)"
                    stroke="#599433" />
        </mask>
        <g mask="url(#mask0_13_464)">
            <circle cx="9.75267"
                    cy="9.75267"
                    r="9.75267"
                    fill="url(#paint1_radial_13_464)" />
            <circle cx="9.86498"
                    cy="19.0569"
                    r="11.8826"
                    fill="url(#paint2_radial_13_464)" />
            <circle cx="9.75267"
                    cy="9.75267"
                    r="9.25267"
                    stroke="#599433" />
            <g filter="url(#filter0_d_13_464)">
                <path d="M8.42217 10.1166L5.96491 7.6593C5.64783 7.34222 5.48929 7.34225 5.17224 7.6593L3.98325 8.8483C3.66615 9.16537 3.66615 9.3239 3.98325 9.64096L8.1051 13.7628C8.42214 14.0799 8.58068 14.0799 8.89776 13.7628C11.498 11.1626 12.956 9.7048 15.5561 7.10444C15.7939 6.86665 15.7939 6.54958 15.5561 6.31177L14.2879 5.04351C13.9708 4.72643 13.8123 4.72646 13.4952 5.04351L8.42217 10.1166Z"
                      fill="white" />
            </g>
        </g>
        <defs>
            <filter id="filter0_d_13_464"
                    x="1.74512"
                    y="2.80566"
                    width="19.9893"
                    height="17.1951"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0"
                         result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha"
                               type="matrix"
                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha" />
                <feOffset dx="2"
                          dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha"
                             operator="out" />
                <feColorMatrix type="matrix"
                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal"
                         in2="BackgroundImageFix"
                         result="effect1_dropShadow_13_464" />
                <feBlend mode="normal"
                         in="SourceGraphic"
                         in2="effect1_dropShadow_13_464"
                         result="shape" />
            </filter>
            <radialGradient id="paint0_radial_13_464"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(9.86477 1.56093e-06) rotate(90) scale(16.5907)">
                <stop stop-color="#92C44A" />
                <stop offset="1"
                      stop-color="#73A641" />
            </radialGradient>
            <radialGradient id="paint1_radial_13_464"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(9.86477 1.56093e-06) rotate(90) scale(16.5907)">
                <stop stop-color="#92C44A" />
                <stop offset="1"
                      stop-color="#73A641" />
            </radialGradient>
            <radialGradient id="paint2_radial_13_464"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(9.86498 7.73481) rotate(90) scale(11.3221 21.9386)">
                <stop stop-color="#40762C"
                      stop-opacity="0.28" />
                <stop offset="1"
                      stop-color="#326926"
                      stop-opacity="0.8" />
            </radialGradient>
        </defs>
    </svg>
    <span class="${id}__specitem--description">${content}</span>
</li>`;
  return htmlStr.trim();
};

export default specItem;
