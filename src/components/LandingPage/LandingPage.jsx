import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2 className="welcome-header">{heading}</h2>

      <div>
        <div className="welcome-text">
          <p>
            This is a voting and survey application designed for Amtgard, the Kingdom of Polaris.
          </p>
          <p>
            If you are looking for a survey to vote on. An admin will contact you with a link when the survey is ready.
          </p>
          <p>
            If you are an admin, please login to continue.
          </p>
        </div>
        <div>
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
