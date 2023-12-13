import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postVote(action) {
    try {
        console.log('new vote in POST vote saga - ', action.payload)
        const vote = action.payload;
        yield axios.put( '/api/vote/update', vote )
    } catch (error) {
        console.log('Error in POST new vote - ', error);
        alert('Something went wrong! Unable to create vote.')
    }
}

function* fetchVotes(action) {
    try {
        const vote = action.payload;
        console.log('vote id in FETCH votes saga - ', vote )
        const voteList = yield axios.get( `/api/vote/get/${vote}` )
        console.log('response - ', voteList.data);
        yield put({ type: 'SET_VOTES', payload: voteList.data })
    } catch (error) {
        console.log('Votes GET failed - ', error);
        alert('Something went wrong! Unable to fetch votes.')
    }
}

function* voteSaga() {
    yield takeLatest( 'POST_VOTE', postVote )
    yield takeLatest( 'FETCH_VOTES', fetchVotes )
}

export default voteSaga;