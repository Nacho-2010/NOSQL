const APIURL_ALERTAS = "http://localhost:3000/api/alertas/";

let idEditando = null;

// Cargar datos en la tabla
function cargarDatosAlertas() {
  $.get(APIURL_ALERTAS, function (alertas) {
    const tbody = $("#tablaDatos");
    tbody.empty();

    alertas.forEach(a => {
      tbody.append(`
        <tr>
          <td>${a._id}</td>
          <td>${a.id_nino || ""}</td>
          <td>${a.tipo_alerta || ""}</td>
          <td>${a.fecha_generada ? new Date(a.fecha_generada).toLocaleDateString() : ""}</td>
          <td>${a.dias_restantes ?? ""}</td>
          <td>${a.estado || ""}</td>
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

    console.log(alertas);
  }).fail(function (err) {
    console.error("Error al cargar alertas:", err);
  });
}

// Crear / Editar alerta
$("#alertaFormulario").on("submit", function (e) {
  e.preventDefault();

  const diasVal = $("#dias_restantes").val();

  const datos = {
    id_nino: $("#id_nino").val(),
    tipo_alerta: $("#tipo_alerta").val(),
    fecha_generada: $("#fecha_generada").val(),
    dias_restantes: diasVal !== "" ? Number(diasVal) : null,
    estado: $("#estado").val() || "Pendiente"
  };

  const url = idEditando ? APIURL_ALERTAS + idEditando : APIURL_ALERTAS;
  const metodo = idEditando ? "PUT" : "POST";

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function () {
      $("#alertaFormulario")[0].reset();
      idEditando = null;
      cargarDatosAlertas();

      // Cerrar modal
      if (window.bootstrap) {
        const modalEl = document.getElementById("modalAlerta");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      }
    },
    error: function (err) {
      console.error("Error al guardar alerta:", err);
    }
  });
});

// Eliminar alerta
$("#tablaDatos").on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  if (!confirm("¿Desea eliminar esta alerta del registro?")) return;

  $.ajax({
    url: APIURL_ALERTAS + id,
    method: "DELETE",
    success: function () {
      cargarDatosAlertas();
    },
    error: function (err) {
      console.error("Error al eliminar esta alerta:", err);
    }
  });
});

// Editar alerta
$("#tablaDatos").on("click", ".btn-editar", function () {
  const id = $(this).data("id");
  idEditando = id;

  const $fila = $(this).closest("tr");
  const celdas = $fila.find("td");

  $("#id_nino").val($(celdas[1]).text().trim());
  $("#tipo_alerta").val($(celdas[2]).text().trim());
  $("#fecha_generada").val(""); 
  $("#dias_restantes").val($(celdas[4]).text().trim());
  $("#estado").val($(celdas[5]).text().trim());

  console.log("Editar alerta con id:", id);

  if (window.bootstrap) {
    const modalEl = document.getElementById("modalAlerta");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

cargarDatosAlertas();
