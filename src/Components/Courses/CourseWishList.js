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
        let ceva
        if(localStorage.getItem('token')){
            ceva=parseJwt(localStorage.getItem('token'))
        }
         else {
            ceva=parseJwt(sessionStorage.getItem('token'))
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
        console.log(ceva)


    },[])
    const buyClick = (courseId) =>{
        axios.post('https://localhost:44323/api/Course/payCourse', {
            userId:user.Id,
            courseId:courseId,
            paymentTypeId: '8544561E-3692-49EF-A999-9FD65C726CFB'
        })
            .then(res =>{
                alert('payed successfully')
                 window.location.reload()
                console.log(res)
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
                    Cart
                </div>
            </div>
            <div style={{ display: 'flex',justifyContent: 'center',}}>
            {
                user?.WishLists && <Wish wishlist={user.WishLists}/>
            }
                {console.log(user)}


            </div>
            <div style={{ display:'flex',justifyContent:'center' }}>
                <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14,maxWidth:'12%' }} onClick={()=>{
                    if(user?.WishLists){
                        buyClick(user?.WishLists[0].CourseId)
                    }
                    else alert("Nothing to buy")
                }}>Enroll</Button>
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

function Wish({wishlist}){

return(
    <div style={{ display: 'flex', gap:30}}>
    {
        wishlist.map(course=>{
            let imageC = "https://localhost:44323/api/Course/getFileById?file=" + course.Course.CoursePhoto
            return(
                <div key={course.Id} style={{ display: 'flex' }}>
                <CourseCardL image={imageC} name={course.Course.CourseName} userName="TEST" price={course.Course.CoursePrice} score={course.Course.CourseRating} rating={course.Course.CourseRating}/>
                </div>
                    )
        })
    }
    </div>
);

}

export default CourseWishList;
