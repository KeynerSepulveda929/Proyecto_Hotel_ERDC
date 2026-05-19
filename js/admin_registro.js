document.addEventListener("DOMContentLoaded", () => {
  const formLoginAdmin = document.getElementById("formLoginAdmin");
  if (formLoginAdmin) {
    formLoginAdmin.addEventListener("submit", e => {
      e.preventDefault();
      const user = document.getElementById("adminUser").value;
      const pass = document.getElementById("adminPass").value;

      // Credenciales fijas para admin
      const adminUser = "admin";
      const adminPass = "12345";

      if (user === adminUser && pass === adminPass) {
        localStorage.setItem("adminActivo", "true");
        alert("Bienvenido administrador");
        window.location.href = "admin.html";
      } else {
        alert("Credenciales incorrectas.");
      }
    });
  }
});

// Función para cerrar sesión admin
function cerrarSesionAdmin() {
  localStorage.removeItem("adminActivo");
  alert("Sesión de administrador cerrada.");
  window.location.href = "index.html";
}
