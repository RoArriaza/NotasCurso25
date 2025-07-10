
async function buscarNotas() {
    const rut = document.getElementById("rutInput").value.trim();
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "Buscando...";

    try {
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTkME1IqZdpr9Uto9b1obspJ_mPN5-ylY0yABnv0vAgR1XamJ09kbX5ShuTrJGcUG5BEf-Lrko3eNBG/pub?gid=1234035252&single=true&output=csv";
        const response = await fetch(url);
        const data = await response.text();
        const rows = data.split("\n").map(row => row.split(","));

        const headers = rows[0];
        const match = rows.find(row => row[0].replaceAll('"', '') === rut);

        if (match) {
            let html = `<h2>${match[1]}</h2><table border="1" style="margin: auto;"><tr>`;
            for (let i = 2; i < headers.length; i++) {
                html += `<th>${headers[i]}</th>`;
            }
            html += "</tr><tr>";
            for (let i = 2; i < match.length; i++) {
                html += `<td>${match[i]}</td>`;
            }
            html += "</tr></table>";
            resultado.innerHTML = html;
        } else {
            resultado.innerHTML = "<span style='color: red;'>RUT no encontrado.</span>";
        }
    } catch (error) {
        console.error("Error:", error);
        resultado.innerHTML = "<span style='color: red;'>No se pudieron obtener los datos.</span>";
    }
}
