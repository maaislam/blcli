const modalMarkup = `
  <div class="AC025_pop-up_modal">
    <div class="AC025_body_click"></div>
    <div class="AC025_loader">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#ffffff" transform="rotate(300 50 51)">
          <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1.3s" begin="0s" repeatCount="indefinite"></animateTransform>
        </path>
      </svg>
    </div>
    <div class="AC025_inner_div">
    <a href="#" class="AC025_close_btn">✕</a>
      <div class="AC025_overflow_fix">
      </div>
    </div>
  </div>
`;

export default modalMarkup;
