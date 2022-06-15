import React, {useEffect, useState} from 'react';
import HeaderWith from "./HeaderWith";
import DrawerComponentWith from "../Consumables/DrawerComponentWith";
import {useMediaQuery, useTheme} from "@mui/material";
import {Container, TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {Dropdown, NavDropdown} from "react-bootstrap";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import {ChevronDownIcon } from '@chakra-ui/icons'
// import {
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem,
//     MenuItemOption,
//     MenuGroup,
//     MenuOptionGroup,
//     MenuDivider,
// } from '@chakra-ui/react'
const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
function CourseCreation(props) {
    const [age, setAge] = React.useState('');

    const setCategoryClick = (event) => {
        setCategory(event.target.value);
        
     };
     const setSubCategoryClick = (event) => {
        setSubcategory(event.target.value);
        
     };
     const setTypeClick = (event)=>{ 
            setType(event.target.value);     
     }
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [categories,setcategories] = useState([]);
    const [subcategory,setSubcategory] = useState('');
    const [categoriestypes,setcategoriestypes] = useState([]);
    const [category,setCategory] = useState('');
    const [type,setType] = useState('');

    const [user,setUser] = useState();

    const [courseName,setCourseName] = useState();
    const [moduleNr,setModuleNr] = useState();
    const [description,setDescription] = useState();
    const [shortDescription,setShortDescription] = useState();
    const [price,setPrice] = useState();
    const [req,setReq] = useState();
    

    useEffect(() => {
     let catego =   axios.get(process.env.REACT_APP_ADRESS + 'api/Course/getCategories')
            // .then(response=>{
            //     setcategories(response.data)
                
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
        
     let typeCat =   axios.get(process.env.REACT_APP_ADRESS + 'api/Course/getTypeCourse')
            // .then(response=>{
            //     setcategoriestypes(response.data)
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
            axios.all([catego,typeCat])
            .then(e=>{
                setcategories(e[0].data)
                setcategoriestypes(e[1].data)
               
            })

        if(sessionStorage.getItem('token'))
        {
            var token = sessionStorage.getItem('token').toString();
        }
        else var token = localStorage.getItem('token').toString();


            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

           setUser(JSON.parse(jsonPayload))



    },[]);

    return (
        <div>
            {isMatch ? <DrawerComponentWith/>: (
                <HeaderWith name="AH" shoppingCartNumber={2} />
            )}
            <Container maxWidth="lg">
                <Box sx={{ borderStyle:'solid',borderWidth:1,display:'flex', width:'auto',height: 'auto', borderRadius:15,marginTop:10,marginBottom:10,flexDirection:'column' }}>
                    <div style={{ display:'flex',justifyContent: 'center' }}>
                        <Typography variant="h4" component="h1">
                            Course Creation Form (Alpha)
                        </Typography>
                    </div>
                    <Stack direction="column" spacing={5} sx={{ width: 'auto', marginLeft:10,marginRight:10 }}>

                        <TextField  id="standard-basic" label="Course Name" variant="standard" onChange={e=>{
                            setCourseName(e.target.value);
                           
                        }} />

                       
                        <FormControl sx={{ width:200, }}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            defaultValue = ""
                            onChange={setCategoryClick}
                           
                            >
                            {
                                categories.map(cat => {
                                    return(
                                        <MenuItem value={cat} key={cat.Id}>{cat.CategoryName}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width:200 }}>
                            <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subcategory}
                            defaultValue = ""
                            label="SubCategory"
                            onChange={setSubCategoryClick}
                           
                            >
                                {
                                category?.SubCategories?.map(cat => {
                                    return(
                                        <MenuItem value={cat} key={cat.Id}>{cat.SubCategoryName}</MenuItem>
                                    )
                                })
                            }
                           
                            </Select>
                        </FormControl>
                        <TextField multiline rows={2} maxRows={3}  id="standard-basic" label="Short Description" variant="standard" onChange={e=>{
                            setShortDescription(e.target.value)
                        }} />
                        <TextField multiline rows={2} maxRows={5}  id="standard-basic" label="Description" variant="standard" onChange={e=>{
                            setDescription(e.target.value)
                        }}/>
                        <TextField multiline rows={2} maxRows={3}  id="standard-basic" label="Course Requirements" variant="standard" onChange={e=>{
                            setReq(e.target.value)
                        }}/>
                        <Stack  sx={{ width: 50}}>
                            <TextField id="standard-basic" label="Price"  variant="standard" onChange={e=>{
                                setPrice(e.target.value)
                            }}/>
                        </Stack>
                        <Stack  sx={{ width: 50}}>
                            <TextField id="standard-basic" label="ModulesNumber"  variant="standard" onChange={e=>{
                                setModuleNr(e.target.value)
                            }}/>
                        </Stack>
                        <FormControl sx={{ width:200 }}>
                            <InputLabel id="demo-simple-select-label">Course Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            defaultValue = ""
                            label="Course Type"
                            onChange={setTypeClick}
                            >
                                { 
                                    categoriestypes?.map(type=>{
                                      return  <MenuItem value={type.Id} key={type.Id}>{type.CourseTypeName}</MenuItem>
                                    })
                                }
                               
                           
                            </Select>
                        </FormControl>

                       
                        <Button onClick={e=>{
                            axios.post(process.env.REACT_APP_ADRESS + 'api/Course/courseCreation',{
                                courseName: courseName,
                                whatLearn: shortDescription,
                                description: description,
                                req: req,
                                price: price,
                                moduleNumber: moduleNr,
                                categoryId: category.Id,
                                typeId: type,
                                userId: user.Id
                                //TREBUIE SI SUBCATEGORY 
                            })
                                .then(res =>{
                                    console.log(res)
                                    alert("Curs Creat")
                                   // window.location.href="/start"
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                        }}>Create</Button>
                    </Stack>


                </Box>

            </Container>
        </div>
    );
}

export default CourseCreation;
