// src/hooks/useWishlist.ts
import { useCallback, useEffect, useState } from 'react'
import { wishlistService, notificationService } from '../services'

export function useWishlist() {
  const [ids, setIds] = useState<number[]>(() => wishlistService.getIds())

  const refresh = useCallback(() => setIds(wishlistService.getIds()), [])

  useEffect(() => {
    const unsubscribe = wishlistService.subscribe(refresh)
    return unsubscribe
  }, [refresh])

  useEffect(() => {
    const handle = () => refresh()
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [refresh])

  const toggle = useCallback((productId: number, productName?: string) => {
    const added = wishlistService.toggle(productId)
    if (added) notificationService.success('Añadido a favoritos', productName)
    else notificationService.info('Quitado de favoritos', productName)
    return added
  }, [])

  const remove = useCallback((productId: number) => {
    wishlistService.remove(productId)
  }, [])

  const clear = useCallback(() => {
    wishlistService.clear()
  }, [])

  const has = useCallback((id: number) => ids.includes(id), [ids])

  return { ids, count: ids.length, has, toggle, remove, clear }
}