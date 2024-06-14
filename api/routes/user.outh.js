import express from "express";
import { singup,singin } from "../controlars/userData.js";

const route = express.Router()

route.post('/sing-up', singup)
route.get('/sing-in', singin)


export default route