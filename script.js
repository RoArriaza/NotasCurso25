const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZd8W4E7sZFWNKs73W9aQFYKkVocaLQEz6_R3TtNQOTwyCcbUHTTgYT535GuaC1g/pub?gid=1234035252&single=true&output=csv";

document.getElementById("btnBuscar").addEventListener("click", () => {
  const rutIngresado = document.getElementById("inputRUT").value.trim();
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "Buscando...";

  fetch(CSV_URL)
    .then(res => res.text())
    .then(data => {
      const filas = data.split("\n").map(row => row.split(",").map(cell => cell.replace(/"/g, '').trim()));
      const headers = filas[0];
      const datos = filas.slice(1);

      const resultado = datos.find(row => row[0] === rutIngresado);

      if (resultado) {
        const nombre = resultado[1];
        const notas = headers.slice(2).map((h, i) => `<li><strong>${h}</strong>: ${resultado[i + 2] || '-'}</li>`).join('');
        resultadoDiv.innerHTML = `
          <div class="resultado-card">
            <h3>${nombre}</h3>
            <ul>${notas}</ul>
          </div>
        `;
      } else {
        resultadoDiv.innerHTML = `<div class="error">RUT no encontrado.</div>`;
      }
    })
    .catch(err => {
      console.error("Error al obtener los datos:", err);
      resultadoDiv.innerHTML = `<div class="error">Error al obtener los datos. Intenta nuevamente más tarde.</div>`;
    });
});
