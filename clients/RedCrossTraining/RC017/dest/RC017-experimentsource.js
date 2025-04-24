// ------------------------------------------
// IMPORTANT!!!!
// _____________________________________
//
// DO NOT EDIT THIS TEST DIRECTLY IN VWO
// _____________________________________
//
// Modify the source in the ab-test-sandbox repo
// since it uses ES6 and is easier to work with there.
// ------------------------------------------
const $ = window.jQuery;

/**
 * General Settings
 */
const settings = {
    'preloader': 'data:image/gif;base64,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',
    'text_sidebar': 'Need help choosing a course?',
    'text_instructions': 'Learn first aid skills you can confidently use in an emergency situation, either at work or in your day-to-day life',
    'text_thankyou': '<strong>Thank you</strong> <br>Loading courses...'
};

/**
 * Map sequence of answers to end URL
 */
const answersMap = {
    'personal/adults': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-cover-first-aid-for/Adults-result.aspx',
    'personal/babies-and-children': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-cover-first-aid-for/Baby-and-child-result.aspx',
    'personal/both': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-cover-first-aid-for/Both-result.aspx',
    'work/yes/children_only': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/Paediatric%20result.aspx',
    'work/yes/adults_and_children/1_to_24/0': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-s/6-need-training-no-risk/Paediatric%20and%20Appointed%20result.aspx',
    'work/yes/adults_and_children/1_to_24/1+': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-s/6-need-training-risk-a/Paediatric%20and%20Emergency%20result.aspx',
    'work/yes/adults_and_children/25_to_49/0': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-l/6-need-tr-no-r/Pa-Efa.aspx',
    'work/yes/adults_and_children/25_to_49/1+': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-work-risk-l/6-need-tr-r-b/Pa-Faw.aspx',
    'work/yes/adults_and_children/50_plus': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-need-to-know/4-number-employees/5-need-tr/Pa-Faw.aspx',
    'work/no/low_risk/1_to_24/0': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-s/6-need-tr-nr/Appointed-result.aspx',
    'work/no/low_risk/1_to_24/1+': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-s/6-need-tr-r-b/FAW-result.aspx',
    'work/no/low_risk/25_to_49/0': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-l/6-need-tr-nr/EFA-result.aspx',
    'work/no/low_risk/25_to_49/1+': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-work-risk-l/6-need-tr-r-b/FAW-result.aspx',
    'work/no/low_risk/50_plus': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-lr/5-need-tr/Faw.aspx',
    'work/no/high_risk/1_to_4/0': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-s/6-need-tr-nr/Appointed-result.aspx',
    'work/no/high_risk/1_to_4/1+': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-s/6-need-tr-r-b/FAW-result.aspx',
    'work/no/high_risk/5_to_49/0': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-l/6-need-tr-nr/EFA-result.aspx',
    'work/no/high_risk/5_to_49/1+': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-work-risk-l/6-need-tr-r-b/FAW-result.aspx',
    'work/no/high_risk/50_plus': 
        '/Courses/find-the-right-first-aid-course/1-personal-or-work/2-responsible-for-children/3-workplace-risk/4-num-employees-hr/5-need-tr/Faw.aspx',
}

// UC Library - Poller -- @version 0.2.2
var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

var trackerName;

