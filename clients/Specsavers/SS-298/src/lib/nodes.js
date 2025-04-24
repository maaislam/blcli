import shared from "../../../../../core-files/shared";
import { fireEvent } from '../../../../../core-files/services';
import { h } from "preact";

/**
 * decision() returns 
 *   true (end with outcome success)
 *   false (end with outcome failure)
 *   <string> (go to next step with ID <string>)
 */
export default [
	{
		id: 'age',
		title: 'How old are you?',
		answers: [
			'15 or under',
			'16, 17 or 18 and in full-time education',
			'60 or over',
			'Other',
		],
		category: 'Age',
		decision(answer) {
			return [
				true, true, true, 'blind'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'blind',
		category: 'Medical',
		title: 'Are you registered as partially sighted or blind?',
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'diabetes'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'diabetes',
		category: 'Medical',
		title: 'Are you diagnosed with diabetes or glaucoma?',
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'glaucoma-risk'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'glaucoma-risk',
		category: 'Medical',
		title: "Have you been advised by an ophthalmologist (eye doctor) that you're at risk of glaucoma?",
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'age-and-family-history'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'age-and-family-history',
		category: 'Medical',
		title: "Are you aged 40 or over and your mother, father, brother, sister, son or daughter has been diagnosed with glaucoma?",
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'income-support'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'income-support',
		category: 'Income',
		title: "Do you or your partner receive income support?",
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'jobseekers-allowance'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'jobseekers-allowance',
		category: 'Income',
		title: "Do you or your partner receive income-based (not contribution based) jobseekers allowance?",
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'nhs-tax-credit'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'nhs-tax-credit',
		category: 'Income',
		title: "Are you or your partner entitled to, or named on, a valid NHS tax credit exemption certificate?",
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'valid-hc2'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'valid-hc2',
		category: 'Income',
		title: "Are you or your partner on a low income and named on a valid HC2 (full help) certificate?",
    extraText: 'If you or your partner are named on a valid HC3 certificate, you might be able to get partial help towards the cost of your eye test. Ask in store.',
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'prisoner'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'prisoner',
		category: 'Other',
		title: "Are you a prisoner on leave from prison?",
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, 'nhs-complex-voucher'
			][this.answers.indexOf(answer)];
		}
	},
	{
		id: 'nhs-complex-voucher',
		category: 'Other',
		title: "Are you eligible for an NHS complex voucher?",
		answers: [
			'Yes',
			'No',
		],
		decision(answer) {
			return [
				true, false
			][this.answers.indexOf(answer)];
		}
	},

  {
    id: 'outcome-success',
    markup: (
      <div>
        <h2 className={`${shared.ID}-wizard__result-title`}><span className={`${shared.ID}-green`}>Thanks!</span><span>It looks like you're eligible</span></h2>
        <p>You'll need to bring along a <strong>passport, student card or driving license</strong> to your appointment just to show that you qualify for an NHS-funded eye test. You will also be asked to declare the reason and sign the NHS declaration stating that you're entitled to an NHS-funded eye test.</p>
        <p>
          <a className={`${shared.ID}-wizard__btn`} href="/book/location">Book an eye test</a>
        </p>
        <p>
          <a className={`${shared.ID}-wizard__link`} href="/stores">Find your store</a>
        </p>
      </div>
    )
  },
  {
    id: 'outcome-failure',
    markup: (
      <div>
        <h2 className={`${shared.ID}-wizard__result-title`}>Unfortunately, it looks like you don’t qualify for an NHS-funded eye test</h2>
        <p>You can still book an eye test with us online. The cost of an eye test varies, but it's usually around £20-25.</p>
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
