import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
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
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
function CoursePage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [user,setUser] = useState('');
    const [currentuser,setCurrentUser] = useState('');
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [favorite,setFavorite] = useState(false);
    const [drop,setDrop] = useState(true);
    const [lessons,setLessons] = useState(0);
    const [module,setModule] = useState([]);
    const [mod,setMod] = useState([]);
    const [added,setAdded] = useState(false);
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
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    useEffect(()=>{
        setTimeout(() => {

            if(localStorage.getItem('token')){
                setCurrentUser(parseJwt(localStorage.getItem('token')))
            }
            else {
                setCurrentUser(parseJwt(sessionStorage.getItem('token')));
            }


        }, 1000);



    },[])
    const addToCard = ()=>{
        axios.post('https://localhost:44323/api/Course/goToWishlist', {
                userId:currentuser.Id,
                courseId:location.state.Id
                })
            .then(res =>{
                console.log(currentuser)
                alert('added to cart')
                console.log(res)
                setAdded(true);
            })
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
                    <div style={{ fontSize:14,fontWeight:1 }}>Created by {user.LastName} {user.FirstName} </div>
                </div>

                <div style={{ }}>
                    <Card  className="cardMain" sx={{ width:300,height:'auto',marginTop:20,marginLeft:20 }}>
                        <CardMedia
                            component="img"
                            height="100"
                            src={"https://localhost:44323/api/Course/getFileById?file="+location.state.CoursePhoto}
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
                            {/*{*/}
                            {/*    added ? (*/}
                            {/*        <Button className="buttonCart" size="medium" sx={{ width:180,height:50,color:'white',backgroundColor:'green',fontWeight:'bold' }} onClick={()=>{*/}


                            {/*        }}>Go to Cart</Button>*/}
                            {/*    ):(*/}
                            {/*        <Button className="buttonCart" size="medium" sx={{ width:180,height:50,color:'white',backgroundColor:'green',fontWeight:'bold' }} onClick={addToCard}>Add to Cart</Button>*/}
                            {/*    )*/}
                            {/*}*/}
                            <Button className="buttonCart" size="medium" sx={{ width:180,height:50,color:'white',backgroundColor:'green',fontWeight:'bold' }} onClick={addToCard}>Add to Cart</Button>

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

                                <div style={{ display:'flex',flexDirection:'column' }}>
                                    <div style={{ fontSize:18,fontWeight:'bold' }}>{
                                        module.Modules && <Child modules={module.Modules} drop={drop}/>
                                    }</div>

                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

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
    const [drop,setDrop] = useState(true);


    return (
        <>
            {modules.map(item => {
                return(<div style={{ display:'flex' }}>
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
                       <div key={item.Id}>{item.ModuleName}</div>
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

export default CoursePage;
