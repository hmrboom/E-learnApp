import React, {Component, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useMediaQuery, useTheme} from "@mui/material";
import axios from "axios";
import DrawerComponent from "../../Consumables/DrawerComponent";
import HeaderWith from "../HeaderWith";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import stronk from "../../Consumables/stronk.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import {CardActions, TextField,Container} from "@material-ui/core";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Slider from '@mui/material/Slider';
import Modal from "@mui/material/Modal";
import {ProgressBar} from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function CourseModify(props) {
   ///////////////////////////////AICI


    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [user,setUser] = useState('');
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [favorite,setFavorite] = useState(false);
    const [drop,setDrop] = useState(true);
    const [lessons,setLessons] = useState(0);
    const [module,setModule] = useState([]);
    const [mod,setMod] = useState([]);
    const [editable,setEditable] = useState(true)
    const [moduleName,setModuleName] = useState('');
    const [moduleDescr,setModuleDescr] = useState('');
    const [moduleLessonNumber,setModuleLessonNumber] = useState(0);
    const [coursePhoto,setCoursePhoto] = useState('');
    const [s,st] = useState('');


    useEffect( ()=>{
        let getUserReq =   axios.get("https://localhost:44323/user/getUser",
            { params: { id: location.state.UserId } }
        );
        let getModuleReq = axios.get("https://localhost:44323/api/Course/getCourseById",
            { params: { id: location.state.Id } }
        )
        axios.all([getUserReq,getModuleReq])
            .then(e=>{
                setUser(e[0].data)
                setModule(e[1].data)
                setMod(module)
                Object.freeze(mod)
            })




    },[])
    useEffect(()=>{
        let number = 0;

        module.Modules?.map(e=>{
            number = number+e.LessonNumber
        })
        setLessons(number)
    },[module])
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    function ChangePhoto({course}){
        const [moduleId, setModuleId] = useState('');
        const [lessonName, setlessonName] = useState('');
        const [liveStreamDate, setliveStreamDate] = useState(null);
        const [selectedFileVideo, setSelectedFileVideo] = useState(null);
        const [selectedFile, setSelectedFile] = useState(null);
        const [drop,setDrop] = useState(true);


        const handleClose = () => {
            setOpen(false);
        };

        const setModuleClick = (event) => {
            setModuleId(event.target.value);

        };
        return(
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500,height:500,display:'flex',flexDirection:'column',gap:1 }}>
                    <h2 id="child-modal-title" style={{ display:'flex',justifyContent: 'center'}}>Course Photo</h2>

                    <FormControl sx={{ width:'100%' }}>
                        <div>Photo file selector</div>
                        <input type="file" className="form-control profile-pic-uploader" onChange={e=>{
                            let ret  = e.target.value; //ssssssssssssssssssssssssssss
                            ret = ret.replace('C:\\fakepath\\','');
                            setSelectedFile(ret)
                        }} />

                    </FormControl>
                    <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
                        <Button onClick={()=>{
                            axios.post(process.env.REACT_APP_ADRESS + 'api/Course/coursePhotoModify',{
                                Id:course.Id,
                                coursePhoto:selectedFile
                            })
                                .then(res =>{
                                    alert("Photo updated successfully")
                                    setCoursePhoto("https://localhost:44323/api/Course/getFileById?file="+selectedFile)
                                    location.state.CoursePhoto = selectedFile
                                    setSelectedFile('');


                                    handleClose()
                                    // window.location.reload(false);


                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                        }}>Modify Photo</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>

                </Box>
            </Modal>
        )
    }

    return (
        <div>

            {isMatch ? <DrawerComponent /> : <HeaderWith />}
            <div
                className="background"
                style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:'space-between',
                    paddingRight:'30%'
                }}
            >
                <div
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "white",
                        display: "flex",
                        marginLeft: 100,
                        flexDirection: "column",

                    }}
                >
                    {location.state.CourseName}
                    <h6>Short Description</h6>
                    <div style={{ fontSize:14,fontWeight:1 }}>Created by {user.FirstName}</div>
                </div>

                <div style={{ display:'flex',flexDirection:'column',height:500 }}>
                    <Card  className="cardMain" sx={{ width:300,height:'auto',marginTop:20 }}>
                        {
                            coursePhoto && <CardMedia
                                component="img"
                                height="100"
                                src={coursePhoto}
                                component="img"
                                alt="Course photo"

                            /> || <CardMedia
                                component="img"
                                height="100"
                                src={"https://localhost:44323/api/Course/getFileById?file="+ module.CoursePhoto}
                                component="img"
                                alt="Course photo"

                            />
                        }




                        <CardContent>

                            <Typography variant="body" color="#595959">
                                <h2>{location.state.CoursePrice}€</h2>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ display:'flex',alignItems: 'center',gap:1}}>
                                <StarIcon sx={{ color: '#ffa200' }}/>
                                <StarIcon  sx={{ color: '#ffa200' }}/>
                                <StarIcon  sx={{ color: '#ffa200' }}/>
                                <StarIcon  sx={{ color: '#ffa200' }}/>
                                <StarIcon  sx={{ color: '#ffa200' }}/>
                                {location.state.CourseRating}
                                <div style={{ fontSize:12 }}> ({location.state.CourseRating})</div>

                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button sx={{ fontWeight:'bold',color:'gray' }}>Share</Button>
                            <Button sx={{ fontWeight:'bold',color:'gray' }}>Gift</Button>
                        </CardActions>
                    </Card>
                    <Button variant="contained" className="butonHeader" style={{ width:200,backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,height:'auto',marginLeft:50,marginTop:10 }} onClick={handleOpen}>Edit Course Photo</Button>
                    <ChangePhoto course={location.state}/>
                </div>
            </div>
            <div style={{ display: 'flex',flexDirection:'column',gap:100}}>
                <div style={{ display: 'flex',gap:15,alignItems: 'center'}}>
                <Card sx={{ width:650,height:'auto',display:'flex',marginTop:25,marginLeft:10 }}>
                    <CardContent>
                        <Typography>
                            <h4 style={{ fontWeight:'bold' }}>What you'll learn</h4>
                            <div style={{ fontSize:15 }}>{location.state.WhatLearning}</div>
                        </Typography>
                    </CardContent>
                </Card>
                    <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,height:'auto',marginTop:200 }} onClick={()=>{

                    }}>Edit</Button>
                </div>
                <div style={{ display: 'flex',gap:15,alignItems: 'center'}}>
                <Card sx={{ width:650,height:'auto',display:'flex',marginTop:0,marginLeft:10 }}>
                    <CardContent>
                        <Typography>
                            <h4 style={{ fontWeight:'bold' }}>Requirements</h4>
                            <div style={{ fontSize:15 }}>{location.state.CourseRequirement}</div>
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,height:'auto'}} onClick={()=>{

                }}>Edit</Button>
                </div>
                <div style={{ display: 'flex',gap:15,alignItems: 'center'}}>
                <Card sx={{ width:650,height:'auto',display:'flex',marginTop:0,marginLeft:10 }}>
                    <CardContent>
                        <Typography>
                            <h4 style={{ fontWeight:'bold' }}>Description</h4>
                            <div style={{ fontSize:15 }}>{location.state.CourseDescription}</div>
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,height:'auto' }} onClick={()=>{

                }}>Edit</Button>
                </div>
                <div style={{ display: 'flex',gap:15,alignItems: 'center'}}>
                <Card sx={{ width:650,height:'auto',display:'flex',marginTop:0,marginLeft:10,marginBottom:10 }}>
                    <CardContent>
                        <Typography>
                            <h4 style={{ fontWeight:'bold' }}>Course Content</h4>
                            <div style={{ display:'flex',flexDirection:'row',gap:10 }}>
                                <div style={{ fontSize:14 }}>{location.state.CourseModulesNumber}-Modules</div>
                                <div style={{ fontSize:14 }}> {lessons}-Lessons</div>
                            </div>
                        </Typography>
                        <div>
                            <div style={{ display:'flex' }}>

                                <div style={{ display:'flex',flexDirection:'column' }}>
                                    <div style={{ fontSize:18,fontWeight:'bold' }}>{
                                        module.Modules && <Child modules={module.Modules} drop={drop}/>
                                    }
                                    </div>

                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
                <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,height:'auto',}} onClick={()=>{
                        setEditable(!editable)
                }}>{editable ? (
                    <div>Edit</div>
                ):(
                    <div>Stop Edit</div>
                )}</Button>
                </div>
                <div style={{ display:'flex',justifyContent: 'center',marginBottom:100}}>
                    {editable ? (
                        <div></div>
                    ):(
                        <Container maxWidth="lg">
                        <Box sx={{ borderStyle:'solid',borderWidth:1,display:'flex', width:'auto',height: 'auto', borderRadius:15,marginTop:10,marginBottom:10,flexDirection:'column' }}>
                            <h3 style={{ display:'flex',justifyContent: 'center'}}>
                                Modules Edit
                            </h3>

                            <div style={{ display:'flex',flexDirection:'column',gap:20,marginLeft:15,marginRight:15,marginBottom:25}}>
                                <FormControl sx={{ width:'50%' }}>
                                     <TextField multiline rows={1} maxRows={3}  id="standard-basic" label="Module Name" variant="standard" onChange={e=>{
                                    setModuleName(e.target.value)
                                    }} />
                                </FormControl>
                                <FormControl sx={{ width:'50%' }}>
                                     <TextField multiline rows={2} maxRows={5}  id="standard-basic" label="Module Description" variant="standard" onChange={e=>{
                                    setModuleDescr(e.target.value)
                                     }}/>
                                </FormControl>
                                <div style={{ display:'flex',gap:15 }}>
                                    <div>Lesson Number</div>
                                    <Slider
                                        size="md"
                                        defaultValue={0}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        sx={{ width:150 }}
                                        max={15}
                                        onChange={(e)=>{
                                            setModuleLessonNumber(e.target.value)
                                        }}
                                    />
                                    <div>{moduleLessonNumber}</div>
                                </div>
                                <div style={{display:'flex',justifyContent:'center' }}>
                                    <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,height:'auto',width:'25%',}} onClick={()=>{
                                        axios.post(process.env.REACT_APP_ADRESS + 'api/Course/module',{
                                            module_name:moduleName,
                                            module_description:moduleDescr,
                                            lesson_number:moduleLessonNumber,
                                            courseId:location.state.Id


                                        })
                                            .then(res =>{
                                                alert("Modul Creat")
                                                setModuleName('');
                                                setModuleLessonNumber(0);
                                                setModuleDescr('');
                                                window.location.reload(false);


                                            })
                                            .catch(err=>{
                                                console.log(err)
                                            })
                                    }}>Save </Button>
                                </div>

                            </div>


                        </Box>
                        </Container>
                    )}
                </div>

            </div>
            {
                isMatch ? (
                        <div style={{ width:'100%', backgroundColor:'#5a4e8c',height:'auto',paddingTop:'80px' }}>
                            <div style={{ display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
                                <div style={{ display:'flex',flexDirection:'column',paddingLeft:30 }}>
                                    <h3 style={{color:'white' }}>E-Learn</h3>
                                    <p style={{ color:'#b8b1d6',fontWeight:300 }}>Ceva citat emoteonal de plangem toti</p>
                                    <div style={{ display:'flex',flexDirection:'row',gap:5 }}>
                                        <FacebookIcon className="icons"/>
                                        <TwitterIcon className="icons"/>
                                    </div>

                                </div>
                            </div>

                        </div>
                    ):
                    (
                        <div style={{ width:'100%', backgroundColor:'#5a4e8c',height:'auto',paddingTop:'80px' }}>
                            <div style={{ display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                                <div style={{ display:'flex',flexDirection:'column',paddingLeft:30 }}>
                                    <h3 style={{color:'white' }}>E-Learn</h3>
                                    <p style={{ color:'#b8b1d6',fontWeight:300 }}>Ceva citat emoteonal de plangem toti</p>
                                    <div style={{ display:'flex',flexDirection:'row',gap:5 }}>
                                        <FacebookIcon className="icons"/>
                                        <TwitterIcon className="icons"/>
                                    </div>

                                </div>
                                <div style={{ display:'flex', flexDirection:'column',gap:10 }}>
                                    <a href="/Home" style={{ color:'#b8b1d6',fontWeight:300 }}>About</a>
                                    <a href="/Home" style={{ color:'#b8b1d6',fontWeight:300 }}>Communication</a>
                                    <a href="/Home" style={{ color:'#b8b1d6',fontWeight:300 }}>Contact</a>
                                </div>
                                <div style={{ display:'flex', flexDirection:'column',gap:10,paddingRight:30 }}>
                                    <a href="/Home" style={{ color:'#b8b1d6',fontWeight:300 }}>My Account</a>
                                    <a href="/Home" style={{ color:'#b8b1d6',fontWeight:300 }}>Sign In</a>
                                    <a href="/Home" style={{ color:'#b8b1d6',fontWeight:300 }}>Sign Out</a>
                                </div>
                            </div>

                        </div>
                    )
            }
        </div>
    );
}
function Child({ modules }) {
    const [moduleId, setModuleId] = useState('');
    const [lessonName, setlessonName] = useState('');
    const [liveStreamDate, setliveStreamDate] = useState(null);
    const [selectedFileVideo, setSelectedFileVideo] = useState(null);
    const [selectedFilePdf, setSelectedFilePdf] = useState(null);
    const [drop,setDrop] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const createLesson = (moduleId) =>{

    }
    const setModuleClick = (event) => {
        setModuleId(event.target.value);

    };


    return (
        <>
            {modules.map(item => {
                return(<div style={{ display:'flex',marginTop:10 }}>
                        {
                            drop ? (
                                <ArrowDropDownIcon style={{ marginTop:2,cursor:'pointer' }} onClick={()=>
                                {
                                    setDrop(!drop)
                                }}/>
                            ):(
                                <ArrowDropUpIcon style={{ marginTop:2,cursor:'pointer' }} onClick={()=>{
                                    setDrop(!drop)
                                }}/>
                            )

                        }
                        <div style={{ display:'flex',flexDirection:'column',width:'auto',gap:0 }}>
                            <div key={item.Id} style={{ display:'flex' }}>
                                <div>
                                    {item.ModuleName}
                                </div>
                                <div style={{ paddingLeft:400,position:'absolute'}}>
                                    <Button  variant="contained" className="butonHeader" size="small" style={{ display:'flex', alignSelf:'flex-end',backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,height:'auto'}}
                                    onClick={handleOpen}>
                                    New Lesson
                                    </Button>

                                    <Modal

                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="child-modal-title"
                                        aria-describedby="child-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 500,height:500,display:'flex',flexDirection:'column',gap:1 }}>
                                            <h2 id="child-modal-title" style={{ display:'flex',justifyContent: 'center'}}>Lesson Create</h2>
                                            <FormControl sx={{ width:'100%' }}>
                                                <TextField multiline rows={1} maxRows={2}  id="standard-basic" label="Lesson Name" variant="standard" onChange={e=>{
                                                    setlessonName(e.target.value);
                                                }}/>
                                            </FormControl>
                                            <FormControl sx={{ width:'100%' }}>
                                                <div>PDF file selector</div>
                                                <input type="file" className="form-control profile-pic-uploader" onChange={e=>{
                                                    let ret  = e.target.value; //ssssssssssssssssssssssssssss
                                                    ret = ret.replace('C:\\fakepath\\','');
                                                    setSelectedFilePdf(ret)
                                                }} />

                                            </FormControl>
                                            <FormControl sx={{ width:'100%' }}>
                                                <div>Video file selector</div>
                                                <input type="file" className="form-control profile-pic-uploader" onChange={e=>{
                                                    let ret  = e.target.value; //ssssssssssssssssssssssssssss
                                                    ret = ret.replace('C:\\fakepath\\','');
                                                    setSelectedFileVideo(ret)
                                                }}/>
                                            </FormControl>
                                            <FormControl sx={{ width:200, }}>
                                                <InputLabel id="demo-simple-select-label">Module</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={moduleId}
                                                    label="Category"
                                                    defaultValue = ""
                                                    onChange={setModuleClick}

                                                >
                                                    {
                                                        modules.map(mod => {
                                                            return(
                                                                <MenuItem value={mod.Id} key={mod.Id}>{mod.ModuleName}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                            <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
                                                <Button onClick={()=>{
                                                    axios.post(process.env.REACT_APP_ADRESS + 'api/Course/lessonCreate',{
                                                        lessonName:lessonName,
                                                        pdfPath:selectedFilePdf,
                                                        videoPath:selectedFileVideo,
                                                        moduleId:moduleId,
                                                        liveStreamDate:liveStreamDate


                                                    })
                                                        .then(res =>{
                                                            alert("Lesson created successfully")
                                                            console.log(item.Id)
                                                            setlessonName('');
                                                            setliveStreamDate(null);
                                                            setSelectedFileVideo(null);
                                                            setSelectedFilePdf(null);
                                                            setModuleId('');
                                                            handleClose()
                                                            window.location.reload(false);


                                                        })
                                                        .catch(err=>{
                                                            console.log(err)
                                                        })
                                                }}>Create Lesson</Button>
                                                <Button onClick={handleClose}>Close</Button>
                                            </div>

                                        </Box>
                                    </Modal>

                                </div>

                            </div>
                            {
                                drop ? (
                                    <div></div>
                                ):(

                                    item.Lessons.map(l=>{
                                        return <li style={{ fontSize:16,fontWeight:'normal' }}>{l.LessonName}</li>
                                    })
                                )
                            }
                        </div>
                    </div>
                )}
            )}

        </>
    );
}


export default CourseModify;
