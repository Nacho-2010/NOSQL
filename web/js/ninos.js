const APIURL_NINOS = "http://localhost:3000/api/ninos/";

let idEditando = null;

// Cargar datos en la tabla
function cargarDatosNinos() {
  $.get(APIURL_NINOS, function (ninos) {
    const tbody = $("#tablaDatos");
    tbody.empty();

    ninos.forEach(nino => {
      tbody.append(`
        <tr>
          <td>${nino._id}</td>
          <td>${nino.nombre || ""}</td>
          <td>${nino.fecha_nacimiento ? new Date(nino.fecha_nacimiento).toLocaleDateString() : ""}</td>
          <td>${nino.genero || ""}</td>
          <td>${nino.direccion_actual || ""}</td>
          <td>${nino.estado || ""}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${nino._id}">
              Editar
            </button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${nino._id}">
              Eliminar
            </button>
          </td>
        </tr>
      `);
    });

    console.log(ninos);
  }).fail(function (err) {
    console.error("Error al cargar niños:", err);
  });
}

// Crear / Editar niño
$("#ninoFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    nombre: $("#nombre").val(),
    fecha_nacimiento: $("#fecha_nacimiento").val() || null,
    genero: $("#genero").val() || null,
    direccion_actual: $("#direccion_actual").val() || "",
    id_ong: $("#id_ong").val() || null,
    estado: $("#estado").val() || "Activo",
    responsable_actual: $("#responsable_actual").val() || null
  };

  const url = idEditando ? APIURL_NINOS + idEditando : APIURL_NINOS;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#ninoFormulario")[0].reset();
      idEditando = null;
      cargarDatosNinos();

      // Cerrar modal igual que en Responsables
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalNino");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.error("Error al guardar niño:", err);
    }
  });
});

// Eliminar niño
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  if (!confirm("¿Desea eliminar este niño del registro?")) return;

  $.ajax({
    url: APIURL_NINOS + id,
    method: "DELETE",
    success: function () {
      cargarDatosNinos();
    },
    error: function (err) {
      console.error("Error al eliminar niño:", err);
    }
  });
});

// Editar niño
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  $("#nombre").val($(celdas[1]).text().trim());
  $("#fecha_nacimiento").val(""); // si querés, luego lo llenamos con el valor original en formato yyyy-mm-dd
  $("#genero").val($(celdas[3]).text().trim() || "");
  $("#direccion_actual").val($(celdas[4]).text().trim());
  $("#estado").val($(celdas[5]).text().trim());
  // estos campos no están en la tabla, así que no los podemos rellenar desde ahí:
  $("#id_ong").val("");
  $("#responsable_actual").val("");

  console.log("Editar niño con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalNino");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosNinos();