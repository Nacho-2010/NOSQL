const APIURL_FAMILIARES = "http://localhost:3000/api/familiares/";

let idEditando = null;

function cargarDatosFamiliares() {
  $.get(APIURL_FAMILIARES, function (familiares) {
    const tbody = $("#tablaDatos");
    tbody.empty();

    familiares.forEach(fam => {
      tbody.append(`
        <tr>
          <td>${fam._id}</td>
          <td>${fam.nombre || ""}</td>
          <td>${fam.parentesco || ""}</td>
          <td>${fam.telefono || ""}</td>
          <td>${fam.estado_contacto || ""}</td>
          <td>${fam.id_nino || ""}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${fam._id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${fam._id}">Eliminar</button>
          </td>
        </tr>
      `);
    });

    console.log(familiares);
  }).fail(function (err) {
    console.error("Error al cargar familiares:", err);
  });
}

// Crear / Editar
$("#familiarFormulario").on("submit", function (e) {
  e.preventDefault();

  const datos = {
    nombre: $("#nombre").val(),
    parentesco: $("#parentesco").val() || "Desconocido",
    telefono: $("#telefono").val() || "",
    estado_contacto: $("#estado_contacto").val() || "Sin contacto",
    id_nino: $("#id_nino").val()
  };

  const url = idEditando ? APIURL_FAMILIARES + idEditando : APIURL_FAMILIARES;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#familiarFormulario")[0].reset();
      idEditando = null;
      cargarDatosFamiliares();

      // Cerrar modal
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalFamiliar");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.error("Error al guardar familiar:", err);
    }
  });
});

// Eliminar
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  if (!confirm("¿Desea eliminar este familiar?")) return;

  $.ajax({
    url: APIURL_FAMILIARES + id,
    method: "DELETE",
    success: function () {
      cargarDatosFamiliares();
    },
    error: function (err) {
      console.error("Error al eliminar familiar:", err);
    }
  });
});

// Editar
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  $("#nombre").val($(celdas[1]).text().trim());
  $("#parentesco").val($(celdas[2]).text().trim());
  $("#telefono").val($(celdas[3]).text().trim());
  $("#estado_contacto").val($(celdas[4]).text().trim());
  $("#id_nino").val($(celdas[5]).text().trim());

  console.log("Editar familiar con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalFamiliar");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosFamiliares();