import mongoose from "mongoose";

const connectDb = () => {
  const mongodb_connecton_string = process.env.MONGODB_URL;
  try {
    const connection = mongoose.connect(mongodb_connecton_string);
    //rsconsole.log(connection)
  } catch (error) {
    console.log("yasu" + error.message);
  }
};
export default connectDb;
