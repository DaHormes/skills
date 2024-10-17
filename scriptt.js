
// ... (rest of your code)


const dataForm = document.getElementById('dataForm');
const tableBody = document.getElementById('tableBody');



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



// ... (rest of the code)

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

// Save data on form submission
// Client-Side for Netlify

  const form = document.getElementById('dataForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('functions/submit-form', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });

// Load data on page load
loadData();

