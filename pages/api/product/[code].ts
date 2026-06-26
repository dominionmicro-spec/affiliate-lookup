import type { NextApiRequest, NextApiResponse } from 'next'
import Papa from 'papaparse'

const CSV_URL = "https://docs.google.com/spreadsheets/d/1OhYMoMvHZnoKTpi-YiITEzHC4ct7wthxyTDwsSmtezY/export?format=csv&gid=0"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = (req.query.code as string).toUpperCase()
  const response = await fetch(CSV_URL, { cache: 'no-store' })
  const csv = await response.text()
  const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })
  const rows = parsed.data as any[]
  for (const row of rows) {
    if ((row.product_code || '').toUpperCase() === code) {
      return res.status(200).json(row)
    }
  }
  res.status(404).json({ error: 'Not found' })
}