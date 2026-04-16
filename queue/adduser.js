import ioredis from 'ioredis';
import { Queue } from "bullmq"
import { redisClient } from '../config/redis.js';

export const productQueue = new Queue("add_user" ,{connection : redisClient})