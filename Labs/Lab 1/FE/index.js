function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', function (event) {
  event.preventDefault(); // Prevents the default form submission behavior
  createEmployee();
});





// TODO
function createEmployee (){
  // Get data from input field
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  // Send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Include employee data in the request body as JSON
    body: JSON.stringify({
      name: name,
      id: id,
    }),
  })
    // Handle the response from the server
    .then(response => response.json())
    .then(data => {
      // After successfully creating an employee, refresh the table
      fetchEmployees(); // Call fetchEmployees 
    })
    // Handle errors, if any, during the HTTP request
    .catch(error => console.error(error));
}

// TODO
function deleteEmployee(id) {
  // Make a DELETE request to the backend to delete the employee with the specified ID
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    // Handle the response from the server
    .then(response => response.json())
    .then(data => {
      // After successfully deleting an employee, refresh the table
      fetchEmployees(); // Call fetchEmployees 
    })
    // Handle errors, if any, during the HTTP request
    .catch(error => console.error(error));
}

// TODO
document.getElementById('dataTable').addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const row = event.target.closest('tr');
    const id = row.querySelector('td:first-child').textContent;
    deleteEmployee(id); // Pass the employee ID to the deleteEmployee function
  }
});


fetchEmployees()
