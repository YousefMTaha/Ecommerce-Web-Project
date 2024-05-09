import dotenv from "dotenv";
import express from "express";
import initApp from "./src/index.router.js";
dotenv.config();
const app = express();
import cors from "cors";
import morgan from "morgan";
app.use(morgan("tiny"));

// setup port and the baseUrl
const port = process.env.PORT || 5000;
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "X-Requested-With,content-type"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
//   });
initApp(app, express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
