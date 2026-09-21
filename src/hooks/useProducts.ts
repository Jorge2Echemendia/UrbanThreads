import { useCallback, useEffect, useState } from 'react'
import type { Product, ProductCategory } from '../types'
import { productService } from '../services'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getAllProducts()
      setProducts(data)
    } catch {
      setError('No se pudieron cargar los productos.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const filter = useCallback(
    async (filters: {
      category?: ProductCategory | 'all'
      search?: string
      maxPrice?: number
      onlyNew?: boolean
      onlyLimited?: boolean
    }) => {
      setLoading(true)
      try {
        const data = await productService.filterProducts(filters)
        setProducts(data)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { products, loading, error, reload: loadAll, filter }
}