import express from "express";
import { singin } from "../controlars/userData.js";

const route = express.Router()

route.post('/sing-in', singin)

export default route