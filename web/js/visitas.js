const APIURL_VISITAS = "http://localhost:3000/api/visitas/";

let idEditando = null;

// Cargar datos de visitas
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

// Crear / Editar visita
$("#visitaFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    id_nino: $("#id_nino").val(),
    visitante: $("#visitante").val(),
    fecha: $("#fecha").val(),
    observaciones: $("#observaciones").val() || ""
  };

  const url = idEditando ? APIURL_VISITAS + idEditando : APIURL_VISITAS;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#visitaFormulario")[0].reset();
      idEditando = null;
      cargarDatosVisitas();

      // Cerrar modal
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalVisita");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.log("Error al guardar visita: ", err);
    }
  });
});

// Eliminar visita
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");
  if (!id) {
    console.log("ID de visita no encontrado para eliminar.");
    return;
  }

  if (!confirm("¿Desea eliminar esta visita?")) return;

  $.ajax({
    url: APIURL_VISITAS + id,
    method: "DELETE",
    success: function () {
      console.log("Visita eliminada:", id);
      cargarDatosVisitas();
    },
    error: function (err) {
      console.log("Error al eliminar visita: ", err);
    }
  });
});

// Editar visita
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  // 0: ID, 1: id_nino, 2: visitante, 3: fecha, 4: observaciones
  $("#id_nino").val($(celdas[1]).text().trim());
  $("#visitante").val($(celdas[2]).text().trim());
  // fecha está formateada en la tabla, así que por ahora la dejamos vacía
  $("#fecha").val("");
  $("#observaciones").val($(celdas[4]).text().trim());

  console.log("Editar visita con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalVisita");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosVisitas();

