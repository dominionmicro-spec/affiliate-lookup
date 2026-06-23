# Affiliate Product Lookup

A minimal website where users enter a product code (e.g., TECH001, BEAUTY001) and see product details fetched from a Google Sheet.

## Project Structure

```
affiliate-lookup/
├── lib/
│   └── sheets.ts           # Google Sheets API — looks up product by code
├── pages/
│   ├── _app.tsx             # App wrapper (imports Tailwind)
│   ├── _document.tsx        # HTML document shell
│   ├── index.tsx            # Homepage — search box
│   └── product/
│       └── [code].tsx       # Product page + "not found" fallback
├── styles/
│   └── globals.css          # Tailwind directives
├── .env.local.example       # Environment variable template (copy to .env.local)
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Step-by-Step Setup

### 1. Install dependencies

```bash
cd affiliate-lookup
npm install
```

### 2. Create the Google Sheet

1. Go to https://sheets.new
2. In **Row 1**, paste these exact column headers:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | product_code | product_name | product_description | product_image | affiliate_link |

3. Add these **5 example rows** starting from Row 2:

   | product_code | product_name | product_description | product_image | affiliate_link |
   |---|---|---|---|---|
   | TECH001 | Wireless Bluetooth Headphones | Premium noise-cancelling headphones with 30-hour battery life and comfortable over-ear design. | https://picsum.photos/seed/tech001/600/400 | https://example.com/tech001 |
   | TECH002 | USB-C Hub 7-in-1 | Compact USB-C hub with HDMI, USB 3.0, SD card reader, and 100W power delivery. | https://picsum.photos/seed/tech002/600/400 | https://example.com/tech002 |
   | BEAUTY001 | Vitamin C Serum 30ml | Brightening vitamin C serum with hyaluronic acid for radiant, hydrated skin. | https://picsum.photos/seed/beauty001/600/400 | https://example.com/beauty001 |
   | BEAUTY002 | Retinol Night Cream 50ml | Anti-aging retinol night cream with peptides for smoother, firmer skin by morning. | https://picsum.photos/seed/beauty002/600/400 | https://example.com/beauty002 |
   | HOME001 | Bamboo Cutting Board Set | Eco-friendly organic bamboo cutting board set with 3 sizes and built-in juice groove. | https://picsum.photos/seed/home001/600/400 | https://example.com/home001 |

   > **Important:** The sheet tab must be named **Sheet1** (this is the default). The code reads `Sheet1!A:E`.

4. Copy the **Sheet ID** from your browser's address bar:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
   ```

### 3. Create Google Sheets API credentials

1. Go to https://console.cloud.google.com
2. Sign in with your Google account
3. Click the project dropdown at the top → **New Project**
4. Name it `affiliate-lookup` → **Create**
5. Make sure the new project is selected
6. Go to **APIs & Services** → **Library**
7. Search for **Google Sheets API** → click it → **Enable**
8. Go to **APIs & Services** → **Credentials**
9. Click **Create Credentials** → **Service Account**
10. Name: `affiliate-lookup` → **Create and Continue**
11. Role: **Basic > Editor** → **Continue** → **Done**
12. Click the service account email you just created
13. Go to the **Keys** tab → **Add Key** → **Create New Key** → **JSON**
14. The JSON file downloads automatically. Open it — it contains:
    - `client_email` (looks like `affiliate-lookup@xxx.iam.gserviceaccount.com`)
    - `private_key` (starts with `-----BEGIN PRIVATE KEY-----`)

### 4. Share the sheet with your service account

1. Open your Google Sheet
2. Click **Share** (top-right)
3. Paste the service account email (`affiliate-lookup@xxx.iam.gserviceaccount.com`)
4. Permission: **Editor**
5. Uncheck "Notify people" → **Share**

### 5. Create .env.local

In the `affiliate-lookup` directory, create a file named `.env.local` (copy from `.env.local.example`):

```
GOOGLE_SHEET_ID=1abc123...  (the ID from step 2.4)
GOOGLE_SERVICE_ACCOUNT_EMAIL=affiliate-lookup@xxx.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
```

**Critical:**
- The `GOOGLE_PRIVATE_KEY` must be in **double quotes**
- The `\n` inside the key are literal backslash-n sequences (keep them as-is)
- Copy the entire key from `-----BEGIN PRIVATE KEY-----` through `-----END PRIVATE KEY-----`
- The key file uses `\n` for line breaks — do NOT replace them with actual newlines
- Make sure there are no extra spaces or line breaks inside the value

### 6. Start the project

```bash
cd affiliate-lookup
npm run dev
```

Open http://localhost:3000

## How It Works

1. **Homepage** (`/`): User types a product code (e.g., `TECH001`) and presses Enter
2. **Product page** (`/product/TECH001`): Server fetches the full Google Sheet, finds the matching row by `product_code`, and returns the product data
3. **Product found**: Shows product name, image, description, and a "View Product" affiliate button
4. **Product not found**: Shows "Product not found" with a link back to search

## Launch Checklist

- [ ] Google Sheet created with columns: product_code, product_name, product_description, product_image, affiliate_link
- [ ] At least one product row exists in the sheet
- [ ] Google Sheets API enabled in Google Cloud Console
- [ ] Service account created with JSON key downloaded
- [ ] Sheet shared with the service account email as Editor
- [ ] `.env.local` file exists with GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY
- [ ] `npm install` completed
- [ ] `npm run build` succeeds
- [ ] Site renders at http://localhost:3000
- [ ] Searching TECH001 returns the product page
- [ ] Searching a nonexistent code shows "Product not found"
- [ ] "View Product" button opens the affiliate link in a new tab

## If Something Goes Wrong

| Symptom | Likely Cause | Fix |
|---|---|---|
| "Product not found" for every search | Private key format wrong in .env.local | Check quotes and \n in GOOGLE_PRIVATE_KEY |
| "Product not found" for every search | Sheet not shared with service account | Share the sheet with the service account email |
| "Product not found" for every search | Wrong GOOGLE_SHEET_ID | Double-check the ID in the URL |
| Build errors | Missing dependencies | Run `npm install` |
| Site won't start | Wrong Node.js version | Use Node.js 18+ (you have v24) |
