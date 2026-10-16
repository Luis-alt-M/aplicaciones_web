// Función compartida: actualiza el año del pie de página.
document.addEventListener("DOMContentLoaded", function () {
  const anio = document.querySelector("[data-anio]");
  if (anio) anio.textContent = new Date().getFullYear();
});
