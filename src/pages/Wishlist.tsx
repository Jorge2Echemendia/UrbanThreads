import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { Product } from '../types'
import { productService } from '../services'
import { useWishlist } from '../hooks/useWishlist'
import { ProductCard } from '../components/ui/ProductCard'
import { Skeleton } from '../components/ui/Skeleton'
import { Button } from '../components/ui/Button'
import { SEO } from '../components/SEO'

export function Wishlist() {
  const { ids, count, clear } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    productService
      .getAllProducts()
      .then((all) => setProducts(all.filter((p) => ids.includes(p.id))))
      .finally(() => setLoading(false))
  }, [ids])

  return (
    <>
      <SEO
        title="Favoritos"
        description="Tus prendas guardadas en UrbanThreads."
        path="/wishlist"
        noIndex
      />

      <div className="pt-32 pb-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-3">Tus guardados</p>
            <h1 className="text-5xl md:text-7xl font-display font-bold">
              Wish<span className="text-accent">list</span>
            </h1>
            {count > 0 && (
              <p className="mt-4 text-muted">
                {count} {count === 1 ? 'producto' : 'productos'}
              </p>
            )}
          </div>

          {count > 0 && (
            <button
              onClick={clear}
              className="text-xs uppercase tracking-widest text-muted hover:text-hot transition-colors"
            >
              Vaciar lista
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-muted" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-3">
              Aún no guardaste nada
            </h2>
            <p className="text-muted mb-8">
              Toca el corazón en cualquier producto para guardarlo aquí.
            </p>
            <Link to="/shop">
              <Button>Explorar catálogo</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}