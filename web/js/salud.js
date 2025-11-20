const APIURL_SALUD = "http://localhost:3000/api/salud/";

// Cargar salud
async function cargarDatosSalud() {
    try {
        const res = await fetch(APIURL_SALUD);
        const registros = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        registros.forEach(s => {
            tbody.innerHTML += `
                <tr>
                    <td>${s._id}</td>
                    <td>${s.id_nino || ""}</td>
                    <td>${s.fecha ? new Date(s.fecha).toLocaleDateString() : ""}</td>
                    <td>${s.descripcion || ""}</td>
                    <td>${s.observaciones || ""}</td>
                </tr>
            `;
        });

        console.log(registros);
    } catch (error) {
        console.log("Error al cargar salud: " + error);
    }
}

// Guardar 
document.getElementById("saludFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            fecha: document.getElementById("fecha").value,
            descripcion: document.getElementById("descripcion").value,
            observaciones: document.getElementById("observaciones").value || ""
        };

        await fetch(APIURL_SALUD, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosSalud();
    } catch (error) {
        console.log("Error al guardar salud: " + error);
    }
});

cargarDatosSalud();
