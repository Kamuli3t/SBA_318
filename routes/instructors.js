import express from "express";
const router = express.Router();
import instructors from "../data/instructors.js";

router
  .route("/")
  .get((req, res) => {
    res.json(instructors);
  })
  .post((req, res) => {
    if (req.body.name && req.body.department) {
      const newInstructor = {
        id: instructors[instructors.length - 1].id + 1,
        name: req.body.name,
        department: req.body.department,
      };
      instructors.push(newInstructor);
      res.json(newInstructor);
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

router
  .route("/:instructorId")
  .get((req, res) => {
    const instructor = instructors.find(
      (instructor) => instructor.id == req.params.instructorId
    );
    if (instructor) {
      res.json(instructor);
    } else {
      res.status(404).send("Instructor not found");
    }
  })
  .patch((req, res) => {
    const instructor = instructors.find((instructor, i) => {
      if (instructor.id == req.params.instructorId) {
        for (const key in req.body) {
          instructors[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (instructor) {
      res.json(instructor);
    } else {
      res.status(404).send("Instructor not found");
    }
  })
  .delete((req, res) => {
    const instructor = instructors.find((instructor, i) => {
      if (instructor.id == req.params.instructorId) {
        instructors.splice(i, 1);
        return true;
      }
    });
    if (instructor) {
      res.json(instructor);
    } else {
      res.status(404).send("Instructor not found");
    }
  });

export default router;
