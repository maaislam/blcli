import { h } from "preact";
import shared from "../../../../../../../core-files/shared";
import Button from "../Button";

const { ID } = shared;

const PickerResult = ({ text, value, link }) => {
  return (
    <li className={`${ID}-picker-result`}>
      <div className={`${ID}-picker-result-content`}>
        <p>{text}</p>
        <p className={`${ID}-picker-result-value`}>{value}</p>
      </div>
      <Button text="Shop now" href={link} />
    </li>
  );
};

export default PickerResult;
