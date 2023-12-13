import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Typography,
    Button,
  } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function CreateVote () {
    const dispatch = useDispatch();
    const history = useHistory();
    const allParams = useParams();
    const surveyId = allParams.id;
    const survey = useSelector(store => store.survey.selectedSurvey)
    const answers = useSelector(store => store.survey.selectedAnswers)
    const questions = useSelector(store => store.survey.selectedQuestions)
    const [count, setCount] = useState(0)
    const [question, setQuestion] = useState({})
    const [newVote, setNewVote] = useState({
        surveyId: 0, questionId: 0, answerText: ''
    })
    console.log('new vote after radio change: ', newVote)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [changeButtonText, setChangeButtonText] = useState(false)
    let onlyAnswerText = []

    useEffect(() => {
        dispatch({ type: 'FETCH_SURVEY_QUESTIONS', payload: surveyId })
        dispatch({ type: 'FETCH_SURVEY_ANSWERS', payload: survey.id })
        answerFilter(question)
        setDisableSubmit(false)
        setQuestion(questions[0])
    }, [setQuestion])

    const answerFilter = (question) => {
        const filteredAnswers = answers.filter(function(answer) {
          if (answer.question_id === question.id) {
            return answer.text
          }
        })
        filteredAnswers.forEach( answer => onlyAnswerText.push(answer.text))
        return onlyAnswerText
      }

    const moveToNext = () => {
        let lastQuestion = questions.length - 2
        if (changeButtonText && disableSubmit) {
            history.push('/submission')
            console.log('Last question, move to final page')
            return
        }
        if (disableSubmit == false) {
            console.log('Please Submit a Response')
            // Show error snackbar (Just an X to get rid of snackbar?)
            return
        }
        if (count <= questions.length) {
            setCount(count + 1)
            setQuestion(questions[count + 1])
        }
        console.log(count, lastQuestion)
        if (count === lastQuestion) {
            setChangeButtonText(true)
            console.log('Change button text!')
        }
        setDisableSubmit(false)
    }

    const handleChange = (event) => {
        setNewVote({ surveyId: survey.id, questionId: question.id, answerText: event.target.value })
    }

    const postVote = () => {
        // display snackbar/modal, 
        // "Are you sure? Display Vote text choice, Cancel or Submit"
        // if (radio button is selected and vote button is still enabled) then { ask "Are you sure you want to vote: {answerText}?" }
        if (newVote.surveyId === 0) {
            console.log('Please Select a Response, then click submit')
            return
        }
        if (newVote.answerText !== '') {
            setDisableSubmit(true)
            dispatch({ type: 'POST_VOTE', payload: newVote })
            console.log('New Vote after submit vote, before reset', newVote)
            setNewVote({surveyId: 0, questionId: 0, answerText: ''})
        }
    }

    return (
        <div className="container">
            <strong className="create-survey-header">
                Survey Questions
            </strong>
            <p>{count + 1} of {questions.length}</p>
            <form className="create-survey-form">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{ background: 'grey', paddingTop: '10px', paddingBottom: '10px' }}>{question.question_text}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px', marginBottom: '10px'}}>
                    {console.log(answerFilter(question))}
                    {onlyAnswerText.map((answer) => (
                        <FormControl>                          
                            <RadioGroup
                                aria-labelledby="answers-buttons-group"
                                name="answer-buttons-group"
                                value={newVote.answerText}
                                onChange={handleChange}
                            >
                            <FormControlLabel value={answer} control={<Radio />} label={answer} />
                                </RadioGroup>
                            </FormControl>
                    ))}
                    {!disableSubmit && 
                        <Button type="submit" className="Button" variant="contained"
                        onClick={postVote}> 
                            Submit Vote
                        </Button>
                    }
                    {disableSubmit && 
                        <Button disabled className="Button" variant="contained"> 
                            Submit Vote
                        </Button>
                    }
                    </Grid>
                    <Button className="Button" variant="contained"
                        onClick={moveToNext}>
                            {changeButtonText === true ? 'Submit Responses' : 'Next Question'}
                    </Button>
                </Grid>
            </form>
        </div>
    )
}

export default CreateVote;