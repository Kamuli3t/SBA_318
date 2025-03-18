import express from "express";
const router = express.Router();
import modules from "../data/modules.js";

router
  .route("/")
  .get((req, res) => {
    res.json(modules);
  })
  .post((req, res) => {
    if (req.body.courseId && req.body.title && req.body.content) {
      const newModule = {
        id: modules[modules.length - 1].id + 1,
        courseId: req.body.courseId,
        title: req.body.title,
        content: req.body.content,
      };
      modules.push(newModule);
      res.json(newModule);
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

router
  .route("/:moduleId")
  .get((req, res) => {
    const module = modules.find((module) => module.id == req.params.moduleId);
    if (module) {
      res.json(module);
    } else {
      res.status(404).send("Module not found");
    }
  })
  .patch((req, res) => {
    const module = modules.find((module, i) => {
      if (module.id == req.params.moduleId) {
        for (const key in req.body) {
          modules[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (module) {
      res.json(module);
    } else {
      res.status(404).send("Module not found");
    }
  })
  .delete((req, res) => {
    const module = modules.find((module, i) => {
      if (module.id == req.params.moduleId) {
        modules.splice(i, 1);
        return true;
      }
    });
    if (module) {
      res.json(module);
    } else {
      res.status(404).send("Module not found");
    }
  });

export default router;
