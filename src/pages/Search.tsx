import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react'
import type { Product, ProductCategory } from '../types'
import { productService } from '../services'
import { ProductCard } from '../components/ui/ProductCard'
import { Skeleton } from '../components/ui/Skeleton'
import { SEO } from '../components/SEO'
import { cn } from '../lib/cn'

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Todo' },
  { key: 'hoodies', label: 'Hoodies' },
  { key: 'tees', label: 'Tees' },
  { key: 'pants', label: 'Pants' },
  { key: 'sneakers', label: 'Sneakers' },
  { key: 'accessories', label: 'Accesorios' },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Más nuevos' },
  { value: 'price-asc', label: 'Precio ↑' },
  { value: 'price-desc', label: 'Precio ↓' },
  { value: 'rating', label: 'Mejor valorados' },
] as const

type SortOption = (typeof SORT_OPTIONS)[number]['value']

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [category, setCategory] = useState<ProductCategory | 'all'>(
    (searchParams.get('category') as ProductCategory) ?? 'all'
  )
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200)
  const [minRating, setMinRating] = useState(0)
  const [onlyNew, setOnlyNew] = useState(false)
  const [onlyLimited, setOnlyLimited] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Sincroniza URL con el término de búsqueda
  useEffect(() => {
    const next = new URLSearchParams(searchParams)
    if (search) next.set('q', search)
    else next.delete('q')
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  // Búsqueda con debounce
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      productService
        .filterProducts({
          category,
          search,
          minPrice,
          maxPrice,
          minRating,
          onlyNew,
          onlyLimited,
          sortBy,
        })
        .then(setProducts)
        .finally(() => setLoading(false))
    }, 250)

    return () => clearTimeout(timeout)
  }, [category, search, minPrice, maxPrice, minRating, onlyNew, onlyLimited, sortBy])

  const activeFiltersCount = useMemo(() => {
    let n = 0
    if (category !== 'all') n++
    if (minPrice > 0) n++
    if (maxPrice < 200) n++
    if (minRating > 0) n++
    if (onlyNew) n++
    if (onlyLimited) n++
    return n
  }, [category, minPrice, maxPrice, minRating, onlyNew, onlyLimited])

  const reset = () => {
    setSearch('')
    setCategory('all')
    setMinPrice(0)
    setMaxPrice(200)
    setMinRating(0)
    setOnlyNew(false)
    setOnlyLimited(false)
    setSortBy('newest')
  }

  return (
    <>
      <SEO
        title="Buscar"
        description="Búsqueda avanzada en el catálogo de UrbanThreads."
        path="/search"
      />

      <div className="pt-32 pb-24 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-accent mb-3">
            Búsqueda avanzada
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-bold">
            Encuentra tu <span className="text-accent">pieza</span>
          </h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8 flex gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Buscar por nombre, categoría, marca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-12 rounded-full bg-surface border border-border focus:border-accent outline-none transition-colors text-sm"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                aria-label="Limpiar"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'h-14 px-6 rounded-full border transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest shrink-0',
              showFilters || activeFiltersCount > 0
                ? 'bg-accent text-black border-accent'
                : 'bg-surface border-border text-muted hover:text-text'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <div className="mb-10 p-6 rounded-2xl border border-border bg-surface/50 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Categoría */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3">
                Categoría
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setCategory(cat.key)}
                    className={cn(
                      'px-3 h-8 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all',
                      category === cat.key
                        ? 'bg-accent text-black'
                        : 'bg-surface border border-border text-muted hover:text-text'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3">
                Precio · ${minPrice} – ${maxPrice}
              </p>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))
                  }
                  className="w-full accent-[#c4ff00]"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))
                  }
                  className="w-full accent-[#c4ff00]"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3">
                Rating mínimo
              </p>
              <div className="flex flex-wrap gap-2">
                {[0, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={cn(
                      'px-3 h-8 rounded-full text-[11px] font-bold transition-all',
                      minRating === r
                        ? 'bg-accent text-black'
                        : 'bg-surface border border-border text-muted hover:text-text'
                    )}
                  >
                    {r === 0 ? 'Cualquiera' : `${r}★+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3">
                Estado
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="accent-[#c4ff00]"
                  />
                  Solo nuevos
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={onlyLimited}
                    onChange={(e) => setOnlyLimited(e.target.checked)}
                    className="accent-[#c4ff00]"
                  />
                  Solo ediciones limitadas
                </label>
              </div>
            </div>

            {/* Reset */}
            <div className="md:col-span-2 lg:col-span-4 flex justify-end pt-4 border-t border-border">
              <button
                onClick={reset}
                className="text-xs uppercase tracking-widest text-muted hover:text-hot transition-colors"
              >
                Limpiar todos los filtros
              </button>
            </div>
          </div>
        )}

        {/* Barra de resultados + orden */}
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
          <p className="text-sm text-muted">
            {loading
              ? 'Buscando...'
              : `${products.length} resultado${products.length !== 1 ? 's' : ''}`}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted uppercase tracking-widest">
              Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-9 px-3 rounded-full bg-surface border border-border text-xs outline-none focus:border-accent cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">🔍</p>
            <h3 className="text-2xl font-display font-bold mb-3">Sin resultados</h3>
            <p className="text-muted mb-8">
              Prueba con otros filtros o términos de búsqueda.
            </p>
            <button
              onClick={reset}
              className="text-accent hover:underline text-sm uppercase tracking-widest"
            >
              Limpiar filtros
            </button>
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