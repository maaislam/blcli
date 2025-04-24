import { setCookie } from "../../../../../lib/utils";
import { updateStep } from "./services";
import shared from "./shared";

export default () => {
  const { ID, VARIATION } = shared;

  // on success of form submit
  const showSuccess = () => {
    const wrapper = document.querySelector(`.${ID}_wrapper`);
    wrapper.innerHTML = `
      <div class="${ID}_content">
        <p class="${ID}_thankyou">Thank you for your feedback!</p>
      </div>
    `;

    setTimeout(() => {
      wrapper.remove();
    }, 3000);
  };

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyxgWeLrZWji64s9Z4iPTePnlY9Yu5FDDxLzrKUjK9v388yb0RdEU5EUtpmjKHEYrlJ/exec";
  const submitNPS = (score) => {
    updateStep("2");
    const formData = new FormData();

    formData.append("pagePath", window.location.pathname);
    formData.append("NPS_score", score);

    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => {
        // data.row should contain the row ID, we can use this to update it with more feedback
        if (data && data.row) {
          localStorage.setItem(`${ID}_feedbackrow`, data.row);
        }
      })
      .catch((error) => console.error("Error!", error.message));
  };

  const submitFeedback = (feedback) => {
    const rowID = localStorage.getItem(`${ID}_feedbackrow`);
    if (!rowID) return;
    const formData = new FormData();
    formData.append("rowID", rowID);
    formData.append("free_text", feedback);

    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => {
        updateStep("done");
      })
      .catch((error) => console.error("Error!", error.message));
  };

  // Capture NPS button click
  const nps = document.querySelectorAll(`.${ID}_npsButton`);
  if (nps) {
    nps.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        const score = event.target.getAttribute("data-score");
        submitNPS(score);
      });
    });
  }

  // Capture feedback text sends
  const feedbackBtn = document.querySelector(`.${ID}_send`);
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", () => {
      const feedback = document.querySelector(`.${ID}_feedback`).value;
      if (feedback) submitFeedback(feedback);

      showSuccess();
    });
  }
};