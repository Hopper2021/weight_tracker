import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

export default function TemporaryDrawer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  // Toggle Drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Drawer logic for placement
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* List of links in drawer menu */}
      <List>
        {/* Profile Link */}
            <ListItem sx={{ mt: 1 }}
            onClick={() => history.push('/home')}>
                <ListItemIcon>
                    {<AccountCircleIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
                <ListItemText sx={{ textAlign: 'center', fontWeight: 'bold', m: 1 }}>
                    Home
                </ListItemText>
            </ListItem>
          {/* My Tournaments Link */}
            <ListItem sx={{ mt: 1 }}
            onClick={() => history.push('/search')}>
                <ListItemIcon>
                    {<SearchIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
                <ListItemText sx={{ textAlign: 'center' }}>
                    Search
                </ListItemText>
            </ListItem>
          {/* Create Tournament Link */}
            <ListItem sx={{ mt: 1 }}
            onClick={() => history.push('/create')}>
                <ListItemIcon>
                    {<PlaylistAddIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
                <ListItemText sx={{ textAlign: 'center' }}>
                    Create
                </ListItemText>
            </ListItem> 
          {/* Search Link */}
            <ListItem sx={{ mt: 1 }}
            onClick={() => history.push('/migs')}>
                <ListItemIcon>
                    {<MenuBookIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
                <ListItemText sx={{ textAlign: 'center' }}>
                    View MiGS
                </ListItemText>
            </ListItem>
      </List>
      {/* Divider line */}
      <Divider />
        <List > 
          {/* Logout Link */}
            {<ListItem id="logout" button key={'Logout'} sx={{ mt: 2 }}
            onClick={() => dispatch({ type: 'LOGOUT' })}>
                <ListItemIcon>
                    {<LogoutIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
            <ListItemText primary={'Logout'} sx={{ textAlign: 'center' }} />
            </ListItem>}
        </List>
    </Box>
  );

  // Return shows hamburger icon and mapsthrough toggle drawer logic
  return (
    <>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <DehazeIcon sx={{ width: 40, height: 40, ml: 1, mr: 1 }} onClick={toggleDrawer(anchor, true)}>{anchor}</DehazeIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}