import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Card,
  Box,
  Typography,
  Divider,
  Button,
  Alert,
} from '@mui/material'
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs'
import { useParams, useHistory } from 'react-router-dom';
import DetailsQuestions from '../DetailsQuestions/DetailsQuestions'
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewMigs from '../ViewMigs/ViewMigs';

function SurveyDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const survey = useSelector(store => store.survey.selectedSurvey)
    const questions = useSelector(store => store.survey.selectedQuestions)
    const answers = useSelector(store => store.survey.selectedAnswers)
    const votes = useSelector(store => store.vote.voteList)
    const allParams = useParams();
    const surveyId = allParams.id;
    const [successfulOpen, setSuccessfulOpen] = useState(false);
    const [failedOpen, setFailedOpen] = useState(false);
    const [chartTab, setChartTab] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      borderRadius: 4,
      boxShadow: 24,
      p: 4,
    };

    const handleChange = (event, newValue) => {
      setChartTab(newValue);
    };

    const successfulClose = () => {
      // if (reason === 'clickaway') {
      //   return;
      // }
      setSuccessfulOpen(false)
    }

    const failedClose = () => {
      // if (reason === 'clickaway') {
      //   return;
      // }
      setFailedOpen(false)
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_SURVEY_DETAILS', payload: surveyId })
        dispatch({ type: 'FETCH_SURVEY_QUESTIONS', payload: surveyId })
        dispatch({ type: 'FETCH_VOTES', payload: surveyId })
    }, [])

    const templateParams = {
      username: user.username,
      survey: survey.name
    };

  //   const sendEmail = (event) => {
  //     event.preventDefault();

  //     emailjs.send('Polaris Surveys', 'template_gm1dzhi', templateParams, 'sB62bStha81GZwi1c')
  //     .then(function(response) {
  //        console.log('Email Sent!', response.status, response.text);
  //        setSuccessfulOpen(true);
  //     }, function(error) {
  //        console.log('Error, unable to send email.', error);
  //        setFailedOpen(true)
  //     });
  // }

  const deleteSurvey = () => {
      dispatch({ type: 'DELETE_SURVEY', payload: surveyId })
      history.push('/search')
  }

  const voteOnSurvey = () => {
      console.log('survey.id in voteOnSurvey function - ', surveyId)
      history.push(`/vote/${surveyId}`)
  }
  
    return (
      <div className="container">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="confirm-delete-modal"
          aria-describedby="confirm-delete-modal"
        >
        <Box sx={style}>
          <Typography id="confirm-delete-modal" variant="h6" component="h2">
            Delete Survey
          </Typography>
          <Typography id="confirm-delete-modal" sx={{ m: 2 }}>
            Are you sure?
          </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={deleteSurvey}>
                  Delete
                </Button>
              </Grid>
            </Grid>
        </Box>
        </Modal>

        <Box>
          <Grid container columns={1}>
            <Grid item xs={1} sm={2} md={4}>
              <Card elevation={8} sx={{ m: 1 }}>
                <Grid container sx={{ p: 2 }}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography>{survey.name}</Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ mt: -1 }}>
                        <Button onClick={handleOpen}>
                          <DeleteIcon/>
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider sx={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}/>
                    <Grid item xs={6}>
                        <Typography>End Date: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Status:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{dayjs(survey.end_date).format('ll')}</Typography>
                        {/* dayjs date formating lingo */}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{survey.status}</Typography>
                    </Grid>
                    <Divider sx={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}/>
                    <Grid item xs={12}>
                        <Typography>Questions</Typography>
                    </Grid>
                    <Divider sx={{ width: '100%', marginTop: '10px' }}/>
                    {questions.map((question) => (
                        <Grid key={question.id} container>
                            <Grid item xs={12}>
                                <Typography sx={{ background: 'grey', paddingTop: '10px', paddingBottom: '10px' }}>{question.question_text}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingTop: '10px', marginBottom: '10px'}}>
                              <DetailsQuestions key={question.id} question={question}/>
                            </Grid>
                        </Grid>
                    ))}
                    <Divider sx={{ width: '100%', marginBottom: '30px' }}/>
                    <Grid container>
                      <Grid item xs={12}>
                        <ViewMigs/>
                      </Grid>
                    </Grid>
                </Grid>
              </Card>
              {/* <Button onClick={sendEmail}
              variant="contained">
                Send test Email
              </Button> */}
              <Button onClick={voteOnSurvey}
              variant="contained">
                Vote
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Snackbar open={successfulOpen} autoHideDuration={4000} onClose={successfulClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={successfulClose} sx={{ width: '100%' }} severity="success">
            Email sent!
          </Alert>
        </Snackbar>
        <Snackbar open={failedOpen} autoHideDuration={4000} onClose={failedClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} variant="error">
          <Alert onClose={failedClose} sx={{ width: '100%' }} severity="error">
            Error, unable to send email.
          </Alert>
        </Snackbar>
      </div>
    );
  }
  
export default SurveyDetails;