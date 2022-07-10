import React, {useEffect, useState} from 'react';
import {useMediaQuery, useTheme} from "@mui/material";
import DrawerComponentWith from "../Consumables/DrawerComponentWith";
import HeaderWith from "./HeaderWith";
import {Container} from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import Stack from "@mui/material/Stack";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Profile() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [user,setUser]  = useState([]);
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
                setUser(e.data)
            })
            .catch(err=>{
                console.log(err)
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
                            navigate("/profile-modify")
                        }}>
                            Profile
                        </div>
                        <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                            navigate("/profile-modify-photo")
                        }}>
                            Photo
                        </div>
                        <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                            navigate("/profile-payment")
                        }}>
                            Payment methods
                        </div>
                        <div style={{ fontSize:18,paddingLeft:30,cursor:'pointer'  }} onClick={()=>{
                            navigate("/profile-modify-close")
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
