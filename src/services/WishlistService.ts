// src/services/WishlistService.ts
import type { IWishlistRepository } from '../types'

const STORAGE_KEY = 'urbanthreads_wishlist'

export class LocalStorageWishlistRepository implements IWishlistRepository {
  get(): number[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  save(ids: number[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }
}

export class WishlistService {
  private repository: IWishlistRepository
  private listeners = new Set<() => void>()

  constructor(repository: IWishlistRepository) {
    this.repository = repository
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn())
  }

  getIds(): number[] {
    return this.repository.get()
  }

  has(id: number): boolean {
    return this.getIds().includes(id)
  }

  toggle(id: number): boolean {
    const ids = this.getIds()
    const exists = ids.includes(id)
    const next = exists ? ids.filter((i) => i !== id) : [...ids, id]
    this.repository.save(next)
    this.notify()
    return !exists
  }

  remove(id: number): void {
    this.repository.save(this.getIds().filter((i) => i !== id))
    this.notify()
  }

  clear(): void {
    this.repository.save([])
    this.notify()
  }

  getCount(): number {
    return this.getIds().length
  }
}