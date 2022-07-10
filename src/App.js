import {CardActions, Button,Card, CardContent, CardMedia, Typography, useMediaQuery,useTheme} from "@mui/material";
import './cssStyle/styleSheet.css';
import CourseCard from "./Consumables/CourseCard";
import HeaderW from "./Components/HeaderW";
import DrawerComponent from "./Consumables/DrawerComponent";
import stronk from "./Consumables/laptop.jpg";
import search from "./Consumables/search.png";
import React, {useState} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {createTheme} from "@material-ui/core";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CourseCardL from "./Consumables/CourseCardL";
import piton from "./Consumables/piton.png";
import react from "./Consumables/react.png";
import node from "./Consumables/node.jpg";
import js from "./Consumables/js.jpeg";
function App() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 1100,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
    const [courses,setCourses] = useState()
    const [coursesNumber,setCoursesNumber] = useState(0)

    axios.get(process.env.REACT_APP_ADRESS + 'api/Course/getCourses')
        .then(response=>{
            setCourses(response.data)
        })
        .catch(err=>{
            console.log(err)
        })


    return (
        <>

        {isMatch ? <DrawerComponent/>: (
            <HeaderW/>
        )}
            {/* <HeaderW/> */}
            {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
            {/*    <Card sx={{Width: 650}}>*/}
            {/*        <CardMedia*/}
            {/*            component="img"*/}
            {/*            height="150"*/}
            {/*            image="https://cdn1.euraxess.org/sites/default/files/styles/teaser_text_image/public/euraxess/photo-gallery/hrpic.jpg?itok=KwPhW_Tn"*/}
            {/*            alt="e-learn-Poza"*/}
            {/*        />*/}
            {/*        <CardContent>*/}
            {/*            <Typography gutterBottom variant="h5" component="div" className="ceva">*/}
            {/*                Welcome*/}
            {/*            </Typography>*/}
            {/*            <Typography variant="body2" color="text.secondary">*/}


            {/*                Welcome, it is time to learn, you can look at our E-learning Website with over 6000 courses*/}
            {/*            </Typography>*/}
            {/*        </CardContent>*/}
            {/*        <CardActions>*/}
            {/*            <Button size="small" href="login">Sign In Now</Button>*/}
            {/*        </CardActions>*/}
            {/*    </Card>*/}
            {/*</div>*/}
            {/*<div style={{ marginTop:100  }}>*/}
            {/*    <Card sx={{ }} className="cardContainer">*/}

            {/*        <Card sx={{ }} className="cardContainer">*/}
            {/*            {*/}
            {/*                courses?.map(c =>{*/}
            {/*                    return(*/}
            {/*                        <CourseCard key={c.Id} rating={c.CourseRating} title={c.CourseName} description={c.CourseDescription} short={c.WhatLearning} image="https://www.nascenia.com/wp-content/uploads/2018/04/React-JS.jpg"/>*/}
            {/*                    )*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </Card>*/}


            {/*    </Card>*/}
            {/*    <CardActions>*/}
            {/*        <Button variant="contained" size="small">More Courses</Button>*/}
            {/*    </CardActions>*/}

            {/*</div>*/}

                {
                    isMatch ? (
                        <div style={{ backgroundColor:'#5a4e8c' ,width:'100%',height:'300px',color:'white',justifyContent: 'center',alignItems:'center',flexDirection:'column'}}>
                            <h1> Learn new skills online</h1>
                            <p> Learn 100% free</p>
                            <div style={{ display: 'flex',flexDirection:'row', width:'auto'}}>
                                <Form.Control
                                    type="text"
                                    id="inputText"
                                    aria-describedby="passwordHelpBlock"
                                    style={{ width:500,height:50, }}
                                    placeholder="What do you want to learn?"
                                />
                                 <Button variant="danger" style={{ backgroundColor:'#ea5252' }}><img src={search} width={25} style={{ backgroundColor:'#ea5252' }} /></Button>
                            </div>
                        </div>
                    ):(
                        <div style={{ display: 'flex',height: '550px'}}>
                            <div style={{ backgroundColor:'#5a4e8c' ,width:'50%',color:'white', display:'flex',justifyContent: 'center',alignItems:'center',flexDirection:'column'}}>
                                <h1> Learn new skills online</h1>
                                <p> </p>
                                <div style={{ display: 'flex',flexDirection:'row', width:'auto'}}>
                                    <Form.Control
                                        type="text"
                                        id="inputText"
                                        aria-describedby="passwordHelpBlock"
                                        style={{ width:500,height:50, }}
                                        placeholder="What do you want to learn?"
                                    />
                                    <Button variant="danger" style={{ backgroundColor:'#ea5252' }}><img src={search} width={25} style={{ backgroundColor:'#ea5252' }} /></Button>
                                </div>
                            </div>
                            <div style={{ width:'50%',maxWidth:'50%' }}>
                                <img src={stronk} style={{ width:'100%',height:'100%' }} />
                            </div>
                        </div>
                    )
                }
                <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center',alignItems:'center', paddingTop:100 }}>
                    <h2> Recent courses </h2>
                    {
                        isMatch ? (
                                <Slider {...settings} style={{ maxWidth:'90%'}}>
                                    <div>
                                        <div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}> <div style={{ width:'100%'  }}><CourseCard/> </div> </div>

                                    </div>
                                    <div>
                                        <h3>2</h3>
                                    </div>
                                </Slider>
                        ):
                            (
                                <Slider {...settings} style={{ maxWidth:'90%'}}>
                                    <div>
                                        {/*<CourseCardL name={enroll.Course.CourseName} userName="TEST" price={enroll.Course.CoursePrice} score={enroll.Course.CourseRating} rating={enroll.Course.CourseRating}/>*/}

                                        <div style={{ display:'flex',flexDirection:'row',gap:10}}>
                                            {
                                                courses && <CoursesMap courses={courses}/>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display:'flex',flexDirection:'row',gap:10}}>
                                            <div style={{ width:'25%' }}><CourseCard/></div>
                                            <div style={{ width:'25%' }}><CourseCard/></div>
                                            <div style={{ width:'25%' }}><CourseCard/></div>
                                            <div style={{ width:'25%' }}><CourseCard/></div>
                                        </div>
                                    </div>
                                </Slider>
                            )
                    }

                    {
                        isMatch ? (
                                <div style={{ width:'100%', backgroundColor:'#5a4e8c',height:'auto',paddingTop:'80px' }}>
                                    <div style={{ display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
                                        <div style={{ display:'flex',flexDirection:'column',paddingLeft:30 }}>
                                            <h3 style={{color:'white' }}>E-Learn</h3>
                                            <p style={{ color:'#b8b1d6',fontWeight:300 }}>Ceva citat</p>
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
                                            <p style={{ color:'#b8b1d6',fontWeight:300 }}>Ceva citat</p>
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




        </>
    );
}
function CoursesMap({courses}){
    let counter = 0
    let poza
    return(<>
        {
    courses?.map(c => {
        if (counter != 4) {
            if(counter == 0)poza=react
            if(counter == 1)poza=node
            if(counter == 2)poza=piton
            if(counter == 3)poza=js
            counter++
            return (<div style={{width: '25%'}}>
                    <CourseCardL key={c.Id} name={c.CourseName} userName="TEST" price={c.CoursePrice}
                                 score={c.CourseRating} rating={c.CourseRating} image={poza}/>
                </div>
            )
        }


    })
}
        </>
    )
}

export default App;
