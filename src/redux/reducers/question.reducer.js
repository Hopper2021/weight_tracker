import { combineReducers } from 'redux';

const defaultQuestionList = []

const questionList = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_QUESTIONS':
            return action.payload;
        case 'RESET_ANSWERS':
            return defaultQuestionList;
        default:
            return state;
    }
}

export default combineReducers({
    questionList,
});