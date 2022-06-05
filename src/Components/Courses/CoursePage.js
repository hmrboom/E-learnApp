import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import DrawerComponent from "../../Consumables/DrawerComponent";
import "../../cssStyle/styleSheet.css";
import HeaderWith from "../HeaderWith";
import {useMediaQuery, useTheme} from "@mui/material";
import axios from "axios";


function CoursePage(props) {
    const location = useLocation();
    const theme = useTheme();
    const [user,setUser] = useState('');
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    useEffect( ()=>{
        axios.get("https://localhost:44323/user/getUser",
            { params: { id: location.state.UserId } }
            )
            .then(res=>{
                setUser(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])
    return (
        <div>
            {/*<div>{location.state.CourseName}</div>*/}
            {isMatch ? <DrawerComponent /> : <HeaderWith />}
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
                        flexDirection: "column",
                    }}
                >
                    {location.state.CourseName}
                    <h6>Short Description</h6>
                    <div style={{ fontSize:14,fontWeight:1 }}>Created by {user.FirstName}</div>
                </div>
            </div>
        </div>
    );
}

export default CoursePage;
