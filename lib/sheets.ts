
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

      console.log("MATCHED ROW:", row)

      return {
        productCode: row.product_code || "",
        productName: row.product_name || "",
        productDescription: row.product_description || "",
        productImage: row.product_image || "",

        affiliateLink:
          row.affiliate_link ||
          row["affiliate_link"] ||
          row["affiliate link"] ||
          row["affiliateLink"] ||
          ""
      }
    }
  }

  return null
}
