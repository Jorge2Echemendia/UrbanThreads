// src/components/layout/Header.tsx
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import { cn } from '../../lib/cn'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

const NAV_LINKS: NavItem[] = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/shop', label: 'Tienda' },
  { to: '/about', label: 'Nosotros' },
  { to: '/contact', label: 'Contacto' },
]

export function Header() {
  const { totalItems } = useCart()
  const { count: wishlistCount } = useWishlist()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled || location.pathname !== '/'
            ? 'bg-background/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-text hover:text-accent transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <span className="w-2 h-2 rounded-full bg-accent group-hover:animate-pulse" />
              <span className="font-display font-bold text-xl tracking-tight">
                URBAN<span className="text-accent">THREADS</span>
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      'text-xs font-semibold uppercase tracking-widest transition-colors',
                      isActive ? 'text-accent' : 'text-muted hover:text-text'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Iconos */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <Link
                to="/search"
                className="hidden sm:flex p-2 text-text hover:text-accent transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" strokeWidth={1.8} />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-text hover:text-accent transition-colors"
                aria-label="Favoritos"
              >
                <Heart className="w-5 h-5" strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-hot text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Cart (link directo a /cart) */}
              <Link
                to="/cart"
                className="relative p-2 -mr-2 text-text hover:text-accent transition-colors"
                aria-label="Ver carrito"
              >
                <ShoppingBag className="w-6 h-6" strokeWidth={1.8} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-black text-[10px] font-bold flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-80 max-w-[85vw] bg-surface border-r border-border flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-display font-bold text-lg">
                  URBAN<span className="text-accent">THREADS</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 text-muted hover:text-text"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col p-4 gap-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        cn(
                          'block px-4 py-4 rounded-xl font-display font-semibold text-lg transition-colors',
                          isActive ? 'bg-accent text-black' : 'text-text hover:bg-surface-2'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                <div className="h-px bg-border my-3" />

                <NavLink
                  to="/search"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-text hover:bg-surface-2 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Buscar
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-text hover:bg-surface-2 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Favoritos
                  {wishlistCount > 0 && (
                    <span className="ml-auto text-xs bg-hot text-white px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/returns"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-text hover:bg-surface-2 transition-colors"
                >
                  Devoluciones
                </NavLink>
              </nav>

              <div className="p-6 border-t border-border">
                <p className="text-xs text-muted mb-3">Streetwear sin filtros</p>
                <Link
                  to="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center rounded-full bg-accent text-black py-3 font-semibold text-sm uppercase tracking-widest"
                >
                  Ver catálogo
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}