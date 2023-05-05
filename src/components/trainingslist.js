import React, {useState, useEffect} from "react";
import { API_CUSTOMERS, API_TRAININGS } from "../api";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format } from 'date-fns'
import dayjs from 'dayjs'

function TrainingsList() {
    //CREATE OBJECT FOR TRAININGS
    const [trainings, setTrainings] = useState([]);
    

    //FETCH CUSTOMERS FROM API USING useEffect
    useEffect(() => {
        fetch(API_TRAININGS)
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }, [])
    

    
    
    

    // MAKE COLUMNS FOR AGGRID
    const [columnDefs] = useState([
        {headerName: 'Date', field: 'date', sortable: true, filter: true,
        valueFormatter: params => dayjs(params.value).format('DD/MM/YYYY HH:MM')},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {headerName: 'Firstname', field: "customer.firstname", sortable: true, filter: true},
        {headerName: 'Lastname', field: "customer.lastname", sortable: true, filter: true}
        
    ]);

    return(
        <div>
         <h1>Training list</h1>
         <div className="ag-theme-material" 
            style={{height: 800, width: 'auto', margin: 'auto'}}>
                <AgGridReact // HERE WE USE AGGRID TO RENDER OUR CUSTOMERS!!
                    pagination={true}
                    paginationPageSize={10}
                    rowData={trainings}
                    columnDefs={columnDefs} 
                />
         </div>
        </div>
    );
}
export default TrainingsList;