const APIURL_FAMILIARES = "http://localhost:3000/api/familiares/";
function cargarDatosFamiliares() {

    $.get(APIURL_FAMILIARES, function (familiares) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        familiares.forEach(fam => {
            tbody.append(`
                <tr>
                    <td>${fam._id}</td>
                    <td>${fam.nombre || ""}</td>
                    <td>${fam.parentesco || ""}</td>
                    <td>${fam.telefono || ""}</td>
                    <td>${fam.estado_contacto || ""}</td>
                    <td>${fam.id_nino || ""}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${fam._id}">Editar</button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${fam._id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });

        console.log(familiares);

    }).fail(function (err) {
        console.error("Error al cargar familiares:", err);
    });
}


$("#familiarFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        nombre: $("#nombre").val(),
        parentesco: $("#parentesco").val() || "Desconocido",
        telefono: $("#telefono").val() || "",
        estado_contacto: $("#estado_contacto").val() || "Sin contacto",
        id_nino: $("#id_nino").val()
    };

    $.ajax({
        url: APIURL_FAMILIARES,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#familiarFormulario")[0].reset();
            cargarDatosFamiliares();
        },
        error: function (err) {
            console.error("Error al guardar familiar:", err);
        }
    });
});


$("#tablaDatos").on("click", ".btn-eliminar", function () {

    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar este familiar?")) return;

    $.ajax({
        url: APIURL_FAMILIARES + id,
        method: "DELETE",

        success: function () {
            cargarDatosFamiliares();
        },
        error: function (err) {
            console.error("Error al eliminar familiar:", err);
        }
    });
});

cargarDatosFamiliares();
