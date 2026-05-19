document.getElementById("formDisponibilidad").addEventListener("submit", function(e) {
  e.preventDefault();
  const inicio = document.getElementById("fechaInicio").value;
  const fin = document.getElementById("fechaFin").value;
  const personas = parseInt(document.getElementById("personas").value);

  const habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [
    { id: 1, nombre: "Suite Deluxe", camas: 2, personas: 4, precio: 200, servicios: ["WiFi", "Jacuzzi", "Minibar"], disponibleDesde: "2026-05-20", disponibleHasta: "2026-06-30" },
    { id: 2, nombre: "Habitación Estándar", camas: 1, personas: 2, precio: 100, servicios: ["WiFi", "TV"], disponibleDesde: "2026-05-18", disponibleHasta: "2026-06-15" }
  ];

  const disponibles = habitaciones.filter(h => h.personas >= personas);

  const resultado = document.getElementById("resultadoDisponibilidad");
  resultado.innerHTML = "";
  disponibles.forEach(h => {
    resultado.innerHTML += `
      <div class="habitacion">
        <h3>${h.nombre}</h3>
        <p>Camas: ${h.camas}</p>
        <p>Capacidad: ${h.personas} personas</p>
        <p>Servicios: ${h.servicios.join(", ")}</p>
        <p>Precio por noche: $${h.precio}</p>
          <p>Disponible entre: ${h.disponibleDesde} y ${h.disponibleHasta}</p>
        <button onclick="reservar(${h.id})">Reservar</button>
      </div>
    `;
  });
});

function reservar(idHabitacion) {
  const inicio = document.getElementById("fechaInicio").value;
  const fin = document.getElementById("fechaFin").value;
  reservarHabitacion(idHabitacion, inicio, fin);
}

function reservar(idHabitacion, fechaInicio, fechaFin) {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuarioActivo) {
    alert("Debes estar registrado y autenticado para reservar.");
    return;
  }

  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  // Verificar solapamiento de fechas en la misma habitación
  const conflicto = reservas.find(r =>
    r.idHabitacion === idHabitacion &&
    (
      (fechaInicio >= r.fechaInicio && fechaInicio <= r.fechaFin) || // inicio dentro de otra reserva
      (fechaFin >= r.fechaInicio && fechaFin <= r.fechaFin) ||       // fin dentro de otra reserva
      (fechaInicio <= r.fechaInicio && fechaFin >= r.fechaFin)       // cubre completamente otra reserva
    )
  );

  if (conflicto) {
    alert("La habitación ya está reservada en ese rango de fechas.");
    return;
  }

  // Registrar la nueva reserva
  reservas.push({
    idHabitacion,
    usuario: usuarioActivo.email,
    fechaInicio,
    fechaFin
  });

  localStorage.setItem("reservas", JSON.stringify(reservas));
  alert("Reserva realizada con éxito");
}


function cancelarReserva(idHabitacion) {
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  reservas = reservas.filter(r => r.idHabitacion !== idHabitacion);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  alert("Reserva cancelada. La habitación vuelve a estar disponible.");
}
