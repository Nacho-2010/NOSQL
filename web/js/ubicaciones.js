const APIURL_UBICACIONES = "http://localhost:3000/api/ubicaciones/";


function cargarDatosUbicaciones() {

    $.get(APIURL_UBICACIONES, function (ubicaciones) {

        const $tbody = $("#tablaDatos");
        $tbody.html("");

        ubicaciones.forEach(u => {
            $tbody.append(`
                <tr>
                    <td>${u._id}</td>
                    <td>${u.id_nino || ""}</td>
                    <td>${u.direccion || ""}</td>
                    <td>${u.fecha_inicio ? new Date(u.fecha_inicio).toLocaleDateString() : ""}</td>
                    <td>${u.fecha_fin ? new Date(u.fecha_fin).toLocaleDateString() : ""}</td>
                    <td>${u.coordenadas?.lat || ""}</td>
                    <td>${u.coordenadas?.lng || ""}</td>
                     <td>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${u._id}">Editar</button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${u._id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });

        console.log(ubicaciones);
    })
    .fail(err => {
        console.log("Error al cargar ubicaciones: ", err);
    });
}

$("#ubicacionFormulario").on("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_nino: $("#id_nino").val(),
        direccion: $("#direccion").val(),
        fecha_inicio: $("#fecha_inicio").val() || null,
        fecha_fin: $("#fecha_fin").val() || null,
        coordenadas: {
            lat: $("#lat").val() || null,
            lng: $("#lng").val() || null
        }
    };

    $.ajax({
        url: APIURL_UBICACIONES,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),
        success: function () {
            $("#ubicacionFormulario")[0].reset();
            cargarDatosUbicaciones();
        },
        error: function (err) {
            console.log("Error al guardar ubicación: ", err);
        }
    });
});

$(document).on("click", ".btn-eliminar", function () {
    const id = $(this).data("id");
    if (!id) {
        console.log("ID de ubicación no encontrado para eliminar.");
        return;
    }
    $.ajax({
        url: APIURL_UBICACIONES + id,
        method: "DELETE",
        success: function () {
            console.log("Ubicación eliminada:", id);
            cargarDatosUbicaciones();
        },
        error: function (err) {
            console.log("Error al eliminar ubicación: ", err);
        }
    });
});

cargarDatosUbicaciones();
