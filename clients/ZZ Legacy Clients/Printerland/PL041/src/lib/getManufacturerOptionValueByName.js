const getOption = (name, options) => {
  let relatedOption = false; 
  options.forEach(option => {
    if (option.innerText == name) {
      relatedOption = option;
    }
  });
  return relatedOption;
};

const getManufacturerOptionValueByName = (name, options) => {
	let optionsArray = Array.apply(null, options);
	const relatedOption = getOption(name, optionsArray);
	return relatedOption.value ?? false;
};

export default getManufacturerOptionValueByName;