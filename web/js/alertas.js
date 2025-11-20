const APIURL_ALERTAS = "http://localhost:3000/api/alertas/";

// Cargar 
async function cargarDatosAlertas() {
    try {
        const res = await fetch(APIURL_ALERTAS);
        const alertas = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        alertas.forEach(a => {
            tbody.innerHTML += `
                <tr>
                    <td>${a._id}</td>
                    <td>${a.id_nino || ""}</td>
                    <td>${a.tipo_alerta || ""}</td>
                    <td>${a.fecha_generada ? new Date(a.fecha_generada).toLocaleDateString() : ""}</td>
                    <td>${a.dias_restantes ?? ""}</td>
                    <td>${a.estado || ""}</td>
                </tr>
            `;
        });

        console.log(alertas);
    } catch (error) {
        console.log("Error al cargar alertas: " + error);
    }
}

// Guardar alerta
document.getElementById("alertaFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            tipo_alerta: document.getElementById("tipo_alerta").value,
            fecha_generada: document.getElementById("fecha_generada").value,
            dias_restantes: document.getElementById("dias_restantes").value || null,
            estado: document.getElementById("estado").value || "Pendiente"
        };

        await fetch(APIURL_ALERTAS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosAlertas();
    } catch (error) {
        console.log("Error al guardar alerta: " + error);
    }
});

cargarDatosAlertas();
