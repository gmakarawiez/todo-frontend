import * as React from 'react';
import {useEffect, useState} from 'react';
import Badge from "react-bootstrap/Badge";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {IoMdAddCircle} from "react-icons/io";
import moment from 'moment';
import ModelsService from "../../../services/models.services"
import { DataGrid } from '@mui/x-data-grid';


const useStyles = makeStyles({
    dataGrid: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        width: "100%"
    }
});


export default function ModelsList() {

    const [models, setModels] = React.useState([]);


    const columns = [
        { field: 'title', headerName: 'Title', sortable: 'true' },
        { field: 'description', headerName: 'Description',  sortable: 'true'},
        { field: 'author', headerName: 'Author',  type: 'email', sortable: 'true'},
        { field: 'creation_date', headerName: 'Creation Date',  type: 'dateTime', sortable: 'true'},
        { field: 'last_edition_date', headerName: 'Last Edition Date',  type: 'dateTime', sortable: 'true'},
        { field: 'completed', headerName: 'Completed',  type: 'boolean', sortable: 'true', width: 50},
    ];


    const classes = useStyles();

    useEffect(() => {
        ModelsService.getAllModels()
        .then((response) => {
            const models = response.data;
            setModels(models);
        })
        .catch((error) => {
            console.log(error)
        })
    }, []);


    return (
        <div style={{ height: 400}}>
            <DataGrid
                rows={models}
                columns={columns}
                autoHeight={true}
                disableExtendRowFullWidth={false}
                rowsPerPageOptions={[5, 20, 100]}
                checkboxSelection
                disableSelectionOnClick
                className = {classes.dataGrid}
            />
        </div>
    );
}
