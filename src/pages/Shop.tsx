import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import type { Product, ProductCategory } from '../types'
import { productService } from '../services'
import { ProductCard } from '../components/ui/ProductCard'
import { Skeleton } from '../components/ui/Skeleton'
import { cn } from '../lib/cn'

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Todo' },
  { key: 'hoodies', label: 'Hoodies' },
  { key: 'tees', label: 'Tees' },
  { key: 'pants', label: 'Pants' },
  { key: 'sneakers', label: 'Sneakers' },
  { key: 'accessories', label: 'Accesorios' },
]

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(200)
  const [onlyNew, setOnlyNew] = useState(false)

  const activeCategory =
    (searchParams.get('category') as ProductCategory | 'all') || 'all'

  useEffect(() => {
    setLoading(true)
    productService
      .filterProducts({
        category: activeCategory,
        search,
        maxPrice,
        onlyNew,
      })
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [activeCategory, search, maxPrice, onlyNew])

  const setCategory = (key: ProductCategory | 'all') => {
    const next = new URLSearchParams(searchParams)
    if (key === 'all') next.delete('category')
    else next.set('category', key)
    setSearchParams(next)
  }

  const isEmpty = useMemo(
    () => !loading && products.length === 0,
    [loading, products.length]
  )

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-accent mb-3">Catálogo</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold">
            Todo el <span className="text-accent">drop</span>
          </h1>
          <p className="mt-4 text-muted">
            {loading ? 'Cargando...' : `${products.length} productos`}
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-12 flex flex-col gap-6">
          {/* Chips de categoría */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={cn(
                  'shrink-0 px-5 h-10 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                  activeCategory === cat.key
                    ? 'bg-accent text-black'
                    : 'bg-surface border border-border text-muted hover:text-text hover:border-border-strong'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Búsqueda + filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full bg-surface border border-border focus:border-accent outline-none transition-colors text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 h-12 px-5 rounded-full bg-surface border border-border">
                <SlidersHorizontal className="w-4 h-4 text-muted" />
                <span className="text-xs text-muted whitespace-nowrap">
                  ≤ ${maxPrice}
                </span>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-[#c4ff00]"
                />
              </div>

              <button
                onClick={() => setOnlyNew(!onlyNew)}
                className={cn(
                  'h-12 px-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                  onlyNew
                    ? 'bg-accent text-black'
                    : 'bg-surface border border-border text-muted hover:text-text'
                )}
              >
                Solo nuevos
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        {isEmpty ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">🔍</p>
            <h3 className="text-2xl font-display font-bold mb-2">
              Nada por aquí
            </h3>
            <p className="text-muted">
              Prueba con otros filtros o limpia la búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
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
        )}
      </div>
    </div>
  )
}