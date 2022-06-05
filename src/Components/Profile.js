import React, {useEffect, useState} from 'react';
import {useMediaQuery, useTheme} from "@mui/material";
import DrawerComponentWith from "../Consumables/DrawerComponentWith";
import HeaderWith from "./HeaderWith";
import {Container, TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';
import axios from "axios";
const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function Profile(props) {
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
            {isMatch ? <DrawerComponentWith/>: (
                <HeaderWith name="AH" shoppingCartNumber={2} />
            )}
            <Container maxWidth="lg">
                <div style={{ borderStyle:'solid',borderWidth:1,display:'flex', width:'30vh',height: '90vh', borderRadius:15,marginTop:10,marginBottom:10,flexDirection:'column' }}>
                   <div style={{ display:'flex',flexDirection:'column',marginTop:10,alignItems: 'center'}}>
                       <Avatar sx={{ width:120,height:120,backgroundColor:'#3e4143',fontSize:50 }}>H</Avatar>
                       <div style={{ display:'flex',fontSize:23,fontWeight:'bold'}}>nume</div>

                   </div>
                    <Stack gap={0.5} style={{ marginTop:20}}>
                        <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                            window.location.href="/profile-modify"
                        }}>
                            Profile
                        </div>
                        <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                            window.location.href("/profile-modify-photo")
                        }}>
                            Photo
                        </div>
                        <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                            window.location.href("/profile-payment")
                        }}>
                            Payment methods
                        </div>
                        <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                            window.location.href("/profile-modify-close")
                        }}>
                            Close Account
                        </div>

                    </Stack>
                </div>
            </Container>
        </div>
    );
}

export default Profile;
