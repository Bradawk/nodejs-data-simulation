var config = {};

config.db_name =  'datasetdb';
config.db_user_name = process.env.TWITTER_USER || 'username';
config.db_user_password =  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;

module.exports = config;
