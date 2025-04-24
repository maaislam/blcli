const navToggleBtn = (id) => {
  const htmlStr = `<button type="button" class="${id}_nav-toggle navbar-toggle">
      <span>
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.000158782 13.3L0 15.9H23.2L23.1976 13.3H0.000158782Z" fill="white"/>
          <path d="M0.000158782 6.59998L0 9.19998H23.2L23.1976 6.59998H0.000158782Z" fill="white"/>
          <path d="M0.000158782 0L0 2.6H23.2L23.1976 0H0.000158782Z" fill="white"/>
        </svg>    
      </span>
    </button>`;
  return htmlStr;
};
export default navToggleBtn;
