const APIURL_ONG = "http://localhost:3000/api/ong/";


let idEditando = null;

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


    const url = idEditando ? APIURL_ONG + idEditando : APIURL_ONG;
    const metodo = idEditando ? "PUT" : "POST";

    $.ajax({
        url: url,
        method: metodo,
        contentType: "application/json",
        data: JSON.stringify(datos),

        success: function () {
            $("#ongFormulario")[0].reset();
            idEditando = null; 
            cargarDatosOng();

            if (window.bootstrap) {
                const modalEl = document.getElementById("modalOng");
                if (modalEl) {
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();
                }
            }
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
    idEditando = id; 

    const $fila = $(this).closest("tr");
    const celdas = $fila.find("td");

    $("#nombre").val($(celdas[1]).text().trim());
    $("#provincia").val($(celdas[2]).text().trim());
    $("#telefono").val($(celdas[3]).text().trim());
    $("#correo").val($(celdas[4]).text().trim());
    $("#capacidad").val($(celdas[5]).text().trim());

    console.log("Editar ONG con id:", id);

 
    if (window.bootstrap) {
        const modalEl = document.getElementById("modalOng");
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.show();
        }
    }
});


cargarDatosOng();
