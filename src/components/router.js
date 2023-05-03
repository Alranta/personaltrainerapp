import {
    BrowserRouter,
    Routes,
    Route,
    Link
    } from "react-router-dom";
import CustomerList from "./customerlist";
import TrainingsList from "./trainingslist";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function RouterApp() {

    return(
        <div>
        
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant = 'h6'>
                    Personal trainer app
                    </Typography>
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                <Link to='/customers'>Customers</Link>{' '}
                <Link to='/trainings'>Trainings</Link>{' '}
            <Routes>
                <Route path='/customers' element={<CustomerList/>}/>
                <Route path='/trainings' element={<TrainingsList/>}/>
            </Routes>  
            </BrowserRouter>
        </div>
    );
}

export default RouterApp;