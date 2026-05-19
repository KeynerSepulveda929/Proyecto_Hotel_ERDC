// Registro de usuario
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("formRegistro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", e => {
      e.preventDefault();
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const nuevoUsuario = {
        id: document.getElementById("id").value,
        nombre: document.getElementById("nombre").value,
        nacionalidad: document.getElementById("nacionalidad").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        password: document.getElementById("password").value
      };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "login.html";
    });
  }

  // Login de usuario
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.email === email && u.password === password);
      if (usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert("Bienvenido " + usuario.nombre);
        window.location.href = "reservas.html";
      } else {
        alert("Credenciales incorrectas.");
      }
    });
  }
});


function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  alert("Has cerrado sesión.");
  window.location.href = "index.html";
}

