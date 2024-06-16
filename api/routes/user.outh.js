import express from "express";
import { singup,singin,google } from "../controlars/userData.js";

const route = express.Router()

route.post('/sing-up', singup)
route.post('/sing-in', singin)
route.post('/google', google)


export default route