/**
 * @desc Create the finder questions with options
 */
import settings from '../settings';
import { __ } from '../helpers';

export default () => {
  const questions = {
    questionOne: {
      parent: `${settings.ID}-question_one`,
      title: [`${__('Is it for your home or business?')}`],
      subTitle: `${__('Select one')}`,
      options: ['Business', `${__('HOME')}`],
    },
    questionTwo: {
      parent: `${settings.ID}-question_two`,
      title: [`${__('What’s your goal?')}`],
      subTitle: `${__('Select one')}`,
      options: ['Fitness', 'Performance', `${__('PREVENTION AND REHAB')}`],
    },
    questionThree: {
      parent: `${settings.ID}-question_three`,
      title: [`${__('What kinds of training are you interested in?')}`],
      subTitle: `${__('Select one')}`,
      options: ['Cardio', `${__('STRENGTH')}`, `${__('FUNCTIONAL & FLEXIBILITY')}`, `${__('GROUP ACTIVITES')}`],
    },
    /*questionFour: {
      parent: `${settings.ID}-question_four`,
      title: 'How many items are you looking to buy?',
      subTitle: `${__('Select one')}`,
      options: ['One', 'Multiple'],
    },*/
  };

  Object.keys(questions).forEach((i) => {
    const data = questions[i];
    const questionContent = document.createElement('div');
    questionContent.classList.add(`${settings.ID}-question_inner`);
    questionContent.innerHTML =
    `<div class="${settings.ID}-question_title">
      <h3>${data.title}</h3>
      <span>${data.subTitle}</span>
    </div>
    <div class="${settings.ID}-options"></div>`;
    document.querySelector(`.${data.parent}`).appendChild(questionContent);

    // ADD THE OPTIONS
    [].forEach.call(data.options, (element) => {
      const option = document.createElement('div');
      option.classList.add(`${settings.ID}-circle_option`);
      option.innerHTML = `<span>${element}</span>`;
      document.querySelector(`.${data.parent} .${settings.ID}-options`).appendChild(option);
    });
  });
};
