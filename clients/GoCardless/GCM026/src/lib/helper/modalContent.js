const closeBtn = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 15 15" fill="none">
<path fill="#1c1b18" fill-rule="evenodd" clip-rule="evenodd" d="M14.6786 0.321429C14.25 -0.107143 13.6071 -0.107143 13.1786 0.321429L7.5 6L1.82143 0.321429C1.39286 -0.107143 0.75 -0.107143 0.321429 0.321429C-0.107143 0.75 -0.107143 1.39286 0.321429 1.82143L6 7.5L0.321429 13.1786C-0.107143 13.6071 -0.107143 14.25 0.321429 14.6786C0.535714 14.8929 0.75 15 1.07143 15C1.39286 15 1.60714 14.8929 1.82143 14.6786L7.5 9L13.1786 14.6786C13.3929 14.8929 13.7143 15 13.9286 15C14.1429 15 14.4643 14.8929 14.6786 14.6786C15.1071 14.25 15.1071 13.6071 14.6786 13.1786L9 7.5L14.6786 1.82143C15.1071 1.39286 15.1071 0.75 14.6786 0.321429Z" fill="white"/>
</svg>`;

const modalContent = (id) => {

    const htmlStr = `
      <div class="${id}__modalcontainer">
          <div class="${id}__modalcontainer--close">${closeBtn}</div>
          <div class="${id}__modalcontainer--iframe">
              <iframe title="iframe" 
                  src="https://forms.gocardless.com/l/305971/2023-07-12/54c9xj" style="width: 100%; border: none; overflow: hidden;" 
                  id="iFrameResizer0"
                  scrolling="no">
              </iframe>
          </div>
      </div>`;

    return htmlStr.trim();
};

export default modalContent;