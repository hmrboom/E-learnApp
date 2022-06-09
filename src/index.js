
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import App from "./App";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Components/Register";
import WelcomeBackPage from './Components/WelcomeBackPage';
import Profile from "./Components/Profile";
import CourseCreation from "./Components/CourseCreation";
import ProfileModify from "./Components/ProfileModifyComponents/ProfileModify";
import ProfileModifyPhoto from './Components/ProfileModifyComponents/ProfileModifyPhoto';
import ProfileDelete from './Components/ProfileModifyComponents/ProfileDelete';
import CourseBrowse from './Components/Courses/CourseBrowse';
import CoursePage from './Components/Courses/CoursePage';
import CourseWishList from "./Components/Courses/CourseWishList";
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<App/>}/>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            {
                (localStorage.getItem("token") || sessionStorage.getItem("token")) &&
                <Route path="start" element={<WelcomeBackPage/>}/>
            }

            {
                (localStorage.getItem("token") || sessionStorage.getItem("token")) &&
                <Route path="profile" element={<Profile/>} />
            }
            {
                (localStorage.getItem("token") || sessionStorage.getItem("token")) &&
                <Route path="courseCreation" element={<CourseCreation/>} />
            }
            {/* {
                (localStorage.getItem("token") || sessionStorage.getItem("token")) &&
                
            } */}
            <Route path="profile-modify" element={<ProfileModify/>} />
            <Route path="profile-modify-photo" element={<ProfileModifyPhoto/>}/>
            <Route path="profile-modify-close" element={<ProfileDelete/>}/>
            <Route path="course-browse" element={<CourseBrowse/>}/>
            <Route path='course-page' element={<CoursePage/>}/>
            <Route path='user-wishlist' element={<CourseWishList/>}/>
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
function ProfileRender()
{
    if(localStorage.getItem("token") != "" || sessionStorage.getItem("token") != "")
        return( <Route path="profile" element={<Profile/>} /> )
    else return (<Route path="profile" element={<Login/>} /> )
}
