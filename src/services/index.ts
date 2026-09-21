import { ProductService, MockProductRepository } from './ProductService'
import { CartService, LocalStorageCartRepository } from './CartService'
import { WishlistService, LocalStorageWishlistRepository } from './WishlistService'
import { ObservableNotificationService } from './NotificationService'

export const productRepository = new MockProductRepository()
export const cartRepository = new LocalStorageCartRepository()
export const wishlistRepository = new LocalStorageWishlistRepository()

export const productService = new ProductService(productRepository)
export const cartService = new CartService(cartRepository)
export const wishlistService = new WishlistService(wishlistRepository)
export const notificationService = new ObservableNotificationService()