function sendEvent(action, label, nonInteractionValue) {
    var category = 'RC17---CourseFinder';
    label = label || '';
    nonInteractionValue = nonInteractionValue || true;
    var fire = function(tracker) {
        window.ga(tracker + '.send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
    };

    if (trackerName) {
        fire(trackerName);
    } else {
        UC.poller([
            function() { return window.ga.getAll; }
        ], function() {
            trackerName = window.ga.getAll()[0].get('name');
            fire(trackerName);
        });
    }
}

/**
 * Experiment context - question container
 *
 * Has 'state' corresponding to active question
 */
class Context {
    /**
     * Constructor
     *
     * @param {Question} state    The Question state
     */
    constructor(state) {
        this.recordedAnswers = [];
        this.state = state;

        this.loadUi();
    }

    /**
     * Helper create the user interface for this test and render the current state
     */
    loadUi() {
        $('body').addClass('rc017');

        let lightbox = this.lightbox = $(`
            <div class="rc17-lightbox">
                <a title="Close" class="rc17-lightbox__close">&#x2715;</a>
                <div class="rc17-lightbox__sidebar">
                    <h2 class="rc17-lightbox__title"><img 
                        src="//www.redcrossfirstaidtraining.co.uk/images/svg/logo-redcross.svg" /></h2>
                    <p class="rc17-lightbox__instructions">
                        ${settings.text_instructions}
                    </p>
                    <div class="rc17-steps-tracker"></div>
                </div>
                <div class="rc17-lightbox__main">
                </div>
            </div>
        `);

        let lightboxInit = $(`
            <div class="rc17-lightbox-init rc17-lightbox-init--active">
                <i class="fa fa-question-circle"></i>
                ${settings.text_sidebar}
            </div>
        `);

        let lightboxBackground = $('<div class="rc17-lightbox-page-overlay">');

        $('body').append(lightboxBackground);
        $('body').append(lightbox);
        $('body').append(lightboxInit);

        lightboxInit.on('click', function() {
            showLightbox();
        });

        $('.rc17-lightbox').on('click', '.rc17-lightbox__close', function() {
            hideLightbox();
        });

        $(document).on('keydown', function(e) {
            var keyCode = e.keyCode || e.which;
            if(keyCode == 27) {
                hideLightbox();
            }
        });

        var that = this;
        $('.rc17-steps-tracker').on('click', '.rc17-steps-tracker__step .rc17-step-edit', function() {
            var id = $(this).parents('.rc17-steps-tracker__step').attr('data-id');
            sendEvent('went-back-to-arbitrary-question', parseInt(id) + 1);
            that.goToQuestion(id);
        });

        function showLightbox() {
            lightbox.addClass('rc17-lightbox--active');
            $('body').addClass('rc17-lightbox-active');
            lightboxInit.removeClass('rc17-lightbox-init--active');
            lightboxBackground.addClass('rc17-lightbox-page-overlay--active');

            sendEvent('did-show-lightbox');
        }

        function hideLightbox() {
            lightbox.removeClass('rc17-lightbox--active');
            $('body').removeClass('rc17-lightbox-active');
            lightboxInit.addClass('rc17-lightbox-init--active');
            lightboxBackground.removeClass('rc17-lightbox-page-overlay--active');

            sendEvent('did-hide-lightbox', that.state.id);
        }

        this.renderState();
    }

    /**
     * Update the steps tracker based on recorded answers
     */
    updateStepsTracker() {
        $('.rc17-steps-tracker').empty();

        this.recordedAnswers.forEach((item, index) => {
            let title = item.state.title
                , stepNumber = index + 1
                , stateAnswers = item.state.getAvailableAnswers()
                , answerGiven = item.answer;


            var friendlyAnswer = '';
            if(item.state.answersType === 'checkbox') {
                friendlyAnswer = item.answer + ' specified';
            } else if(stateAnswers) {
                stateAnswers.answers.forEach((item) => {
                    if(item.value === answerGiven) {
                        friendlyAnswer = item.friendlyName;
                    }
                });
            }

            if(typeof item.state.getStepsTitle != 'undefined') {
                $('.rc17-steps-tracker').append(`
                    <div class="rc17-steps-tracker__step" data-id="${index}">
                        <span class="rc17-steps-tracker__title">
                            <em>${stepNumber}.</em>
                            <strong>${item.state.getStepsTitle(answerGiven)}</strong>
                        </span>
                        <a title="Edit" class="rc17-step-edit"><i class="fa fa-pencil"></i></a>
                        <i class="fa fa-check"></i>
                    </div>    
                `);
            } else {
                $('.rc17-steps-tracker').append(`
                    <div class="rc17-steps-tracker__step" data-id="${index}">
                        <span class="rc17-steps-tracker__title"><em>${stepNumber}.</em><strong>${title}</strong></span>
                        <span class="rc17-steps-tracker__answer">${friendlyAnswer}</span>
                        <a title="Edit" class="rc17-step-edit"><i class="fa fa-pencil"></i></a>
                        <i class="fa fa-check"></i>
                    </div>    
                `);
            }
        });
    }

    /**
     * All answers given, match given answers to answers map and redirect to resultant URL
     *
     * @param {string} urlAppend
     */
    redirectComplete(urlAppend) {
        const key = this.recordedAnswers.map((item) => {
            return item.answer;
        }).join('/');

        if((answersMap || {})[key]) {
            $('.rc17-lightbox').html(`
                <div class="rc17-completed">
                    <p class="rc17-completed__text">${settings.text_thankyou}</p>
                    <p><img src="${settings.preloader}"></p>
                </div>
            `);

            setTimeout(() => {
                var target = answersMap[key];
                if(urlAppend) {
                    target = (answersMap[key] + urlAppend);

                    sendEvent('did-complete', target);

                    window.location = target;
                } else {
                    sendEvent('did-complete', target);

                    window.location = target;
                }
            }, 1000);
        } else {
            throw "No URL matches the given answers map key. Key is: " + key;
        }
    }

    /**
     * Record an answer given in this context
     */
    recordAnswer(answer) {
        this.recordedAnswers.push({
            state: this.state,
            answer: answer
        });
    }

    /**
     * Validate given state and if valid, move onto the next question and render given state
     */
    nextQuestion() {
        if(this.state.validationRequired && !this.state.validate()) {
            return;
        }
        if(this.state.getNextQuestion(this)) {
            this.renderState();
        }
    }

    /**
     * Go back to previous question
     */
    previousQuestion() {
        if(this.recordedAnswers.length === 0) {
            throw "No previous questions exist.";
        }
        this.goToQuestion(this.recordedAnswers.length - 1);
    }

    /**
     * Draw the state and associated steps
     */
    renderState() {
        this.state.draw();

        $('.rc17-question--active').append('<div class="rc17-buttons-wrapper"></div>');

        if(this.recordedAnswers.length > 0) {
            $('.rc17-question--active .rc17-buttons-wrapper').append(`
                <input class="rc17-question__button rc17-question__back" type="submit" value="Back" />
            `);
        }
        $('.rc17-question--active .rc17-buttons-wrapper').append(`
            <input class="rc17-question__button rc17-question__submit" type="submit" value="Next" />
        `);

        const additionalText = this.state.getAdditionalText();
        if(additionalText) {
            $('.rc17-question--active').append('<div class="rc17-additional-text">' + additionalText + '</div>');

            $('.rc17-question--active').addClass('rc17-question--has-additional-text');
        }

        $('.rc17-question--active').append('<div class="rc17-invalid-message">Please select a valid answer</div>');

        this.updateStepsTracker();
    }

    /**
     * @param {int} id  Step number, 0-based index from answers given
     */
    goToQuestion(id) {
        let targetState = (this.recordedAnswers[id] || {}).state ? this.recordedAnswers[id].state : null;
        if(!targetState) {
            throw "State does not exist in goToQuestion";
        }

        for(let i = this.recordedAnswers.length; i > id; i--) {
            this.recordedAnswers.pop();
        }

        this.state = targetState;

        this.renderState();
    }
}

/**
 * Answer container - create answers groupings of different types (radio, checkbox, ...)
 */
class Answers {
    constructor() {
        this.groups = [];
    }

    addAnswers(type, name, answers) {
        switch(type) {
            case 'radio':
                this.groups.push({
                    type: 'radio',
                    name: name,
                    answers: answers
                });
                break;
            case 'checkbox':
                this.groups.push({
                    type: 'checkbox',
                    name: name,
                    answers: answers
                });
                break;
            default: 
                throw "Answers type msut be specified in addAnswers()";
        }

        return this;
    }

    getHtml() {
        let html = '';

        this.groups.forEach((item) => {
            html += '<div class="rc17-question__answers-group clearfix">';

            if(item.type == 'radio') {
                html += this.getRadioHtml(item.answers, item.name);
            } else if (item.type == 'checkbox') {
                html += this.getCheckboxHtml(item.answers, item.name);
            }

            html += '</div>';
        });

        return html;
    }

    getRadioHtml(answers, name) {
        let html = '<div class="rc17-question__answers rc17-question__answers--radio">';
        answers.forEach((item) => {
            html += `
                <label class="rc17-question__answer">
                    <input class="rc17-question__answer-radio" 
                        type="radio" 
                        name="${name}" 
                        value="${item.value}" />
                    ${item.friendlyName}
                </label>
            `;
        });
        html += '</div>';

        return html;
    }

    getCheckboxHtml(answers, name) {
        let html = '<div class="rc17-question__answers rc17-question__answers--checkbox">';
        answers.forEach((item) => {
            html += `
                <label class="rc17-question__answer clearfix">
                    <input class="rc17-question__answer-checkbox" 
                        type="checkbox" 
                        name="${name}" 
                        value="${item.value}" />
                    <span class="rc17-question__answer-text">
                    ${item.friendlyName}
                    </span>
                </label>
            `;
        });
        html += '</div>';

        return html;
    }
}

/**
 * Question class
 */
class Question {
    constructor(title, answersType, id, answers, validationRequired) {
        this.title = title;

        this.id = id;

        this.answers = [];

        this.answersType = answersType;
        
        if(validationRequired === undefined) {
            this.validationRequired = true;
        } else {
            this.validationRequired = validationRequired;
        }

        answers.forEach((item) => {
            this.answers.push( 
                (new Answers()).addAnswers(answersType, id, item)
            );
        });
    }

    getAvailableAnswers() {
        if((this.answers || {})[0]) {
            return this.answers[0]['groups'].length === 1 ? this.answers[0]['groups'][0] : this.answers[0]['groups'];
        }
        return [];
    }

    draw() {
        $('.rc17-question').remove();

        let template = `
            <form class="rc17-question rc17-question--active rc17-question--id-${this.id}">
                <h2>${this.title}</h2>
            </form>
        `;

         $('.rc17-lightbox__main').append(template);

         this.drawAnswers();
    }

    drawAnswers() {
        let answersHtml = '';

        this.answers.forEach(function(item) {
            answersHtml += item.getHtml();

        });

        $('.rc17-question--active').append(answersHtml);
    }

    /**
     * Get all answers given for a group of questions
     */
    getAnswersGiven() {
        let formAnswers = $('.rc17-question').serializeArray()
            , groupedAnswers = {};

        if(formAnswers.length === 0) {
            return false;
        }

        if(formAnswers.length === 1) {
            let name = formAnswers[0].name
                , value = formAnswers[0].value;

            groupedAnswers[name] = value;
        } else {
            formAnswers.forEach((item) => {
                let name = item.name
                    , value = item.value;

                if(!groupedAnswers[name]) {
                    groupedAnswers[name] = [];
                }
                groupedAnswers[name].push(value);
            });
        }

        return groupedAnswers;
    }

    /**
     * For a single question
     */
    getAnswer() {
        let answersGiven = this.getAnswersGiven() 
            , ans = answersGiven[this.id];

        return ans;
    }

    validate() {
        if(this.getAnswersGiven() !== false) {
            return true;
        } else {
            $('.rc17-question--active .rc17-invalid-message').addClass('rc17-invalid-message--active');

            return false;
        }
    }

    getNextQuestion(context) {}

    getAdditionalText() {}
}

/**
 * Question Additional Training
 */
class QuestionAdditionalTraining extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven(context)
            , ans = answersGiven[this.id];

        // Parse answers - question requires us to bind params to URL for final answer
        let urlAppend = '', answerString = '';
        if(Array.isArray(answersGiven)) {
            answerString = answersGiven.join(',');
        } else {
            answerString = ans;
        }

        if(answerString) {
            urlAppend = '?uc=' + answerString;
        }

        context.redirectComplete(urlAppend);

        return false;
    }

    getAdditionalText() {
        return `
            <p>If unsure, you may want to complete a 
            <a target="_blank" href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-legal-requirements.aspx#needs">needs assessment</a>
        `;
    }
}
let AdditionalTraining = new QuestionAdditionalTraining (
    'Do you need training in',
    'checkbox',
    'rc17_additional_training',
    [
        [
            {
                value: '7791e104-0335-47be-905c-83153ea754f6',
                friendlyName: 'How to use an automated external defibrillator'
            },
            {
                value: 'db01b7bf-c944-4c30-8de7-6d337a07d0a9',
                friendlyName: 'Fire safety (fire marshal training)'
            },
            {
                value: '2284dabb-b5e9-4534-bbe6-31d3aaa0a1b6',
                friendlyName: 'How to give oxygen'
            },
            {
                value: '7e9d0c92-d385-4e33-a1be-49028949d147',
                friendlyName: 'Moving and handling'
            },
        ]
    ],
    false
);

