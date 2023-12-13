import React from 'react';
import './HomePage.css'
import {
  Grid,
  Card,
  Box,
} from '@mui/material'
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AboutPage() {
  const history = useHistory();
  const user = useSelector(store => store.user)

  return (
    <div className="container">
        <Box>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 12 }}>
            <Grid item xs={1} sm={2} md={4}>
            <Typography sx={{ mb: 2, fontSize: 20 }}>
              Welcome, {user.username}!
            </Typography>
              <Card elevation={8}>
                <CardActionArea sx={{ p: 2 }}
                onClick={() => {history.push('/search')}}>
                <h2>View All Surveys</h2>
                  <ul>
                    <li>View all created surveys</li>
                    <li>View Survey Results</li>
                    <li>COMING SOON</li>
                  </ul>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={1} sm={2} md={4}>
            <Card elevation={8}>
                <CardActionArea sx={{p: 2}}
                onClick={() => {history.push('/create')}}>
                <h2>Create Survey</h2>
                  <ul>
                    <li>Create New Survey</li>
                    <li>Set Timeframe</li>
                    <li>Create Questions</li>
                  </ul>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={1} sm={2} md={4}>
              <Card elevation={8}>
                <CardActionArea sx={{p: 2}}
                onClick={() => {history.push('/migs')}}>
                <h2>Display MiGS</h2>
                  <ul>
                    <li>Generate a list of all Members in Good Standing in Polaris.</li>
                    <li>COMING SOON</li>
                  </ul>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
    </div>
  );
}

export default AboutPage;
