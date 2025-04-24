import { h } from 'preact';

const Item = ({ name, quantity, price, image, id }) => {
  return (
    <li className={`${id}-item`}>
      <div className={`${id}-item-image`}>
        <img src={image} alt={name} />
      </div>
      <div className={`${id}-item-content`}>
        <h4>{name}</h4>
        <p>Qty: {quantity}</p>
        <div className={`${id}-item-price-container`}>
          <p>£{price}</p>
        </div>
      </div>
    </li>
  );
};

export default Item;
