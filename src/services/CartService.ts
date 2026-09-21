// src/services/CartService.ts
import type { CartItem, ICartRepository, Product } from '../types'

const STORAGE_KEY = 'urbanthreads_cart'

export class LocalStorageCartRepository implements ICartRepository {
  getItems(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  saveItems(items: CartItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

export class CartService {
  private repository: ICartRepository
  private listeners = new Set<() => void>()

  constructor(repository: ICartRepository) {
    this.repository = repository
  }

  /** Suscribirse a cambios del carrito (para hooks reactivos) */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn())
  }

  getItems(): CartItem[] {
    return this.repository.getItems()
  }

  addItem(
    product: Product,
    quantity: number = 1,
    selectedSize?: string,
    selectedColor?: string
  ): void {
    const items = this.getItems()
    const existingIndex = items.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    )

    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity
    } else {
      items.push({ product, quantity, selectedSize, selectedColor })
    }

    this.repository.saveItems(items)
    this.notify()
  }

  removeItem(productId: number, selectedSize?: string, selectedColor?: string): void {
    const items = this.getItems().filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        )
    )
    this.repository.saveItems(items)
    this.notify()
  }

  updateQuantity(
    productId: number,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ): void {
    if (quantity <= 0) {
      this.removeItem(productId, selectedSize, selectedColor)
      return
    }

    const items = this.getItems().map((item) => {
      if (
        item.product.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
      ) {
        return { ...item, quantity }
      }
      return item
    })
    this.repository.saveItems(items)
    this.notify()
  }

  clear(): void {
    this.repository.saveItems([])
    this.notify()
  }

  getTotalItems(): number {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0)
  }

  getTotalPrice(): number {
    return this.getItems().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  }

  isEmpty(): boolean {
    return this.getItems().length === 0
  }
}