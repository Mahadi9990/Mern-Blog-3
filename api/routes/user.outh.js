import express from "express";
import { singup,singin,google ,updateUser} from "../controlars/userData.js";
import { varifyToken } from "../utils/verifyToken.js";

const route = express.Router()

route.post('/sing-up', singup)
route.post('/sing-in', singin)
route.post('/google', google)
route.put('/update/:userId',varifyToken, updateUser)

export default route


