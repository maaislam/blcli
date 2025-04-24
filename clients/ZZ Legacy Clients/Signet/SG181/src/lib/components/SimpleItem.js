import { h } from 'preact';

const Item = ({ name, price, image, url, id }) => {
  return (
    <div className={`${id}-simple-item`}>
      <a href={url}>
        <div className={`${id}-simple-item-image`}>
          <img src={image} alt={name} />
        </div>
        <div className={`${id}-simple-item-content`}>
          <h4>{name}</h4>
          <div className={`${id}-simple-item-price`}>
            <p>£{price}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Item;
