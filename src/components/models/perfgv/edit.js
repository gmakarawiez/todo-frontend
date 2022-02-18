import { useEffect} from 'react';
import {
  useNavigate,
  useParams
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Checkbox } from '@mui/material';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import modelsService from '../../../services/models.services'




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const validationSchema = yup.object({
    title: yup
        .string('Enter a title')
        .required('a title is required'),
    description: yup
        .string('Enter a description')
        .required('a description is required'),
});



export default function ModelsEdit( ){
    let {id} = useParams();
    let navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        modelsService.getOneModel(id)
        .then((response) => {
            const {id, ...model} = response.data;
            console.log("model yooyoo: ", model)
            formik.setValues(model)
        })
        .catch((error) => {
            console.log("error: ", error)
        })
    }, [formik]);

    function onSubmit(){

        // get data provided by user
        const data = formik.values

        modelsService.editModel(id, data)
        .then((response) => {
            console.log(response)
        })
        .then(() => {
            navigate('/models/perfgv/list')
        })
        .catch((error) => {
            if (error.response) { // Request made and server responded
                formik.setErrors(error.response.data);
            } else if (error.request) {  // The request was made but no response was received
                  console.log(error.request);
            } else { // Something happened in setting up the request that triggered an Error
                  console.log('Error: ///', error.message);
            }
        })
    }

    const formik = useFormik({
        initialValues: {title: "", description: "", completed: true},
        validationSchema: validationSchema,
        onSubmit: onSubmit
     });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edit Model
                </Typography>
                <form
                    className={classes.form}
                    onSubmit = {(e) => { e.preventDefault(); formik.handleSubmit(e)}}
                >
                    <Grid container spacing = {2} justify="flex-start">
                        <Grid item xs ={12}>
                            <TextField
                                //variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                type="text"
                                autoFocus
                                value = {formik.values.title}
                                onBlur={formik.handleBlur}
                                onChange = {formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText = {formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                type="text"
                                autoFocus
                                value = {formik.values.description}
                                onBlur={formik.handleBlur}
                                onChange = {formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText = {formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="completed"
                                        label="Completed"
                                        name="completed"
                                        checked = {formik.values.completed}
                                        onChange = {formik.handleChange}
                                    />
                                }
                                label="Completed"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}


