const APIURL_ONG = "http://localhost:3000/api/ong/";


function cargarDatosOng() {

    $.get(APIURL_ONG, function (ongs) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        ongs.forEach(o => {
            tbody.append(`
                <tr>
                    <td>${o._id}</td>
                    <td>${o.nombre || ""}</td>
                    <td>${o.provincia || ""}</td>
                    <td>${o.telefono || ""}</td>
                    <td>${o.correo || ""}</td>
                    <td>${o.capacidad || ""}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${o._id}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${o._id}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `);
        });

        console.log(ongs);

    }).fail(function (err) {
        console.error("Error al cargar ONG:", err);
    });
}



$("#ongFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        nombre: $("#nombre").val(),
        provincia: $("#provincia").val() || "",
        telefono: $("#telefono").val() || "",
        correo: $("#correo").val() || "",
        capacidad: $("#capacidad").val() || null
    };

    $.ajax({
        url: APIURL_ONG,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#ongFormulario")[0].reset();
            cargarDatosOng();
        },
        error: function (err) {
            console.error("Error al guardar ONG:", err);
        }
    });
});



$("#tablaDatos").on("click", ".btn-eliminar", function () {
    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar esta ONG?")) return;

    $.ajax({
        url: APIURL_ONG + id,
        method: "DELETE",
        success: function () {
            cargarDatosOng();
        },
        error: function (err) {
            console.error("Error al eliminar ONG:", err);
        }
    });
});



$("#tablaDatos").on("click", ".btn-editar", function () {
    const id = $(this).data("id");
    console.log("Editar ONG con id:", id);

});


cargarDatosOng();
