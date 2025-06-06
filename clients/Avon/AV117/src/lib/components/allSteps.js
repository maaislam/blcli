import steps from './step';

const allSteps = (id, stepsData) => {
  const htmlStr = `
        <section class="${id}__steps--section section section--withBackground WMNContainerInner PBot">
            <h2 class="h2 PBot text-center">START YOUR REP JOURNEY TODAY</h2>
            <div class="${id}__steps-wrapper">
                ${stepsData.map((stepData, idx) => steps(id, idx, stepData)).join('\n')}

            </div>
            <a class="${id}__join--btn" href="#apply">
                <button class="button button--large CTAButton"
                value="JOIN TODAY">JOIN TODAY</button> </a>
            
        </section>`;

  return htmlStr;
};
export default allSteps;
