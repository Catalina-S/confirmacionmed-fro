const backendUrl = "https://confirmacion-medi.onrender.com";  

async function prepararMedicamento() {
  const id = document.getElementById('medicationId').value;
  if (!id) {
    alert("Por favor ingresa el ID del medicamento");
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/medication-request/${id}/prepare`, {
      method: 'POST'
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById('resultado').innerText = data.message;
    } else {
      const error = await response.json();
      document.getElementById('resultado').innerText = error.detail;
    }
  } catch (error) {
    document.getElementById('resultado').innerText = "Error conectando al servidor";
  }
}

async function confirmarMedicamento() {
  const id = document.getElementById('medicationId').value;
  if (!id) {
    alert("Por favor ingresa el ID del medicamento");
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/medication-request/${id}/confirm`, {
      method: 'POST'
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById('resultado').innerText = data.message;
    } else {
      const error = await response.json();
      document.getElementById('resultado').innerText = error.detail;
    }
  } catch (error) {
    document.getElementById('resultado').innerText = "Error conectando al servidor";
  }
}
