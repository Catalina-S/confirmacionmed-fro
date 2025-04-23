document.getElementById('MedicamentosForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const familyName = document.getElementById('familyName').value;
    const identifierSystem = document.getElementById('identifierSystem').value;
    const identifierValue = document.getElementById('identifierValue').value;
    const medicationCode = document.getElementById('medicationCode').value;
    const medicationDisplay = document.getElementById('medicationDisplay').value;
    const dosage = document.getElementById('dosage').value;
    const frequency = document.getElementById('frequency').value;
    const duration = document.getElementById('duration').value;
  
    // Crear el objeto MedicationRequest
    const medicationRequest = {
      resourceType: "MedicationRequest",
      status: "preparation",
      intent: "order",
      medicationCodeableConcept: {
        coding: [{
          system: "http://www.nlm.nih.gov/research/umls/rxnorm",
          code: medicationCode,
          display: medicationDisplay
        }]
      },
      subject: {
        identifier: {
          system: identifierSystem,
          value: identifierValue
        },
        display: `${name} ${familyName}`
      },
      dosageInstruction: [{
        text: `Tomar ${dosage} cada ${frequency} horas durante ${duration} días`
      }]
    };
  
    // Enviar la solicitud al backend
    fetch('https://meds-backend-fjhd.onrender.com/medication-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medicationRequest)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Receta creada exitosamente');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al crear la receta');
      });
      const backendUrl = "https://meds-backend-fjhd.onrender.com";
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
      
  });
  