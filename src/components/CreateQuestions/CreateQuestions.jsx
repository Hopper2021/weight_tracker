import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function CreateQuestions () {
    const dispatch = useDispatch()
    const history = useHistory()
    const newSurveyId = useSelector(store => store.survey.newSurvey.id)
    const [newQuestion, setNewQuestion] = useState({
        questionText: '', surveyId: 0
    })

    useEffect(() => {
        setSurveyId()
        console.log( 'new question in create questions useEffect - ', newQuestion )
    }, [newSurveyId, setSurveyId, newQuestion.surveyId])

    const setSurveyId = () => {
        console.log( 'new question before setSurveyId - ', newQuestion )
        setNewQuestion({ surveyId: newSurveyId })
        console.log('new survey id from useEffect - ', newSurveyId)
        console.log( 'new question in create questions setSurveyId - ', newQuestion )
    }

    const dispatchReset = () => {
        dispatch({ type: 'RESET_ANSWERS' })
    }

    const dispatchFetch = () => {
        console.log('In dispatch fetch questions')
        dispatch({ type: 'FETCH_QUESTIONS', payload: newSurveyId })
    }

    const addQuestion = (event) => {
        event.preventDefault();
        console.log('new question in create question NEXT - ', newQuestion )
        setSurveyId()
        console.log('setsurveyId() - ', newQuestion )
        dispatchReset()
        dispatch({ type: 'POST_QUESTION', payload: newQuestion })
        dispatchFetch()
        history.push('/create/answers')
    }

    return (
        <div className="container">
            <div>
                <strong className="create-question-header">
                    Create Question
                </strong>
                <form className="create-question-form" 
                onSubmit={addQuestion}>
                    <TextField required className="create-question-text"
                        sx={{ m: 3 }}
                        label="Question Text"
                        value={newQuestion.questionText}
                        onChange={(event) => setNewQuestion({...newQuestion, questionText: event.target.value})}
                    />
                    <br/>
                    <Button type="submit" className="Button"
                    variant="contained"
                    > 
                        Next
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateQuestions;