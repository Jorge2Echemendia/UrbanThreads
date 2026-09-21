import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-black hover:bg-accent-dark active:scale-[0.98] font-semibold shadow-[0_0_0_0_var(--color-accent)] hover:shadow-[0_0_30px_rgba(196,255,0,0.3)]',
  ghost:
    'bg-transparent text-text hover:bg-surface-2 border border-transparent hover:border-border-strong',
  outline:
    'bg-transparent text-text border border-border-strong hover:border-accent hover:text-accent',
  danger: 'bg-hot/10 text-hot border border-hot/30 hover:bg-hot hover:text-white',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full uppercase tracking-widest transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'