import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(
    // "mongodb+srv://vamsi:Vamsi0805@cluster0.iklm77i.mongodb.net/",
    "mongodb+srv://vamsi:Vamsi0805@cluster0.iklm77i.mongodb.net/insta?retryWrites=true&w=majority"
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Listening server and connect db ........")
    )
  )
  .catch((error) => console.log(`this is db not connected ${error}`));

// app.get("/", (req, res) => {
//   res.json("hellow wordl");
// });

app.use("/auth", AuthRoute);
