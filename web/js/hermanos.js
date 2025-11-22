const APIURL_HERMANOS = "http://localhost:3000/api/hermanos/";


function cargarDatosHermanos() {

    $.get(APIURL_HERMANOS, function (hermanos) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        hermanos.forEach(h => {
            tbody.append(`
                <tr>
                    <td>${h._id}</td>
                    <td>${h.id_nino || ""}</td>
                    <td>${h.id_hermano || ""}</td>
                    <td>${h.tipo || ""}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${h._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${h._id}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `);
        });

        console.log(hermanos);

    }).fail(function (err) {
        console.error("Error al cargar hermanos:", err);
    });
}


$("#hermanoFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        id_hermano: $("#id_hermano").val(),
        tipo: $("#tipo").val() || ""
    };

    $.ajax({
        url: APIURL_HERMANOS,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#hermanoFormulario")[0].reset();
            cargarDatosHermanos();
        },
        error: function (err) {
            console.error("Error al guardar hermano:", err);
        }
    });
});


$("#tablaDatos").on("click", ".btn-eliminar", function () {

    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar esta relación de hermanos?")) return;

    $.ajax({
        url: APIURL_HERMANOS + id,
        method: "DELETE",

        success: function () {
            cargarDatosHermanos();
        },
        error: function (err) {
            console.error("Error al eliminar hermano:", err);
        }
    });
});



$("#tablaDatos").on("click", ".btn-editar", function () {
    const id = $(this).data("id");
    console.log("Editar hermano con id:", id);

});


cargarDatosHermanos();