/**
 * Question Anyone at Risk Of
 */
class QuestionRiskConditions extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven(context)
            , ans = answersGiven[this.id];

        // Risk conditions only affect the outcome as: 0 chosen or 1 or more chosen
        let finalAnswer = '';
        if(!ans || ans.length === 0) {
            finalAnswer += '0';
        } else {
            finalAnswer += '1+';
        }

        context.recordAnswer(finalAnswer);

        context.state = AdditionalTraining;

        return true;
    }

    getStepsTitle(answer) {
        return answer == '0' ? 'No specific health or injury risks' : '1+ specific health or injury risks';
    }            

    getAdditionalText() {
        return `
            <p>If unsure, you may want to complete a 
            <a target="_blank" href="http://www.redcrossfirstaidtraining.co.uk/~/media/3A77703E101247C29B1417A9162A7548.pdf">needs assessment</a>
        `;
    }
}

let RiskConditions = new QuestionRiskConditions (
    'Is anyone at your workplace at risk of:',
    'checkbox',
    'rc17_risk_conditions',
    [
        [
            {
                value: 'bleeding',
                friendlyName: 'Bleeding'
            },
            {
                value: 'burns',
                friendlyName: 'Burns'
            },
            {
                value: 'electric_shock',
                friendlyName: 'Electric shock'
            },
            {
                value: 'angina',
                friendlyName: 'Angina'
            },
            {
                value: 'asthma',
                friendlyName: 'Asthma'
            },
            {
                value: 'broken_bones',
                friendlyName: 'Broken bones'
            },
            {
                value: 'head_injuries',
                friendlyName: 'Head injuries'
            },
            {
                value: 'heart_attack',
                friendlyName: 'Heart attack'
            },
            {
                value: 'heat_exhaustion',
                friendlyName: 'Heat exhaustion'
            },
            {
                value: 'heat_strokes',
                friendlyName: 'Heat strokes'
            },
            {
                value: 'hypothermia',
                friendlyName: 'Hypothermia'
            },
            {
                value: 'low_bloow_sugar',
                friendlyName: 'Low blood sugar'
            },
            {
                value: 'severe_allergic_reaction',
                friendlyName: 'Severe allergic reaction'
            },
            {
                value: 'spinal_injuries',
                friendlyName: 'Spinal injuries'
            } ,
            {
                value: 'sprains_and_strains',
                friendlyName: 'Sprains and strains'
            } ,
            {
                value: 'stroke',
                friendlyName: 'Stroke'
            }  
        ]
    ], 
    false
);

/**
 * Question: num employees 1-4,5-49,50+
 */
class QuestionNumEmployeesSmallerGroups extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven(context)
            , ans = answersGiven[this.id];

        context.recordAnswer(ans);

        if(ans === '1_to_4' || ans === '5_to_49') {
            context.state = RiskConditions;
        } else if(ans === '50_plus') {
            context.state = AdditionalTraining;
        } else {
            throw "Invalid answer given";
        }

        return true;
    }

    getStepsTitle(answer) {
        return answer.replace(/_/g, ' ', answer) + ' employees';
    }            
}
let NumEmployeesSmallerGroups = new QuestionNumEmployeesSmallerGroups (
    'How many people are there in your workplace?',
    'radio',
    'rc17_num_employees_smaller_groups',
    [
        [
            {
                value: '1_to_4',
                friendlyName: '1 to 4'
            },
            {
                value: '5_to_49',
                friendlyName: '5 to 49'
            },
            {
                value: '50_plus',
                friendlyName: '50+'
            } 
        ]
    ]
);

/**
 * Question: num employees 1-24,25-49,50+
 */
class QuestionNumEmployeesLargerGroups extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven(context)
            , ans = answersGiven[this.id];

        context.recordAnswer(ans);

        if(ans === '1_to_24' || ans === '25_to_49') {
            context.state = RiskConditions;
        } else if(ans === '50_plus') {
            context.state = AdditionalTraining;
        } else {
            throw "Invalid answer given";
        }

        return true;
    }

    getStepsTitle(answer) {
        return answer.replace(/_/g, ' ', answer) + ' employees';
    }            
}
let NumEmployeesLargerGroups = new QuestionNumEmployeesLargerGroups (
    'How many people are there in your workplace?',
    'radio',
    'rc17_num_employees_larger_groups',
    [
        [
            {
                value: '1_to_24',
                friendlyName: '1 to 24'
            },
            {
                value: '25_to_49',
                friendlyName: '25 to 49'
            },
            {
                value: '50_plus',
                friendlyName: '50+'
            } 
        ]
    ]
);

