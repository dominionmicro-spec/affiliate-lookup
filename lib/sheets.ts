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

  const parsed = Papa.parse<string[]>(csv, {
    header: false,
    skipEmptyLines: true
  })

  const rows = parsed.data.slice(1)

  const search = code.toUpperCase()

  for (const cols of rows) {

    if ((cols[0] || "").trim().toUpperCase() === search) {

      return {
        productCode: cols[0] || "",
        productName: cols[1] || "",
        productDescription: cols[2] || "",
        productImage: cols[3] || "",
        affiliateLink: cols[4] || ""
      }

    }

  }

  return null
}
