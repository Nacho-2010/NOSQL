const APIURL_NINOS = "http://localhost:3000/api/ninos/";


function cargarDatosNinos() {

    $.get(APIURL_NINOS, function (ninos) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        ninos.forEach(nino => {
            tbody.append(`
                <tr>
                    <td>${nino._id}</td>
                    <td>${nino.nombre || ""}</td>
                    <td>${nino.fecha_nacimiento ? new Date(nino.fecha_nacimiento).toLocaleDateString() : ""}</td>
                    <td>${nino.sexo || ""}</td>
                    <td>${nino.direccion_actual || ""}</td>
                    <td>${nino.estado || ""}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${nino._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${nino._id}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `);
        });

        console.log(ninos);

    }).fail(function (err) {
        console.error("Error al cargar niños:", err);
    });
}



$("#ninoFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        nombre: $("#nombre").val(),
        fecha_nacimiento: $("#fecha_nacimiento").val() || null,
        sexo: $("#sexo").val() || null,
        direccion_actual: $("#direccion_actual").val() || "",
        id_ong: $("#id_ong").val() || null,
        estado: $("#estado").val() || "Activo",
        responsable_actual: $("#responsable_actual").val() || null
    };

    $.ajax({
        url: APIURL_NINOS,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#ninoFormulario")[0].reset();
            cargarDatosNinos();
        },
        error: function (err) {
            console.error("Error al guardar niño:", err);
        }
    });
});


$("#tablaDatos").on("click", ".btn-eliminar", function () {

    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar este niño del registro?")) return;

    $.ajax({
        url: APIURL_NINOS + id,
        method: "DELETE",

        success: function () {
            cargarDatosNinos();
        },
        error: function (err) {
            console.error("Error al eliminar niño:", err);
        }
    });
});



$("#tablaDatos").on("click", ".btn-editar", function () {
    const id = $(this).data("id");
    console.log("Editar niño con id:", id);

});


cargarDatosNinos();
