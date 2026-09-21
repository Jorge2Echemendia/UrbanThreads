import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 pt-32">
      <div className="text-center max-w-xl">
        <p className="font-display font-bold text-[clamp(6rem,20vw,14rem)] leading-none text-accent text-accent-glow">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-4">
          Esta página no existe
        </h1>
        <p className="text-muted mb-10">
          Puede que se haya movido, agotado o nunca haya existido. Vuelve al drop.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline">Ir a la tienda</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}