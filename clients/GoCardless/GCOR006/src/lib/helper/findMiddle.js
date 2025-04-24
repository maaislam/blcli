const findMiddle = () => {
  const heading2 = document.querySelectorAll('h2');
  const heading3 = document.querySelectorAll('h3');

  if (heading3.length > heading2.length || !heading2) {
    const indexToUse = Math.round(heading3.length / 2);

    return heading3[indexToUse];
  } else {
    return heading2[Math.round(heading2.length / 2)];
  }
};

export default findMiddle;
