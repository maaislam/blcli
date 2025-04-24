const discount = (id, discountVal) => {
  const htmlStr = `
    <div class="${id}__discount">
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="60" viewBox="0 0 60 26" fill="none">
        <path d="M0 2C0 0.89543 0.895431 0 2 0H46.8915C47.4238 0 47.9342 0.212197 48.3096 0.589605L58.6595 10.9955C59.4106 11.7507 59.4381 12.962 58.7221 13.7505L48.3184 25.2066C47.9393 25.6241 47.4016 25.8621 46.8378 25.8621H2C0.89543 25.8621 0 24.9666 0 23.8621V2Z" fill="#DB3832"/>
        </svg>
        <span class="${id}__discount--text"><span>-</span>&nbsp;${discountVal}</span>
    </div>`;
  return htmlStr.trim();
};

export default discount;
