export const autoVelvetiser = () => {
  // auto velvetiser
  const configuratorLanding = document.querySelector(`#main .configurator-landing`);
  const stepSection = configuratorLanding.querySelector(`.steps_section`);
  const stepMachineText = stepSection.querySelector(`#steps #machines .step_name_text`);
  if (stepMachineText && stepMachineText.textContent == "\nMachines\n") stepMachineText.textContent = "\nColour\n";
  const configuratorCont = configuratorLanding.querySelector(`.configurator-container`);
  const velvetiser = configuratorCont?.querySelector(`.options label[for="velvetiser"]`);
  velvetiser?.click();
};
