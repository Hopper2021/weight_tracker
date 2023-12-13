import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function CreateAnswers () {
    const dispatch = useDispatch();
    const history = useHistory();
    const newSurveyId = useSelector(store => store.survey.newSurvey.id)
    const questionList = useSelector(store => store.question.questionList)
    const questionId = useSelector(store => store.question.questionList[0]?.id)
    const question = useSelector(store => store.question.questionList[0])
    const answerList = useSelector(store => store.answer.answerList)
    const [answerText, setAnswerText] = useState('')

    useEffect(() => {
        dispatch({ type: 'FETCH_QUESTIONS', payload: newSurveyId })
        console.log('survey id in create Answers: ', newSurveyId )
    }, [])

    const dispatchPost = () => {
        dispatch({ type: 'POST_ANSWER', payload: { answerText, newSurveyId, questionId } })
        dispatch({ type: 'POST_VOTE', payload: { answerText, newSurveyId, questionId }})
    }

    const addAnswer = () => {
        console.log('answer text - ', answerText )
        console.log('survey id - ', newSurveyId )
        console.log('question id - ', question )
        setAnswerText('')
        dispatchPost()
        console.log('answer text in ADD ANSWER - ', answerText)
    }

    const addNewQuestion = (event) => {
        console.log('answer list in ADD NEW QUESTION - ', answerList)
        history.push('/create/questions')
    }

    const submitSurvey = () => {
        console.log('props survey.id in survey item - ', newSurveyId)
        history.push(`/details/${newSurveyId}`)
    }

    return (
        <div className="container">
            <div>
                <strong>{questionList[0]?.question_text}</strong>
                <br />
                <br />
                {answerList?.map((answer, index) => (
                    <div key={index}>{index + 1}: {answer.answer_text}</div>
                ))}
                    <TextField required text="text" className="create-answer-text"
                        sx={{ m: 3 }}
                        label={`Answer`}
                        value={answerText}
                        onChange={(event) => setAnswerText(event.target.value)}
                    />
                <Button onClick={addAnswer}
                    className="Button"
                    variant="contained"
                > 
                    Add Answer
                </Button>
                <br />
                <br />
                <Button className="Button" variant="contained" onClick={addNewQuestion}>
                    Add New Question
                </Button>
                <br />
                <br />
                <Button className="Button" variant="contained" onClick={submitSurvey}>
                    Submit Survey
                </Button>
            </div>
        </div>
    )
}

export default CreateAnswers;