/**
 * Question: describe workplace as high or low risk
 */
class QuestionWorkplaceRisk extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven(context)
            , ans = answersGiven[this.id];

        context.recordAnswer(ans);

        if(ans === 'low_risk') {
            context.state = NumEmployeesLargerGroups;
        } else if(ans === 'high_risk') {
            context.state = NumEmployeesSmallerGroups;
        } else {
            throw "Invalid answer given";
        }

        return true;
    }

    getStepsTitle(answer) {
        if(answer == 'low_risk') {
            return 'Low risk workplace';
        } else {
            return 'High risk workplace';
        }
    }            
}
let WorkplaceRisk = new QuestionWorkplaceRisk(
    'Would you describe your workplace as:',
    'radio',
    'rc17_workplace_risk',
    [
        [
            {
                value: 'low_risk',
                friendlyName: 'Low risk e.g. small office, retail shop'
            },
            {
                value: 'high_risk',
                friendlyName: 'High risk e.g. construction, manufacturing'
            }
        ]
    ]
);

/**
 * Question: do you need to know first aid for adults and children
 */
class QuestionEmergencyFirstAidTarget extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven(context)
            , ans = answersGiven[this.id];

        context.recordAnswer(ans);

        if(ans === 'adults_and_children') {
            context.state = NumEmployeesLargerGroups;
            return true;
        } else if(ans === 'children_only') {
            context.redirectComplete();
            return false;
        } else {
            throw "Invalid answer given";
        }
    }
    
    getStepsTitle(answer) {
        if(answer == 'adults_and_children') {
            return 'First aid for adults and children';
        } else {
            return 'First aid for children';
        }
    }            
}
let EmergencyFirstAidTarget = new QuestionEmergencyFirstAidTarget(
    'In a first aid emergency, would you need to know first aid for adults as well as children?',
    'radio',
    'rc17_emergency_first_aid_target',
    [
        [
            {
                value: 'adults_and_children',
                friendlyName: 'Adults and children'
            },
            {
                value: 'children_only',
                friendlyName: 'Children only'
            }
        ]
    ]
);

