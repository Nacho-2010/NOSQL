const APIURL_ADOPCIONES = "http://localhost:3000/api/adopciones/";


async function cargarDatosAdopciones() {
    try {
        const res = await fetch(APIURL_ADOPCIONES);
        const adopciones = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        adopciones.forEach(a => {
            tbody.innerHTML += `
                <tr>
                    <td>${a._id}</td>
                    <td>${a.id_nino || ""}</td>
                    <td>${a.tipo || ""}</td>
                    <td>${a.fecha ? new Date(a.fecha).toLocaleDateString() : ""}</td>
                    <td>${a.detalles || ""}</td>
                </tr>
            `;
        });

        console.log(adopciones);
    } catch (error) {
        console.log("Error al cargar adopciones: " + error);
    }
}

// Guardar 
document.getElementById("adopcionFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            tipo: document.getElementById("tipo").value,
            fecha: document.getElementById("fecha").value,
            detalles: document.getElementById("detalles").value || ""
        };

        await fetch(APIURL_ADOPCIONES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosAdopciones();
    } catch (error) {
        console.log("Error al guardar adopción/egreso: " + error);
    }
});

cargarDatosAdopciones();
