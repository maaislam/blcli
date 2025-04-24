const changeFormFunction = (
  slidePage,
  progressButtonOne,
  progressButtonTwo,
  progressButtonThree,
  progressButtonFour,
  giftJourneyImageSection,
  progressBarTick,
  progressBarNumber,
  fromOneImage,
  sumbmitUrl
) => {
  slidePage.style.marginLeft = `0`;
  progressButtonOne.classList.remove('final-active');
  progressButtonTwo.classList.remove('final-active');
  progressButtonThree.classList.remove('final-active');
  progressButtonTwo.classList.remove('active');
  progressButtonThree.classList.remove('active');
  progressButtonFour.classList.remove('active');
  //giftJourneyImageSection.setAttribute('src', fromOneImage);
  giftJourneyImageSection.style.backgroundImage = `url('${fromOneImage}')`;
  progressBarTick[0].style.display = 'none';
  progressBarTick[1].style.display = 'none';
  progressBarTick[2].style.display = 'none';
  progressBarNumber[0].style.display = 'block';
  progressBarNumber[1].style.display = 'block';
  progressBarNumber[2].style.display = 'block';
  sumbmitUrl.occasion = '';
  sumbmitUrl.needTime = '';
  sumbmitUrl.spendAmount = '';
};

const changeFormFunctionTwo = (
  slidePage,
  progressButtonTwo,
  progressButtonThree,
  progressButtonFour,
  giftJourneyImageSection,
  progressBarTick,
  progressBarNumber,
  fromTwoImage,
  sumbmitUrl
) => {
  slidePage.style.marginLeft = '-25%';
  progressButtonTwo.classList.remove('final-active');
  progressButtonThree.classList.remove('final-active');
  progressButtonThree.classList.remove('active');
  progressButtonFour.classList.remove('active');
  //giftJourneyImageSection.setAttribute('src', fromTwoImage);
  giftJourneyImageSection.style.backgroundImage = `url('${fromTwoImage}')`;

  progressBarTick[1].style.display = 'none';
  progressBarTick[2].style.display = 'none';
  progressBarNumber[1].style.display = 'block';
  progressBarNumber[2].style.display = 'block';
  sumbmitUrl.needTime = '';
  sumbmitUrl.spendAmount = '';
};

const changeFormFunctionThree = (
  slidePage,
  progressButtonThree,
  progressButtonFour,
  giftJourneyImageSection,
  progressBarTick,
  progressBarNumber,
  fromThreeImage,
  sumbmitUrl
) => {
  slidePage.style.marginLeft = '-50%';
  progressButtonThree.classList.remove('final-active');
  progressButtonFour.classList.remove('active');
  //giftJourneyImageSection.setAttribute('src', fromThreeImage);
  giftJourneyImageSection.style.backgroundImage = `url('${fromThreeImage}')`;

  progressBarTick[2].style.display = 'none';
  progressBarNumber[2].style.display = 'block';
  sumbmitUrl.needTime = '';
};

export { changeFormFunction, changeFormFunctionTwo, changeFormFunctionThree };
