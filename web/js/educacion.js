const APIURL_EDUCACION = "http://localhost:3000/api/educacion/";
function cargarDatosEducacion() {

    $.get(APIURL_EDUCACION, function (registros) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        registros.forEach(e => {
            tbody.append(`
                <tr>
                    <td>${e._id}</td>
                    <td>${e.id_nino || ""}</td>
                    <td>${e.centro_educativo || ""}</td>
                    <td>${e.nivel || ""}</td>
                    <td>${e.rendimiento || ""}</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-editar" data-id="${e._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${e._id}">
                            Eliminar
                        </button>
                        </td>
                </tr>
            `);
        });

        console.log(registros);

    }).fail(function (err) {
        console.error("Error al cargar educación:", err);
    });
}

$("#educacionFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        centro_educativo: $("#centro_educativo").val(),
        nivel: $("#nivel").val() || "",
        rendimiento: $("#rendimiento").val() || ""
    };

    $.ajax({
        url: APIURL_EDUCACION,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#educacionFormulario")[0].reset();
            cargarDatosEducacion();
        },
        error: function (err) {
            console.error("Error al guardar educación:", err);
        }
    });
});


$("#tablaDatos").on("click", ".btn-eliminar", function () {

    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar esta educacion del registro?")) return;

    $.ajax({
        url: APIURL_EDUCACION+ id,
        method: "DELETE",

        success: function () {
            cargarDatosEducacion();
        },
        error: function (err) {
            console.error("Error al eliminar la educacion:", err);
        }
    });
});

cargarDatosEducacion();
