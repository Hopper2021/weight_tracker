import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  Box,
  Typography,
  Divider,
} from '@mui/material'
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs'

function SurveyItem({ survey }) { 
    const history = useHistory();
  
    const viewSurveyDetails = () => {
      console.log('props survey.id in survey item - ', survey.id)
      history.push(`/details/${survey.id}`)
    }

    return (
        <div className="container">
          <Box>
            <Grid container columns={1}>
              <Grid item xs={1} sm={2} md={4}>
                <Card elevation={8} sx={{ m: 1 }}>
                  <CardActionArea sx={{ p: 2 }}
                  onClick={viewSurveyDetails}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography>{survey.name}</Typography>
                      </Grid>
                      <Divider sx={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}/>
                      <Grid item xs={6}>
                        <Typography>End Date: </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Status:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{dayjs(survey.end_date).format('ll')}</Typography> {/* Specific dayjs date formating lingo */}
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{survey.status}</Typography>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      );
}

export default SurveyItem; 