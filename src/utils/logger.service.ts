import { createLogger, format, transports } from 'winston'
import { TransformableInfo, FormatWrap } from 'logform'
import config from '../config'

const ignorePrivate = format((info, opts) => {
    if (info.private) { return false }
    return info
})

const debugEnabled: TransformableInfo | FormatWrap = format(info => {
    if (config.app_env !== 'development') return false
    return info
})

const options = {
    // file: {
    //     level: 'info',
    //     filename: `${config.log_dir}/arctos.log`,
    //     handleExceptions: true,
    //     json: true,
    //     maxsize: 5242880, // 5MB
    //     maxFiles: 5
    //   },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
    },
}

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        ignorePrivate(),
        debugEnabled(),
        format.printf(info => {
            const { timestamp, level, message, ...args } = info
            const ts = timestamp.slice(0, 19).replace('T', ' ')
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ?
                JSON.stringify(args, null, 2) : ''}`
        })
    ),
    transports: [
        new transports.Console(options.console),
        // new transports.File(options.file)
    ]
})

class Logger {
    info(message: string, p: boolean = false) {
        logger.info(message)
    }
    debug(message: string, p: false) {
        logger.info(message)
    }
    error(message: string) {
        logger.error(message)
    }
    warn(message: string) {
        logger.info(message)
    }
    banner() {
        logger.info('_     ___           █████╗ ██████╗  ██████╗████████╗ ██████╗ ███████╗')
        logger.info("#_~`--'__ `===-,    ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔════╝")
        logger.info('`.`.     `#.,//     ███████║██████╔╝██║        ██║   ██║   ██║███████╗')
        logger.info(',_\\_\\     ## #\\     ██╔══██║██╔══██╗██║        ██║   ██║   ██║╚════██║')
        logger.info('`__.__    `####\\    ██║  ██║██║  ██║╚██████╗   ██║   ╚██████╔╝███████║')
        logger.info("     ~~\\ ,###'~     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚══════╝")
        logger.info("        \\##'")
    }
}
export default new Logger()