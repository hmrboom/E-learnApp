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
import stronk from "../../Consumables/startPhoto.jpg"
export default function ProfileModifyPhoto() {
   
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
                            <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer', }} onClick={()=>{
                                window.location.href="/profile-modify"
                            }}>
                                Profile
                            </div>
                            <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer',backgroundColor:'#6a6f73',color:'white'   }} onClick={()=>{
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
                            Profile Photo
                        </div>
                        <div style={{ display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center' }}>
                            <div>Photo Preview</div>
                            {selectedImage && (
                                            <div>
                                            <img alt="not fount" style={{ width:'80%',height:'80%' }} src={URL.createObjectURL(selectedImage)} />
                                            <br />
                                             <div style={{ display:'flex',justifyContent:'space-around' }}>
                                                <Button onClick={()=>setSelectedImage(null)}>Accept Change</Button>
                                                <Button onClick={()=>setSelectedImage(null)}>Remove</Button>
                                             </div>
                                           
                                            </div>
                                        )}
                             
                        </div>
                      
                                        <br />
                                        
                                        <br /> 
                                        <input
                                            
                                            type="file"
                                            name="myImage"
                                            onChange={(event) => {
                                            console.log(event.target.files[0]);
                                            setSelectedImage(event.target.files[0]);
                                            }}
                                        />
                       
                    </div>
                </Container>
            </div>
        </div>
    );
  
}

