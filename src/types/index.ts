
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: ProductCategory
  brand: string
  rating: number
  isNew?: boolean
  isLimited?: boolean
  sizes?: string[]
  colors?: ProductColor[]
}

export type ProductCategory = 'hoodies' | 'tees' | 'pants' | 'accessories' | 'sneakers'

export interface ProductColor {
  name: string
  hex: string
}


export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface ProductFilters {
  category?: ProductCategory | 'all'
  search?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  onlyNew?: boolean
  onlyLimited?: boolean
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
}

export interface IProductRepository {
  getAll(): Promise<Product[]>
  getById(id: number): Promise<Product | null>
  getByCategory(category: ProductCategory): Promise<Product[]>
  getFeatured(limit?: number): Promise<Product[]>
}

export interface ICartRepository {
  getItems(): CartItem[]
  saveItems(items: CartItem[]): void
}

export interface INotificationService {
  success(title: string, message?: string): void
  error(title: string, message?: string): void
  info(title: string, message?: string): void
}

export interface IWishlistRepository {
  get(): number[]
  save(ids: number[]): void
}