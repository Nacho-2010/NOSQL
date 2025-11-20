const APIURL_VISITAS = "http://localhost:3000/api/visitas/";

// Cargar visitas
async function cargarDatosVisitas() {
    try {
        const res = await fetch(APIURL_VISITAS);
        const visitas = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        visitas.forEach(v => {
            tbody.innerHTML += `
                <tr>
                    <td>${v._id}</td>
                    <td>${v.id_nino || ""}</td>
                    <td>${v.visitante || ""}</td>
                    <td>${v.fecha ? new Date(v.fecha).toLocaleDateString() : ""}</td>
                    <td>${v.observaciones || ""}</td>
                </tr>
            `;
        });

        console.log(visitas);
    } catch (error) {
        console.log("Error al cargar visitas: " + error);
    }
}

// Guardar visita
document.getElementById("visitaFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            visitante: document.getElementById("visitante").value,
            fecha: document.getElementById("fecha").value,
            observaciones: document.getElementById("observaciones").value || ""
        };

        await fetch(APIURL_VISITAS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosVisitas();
    } catch (error) {
        console.log("Error al guardar visita: " + error);
    }
});

cargarDatosVisitas();
