const APIURL_VISITAS = "http://localhost:3000/api/visitas/";

function cargarDatosVisitas() {

    $.get(APIURL_VISITAS, function (visitas) {

        const $tbody = $("#tablaDatos");
        $tbody.html("");

        visitas.forEach(v => {
            $tbody.append(`
                <tr>
                    <td>${v._id}</td>
                    <td>${v.id_nino || ""}</td>
                    <td>${v.visitante || ""}</td>
                    <td>${v.fecha ? new Date(v.fecha).toLocaleDateString() : ""}</td>
                    <td>${v.observaciones || ""}</td>
                     <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${v._id}">Editar</button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${v._id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });

        console.log(visitas);
    })
    .fail(err => {
        console.log("Error al cargar visitas: ", err);
    });
}
$("#visitaFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        visitante: $("#visitante").val(),
        fecha: $("#fecha").val(),
        observaciones: $("#observaciones").val() || ""
    };

    $.ajax({
        url: APIURL_VISITAS,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),
        success: function () {
            $("#visitaFormulario")[0].reset();
            cargarDatosVisitas();
        },
        error: function (err) {
            console.log("Error al guardar visita: ", err);
        }
    });
});

cargarDatosVisitas();
