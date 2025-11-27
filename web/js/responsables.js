const APIURL_RESPONSABLES = "http://localhost:3000/api/responsables/";

let idEditando = null; 

function cargarDatosResponsables() {

    $.get(APIURL_RESPONSABLES, function (responsables) {

        const tbody = $("#tablaDatos");
        tbody.empty();

        responsables.forEach(r => {
            tbody.append(`
                <tr>
                    <td>${r._id}</td>
                    <td>${r.nombre || ""}</td>
                    <td>${r.cargo || ""}</td>
                    <td>${r.telefono || ""}</td>
                    <td>${r.correo || ""}</td>
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

        console.log(responsables);

    }).fail(function (err) {
        console.error("Error al cargar responsables:", err);
    });
}

//Crear / Editar
$("#responsablesFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        nombre: $("#nombre").val(),
        cargo: $("#cargo").val() || "",
        telefono: $("#telefono").val() || "",
        correo: $("#correo").val() || ""
    };

    const url = idEditando ? APIURL_RESPONSABLES + idEditando : APIURL_RESPONSABLES;
    const metodo = idEditando ? "PUT" : "POST";

    $.ajax({
        url: url,
        method: metodo,
        contentType: "application/json",
        data: JSON.stringify(datos),
        success: function () {
            $("#responsablesFormulario")[0].reset();
            idEditando = null;
            cargarDatosResponsables();

            // Cerrar modal igual que en ONG
            if (window.bootstrap) {
                const modalEl = document.getElementById("modalResp");
                if (modalEl) {
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();
                }
            }
        },
        error: function (err) {
            console.error("Error al guardar responsable:", err);
        }
    });
});

// Eliminar
$("#tablaDatos").on("click", ".btn-eliminar", function () {
    const id = $(this).data("id");

    if (!confirm("¿Desea eliminar este responsable?")) return;

    $.ajax({
        url: APIURL_RESPONSABLES + id,
        method: "DELETE",
        success: function () {
            cargarDatosResponsables();
        },
        error: function (err) {
            console.error("Error al eliminar responsable:", err);
        }
    });
});

//Editar
$("#tablaDatos").on("click", ".btn-editar", function () {
    const id = $(this).data("id");
    idEditando = id;

    const $fila = $(this).closest("tr");
    const celdas = $fila.find("td");

    $("#nombre").val($(celdas[1]).text().trim());
    $("#cargo").val($(celdas[2]).text().trim());
    $("#telefono").val($(celdas[3]).text().trim());
    $("#correo").val($(celdas[4]).text().trim());

    console.log("Editar responsable con id:", id);

    if (window.bootstrap) {
        const modalEl = document.getElementById("modalResp");
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.show();
        }
    }
});

cargarDatosResponsables();