import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {Cookies} from '../cookies';

export default function AppHeader() {

  const navigate = useNavigate();

  function logout(props){
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    console.log("logout")
    navigate('/login')    //return <Navigate to="/login" />
  };



  //const sidebarShow = useSelector((state) => state.sidebarShow)
  return (
    <Box sx={{p: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              color="inherit"
              onClick = {() => logout()}
            >
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


