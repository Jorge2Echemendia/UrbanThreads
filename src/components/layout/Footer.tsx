import { Link } from 'react-router-dom'
import { SocialIcon } from '../ui/SocialIcon'

const FOOTER_LINKS = {
  shop: [
    { label: 'Todo', to: '/shop' },
    { label: 'Hoodies', to: '/shop?category=hoodies' },
    { label: 'Tees', to: '/shop?category=tees' },
    { label: 'Sneakers', to: '/shop?category=sneakers' },
  ],
  info: [
    { label: 'Sobre nosotros', to: '/about' },
    { label: 'Envíos', to: '/shop' },
    { label: 'Devoluciones', to: '/returns' },
    { label: 'Contacto', to: '/contact' },
  ],
}

const SOCIALS = [
  { name: 'instagram', href: '#' },
  { name: 'twitter', href: '#' },
  { name: 'youtube', href: '#' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Marca */}
          <div className="col-span-2">
            <span className="font-display font-bold text-2xl">
              URBAN<span className="text-accent">THREADS</span>
            </span>
            <p className="mt-4 text-sm text-muted max-w-sm leading-relaxed">
              Streetwear para los que no piden permiso. Ediciones limitadas, diseño
              brutal, cero filtros.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  <SocialIcon name={social.name} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Tienda</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Info</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-subtle">
          <p>© {new Date().getFullYear()} UrbanThreads. Todos los derechos reservados.</p>
          <p className="font-mono">Diseñado sin filtros · Hecho a mano</p>
        </div>
      </div>
    </footer>
  )
}