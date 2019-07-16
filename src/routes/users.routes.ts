import {Router, Request, Response, NextFunction} from 'express';

class usersRouter {
    
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getUsers(req: Request, res: Response) {
    }

    async getUser(req: Request, res: Response) {
    }

    async createUser(req: Request, res: Response) {
    }

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:id', this.getUser);
        this.router.get('/', this.createUser);
    }
}
export default new usersRouter().router;