import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import '../cssStyle/styleSheet.css';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import cart from "../Consumables/shopping-cart.png";
import {useNavigate} from "react-router-dom";
function HeaderWith({name,shoppingCartNumber}) {
    const [categories,setcategories] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const [user,setUser] = useState('')
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



    },[])
    const hideDropdown = e => {
        setShow(false);
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_ADRESS + 'api/Course/getCategories')
            .then(response=>{
                setcategories(response.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[]);

    return (
        <>
            <>
                <Navbar  variant="dark" className="navbarStyle">
                    <Container style={{ display:'flex', paddingLeft:2 }}>
                        <Navbar.Brand style={{ fontSize:26, color:'#5a4e8c' }} href="/start">E-Learn</Navbar.Brand>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                style={{ width:250, borderRadius:15 }}
                            />
                        </Form>
                        <Nav className="me-auto" style={{ paddingLeft:100,gap:15 }}>

                            <Nav.Link  style={{ color:'#5a4e8c' }} href="/start"> Home </Nav.Link>


                            <NavDropdown title={
                                <span style={{ color:'#5a4e8c' }} onClick={()=>{
                                    window.location.href="/course-browse"
                                }}>Course Categories</span>
                            } id="collasible-nav-dropdown"
                                         show={show}
                                         onMouseEnter={showDropdown}
                                         onMouseLeave={hideDropdown} >
                                {
                                    categories.map( e =>{
                                        return(
                                            <NavDropdown title={<span style={{ color:'#5a4e8c' }}>{e.CategoryName}</span>} key={e.Id} id="collasible-nav-dropdown-end"   drop={'end'} >
                                                {
                                                    e.SubCategories.map(sub => {
                                                        return(
                                                            <NavDropdown.Item key={sub.Id} href="#action/3.2" style={{ color:'#5a4e8c' }}>{sub.SubCategoryName}</NavDropdown.Item>
                                                        )
                                                    })
                                                }
                                            </NavDropdown>
                                        );
                                    })
                                }
                            </NavDropdown>
                            <Nav.Link  style={{ color:'#5a4e8c' }}> About </Nav.Link>
                            <Nav.Link  style={{ color:'#5a4e8c' }}> Contact </Nav.Link>
                            <Nav.Link  style={{ color:'#5a4e8c' }}  onClick={()=>{

                                    navigate('/profile-modify');

                            }}> Profile </Nav.Link>
                            <Nav.Link  style={{ color:'#5a4e8c' }}  onClick={()=>{
                                if(localStorage.getItem('token')){
                                    navigate('/my-courses/'+localStorage.getItem('token'));
                                }
                                else  navigate('/my-courses/'+sessionStorage.getItem('token'));

                            }}> My Courses </Nav.Link>

                        </Nav>
                        <Stack spacing={3} direction='row'>
                            <Avatar sx={{ width:35,height:35,backgroundColor:'#3e4143',fontSize:50 }} src={"https://localhost:44323/api/Course/getFileById?file="+user.ProfilePhoto}>H</Avatar>
                            <img src={cart} style={{ width:25,height:35,paddingTop:10,cursor:'pointer' }} alt="cart" onClick={()=>{
                                navigate('/user-wishlist');
                            }}/>
                            <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14 }} href="/Login" onClick={()=>{
                                localStorage.clear()
                                sessionStorage.clear()
                            }}>Log Out</Button>

                        </Stack>


                    </Container>
                </Navbar>
            </>

            {/*<Navbar bg="dark" variant="dark" className="navbarStyle">*/}
            {/*    <Container>*/}
            {/*        <Navbar.Brand style={{ fontSize:26 }} href="/start">E-Learn</Navbar.Brand>*/}
            {/*        <Nav className="me-auto">*/}
            {/*            <NavDropdown title="Course Categories" id="collasible-nav-dropdown" menuVariant={'dark'}>*/}
            {/*                {*/}
            {/*                    categories.map( e =>{*/}
            {/*                        return(*/}
            {/*                            <NavDropdown title={e.CategoryName} key={e.Id} id="collasible-nav-dropdown-end"  drop={'end'} menuVariant={'dark'}>*/}
            {/*                                {*/}
            {/*                                    e.SubCategories.map(sub => {*/}
            {/*                                        return(*/}
            {/*                                            <NavDropdown.Item key={sub.Id} href="#action/3.2">{sub.SubCategoryName}</NavDropdown.Item>*/}
            {/*                                        )*/}
            {/*                                    })*/}
            {/*                                }*/}
            {/*                            </NavDropdown>*/}
            {/*                        );*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </NavDropdown>*/}
            {/*            <NavDropdown title="Options" id="collasible-nav-dropdown" menuVariant={'dark'}>*/}
            {/*                <NavDropdown.Item  href="/courseCreation">Course Creation</NavDropdown.Item>*/}


            {/*            </NavDropdown>*/}
            {/*        </Nav>*/}

            {/*        <Form className="d-flex">*/}
            {/*            <FormControl*/}
            {/*                type="search"*/}
            {/*                placeholder="Search"*/}
            {/*                className="me-2"*/}
            {/*                aria-label="Search"*/}
            {/*            />*/}
            {/*            <Button variant="outline-success">Search</Button>*/}
            {/*        </Form>*/}
            {/*        <Button variant="text" style={{ color:'gray', marginLeft:10, fontSize:15 }}*/}
            {/*        onClick={()=>{*/}
            {/*            localStorage.clear()*/}
            {/*            sessionStorage.clear()*/}
            {/*            window.location.href="/"*/}
            {/*        }}*/}
            {/*        >Log Out</Button>*/}
            {/*        <Badge badgeContent={shoppingCartNumber} color="primary">*/}
            {/*             <ShoppingCartIcon sx={{color:'gray', cursor:'pointer'}} />*/}
            {/*        </Badge>*/}
            {/*        <Avatar sx={{ marginLeft:2, cursor:'pointer' }} onClick={()=>{*/}
            {/*            window.location.href="/profile"*/}
            {/*        }}>{name}</Avatar>*/}
            {/*    </Container>*/}
            {/*</Navbar>*/}
        </>
    );
}
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
export default HeaderWith;
