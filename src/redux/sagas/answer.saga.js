import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postAnswer(action) {
    try {
        console.log('new answer in POST answer saga - ', action.payload)
        const answer = action.payload;
        yield axios.post( '/api/answer/new', answer )
        yield put({ type: 'FETCH_ANSWERS', payload: answer.questionId })
    } catch (error) {
        console.log('Error in POST new answers - ', error);
        alert('Something went wrong! Unable to create answers.')
    }
}

function* fetchAnswers(action) {
    try {
        const question = action.payload;
        console.log('question id in FETCH answers saga - ', question )
        const answerList = yield axios.get( `/api/answer/get/${question}` )
        console.log('response - ', answerList.data);
        yield put({ type: 'SET_ANSWERS', payload: answerList.data })
    } catch (error) {
        console.log('Survey answers GET failed - ', error);
        alert('Something went wrong! Unable to fetch questions.')
    }
}

function* answerSaga() {
    yield takeLatest( 'POST_ANSWER', postAnswer )
    yield takeLatest( 'FETCH_ANSWERS', fetchAnswers )
}

export default answerSaga;