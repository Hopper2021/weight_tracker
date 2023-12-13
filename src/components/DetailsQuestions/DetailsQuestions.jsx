import React, { useEffect } from 'react';
import {
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../BarChart/BarChart';

const DetailsQuestions = ({question}) => {
    const dispatch = useDispatch();
    const survey = useSelector(store => store.survey.selectedSurvey)
    const answers = useSelector(store => store.survey.selectedAnswers)
    const votes = useSelector(store => store.vote.voteList)
    let onlyAnswerText = []
    let onlyVoteNumbers = []

    const answerFilter = (question) => {
      const filteredAnswers = answers.filter(function(answer) {
        if (answer.question_id === question.id) {
          return answer.text
        }
      })
      filteredAnswers.forEach( answer => onlyAnswerText.push(answer.text))
      return onlyAnswerText, onlyVoteNumbers
    }

    const voteFilter = (question) => {
      const filteredVotes = votes.filter(function(vote) {
        if (vote.question_id === question.id) {
          return JSON.stringify(vote.num_of_votes)
        }
      })
      filteredVotes.forEach( vote => onlyVoteNumbers.push(vote.num_of_votes))
      return onlyVoteNumbers
    }

    useEffect(() => {
      dispatch({ type: 'FETCH_SURVEY_ANSWERS', payload: survey.id })
      dispatch({ type: 'FETCH_VOTES', payload: survey.id})
      console.log('survey id: ', survey.id)

      answerFilter(question)
      voteFilter(question)
  }, [])
  
    return (
      <div>
        {console.log('Calling answer text: ', answerFilter(question))}
        {console.log('Calling vote numbers: ', voteFilter(question))}
        {onlyAnswerText.map((answer) => (
            <Typography>{answer}</Typography>
        ))}
        <BarChart answerText={onlyAnswerText} votes={onlyVoteNumbers}/>
      </div>
    );
  }
  
export default DetailsQuestions;