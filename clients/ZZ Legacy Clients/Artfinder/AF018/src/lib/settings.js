const isReturning = window?.convert?.getUserData()?.browsing?.returning;
const userType = isReturning ? 'returning' : 'new';

export default {
    widgetID: '60c7694938d52917a2bd170e',
    userType
}