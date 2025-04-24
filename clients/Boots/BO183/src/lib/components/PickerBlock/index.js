import { h } from "preact";
import shared from "../../../../../../../core-files/shared";
import TextButton from "../TextButton";

import PickerButton from "../PickerButton";
import PickerResult from "../PickerResult";

const { ID } = shared;

const PickerBlock = ({
  activeSection,
  category,
  categoryPick,
  firstPick,
  secondPick,
  onButtonClick,
  onReset,
  onPrevious,
  variation,
}) => {
  return (
    <div className={`${ID}-picker-block ${category}`}>
      <div className={`${ID}-picker-block-header`}>
        <span className={`${ID}-picker-block-icon category-icon`}></span>
        <div>
          <h4>{categoryPick.title}</h4>
          <p>
            Is there anything in particular you are looking for in{" "}
            {activeSection.title}?
          </p>
        </div>
      </div>
      {!firstPick || !secondPick ? (
        <ul className={`${ID}-picker-block-list`}>
          {activeSection.sublinks &&
            activeSection.sublinks.map((sublink, idx) => (
              <PickerButton
                text={sublink.title}
                isSale={sublink.isSale}
                key={sublink.title + idx}
                onClick={() => onButtonClick(idx)}
                url={sublink.url}
                external={
                  variation === "2"
                    ? firstPick
                      ? true
                      : false
                    : variation === "3" && activeSection.title === "Health Hub"
                    ? true
                    : false
                }
              />
            ))}
        </ul>
      ) : (
        <ul className={`${ID}-picker-block-results-list`}>
          <PickerResult
            text="Ok so  you picked:"
            value={categoryPick.title}
            link={categoryPick.url}
          />
          <PickerResult
            text="Then you picked:"
            value={firstPick.title}
            link={firstPick.url}
          />
          <PickerResult
            text="And finally:"
            value={secondPick.title}
            link={secondPick.url}
          />
        </ul>
      )}
      <div className={`${ID}-picker-block-bottom-nav`}>
        <TextButton text="Previous step" onClick={onPrevious} />
        <TextButton text="Start over" onClick={onReset} />
      </div>
    </div>
  );
};
export default PickerBlock;
