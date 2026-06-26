import Papa from "papaparse"

export interface Product {
productCode: string
productName: string
productDescription: string
productImage: string
affiliateLink: string
}

const CSV_URL =
"https://docs.google.com/spreadsheets/d/1OhYMoMvHZnoKTpi-YiITEzHC4ct7wthxyTDwsSmtezY/export?format=csv&gid=0"

export async function findProductByCode(
code: string
): Promise<Product | null> {
const response = await fetch(CSV_URL)
const csv = await response.text()

const parsed = Papa.parse(csv, {
header: true,
skipEmptyLines: true,
})

const rows = parsed.data as any[]

const search = code.toUpperCase()

for (const row of rows) {
if ((row.product_code || "").toUpperCase() === search) {
return {
productCode: row.product_code || "",
productName: row.product_name || "",
productDescription: row.product_description || "",
productImage: row.product_image || "",
affiliateLink: row.affliate_link || ""
}
}
}

return null
}
