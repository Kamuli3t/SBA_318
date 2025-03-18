import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import instructors from "./routes/instructors.js";
import courses from "./routes/courses.js";
import modules from "./routes/modules.js";
import departments from "./routes/departments.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // No need for body-parser anymore, express 💪
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

//Custom middleware
app.use((req, res, next) => {
  console.log(
    `request type: ${req.method} sent to: localhost:${PORT}${req.url}`
  );
  next();
});

app.use("/instructors", instructors);
app.use("/courses", courses);
app.use("/modules", modules);
app.use("/departments", departments);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on port TOP secret port " + PORT);
});
