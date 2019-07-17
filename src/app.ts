import express from 'express'
import morgan from 'morgan'
// import helmet from 'helmet'
// import compression from 'compression'
import mongoose, { connect } from 'mongoose'
// import cors from 'cors'

import config from './config'
import logger from './utils/logger.service'
import usersRoutes from './routes/users.routes'

class Server {
    public app: express.Application
    private mongoUrl: string = `mongodb+srv://${config.db_acc}:${config.db_pwd}@nubilus-h36yg.gcp.mongodb.net/${config.db_name}?retryWrites=true&w=majority`

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    private config() {
        this.app.set('port', config.port)
        this.app.use(morgan('dev', {
            stream: {
                write: (message: string) => {
                    logger.info(message)
                }
            }
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
            logger.info('Connection Established Successfully!')
        }).catch(err => {
            logger.error(err)
        })
        // this.app.use(helmet())
        // this.app.use(compression())
        // this.app.use(cors())
        // mongoose.set('useFindAndModify', false)
    }

    private routes() {
        this.app.use('/api/users', usersRoutes)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            logger.banner()
            logger.info(`App started on port ${this.app.get('port')}`)
        })
    }
}
export default Server