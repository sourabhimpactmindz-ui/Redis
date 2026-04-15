import redis from 'ioredis'

export const redisClient = new redis({
    host : "127.0.0.1",
    port : 6379,
    maxRetriesPerRequest : null
})

redisClient.on("connect", ()=>{
    console.log("Redis Conncted")
})

redisClient.on("error" , (err) => {
    console.log("redis error" , err)
})