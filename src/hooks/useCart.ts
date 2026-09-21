// src/hooks/useCart.ts
import { useCallback, useEffect, useState } from 'react'
import type { CartItem, Product } from '../types'
import { cartService, notificationService } from '../services'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => cartService.getItems())

  const refresh = useCallback(() => {
    setItems(cartService.getItems())
  }, [])

  // 🔑 Se suscribe a los cambios del servicio
  useEffect(() => {
    const unsubscribe = cartService.subscribe(refresh)
    return unsubscribe
  }, [refresh])

  // Sync entre pestañas
  useEffect(() => {
    const handleStorage = () => refresh()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [refresh])

  const addItem = useCallback(
    (product: Product, quantity: number = 1, size?: string, color?: string) => {
      cartService.addItem(product, quantity, size, color)
      notificationService.success('Añadido al carrito', product.name)
    },
    []
  )

  const removeItem = useCallback((productId: number, size?: string, color?: string) => {
    cartService.removeItem(productId, size, color)
    notificationService.info('Producto eliminado')
  }, [])

  const updateQuantity = useCallback(
    (productId: number, quantity: number, size?: string, color?: string) => {
      cartService.updateQuantity(productId, quantity, size, color)
    },
    []
  )

  const clear = useCallback(() => {
    cartService.clear()
    notificationService.info('Carrito vaciado')
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty: items.length === 0,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }
}