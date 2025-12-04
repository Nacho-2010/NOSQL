const APIURL_ABRIGO = "http://localhost:3000/api/abrigo/";

let idEditando = null;

// Cargar datos en la tabla
function cargarDatosAbrigo() {
  $.get(APIURL_ABRIGO, function (abrigos) {
    const tbody = $("#tablaDatos");
    tbody.empty();

    abrigos.forEach(abrigo => {
      tbody.append(`
        <tr>
          <td>${abrigo._id}</td>
          <td>${abrigo.nombre}</td>
          <td>${abrigo.descripcion}</td>
          <td>${abrigo.estado}</td>
          <td>${abrigo.correo}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${abrigo._id}">
              Editar
            </button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${abrigo._id}">
              Eliminar
            </button>
          </td>
        </tr>
      `);
    });

    console.log(abrigos);
  }).fail(function (err) {
    console.error("Error al cargar abrigos:", err);
  });
}

// Crear / Editar abrigo
$("#abrigoFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    nombre: $("#nombre").val(),
    descripcion: $("#descripcion").val(),
    estado: $("#estado").val(),
    correo: $("#correo").val()
  };

  const url = idEditando ? APIURL_ABRIGO + idEditando : APIURL_ABRIGO;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),

    success: function () {
      $("#abrigoFormulario")[0].reset();
      idEditando = null;
      cargarDatosAbrigo();

      // Cerrar modal como en los otros módulos
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalAbrigo");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },

    error: function (err) {
      console.error("Error al guardar abrigo:", err);
    }
  });
});

// Eliminar abrigo
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  if (!confirm("¿Desea eliminar este abrigo del registro?")) return;

  $.ajax({
    url: APIURL_ABRIGO + id,
    method: "DELETE",
    success: function () {
      cargarDatosAbrigo();
    },
    error: function (err) {
      console.error("Error al eliminar el abrigo:", err);
    }
  });
});

// Editar abrigo
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  // Suponiendo que el formulario tiene estos IDs:
  $("#nombre").val($(celdas[1]).text().trim());
  $("#descripcion").val($(celdas[2]).text().trim());
  $("#estado").val($(celdas[3]).text().trim());
  $("#correo").val($(celdas[4]).text().trim());

  console.log("Editar abrigo con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalAbrigo");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosAbrigo();
