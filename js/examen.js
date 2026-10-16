// Revisa las respuestas del examen automáticamente.
const correctas = {
  p1: "B", p2: "A", p3: "C", p4: "D", p5: "B",
  p6: "A", p7: "C", p8: "D", p9: "A", p10: "B"
};
const razones = {
  p1: "Una aplicación web se utiliza mediante un navegador.",
  p2: "HTML organiza la estructura y el contenido de una página.",
  p3: "JavaScript permite agregar interactividad.",
  p4: "CSS define la apariencia visual.",
  p5: "Un servidor responde a solicitudes de los clientes.",
  p6: "Una base de datos almacena y organiza información.",
  p7: "Una aplicación educativa ayuda a aprender o practicar.",
  p8: "Una tienda en línea permite consultar y comprar productos.",
  p9: "HTTPS ayuda a cifrar la comunicación con el sitio.",
  p10: "Las contraseñas únicas y seguras ayudan a proteger las cuentas."
};
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("examen");
  if (!form) return;
  const resultado = document.getElementById("resultado");
  const lista = document.getElementById("detalle");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const ids = Object.keys(correctas);
    const faltan = ids.filter(id => !form.querySelector('input[name="' + id + '"]:checked'));
    if (faltan.length) {
      resultado.style.display = "block";
      resultado.innerHTML = "<h2>Faltan respuestas</h2><p>Contesta las preguntas: " + faltan.map(id => id.slice(1)).join(", ") + " antes de calificar.</p>";
      resultado.scrollIntoView({ behavior: "smooth" });
      return;
    }
    let puntos = 0;
    lista.innerHTML = "";
    ids.forEach((id, i) => {
      const elegida = form.querySelector('input[name="' + id + '"]:checked').value;
      const fieldset = form.querySelector('[data-pregunta="' + id + '"]');
      fieldset.classList.remove("correcta", "incorrecta");
      const item = document.createElement("li");
      if (elegida === correctas[id]) {
        puntos++;
        fieldset.classList.add("correcta");
        item.innerHTML = "<strong>Pregunta " + (i + 1) + ": correcta.</strong> " + razones[id];
      } else {
        fieldset.classList.add("incorrecta");
        item.innerHTML = "<strong>Pregunta " + (i + 1) + ": incorrecta.</strong> Tu respuesta: " + elegida + ". Correcta: " + correctas[id] + ". " + razones[id];
      }
      lista.appendChild(item);
    });
    resultado.innerHTML = "<h2>Resultado del examen</h2><p><strong>" + puntos + " de 10</strong> respuestas correctas.</p><p>Calificación: <strong>" + (puntos * 10) + " de 100</strong>. Correctas: " + puntos + ". Incorrectas: " + (10 - puntos) + ".</p><h3>Revisión</h3>";
    resultado.appendChild(lista);
    resultado.style.display = "block";
    resultado.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("reiniciar").addEventListener("click", function () {
    form.reset();
    form.querySelectorAll(".correcta, .incorrecta").forEach(el => el.classList.remove("correcta", "incorrecta"));
    resultado.style.display = "none";
    lista.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
