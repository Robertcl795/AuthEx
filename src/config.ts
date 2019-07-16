export class Config {
    readonly port: string = process.env.PORT || '3000'
    readonly api_url: string = process.env.API_URL || `/api/v1`
    readonly db_acc: string = process.env.MONGO_USER
    readonly db_pwd: string = process.env.MONGO_PASS
    readonly log_dir: string = process.env.LOG_DIR || './logs'
    readonly app_env: string = process.env.NODE_ENV || 'development'
    readonly token: string = process.env.KEY || ''
}