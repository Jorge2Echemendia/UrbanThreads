import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Star, ShoppingBag } from 'lucide-react'
import type { Product } from '../types'
import { productService } from '../services'
import { useCart } from '../hooks/useCart'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Skeleton } from '../components/ui/Skeleton'
import { formatPrice } from '../lib/formatPrice'
import { cn } from '../lib/cn'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState<string>()
  const [color, setColor] = useState<string>()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    productService
      .getProductById(Number(id))
      .then((p) => {
        setProduct(p)
        setSize(p?.sizes?.[0])
        setColor(p?.colors?.[0]?.name)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="pt-32 pb-24 mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 mx-auto max-w-3xl px-6 text-center">
        <p className="text-6xl mb-6">😶‍🌫️</p>
        <h1 className="text-3xl font-display font-bold mb-4">
          Producto no encontrado
        </h1>
        <Link to="/shop" className="text-accent hover:underline">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Imagen */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface border border-border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.isLimited && <Badge variant="limited">Limited</Badge>}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-widest text-subtle mb-3">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-display font-bold">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < Math.round(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-border'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted">
                {product.rating} · {product.brand}
              </span>
            </div>

            <p className="mt-6 text-2xl font-mono font-bold">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Tamaños */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest mb-3">
                  Talla
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        'min-w-[3rem] h-11 px-4 rounded-full text-sm font-semibold transition-all border',
                        size === s
                          ? 'bg-accent text-black border-accent'
                          : 'bg-transparent border-border text-text hover:border-border-strong'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colores */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-3">
                  Color
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      title={c.name}
                      className={cn(
                        'w-10 h-10 rounded-full transition-all',
                        color === c.name
                          ? 'ring-2 ring-accent ring-offset-4 ring-offset-background'
                          : 'ring-1 ring-border hover:ring-border-strong'
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad + Añadir */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center h-14 rounded-full border border-border bg-surface">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-14 h-full text-muted hover:text-text transition-colors"
                  aria-label="Disminuir"
                >
                  <Minus className="w-4 h-4 mx-auto" />
                </button>
                <span className="w-12 text-center font-mono font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-14 h-full text-muted hover:text-text transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus className="w-4 h-4 mx-auto" />
                </button>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={() => addItem(product, quantity, size, color)}
                className="flex-1"
              >
                <ShoppingBag className="w-4 h-4" />
                Añadir · {formatPrice(product.price * quantity)}
              </Button>
            </div>

            {/* Meta */}
            <div className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-bold uppercase tracking-widest mb-1">
                  Envío gratis
                </p>
                <p className="text-muted">En pedidos &gt; $100</p>
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest mb-1">
                  30 días
                </p>
                <p className="text-muted">Para devolver</p>
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest mb-1">
                  Auténtico
                </p>
                <p className="text-muted">Garantizado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}