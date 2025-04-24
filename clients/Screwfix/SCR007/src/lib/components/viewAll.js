const viewAllSpec = (id, href) => {
  const htmlStr = `
        <a class="${id}__specanchor" href="${href}">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none">
                <mask id="mask0_11_3017"
                    style="mask-type:alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="27"
                    height="27">
                    <path d="M26.5 26C26.5 26.2761 26.2762 26.5 26 26.5H1.00011C0.723966 26.5 0.500108 26.2761 0.500107 26L0.500045 1.00003C0.500044 0.723883 0.723902 0.500025 1.00004 0.500024L26 0.500001C26.2762 0.500001 26.5 0.72386 26.5 1V26Z"
                        fill="url(#paint0_radial_11_3017)"
                        stroke="#599433" />
                </mask>
                <g mask="url(#mask0_11_3017)">
                    <circle cx="13.9012"
                            cy="13.9021"
                            r="15.4895"
                            fill="url(#paint1_radial_11_3017)" />
                    <path d="M26.5 26.5H0.500109L0.500044 0.500025L26.5 0.5V26.5Z"
                        fill="url(#paint2_radial_11_3017)"
                        stroke="#599433" />
                    <circle cx="14.0793"
                            cy="28.6794"
                            r="18.8723"
                            fill="url(#paint3_radial_11_3017)" />
                    <path d="M26.5 26C26.5 26.2761 26.2762 26.5 26 26.5H1.00011C0.723966 26.5 0.500108 26.2761 0.500107 26L0.500045 1.00003C0.500044 0.723883 0.723902 0.500025 1.00004 0.500024L26 0.500001C26.2762 0.500001 26.5 0.72386 26.5 1V26Z"
                        stroke="#599433" />
                    <path d="M8.99998 8.57692C8.99998 8.11537 8.88928 8 8.4466 8H6.55337C6.1107 8 6 8.11537 6 8.57692V10.4231C6.00003 10.7692 6.22138 11 6.55337 11H8.4466C8.7786 11 8.99995 10.7692 8.99998 10.4231V8.57692Z"
                        fill="white" />
                    <path d="M22.0605 12.5769C22.0605 12.1154 21.9484 12 21.5 12H10.5605C10.1121 12 10 12.1154 10 12.5769V14.4231C10 14.7692 10.2242 15 10.5605 15H21.5C21.8363 15 22.0605 14.7692 22.0605 14.4231V12.5769Z"
                        fill="white" />
                    <path d="M22.0605 16.5769C22.0605 16.1154 21.9484 16 21.5 16H10.5605C10.1121 16 10 16.1154 10 16.5769V18.4231C10 18.7692 10.2242 19 10.5605 19H21.5C21.8363 19 22.0605 18.7692 22.0605 18.4231V16.5769Z"
                        fill="white" />
                    <path d="M22.0605 8.57692C22.0605 8.11537 21.9484 8 21.5 8L10.5605 8C10.1121 8 10 8.11537 10 8.57692V10.4231C10 10.7692 10.2242 11 10.5605 11H21.5C21.8363 11 22.0605 10.7692 22.0605 10.4231V8.57692Z"
                        fill="white" />
                    <path d="M8.99998 12.5769C8.99998 12.1154 8.88928 12 8.4466 12H6.55337C6.1107 12 6 12.1154 6 12.5769V14.4231C6.00003 14.7692 6.22138 15 6.55337 15H8.4466C8.7786 15 8.99995 14.7692 8.99998 14.4231V12.5769Z"
                        fill="white" />
                    <path d="M8.99998 16.5769C8.99998 16.1154 8.88928 16 8.4466 16H6.55337C6.1107 16 6 16.1154 6 16.5769V18.4231C6.00003 18.7692 6.22138 19 6.55337 19H8.4466C8.7786 19 8.99995 18.7692 8.99998 18.4231V16.5769Z"
                        fill="white" />
                </g>
                <defs>
                    <radialGradient id="paint0_radial_11_3017"
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="translate(13.1203 -1.66095) rotate(90) scale(27.5707 23.9008)">
                        <stop stop-color="#92C44A" />
                        <stop offset="1"
                            stop-color="#73A641" />
                    </radialGradient>
                    <radialGradient id="paint1_radial_11_3017"
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="translate(14.0792 -1.5874) rotate(90) scale(26.35)">
                        <stop stop-color="#92C44A" />
                        <stop offset="1"
                            stop-color="#73A641" />
                    </radialGradient>
                    <radialGradient id="paint2_radial_11_3017"
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="translate(13.1203 -1.66095) rotate(90) scale(27.5707 23.9008)">
                        <stop stop-color="#92C44A" />
                        <stop offset="1"
                            stop-color="#73A641" />
                    </radialGradient>
                    <radialGradient id="paint3_radial_11_3017"
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="translate(14.0793 10.6973) rotate(90) scale(17.9821 34.8437)">
                        <stop stop-color="#40762C"
                            stop-opacity="0.28" />
                        <stop offset="1"
                            stop-color="#326926"
                            stop-opacity="0.8" />
                    </radialGradient>
                </defs>
            </svg>
            <span>View all specifications</span>
        </a>`;

  return htmlStr.trim();
};

export default viewAllSpec;
