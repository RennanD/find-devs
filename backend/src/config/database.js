import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/omnistack", {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose;
