import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurveyItem from '../SurveyItem/SurveyItem';

function SearchSurveys() {
    const allSurveys = useSelector(store => store.survey.allSurveys)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_SURVEYS' });
    }, []);

    return (
        <div className="container">
            {allSurveys.map((survey, index) => (
            <div>
                <SurveyItem key={index} survey={survey}/>
            </div>
            ))}
              {allSurveys <= 0 && (
                  <div>No surveys to display.</div>
              )}
        </div>
    )
  }
  
export default SearchSurveys;