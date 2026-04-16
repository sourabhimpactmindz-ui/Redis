import { Worker } from "bullmq";
import { redisClient } from "../config/redis.js";
import {User} from "../model/user.model.js";
import { dbconn } from "../config/db.config.js";

await dbconn();
const worker = new Worker(
  "add_user",
  async (job) => {
    try {
      const data = job.data;

      const user = await User.create({ ...data });

    } catch (error) {
      console.log("❌ Error in worker:", error);
      throw error;
    }
  },
  {
    connection: redisClient
  }
);

worker.on("completed", (job) => {
  console.log("✅ Job completed:", job.id);
});

worker.on("failed", (job, err) => {
  console.log("❌ Job failed:", err);
});