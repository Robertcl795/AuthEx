export default Object.freeze({
    port: process.env.PORT || '5000',
    api_url: process.env.API_URL || `/api/v1`,
    db_acc: process.env.MONGO_USERNAME,
    db_pwd: process.env.MONGO_PASSWORD,
    db_name: process.env.MONGO_DATABASE,
    log_dir: process.env.LOG_DIR || './logs',
    app_env: process.env.NODE_ENV || 'development',
    token: process.env.KEY || 'XYIsTheBestAlbum',
    gclientID: process.env.GCLIENT_ID,
    gclientSecret: process.env.GCLIENT_SECRET,
    fclientID: process.env.FCLIENT_ID,
    fclientSecret: process.env.FCLIENT_SECRET
})