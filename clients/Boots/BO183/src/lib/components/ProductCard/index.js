import { h } from "preact";
import shared from "../../../../../../../core-files/shared";
import Button from "../Button";
import { fireEvent } from "../../../../../../../core-files/services";

const { ID } = shared;

const ProductCard = ({ url, image, title, price }) => {
  return (
    <div
      className={`${ID}-product-card`}
      onClick={() => fireEvent(`Product in carousel clicked - ${title}`)}
    >
      <div className={`${ID}-product-card-image`}>
        <img src={image} alt={title} />
      </div>
      <div className={`${ID}-product-card-content`}>
        <h5>{title}</h5>
        <span>{price}</span>
        <Button text="View" href={url} />
      </div>
    </div>
  );
};

export default ProductCard;
