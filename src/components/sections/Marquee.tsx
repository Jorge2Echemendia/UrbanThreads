const ITEMS = [
  'ENVÍO GRATIS > $100',
  'EDICIONES LIMITADAS',
  'DISEÑO SIN FILTROS',
  'STREETWEAR PREMIUM',
  'DEVOLUCIONES 30 DÍAS',
]

export function Marquee() {
  const items = [...ITEMS, ...ITEMS]

  return (
    <section className="border-y border-border bg-surface py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 shrink-0">
            <span className="text-sm font-display font-bold uppercase tracking-widest">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </section>
  )
}