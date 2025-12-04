const APIURL_HERMANOS = "http://localhost:3000/api/hermanos/";

let idEditando = null;

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

// Crear / Editar
$("#hermanoFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    id_nino: $("#id_nino").val(),
    id_hermano: $("#id_hermano").val(),
    tipo: $("#tipo").val() || ""
  };

  const url = idEditando ? APIURL_HERMANOS + idEditando : APIURL_HERMANOS;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#hermanoFormulario")[0].reset();
      idEditando = null;
      cargarDatosHermanos();

      // Cerrar modal
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalHermano");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.error("Error al guardar hermano:", err);
    }
  });
});

// Eliminar
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

// Editar
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  $("#id_nino").val($(celdas[1]).text().trim());
  $("#id_hermano").val($(celdas[2]).text().trim());
  $("#tipo").val($(celdas[3]).text().trim());

  console.log("Editar hermano con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalHermano");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosHermanos();
