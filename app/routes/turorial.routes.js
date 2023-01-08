module.exports = app => {
  const dairy = require("../controllers/dairy.controller.js");

  var router = require("express").Router();

  // Create a new Daily Dairy
  router.post("/", dairy.create);

  // Retrieve all Daily Dairy
  router.get("/", dairy.findAll);

  // Retrieve a single Daily Dairy with id
  router.get("/:id", dairy.findOne);

  // Update a Daily Dairy with id
  router.put("/:id", dairy.update);

  app.use("/api/dairy", router);
};
