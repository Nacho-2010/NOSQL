const APIURL_REPORTES = "http://localhost:3000/api/reportes/";

function cargarDatosReportes() {

    $.get(APIURL_REPORTES, function (reportes) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        reportes.forEach(r => {
            tbody.append(`
                <tr>
                    <td>${r._id}</td>
                    <td>${r.id_nino || ""}</td>
                    <td>${r.fecha ? new Date(r.fecha).toLocaleDateString() : ""}</td>
                    <td>${r.autor || ""}</td>
                    <td>${r.descripcion || ""}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${r._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${r._id}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `);
        });

        console.log(reportes);

    }).fail(function (err) {
        console.error("Error al cargar reportes:", err);
    });
}


$("#reporteFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        fecha: $("#fecha").val(),
        autor: $("#autor").val(),
        descripcion: $("#descripcion").val()
    };

    $.ajax({
        url: APIURL_REPORTES,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#reporteFormulario")[0].reset();
            cargarDatosReportes();
        },

        error: function (err) {
            console.error("Error al guardar reporte:", err);
        }
    });
});


$("#tablaDatos").on("click", ".btn-eliminar", function () {

    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar este reporte?")) return;

    $.ajax({
        url: APIURL_REPORTES + id,
        method: "DELETE",

        success: function () {
            cargarDatosReportes();
        },

        error: function (err) {
            console.error("Error al eliminar reporte:", err);
        }
    });
});



$("#tablaDatos").on("click", ".btn-editar", function () {
    const id = $(this).data("id");
    console.log("Editar reporte con id:", id);
 
});

cargarDatosReportes();
