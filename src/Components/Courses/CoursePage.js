import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import DrawerComponent from "../../Consumables/DrawerComponent";
import "../../cssStyle/styleSheet.css";
import HeaderWith from "../HeaderWith";
import {useMediaQuery, useTheme} from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import stronk from "../../Consumables/stronk.png";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import CardContent from "@mui/material/CardContent";
import {CardActions} from "@material-ui/core";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
function CoursePage(props) {
    const location = useLocation();
    const theme = useTheme();
    const [user,setUser] = useState('');
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [favorite,setFavorite] = useState(false);
    const [drop,setDrop] = useState(false);
    const [lessons,setLessons] = useState(0);
    const [module,setModule] = useState([]);
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
            })




    },[])
    useEffect(()=>{
        let number = 0;
        module.Modules?.map(e=>{
           number = number+e.LessonNumber
        })
        setLessons(number)
    },[module])
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
                <div>
                    <Card sx={{ width:300,height:'auto',marginTop:20,marginLeft:20 }}>
                        <CardMedia
                            component="img"
                            height="100"
                            image={stronk}
                            alt="Course photo"

                        />
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
                            <Button className="buttonCart" size="medium" sx={{ width:180,height:50,color:'white',backgroundColor:'green',fontWeight:'bold' }}>Add to Cart</Button>
                            <IconButton aria-label="add to favorites">
                                {
                                    favorite ? (
                                        <FavoriteIcon onClick={()=>{
                                            setFavorite(false)
                                        }} />
                                    ):(
                                        <FavoriteBorderIcon onClick={()=>{
                                            setFavorite(true)
                                        }}/>
                                    )
                                }
                            </IconButton>
                        </CardActions>
                        <CardActions>
                            <Button sx={{ fontWeight:'bold',color:'gray' }}>Share</Button>
                            <Button sx={{ fontWeight:'bold',color:'gray' }}>Gift</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
            <div style={{ display: 'flex',flexDirection:'column',gap:100}}>
                <Card sx={{ width:650,height:'auto',display:'flex',marginTop:25,marginLeft:10 }}>
                    <CardContent>
                        <Typography>
                         <h4 style={{ fontWeight:'bold' }}>What you'll learn</h4>
                         <div style={{ fontSize:15 }}>{location.state.WhatLearning}</div>
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width:650,height:'auto',display:'flex',marginTop:0,marginLeft:10 }}>
                    <CardContent>
                        <Typography>
                            <h4 style={{ fontWeight:'bold' }}>Requirements</h4>
                            <div style={{ fontSize:15 }}>{location.state.CourseRequirement}</div>
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width:650,height:'auto',display:'flex',marginTop:0,marginLeft:10 }}>
                    <CardContent>
                        <Typography>
                            <h4 style={{ fontWeight:'bold' }}>Description</h4>
                            <div style={{ fontSize:15 }}>{location.state.CourseDescription}</div>
                        </Typography>
                    </CardContent>
                </Card>
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

                                <div style={{ display:'flex',flexDirection:'column' }}>
                                    <div style={{ fontSize:18,fontWeight:'bold' }}>{module?.Modules[0].ModuleName}</div>
                                {
                                    drop ? (
                                        <div></div>
                                    ):(
                                        <div style={{ display:'flex',paddingLeft:10}}>lectie</div>
                                    )
                                }
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

export default CoursePage;
