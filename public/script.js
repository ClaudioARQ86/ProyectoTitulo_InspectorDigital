document.getElementById('inspectionForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const data = {
        asegurado_id: document.getElementById('asegurado_id').value,
        tipo_siniestro: document.getElementById('tipo_siniestro').value,
        descripcion: document.getElementById('descripcion').value
    };

    try {
        const response = await fetch('/api/inspecciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const mensajeDiv = document.getElementById('mensaje');
        
        if (response.ok) {
            mensajeDiv.style.color = "green";
            mensajeDiv.innerText = "¡Inspección enviada con éxito!";
            document.getElementById('inspectionForm').reset();
        } else {
            throw new Error(result.mensaje || "Error al enviar");
        }
    } catch (error) {
        document.getElementById('mensaje').style.color = "red";
        document.getElementById('mensaje').innerText = "Error: " + error.message;
    }
});