const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", function (err) {
    console.log("Error " + err);
});


exports.getKey = (keyName) => {
    return new Promise((resolve, reject) => {
        client.get(keyName, (err, reply) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(reply);
            }
        });
    });
}

exports.setKey = (keyName, value, expiry = 3600) => {
    return client.set(keyName, value, 'EX', expiry);
}

exports.addToHash = (hashName, keyName, value) => {
    return client.hset(hashName, keyName, value);
}

exports.getFromHash = (hashName, keyName) => {
    return new Promise((resolve, reject) => {
        client.hget(hashName, keyName, (err, reply) => {
            if (err || !reply) {
                return reject()
            } else {
                return resolve(reply);
            }
        });
    });
}

exports.getAllFromHash = (hashName) => {
    return new Promise((resolve, reject) => {
        client.hgetall(hashName, (err, reply) => {
            if (err || !reply) {
                return reject()
            } else {
                return resolve(reply);
            }
        });
    });
}
