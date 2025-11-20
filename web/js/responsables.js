const APIURL_RESPONSABLES = "http://localhost:3000/api/responsables/";

// Cargar lista de responsables
async function cargarDatosResponsables() {
    try {
        const res = await fetch(APIURL_RESPONSABLES);
        const responsables = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        responsables.forEach(r => {
            tbody.innerHTML += `
                <tr>
                    <td>${r._id}</td>
                    <td>${r.nombre || ""}</td>
                    <td>${r.cargo || ""}</td>
                    <td>${r.telefono || ""}</td>
                    <td>${r.correo || ""}</td>
                </tr>
            `;
        });

        console.log(responsables);
    } catch (error) {
        console.log("Error al cargar responsables: " + error);
    }
}

// Guardar responsable
document.getElementById("responsablesFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            nombre: document.getElementById("nombre").value,
            cargo: document.getElementById("cargo").value || "",
            telefono: document.getElementById("telefono").value || "",
            correo: document.getElementById("correo").value || ""
        };

        await fetch(APIURL_RESPONSABLES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosResponsables();
    } catch (error) {
        console.log("Error al guardar responsable: " + error);
    }
});

cargarDatosResponsables();
