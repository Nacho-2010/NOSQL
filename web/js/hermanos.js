const APIURL_HERMANOS = "http://localhost:3000/api/hermanos/";

// Cargar hermanos
async function cargarDatosHermanos() {
    try {
        const res = await fetch(APIURL_HERMANOS);
        const hermanos = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        hermanos.forEach(h => {
            tbody.innerHTML += `
                <tr>
                    <td>${h._id}</td>
                    <td>${h.id_nino || ""}</td>
                    <td>${h.id_hermano || ""}</td>
                    <td>${h.tipo || ""}</td>
                </tr>
            `;
        });

        console.log(hermanos);
    } catch (error) {
        console.log("Error al cargar hermanos: " + error);
    }
}

// Guardar relación 
document.getElementById("hermanoFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            id_hermano: document.getElementById("id_hermano").value,
            tipo: document.getElementById("tipo").value || ""
        };

        await fetch(APIURL_HERMANOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosHermanos();
    } catch (error) {
        console.log("Error al guardar hermano: " + error);
    }
});

cargarDatosHermanos();
