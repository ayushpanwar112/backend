import express from 'express'
import protectRoute from '../utils/protectRoute.js'
import { Login, Logout, signup } from '../controller/user.controller.js'


const UserRoute = express.Router() 


UserRoute.post("/signup" ,signup )
UserRoute.post("/login" ,Login )
UserRoute.post("/logout" ,protectRoute,Logout )
export default UserRoute;