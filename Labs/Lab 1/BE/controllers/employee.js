const employee = [
  { id: '1', name: 'Mohamed Sayed' },
  
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const idToDelete = req.params.id;

  // Find the index of the employee with the specified ID
  const indexToDelete = employee.findIndex(emp => emp.id === idToDelete);

  // Check if the employee with the specified ID exists
  if (indexToDelete !== -1) {
    // Remove the employee from the array
    employee.splice(indexToDelete, 1);

    // Respond with success message
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    // Respond with an error message if the employee is not found
    res.status(404).json({ message: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  // Check if an employee with the same ID already exists
  const existingEmployee = employee.find(emp => emp.id === id);

  if (existingEmployee) {
    // Respond with an error message if an employee with the same ID already exists
    res.status(400).json({ message: 'Employee with the same ID already exists' });
  } else {
    // Add the new employee to the array
    employee.push({ id, name });

    // Respond with success message and the newly created employee
    res.status(201).json({ message: 'Employee created successfully', data: { id, name } });
  }
};
