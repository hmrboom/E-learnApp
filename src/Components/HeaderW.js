import { Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import '../cssStyle/styleSheet.css';
import axios from "axios";
import {useEffect, useState} from "react";
import cart from '../Consumables/shopping-cart.png';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";


function HeaderW() {
    const [categories,setcategories] = useState([]);
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
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
            <Navbar  variant="dark" className="navbarStyle">
                <Container style={{ display:'flex', paddingLeft:2 }}>
                    <Navbar.Brand style={{ fontSize:26, color:'#5a4e8c' }} href="/">E-Learn</Navbar.Brand>
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

                        <Nav.Link  style={{ color:'#5a4e8c' }}> Home </Nav.Link>


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


                    </Nav>
                 <Stack spacing={3} direction='row'>
                     <img src={cart} style={{ width:25,height:35,paddingTop:10 }} alt="cart" onClick={()=>{

                     }}/>
                     <Button variant="contained" className="butonHeader" style={{ backgroundColor:'#5a4e8c',fontWeight:'bold',fontSize:14 }} href="/Login">Sign In</Button>

                 </Stack>


                </Container>
            </Navbar>
        </>
    );
}

export default HeaderW;
