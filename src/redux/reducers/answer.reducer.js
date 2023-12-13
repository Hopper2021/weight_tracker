import { combineReducers } from 'redux';

const defaultAnswerList = []

const answerList = (state = [], action) => {
    switch ( action.type ) {
        case 'ADD_ANSWER':
            return action.payload;
        case 'SET_ANSWERS':
            return action.payload;
        case 'RESET_ANSWERS':
            return defaultAnswerList;
        default:
            return state;
    }    
}

export default combineReducers({
    answerList,
});