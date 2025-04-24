export const toTitleCase = (str) => {
  if (str.match(/Dsquared2/i)) {
    return 'DSquared2';
  }
  if (str.match(/Bang And Olufsen/i)) {
    return 'Bang and Olufsen';
  }
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}