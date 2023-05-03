import React, {useState, useEffect} from "react";
import { API_CUSTOMERS } from "../api";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function CustomerList() {
    // CREATE OBJECT CUSTOMER
    const [customers, setCustomer] = useState([]);

    // FETCH CUSTOMERS FROM CUSTOMER API AND PRINT THEM OUT ALWAYS!
    useEffect(() => {
        fetch(API_CUSTOMERS)
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }, []); // <-- NOTE THE EMPTY ARRAY THAT AUTOMATICALLY USESEFFECT AND SHOWS CUSTOMERS

    // CREATE COLUMNS FOR AGGRID
    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 150},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true}
    ]);

    return(
        <div>
            <h1>Customer list</h1>
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