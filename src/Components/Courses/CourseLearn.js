import React, {useContext, useEffect, useState,} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useMediaQuery, useTheme} from "@mui/material";
import DrawerComponent from "../../Consumables/DrawerComponent";
import HeaderWith from "../HeaderWith";
import  ReactPlayer from 'react-player'
// import { Player } from 'video-react';
import axios from "axios";
import fileUrl from "file-url";
import { Player, Video, DefaultUi } from '@vime/react';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import '../../cssStyle/styleSheet.css'
import {Document, Page} from "react-pdf";
// import {Viewer, Worker} from "@react-pdf-viewer/core";
//
// // Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
//
// // Import styles
// import '@react-pdf-viewer/core/lib/styles/index.css';

// Create new plugin instance
import licenta from "./LicentaBun.pdf";

import PDF from 'react-pdf-js';
import PdfView from "./PdfView";

export let arrayLesson
export function CourseLearn(props) {
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const params = useParams();
    const location = useLocation();
    const theme = useTheme();
    const [pathURLVIDEO,setPathURLVIDEO] = useState(null)
    const [pathURLPDF,setPathURLPDF] = useState(null)
    const [course,setCourse] = useState([])
    const [ceva,setceva] = useState(null)
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [drop,setDrop] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [lessonActive, setLessonActive] = useState(null);
    const [section, setSection] = useState(true);
    const [user, setUser] = useState('');
    useEffect(()=>{
         let crs =  axios.get('https://localhost:44323/api/Course/getCourseById',
               {params:{ id:location.state.Id }})
               // .then(res=>{
               //     setCourse(res.data)
               //
               // })
       let usr = axios.get('https://localhost:44323/user/getUser',
            {params:{id:location.state.UserId}})
            // .then(res=>{
            //     setUser(res.data)
            // })
        axios.all([crs,usr])
            .then(e=>{
                setCourse(e[0].data)
                setUser(e[1].data)
            })
    },[])
    useEffect(()=>{

    })

     const handleClick = (param) => {

        arrayLesson = param
         setPathURLVIDEO("https://localhost:44323/api/Course/getFileById?file="+arrayLesson.LessonVideoPath)

    };
    const handleClickpdf = (param) => {

console.log(param.LessonPdf)
        setPathURLPDF("https://localhost:44323/api/Course/getFileById?file="+param.LessonPdf)
        console.log(pathURLPDF)

    };
    function ModulesMapping({modules,props}){

        return(
            <div style={{ display:'flex',flexDirection:'column',marginLeft:15 }}>
                <div className="stil" style={{ color:'red',fontSize:40,fontWeight:'bold' }}>Course Content</div>
                {
                    modules.map(mod=>{


                        return(
                            <div>
                                <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
                                    <div className="stil" style={{ fontSize:22,fontWeight:'bold' }}>
                                       {mod.ModuleName}
                                    </div>

                                </div>

                                {
                                    mod.Lessons.map(les=>{

                                        return(

                                            <li className="lessonsStyle" id={les.Id} key={les.Id} style={{ marginLeft:30,cursor:'pointer',fontSize:20 }} onClick={ev => {
                                                handleClick(les)
                                                handleClickpdf(les)
                                            }}>
                                                {les.LessonName}
                                            </li>
                                        )
                                    })
                                }
                            </div>
                        )

                    })
                }
            </div>
        )
    }

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <div>
            {isMatch ? <DrawerComponent /> : <HeaderWith />}
            <div style={{ width: "100%", height: "100%", display:'flex',flexDirection:'column' }}>
                <div className="background" style={{ width:'100%',height:'50%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems: 'center'}}>
                    <div style={{ height:"100%",width:'60%',display:'flex', }}>
                        {
                            pathURLVIDEO ? ( <ReactPlayer
                                controls
                                width={'100%'}
                                url={pathURLVIDEO}

                            />):(
                                <ReactPlayer
                                    controls
                                    width={'100%'}
                                    url={pathURLVIDEO}

                                />
                            )
                        }

                    </div>




                </div>
                <div style={{ display:'flex',flexDirection:'row',width:"100%",backgroundColor:'rgba(236,215,250,0.48)' }}>
                    <div style={{ width:'50%',height:'50%',display:'flex',marginLeft:10, borderWidth:3,borderStyle:'solid'}}>
                        <div>
                        {
                            course.Modules && <ModulesMapping modules={course.Modules}/>
                        }
                    <   /div>
                    </div>
                    <div style={{ width:'50%',height:'850px',display:'flex', borderWidth:3,borderStyle:'solid',marginRight:10,marginBottom:10,flexDirection:'column' }}>
                        <div style={{ display:'flex',gap:40,marginLeft:15 }}>
                            <div className="stil" style={{ color:'red',fontSize:40,fontWeight:'bold',cursor:'pointer', }} onClick={()=>setSection(!section)}>
                                Overview
                            </div>
                            <div className="stil" style={{ color:'red',fontSize:40,fontWeight:'bold',cursor:'pointer' }} onClick={()=>setSection(!section)}>
                                Learning Tools
                            </div>

                        </div>
                        <div>
                            {
                                section ? (
                                    <div style={{ display:'flex', flexDirection:'column',gap:20,marginLeft:15 }}>
                                        <div style={{ fontSize:25, fontWeight:'bold',marginTop:20 }}>
                                            Name: {course.CourseName}
                                        </div>
                                        <hr />
                                        <div style={{  }}>
                                            <div style={{ fontSize:25, fontWeight:'bold' }}>
                                                Description:
                                            </div>
                                            <div> {course.CourseDescription} </div>
                                        </div>
                                        <hr/>
                                        <div>
                                            <div style={{ fontSize:25, fontWeight:'bold' }}>
                                                Instructor:
                                            </div>
                                            <div>
                                                {user.FirstName} {user.LastName}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize:25, fontWeight:'bold' }}>
                                             What will you learn:
                                            </div>
                                            <div>
                                                {course.WhatLearning}
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <div style={{  }}>
                                        {
                                            pathURLPDF ? (
                                                <div style={{ display: 'flex',justifyContent: 'center'}}>
                                                    {/*<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">...</Worker>*/}
                                                    {/*<Viewer*/}
                                                    {/*    fileUrl={pathURLPDF}*/}
                                                    {/*/>*/}
                                                    {/*<Document*/}
                                                    {/*    file={`data:application/pdf;base64,${licenta}`}*/}
                                                    {/*    options={{ workerSrc: "/pdf.worker.js" }}*/}
                                                    {/*    onLoadSuccess={onDocumentLoadSuccess}*/}
                                                    {/*>*/}
                                                    {/*    <Page pageNumber={pageNumber} />*/}
                                                    {/*</Document>*/}
                                                    {/*<div>*/}
                                                    {/*    <p>*/}
                                                    {/*        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}*/}
                                                    {/*    </p>*/}
                                                    {/*    <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>*/}
                                                    {/*        Previous*/}
                                                    {/*    </button>*/}
                                                    {/*    <button*/}
                                                    {/*        type="button"*/}
                                                    {/*        disabled={pageNumber >= numPages}*/}
                                                    {/*        onClick={nextPage}*/}
                                                    {/*    >*/}
                                                    {/*        Next*/}
                                                    {/*    </button>*/}
                                                    {/*</div>*/}

                                                    <PdfView file={pathURLPDF}/>
                                                </div>

                                            ):(
                                                <div></div>
                                            )
                                        }

                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default CourseLearn;

