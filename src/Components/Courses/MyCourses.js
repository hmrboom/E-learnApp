import React, {useEffect, useState} from 'react';
import {useMediaQuery, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import DrawerComponent from "../../Consumables/DrawerComponent";
import CourseCardL from "../../Consumables/CourseCardL";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import HeaderWith from "../HeaderWith";
import axios from "axios";
import {Button} from "react-bootstrap";

function MyCourses(props) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const params = useParams();
    const [courses,setCourses] = useState([]);
    const [user,setUser] = useState('');
    useEffect(()=>{

            axios.get("https://localhost:44323/user/getUser",
                { params: { id: parseJwt(params.id).Id} }
            )
                .then(e=>{
                    setUser(e.data)

                })
                .catch(err=>{
                    console.log(err)
                })




    },[])
    useEffect(()=>{
        axios
            .get(process.env.REACT_APP_ADRESS + "api/Course/myCourses",{
                params: { id: parseJwt(params.id).Id }
            })
            .then((response) => {
                setCourses(response.data);
                console.log(params.id)
            })
            .catch((err) => {
                console.log(err);
            });
    },[])
    return (
        <div>
            {isMatch ? <DrawerComponent /> : <HeaderWith/>}

            <div
                className="background"
                style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "white",
                        display: "flex",
                        marginLeft: 100,
                    }}
                    className="stil"
                >
                    My Courses
                </div>
            </div>
            <div style={{ display: "flex",gap:'2%',flexDirection:'column'}}>
                <h2 style={{ display: "flex",justifyContent: 'center'}} className="stil">Courses Created by Me</h2>
                <div style={{ display: "flex",gap:'2%',justifyContent: 'center',flexDirection:'row'}}>
                    {console.log(courses)}
                {
                    courses?.map( c =>{
                        let imageC = "https://localhost:44323/api/Course/getFileById?file=" + c.CoursePhoto
                        return(
                            <div onClick={()=>{
                                navigate('/courseModify/'+c.Id,{state:c})


                            }}>
                                <CourseCardL image={imageC} name={c.CourseName} userName="TEST" price={c.CoursePrice} score={c.CourseRating} rating={c.CourseRating}>
                                </CourseCardL>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div style={{ display: "flex",gap:'2%',flexDirection:'column'}}>
                <h2 style={{ display: "flex",justifyContent: 'center'}} className="stil">My Enrolled Courses</h2>
                <div style={{ display: "flex",gap:'2%',justifyContent: 'center',flexDirection:'row'}}>
                    {
                       user.StudentEnrolments && <StudentCourses crs={user.StudentEnrolments}/>
                    }
                </div>
            </div>
            <div style={{ display: "flex",justifyContent: 'flex-start',flexDirection:'column'}}>
                Do you want to create a new course?
                <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,maxWidth:'12%' }} onClick={()=>{
                    navigate('/courseCreation')
                }}>Create Course</Button>
            </div>



            <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center',alignItems:'center', paddingTop:128 }}>


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
        </div>
    );
}
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
function StudentCourses({crs}){
    const navigate = useNavigate();
    return(<div style={{ display: 'flex', gap:10}}>
        {
            crs.map(enroll =>{
                let imageC = "https://localhost:44323/api/Course/getFileById?file=" + enroll.Course.CoursePhoto
               return(
                   <div key={enroll.Id} onClick={()=>{
                       navigate('/course-learn/'+enroll.Id,{state:enroll.Course})

                   }}>
                       <CourseCardL image={imageC} name={enroll.Course.CourseName} userName="TEST" price={enroll.Course.CoursePrice} score={enroll.Course.CourseRating} rating={enroll.Course.CourseRating}>
                       </CourseCardL>
                   </div>
               )
            })
        }
        </div>
    )
}
export default MyCourses;
