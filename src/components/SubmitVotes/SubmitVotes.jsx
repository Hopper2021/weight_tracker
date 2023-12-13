import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SubmitVotes() {

    return (
        <div className="container">
            <strong>Votes successfully submitted!</strong>
            <p>Thank you for completing this survey.</p>
        </div>
    )
}
  
export default SubmitVotes;