import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import User from "../models/User"
import config from "../config"
import loggerService from "../utils/logger.service"

export default class UsersController {

    private signToken = (user) => {
        return jwt.sign({
            iss: 'AuthAPI',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, config.token)
    }

    public signUpUser = async (req: Request, res: Response) => {
        const foundUser = await User.findOne({ "local.email": req.body.email })
        if (foundUser) return res.status(403).json({ error: 'Email already in use' })
        const newUser = new User({
            method: 'local',
            local: req.body
        })
        await newUser.save().then(() => {
            const token = this.signToken(newUser)
            res.status(200).json({ token })
        }).catch(err => loggerService.error(err))
    }

    public signInUser = (req: Request, res: Response) => {
        const token = this.signToken(req.user)
        res.status(200).json({ token })
    }

    public googleOAuth = async (req: Request, res: Response) => {
        loggerService.info(req.user)
        const token = this.signToken(req.user)
        res.status(200).json({ token })
    }

    async getUsers(req: Request, res: Response) {
        const users = await User.find()
        res.json(users)
    }

    public secret = async (req: Request, res: Response) => {
        loggerService.info('Accessed Protected route')
        res.json({ secret: 'resource' })
    }
}