import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postQuestion(action) {
    try {
        console.log('new question in POST question saga - ', action.payload)
        const question = action.payload;
        yield axios.post( '/api/question/create', question )
    } catch (error) {
        console.log('Error in POST new question - ', error);
        alert('Something went wrong! Unable to create question.')
    }
}

function* fetchQuestions(action) {
    try {
        const surveyId = action.payload;
        console.log('survey id in FETCH questions saga - ', surveyId )
        const question = yield axios.get( `/api/question/get/${surveyId}` )
        console.log('response - ', question.data);
        yield put({ type: 'SET_QUESTIONS', payload: question.data })
    } catch (error) {
        console.log('Survey questions GET failed - ', error);
        alert('Something went wrong! Unable to fetch questions.')
    }
}

function* questionSaga() {
    yield takeLatest( 'POST_QUESTION', postQuestion )
    yield takeLatest( 'FETCH_QUESTIONS', fetchQuestions )
}

export default questionSaga;