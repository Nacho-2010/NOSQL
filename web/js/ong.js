const APIURL_ONG = "http://localhost:3000/api/ong/";

// Cargar 
async function cargarDatosOng() {
    try {
        const res = await fetch(APIURL_ONG);
        const ongs = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        ongs.forEach(o => {
            tbody.innerHTML += `
                <tr>
                    <td>${o._id}</td>
                    <td>${o.nombre || ""}</td>
                    <td>${o.provincia || ""}</td>
                    <td>${o.telefono || ""}</td>
                    <td>${o.correo || ""}</td>
                    <td>${o.capacidad || ""}</td>
                </tr>
            `;
        });

        console.log(ongs);
    } catch (error) {
        console.log("Error al cargar ONG: " + error);
    }
}

// Guardar ONG
document.getElementById("ongFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            nombre: document.getElementById("nombre").value,
            provincia: document.getElementById("provincia").value || "",
            telefono: document.getElementById("telefono").value || "",
            correo: document.getElementById("correo").value || "",
            capacidad: document.getElementById("capacidad").value || null
        };

        await fetch(APIURL_ONG, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosOng();
    } catch (error) {
        console.log("Error al guardar ONG: " + error);
    }
});

cargarDatosOng();
