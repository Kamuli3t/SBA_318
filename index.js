import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // No need for body-parser anymore, express 💪
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("This is a response");
});

app.listen(PORT, () => {
  console.log("Listening on port TOP secret port " + PORT);
});
