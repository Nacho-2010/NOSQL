const APIURL_ABRIGO = "http://localhost:3000/api/abrigo/";

// Cargar lista 
async function cargarDatosAbrigo() {
    try {
        const res = await fetch(APIURL_ABRIGO);
        const abrigos = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = '';

        abrigos.forEach(elementAbrigo => {
            tbody.innerHTML += `
                <tr>
                    <td scope="row">${elementAbrigo._id}</td>
                    <td>${elementAbrigo.nombre}</td>
                    <td>${elementAbrigo.descripcion}</td>
                    <td>${elementAbrigo.estado}</td>
                    <td>${elementAbrigo.correo}</td>
                </tr>
            `;
        });

        console.log(abrigos);
    } catch (error) {
        console.log("Error al cargar abrigos: " + error);
    }
}

// Guardar 
document.getElementById("abrigoFormulario").addEventListener('submit', async e => {
    e.preventDefault();

    try {
        const datos = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            estado: document.getElementById("estado").value,
            correo: document.getElementById("correo").value,
        };

        await fetch(APIURL_ABRIGO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosAbrigo();
    } catch (error) {
        console.log("Error al guardar abrigo: " + error);
    }
});


cargarDatosAbrigo();
