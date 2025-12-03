
const menus = `
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<nav class="navbar navbar-expand-lg navbar-light shadow-sm" style="background:#0d6efd;">
  <div class="container-fluid">

    <a class="navbar-brand fw-bold text-white d-flex align-items-center" href="#">
      <i class="bi bi-database-fill me-2"></i> PANI_DB
    </a>

    <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <style>
      .navbar-nav .nav-link {
        color: #ffffff !important;
        font-weight: 500;
        margin-right: 10px;
        transition: 0.2s;
      }
      .navbar-nav .nav-link:hover {
        color: #ffe08a !important;
        transform: translateY(-1px);
      }
      .menu-divider {
        width: 1px;
        height: 28px;
        background: rgba(255,255,255,0.4);
        margin: 0 12px;
      }
    </style>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav align-items-center">

        <li class="nav-item"><a class="nav-link" href="ninos.html"><i class="bi bi-emoji-smile me-1"></i>Niños</a></li>
        <li class="nav-item"><a class="nav-link" href="responsables.html"><i class="bi bi-person-badge me-1"></i>Responsables</a></li>
        <li class="nav-item"><a class="nav-link" href="ong.html"><i class="bi bi-building-heart me-1"></i>ONG</a></li>
        <li class="nav-item"><a class="nav-link" href="abrigo.html"><i class="bi bi-house-door me-1"></i>Abrigo</a></li>

        <div class="menu-divider"></div>

        <li class="nav-item"><a class="nav-link" href="familiares.html"><i class="bi bi-people me-1"></i>Familiares</a></li>
        <li class="nav-item"><a class="nav-link" href="hermanos.html"><i class="bi bi-people-fill me-1"></i>Hermanos</a></li>

        <div class="menu-divider"></div>

        <li class="nav-item"><a class="nav-link" href="salud.html"><i class="bi bi-heart-pulse me-1"></i>Salud</a></li>
        <li class="nav-item"><a class="nav-link" href="educacion.html"><i class="bi bi-journal-bookmark me-1"></i>Educación</a></li>

        <div class="menu-divider"></div>

        <li class="nav-item"><a class="nav-link" href="alertas.html"><i class="bi bi-exclamation-triangle me-1"></i>Alertas</a></li>
        <li class="nav-item"><a class="nav-link" href="visitas.html"><i class="bi bi-calendar-event me-1"></i>Visitas</a></li>
        <li class="nav-item"><a class="nav-link" href="reportes.html"><i class="bi bi-bar-chart-line me-1"></i>Reportes</a></li>
        <li class="nav-item"><a class="nav-link" href="adopciones.html"><i class="bi bi-person-hearts me-1"></i>Adopciones / Egresos</a></li>
        <li class="nav-item"><a class="nav-link" href="ubicaciones.html"><i class="bi bi-geo-alt me-1"></i>Ubicación</a></li>

      </ul>
    </div>
  </div>
</nav>

`;



const htmlseccionMenu = $("#seccionMenu");
htmlseccionMenu.append(menus);