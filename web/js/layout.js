const menus = `
       
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">PANI_DB</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">

        <li class="nav-item">
          <a class="nav-link" href="ninos.html">Niños</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="responsables.html">Responsables</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="ong.html">ONG</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="abrigo.html">Abrigo</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="familiares.html">Familiares</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="hermanos.html">Hermanos</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="salud.html">Salud</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="educacion.html">Educación</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="alertas.html">Alertas</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="visitas.html">Visitas</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="reportes.html">Reportes</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="adopciones.html">Adopciones / Egresos</a>
        </li>

      </ul>
    </div>
  </div>
</nav>
`;



const htmlseccionMenu = $("#seccionMenu");
htmlseccionMenu.append(menus);