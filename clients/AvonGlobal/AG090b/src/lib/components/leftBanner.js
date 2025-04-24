const renderLeftBanner = (parentElm, id, heroImg, href, subtitle1, subtitle2) => {
  const containerHeight = window.matchMedia('(max-width: 768px)').matches
    ? 560
    : window.matchMedia('(max-width: 600px)').matches
    ? 380
    : document.querySelector(`.${id}__categoty--showcase`).offsetHeight;

  const catLink = href || '${Default categoty link}';
  const heroImage = heroImg || '${Default hero Image}';
  const initialSub1 = subtitle1 || '${Default subtitle line1}';
  const initialSub2 = subtitle1 || '${Default subtitle line2}';

  const htmlStr = `

        <a class="${id}__leftbanner" href="${catLink}" style="background-image:url(${heroImage});height: ${containerHeight}px">      
            <div class="text-container">
                <div class="subtitle">
                    <div>${initialSub1}</div>
                    <div>${initialSub2}</div>
                </div>
                <div class="shopbtn">
                  Cumpără acum
                </div>
            </div>
        </a>`;

  parentElm.insertAdjacentHTML('afterbegin', htmlStr);
};

export default renderLeftBanner;
