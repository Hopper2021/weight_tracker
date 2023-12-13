import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postMigs(action) {
    try {
        console.log('new member in POST MIGS saga - ', action.payload)
        const member = action.payload;
        yield axios.post( '/api/migs/create', member )
        yield put({ type: 'FETCH_MIGS' })
    } catch (error) {
        console.log('Error in POST new MIGS - ', error);
        alert('Something went wrong! Unable to create member.')
    }
}

function* fetchMigs() {
    try {
        const allMigs = yield axios.get ( 'api/migs/all' );
        yield put({ type: 'SET_MIGS', payload: allMigs.data })
        console.log('Get ALL MIGS data - ', allMigs.data )
    } catch (error) {
        console.log('Error in GET ALL MIGS - ', error)
        alert('Unable to retreive all MIGS')
    }
}

function* deleteMigs(action) {
    try {
        const migsId = action.payload;
        console.log('migs id in delete survey saga - ', migsId);
        yield axios.delete( `/api/migs/delete/${migsId}` );
        yield put({ type: 'FETCH_MIGS' });
    } catch (error) {
        console.log('Error in DELETE migs - ', error);
        alert('Something went wrong! Unable to delete migs.');
    }
}

function* updateMigs(action) {
    try {
        console.log('member in Update MIGS saga - ', action.payload)
        const member = action.payload;
        const memberId = member.id
        yield axios.put( `/api/migs/update/${memberId}`, member )
        yield put({ type: 'FETCH_MIGS' })
    } catch (error) {
        console.log('Error in Update MIGS - ', error);
        alert('Something went wrong! Unable to update member.')
    }
}

function* migsSaga() {
    yield takeLatest( 'POST_MIGS', postMigs )
    yield takeLatest( 'FETCH_MIGS', fetchMigs )
    yield takeLatest( 'DELETE_MIGS', deleteMigs )
    yield takeLatest( 'UPDATE_MIGS', updateMigs )
}

export default migsSaga;