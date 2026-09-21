// src/components/ui/ProductCard.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Plus, Star } from 'lucide-react'
import type { Product } from '../../types'
import { Badge } from './Badge'
import { formatPrice } from '../../lib/formatPrice'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import { cn } from '../../lib/cn'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const isFavorite = has(product.id)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]?.name)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id, product.name)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col"
    >
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-surface border border-border transition-colors duration-300 group-hover:border-border-strong"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isLimited && <Badge variant="limited">Limited</Badge>}
        </div>

        {/* Wishlist */}
        <motion.button
          onClick={handleToggleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors',
            isFavorite
              ? 'bg-hot text-white'
              : 'bg-black/70 text-white hover:bg-hot'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </motion.button>

        {/* Add to cart */}
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Añadir al carrito"
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-accent text-black flex items-center justify-center opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-md px-2 py-1 text-[10px] font-semibold">
          <Star className="w-3 h-3 fill-accent text-accent" />
          {product.rating}
        </div>
      </Link>

      <div className="pt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-subtle mb-1">
            {product.category}
          </p>
          <h3 className="text-sm font-display font-semibold leading-tight truncate group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-sm font-mono font-semibold whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  )
}