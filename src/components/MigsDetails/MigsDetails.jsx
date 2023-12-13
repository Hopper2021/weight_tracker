import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
    Box,
    Grid,
    Button,
    Typography,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';

function MigsDetails({member}) {
    const migsList = useSelector(store => store.migs.migsList)
    const dispatch = useDispatch();
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
    const [editOpen, setEditOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [memberPersona, setMemberPersona] = useState()
    const [updatedMigs, setUpdatedMigs] = useState({
        persona: member.persona, legalName: member.legal_name, email: member.email
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

    const handleDelete = (event) => {
        event.preventDefault()
        const memberId = member.id
        dispatch({ type: 'DELETE_MIGS', payload: memberId })
    }

    const updateMigs = (event) => {
        event.preventDefault()
        console.log('updated migs: ', updatedMigs)
        dispatch({ type: 'UPDATE_MIGS', payload: updatedMigs })
        setUpdatedMigs({
            persona: '', legalName: '', email: ''
        })
        handleEditClose()
        dispatch({ type: 'FETCH_MIGS '})
    }

    return (
        <div>
            <List sx={{ p: 0, m: 0 }}>
                <ListItem sx={{ p: 1, minWidth: '325px', wordBreak: 'break-all' }}>
                    <Button sx={{ p: 0, m: 0 }}>
                        <EditIcon onClick={handleEditOpen}/>
                    </Button>
                    <Typography>{member.email}</Typography>
                    <Button sx={{ p: 0, m: 0 }}>
                        <DeleteIcon onClick={handleDeleteOpen}/>
                    </Button>
                </ListItem>
            </List>

            <Modal
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="confirm-delete-modal"
                aria-describedby="confirm-delete-modal"
            >
                <Box sx={style}>
                    <Typography id="create-migs-modal" variant="h6">
                        EDIT MIGS
                    </Typography>
                    <form 
                        className="create-migs-form" 
                        onSubmit={updateMigs}>
                        <TextField required text="text" className="create-survey-input"
                            sx={{ m: 1, mt: 2 }}
                            label="Persona Name"
                            value={updatedMigs.persona}
                            onChange={(event) => setUpdatedMigs({...updatedMigs, persona: event.target.value})}
                        />
                        <TextField text="text" className="create-survey-input"
                            sx={{ m: 1 }}
                            label="Legal Name"
                            value={updatedMigs.legalName}
                            onChange={(event) => setUpdatedMigs({...updatedMigs, legalName: event.target.value})}
                        />
                        <TextField required text="text" className="create-survey-input"
                            sx={{ m: 1, mb: 3 }}
                            label="Email"
                            value={updatedMigs.email}
                            onChange={(event) => setUpdatedMigs({...updatedMigs, email: event.target.value})}
                        />
                        <br/>
                        <Grid container>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={handleEditClose}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={updateMigs}>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="confirm-delete-modal"
                aria-describedby="confirm-delete-modal"
            >
            <Box sx={style}>
                <Grid item>
                <Typography id="confirm-delete-modal" variant="h6" component="h2">
                    Delete {member.persona}
                </Typography>
                </Grid>
                <Typography id="confirm-delete-modal" sx={{ m: 2 }}>
                    Are you sure?
                </Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleDeleteClose}>
                            Cancel
                        </Button>
                    </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </Grid>
                </Grid>
        </Box>
                </Modal>
        </div>
    )
  }
  
export default MigsDetails;