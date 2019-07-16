import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user';
import loggerService from '../utils/logger.service';

class usersRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async signupUser(req: Request, res: Response, next: NextFunction) {
        const submittedUser = await User.findOne({ email: req.body.email })
        if (submittedUser) return res.status(403).json({ error: 'Email already in use' })
        const newUser = new User(req.body)
        await newUser.save().then(() => {
            const now = new Date().getDate()
            const token = jwt.sign({
                iss: 'AuthAPI',
                sub: newUser.id,
                iat: now,
                exp: new Date().setDate(now + 1)
            }, 'secret')
            res.status(200).json({ token })
        }).catch(err => loggerService.error(err))
    }

    async getUser(req: Request, res: Response) {
    }

    async createUser(req: Request, res: Response) {
        console.log(req.body)
        const newUser = new User(req.body)
        await newUser.save().then(() => res.json({ user: 'created' })).catch(err => loggerService.error(err))
    }

    routes() {
        this.router.get('/', this.signupUser);
        this.router.get('/:id', this.getUser);
        this.router.post('/', this.createUser);
    }
}
export default new usersRouter().router;