const APIURL_SALUD = "http://localhost:3000/api/salud/";


function cargarDatosSalud() {

    $.get(APIURL_SALUD, function (registros) {

        const $tbody = $("#tablaDatos");
        $tbody.html(""); 

        registros.forEach(s => {
            $tbody.append(`
                <tr>
                    <td>${s._id}</td>
                    <td>${s.id_nino || ""}</td>
                    <td>${s.fecha ? new Date(s.fecha).toLocaleDateString() : ""}</td>
                    <td>${s.descripcion || ""}</td>
                    <td>${s.observaciones || ""}</td>
                                   <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${s._id}">Editar</button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${s._id}">Eliminar</button>
                    </td>

                </tr>
            `);
        });

        console.log(registros);
    })
    .fail(err => {
        console.log("Error al cargar salud: ", err);
    });
}

$("#saludFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        fecha: $("#fecha").val(),
        descripcion: $("#descripcion").val(),
        observaciones: $("#observaciones").val() || ""
    };

    $.ajax({
        url: APIURL_SALUD,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),
        success: function () {
            $("#saludFormulario")[0].reset();
            cargarDatosSalud();
        },
        error: function (err) {
            console.log("Error al guardar salud: ", err);
        }
    });
});
cargarDatosSalud();
