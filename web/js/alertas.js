const APIURL_ALERTAS = "http://localhost:3000/api/alertas/";

function cargarDatosAlertas() {

    $.get(APIURL_ALERTAS, function (alertas) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        alertas.forEach(a => {
            tbody.append(`
                <tr>
                    <td>${a._id}</td>
                    <td>${a.id_nino || ""}</td>
                    <td>${a.tipo_alerta || ""}</td>
                    <td>${a.fecha_generada ? new Date(a.fecha_generada).toLocaleDateString() : ""}</td>
                    <td>${a.dias_restantes ?? ""}</td>
                    <td>${a.estado || ""}</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-editar" data-id="${a._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${a._id}">
                            Eliminar
                        </button>
                        </td>
                </tr>
            `);
        });

        console.log(alertas);

    }).fail(function (err) {
        console.error("Error al cargar alertas:", err);
    });
}

$("#alertaFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        tipo_alerta: $("#tipo_alerta").val(),
        fecha_generada: $("#fecha_generada").val(),
        dias_restantes: $("#dias_restantes").val() || null,
        estado: $("#estado").val() || "Pendiente"
    };

    $.ajax({
        url: APIURL_ALERTAS,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#alertaFormulario")[0].reset();
            cargarDatosAlertas();
        },
        error: function (err) {
            console.error("Error al guardar alerta:", err);
        }
    });
});


cargarDatosAlertas();
