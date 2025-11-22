const APIURL_ABRIGO = "http://localhost:3000/api/abrigo/";

function cargarDatosAbrigo() {

    $.get(APIURL_ABRIGO, function (abrigos) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        abrigos.forEach(abrigo => {
            tbody.append(`
                <tr>
                    <td>${abrigo._id}</td>
                    <td>${abrigo.nombre}</td>
                    <td>${abrigo.descripcion}</td>
                    <td>${abrigo.estado}</td>
                    <td>${abrigo.correo}</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-editar" data-id="${abrigo._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${abrigo._id}">
                            Eliminar
                        </button>
                        </td>
                </tr>
            `);
        });

        console.log(abrigos);

    }).fail(function (err) {
        console.error("Error al cargar abrigos:", err);
    });
}

$("#abrigoFormulario").on("submit", function (e) {

    e.preventDefault();

    const datos = {
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        estado: $("#estado").val(),
        correo: $("#correo").val(),
    };

    $.ajax({
        url: APIURL_ABRIGO,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#abrigoFormulario")[0].reset();
            cargarDatosAbrigo();
        },

        error: function (err) {
            console.error("Error al guardar abrigo:", err);
        }
    });
});
cargarDatosAbrigo();
