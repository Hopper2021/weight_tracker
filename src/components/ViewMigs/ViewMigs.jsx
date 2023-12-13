import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jsork from './jsork.js'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Modal from '@mui/material/Modal';
import {
    Button,
    Grid,
    Divider,
    Typography,
    Box,
    TextField,
    AccordionDetails,
    AccordionSummary,
    Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import MigsDetails from '../MigsDetails/MigsDetails.jsx';

function ViewMigs() {
    const migsList = useSelector(store => store.migs.migsList)
    const dispatch = useDispatch();
    const [parks, setParks] = useState([''])
    const parkIDs = []
    const [players, setPlayers] = useState([])
    const [credentials, setCredentials] = useState('')
    const [display, setDisplay] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [newMigs, setNewMigs] = useState({
        persona: '', legalName: '', email: ''
    })

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

    useEffect(() => {
        dispatch({ type: 'FETCH_MIGS' })
        console.log( 'migs:', migsList )
    }, [])

    const orkLogin = () => {
        jsork.login(process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD).then(function(login) {
            setCredentials(login)
            console.log('Login Successful!', login)
            console.log('Token set: ', login.Token)
        })
    }

    const logParks = () => {
        jsork.kingdom.getParks(27).then(function(parks) {
            setParks(parks)
            parks.forEach( park => parkIDs.push(park.ParkId))
        })
    }

    const logPlayers = () => {
        const parkId = 863
        const kingdomId = 27
        jsork.park.getPlayers(parkId, jsork.filters.NOFILTER).then(function(allParkMembers) {
            setPlayers(allParkMembers)
            console.log('All park members: ', allParkMembers)
        })
    }

    const sendEmail = (event) => {
        event.preventDefault();
  
        emailjs.send('Polaris Surveys', 'template_gm1dzhi', templateParams, 'sB62bStha81GZwi1c')
        .then(function(response) {
           console.log('Email Sent!', response.status, response.text);
           setSuccessfulOpen(true);
        }, function(error) {
           console.log('Error, unable to send email.', error);
           setFailedOpen(true)
        });
    }

    const submitMigs = (event) => {
        event.preventDefault()
        dispatch({ type: 'POST_MIGS', payload: newMigs })
        setNewMigs({
            persona: '', legalName: '', email: ''
        })
        handleClose()
    }

    // const handleDelete = (migsId) => {
    //     dispatch({ type: 'DELETE_MIGS', payload: migsId })
    // }

    return (
        <div className="container">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="confirm-delete-modal"
                aria-describedby="confirm-delete-modal"
            >
                <Box sx={style}>
                    <Typography id="create-migs-modal" variant="h6">
                        Create New Migs
                    </Typography>
                    <form 
                        className="create-migs-form" 
                        onSubmit={submitMigs}>
                        <TextField required text="text" className="create-survey-input"
                            sx={{ m: 1, mt: 2 }}
                            label="Persona Name"
                            value={newMigs.persona}
                            onChange={(event) => setNewMigs({...newMigs, persona: event.target.value})}
                        />
                        <TextField text="text" className="create-survey-input"
                            sx={{ m: 1 }}
                            label="Legal Name"
                            value={newMigs.legalName}
                            onChange={(event) => setNewMigs({...newMigs, legalName: event.target.value})}
                        />
                        <TextField required text="text" className="create-survey-input"
                            sx={{ m: 1, mb: 3 }}
                            label="Email"
                            value={newMigs.email}
                            onChange={(event) => setNewMigs({...newMigs, email: event.target.value})}
                        />
                        <br/>
                        <Grid container>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={submitMigs}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    </form>
                </Box>
            </Modal>

        <Grid>
            <Grid>
                <Button sx={{ mb: 2 }} onClick={handleOpen}
                variant="contained">Add New</Button>
            </Grid>
            <Divider sx={{ mb: 1 }} />
                {migsList?.map((member, index) => (
                    <MigsDetails key={index} member={member}/>
                ))}
        </Grid>
        </div>
    )
  }
  
export default ViewMigs;