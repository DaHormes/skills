

// functions/submit-form.js
exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    // Store the data in a database or other storage mechanism
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data submitted successfully' })
    };
  };



/*/ index.html
<form id="dataForm">
  <button type="submit">Submit</button>
</form>

<script>
  const form = document.getElementById('dataForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
</script>

*/