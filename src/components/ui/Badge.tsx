import { cn } from '../../lib/cn'

type BadgeVariant = 'new' | 'limited' | 'sale' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const styles: Record<BadgeVariant, string> = {
  new: 'bg-accent text-black',
  limited: 'bg-hot text-white',
  sale: 'bg-white text-black',
  default: 'bg-surface-2 text-muted border border-border',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}