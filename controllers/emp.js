const { employeeModel } = require("../models/employeeModel");

async function addEmployee(req, res) {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    // Check if an employee with the provided email already exists
    const existingEmployee = await employeeModel.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    const newEmployee = new employeeModel({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      message: "New employee details stored",
      employee: savedEmployee,
    });
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function getEmployee(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const employees = await employeeModel.find().skip(skip).limit(limit);
    res.json(employees);
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function updateEmployee(req, res) {
  try {
    const { employeeId } = req.params;
    const updatedData = req.body;
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,
      updatedData,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee details updated", updated: updatedEmployee });
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    const { employeeId } = req.params;
    const deletedEmployee = await employeeModel.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted", employee: deletedEmployee });
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function filter(req, res) {
  try {
    const { department } = req.query;
    const employees = await employeeModel.find({ department });
    res.json(employees);
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function search(req, res) {
  try {
    const { searchQuery } = req.query;
    const employees = await employeeModel.find({ firstName: { $regex: searchQuery, $options: 'i' } });
    res.json(employees);
  } catch (err) {
    // Handle internal server error.
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

module.exports = {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  filter,
  search
};
