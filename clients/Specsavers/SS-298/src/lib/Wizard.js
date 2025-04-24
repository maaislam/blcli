import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import shared from "../../../../../core-files/shared";
import { fireEvent } from "../../../../../core-files/services";

const { ID } = shared;

/**
 * Wizard
 */
export default function Wizard({ nodes }) {
  /**
   * Check tracking from SS-364
   */
  const isFromSS364 =
    sessionStorage.getItem("SS-364") === "true" ? "[SS364] " : "";

  /**
   * Helper get a question node from its ID property
   */
  const getNodeById = (id) => nodes.filter((n) => n.id == id)[0];

  /**
   * Helper get node values for a given prop
   * e.g. specify 'category' to get all unique categories in our node set
   */
  const getNodePropUniques = (key) => {
    return [...new Set(nodes.map((n) => n[key]).filter((v) => !!v))];
  };

  /**
   * Get first node matching a prop val
   */
  const getFirstNodeMatchingPropVal = (key, val) => {
    return nodes.filter((n) => n[key] == val)?.[0];
  };

  /**
   * Helper get first step from nodes
   */
  const getFirstStep = () => {
    return nodes[0].id;
  };

  const [isOpenState, setIsOpenState] = useState(false);
  const [stepHistory, setStepHistory] = useState([getFirstStep()]);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [activeStep, setActiveStep] = useState(getFirstStep());
  const [animated, setAnimated] = useState(false);

  /**
   * Helper lock body for overflow issues
   */
  const lockBodyScroll = () => {
    if (isOpenState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  useEffect(() => lockBodyScroll(), [isOpenState]);

  /**
   * Helper init component from existing DOM interaction,
   * initialise this check on component mount
   */
  const initFromDom = () => {
    const btn = document.querySelector(`.${ID}-init`);
    btn &&
      btn.addEventListener("click", (e) => {
        fireEvent(`${isFromSS364}Start Wizard`);
        setIsOpenState(true);
      });
  };

  useEffect(() => initFromDom(), []);

  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 200);
  }, [activeStep]);

  /**
   * Helper did close quiz
   */
  const onClose = () => {
    fireEvent(`${isFromSS364}Closed Wizard`);

    setIsOpenState(false);

    setAnswerHistory([]);
    setStepHistory([getFirstStep()]);
    setActiveStep(getFirstStep());
  };

  /**
   * Helper go to a step in the tree of nodes
   */
  const goToStep = (step) => {
    setAnimated(false);

    setStepHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push(step);
      return newHistory;
    });

    setActiveStep(step);
  };

  /**
   * Helper go back one step, updating any associated histories in state
   */
  const goToPreviousStep = () => {
    fireEvent(`${isFromSS364}Go Back`);

    const target = stepHistory[stepHistory.length - 2] || getFirstStep();

    setStepHistory((prev) => {
      // Remove current and prev steps from history
      const newHistory = [...prev];
      newHistory.splice(-2, 2);
      return newHistory;
    });

    setAnswerHistory((prev) => {
      // Remove last answer from history
      const newHistory = [...prev];
      newHistory.splice(-1, 1);
      return newHistory;
    });

    goToStep(target);
  };

  /**
   * Did answer a question, make a decision
   */
  const didAnswer = (val) => {
    const n = getNodeById(activeStep);
    const decision = n.decision(val);

    setAnswerHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push(val);
      return newHistory;
    });

    fireEvent(`${isFromSS364}Answers | ${activeStep} | ${val}`);

    if (decision === true) {
      fireEvent(
        `${isFromSS364}Outcome - Eligible | ` +
          stepHistory.join(";") +
          " | " +
          answerHistory.join(";")
      );

      goToStep("outcome-success");
    } else if (decision === false) {
      fireEvent(
        `${isFromSS364}Outcome Don't Qualify | ` +
          stepHistory.join(";") +
          " | " +
          answerHistory.join(";")
      );

      goToStep("outcome-failure");
    } else {
      goToStep(decision);
    }
  };

  /**
   * Jump to category
   */
  const jumpToCategory = (cat) => {
    fireEvent(`${isFromSS364}Click Category - ` + cat);

    const n = getFirstNodeMatchingPropVal("category", cat);
    if (n) {
      goToStep(n.id);
    }
  };

  /**
   * Render
   */
  return (
    <div className={`${ID}-wizard`} data-open={isOpenState}>
      <div className={`${ID}-wizard__header`}>
        {stepHistory.length > 1 ? (
          <span
            className={`${ID}-wizard__back`}
            onClick={goToPreviousStep}
            title="Back"
          >
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </span>
        ) : (
          ""
        )}

        <span className={`${ID}-wizard__close`} onClick={onClose} title="Close">
          &times;
        </span>

        <img
          className={`${ID}-wizard__logo`}
          src="/sites/aui/22.05.1/bundles/pageparts/images/page-parts/1/XS_Specsavers_Logo_opt.svg"
        ></img>

        <h2 className={`${ID}-wizard__title`}>NHS-Funded Eye Tests</h2>

        {activeStep.match(/outcome-/) ? (
          ""
        ) : (
          <ul className={`${ID}-wizard__cats`}>
            {getNodePropUniques("category").map((c) => (
              <li
                onClick={() => jumpToCategory(c)}
                className={
                  getNodeById(activeStep).category == c ? `${ID}-active` : ""
                }
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {getNodeById(activeStep).markup ? (
        <div
          className={
            `${ID}-wizard__question ${ID}-wizard__question--markup ` +
            (animated ? `${ID}-wizard__question--active` : "")
          }
          data-id={getNodeById(activeStep).id}
        >
          {getNodeById(activeStep).markup}
        </div>
      ) : (
        <div
          className={
            `${ID}-wizard__question ` +
            (animated ? `${ID}-wizard__question--active` : "")
          }
          data-id={getNodeById(activeStep).id}
        >
          <h3>{getNodeById(activeStep).title}</h3>
          {getNodeById(activeStep).extraText ? (
            <p className={`${ID}-extraText`}>
              {getNodeById(activeStep).extraText}
            </p>
          ) : (
            ""
          )}
          <div className={`${ID}-wizard__answers`}>
            {getNodeById(activeStep).answers.map((m) => (
              <div
                className={`${ID}-wizard__answer`}
                data-value={m}
                onClick={() => didAnswer(m)}
              >
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