/**
 * Question: Do you have responsibility for children?
 */
class QuestionChildrenResponsibility extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven(context)
            , ans = answersGiven[this.id];

        context.recordAnswer(ans);

        if(ans === 'yes') {
            context.state = EmergencyFirstAidTarget;
        } else if(ans === 'no') {
            context.state = WorkplaceRisk;
        } else {
            throw "Invalid answer given";
        }

        return true;
    }
    
    getStepsTitle(answer) {
        if(answer == 'yes') {
            return 'Responsible for children';
        } else {
            return 'Not responsible for children';
        }
    }            
}
let ChildrenResponsibility = new QuestionChildrenResponsibility(
    'At work, are you / your colleagues ever responsible for looking after children?',
    'radio',
    'rc17_children_responsibility',
    [
        [
            {
                value: 'yes',
                friendlyName: 'Yes'
            },
            {
                value: 'no',
                friendlyName: 'No'
            }
        ]
    ]
);

/**
 * Question: Who For
 */
class QuestionWhoFor extends Question {
    getNextQuestion(context) {
        let answersGiven = this.getAnswersGiven()
            , ans = answersGiven[this.id];

        context.recordAnswer(ans);

        context.redirectComplete();

        return false;
    }               
    
    getStepsTitle(answer) {
        return answer;
    }            
}
let WhoFor = new QuestionWhoFor(
    'Specifically, I want first aid for',
    'radio', 
    'rc17_who_for', 
    [
        [
            {
                value: 'adults',
                friendlyName: 'Adults'
            },
            {
                value: 'babies-and-children',
                friendlyName: 'Babies and children'
            },
            {
                value: 'both',
                friendlyName: 'Both'
            }
        ]
    ]
);

