import React, {useState} from 'react';
import {Drawer, IconButton, List, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

function DrawerComponentWith({shoppingCartNumber,name}) {

    return (
        <>

        </>

        // <div style={{ display:'flex'}}>
        //     <Drawer
        //         open={openDrawer}
        //         onClose={() => setOpenDrawer(false)}
        //     >
        //         <List>
        //             <ListItem onClick={() => setOpenDrawer(false)}>
        //                 <ListItemText>
        //
        //                     <Navbar.Brand style={{ fontSize:26 }} href="/start">E-Learn</Navbar.Brand>
        //                 </ListItemText>
        //             </ListItem>
        //             <ListItem onClick={() => setOpenDrawer(false)}>
        //                 <ListItemText>
        //                     <Avatar sx={{ marginLeft:2, cursor:'pointer' }}>{name}</Avatar>
        //
        //                 </ListItemText>
        //             </ListItem>
        //             <ListItem onClick={() => setOpenDrawer(false)} >
        //                 <ListItemText >
        //
        //             <Badge badgeContent={shoppingCartNumber} color="primary">
        //                {/* <ShoppingCartIcon sx={{color:'gray', cursor:'pointer'}} />*/}
        //                 <Link to="/">Shopping Cart</Link>
        //             </Badge>
        //                 </ListItemText>
        //             </ListItem>
        //             <ListItem onClick={() => setOpenDrawer(false)}>
        //                 <ListItemText>
        //                     <Link to="/">Course Categories</Link>
        //                 </ListItemText>
        //             </ListItem>
        //             <ListItem onClick={() => setOpenDrawer(false)}>
        //                 <ListItemText>
        //                     <Link to="/login">Log Out</Link>
        //                 </ListItemText>
        //             </ListItem>
        //
        //         </List>
        //     </Drawer>
        //     <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        //         <MenuIcon />
        //     </IconButton>
        //
        //     <Stack spacing={2} sx={{ width: 230,marginTop:1,marginBottom:1 }}>
        //         <Autocomplete
        //             freeSolo
        //             id="free-solo-2-demo"
        //             disableClearable
        //             options={top100Films.map((option) => option.title)}
        //             renderInput={(params) => (
        //                 <TextField
        //                     {...params}
        //                     label="Search"
        //                     InputProps={{
        //                         ...params.InputProps,
        //                         type: 'search',
        //                     }}
        //                 />
        //             )}
        //         />
        //     </Stack>
        //
        // </div>
    );
}

export default DrawerComponentWith;
