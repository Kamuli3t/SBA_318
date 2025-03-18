import express from "express";
const router = express.Router();
import courses from "../data/courses.js";
import modules from "../data/modules.js";

router
  .route("/")
  .get((req, res) => {
    res.json(courses);
  })
  .post((req, res) => {
    if (req.body.instructorId && req.body.name && req.body.description) {
      const newCourse = {
        id: courses[courses.length - 1].id + 1,
        instructorId: req.body.instructorId,
        name: req.body.name,
        description: req.body.description,
      };
      courses.push(newCourse);
      res.json(newCourse);
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

router
  .route("/:courseId")
  .get((req, res) => {
    const course = courses.find((course) => course.id == req.params.courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Course not found");
    }
  })
  .patch((req, res) => {
    const course = courses.find((course, i) => {
      if (course.id == req.params.courseId) {
        for (const key in req.body) {
          courses[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Course not found");
    }
  })
  .delete((req, res) => {
    const course = courses.find((course, i) => {
      if (course.id == req.params.courseId) {
        courses.splice(i, 1);
        return true;
      }
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Course not found");
    }
  });

router.route("/:courseId/modules").get((req, res) => {
  res.json(modules.filter((module) => module.courseId == req.params.courseId));
});

export default router;
