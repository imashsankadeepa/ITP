import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./components/header";
import PrivateRoutes from "./components/PrivateRoutes";

import OnePetShow from "./Pages/OnePetShow";
import AddStaff from "./Pages/AddStaff";
import StaffDetailsProfile from "./Pages/StaffDetailsProfile";
import UpdateStaff from "./Pages/UpdateStaff";
import ManagerSignUp from "./Pages/Manager/ManagerSignUp";
import ManagerSignin from "./Pages/Manager/ManagerSignin";

import ManagerProfile from "./Pages/Manager/ManagerProfile";

import AddTask from "./Pages/Tasks/AddTask";
import AllTask from "./Pages/Tasks/AllTask";
import UpdateTask from "./Pages/Tasks/UpdateTask";
import ManagerAllDetails from "./Pages/Manager/ManagerAllDetails";
import AdminAllTask from "./Pages/Manager/AdminAllTask";
import Home from "./Pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Home />
            </div>
          }
        ></Route>
        <Route path="/login-manager" element={<ManagerAllDetails />}></Route>
        <Route
          path="/AllTask"
          element={
            <div>
              <Header />
              <AllTask />
            </div>
          }
        ></Route>
        <Route
          path="/AdminAllTask"
          element={
            <div>
              <Header />
              <AdminAllTask />
            </div>
          }
        ></Route>

        <Route path="/manager-sign-up" element={<ManagerSignUp />}></Route>
        <Route path="/manager-sign-in" element={<ManagerSignin />}></Route>
        <Route path="/AddTask" element={<AddTask />}></Route>

        <Route
          path="/sign-in"
          element={
            <div>
              <Header />
              <Signin />
            </div>
          }
        ></Route>
        <Route
          path="/AddStaff"
          element={
            <div>
              <Header />
              <AddStaff />
            </div>
          }
        ></Route>

        <Route
          path="/sign-up"
          element={
            <div>
              <Header />
              <SignUp />
            </div>
          }
        ></Route>

        <Route path="/onepet/:id" element={<OnePetShow />}></Route>

        <Route element={<PrivateRoutes />}>
          <Route
            path="/profile"
            element={
              <div>
                <Header />
                <Profile />
              </div>
            }
          ></Route>
          <Route path="/ManagerProfile" element={<ManagerProfile />}></Route>
          <Route
            path="/StaffDetailsProfile"
            element={
              <div>
                <Header />
                <StaffDetailsProfile />
              </div>
            }
          ></Route>
          <Route
            path="/update-staff/:id"
            element={
              <div>
                <Header />
                <UpdateStaff />
              </div>
            }
          ></Route>
          <Route
            path="/update-task/:id"
            element={
              <div>
                <Header />
                <UpdateTask />
              </div>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
