const APIURL_NINOS = "http://localhost:3000/api/ninos/";

// Cargar 
async function cargarDatosNinos() {
    try {
        const res = await fetch(APIURL_NINOS);
        const ninos = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        ninos.forEach(nino => {
            tbody.innerHTML += `
                <tr>
                    <td>${nino._id}</td>
                    <td>${nino.nombre || ""}</td>
                    <td>${nino.fecha_nacimiento ? new Date(nino.fecha_nacimiento).toLocaleDateString() : ""}</td>
                    <td>${nino.sexo || ""}</td>
                    <td>${nino.direccion_actual || ""}</td>
                    <td>${nino.estado || ""}</td>
                </tr>
            `;
        });

        console.log(ninos);
    } catch (error) {
        console.log("Error al cargar niños: " + error);
    }
}

// Guardar niño
document.getElementById("ninoFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            nombre: document.getElementById("nombre").value,
            fecha_nacimiento: document.getElementById("fecha_nacimiento").value || null,
            sexo: document.getElementById("sexo").value || null,
            direccion_actual: document.getElementById("direccion_actual").value || "",
            id_ong: document.getElementById("id_ong").value || null,
            estado: document.getElementById("estado").value || "Activo",
            responsable_actual: document.getElementById("responsable_actual").value || null
        };

        await fetch(APIURL_NINOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosNinos();
    } catch (error) {
        console.log("Error al guardar niño: " + error);
    }
});

cargarDatosNinos();
