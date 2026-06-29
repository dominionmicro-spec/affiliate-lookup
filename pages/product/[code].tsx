```tsx
import { GetServerSideProps } from 'next'
import { findProductByCode, Product } from '../../lib/sheets'

interface Props {
  product: Product | null
  code: string
}

export default function ProductPage({ product, code }: Props) {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Product not found
          </h1>
          <p className="text-gray-500 mb-6">
            No product found with code &ldquo;{code}&rdquo;
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try another code
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <a href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to search
        </a>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {product.productImage && (
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-72 object-cover"
            />
          )}

          <div className="p-6">
            <p className="text-sm text-gray-400 font-mono mb-1">
              {product.productCode}
            </p>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {product.productName}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.productDescription}
            </p>

            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
            >
              View Product
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = (context.params?.code as string) ?? ''

  try {
    const product = await findProductByCode(code)
    return {
      props: {
        product,
        code,
      },
    }
  } catch (error) {
    console.error('GOOGLE SHEETS ERROR:', error)
    throw error
  }
}
```

