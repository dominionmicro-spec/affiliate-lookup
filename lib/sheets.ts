import { google } from 'googleapis'

export interface Product {
  productCode: string
  productName: string
  productDescription: string
  productImage: string
  affiliateLink: string
}

export async function findProductByCode(code: string): Promise<Product | null> {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "'Affiliate Products'!A:E",
  })

  const rows = response.data.values
  if (!rows || rows.length < 2) return null

  const dataRows = rows.slice(1)
  const upperCode = code.toUpperCase()

  for (const row of dataRows) {
    if (row[0]?.toString().toUpperCase() === upperCode) {
      return {
        productCode: row[0]?.toString() ?? '',
        productName: row[1]?.toString() ?? '',
        productDescription: row[2]?.toString() ?? '',
        productImage: row[3]?.toString() ?? '',
        affiliateLink: row[4]?.toString() ?? '',
      }
    }
  }

  return null
}
