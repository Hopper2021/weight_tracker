import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postNewSurvey(action) {
    try {
        const survey = action.payload;
        console.log('Survey in postNewSurvey saga - ', survey );
        
        yield axios.post( '/api/survey/create', survey )
        yield put({ type: 'FETCH_NEW_SURVEY' })
    } catch (error) {
        console.log('Error in POST new survey - ', error);
        alert('Something went wrong! Unable to create survey.')
    }
}

function* fetchNewSurvey() {
    try {
        const newestSurvey = yield axios.get( 'api/survey/new' );
        yield put({ type: 'SET_NEW_SURVEY', payload: newestSurvey.data })
        console.log('Newest Survey data - ', newestSurvey.data);
    } catch (error) {
        console.log('Error in GET new survey - ', error);
        alert('Something went wrong! Unable to fetch new survey.')
    }
}

function* fetchAllSurveys() {
    try {
        const allSurveys = yield axios.get ( 'api/survey/all' );
        yield put({ type: 'SET_ALL_SURVEYS', payload: allSurveys.data })
        console.log('Get ALL Surveys data - ', allSurveys.data )
    } catch (error) {
        console.log('Error in GET ALL surveys - ', error)
        alert('Unable to retreive all surveys')
    }
}

function* fetchSurveyDetails(action) {
    try {
        const surveyId = action.payload;
        console.log('survey id in saga - ', surveyId)
        const surveyDetails = yield axios.get( `/api/survey/details/${surveyId}` )
        console.log('response - ', surveyDetails);
        yield put({ type: 'SET_SURVEY_DETAILS', payload: surveyDetails.data })
    } catch (error) {
        console.log('Survey details GET failed - ', error);
        alert('Something went wrong! Unable to get survey details.')
    }
}

function* fetchSurveyQuestions(action) {
    try {
        const surveyId = action.payload;
        console.log('survey id in saga - ', surveyId)
        const questionDetails = yield axios.get( `/api/survey/details/questions/${surveyId}` )
        console.log('response - ', questionDetails);
        yield put({ type: 'SET_SURVEY_QUESTIONS', payload: questionDetails.data })
    } catch (error) {
        console.log('Survey questions GET failed - ', error);
        alert('Something went wrong! Unable to get survey questions.')
    }
}

function* fetchSurveyAnswers(action) {
    try {
        const surveyId = action.payload;
        console.log('survey id in saga - ', surveyId)
        const answerDetails = yield axios.get( `/api/survey/details/answers/${surveyId}` )
        console.log('response - ', answerDetails);
        yield put({ type: 'SET_SURVEY_ANSWERS', payload: answerDetails.data })
    } catch (error) {
        console.log('Survey answers GET failed - ', error);
        alert('Something went wrong! Unable to get survey answers.')
    }
}

function* deleteSurvey(action) {
    try {
        const surveyId = action.payload;
        console.log('survey id in delete survey saga - ', surveyId);
        yield axios.delete( `/api/survey/delete/${surveyId}` );
        yield put({ type: 'FETCH_ALL_SURVEYS' });
    } catch (error) {
        console.log('Error in DELETE survey - ', error);
        alert('Something went wrong! Unable to delete survey.');
    }
}

function* surveySaga() {
    yield takeLatest( 'DELETE_SURVEY', deleteSurvey )
    yield takeLatest( 'POST_NEW_SURVEY', postNewSurvey )
    yield takeLatest( 'FETCH_NEW_SURVEY', fetchNewSurvey )
    yield takeLatest( 'FETCH_ALL_SURVEYS', fetchAllSurveys )
    yield takeLatest( 'FETCH_SURVEY_DETAILS', fetchSurveyDetails )
    yield takeLatest( 'FETCH_SURVEY_ANSWERS', fetchSurveyAnswers )
    yield takeLatest( 'FETCH_SURVEY_QUESTIONS', fetchSurveyQuestions )
}

export default surveySaga;