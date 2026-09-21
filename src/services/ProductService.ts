// src/services/ProductService.ts
import type { IProductRepository, Product, ProductCategory } from '../types'
import { products as mockProducts } from '../data/products'

export class MockProductRepository implements IProductRepository {
  private products: Product[]

  constructor(initialProducts: Product[] = mockProducts) {
    this.products = initialProducts
  }

  async getAll(): Promise<Product[]> {
    await this.simulateNetworkDelay()
    return [...this.products]
  }

  async getById(id: number): Promise<Product | null> {
    await this.simulateNetworkDelay()
    return this.products.find((p) => p.id === id) ?? null
  }

  async getByCategory(category: ProductCategory): Promise<Product[]> {
    await this.simulateNetworkDelay()
    return this.products.filter((p) => p.category === category)
  }

  async getFeatured(limit: number = 3): Promise<Product[]> {
    await this.simulateNetworkDelay()
    return this.products.filter((p) => p.isNew || p.isLimited).slice(0, limit)
  }

  private simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 200))
  }
}

export class ProductService {
  private repository: IProductRepository

  constructor(repository: IProductRepository) {
    this.repository = repository
  }

  async getAllProducts(): Promise<Product[]> {
    return this.repository.getAll()
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.repository.getById(id)
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.repository.getByCategory(category)
  }

  async getFeaturedProducts(limit: number = 3): Promise<Product[]> {
    return this.repository.getFeatured(limit)
  }

async filterProducts(filters: {
  category?: ProductCategory | 'all'
  search?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  onlyNew?: boolean
  onlyLimited?: boolean
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
}): Promise<Product[]> {
  const all = await this.repository.getAll()

  let result = all.filter((product) => {
    if (filters.category && filters.category !== 'all' && product.category !== filters.category)
      return false
    if (filters.search) {
      const term = filters.search.toLowerCase()
      const matches =
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term)
      if (!matches) return false
    }
    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false
    if (filters.minRating !== undefined && product.rating < filters.minRating) return false
    if (filters.onlyNew && !product.isNew) return false
    if (filters.onlyLimited && !product.isLimited) return false
    return true
  })

  if (filters.sortBy) {
    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return Number(b.isNew ?? false) - Number(a.isNew ?? false)
        default:
          return 0
      }
    })
  }
  return result
}
}