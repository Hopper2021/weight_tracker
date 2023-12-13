import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './CreateSurvey.css';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


function CreateSurvey () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newSurvey, setNewSurvey] = useState({
        name: '', end_date: null, status: 'Not started'
    })

    const dispatchReset = () => {
        dispatch({ type: 'RESET_QUESTIONS', payload: [] })
    }

    const addNewData = (event) => {
        event.preventDefault();
        dispatch({ type: 'POST_NEW_SURVEY', payload: newSurvey })
        dispatchFetch()
        dispatchReset()
        history.push(`/create/questions`);
    }

    const dispatchFetch = () => {
        dispatch({ type: 'FETCH_NEW_SURVEY' })
    }

    return (
        <div className="container">
            <strong className="create-survey-header">
                Complete Base Information
            </strong>
            <form className="create-survey-form" 
            onSubmit={addNewData}>
                <TextField required text="text" className="create-survey-input"
                    sx={{ m: 3 }}
                    label="Survey Name"
                    value={newSurvey.name}
                    onChange={(event) => setNewSurvey({...newSurvey, name: event.target.value})}
                />
                <br/>
                <strong className="create-survey-header">
                    End Date
                </strong>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day" 
                        value={newSurvey.end_date}
                        onChange={(newValue) => setNewSurvey({...newSurvey, end_date: newValue})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br/>
                <Button type="submit" className="Button"
                variant="contained"
                > 
                    Next
                </Button>
            </form>
        </div>
    )
}

export default CreateSurvey;