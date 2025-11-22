const APIURL_RESPONSABLES = "http://localhost:3000/api/responsables/";

function cargarDatosResponsables() {

    $.get(APIURL_RESPONSABLES, function(responsables) {

        const tbody = $("#tablaDatos");
        tbody.html("");

        responsables.forEach(r => {
            tbody.append(`
                <tr>
                    <td>${r._id}</td>
                    <td>${r.nombre || ""}</td>
                    <td>${r.cargo || ""}</td>
                    <td>${r.telefono || ""}</td>
                    <td>${r.correo || ""}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-editar" data-id="${r._id}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar" data-id="${r._id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });

        console.log(responsables);
    })
    .fail(() => console.log("Error al cargar responsables"));
}


$("#responsablesFormulario").on("submit", function(e) {
    e.preventDefault();

    const datos = {
        nombre: $("#nombre").val(),
        cargo: $("#cargo").val() || "",
        telefono: $("#telefono").val() || "",
        correo: $("#correo").val() || ""
    };

    $.ajax({
        url: APIURL_RESPONSABLES,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),
        success: function () {
            $("#responsablesFormulario")[0].reset();
            cargarDatosResponsables();
        },
        error: function () {
            console.log("Error al guardar");
        }
    });
});


$("#tablaDatos").on("click", ".btn-eliminar", function () {
    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar este responsable?")) return;

    $.ajax({
        url: APIURL_RESPONSABLES + id,
        method: "DELETE",
        success: function () {
            cargarDatosResponsables();
        },
        error: function () {
            console.log("Error al eliminar");
        }
    });
});

cargarDatosResponsables();
