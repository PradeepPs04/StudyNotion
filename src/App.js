import "./App.css";

import { ACCOUNT_TYPE } from "./utils/constants";

import {Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar"
import Home from "./pages/Home"
import OpenRoute from "./components/core/auth/OpenRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";

import About from "./pages/About";
import { ContactUs } from "./pages/ContactUs";
import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { PrivateRoute } from "./components/core/auth/PrivateRoute";
import { Error } from "./pages/Error";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Index";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";

function App() {
  const {user} = useSelector((state) => state.profile);
  console.log('logging user: ', user);
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
      />

      <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
      />

      <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
      />

      <Route
          path="update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
      />

      <Route
          path="verify-email"
          element={<VerifyEmail/>}
      />
      <Route
          path="about"
          element={<About/>}
      />

      <Route
        path="/contact"
        element={<ContactUs/>}
      />

      <Route
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      >
          <Route path="dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/> 
          {/* Student profile routes */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>
              </>
            )
          }
          {/* Instructor profile routes */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/instructor" element={<></>}/>
                <Route path="/dashboard/my-courses" element={<></>}/>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
              </>
            )
          }
      </Route>


      <Route 
        path='*'
        element={<Error/>}
      />
    </Routes>

   </div>
  );
}

export default App;
