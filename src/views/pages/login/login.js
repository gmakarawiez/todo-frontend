import {React, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import userServices from  '../../../services/users.services'
import {Cookies} from '../../../cookies';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Login() {

    let navigate = useNavigate();
    const classes = useStyles();

    const initialValues =  {
            email: '',
            password: '',
    };

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .required('Password is required'),
    });


    function handleSubmit(){

        // get data provided by user
        const credentials = formik.values
        console.log("credentials: ", credentials)
        var access_token = null;
        var refresh_token = null;

        userServices.login(credentials)
        .then((response) => {
            console.log("response ok", response);
            access_token = response.data.access_token;
            refresh_token = response.data.refresh_token;
            Cookies.set("access_token", access_token,  5*60*1000);
            Cookies.set("refresh_token", refresh_token, 60*60*1000);
        })
        .then(() => {
            navigate('/models/perfgv/list')
        })
        .catch((error) => {
            console.log("error handleSubmit: ");
            console.log(error.response);
            if (error.response) { // Request made and server responded
                formik.setErrors(error.response.data);
            } else if (error.request) {  // The request was made but no response was received
                  console.log(error.request);
            } else { // Something happened in setting up the request that triggered an Error
                  console.log('Error: ///', error.message);
            }
            Cookies.set("access_token", access_token);
            Cookies.set("refresh_token", refresh_token);
        })
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
     });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    onSubmit = {(e) => { e.preventDefault(); formik.handleSubmit(e)}}
                >
                    <TextField
                        //variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        value = {formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange = {formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText = {formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        //variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value = {formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange = {formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText = {formik.touched.password && formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup" replace >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}


