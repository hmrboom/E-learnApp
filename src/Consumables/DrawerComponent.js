import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
 makeStyles
} from "@material-ui/core";
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

function DrawerComponent() {

  return(
  <div style={{ display:'flex'}}>
{/*      <Drawer*/}
{/*        open={openDrawer}*/}
{/*        onClose={() => setOpenDrawer(false)}*/}
{/*      >*/}
{/*        <List>*/}
{/*        <ListItem onClick={() => setOpenDrawer(false)}>*/}
{/*            <ListItemText>*/}
{/*            <Navbar.Brand style={{ fontSize:26 }} href="/">E-Learn</Navbar.Brand>*/}
{/*            </ListItemText>*/}
{/*          </ListItem>*/}
{/*         <ListItem onClick={() => setOpenDrawer(false)}>*/}
{/*            <ListItemText>*/}
{/*              <Link to="/">Course Categories</Link>*/}
{/*            </ListItemText>*/}
{/*          </ListItem>*/}
{/*          <ListItem onClick={() => setOpenDrawer(false)}>*/}
{/*            <ListItemText>*/}
{/*              <Link to="/login">Log In</Link>*/}
{/*            </ListItemText>*/}
{/*          </ListItem>*/}
{/*          <ListItem onClick={() => setOpenDrawer(false)}>*/}
{/*            <ListItemText>*/}
{/*              <Link to="/register">Sign in</Link>*/}
{/*            </ListItemText>*/}
{/*          </ListItem>*/}
{/*        </List>*/}
{/*      </Drawer>*/}
{/*      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>*/}
{/*        <MenuIcon />*/}
{/*      </IconButton>*/}
{/*      */}
{/*<Stack direction="row" spacing={2}>*/}
{/*<Stack  sx={{ width: 230,marginTop:1,marginBottom:1 }} spacing={2}>*/}
{/*      <Autocomplete*/}
{/*        freeSolo*/}
{/*        id="free-solo-2-demo"*/}
{/*        disableClearable*/}
{/*        options={top100Films.map((option) => option.title)}*/}
{/*        renderInput={(params) => (*/}
{/*          <TextField*/}
{/*            {...params}*/}
{/*            label="Search"*/}
{/*            InputProps={{*/}
{/*              ...params.InputProps,*/}
{/*              type: 'search',*/}
{/*            }}*/}
{/*            sx={{ width:230 }}*/}
{/*          />*/}
{/*        )}*/}
{/*      />*/}
{/*</Stack>*/}
{/*   <div style={{ display:'flex', marginTop:4,marginBottom:4}}>*/}
{/*      <Button variant="contained" color="success">*/}
{/*          Submit*/}
{/*      </Button>*/}
{/*   </div>*/}
{/*</Stack>*/}

   </div>   
  );
}
export default DrawerComponent;
