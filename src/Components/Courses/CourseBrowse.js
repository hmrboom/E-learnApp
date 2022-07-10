import React, { useEffect, useState } from "react";
import HeaderW from "../HeaderW";
import HeaderWith from "../HeaderWith";
import "../../cssStyle/styleSheet.css";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import DrawerComponent from "../../Consumables/DrawerComponent";
import axios from "axios";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import CourseCardL from "../../Consumables/CourseCardL";
import CourseCard from "../../Consumables/CourseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useNavigate} from "react-router-dom";
import react from "../../Consumables/react.png"
export default function CourseBrowse() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  var courseByCat = [];

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ADRESS + "api/Course/getCategories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  return (
    <div>
      {isMatch ? <DrawerComponent /> : verifyToken()}

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
          Courses
        </div>
      </div>
      
      {categories.map((cat) => {
        return (
          <div
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              display: "flex",
              justifyContent: "center",
              gap: 30,
              alignItems: "center",
                flexDirection:'row'
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 18 }} className="stil">
              {cat.CategoryName}
            </div>
              <div style={{ display: "flex",gap:'7%'}}>
              {
                  cat.Courses.map( c =>{
                      console.log(c)
                      let imageC = "https://localhost:44323/api/Course/getFileById?file=" + c.CoursePhoto
                      return(
                          <div onClick={()=>{
                              navigate('/course-page',{state:c});

                          }}>
                          <CourseCardL name={c.CourseName} userName="TEST" price={c.CoursePrice} score={c.CourseRating} rating={c.CourseRating} image={imageC}>
                          </CourseCardL>
                          </div>
                      )
                  })
              }
              </div>
          </div>
        );
      })}

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
function verifyToken(){
  let token = localStorage.getItem("token");
  let tokenS = sessionStorage.getItem("token")
  if(token == '' || tokenS == ''){ console.log(localStorage.getItem('token'))
    return <HeaderW/>}
    else return <HeaderWith/>
  
}
