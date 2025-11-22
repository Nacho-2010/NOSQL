const APIURL_ADOPCIONES = "http://localhost:3000/api/adopciones/";
function cargarDatosAdopciones() {

    $.get(APIURL_ADOPCIONES, function (adopciones) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        adopciones.forEach(a => {
            tbody.append(`
                <tr>
                    <td>${a._id}</td>
                    <td>${a.id_nino || ""}</td>
                    <td>${a.tipo || ""}</td>
                    <td>${a.fecha ? new Date(a.fecha).toLocaleDateString() : ""}</td>
                    <td>${a.detalles || ""}</td>

<td>
                      <button class="btn btn-sm btn-warning btn-editar" data-id="${a._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${a._id}">
                            Eliminar
                        </button></td>

                </tr>
            `);
        });

        console.log(adopciones);

    }).fail(function (err) {
        console.error("Error al cargar adopciones:", err);
    });
}
$("#adopcionFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        tipo: $("#tipo").val(),
        fecha: $("#fecha").val(),
        detalles: $("#detalles").val() || ""
    };

    $.ajax({
        url: APIURL_ADOPCIONES,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#adopcionFormulario")[0].reset();
            cargarDatosAdopciones();
        },
        error: function (err) {
            console.error("Error al guardar adopción/egreso:", err);
        }
    });
});

cargarDatosAdopciones();
