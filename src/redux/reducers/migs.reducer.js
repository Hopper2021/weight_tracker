import { combineReducers } from 'redux';

const newMigs = (state = {}, action) => {
    switch ( action.type ) {
        case 'POST_MIGS':
            return action.payload;
        default:
            return state;
    }    
}

const migsList = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_MIGS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    newMigs,
    migsList,
});