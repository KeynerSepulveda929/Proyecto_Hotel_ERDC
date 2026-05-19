console.log("Hotel El Rincón del Carmen - sitio cargado");

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioActivo) {
    // Usuario autenticado
    menu.innerHTML = `
      <a href="index.html">Inicio</a>
      <a href="reservas.html">Reservas</a>
      <a href="contacto.html">Contacto</a>
      <span>Hola, ${usuarioActivo.nombre}</span>
      <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
    `;
  } else {
    // Usuario no autenticado
    menu.innerHTML = `
      <a href="index.html">Inicio</a>
      <a href="reservas.html">Reservas</a>
      <a href="contacto.html">Contacto</a>
      <a href="registro.html">Registro</a>
      <a href="login.html">Login</a>
    `;
  }
});

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  alert("Has cerrado sesión.");
  window.location.href = "index.html";
}
