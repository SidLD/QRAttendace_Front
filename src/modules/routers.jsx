import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom"
import { PrivateLayout, PublicLayout } from "./module.jsx"
import { Dashboard } from "../pages/Dashboard/index.jsx"
import { Login } from "../pages/login/index.jsx"
import { Register } from "../pages/register/index.jsx"
import { Record } from "../pages/record/index.jsx"
import { Logout } from "../pages/logout/index.jsx"
import { AttendanceSetting } from "../pages/attendanceSetting/index.jsx"
const routers = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PublicLayout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route  path="*" element={<Navigate to="/login" replace />} />

            </Route>  
            <Route element={<PrivateLayout/>} >
                <Route  index path="/dashboard" element={<Dashboard/>} />
                <Route path="record" element={<Record/>} />
                <Route path="logout" element={<Logout />}/>
                <Route path="attendance-setting" element={<AttendanceSetting/>} />
                <Route  path="*" element={<Navigate to="/dashboard" replace />} />
            </Route> 
        </>
    )
)
export default routers