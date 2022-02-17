import {React} from 'react';
import {
  Link,
  useNavigate,
} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import userServices from  '../../../services/users.services'


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



export default function Signup() {

    let navigate = useNavigate();
    const classes = useStyles();

    const initialValues =  {
            username: '',
            email: '',
            password: ''
    };

    const validationSchema = yup.object({
        username: yup
            .string('Enter a username')
            .required('Username is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .required('Password is required')
    });


    function handleSubmit(){

        // get data provided by user
        const data = formik.values

        userServices.signup(data)
        .then(() => {
            navigate('/login/')
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit = {(e) => { e.preventDefault(); formik.handleSubmit(e)}}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  value = {formik.values.username}
                  onBlur={formik.handleBlur}
                  onChange = {formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText = {formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  type="password"
                  value = {formik.values.password || ''}
                  onBlur={formik.handleBlur}
                  onChange = {formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText = {formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link  to="/login" replace>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
}


