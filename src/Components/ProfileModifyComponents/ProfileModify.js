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
const style = {
   
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function ProfileModify(props) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [username,setUsername]  = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone]  = useState('');
    const [email,setEmail]  = useState('');
    const [lastname,setLastname]  = useState('');
    const [firstname,setFirstname]  = useState('');

    useEffect(() => {
        // Update the document title using the browser API
        axios.get(process.env.REACT_APP_ADRESS + 'api/user/getUser')
            .then(e =>{
            })
    }, []);
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
                            <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer',backgroundColor:'#6a6f73',color:'white'  }} onClick={()=>{
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
                            <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                                window.location.href="/profile-modify-close"
                            }}>
                                Close Account
                            </div>

                        </Stack>
                    </div>
                    <div style={{ borderStyle:'solid',borderWidth:1,display:'flex', width:'100vh',height: '90vh', borderRadius:15,marginTop:10,marginBottom:10,flexDirection:'column'  }}>
                        <div style={{ display:'flex',justifyContent:'center',marginTop:10, fontSize:32, fontWeight:'bold' }}>
                            Public profile
                        </div>
                        <Stack gap={2} style={{  }}>
                            <div style={{ marginLeft:25,marginRight:25,marginBottom:10}}>
                                <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="First Name" onChange={e=>{
                                    setFirstname(e.target.value)
                                }}/>
                            </div>
                            <div style={{ marginLeft:25,marginRight:25,marginBottom:10}}>
                                <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Last Name" onChange={e=>{
                                    setLastname(e.target.value)
                                }}/>
                            </div>
                            <div style={{ marginLeft:25,marginRight:25,marginBottom:10}}>
                                <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Phone Number" onChange={e=>{
                                    setPhone(e.target.value)
                                }}/>
                            </div>
                            <div style={{ marginLeft:25,marginRight:25,marginBottom:10}}>
                                <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="User Name" onChange={e=>{
                                    setUsername(e.target.value)
                                }}/>
                            </div>
                            <div style={{ marginLeft:25,marginRight:25,marginBottom:10}}>
                                <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Email" onChange={e=>{
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                            <div style={{ marginLeft:25,marginRight:25,marginBottom:10}}>
                                <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Password" onChange={e=>{
                                    setPassword(e.target.value)
                                }}/>
                            </div>
                            <div style={{ display:'flex',justifyContent:'center'}}>
                                <Button variant="contained" sx={{ width:"25%" }} onClick={handleOpen}>
                                    Change
                                </Button>
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
                          
                           
                        </Stack>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default ProfileModify;
