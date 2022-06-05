import React, {useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DrawerComponentWith from "../../Consumables/DrawerComponentWith";
import HeaderWith from "../HeaderWith";
import {Container} from "@material-ui/core";
import {TextField, useMediaQuery, useTheme} from "@mui/material";
import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function ProfileDelete() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>

    <div>
        {isMatch ? <DrawerComponentWith/>: (
            <HeaderWith name="AH" shoppingCartNumber={2} />
        )}
        <Container maxWidth="lg" style={{ display: 'flex'}}>
            <div style={{ borderStyle:'solid',borderWidth:1,display:'flex', width:'30vh',height: '90vh', borderRadius:15,marginTop:10,marginBottom:10,flexDirection:'column' }}>
                <div style={{ display:'flex',flexDirection:'column',marginTop:10,alignItems: 'center'}}>
                    <Avatar sx={{ width:120,height:120,backgroundColor:'#3e4143',fontSize:50 }}>H</Avatar>
                    <div style={{ display:'flex',fontSize:23,fontWeight:'bold'}}>nume</div>

                </div>
                <Stack gap={0.5} style={{ marginTop:20}}>
                    <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer',  }} onClick={()=>{
                        window.location.href="/profile-modify"
                    }}>
                        Profile
                    </div>
                    <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                        window.location.href="/profile-modify-photo"
                    }}>
                        Photo
                    </div>
                    <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                        window.location.href="/profile-payment"
                    }}>
                        Payment methods
                    </div>
                    <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer',backgroundColor:'#6a6f73',color:'white'  }} onClick={()=>{
                        window.location.href="/profile-modify-close"
                    }}>
                        Close Account
                    </div>

                </Stack>
            </div>
            <div style={{ borderStyle:'solid',borderWidth:1,display:'flex', width:'100vh',height: '90vh', borderRadius:15,marginTop:10,marginBottom:10,flexDirection:'column'  }}>
                <div style={{ display:'flex',justifyContent:'center',marginTop:10, fontSize:32, fontWeight:'bold' }}>
                    Close Account
                </div>
                <div style={{ fontSize:18,padding:"15px 10px" }}>
                        <div style={{ fontWeight:'bold' }}>Warning:</div> If you close your account, you will be unsubscribed from all your 5 courses, and will lose access forever.
                </div>
                <div style={{ display:'flex',justifyContent:'center' }}>
                        <Button variant="contained" color="error" sx={{ width:'25%' }} onClick={handleOpen}>Close Account</Button>
                </div>
                <div style={{ display:'flex',justifyContent:'center',alignItems:'center' }}>
                                <Modal
                                     open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    style={{  display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center' }}
                                    >
                                    <Box sx={{  width: 400,
                                                bgcolor: 'background.paper',
                                                border: '2px solid #000',
                                                boxShadow: 24, }}>
                                    <div style={{ display:'flex',justifyContent:'center',fontSize:25 }}>Are you sure?</div>                
                                    <div style={{ display:'flex',flexDirection:'row',gap:10,justifyContent:'space-around',marginTop:30 }}>
                                        <Button variant="contained">Yes</Button>
                                        <Button variant="contained" onClick={handleClose}>No</Button>

                                    </div>
                                    </Box>
                                </Modal>
                            </div>
                
            </div>
        </Container>
    </div>
</div>
  )
}

