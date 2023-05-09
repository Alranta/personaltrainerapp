import React, {useState, useEffect} from "react";
import { API_CUSTOMERS, API_TRAININGS } from "../api";
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function AddTraining(props) {
    const [training, setTraining] = React.useState({ // HERE WE GIVE THE TRAININGS PARAMETERS
        date: '',
        duration: '',
        activity: '',
        customer: props.customer.links[0].href
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log(props)
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleClickSave = () => {
        props.addTraining(training, props.customer.links[0].href);
        setOpen(false);
        console.log(props.customer.links[0].href)
        console.log(training.date)
    };

    return (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add a new training
          </Button>
          <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle>Add a new training</DialogTitle>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Select a date"
                      format="DD.MM.YYYY"
                      value={training.date}
                      onChange={newDate => setTraining({...training, date: newDate})}
                    />
              </LocalizationProvider>
              
                <TextField
                margin="dense"
                label="Duration"
                value={training.duration}
                onChange={e => setTraining({...training, duration: e.target.value})}
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Activity"
                value={training.activity}
                onChange={e => setTraining({...training, activity: e.target.value})}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose}>Cancel</Button>
              <Button onClick={handleClickSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
};