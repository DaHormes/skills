const dataForm = document.getElementById('dataForm');
const tableBody = document.getElementById('tableBody');

//... rest of your existing code for data handling, table creation, and sorting


// Sample data
const data = [
    { name: 'Gideon Doe', title: 'Software Engineer', skills: 'JavaScript, Python, React', category: 'Web Development', workDone: 'Built a full-stack web application', contact: 'johndoe@example.com' },
    { name: 'John arare', title: 'Software Engineer', skills: 'JavaScript, Python, React', category: 'Web Development', workDone: 'Built a full-stack web application', contact: 'johndoe@example.com' },
    { name: 'Freg Doe', title: 'Software Engineer', skills: 'JavaScript, Python, React', category: 'Web Development', workDone: 'Built a full-stack web application', contact: 'johndoe@example.com' },
    // Add more rows here...
  ];
  
  function saveData() {
    localStorage.setItem('data', JSON.stringify(data));
  }
  
  function loadData() {
    const savedData = localStorage.getItem('data');
    if (savedData) {
      data = JSON.parse(savedData);
    }
  }
  
  // Function to create a table row
  function createTableRow(row) {
    const tr = document.createElement('tr');
    for (const key in row) {
      const td = document.createElement('td');
      td.textContent = row[key];
      if (key === 'Name' || key === 'Title') {
        td.className = key.toLowerCase() + '-cell';
      } else {
        td.className = key.toLowerCase() + '-cell';
      }
      tr.appendChild(td);
    }
    return tr;
  }
  
  // Function to sort the table by a specific column
  
  function sortTable(column) {
      const rows = Array.from(tableBody.querySelectorAll('tr')); // Convert NodeList to array
    
      // ... rest of your sortTable function
    
    const isNumeric = column === 'Category'; // Assuming Category is numeric
  
    rows.forEach(row => {
      const cell = row.querySelector(`.${column.toLowerCase()}-cell`);
      const value = cell.textContent;
      row.dataset[column] = isNumeric ? parseFloat(value) : value;
    });
  
    rows.sort((a, b) => {
      const aValue = a.dataset[column];
      const bValue = b.dataset[column];
      if (isNumeric) {
        return aValue - bValue;
      } else {
        return aValue.localeCompare(bValue);
      }
    });
  
    rows.forEach(row => tableBody.appendChild(row));
  }
  
  // Add rows to the table
  data.forEach(row => {
    const tr = createTableRow(row);
    tableBody.appendChild(tr);
  });
  
  // Add event listeners to table headers for sorting
  const headers = document.querySelectorAll('th');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const column = header.textContent;
      sortTable(column);
    });
  });
  
  

//


dataForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Save data to server-side Netlify function
  try {
    const response = await fetch('/.netlify/functions/submit-form', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message); // Log success message
      // Add a success message or visual feedback to the user
    } else {
      console.error('Error submitting data:', response.statusText);
      // Handle errors here (e.g., display an error message to the user)
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle network or other errors
  }

  // ... rest of your existing code for adding a new table row and clearing the form


  dataForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    saveData();
  
    const formData = new FormData(dataForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    const tr = createTableRow(data);
    tableBody.appendChild(tr);
  
    // Clear the form
    dataForm.reset();
  });
  

  //


});