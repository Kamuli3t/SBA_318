import express from "express";
import modules from "../data/modules.js";
import courses from "../data/courses.js";
import instructors from "../data/instructors.js";

const router = express.Router();

//just curious of making a route out of a driven data, to give departments and modules for specific department.
router.route("/").get((req, res) => {
  const departments = [
    ...new Set(instructors.map((instructor) => instructor.department)),
  ];
  res.json({ departments });
});

router.route("/:departmentName/modules").get((req, res) => {
  const departmentName = req.params.departmentName.toLowerCase();

  // Find instructors in the department
  const instructorsInDepartment = instructors.filter(
    (instructor) => instructor.department.toLowerCase() === departmentName
  );

  if (instructorsInDepartment.length > 0) {
    // Get courses taught by those instructors
    const coursesInDepartment = courses.filter((course) =>
      instructorsInDepartment.some(
        (instructor) => instructor.id === course.instructorId
      )
    );

    // Get modules for those courses
    const modulesInDepartment = modules.filter((module) =>
      coursesInDepartment.some((course) => course.id === module.courseId)
    );

    if (modulesInDepartment.length > 0) {
      res.json(modulesInDepartment);
    } else {
      res
        .status(404)
        .send(`No modules found for the department: ${departmentName}`);
    }
  } else {
    res
      .status(404)
      .send(`No instructors found for the department: ${departmentName}`);
  }
});

export default router;
