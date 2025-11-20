const APIURL_EDUCACION = "http://localhost:3000/api/educacion/";

// Cargar educación
async function cargarDatosEducacion() {
    try {
        const res = await fetch(APIURL_EDUCACION);
        const registros = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        registros.forEach(e => {
            tbody.innerHTML += `
                <tr>
                    <td>${e._id}</td>
                    <td>${e.id_nino || ""}</td>
                    <td>${e.centro_educativo || ""}</td>
                    <td>${e.nivel || ""}</td>
                    <td>${e.rendimiento || ""}</td>
                </tr>
            `;
        });

        console.log(registros);
    } catch (error) {
        console.log("Error al cargar educación: " + error);
    }
}

// Guardar  educativo
document.getElementById("educacionFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            centro_educativo: document.getElementById("centro_educativo").value,
            nivel: document.getElementById("nivel").value || "",
            rendimiento: document.getElementById("rendimiento").value || ""
        };

        await fetch(APIURL_EDUCACION, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosEducacion();
    } catch (error) {
        console.log("Error al guardar educación: " + error);
    }
});

cargarDatosEducacion();
