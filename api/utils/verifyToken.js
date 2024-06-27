import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const varifyToken = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(errorHandler(401,'UnOuthariaze'))
    }
    jwt.verify(token, process.env.JSONWEBTOKEN, (err, user) => {
        if (err) {
            return next(errorHandler(401,'UnOuthariaze'))
        }
        req.user = user
        next()
    })
}