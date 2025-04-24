const plpCard = (id) => {
  const htmlStr = `<div class='${id}__plpCard'>
        <div class='image'>
            <img src='https://media.screwfix.com/is/image/ae235/602HN_P?$fxSharpen$=&wid=257&hei=257&dpr=on' alt='Flomasta  White / Chrome Angled Thermostatic Radiator Valve & Lockshield  15mm x M30&quot;' />
        </div>
        <div class='content'>
            <h3 class='title'>FREE Flomasta TRV</h3>
            <div class='offer-price'>
                <span class='price'>worth £20.00</span>
                <span class='code'>(602HN)</span>
            </div>
            <p class='offer-note'>When bought with this radiator</p>
            <div class='badge'>Free Value</div>
        </div>
    </div>`;
  return htmlStr;
};

export default plpCard;
