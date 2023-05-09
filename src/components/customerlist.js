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
import AddCustomer from './AddCustomer'
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function CustomerList() {
    // CREATE OBJECT CUSTOMER
    const [customers, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);

    // FETCH CUSTOMERS FROM CUSTOMER API AND PRINT THEM OUT ALWAYS!
    useEffect(() => {
        fetch(API_CUSTOMERS)
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }, []); // <-- NOTE THE EMPTY ARRAY THAT AUTOMATICALLY USESEFFECT AND SHOWS CUSTOMERS

    const getTrainings = () => {
        fetch(API_TRAININGS)
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
        console.log(trainings)
    };

    const getCustomers = () => {
        fetch(API_CUSTOMERS)
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    };


    const deleteCustomer = (params) => {
        if (window.confirm("Do you want to delete this customer?")) {
            fetch(params.data.links[0].href, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setOpen(true);
                    getCustomers();
                }
                else
                    alert("Something went wrong: " + response.status)
            })
            .catch(err => console.error(err))
        }
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert("Something went wrong")
        })
        .catch(err => console.error(err))
    }
    
    const addCustomer = (customer) => {
        fetch(API_CUSTOMERS, {
           method : 'POST',
           headers: {'Content-type':'application/json'},
           body: JSON.stringify(customer)
           })
           .then(response => {
               if (response.ok)
                   getCustomers();
               else
                   alert("Something went wrong")
           })
           .catch(err => console.error(err))
       }

       const addTraining = (training, link) => {
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
           method : 'POST',
           headers: {'Content-type':'application/json'},
           body: JSON.stringify(training)
           })
           .then(response => {
               if (response.ok)
                   getTrainings();
               else
                   alert("Something went wrong")
           })
           .catch(err => console.error(err))
       }

    // CREATE COLUMNS FOR AGGRID
    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 150},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {cellRenderer: row => <AddTraining addTraining={addTraining} customer={row.data}/>},
        {cellRenderer: row => <EditCustomer updateCustomer={updateCustomer} customer={row.data}/>},
        {cellRenderer: params =>
        <Button color="error" onClick={() => deleteCustomer(params)}>Delete</Button>}
    ]);


    return(
        <div>
            <h1>Customer list</h1>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" 
            style={{height: 800, width: 'auto', margin: 'auto'}}>
                <AgGridReact // HERE WE USE AGGRID TO RENDER OUR CUSTOMERS!!
                    pagination={true}
                    paginationPageSize={10}
                    rowData={customers}
                    columnDefs={columnDefs} 
                />
         </div>
        </div>
    );
}
export default CustomerList;