import React, {useState, useEffect} from "react";
import { API_CUSTOMERS, API_TRAININGS } from "../api";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {
    const [customer, setCustomer] = React.useState({ // HERE WE GIVE THE CUSTOMERS PARAMETERS
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log(props.customer)
        setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress:
        props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone})
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleClickSave = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        setOpen(false);
    };


    return (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Edit customer
          </Button>
          <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle>Edit selected customer</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Firstname"
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Lastname"
                value={customer.lastname}
                onChange={e => setCustomer({...customer, lastname: e.target.value})}
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Streetaddress"
                value={customer.streetaddress}
                onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Postcode"
                value={customer.postcode}
                onChange={e => setCustomer({...customer, postcode: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="City"
                value={customer.city}
                onChange={e => setCustomer({...customer, city: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Email"
                value={customer.email}
                onChange={e => setCustomer({...customer, email: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Phone"
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone: e.target.value})}
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