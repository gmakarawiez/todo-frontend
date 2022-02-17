import React from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import {
  CContainer,
} from '@coreui/react'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from '../assets/brand/logo'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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


