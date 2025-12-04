const APIURL_SALUD = "http://localhost:3000/api/salud/";

let idEditando = null;

// Cargar datos de salud en la tabla
function cargarDatosSalud() {
  $.get(APIURL_SALUD, function (registros) {
    const $tbody = $("#tablaDatos");
    $tbody.html("");

    registros.forEach(s => {
      $tbody.append(`
        <tr>
          <td>${s._id}</td>
          <td>${s.id_nino || ""}</td>
          <td>${s.fecha ? new Date(s.fecha).toLocaleDateString() : ""}</td>
          <td>${s.descripcion || ""}</td>
          <td>${s.observaciones || ""}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${s._id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${s._id}">Eliminar</button>
          </td>
        </tr>
      `);
    });

    console.log(registros);
  })
  .fail(err => {
    console.log("Error al cargar salud: ", err);
  });
}

// Crear / Editar registro de salud
$("#saludFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    id_nino: $("#id_nino").val(),
    fecha: $("#fecha").val(),
    descripcion: $("#descripcion").val(),
    observaciones: $("#observaciones").val() || ""
  };

  const url = idEditando ? APIURL_SALUD + idEditando : APIURL_SALUD;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#saludFormulario")[0].reset();
      idEditando = null;
      cargarDatosSalud();

      // Cerrar modal después de guardar
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalSalud");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.log("Error al guardar salud: ", err);
    }
  });
});

// Eliminar registro de salud
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  if (!confirm("¿Desea eliminar este registro de salud?")) return;

  $.ajax({
    url: APIURL_SALUD + id,
    method: "DELETE",
    success: function () {
      cargarDatosSalud();
    },
    error: function (err) {
      console.error("Error al eliminar el registro de salud:", err);
    }
  });
});

// Editar registro de salud
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  // Mapeo según el orden de columnas:
  // 0: ID, 1: id_nino, 2: fecha, 3: descripcion, 4: observaciones
  $("#id_nino").val($(celdas[1]).text().trim());
  // fecha en la tabla está formateada, así que mejor la dejamos vacía o luego la rellenas con GET /salud/:id si quieres afinar
  $("#fecha").val("");
  $("#descripcion").val($(celdas[3]).text().trim());
  $("#observaciones").val($(celdas[4]).text().trim());

  console.log("Editar registro de salud con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalSalud");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosSalud();