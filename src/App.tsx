import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Toaster } from './components/ui/Toaster'

/* ============================================
   Lazy loading de páginas (code splitting automático)
   Cada página se carga solo cuando se visita su ruta.
   ============================================ */
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Shop = lazy(() => import('./pages/Shop').then((m) => ({ default: m.Shop })))
const ProductDetail = lazy(() =>
  import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail }))
)
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Wishlist = lazy(() =>
  import('./pages/Wishlist').then((m) => ({ default: m.Wishlist }))
)
const Search = lazy(() => import('./pages/Search').then((m) => ({ default: m.Search })))
const Returns = lazy(() =>
  import('./pages/Returns').then((m) => ({ default: m.Returns }))
)
const Contact = lazy(() =>
  import('./pages/Contact').then((m) => ({ default: m.Contact }))
)
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound }))
)

/* Fallback minimalista mientras carga la página */
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-border border-t-accent animate-spin" />
        <p className="text-xs uppercase tracking-widest text-subtle">Cargando</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  )
}