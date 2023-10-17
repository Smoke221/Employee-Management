const express = require("express");
const {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  filter,
  search,
} = require("../controllers/emp");

const empRouter = express.Router();

empRouter.post("/employees", addEmployee);
empRouter.get("/all", getEmployee);
empRouter.patch("/:employeeId", updateEmployee);
empRouter.delete("/:employeeId", deleteEmployee);
empRouter.get("/filter", filter)
empRouter.get("/search", search)

module.exports = { empRouter };
