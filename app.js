let products = []; // Array per i dati dei prodotti

// Carica i dati dal file Excel
async function loadProductData() {
    const response = await fetch('data.xlsx'); // Assicurati che questo sia il percorso corretto su GitHub
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0]; // Usa il primo foglio di lavoro
    const sheet = workbook.Sheets[sheetName];
    
    // Leggi i dati in formato JSON
    products = XLSX.utils.sheet_to_json(sheet);
}

// Funzione per cercare il prodotto
function searchProduct() {
    const barcode = document.getElementById('barcode').value.trim();
    const product = products.find(p => p.Barcode == barcode); // Cambia "Barcode" se il nome della colonna è diverso

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

// Carica i dati quando la pagina è pronta
loadProductData();
