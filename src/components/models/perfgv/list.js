import * as React from 'react';
import {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import moment from 'moment';
import ModelsService from "../../../services/models.services"
import usersService from "../../../services/users.services"
import {MultipleSelectFilter, SearchTextFilter, run_filters} from "../../filters"
import Divider from '@mui/material/Divider';


const useStyles = makeStyles(theme => ({
    toolbar: {
        backgroundColor: "green"
    }
}));







const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));




const FilterBar = ({filters, setFilters}) => {
    const [expanded, setExpanded] = React.useState(false);
    const [usersChoices, setUsersChoices] = React.useState([]);

    useEffect(() => {
        usersService.getAllUsers()
        .then((response) => {
            const users = response.data;
            //const users_choices = users.map((user) => user.email.split('@')[0].replace('.',' '));
            const users_choices = users.map((user) => user.email);
            setUsersChoices(users_choices);
            console.log("users_choices", users_choices)
            console.log("FilterBar filters", filters)
        })
        .catch((error) => {
            console.log(error)
        })
    }, []);


    const handleChange = () => (event) => {
        setExpanded(!expanded);
    };

    return (
        <Accordion expanded = {expanded} onChange={handleChange()}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <MultipleSelectFilter
                    name = "creator"
                    label = "Creator"
                    choices = {usersChoices}
                    filters = {filters}
                    setFilters = {setFilters}
                 />
            <Divider variant="middle" />
            </AccordionDetails>
        </Accordion>
    )
}



const ModelsListToolbar = ({models, filters, setFilters}) => {
    let navigate = useNavigate();
    let classes = useStyles();


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Button variant="contained"
                        style = {{alignSelf:'right'}}
                        onClick={()=> {
                            navigate("/models/perfgv/create")
                        }}
                    >
                        Add
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <SearchTextFilter
                            name = {"search_text"}
                            fields = {["title", "description"]}
                            filters = {filters}
                            setFilters = {setFilters}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
  );
};

export function ModelCard(props) {
    const {id, title, description, creation_date,  models, setModels, refreshSwitch, setRefreshSwitch} = props
    let navigate = useNavigate();

    const handleDelete = (event, id) => {
        let new_models = [...models]
        ModelsService.deleteModel(id)
        .then((response) => {
            new_models = new_models.filter( model =>  model.id!==id);
            setModels(new_models);
            setRefreshSwitch(!refreshSwitch)
        })
        .then(()=>{
            navigate("/models/perfgv/list")
        })
       .catch((error) => {
                console.log(error)
       })
    }

    return (
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        P
                    </Avatar>
                }
                title={title}
                subheader={moment({creation_date}).format("YYYY-MM-DD, hh:mm:ss")}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Edit">
                    <IconButton>
                        <Link to={`/models/perfgv/edit/${id}`}>
                            <EditIcon />
                        </Link>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                     <IconButton >
                        <DeleteIcon  onClick={(event) => handleDelete(event, id)} />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
}




export default function ModelsList() {
    const [models, setModels] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [refreshSwitch, setRefreshSwitch] = React.useState(false);

    useEffect(() => {
        ModelsService.getAllModels()
        .then((response) => {
            const models = response.data;
            setModels(models);
            const filtered_ = run_filters(models, filters)
            setFiltered(filtered_);
        })
        .catch((error) => {
            console.log(error)
        })
    }, [filters, refreshSwitch]);


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <ModelsListToolbar models={models} filters = {filters} setFilters={setFilters} />
                <FilterBar filters = {filters} setFilters = {setFilters}/>
                <Grid container spacing={2}>
                    {filtered.map((model) => {
                        return (
                            <Grid item xs={3}>
                                <Box p={2}>
                                    <ModelCard
                                        {...model}
                                         models = {models}
                                         setModels = {setModels}
                                          refreshSwitch={refreshSwitch}
                                          setRefreshSwitch={setRefreshSwitch}
                                    />
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
             </Paper>
        </Box>

  );
}
