import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Drawer from '../../components/Drawer/Drawer';
import { Divider } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="navContainer">
      <div className="nav">
        { user.id &&
          <div id="drawer">
            <Drawer/>
          </div>
        }
        <Link to="/home">
          <h2 className="nav-title">Polaris Surveys</h2>
        </Link>
        <div>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          )}
        </div>
      </div>
      <Divider sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}/>
    </div>
  );
}

export default Nav;
