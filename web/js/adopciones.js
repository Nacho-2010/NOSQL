const APIURL_ADOPCIONES = "http://localhost:3000/api/adopciones/";

let idEditando = null;

// Cargar datos
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
            </button>
          </td>
        </tr>
      `);
    });

    console.log(adopciones);
  }).fail(function (err) {
    console.error("Error al cargar adopciones:", err);
  });
}

// Crear / Editar
$("#adopcionFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    id_nino: $("#id_nino").val(),
    tipo: $("#tipo").val(),
    fecha: $("#fecha").val(),
    detalles: $("#detalles").val() || ""
  };

  const url = idEditando ? APIURL_ADOPCIONES + idEditando : APIURL_ADOPCIONES;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#adopcionFormulario")[0].reset();
      idEditando = null;
      cargarDatosAdopciones();

      // Cerrar modal
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalAdopcion");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.error("Error al guardar adopción/egreso:", err);
    }
  });
});

// Eliminar
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");
  if (!id) {
    console.log("ID de adopción no encontrado para eliminar.");
    return;
  }

  if (!confirm("¿Desea eliminar esta adopción/egreso?")) return;

  $.ajax({
    url: APIURL_ADOPCIONES + id,
    method: "DELETE",
    success: function () {
      console.log("Adopción eliminada:", id);
      cargarDatosAdopciones();
    },
    error: function (err) {
      console.error("Error al eliminar adopción:", err);
    }
  });
});

// Editar
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  // 0: ID, 1: id_nino, 2: tipo, 3: fecha, 4: detalles
  $("#id_nino").val($(celdas[1]).text().trim());
  $("#tipo").val($(celdas[2]).text().trim());
  // fecha está formateada en la tabla, así que aquí la dejamos vacía
  // si quieres que se rellene bien, habría que hacer GET /adopciones/:id
  $("#fecha").val("");
  $("#detalles").val($(celdas[4]).text().trim());

  console.log("Editar adopción con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalAdopcion");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosAdopciones();