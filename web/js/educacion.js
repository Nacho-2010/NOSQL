const APIURL_EDUCACION = "http://localhost:3000/api/educacion/";

let idEditando = null;

function cargarDatosEducacion() {
  $.get(APIURL_EDUCACION, function (registros) {
    const tbody = $("#tablaDatos");
    tbody.empty();

    registros.forEach(e => {
      tbody.append(`
        <tr>
          <td>${e._id}</td>
          <td>${e.id_nino || ""}</td>
          <td>${e.centro_educativo || ""}</td>
          <td>${e.nivel || ""}</td>
          <td>${e.rendimiento || ""}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${e._id}">
              Editar
            </button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${e._id}">
              Eliminar
            </button>
          </td>
        </tr>
      `);
    });

    console.log(registros);
  }).fail(function (err) {
    console.error("Error al cargar educación:", err);
  });
}

// Crear / Editar
$("#educacionFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    id_nino: $("#id_nino").val(),
    centro_educativo: $("#centro_educativo").val(),
    nivel: $("#nivel").val() || "",
    rendimiento: $("#rendimiento").val() || ""
  };

  const url = idEditando ? APIURL_EDUCACION + idEditando : APIURL_EDUCACION;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#educacionFormulario")[0].reset();
      idEditando = null;
      cargarDatosEducacion();

      // Cerrar modal
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalEdu");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.error("Error al guardar educación:", err);
    }
  });
});

// Eliminar
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  if (!confirm("¿Desea eliminar esta educación del registro?")) return;

  $.ajax({
    url: APIURL_EDUCACION + id,
    method: "DELETE",
    success: function () {
      cargarDatosEducacion();
    },
    error: function (err) {
      console.error("Error al eliminar la educación:", err);
    }
  });
});

// Editar
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  // 0: ID, 1: id_nino, 2: centro_educativo, 3: nivel, 4: rendimiento
  $("#id_nino").val($(celdas[1]).text().trim());
  $("#centro_educativo").val($(celdas[2]).text().trim());
  $("#nivel").val($(celdas[3]).text().trim());
  $("#rendimiento").val($(celdas[4]).text().trim());

  console.log("Editar educación con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalEdu");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosEducacion();