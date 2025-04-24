import { h } from "preact";
import shared from "../../../../../../../core-files/shared";
import Button from "../Button";
import { fireEvent } from "../../../../../../../core-files/services";

const { ID } = shared;

const HealthHubCard = ({ url, image, title }) => {
  return (
    <div
      className={`${ID}-health-hub-card`}
      onClick={() => fireEvent(`Product in carousel clicked - ${title}`)}
    >
      <div className={`${ID}-health-hub-card-image`}>
        <img src={image} alt={title} />
      </div>
      <div className={`${ID}-health-hub-card-content`}>
        <h5>{title}</h5>
        <Button text="View" href={url} />
      </div>
    </div>
  );
};

export default HealthHubCard;
