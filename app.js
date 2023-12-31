import express from "express";
import cors from "cors"
import mainroute from "./routes/route.js"
const app = express();
app.use(
    express.urlencoded({
      extended: false,
    })
  );
  
app.use(cors())
app.use(express.json());

app.use(mainroute)
export default app