const APIURL_REPORTES = "http://localhost:3000/api/reportes/";

let idEditando = null;

function cargarDatosReportes() {
  $.get(APIURL_REPORTES, function (reportes) {
    const tbody = $("#tablaDatos");
    tbody.empty();

    reportes.forEach(r => {
      tbody.append(`
        <tr>
          <td>${r._id}</td>
          <td>${r.id_nino || ""}</td>
          <td>${r.fecha ? new Date(r.fecha).toLocaleDateString() : ""}</td>
          <td>${r.autor || ""}</td>
          <td>${r.descripcion || ""}</td>
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

    console.log(reportes);
  }).fail(function (err) {
    console.error("Error al cargar reportes:", err);
  });
}

// Crear / Editar
$("#reporteFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    id_nino: $("#id_nino").val(),
    fecha: $("#fecha").val(),
    autor: $("#autor").val(),
    descripcion: $("#descripcion").val()
  };

  const url = idEditando ? APIURL_REPORTES + idEditando : APIURL_REPORTES;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#reporteFormulario")[0].reset();
      idEditando = null;
      cargarDatosReportes();

      // Cerrar modal
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalReporte");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.error("Error al guardar reporte:", err);
    }
  });
});

// Eliminar
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  if (!confirm("¿Desea eliminar este reporte?")) return;

  $.ajax({
    url: APIURL_REPORTES + id,
    method: "DELETE",
    success: function () {
      cargarDatosReportes();
    },
    error: function (err) {
      console.error("Error al eliminar reporte:", err);
    }
  });
});

// Editar
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  // 0: ID, 1: id_nino, 2: fecha, 3: autor, 4: descripcion
  $("#id_nino").val($(celdas[1]).text().trim());
  // fecha mostrada está formateada, aquí podrías hacer GET /reportes/:id si quieres rellenarla exacta
  $("#fecha").val("");
  $("#autor").val($(celdas[3]).text().trim());
  $("#descripcion").val($(celdas[4]).text().trim());

  console.log("Editar reporte con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalReporte");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosReportes();
