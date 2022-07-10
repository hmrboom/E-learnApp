
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
import CourseLearn from "./Components/Courses/CourseLearn";
import MyCourses from "./Components/Courses/MyCourses";
import CourseModify from "./Components/Courses/CourseModify";
import LessonCreation from "./Components/Courses/LessonCreation";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<App/>}/>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="start" element={<WelcomeBackPage/>}/>
            <Route path="profile" element={<Profile/>} />
            <Route path="courseCreation" element={<CourseCreation/>} />
            <Route path="profile-modify/" element={<ProfileModify/>} />
            <Route path="profile-modify-photo" element={<ProfileModifyPhoto/>}/>
            <Route path="profile-modify-close" element={<ProfileDelete/>}/>
            <Route path="course-browse" element={<CourseBrowse/>}/>
            <Route path='course-page' element={<CoursePage/>}/>
            <Route path='user-wishlist' element={<CourseWishList/>}/>
            <Route path="course-learn/:id" element={<CourseLearn/>} />
            <Route path="my-courses/:id" element={<MyCourses/>} />
            <Route path="courseModify/:id" element={<CourseModify/>} />
            <Route path="lessonCreation" element={<LessonCreation/>} />
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
