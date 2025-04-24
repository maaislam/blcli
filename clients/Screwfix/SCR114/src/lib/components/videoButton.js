const videoButton = (id) => {
  const html = `
    <button role="button" tabindex="0" type="button" class="${id}__videoButton"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="1.75 3.5 21.875 21" aria-hidden="true" focusable="false" class="U_3Olv eY8Bzy tTqBE4"><rect x="1.75" y="3.5" width="21.875" height="21" rx="4" fill="#fff"></rect><path d="M16.179 14a.59.59 0 0 1-.163.408l-4.075 4.075a.562.562 0 0 1-.408.18.562.562 0 0 1-.407-.18.562.562 0 0 1-.18-.407v-8.15c0-.164.06-.3.18-.408a.663.663 0 0 1 .407-.18.49.49 0 0 1 .408.18l4.075 4.075a.553.553 0 0 1 .163.408Z" fill="#636363"></path></svg><span>video</span></button>
  `;
  return html.trim();
};

export default videoButton;
