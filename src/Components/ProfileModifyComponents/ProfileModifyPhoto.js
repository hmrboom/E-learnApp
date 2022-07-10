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

    const [photo,setPhoto]  = useState('');
    const [user,setUser]  = useState('');


    useEffect(()=>{
        setTimeout(() => {
            let ceva
            if(localStorage.getItem('token')){
                ceva=parseJwt(localStorage.getItem('token'))
            }
            else {
                ceva=parseJwt(sessionStorage.getItem('token'))
            }
            axios.get("https://localhost:44323/user/getUser",
                { params: { id: ceva.Id } }
            )
                .then(e=>{
                    setUser(e.data)
                    setPhoto(e.data.ProfilePhoto)

                })
                .catch(err=>{
                    console.log(err)
                })

        }, 1000);



    },[])
    return (
        <div>

            <div>
                {isMatch ? <DrawerComponentWith/>: (
                    <HeaderWith name="AH" shoppingCartNumber={2} />
                )}
                <Container maxWidth="lg" style={{ display: 'flex'}}>
                    <div style={{ borderStyle:'solid',borderWidth:1,display:'flex', width:'30vh',height: '90vh', borderRadius:15,marginTop:10,marginBottom:10,flexDirection:'column' }}>
                        <div style={{ display:'flex',flexDirection:'column',marginTop:10,alignItems: 'center'}}>
                            <Avatar sx={{ width:120,height:120,backgroundColor:'#3e4143',fontSize:50 }} src={"https://localhost:44323/api/Course/getFileById?file="+photo}>H</Avatar>
                            <div style={{ display:'flex',fontSize:23,fontWeight:'bold'}}>{user.UserName}</div>

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
                        <input type="file" className="form-control profile-pic-uploader" onChange={e=>{
                            let ret  = e.target.value; //ssssssssssssssssssssssssssss
                            ret = ret.replace('C:\\fakepath\\','');
                            setPhoto(ret)
                        }} />
                        <div style={{ display:'flex',justifyContent:'space-around',marginTop:50 }}>
                            <Button onClick={()=>{
                                axios.post("https://localhost:44323/user/userPhotoModify",{
                                    id:user.Id,
                                    profilePhoto:photo
                                })
                                    .then(res=>{
                                        alert("Success")
                                    })
                            }}>Accept Change</Button>
                        </div>
                       
                    </div>
                </Container>
            </div>
        </div>
    );

}
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
