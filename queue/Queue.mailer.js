
import { Queue } from "bullmq";
import { redisClient } from "../config/redis.js";

export const Queue_mailer = new Queue("send_mail",{connection : redisClient})