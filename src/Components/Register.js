import React, {useState} from 'react';
import HeaderW from "./HeaderW";
import IconButton from "@mui/material/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import {Button, TextField, useMediaQuery, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Box} from "@material-ui/core";
import DrawerComponent from "../Consumables/DrawerComponent";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#369ff4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'blue',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(255,255,255,0.56)',
        },
        '&:hover fieldset': {
            borderColor: '#ffffff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffffff',
        },
    },
});

function Register(props) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [firstName, setfirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(false);

    return (
        <div>
            {isMatch ? <DrawerComponent/> : (
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
                            <h2> Register </h2>
                        </div>
                        <div style={{ display:'flex',justifyContent: 'center', }}>
                            <p style={{ color:'#6A6A6A',fontWeight:300}}>Enter Register details to get access</p>
                        </div>
                        <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                            Email Address
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Email Address" onChange={(e)=>{
                                setEmail(e.target.value);
                            }} />
                        </div>
                        <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                            Password
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Password" onChange={(e)=>{
                                setPassword(e.target.value);
                            }} />
                        </div>

                        <div  style={{ paddingTop:20,marginLeft:25,marginRight:25,display:'flex',justifyContent:'space-between',}}>
                            <div style={{ display:'flex',justifyContent:'center',alignItems:'center' }}>
                                <div style={{color:'#6A6A6A',fontSize:'16px',fontWeight:300 }}> Do you have an account? </div>
                                <div style={{ marginLeft:3,color:'#EA5252',fontSize:'16px',fontWeight:300,cursor:'pointer' }}>Login here </div>
                            </div>

                            <div  style={{ backgroundColor:'#5A4E8C',fontSize:'16px',color:'white',padding:'10px 43px',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer' }}>
                                Sign in

                            </div>


                        </div>
                    </div>
                ): (
                    <div style={{backgroundColor:'white', width:'40%',height:'auto',display:'flex',flexDirection:'column',gap:15  }}>

                        <div style={{ display:'flex',justifyContent: 'center',marginTop:15 }}>
                            <h2> Register </h2>
                        </div>
                        <div style={{ display:'flex',justifyContent: 'center', }}>
                            <p style={{ color:'#6A6A6A',fontWeight:300}}>Enter Register details to get access</p>
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
                            First Name
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="First Name" onChange={e=>{
                                setfirstName(e.target.value)
                            }}/>
                        </div>
                            <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                                Last Name
                            </div>
                            <div style={{ marginLeft:25,marginRight:25}}>
                                <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Last Name" onChange={e=>{
                                    setlastName(e.target.value)
                                }}/>
                            </div>

                        <div style={{ marginLeft:25,fontSize:'17px',color:'#140C40',fontWeight:500 }}>
                            Password
                        </div>
                        <div style={{ marginLeft:25,marginRight:25}}>
                            <TextField style={{ width:'100%' }} id="demo-helper-text-misaligned-no-helper" label="Password" onChange={e=>{
                                setPassword(e.target.value)
                            }}/>
                        </div>

                            <div style={{ marginLeft:25,marginRight:25 }}>


                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"

                                name="radio-buttons-group"
                                onChange={e => {
                                    if (e.target.value === 'female') setGender(true)
                                    else setGender(false)}
                                }
                            >
                                <div style={{ display:'flex',justifyContent:'space-between' }}>
                                <FormControlLabel value="female" control={<Radio color="error" />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </div>
                            </RadioGroup>
                            </div>


                        <div  style={{ paddingTop:20,marginLeft:25,marginRight:25,display:'flex',justifyContent:'space-between',}}>
                            <div style={{ display:'flex',justifyContent:'center',alignItems:'center' }}>
                                <div style={{color:'#6A6A6A',fontSize:'16px',fontWeight:300 }}> Do you have an account? </div>
                                <a href="login" style={{ marginLeft:3,color:'#EA5252',fontSize:'16px',fontWeight:300,cursor:'pointer' }}>Login here </a>
                            </div>

                            <div style={{ backgroundColor:'#5A4E8C',fontSize:'16px',fontWeight:'bold',color:'white',padding:'10px 43px',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',marginBottom:10 }}
                                 onClick={()=>{

                                     axios.post("https://localhost:44323/user/register",{
                                         email: email,
                                         password: password,
                                         first_Name: firstName,
                                         last_Name: lastname,
                                         gender: gender
                                     })
                                         .then(response=>{
                                             console.log(response);
                                             window.location.href = '/login'
                                         })
                                         .catch(err=>{
                                             console.log(err);
                                         })
                                 }
                                 }
                            >
                                Sign in
                            </div>
                        </div>
                    </div>
                )}





            </div>
            {/*<section className="vh-100 gradient-custom">*/}
            {/*    <div className="container py-5 h-100">*/}
            {/*        <div className="row d-flex justify-content-center align-items-center h-100">*/}
            {/*            <div className="col-12 col-md-8 col-lg-6 col-xl-5">*/}
            {/*                <div className="card bg-dark text-white" style={{borderRadius: '16px'}}>*/}
            {/*                    <div className="card-body p-5 text-center">*/}

            {/*                        <div className="mb-md-5 mt-md-4 pb-5">*/}

            {/*                            <h2 className="fw-bold mb-2 ">Register</h2>*/}
            {/*                            <p className="text-white-50 mb-5">Please complete the form!</p>*/}

            {/*                            <Box sx={{*/}
            {/*                                display: 'flex',*/}
            {/*                                gap: 10*/}
            {/*                            }}>*/}
            {/*                                <CssTextField required label="First Name" id="FName"*/}
            {/*                                              sx={{input: {color: 'white'}, label: {color: 'gray'}}}*/}
            {/*                                              onChange={e => {*/}
            {/*                                                  setfirstName(e.target.value);*/}
            {/*                                              }}*/}
            {/*                                />*/}
            {/*                                <CssTextField required label="Last Name" id="LName"*/}
            {/*                                              sx={{input: {color: 'white'}, label: {color: 'gray'}}}*/}
            {/*                                              onChange={e => {*/}
            {/*                                                  setlastName(e.target.value);*/}
            {/*                                              }}/>*/}
            {/*                            </Box>*/}
            {/*                            <Box sx={{marginTop: 10}}>*/}
            {/*                                <CssTextField fullWidth required label="Email" id="Email"*/}
            {/*                                              sx={{input: {color: 'white'}, label: {color: 'gray'}}}*/}
            {/*                                              onChange={e => {*/}
            {/*                                                  setEmail(e.target.value);*/}
            {/*                                              }}*/}
            {/*                                />*/}
            {/*                            </Box>*/}
            {/*                            <Box sx={{marginTop: 10}}>*/}
            {/*                                <CssTextField fullWidth required type="password" label="Password"*/}
            {/*                                              id="Password"*/}
            {/*                                              sx={{input: {color: 'white'}, label: {color: 'gray'}}}*/}
            {/*                                              onChange={e => {*/}
            {/*                                                  setPassword(e.target.value);*/}
            {/*                                              }}*/}
            {/*                                />*/}
            {/*                            </Box>*/}
            {/*                            <Box>*/}
            {/*                                <FormControl component="fieldset">*/}
            {/*                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group"*/}
            {/*                                                onChange={e => {*/}
            {/*                                                    if (e.value === 'female') setGender(true)*/}
            {/*                                                    else setGender(false)*/}
            {/*                                                }}>*/}
            {/*                                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>*/}
            {/*                                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>*/}
            {/*                                    </RadioGroup>*/}
            {/*                                </FormControl>*/}
            {/*                            </Box>*/}


            {/*                            <Button class="btn btn-outline-light btn-lg px-5" type="submit"*/}
            {/*                            onClick={()=>{*/}
            {/*                                axios.post("https://localhost:44323/user/register",{*/}
            {/*                                    email: email,*/}
            {/*                                    password: password,*/}
            {/*                                    first_Name: firstName,*/}
            {/*                                    last_Name: lastname,*/}
            {/*                                    gender: gender*/}
            {/*                                })*/}
            {/*                                    .then(res =>{*/}
            {/*                                        console.log(res)*/}
            {/*                                        window.location.href = '/login'*/}
            {/*                                    })*/}
            {/*                                    .catch(err=>{*/}
            {/*                                        console.log(err)*/}
            {/*                                        alert('nu e bun')*/}
            {/*                                    })*/}
            {/*                            }}*/}
            {/*                            >Register</Button>*/}
            {/*                            <div className="d-flex justify-content-center text-center mt-4 pt-1">*/}
            {/*                                <IconButton aria-label="share">*/}
            {/*                                    <GoogleIcon style={{color: 'white'}}/>*/}
            {/*                                </IconButton>*/}
            {/*                                <IconButton aria-label="share">*/}
            {/*                                    <FacebookIcon style={{color: 'white'}}/>*/}
            {/*                                </IconButton>*/}
            {/*                                <IconButton aria-label="share">*/}
            {/*                                    <TwitterIcon style={{color: 'white'}}/>*/}
            {/*                                </IconButton>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div>*/}
            {/*                            <p className="mb-0">Have an account? <a href="login"*/}
            {/*                                                                    className="text-white-50 fw-bold">Login*/}
            {/*                                here</a></p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    );
}

export default Register;
