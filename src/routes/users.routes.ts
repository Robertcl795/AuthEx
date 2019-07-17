import { Router, Request, Response, NextFunction } from 'express';
import UsersController from '../controllers/users.controller';
import passport from 'passport'
import '../utils/passport.service'

const passportJWT = passport.authenticate('jwt', { session: false })
const passportSignIn = passport.authenticate('local', { session: false })
const passportGoogle = passport.authenticate('googleToken', { session: false })

class usersRouter {

    router: Router;
    private usersController: UsersController = new UsersController()

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/all', this.usersController.getUsers);
        this.router.post('/signin', passportSignIn, this.usersController.signInUser);
        this.router.post('/signup', this.usersController.signUpUser)
        this.router.post('/oauth/google', passportGoogle, this.usersController.googleOAuth)
        this.router.get('/secret', passportJWT, this.usersController.secret)
    }
}
export default new usersRouter().router;