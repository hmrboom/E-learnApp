import React, {useEffect, useState} from 'react';
import {useMediaQuery, useTheme} from "@mui/material";
import DrawerComponent from "../../Consumables/DrawerComponent";
import HeaderW from "../HeaderW";
import HeaderWith from "../HeaderWith";
import axios from "axios";
import CourseCardL from "../../Consumables/CourseCardL";
import Button from "@mui/material/Button";
function CourseWishList({ceva}) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [user,setUser] = useState('');
    const [userFull,setUserFull] = useState({});

    useEffect(()=>{
        setTimeout(() => {
        let ceva = user
        if(localStorage.getItem('token')){
            ceva = parseJwt(localStorage.getItem('token'))
        }
         else {
            setUser(parseJwt(sessionStorage.getItem('token')));
        }
            axios.get("https://localhost:44323/user/getUser",
                { params: { id: ceva.Id } }
            )
                .then(e=>{
                   setUser(e.data)

                })
                .catch(err=>{
                    console.log(err)
                })

        }, 1000);
        console.log(user)


    },[])

    return (
        <div>
            {isMatch ? <DrawerComponent /> : <HeaderWith />}

            {
                user?.WishLists && <Wish wishlist={user.WishLists}/>
            }
            <Button sx={{ backgroundColor:'aqua' }} onClick={()=>{

            }}>Buy</Button>

        </div>
    );
}
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
function Wish({wishlist}){

return(
    <div style={{ display: 'flex', gap:30}}>
    {
        wishlist.map(course=>{
            return(
                <div key={course.Id} style={{ display: 'flex' }}>
                <CourseCardL name={course.Course.CourseName} userName="TEST" price={course.Course.CoursePrice} score={course.Course.CourseRating} rating={course.Course.CourseRating}/>
                </div>
                    )
        })
    }
    </div>
);

}

export default CourseWishList;
