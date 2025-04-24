import * as helpers from './helpers.js';

class Accordion {
    /**
     * Constructor
     */
    constructor(validators) {
        this.path = [];

        if(!validators) {
            throw "Missing validators.";
        }

        this.validators = validators;

        this.currentStep = $('.wo17-step[data-default-step=1]');
    }

    /**
     * Reference to active measurement type
     */
    setUnit(unitName) {
        this.unit = unitName;
    }

    /**
     * Get current step data-step attribute string identifier
     */
    getCurrentStepName() {
        return this.currentStep.attr('data-step');
    }

    /**
     * Get current step
     */
    getCurrentStep() {
        return this.currentStep;
    }

    /**
     * Entry point for running accordion
     */
    run() {
        this.bindEventHandlers();
    }

    /**
     * Helper bind listeners
     */
    bindEventHandlers() {
        $('.wo17-init-next-step').on('click', (e) => {
            this.decision();
        });

        $('.wo17-add-to-cart-button').on('click', (e) => {
            return this.decision();
        });

        $('.wo17-step__change').on('click', (e) => {
            var targetStep = $(e.currentTarget).parent('.wo17-step').attr('data-step');
            this.goToStep(targetStep);

            helpers.sendEvent('did-change-an-answer', targetStep);
        });
    }

    /**
     * Clear summary
     */
    clearSummary(step) {
        step = step ? $('.wo17-step[data-step=' + step + ']') : this.currentStep;

        const summary = step.find('.wo17-step__summary');
        summary.html('');
    }

    /**
     * Update summary against step
     */
    updateSummary(content, step) {
        step = step ? $('.wo17-step[data-step=' + step + ']') : this.currentStep;

        step.find('.wo17-step__summary').append([
            '<span class="wo17-step__summary-tick">',
                '<i class="fa fa-check"></i>',
                ' ',
                content,
            '</span>'
        ].join(''));
    }

    /**
     * Decide how we should proceed to a step based on current
     * step and sometimes the answer given dictates how we proceed
     */
    decision() {
        if(!this.validators.execute(this.getCurrentStepName(), [this.currentStep])) {
            this.currentStep.addClass('wo17-step--invalid');
            return false;
        } else {
            this.currentStep.removeClass('wo17-step--invalid');
        }

        let answerGiven = '';

        this.clearSummary();

        switch(this.getCurrentStepName()) {
            case 'measurements-known-question':
                // ----------------------------------------------------------------
                // Question 1
                // ----------------------------------------------------------------
                answerGiven = this.currentStep.find('[name=wo17-step1]:checked').val();

                this.path = [answerGiven];

                if(answerGiven == 1) {
                    $([
                        '[data-step=measurements-help-recess]',
                        '[data-step=measurements-help-add-measurements]'
                    ].join(',')).addClass('wo17-step--hidden');

                    $([
                        '[data-step=enter-measurements]',
                        '[data-step=order]'
                    ].join(',')).removeClass('wo17-step--hidden');

                    $('[data-step=enter-measurements]').find('.wo17-step__title-prefix').text('2.');
                    $('[data-step=order]').find('.wo17-step__title-prefix').text('3.');

                    this.updateSummary('Yes I have measured up');

                    helpers.sendEvent('answer-given=has-measured-up');

                    this.goToStep('enter-measurements');
                } else if(answerGiven == 2) {
                    $([
                        '[data-step=measurements-help-recess]',
                        '[data-step=measurements-help-add-measurements]'
                    ].join(',')).removeClass('wo17-step--hidden');

                    $([
                        '[data-step=enter-measurements]',
                        '[data-step=order]'
                    ].join(',')).addClass('wo17-step--hidden');

                    $('[data-step=enter-measurements]').find('.wo17-step__title-prefix').text('4.');
                    $('[data-step=order]').find('.wo17-step__title-prefix').text('5.');

                    this.updateSummary('No, show me');

                    helpers.sendEvent('answer-given=needs-help-measuring-up');

                    this.goToStep('measurements-help-recess');
                }

                return true;
            case 'enter-measurements':
                // ----------------------------------------------------------------
                // Question 2a
                // ----------------------------------------------------------------
                let widthGiven = $('[name=wo17-width]').val()
                    , widthGivenFraction = $('[name=wo17-width-inches-fraction]').val() || 0
                    , dropGiven = $('[name=wo17-drop]').val()
                    , dropGivenFraction = $('[name=wo17-drop-inches-fraction]').val() || 0;

                let recessGiven = $('[name=wo17-recess]:checked').val();
                recessGiven = recessGiven.charAt(0).toUpperCase() + recessGiven.substring(1);

                widthGiven = parseFloat(widthGiven);
                dropGiven = parseFloat(dropGiven);

                if(widthGivenFraction) {
                    widthGiven += parseFloat(widthGivenFraction);
                }
                if(dropGivenFraction) {
                    dropGiven += parseFloat(dropGivenFraction);
                }

                this.updateSummary(`Width: ${widthGiven} ${this.unit}`);
                this.updateSummary(`Drop: ${dropGiven} ${this.unit}`);
                this.updateSummary(`Measurement: ${recessGiven}`);

                this.currentStep.find('.wo17-step__surefit').show();

                this.goToStep('order');

                return true;
            case 'measurements-help-recess':
                // ----------------------------------------------------------------
                // Question 2b
                // ----------------------------------------------------------------
                answerGiven = this.currentStep.find('[name=wo17-help-recess]:checked').val();

                switch(answerGiven) {
                    case 'recess':
                        this.updateSummary('Recess');
                        break;
                    case 'exact':
                        this.updateSummary('Exact');
                        break;
                }
                
                this.goToStep('measurements-help-add-measurements');

                return true;
            case 'measurements-help-add-measurements':
                // ----------------------------------------------------------------
                // Question 3b
                // ----------------------------------------------------------------
                $([
                    '[data-step=enter-measurements]',
                    '[data-step=order]'
                ].join(',')).removeClass('wo17-step--hidden');

                this.updateSummary('Add Measurements');

                this.goToStep('enter-measurements');

                return true;
            case 'order': 
                return  true;
        }
    }

    /**
     * Helper go to question given identifier
     */
    goToStep(step) {
        const targetStep = $('.wo17-step[data-step=' + step + ']');

        // Unmark complete steps
        $('.wo17-step').removeClass('wo17-step--complete');
        targetStep.prevAll('.wo17-step').addClass('wo17-step--complete');

        // Clear summaries
        targetStep.find('.wo17-step__summary-tick').remove();
        targetStep.find('.wo17-step__surefit').hide();
        targetStep.nextAll('.wo17-step').each(function() {
            $(this).find('.wo17-step__summary-tick').remove();
            $(this).find('.wo17-step__surefit').hide();
        });
        
        // Animation
        helpers.cssAnimation(targetStep.find('.wo17-step__content'), 'wo17-anim-translateOutThenIn');
        helpers.cssAnimation(targetStep.find('.wo17-step__title'), 'wo17-anim-translateOutThenInReverse');

        // Mark all steps inactive
        $('.wo17-step').addClass('wo17-step--inactive');
        targetStep.removeClass('wo17-step--inactive');

        // Scroll
        helpers.scrollToFirstInstanceOf($('.wo17-steps'));

        this.currentStep = targetStep;
    }
}

export default Accordion;