/**
 * Question: course type
 */
class QuestionCourseType extends Question {
    getNextQuestion(context) {
        let ans = this.getAnswer();

        context.recordAnswer(ans);

        if(ans === 'personal') {
            context.state = WhoFor;
        } else if(ans === 'work') {
            context.state = ChildrenResponsibility;
        } else {
            throw "Invalid answer given";
        }

        return true;
    }

    getStepsTitle(answer) {
        if(answer === 'personal') {
            return 'Personal reasons';
        } else {
            return 'Work reasons';
        }
    }           
}
let CourseType = new QuestionCourseType(
    'I want a course for',
    'radio',
    'rc17_course_type',
    [
        [
            {
                value: 'personal',
                friendlyName: 'Personal reasons, to use in my everyday life'
            },
            {
                value: 'work',
                friendlyName: 'Professional reasons, to use at my workplace'
            }
        ]   
    ]
);

// -----------------------------------------------
// Full story integration
// -----------------------------------------------
UC.poller([
    function() {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
    }
], function () {
    window.FS.setUserVars({
        experiment_str: 'RC017',
        variation_str: 'Variation 1'
    });
}, { multiplier: 1.2, timeout: 0 });

// -----------------------------------------------
// Create context and event listening
// -----------------------------------------------
UC.poller([
    function() {
        return !!window.ga;
    }
], function() {
    let c = new Context(CourseType);

    $('.rc17-lightbox').on('click', '.rc17-question__button', function(e) {
        e.preventDefault();

        if($(this).hasClass('rc17-question__back')) {
            sendEvent('clicked-back-to-previous-question');
            c.previousQuestion();
        } else {
            c.nextQuestion();
        }
    });

    console.log('alive');

    // -----------------------------------------------
    // Remove any js-radio classes which mess 
    // with the dislay of radio inputs
    // -----------------------------------------------
    UC.poller([
        '.rc17-lightbox .js-radio'
    ], function() {
        $('.rc17-lightbox .js-radio').removeClass('js-radio');
    });
});
