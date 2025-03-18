const courses = [
  {
    id: 101,
    instructorId: 1, // Foreign key referencing instructor
    name: "Introduction to Programming",
    description: "A beginner-friendly course on programming concepts.",
  },
  {
    id: 102,
    instructorId: 2,
    name: "World History 101",
    description: "An overview of early world history.",
  },
  {
    id: 103,
    instructorId: 1,
    name: "Data Structures and Algorithms",
    description: "Advanced concepts in data structures and algorithms.",
  },
  {
    id: 104,
    instructorId: 3,
    name: "Calculus I",
    description: "Introduction to differential calculus.",
  },
];

export default courses;
