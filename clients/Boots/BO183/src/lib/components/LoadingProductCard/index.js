import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const LoadingProductCard = () => {
  return (
    <div className={`${ID}-loading-product-card`}>
      <div className={`${ID}-loading-product-card-image`}></div>
      <div className={`${ID}-loading-product-card-content`}>
        <h5></h5>
        <span></span>
        <button />
      </div>
    </div>
  );
};

export default LoadingProductCard;
