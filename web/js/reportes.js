const APIURL_REPORTES = "http://localhost:3000/api/reportes/";

// Cargar reportes
async function cargarDatosReportes() {
    try {
        const res = await fetch(APIURL_REPORTES);
        const reportes = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        reportes.forEach(r => {
            tbody.innerHTML += `
                <tr>
                    <td>${r._id}</td>
                    <td>${r.id_nino || ""}</td>
                    <td>${r.fecha ? new Date(r.fecha).toLocaleDateString() : ""}</td>
                    <td>${r.autor || ""}</td>
                    <td>${r.descripcion || ""}</td>
                </tr>
            `;
        });

        console.log(reportes);
    } catch (error) {
        console.log("Error al cargar reportes: " + error);
    }
}

// Guardar reporte
document.getElementById("reporteFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            fecha: document.getElementById("fecha").value,
            autor: document.getElementById("autor").value,
            descripcion: document.getElementById("descripcion").value
        };

        await fetch(APIURL_REPORTES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosReportes();
    } catch (error) {
        console.log("Error al guardar reporte: " + error);
    }
});

cargarDatosReportes();
