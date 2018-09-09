const Redis = require("ioredis");




class Token {
    constructor() {
        this.redis = new Redis(6379, 'localhost');
    }

    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        data = JSON.parse(data);
        this.set(data,sid,1000000);
        return JSON.parse(data);
    }

    async set(session, sid, maxAge) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge);
        } catch (e) {}
        return sid;
    }

    async destroy(sid, ctx) {
        return await this.redis.del(`SESSION:${sid}`);
    }

}

module.exports = Token;

// new Redis({
//   port: 6379,          // Redis port
//   host: '127.0.0.1',   // Redis host
//   family: 4,           // 4 (IPv4) or 6 (IPv6)
//   password: 'auth',
//   db: 0
// })
