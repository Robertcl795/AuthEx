import express from 'express'
import morgan from 'morgan'
// import helmet from 'helmet'
// import compression from 'compression'
// import mongoose from 'mongoose'
// import cors from 'cors'

import { Config } from './config'
import { Logger } from './utils/logger.service'

import usersRoutes from './routes/users.routes'


const config = new Config()
const logger = new Logger()
class Server {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config() {
        this.app.set('port', config.port)
        this.app.use(morgan('dev', {stream: {write: (message: string) => {
            logger.info(message)
        }}}))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        // this.app.use(helmet())
        // this.app.use(compression())
        // this.app.use(cors())
        // mongoose.set('useFindAndModify', false)
        // mongoose.connect('mongodb://127.0.0.1:27017/arctos', 
        //     { useNewUrlParser: true,  useCreateIndex: true,})
        // const connection = mongoose.connection
        // connection.once('open', function() {
        //     logger.info('Mongo DB Connection Established Succesfully')
        // })
        // connection.on('connected', () => {
        //     logger.info('Mongoose Connected')
        // })
        // connection.on('error', err => {
        //     logger.info(`Mongoose Error ${err}`)
        // })
        // connection.on('disconnected', () => {
        //     logger.info('Mongoose Disconnected')
        // })
    }

    routes() {
        this.app.use('/api/users', usersRoutes)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            logger.banner()
            logger.info(`App started on port ${this.app.get('port')}`)
        })
    }
}
const server = new Server()
server.start()