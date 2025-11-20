const APIURL_UBICACIONES = "http://localhost:3000/api/ubicaciones/";

// Cargar ubicaciones
async function cargarDatosUbicaciones() {
    try {
        const res = await fetch(APIURL_UBICACIONES);
        const ubicaciones = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        ubicaciones.forEach(u => {
            tbody.innerHTML += `
                <tr>
                    <td>${u._id}</td>
                    <td>${u.id_nino || ""}</td>
                    <td>${u.direccion || ""}</td>
                    <td>${u.fecha_inicio ? new Date(u.fecha_inicio).toLocaleDateString() : ""}</td>
                    <td>${u.fecha_fin ? new Date(u.fecha_fin).toLocaleDateString() : ""}</td>
                    <td>${u.coordenadas?.lat || ""}</td>
                    <td>${u.coordenadas?.lng || ""}</td>
                </tr>
            `;
        });

        console.log(ubicaciones);
    } catch (error) {
        console.log("Error al cargar ubicaciones: " + error);
    }
}

// Guardar ubicación
document.getElementById("ubicacionFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            id_nino: document.getElementById("id_nino").value,
            direccion: document.getElementById("direccion").value,
            fecha_inicio: document.getElementById("fecha_inicio").value || null,
            fecha_fin: document.getElementById("fecha_fin").value || null,
            coordenadas: {
                lat: document.getElementById("lat").value || null,
                lng: document.getElementById("lng").value || null
            }
        };

        await fetch(APIURL_UBICACIONES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosUbicaciones();
    } catch (error) {
        console.log("Error al guardar ubicación: " + error);
    }
});

cargarDatosUbicaciones();
