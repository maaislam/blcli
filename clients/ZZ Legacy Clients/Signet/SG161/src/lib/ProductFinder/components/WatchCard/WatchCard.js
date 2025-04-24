import { h } from 'preact';

const WatchCard = ({ title, image, price, url, id }) => {
  return (
    <a className={`${id}-watch-card`} href={url}>
      <div className={`${id}-watch-card-image`}>
        <img src={image} alt="" />
      </div>
      <div className={`${id}-watch-card-content`}>
        <h3>{title}</h3>
        <div className={`${id}-watch-card-price`}>
          <p>{price}</p>
        </div>
      </div>
    </a>
  );
};

export default WatchCard;
