import React, {useState} from 'react'
import HeaderW from './HeaderW'
import '../cssStyle/styleSheet.css';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Box, Button, TextField, useMediaQuery, useTheme} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import DrawerComponent from "../Consumables/DrawerComponent";
import axios from "axios";
import Stack from "@mui/material/Stack";
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div>
            {isMatch ? <DrawerComponent/>: (
            <HeaderW/>
        )}
            <div style={{
                backgroundImage: `url("https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',display:'flex', justifyContent: 'center',alignItems: 'center', }}>
                {isMatch ? (
                    <div style={{backgroundColor:'white', width:'90%',height:'70%',display:'flex',flexDirection:'column',gap:15  }}>

                        <div style={{ display:'flex',justifyContent: 'center',marginTop:15 }}>
                            <h2> Login </h2>
                        </div>
                        <div style={{ display:'flex',justifyContent: 'center', }}>
                            <p style={{ color:'#6A6A6A',fontWeight:300}}>Enter Login details to get access</p>
                        </div>
                        <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                            Email Address
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Email Address" />
                        </div>
                        <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                            Password
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Password" />
                        </div>
                        <div style={{ marginLeft:25,marginRight:25,display:'flex',justifyContent:'space-between'}}>
                            <FormControlLabel control={<Checkbox  sx={{
                                '&.Mui-checked': {
                                    color: '#EA5252',
                                },
                            }}/>} label="Keep Me Logged In"/>
                            <div style={{ display:'flex',alignItems:'center',color:'#EA5252',fontSize:'14px',fontWeight:400,cursor: 'pointer'}}> Forgot password? </div>
                        </div>
                        <div  style={{ paddingTop:20,marginLeft:25,marginRight:25,display:'flex',justifyContent:'space-between',}}>
                            <div style={{ display:'flex',justifyContent:'center',alignItems:'center' }}>
                                <div style={{color:'#6A6A6A',fontSize:'16px',fontWeight:300 }}> Don’t have an account? </div>
                                <div style={{ marginLeft:3,color:'#EA5252',fontSize:'16px',fontWeight:300,cursor:'pointer' }}>Sign Up here </div>
                            </div>

                            <div  style={{ backgroundColor:'#5A4E8C',fontSize:'16px',color:'white',padding:'10px 43px',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer' }}>
                                Sign in

                            </div>


                        </div>
                    </div>
                ): (
                    <div style={{backgroundColor:'white', width:'40%',height:'70%',display:'flex',flexDirection:'column',gap:15  }}>

                        <div style={{ display:'flex',justifyContent: 'center',marginTop:15 }}>
                            <h2> Login </h2>
                        </div>
                        <div style={{ display:'flex',justifyContent: 'center', }}>
                            <p style={{ color:'#6A6A6A',fontWeight:300}}>Enter Login details to get access</p>
                        </div>
                        <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                            Email Address
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Email Address" onChange={e=>{
                                setEmail(e.target.value);
                            }}/>
                        </div>
                        <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                           Password
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Password" onChange={e=>{
                                setPassword(e.target.value);
                            }}/>
                        </div>
                        <div style={{ marginLeft:25,marginRight:25,display:'flex',justifyContent:'space-between'}}>
                            <FormControlLabel control={<Checkbox  sx={{
                                '&.Mui-checked': {
                                    color: '#EA5252',
                                },
                            }} onChange={e=>{
                                setRememberMe(e.target.checked);
                            }}/>} label="Keep Me Logged In"

                            />
                            <div style={{ display:'flex',alignItems:'center',color:'#EA5252',fontSize:'14px',fontWeight:400,cursor: 'pointer'}}> Forgot password? </div>
                        </div>
                        <div  style={{ paddingTop:20,marginLeft:25,marginRight:25,display:'flex',justifyContent:'space-between',}}>
                           <div style={{ display:'flex',justifyContent:'center',alignItems:'center' }}>
                               <div style={{color:'#6A6A6A',fontSize:'16px',fontWeight:300 }}> Don’t have an account? </div>
                               <a href="register" style={{ marginLeft:3,color:'#EA5252',fontSize:'16px',fontWeight:300,cursor:'pointer' }}>Sign Up here </a>
                           </div>

                            <div style={{ backgroundColor:'#5A4E8C',fontSize:'16px',fontWeight:'bold',color:'white',padding:'10px 43px',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer' }}
                            onClick={()=>{
                                axios.post("https://localhost:44323/user/login",{
                                    email: email,
                                    password: password
                                })
                                    .then((response) =>{
                                        console.log(response);
                                        if(rememberMe)localStorage.setItem('token',response.data.token);
                                        else sessionStorage.setItem('token',response.data.token);
                                        window.location.href='/start'
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                    })
                            }}


                            >
                                Sign in

                            </div>


                        </div>
                    </div>
                )}





            </div>


            {/*<section class="vh-100 gradient-custom">*/}
            {/*    <div class="container py-5 h-100">*/}
            {/*        <div class="row d-flex justify-content-center align-items-center h-100">*/}
            {/*            <div class="col-12 col-md-8 col-lg-6 col-xl-5">*/}
            {/*                <div class="card bg-dark text-white" style={{borderRadius: '16px'}}>*/}
            {/*                    <div class="card-body p-5 text-center">*/}

            {/*                        <div class="mb-md-5 mt-md-4 pb-5">*/}

            {/*                            <h2 class="fw-bold mb-2 ">Login</h2>*/}
            {/*                            <p class="text-white-50 mb-5">Please enter your login and password!</p>*/}


            {/*                                <CssTextField fullWidth required label="Email" id="Email" sx={{ input: { color: 'white' }, label:{color:'gray'} }} onChange={(e)=>{*/}

            {/*                                    setEmail(e.target.value);*/}
            {/*                                }} />*/}

            {/*                            <CssTextField fullWidth required type="password" label="Password" id="Password" sx={{ input: { color: 'white' }, marginTop:2, label:{color: 'gray'} }}*/}
            {/*                                          onChange={(e)=>{*/}
            {/*                                              setPassword(e.target.value)*/}

            {/*                                          }}*/}
            {/*                            />*/}

            {/*                            <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>*/}
            {/*                            <Stack direction="row" sx={{ display:'flex',alignItems:'center' }}>*/}
            {/*                                <Checkbox onChange={(e)=>{ setRememberMe(!rememberMe);}} />*/}
            {/*                                <Stack>Remember Me</Stack>*/}
            {/*                            </Stack>*/}
            {/*                            <Button class="btn btn-outline-light btn-lg px-5"  onClick={()=>{*/}
            {/*                                axios.post("https://localhost:44323/user/login",*/}
            {/*                                    {*/}
            {/*                                        email: email,*/}
            {/*                                        password: password*/}
            {/*                                    })*/}
            {/*                                    .then((response) =>{*/}
            {/*                                        console.log(response)*/}
            {/*                                       if(rememberMe)localStorage.setItem('token',response.data.token)*/}
            {/*                                        else sessionStorage.setItem('token',response.data.token)*/}
            {/*                                        window.location.href='/start';*/}



            {/*                                    },(error) =>{*/}
            {/*                                        console.log(error)*/}
            {/*                                    });*/}
            {/*                            }} >Login</Button>*/}



            {/*                            <div class="d-flex justify-content-center text-center mt-4 pt-1">*/}
            {/*                                <IconButton aria-label="share">*/}
            {/*                                    <GoogleIcon style={{ color:'white' }}/>*/}
            {/*                                </IconButton>*/}
            {/*                                <IconButton aria-label="share">*/}
            {/*                                    <FacebookIcon style={{ color:'white' }}/>*/}
            {/*                                </IconButton>*/}
            {/*                                <IconButton aria-label="share">*/}
            {/*                                    <TwitterIcon style={{ color:'white' }}/>*/}
            {/*                                </IconButton>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div>*/}
            {/*                            <p class="mb-0">Don't have an account? <a href="register" class="text-white-50 fw-bold">Sign Up</a></p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    )
}
