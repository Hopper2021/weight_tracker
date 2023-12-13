import { combineReducers } from 'redux';

const newSurvey = (state = {}, action) => {
    switch ( action.type ) {
        case 'POST_NEW_SURVEY':
            return action.payload;
        case 'SET_NEW_SURVEY':
            return action.payload;
        default:
            return state;
    }    
}

const allSurveys = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_ALL_SURVEYS':
            return action.payload;
        default:
            return state;
    }
}

const selectedSurvey = (state = {}, action) => {
    switch ( action.type ) {
        case 'SET_SURVEY_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

const selectedQuestions = (state=[], action) => {
    switch ( action.type ) {
        case 'SET_SURVEY_QUESTIONS':
            return action.payload;
        default:
            return state;
    }
}

const selectedAnswers = (state=[], action) => {
    switch ( action.type ) {
        case 'SET_SURVEY_ANSWERS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    newSurvey,
    allSurveys,
    selectedSurvey,
    selectedAnswers,
    selectedQuestions,
});