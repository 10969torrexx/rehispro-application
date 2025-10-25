function birthGenerateHTML(params) {
    return `
        <html>
        <head>
            <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td { padding: 10px; border: 1px solid #ccc; }
            .key { font-weight: bold; background: #f9f9f9; width: 30%; }
            </style>
        </head>
        <body>
            <h1>Birth Certificate Extract</h1>
              <table>
            ${Object.entries(params)
                .map(
                ([key, value]) => `
                <tr>
                    <td class="key">${key}</td>
                    <td>${value}</td>
                </tr>`
                )
                .join("")}
            </table>
        </body>
        </html>
    `;
}
module.exports = birthGenerateHTML;