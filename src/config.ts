export default Object.freeze({
    port: process.env.PORT || '3000',
    api_url: process.env.API_URL || `/api/v1`,
    db_acc: process.env.MONGO_USER,
    db_pwd: process.env.MONGO_PASS,
    db_name: process.env.MONGO_DB,
    log_dir: process.env.LOG_DIR || './logs',
    app_env: process.env.NODE_ENV || 'development',
    token: process.env.KEY || ''
})