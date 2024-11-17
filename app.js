let products = [];

// Carica i dati dal file Excel
async function loadExcelData() {
    const response = await fetch('data.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    products = XLSX.utils.sheet_to_json(sheet);
}

// Cerca il prodotto dal barcode
function searchProduct() {
    const barcode = document.getElementById('barcode').value.trim();
    const product = products.find(p => p.Barcode == barcode);

    const resultDiv = document.getElementById('result');
    if (product) {
        resultDiv.innerHTML = `
            <p><strong>Prezzo Acquisto:</strong> ${product.PrezzoAcquisto} €</p>
            <p><strong>Prezzo Vendita:</strong> ${product.PrezzoVendita} €</p>
        `;
    } else {
        resultDiv.innerHTML = `<p>Prodotto non trovato.</p>`;
    }
}

// Carica i dati all'avvio
loadExcelData();
