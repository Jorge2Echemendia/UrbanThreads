import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Minus, Plus, Trash2, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { Button } from '../components/ui/Button'
import { formatPrice } from '../lib/formatPrice'
import { notificationService } from '../services'

const FREE_SHIPPING_FROM = 100
const SHIPPING_COST = 8

export function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clear, isEmpty } =
    useCart()
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [processing, setProcessing] = useState(false)

  const shipping = totalPrice >= FREE_SHIPPING_FROM || totalPrice === 0 ? 0 : SHIPPING_COST
  const finalTotal = totalPrice + shipping

  const handleCheckout = async () => {
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 1200))
    const id = 'UT-' + Math.floor(1000 + Math.random() * 9000)
    setOrderId(id)
    setCheckoutDone(true)
    setProcessing(false)
    clear()
    notificationService.success('¡Compra confirmada!', `Pedido #${id}`)
  }

  if (checkoutDone) {
    return (
      <div className="pt-32 pb-24 mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-24 h-24 rounded-full bg-accent text-black flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-12 h-12" strokeWidth={3} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          ¡Pedido confirmado!
        </h1>
        <p className="text-muted mb-3">
          Gracias por confiar en UrbanThreads. Te enviamos los detalles a tu correo.
        </p>
        <p className="inline-block bg-surface border border-border rounded-full px-6 py-3 font-mono text-sm mb-10">
          Pedido <span className="text-accent font-bold">#{orderId}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop">
            <Button>Seguir comprando</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-accent mb-3">
          Tu bolsa
        </p>
        <h1 className="text-5xl md:text-7xl font-display font-bold">
          Carrito
        </h1>
        {!isEmpty && (
          <p className="mt-4 text-muted">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
          </p>
        )}
      </div>

      {isEmpty ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-muted" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-3">
            Tu carrito está vacío
          </h2>
          <p className="text-muted mb-8">
            Añade algo brutal antes de que se agote.
          </p>
          <Link to="/shop">
            <Button>Explorar catálogo</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
          {/* Items */}
          <div className="border border-border rounded-2xl overflow-hidden">
            <AnimatePresence>
              {items.map((item) => {
                const key = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`
                return (
                  <motion.div
                    key={key}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4 md:gap-6 p-4 md:p-6 border-b border-border last:border-b-0"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-surface shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-display font-semibold hover:text-accent transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-subtle uppercase tracking-widest mt-1">
                            {item.product.category}
                            {item.selectedSize && ` · ${item.selectedSize}`}
                            {item.selectedColor && ` · ${item.selectedColor}`}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="text-muted hover:text-hot transition-colors p-1"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-auto pt-4">
                        <div className="flex items-center h-10 rounded-full border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="w-10 h-full text-muted hover:text-text"
                            aria-label="Disminuir"
                          >
                            <Minus className="w-3.5 h-3.5 mx-auto" />
                          </button>
                          <span className="w-8 text-center text-sm font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="w-10 h-full text-muted hover:text-text"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-3.5 h-3.5 mx-auto" />
                          </button>
                        </div>

                        <p className="font-mono font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Resumen */}
          <aside className="lg:sticky lg:top-28 border border-border rounded-2xl p-6 bg-surface/50 backdrop-blur-sm">
            <h3 className="font-display font-bold text-xl mb-6">Resumen</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-text font-mono">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Envío</span>
                <span className="text-text font-mono">
                  {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-accent">
                  Te faltan {formatPrice(FREE_SHIPPING_FROM - totalPrice)} para
                  envío gratis
                </p>
              )}
              <div className="border-t border-border pt-4 mt-4 flex justify-between items-baseline">
                <span className="font-display font-bold">Total</span>
                <span className="font-mono font-bold text-2xl text-accent">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button fullWidth size="lg" onClick={handleCheckout} disabled={processing}>
                {processing ? (
                  'Procesando...'
                ) : (
                  <>
                    Finalizar compra
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
              <Button variant="ghost" fullWidth onClick={clear}>
                Vaciar carrito
              </Button>
            </div>

            <p className="mt-6 text-xs text-subtle text-center">
              🔒 Compra simulada · No se procesará ningún pago real
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}