import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URL: ", process.env.MONGO_URL);

import Job from "./models/Job.js";
import User from "./models/User.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({
    email: "fred@bedrockquarrelandgravel.com",
  }).select("_id");

  const jsonJobs = JSON.parse(
    await readFile(new URL("./data/MOCK_DATA.json", import.meta.url)),
  );

  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  // await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);

  console.log("success");
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
