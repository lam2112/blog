import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;

mongoose.connect(
  `${URI}`,
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.error("mongodb connection");
  }
);
