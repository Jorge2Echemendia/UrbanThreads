import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '../../types'
import { productService } from '../../services'
import { ProductCard } from '../ui/ProductCard'
import { Skeleton } from '../ui/Skeleton'

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService
      .getFeaturedProducts(4)
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-3">
              Lo más buscado
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold max-w-2xl">
              Favoritos de la <span className="text-accent">comunidad</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
          >
            Ver todo
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))
            : products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
        </div>
      </div>
    </section>
  )
}