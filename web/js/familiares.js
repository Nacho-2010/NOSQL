const APIURL_FAMILIARES = "http://localhost:3000/api/familiares/";

// Cargar 
async function cargarDatosFamiliares() {
    try {
      
        const res = await fetch(APIURL_FAMILIARES);
        const familiares = await res.json();

        const tbody = document.getElementById("tablaDatos");
        tbody.innerHTML = "";

        familiares.forEach(fam => {
            tbody.innerHTML += `
                <tr>
                    <td>${fam._id}</td>
                    <td>${fam.nombre || ""}</td>
                    <td>${fam.parentesco || ""}</td>
                    <td>${fam.telefono || ""}</td>
                    <td>${fam.estado_contacto || ""}</td>
                    <td>${fam.id_nino || ""}</td>
                      <td>
                <button class="btn btn-sm btn-warning btn-editar" data-id="${fam._id}">Editar</button>
                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${fam._id}">Eliminar</button>
            </td>
                </tr>
            `;
        });

        console.log(familiares);
    } catch (error) {
        console.log("Error al cargar familiares: " + error);
    }
}

// Guardar familiar
document.getElementById("familiarFormulario").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const datos = {
            nombre: document.getElementById("nombre").value,
            parentesco: document.getElementById("parentesco").value || "Desconocido",
            telefono: document.getElementById("telefono").value || "",
            estado_contacto: document.getElementById("estado_contacto").value || "Sin contacto",
            id_nino: document.getElementById("id_nino").value // aquí debe ir el ObjectId del niño
        };

        await fetch(APIURL_FAMILIARES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        e.target.reset();
        cargarDatosFamiliares();
    } catch (error) {
        console.log("Error al guardar familiar: " + error);
    }
});

const tbody = document.getElementById("tablaDatos");

tbody.addEventListener("click", async (e) => {
    const btn = e.target;

    
    
    if (btn.classList.contains("btn-eliminar")) {
        const id = btn.dataset.id;

        if (!confirm("¿Desea eliminar este familiar?")) return;

        try {
            await fetch(APIURL_FAMILIARES + id, {
                method: "DELETE"
            });
            cargarDatosFamiliares();
        } catch (error) {
            console.log("Error al eliminar familiar: " + error);
        }
    }
});

cargarDatosFamiliares();
