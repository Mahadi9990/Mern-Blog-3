import express from "express";
import { singup } from "../controlars/userData.js";

const route = express.Router()

route.post('/sing-up', singup)

export default route