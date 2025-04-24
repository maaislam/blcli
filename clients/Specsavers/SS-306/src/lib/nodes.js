import shared from "../../../../../core-files/shared";
import { fireEvent } from '../../../../../core-files/services';
import { h } from "preact";

/**
 * decision() returns next step
 */
export default [
	{
		id: 'qualify-initial-check',
		title: 'Do you qualify for a free NHS funded eye test?',
    extraText: "Not sure if you qualify? Check the criteria below to see if you're eligible",
    extraMarkup: (
      <p>
        <a className={`${shared.ID}-check-criteria`}>Check NHS criteria</a>
      </p>
    ),
		answers: [
			['Yes', 'I meet the criteria that determines if I am eligible'],
			['No', "I don't meet the criteria or I usually pay for my eye tests"]
		],
		decision(answer) {
			return [
				'health-condition-unaccompanied-funded', 'health-condition-unaccompanied-unfunded'
			][this.answers.map(a => a[0]).indexOf(answer)];
		}
	},

	{
		id: 'health-condition-unaccompanied-funded',
		title: 'Do you have a physical or mental condition which prevents you from leaving the house unaccompanied?',
		answers: [
			['Yes', 'I have a condition preventing me from leaving my home'],
			['No', "I am still able to leave my home unaccompanied"]
		],
		decision(answer) {
			return [
				'outcome-success-full', 'outcome-failure'
			][this.answers.map(a => a[0]).indexOf(answer)];
		}
	},

	{
		id: 'health-condition-unaccompanied-unfunded',
		title: 'Do you have a physical or mental condition which prevents you from leaving the house unaccompanied?',
		answers: [
			['Yes', 'I have a condition preventing me from leaving my home'],
			['No', "I am still able to leave my home unaccompanied"]
		],
		decision(answer) {
			return [
				'outcome-success-paid', 'outcome-failure'
			][this.answers.map(a => a[0]).indexOf(answer)];
		}
	},

  {
    id: 'outcome-success-full',
    markup: (
      <div>
        <h2 className={`${shared.ID}-wizard__result-title`}><span className={`${shared.ID}-green`}>Thanks!</span><span>It looks like you're eligible</span></h2>
        <p>In order to get your home visit underway please fill out a request form by clicking the link below</p>
        <p>
          <a className={`${shared.ID}-wizard__btn`} onClick={() => fireEvent('Request Home Visit | Free')} href="/home-eye-tests/request-a-free-home-visit?ref=wizard">Request your home visit</a>
        </p>
      </div>
    )
  },
  {
    id: 'outcome-success-paid',
    markup: (
      <div>
        <h2 className={`${shared.ID}-wizard__result-title`}>You are eligible for a private eye test at home</h2>
        <p>Unfortunately you don't qualify for a FREE home eye test because you don't have free NHS funded eye tests, but our private home service is still available to you</p>
        <p>
          <a className={`${shared.ID}-wizard__btn`}  onClick={() => fireEvent('Request Home Visit | Private')} href="/home-eye-tests/request-a-free-home-visit?ref=wizard">Request your home visit</a>
        </p>
      </div>
    )
  },
  {
    id: 'outcome-failure',
    markup: (
      <div>
        <h2 className={`${shared.ID}-wizard__result-title`}>Unfortunately, it looks like you don’t qualify for an NHS-funded eye test</h2>
        <p>If you feel you need extra support with your test it is best to contact your local store directly or book an eye test below</p>
        <p>
          <a className={`${shared.ID}-wizard__btn`}  onClick={() => fireEvent('Book An Eye Test')} href="/book/location">Book an eye test</a>
        </p>
        <p>
          <a className={`${shared.ID}-wizard__link`} onClick={() => fireEvent('Find Store')} href="/stores">Find your store</a>
        </p>
      </div>
    )
  },
];
