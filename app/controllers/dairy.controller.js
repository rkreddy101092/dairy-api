const db = require("../models");
const Dairy = db.dairy;

// Create and Save a new 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.notes) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const dairy = new Dairy({
    notes: req.body.notes,
    best_moment: req.body.best_moment,
  });

  dairy
    .save(dairy)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dairy."
      });
    });
};

// Retrieve all Dairys from the database.
exports.findAll = (req, res) => {
  const notes = req.query.notes;
  var condition = notes ? { notes: { $regex: new RegExp(notes), $options: "i" } } : {};

  Dairy.find(condition)
    .then(data => {
      res.send({ data, message: "all records", success: true });
    })
    .catch(err => {
      res.status(500).send({
        success: true,
        message:
          err.message || "Some error occurred while retrieving Dairys."
      });
    });
};

// Find a single Dairy with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dairy.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Dairy with id " + id });
      else res.send({ data, success: true, message: "" });
    })
    .catch(err => {
      res
        .status(500)
        .send({ success: false, message: "Error retrieving Dairy with id=" + id });
    });
};

// Update a Dairy by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Dairy.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Dairy with id=${id}. Maybe Dairy was not found!`
        });
      } else res.send({ message: "Dairy was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Dairy with id=" + id
      });
    });
};

