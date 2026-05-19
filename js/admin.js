// Mostrar habitaciones
function mostrarHabitaciones() {
  const habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [];
  const lista = document.getElementById("listaHabitaciones");
  lista.innerHTML = "";
  habitaciones.forEach((h, index) => {
    lista.innerHTML += `
      <div class="habitacion">
        <h3>${h.nombre}</h3>
        <p>Camas: ${h.camas}</p>
        <p>Capacidad: ${h.personas}</p>
        <p>Precio: $${h.precio}</p>
        <p>Servicios: ${h.servicios.join(", ")}</p>
        <button onclick="eliminarHabitacion(${index})">Eliminar</button>
      </div>
    `;
  });
}

// Agregar/Actualizar habitación
document.getElementById("formHabitacion").addEventListener("submit", function(e) {
  e.preventDefault();
  let habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [];
  const nueva = {
    nombre: document.getElementById("nombre").value,
    camas: parseInt(document.getElementById("camas").value),
    personas: parseInt(document.getElementById("personas").value),
    precio: parseFloat(document.getElementById("precio").value),
    servicios: document.getElementById("servicios").value.split(",").map(s => s.trim())
  };
  habitaciones.push(nueva);
  localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  mostrarHabitaciones();
});

// Eliminar habitación
function eliminarHabitacion(index) {
  let habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [];
  habitaciones.splice(index, 1);
  localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  mostrarHabitaciones();
}

// Mostrar reservas
function mostrarReservas() {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const lista = document.getElementById("listaReservas");
  lista.innerHTML = "";
  reservas.forEach((r, index) => {
    lista.innerHTML += `
      <div class="reserva">
        <p>Habitación ID: ${r.idHabitacion}</p>
        <p>Usuario: ${r.usuario}</p>
        <p>Fecha: ${r.fecha}</p>
        <button onclick="cancelarReserva(${index})">Cancelar</button>
      </div>
    `;
  });
}

// Cancelar reserva
function cancelarReserva(index) {
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  reservas.splice(index, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  mostrarReservas();
}

// Inicializar
mostrarHabitaciones();
mostrarReservas();
